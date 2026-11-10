-- Fase 1, paso B: cerrar el acceso anónimo.
-- Ejecutar solamente después de insertar y verificar al menos un owner activo.

begin;

do $$
begin
  if not exists(select 1 from public.app_users where role = 'owner' and active) then
    raise exception 'OWNER_REQUIRED: no se cerró ningún acceso. Creá y verificá una cuenta owner primero.';
  end if;
end;
$$;

alter table public.orders enable row level security;
alter table public.inventory_products enable row level security;
alter table public.inventory_stock enable row level security;
alter table public.inventory_movements enable row level security;

-- Eliminar políticas anteriores, incluso si tenían otro nombre.
do $$
declare
  item record;
begin
  for item in
    select tablename, policyname
      from pg_policies
     where schemaname = 'public'
       and tablename = any(array['orders','inventory_products','inventory_stock','inventory_movements'])
  loop
    execute format('drop policy if exists %I on public.%I', item.policyname, item.tablename);
  end loop;
end;
$$;

create policy "Members read orders" on public.orders
  for select to authenticated using (public.current_app_role() is not null);
create policy "Members read inventory products" on public.inventory_products
  for select to authenticated using (public.current_app_role() is not null);
create policy "Members read inventory stock" on public.inventory_stock
  for select to authenticated using (public.current_app_role() is not null);
create policy "Members read inventory movements" on public.inventory_movements
  for select to authenticated using (public.current_app_role() is not null);

revoke all on public.orders from anon, authenticated;
revoke all on public.inventory_products from anon, authenticated;
revoke all on public.inventory_stock from anon, authenticated;
revoke all on public.inventory_movements from anon, authenticated;
grant select on public.orders to authenticated;
grant select on public.inventory_products to authenticated;
grant select on public.inventory_stock to authenticated;
grant select on public.inventory_movements to authenticated;

create or replace function public.save_order_with_inventory(p_order jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid := (p_order->>'id')::uuid;
  v_old jsonb;
  v_allocation jsonb;
  v_available integer;
  v_needed integer;
  v_product integer;
  v_variant text;
  v_number text;
  v_old_affects boolean := false;
  v_new_affects boolean := public.order_affects_stock(p_order->>'estado');
begin
  perform public.require_app_role(array['owner','admin','operator']);
  if v_id is null then raise exception 'INVALID_ORDER_ID'; end if;

  select payload into v_old from public.orders where id = v_id::text for update;
  v_old_affects := v_old is not null and public.order_affects_stock(v_old->>'estado');

  if nullif(p_order->>'numero', '') is null then
    v_number := nullif(v_old->>'numero', '');
    if v_number is null then
      v_number := lpad(nextval('public.order_number_seq')::text, 4, '0');
    end if;
    p_order := jsonb_set(p_order, '{numero}', to_jsonb(v_number), true);
  else
    v_number := coalesce(nullif(p_order->>'numero', ''), v_old->>'numero');
    p_order := jsonb_set(p_order, '{numero}', to_jsonb(v_number), true);
  end if;

  if v_old_affects then
    for v_allocation in select value from jsonb_array_elements(coalesce(v_old->'stockAllocations', '[]'::jsonb)) loop
      v_product := (v_allocation->>'productId')::integer;
      v_variant := v_allocation->>'variant';
      v_needed := (v_allocation->>'quantity')::integer;
      update public.inventory_stock
         set quantity = quantity + v_needed, updated_at = now()
       where product_id = v_product and variant = v_variant;
      insert into public.inventory_movements(product_id, variant, quantity_delta, order_id, order_number, reason, actor_user_id)
      values (v_product, v_variant, v_needed, v_id, p_order->>'numero', 'Ajuste o devolución de pedido', auth.uid());
    end loop;
  end if;

  if v_new_affects then
    for v_allocation in select value from jsonb_array_elements(coalesce(p_order->'stockAllocations', '[]'::jsonb)) loop
      v_product := (v_allocation->>'productId')::integer;
      v_variant := v_allocation->>'variant';
      v_needed := (v_allocation->>'quantity')::integer;
      select quantity into v_available
        from public.inventory_stock
       where product_id = v_product and variant = v_variant
       for update;
      if v_available is null then
        raise exception 'No hay stock configurado para el producto % (%).', v_product, v_variant using errcode = 'P0001';
      end if;
      if v_needed > v_available then
        raise exception 'Stock insuficiente para %: disponibles %, solicitadas %.', v_variant, v_available, v_needed using errcode = 'P0001';
      end if;
      update public.inventory_stock
         set quantity = quantity - v_needed, updated_at = now()
       where product_id = v_product and variant = v_variant;
      insert into public.inventory_movements(product_id, variant, quantity_delta, order_id, order_number, reason, actor_user_id)
      values (v_product, v_variant, -v_needed, v_id, p_order->>'numero', 'Pedido confirmado', auth.uid());
    end loop;
  end if;

  insert into public.orders(id, number, customer, status, order_date, payload, updated_at, created_by, updated_by)
  values (
    v_id::text,
    coalesce(nullif(p_order->>'numero', ''), 'SIN-NUMERO-' || v_id::text),
    coalesce(p_order->>'cliente', ''),
    coalesce(p_order->>'estado', 'Borrador'),
    null,
    p_order,
    now(),
    auth.uid(),
    auth.uid()
  )
  on conflict (id) do update
    set number=excluded.number,
        customer=excluded.customer,
        status=excluded.status,
        payload=excluded.payload,
        updated_at=now(),
        updated_by=auth.uid();

  perform public.write_app_audit(
    case when v_old is null then 'order_created' else 'order_updated' end,
    'order', v_id::text, v_old, p_order
  );
  return jsonb_build_object('ok', true, 'numero', v_number, 'pedido', p_order);
end;
$$;

create or replace function public.delete_order_with_inventory(p_order_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old jsonb;
  v_allocation jsonb;
begin
  perform public.require_app_role(array['owner','admin']);
  select payload into v_old from public.orders where id = p_order_id::text for update;
  if v_old is null then return jsonb_build_object('ok', true); end if;
  if public.order_affects_stock(v_old->>'estado') then
    for v_allocation in select value from jsonb_array_elements(coalesce(v_old->'stockAllocations', '[]'::jsonb)) loop
      update public.inventory_stock
         set quantity = quantity + (v_allocation->>'quantity')::integer, updated_at = now()
       where product_id = (v_allocation->>'productId')::integer
         and variant = v_allocation->>'variant';
      insert into public.inventory_movements(product_id, variant, quantity_delta, order_id, order_number, reason, actor_user_id)
      values (
        (v_allocation->>'productId')::integer,
        v_allocation->>'variant',
        (v_allocation->>'quantity')::integer,
        p_order_id,
        v_old->>'numero',
        'Pedido eliminado',
        auth.uid()
      );
    end loop;
  end if;
  perform public.write_app_audit('order_deleted', 'order', p_order_id::text, v_old, null);
  delete from public.orders where id = p_order_id::text;
  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.adjust_inventory(
  p_product_id integer,
  p_variant text,
  p_new_quantity integer,
  p_reason text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old integer;
begin
  perform public.require_app_role(array['owner','admin']);
  if p_new_quantity < 0 then raise exception 'La cantidad no puede ser negativa.'; end if;
  if length(trim(coalesce(p_reason, ''))) = 0 then raise exception 'El motivo es obligatorio.'; end if;
  select quantity into v_old
    from public.inventory_stock
   where product_id=p_product_id and variant=p_variant
   for update;
  if v_old is null then raise exception 'No existe esa variante de stock.'; end if;
  update public.inventory_stock
     set quantity=p_new_quantity, updated_at=now()
   where product_id=p_product_id and variant=p_variant;
  insert into public.inventory_movements(product_id, variant, quantity_delta, reason, actor_user_id)
  values (p_product_id, p_variant, p_new_quantity-v_old, p_reason, auth.uid());
  perform public.write_app_audit(
    'inventory_adjusted', 'inventory_stock', p_product_id || ':' || p_variant,
    jsonb_build_object('quantity', v_old),
    jsonb_build_object('quantity', p_new_quantity, 'reason', p_reason)
  );
  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.save_order_with_inventory(jsonb) from public, anon, authenticated;
revoke all on function public.delete_order_with_inventory(uuid) from public, anon, authenticated;
revoke all on function public.adjust_inventory(integer,text,integer,text) from public, anon, authenticated;
grant execute on function public.save_order_with_inventory(jsonb) to authenticated;
grant execute on function public.delete_order_with_inventory(uuid) to authenticated;
grant execute on function public.adjust_inventory(integer,text,integer,text) to authenticated;

commit;

