-- Fase 2: precios importados y asociaciones compartidas entre computadoras.
-- Requiere auth-prepare.sql y al menos una cuenta owner/admin activa.

begin;

create table if not exists public.price_list_items (
  code text primary key,
  name text not null default '',
  description text not null default '',
  price numeric(14,2) not null check (price >= 0),
  sheet_name text,
  source_file text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.product_price_matches (
  product_id integer primary key,
  code text,
  ignored boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  check ((ignored and code is null) or (not ignored and nullif(trim(code), '') is not null))
);

alter table public.price_list_items enable row level security;
alter table public.product_price_matches enable row level security;

drop policy if exists "Members read shared prices" on public.price_list_items;
create policy "Members read shared prices" on public.price_list_items
  for select to authenticated using (public.current_app_role() is not null);
drop policy if exists "Members read shared matches" on public.product_price_matches;
create policy "Members read shared matches" on public.product_price_matches
  for select to authenticated using (public.current_app_role() is not null);

revoke all on public.price_list_items from anon, authenticated;
revoke all on public.product_price_matches from anon, authenticated;
grant select on public.price_list_items to authenticated;
grant select on public.product_price_matches to authenticated;

create or replace function public.upsert_price_list_items(p_items jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
  affected integer := 0;
begin
  perform public.require_app_role(array['owner','admin']);
  if jsonb_typeof(p_items) <> 'array' then raise exception 'INVALID_PRICE_LIST'; end if;
  for item in select value from jsonb_array_elements(p_items) loop
    if nullif(trim(item->>'codigo'), '') is null or (item->>'precio')::numeric < 0 then
      raise exception 'INVALID_PRICE_ITEM';
    end if;
    insert into public.price_list_items(code,name,description,price,sheet_name,source_file,updated_at,updated_by)
    values (
      trim(item->>'codigo'), coalesce(item->>'nombre',''), coalesce(item->>'descripcion',''),
      (item->>'precio')::numeric, item->>'hoja', item->>'archivo', now(), auth.uid()
    )
    on conflict (code) do update set
      name=excluded.name, description=excluded.description, price=excluded.price,
      sheet_name=excluded.sheet_name, source_file=excluded.source_file,
      updated_at=now(), updated_by=auth.uid();
    affected := affected + 1;
  end loop;
  perform public.write_app_audit('price_list_imported','commercial_config',null,null,jsonb_build_object('items',affected));
  return affected;
end;
$$;

create or replace function public.set_product_price_match(p_product_id integer, p_code text, p_ignored boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.require_app_role(array['owner','admin']);
  insert into public.product_price_matches(product_id,code,ignored,updated_at,updated_by)
  values (p_product_id, case when p_ignored then null else nullif(trim(p_code),'') end, p_ignored, now(), auth.uid())
  on conflict (product_id) do update set
    code=excluded.code, ignored=excluded.ignored, updated_at=now(), updated_by=auth.uid();
  perform public.write_app_audit(
    case when p_ignored then 'price_match_ignored' else 'price_match_saved' end,
    'catalog_product', p_product_id::text, null,
    jsonb_build_object('code',case when p_ignored then null else p_code end,'ignored',p_ignored)
  );
end;
$$;

create or replace function public.clear_commercial_config()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.require_app_role(array['owner','admin']);
  delete from public.product_price_matches;
  delete from public.price_list_items;
  perform public.write_app_audit('commercial_config_cleared','commercial_config',null,null,null);
end;
$$;

revoke all on function public.upsert_price_list_items(jsonb) from public, anon, authenticated;
revoke all on function public.set_product_price_match(integer,text,boolean) from public, anon, authenticated;
revoke all on function public.clear_commercial_config() from public, anon, authenticated;
grant execute on function public.upsert_price_list_items(jsonb) to authenticated;
grant execute on function public.set_product_price_match(integer,text,boolean) to authenticated;
grant execute on function public.clear_commercial_config() to authenticated;

commit;
