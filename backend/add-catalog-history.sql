-- Fase de continuidad: historial recuperable de productos del catálogo.
-- Ejecutar una vez en el proyecto Supabase de Administración de catálogo.

begin;

create table if not exists public.catalog_product_revisions (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.catalog_products(id) on delete cascade,
  version integer not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now(),
  unique(product_id, version)
);

alter table public.catalog_product_revisions enable row level security;
drop policy if exists "Editors read product history" on public.catalog_product_revisions;
create policy "Editors read product history" on public.catalog_product_revisions
  for select to authenticated
  using (exists(select 1 from public.catalog_editors where user_id = (select auth.uid())));
revoke all on public.catalog_product_revisions from anon, authenticated;
grant select on public.catalog_product_revisions to authenticated;

insert into public.catalog_product_revisions(product_id,version,payload,changed_at)
select id,version,payload,updated_at from public.catalog_products
on conflict (product_id,version) do nothing;

create or replace function public.save_catalog_product(product_id bigint, expected_version integer, product_data jsonb)
returns public.catalog_products language plpgsql security definer set search_path = '' as $$
declare result public.catalog_products;
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  if jsonb_typeof(product_data) <> 'object' or length(trim(coalesce(product_data->>'name',''))) = 0
     or length(product_data::text) > 500000
     or jsonb_typeof(product_data->'colors') is distinct from 'array'
     or jsonb_typeof(product_data->'sizes') is distinct from 'array'
     or (product_data ? 'outOfStockColors' and jsonb_typeof(product_data->'outOfStockColors') is distinct from 'array')
     or (product_data ? 'purchaseOptions' and (
       jsonb_typeof(product_data->'purchaseOptions') is distinct from 'array'
       or jsonb_array_length(product_data->'purchaseOptions') < 2
     ))
     or exists (
       select 1 from jsonb_array_elements(case when jsonb_typeof(product_data->'purchaseOptions') = 'array' then product_data->'purchaseOptions' else '[]'::jsonb end) option
       where coalesce(option->>'packingType','') not in ('single-color','mixed-colors')
          or length(trim(coalesce(option->>'label',''))) = 0
          or jsonb_typeof(option->'colors') is distinct from 'array'
          or jsonb_typeof(option->'sizes') is distinct from 'array'
     )
     or exists (
       select 1 from jsonb_array_elements_text(case when jsonb_typeof(product_data->'outOfStockColors') = 'array' then product_data->'outOfStockColors' else '[]'::jsonb end) unavailable
       where not (product_data->'colors' ? unavailable)
     ) then
    raise exception 'INVALID_PRODUCT';
  end if;
  if product_id is null then
    insert into public.catalog_products(payload) values(product_data) returning * into result;
  elsif expected_version = 0 then
    if product_id < 1 or product_id >= 10000 then raise exception 'INVALID_LEGACY_ID'; end if;
    insert into public.catalog_products(id,payload) values(product_id,product_data)
    on conflict (id) do nothing returning * into result;
    if result.id is null then raise exception 'EDIT_CONFLICT'; end if;
  else
    update public.catalog_products set payload = product_data, version = version + 1, updated_at = now()
    where id = product_id and version = expected_version returning * into result;
    if result.id is null then raise exception 'EDIT_CONFLICT'; end if;
  end if;
  insert into public.catalog_product_revisions(product_id,version,payload,changed_by,changed_at)
  values(result.id,result.version,result.payload,auth.uid(),result.updated_at)
  on conflict on constraint catalog_product_revisions_product_id_version_key do nothing;
  return result;
end;
$$;

create or replace function public.restore_catalog_product(p_product_id bigint, p_target_version integer, p_expected_version integer)
returns public.catalog_products language plpgsql security definer set search_path = '' as $$
declare restored_payload jsonb; result public.catalog_products;
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  select payload into restored_payload
  from public.catalog_product_revisions
  where product_id = p_product_id and version = p_target_version;
  if restored_payload is null then raise exception 'REVISION_NOT_FOUND'; end if;
  update public.catalog_products
     set payload = restored_payload, version = version + 1, updated_at = now()
   where id = p_product_id and version = p_expected_version
   returning * into result;
  if result.id is null then raise exception 'EDIT_CONFLICT'; end if;
  insert into public.catalog_product_revisions(product_id,version,payload,changed_by,changed_at)
  values(result.id,result.version,result.payload,auth.uid(),result.updated_at);
  return result;
end;
$$;

revoke all on function public.restore_catalog_product(bigint,integer,integer) from public, anon, authenticated;
grant execute on function public.restore_catalog_product(bigint,integer,integer) to authenticated;

commit;
