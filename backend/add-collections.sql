-- Run once on an existing BYE BYE catalog project.
-- Collections are managed independently so their Stock/Preorder behavior can
-- change without rewriting every product.
create table if not exists public.catalog_collections (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]{0,59}$'),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  position integer not null default 0,
  version integer not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.catalog_collections enable row level security;
create policy "Public collection read" on public.catalog_collections for select to anon, authenticated using (true);
revoke all on public.catalog_collections from anon, authenticated;
grant select on public.catalog_collections to anon, authenticated;

create or replace function public.save_catalog_collection(collection_id text, expected_version integer, collection_data jsonb)
returns public.catalog_collections language plpgsql security definer set search_path = '' as $$
declare result public.catalog_collections;
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  if collection_id !~ '^[a-z0-9][a-z0-9-]{0,59}$'
     or jsonb_typeof(collection_data) <> 'object'
     or length(trim(coalesce(collection_data->>'name',''))) = 0
     or coalesce(collection_data->>'type','') not in ('stock','preorder')
     or length(collection_data::text) > 10000 then
    raise exception 'INVALID_COLLECTION';
  end if;
  if expected_version = 0 then
    insert into public.catalog_collections(id,payload,position)
    values(collection_id,collection_data,coalesce((collection_data->>'position')::integer,0))
    on conflict (id) do nothing returning * into result;
    if result.id is null then raise exception 'EDIT_CONFLICT'; end if;
  else
    update public.catalog_collections
       set payload = collection_data,
           position = coalesce((collection_data->>'position')::integer,position),
           version = version + 1,
           updated_at = now()
     where id = collection_id and version = expected_version
     returning * into result;
    if result.id is null then raise exception 'EDIT_CONFLICT'; end if;
  end if;
  return result;
end;
$$;
revoke all on function public.save_catalog_collection(text,integer,jsonb) from public;
grant execute on function public.save_catalog_collection(text,integer,jsonb) to authenticated;
