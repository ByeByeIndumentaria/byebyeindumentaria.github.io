-- ROLLBACK DE EMERGENCIA DE FASE 1.
-- Usar únicamente si, después del cierre, ninguna cuenta autorizada puede entrar.
-- Reabre temporalmente la lectura y las operaciones de pedidos/inventario al rol anon.

begin;

alter table public.orders enable row level security;
alter table public.inventory_products enable row level security;
alter table public.inventory_stock enable row level security;
alter table public.inventory_movements enable row level security;

drop policy if exists "Emergency anonymous orders read" on public.orders;
create policy "Emergency anonymous orders read" on public.orders
  for select to anon using (true);

drop policy if exists "Emergency anonymous inventory products read" on public.inventory_products;
create policy "Emergency anonymous inventory products read" on public.inventory_products
  for select to anon using (true);

drop policy if exists "Emergency anonymous inventory stock read" on public.inventory_stock;
create policy "Emergency anonymous inventory stock read" on public.inventory_stock
  for select to anon using (true);

drop policy if exists "Emergency anonymous inventory movements read" on public.inventory_movements;
create policy "Emergency anonymous inventory movements read" on public.inventory_movements
  for select to anon using (true);

grant select on public.orders to anon;
grant select on public.inventory_products to anon;
grant select on public.inventory_stock to anon;
grant select on public.inventory_movements to anon;
grant execute on function public.save_order_with_inventory(jsonb) to anon;
grant execute on function public.delete_order_with_inventory(uuid) to anon;
grant execute on function public.adjust_inventory(integer,text,integer,text) to anon;

commit;
