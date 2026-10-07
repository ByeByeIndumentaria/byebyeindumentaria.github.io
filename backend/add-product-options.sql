-- Run once on an existing BYE BYE catalog project.
-- Adds server-side validation for stock by color and multiple box options.
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
  return result;
end;
$$;
revoke all on function public.save_catalog_product(bigint,integer,jsonb) from public;
grant execute on function public.save_catalog_product(bigint,integer,jsonb) to authenticated;
