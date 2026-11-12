-- Administración integral del catálogo: diseño, banners, categorías, orden y bloques.
-- Ejecutar una vez en el SQL Editor del proyecto Supabase del catálogo.

begin;

create table if not exists public.catalog_site_settings (
  id boolean primary key default true check (id),
  draft_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(draft_payload) = 'object'),
  published_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(published_payload) = 'object'),
  draft_version integer not null default 1,
  published_version integer not null default 0,
  draft_updated_at timestamptz not null default now(),
  published_at timestamptz,
  updated_by uuid references auth.users(id) on delete set null
);

insert into public.catalog_site_settings(id) values(true) on conflict (id) do nothing;
alter table public.catalog_site_settings enable row level security;
revoke all on public.catalog_site_settings from anon, authenticated;

create table if not exists public.catalog_site_revisions (
  id bigint generated always as identity primary key,
  version integer not null unique,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  published_by uuid references auth.users(id) on delete set null,
  published_at timestamptz not null default now()
);
alter table public.catalog_site_revisions enable row level security;
revoke all on public.catalog_site_revisions from anon, authenticated;

create or replace function public.get_catalog_site_settings()
returns jsonb language sql stable security definer set search_path = '' as $$
  select published_payload from public.catalog_site_settings where id = true;
$$;
revoke all on function public.get_catalog_site_settings() from public;
grant execute on function public.get_catalog_site_settings() to anon, authenticated;

create or replace function public.get_catalog_site_editor_settings()
returns table(draft_payload jsonb, published_payload jsonb, draft_version integer, published_version integer, draft_updated_at timestamptz, published_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  return query select s.draft_payload,s.published_payload,s.draft_version,s.published_version,s.draft_updated_at,s.published_at
    from public.catalog_site_settings s where s.id = true;
end;
$$;
revoke all on function public.get_catalog_site_editor_settings() from public, anon, authenticated;
grant execute on function public.get_catalog_site_editor_settings() to authenticated;

create or replace function public.save_catalog_site_draft(expected_version integer, settings_data jsonb)
returns table(draft_payload jsonb, published_payload jsonb, draft_version integer, published_version integer, draft_updated_at timestamptz, published_at timestamptz)
language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  if jsonb_typeof(settings_data) <> 'object' or length(settings_data::text) > 750000 then
    raise exception 'INVALID_SITE_SETTINGS';
  end if;
  update public.catalog_site_settings s
     set draft_payload = settings_data, draft_version = s.draft_version + 1,
         draft_updated_at = now(), updated_by = auth.uid()
   where s.id = true and s.draft_version = expected_version;
  if not found then raise exception 'EDIT_CONFLICT'; end if;
  return query select s.draft_payload,s.published_payload,s.draft_version,s.published_version,s.draft_updated_at,s.published_at
    from public.catalog_site_settings s where s.id = true;
end;
$$;
revoke all on function public.save_catalog_site_draft(integer,jsonb) from public, anon, authenticated;
grant execute on function public.save_catalog_site_draft(integer,jsonb) to authenticated;

create or replace function public.publish_catalog_site_settings(expected_version integer)
returns table(draft_payload jsonb, published_payload jsonb, draft_version integer, published_version integer, draft_updated_at timestamptz, published_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare next_version integer;
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  update public.catalog_site_settings s
     set published_payload = s.draft_payload, published_version = s.published_version + 1,
         published_at = now(), updated_by = auth.uid()
   where s.id = true and s.draft_version = expected_version
   returning s.published_version into next_version;
  if not found then raise exception 'EDIT_CONFLICT'; end if;
  insert into public.catalog_site_revisions(version,payload,published_by)
    select next_version,s.published_payload,auth.uid() from public.catalog_site_settings s where s.id = true
    on conflict (version) do nothing;
  return query select s.draft_payload,s.published_payload,s.draft_version,s.published_version,s.draft_updated_at,s.published_at
    from public.catalog_site_settings s where s.id = true;
end;
$$;
revoke all on function public.publish_catalog_site_settings(integer) from public, anon, authenticated;
grant execute on function public.publish_catalog_site_settings(integer) to authenticated;

create or replace function public.list_catalog_site_revisions()
returns table(version integer, payload jsonb, published_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  return query select r.version,r.payload,r.published_at from public.catalog_site_revisions r order by r.version desc limit 50;
end;
$$;
revoke all on function public.list_catalog_site_revisions() from public, anon, authenticated;
grant execute on function public.list_catalog_site_revisions() to authenticated;

create or replace function public.restore_catalog_site_revision(target_version integer, expected_version integer)
returns table(draft_payload jsonb, published_payload jsonb, draft_version integer, published_version integer, draft_updated_at timestamptz, published_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare restored jsonb;
begin
  if not exists(select 1 from public.catalog_editors where user_id = auth.uid()) then
    raise insufficient_privilege using message = 'EDITOR_REQUIRED';
  end if;
  select r.payload into restored from public.catalog_site_revisions r where r.version = target_version;
  if restored is null then raise exception 'REVISION_NOT_FOUND'; end if;
  update public.catalog_site_settings s
     set draft_payload = restored, draft_version = s.draft_version + 1,
         draft_updated_at = now(), updated_by = auth.uid()
   where s.id = true and s.draft_version = expected_version;
  if not found then raise exception 'EDIT_CONFLICT'; end if;
  return query select s.draft_payload,s.published_payload,s.draft_version,s.published_version,s.draft_updated_at,s.published_at
    from public.catalog_site_settings s where s.id = true;
end;
$$;
revoke all on function public.restore_catalog_site_revision(integer,integer) from public, anon, authenticated;
grant execute on function public.restore_catalog_site_revision(integer,integer) to authenticated;

commit;
