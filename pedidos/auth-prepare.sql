-- Fase 1, paso A: preparar usuarios y auditoría sin alterar el acceso vigente.
-- Ejecutar primero. Después crear el usuario Auth e insertarlo como owner.

begin;

create table if not exists public.app_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'operator', 'viewer')),
  display_name text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.app_users enable row level security;

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
    from public.app_users
   where user_id = auth.uid() and active
   limit 1;
$$;

create or replace function public.require_app_role(p_allowed_roles text[])
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_role text;
begin
  if auth.uid() is null then
    raise insufficient_privilege using message = 'AUTH_REQUIRED';
  end if;
  select role into v_role
    from public.app_users
   where user_id = auth.uid() and active;
  if v_role is null or not (v_role = any(p_allowed_roles)) then
    raise insufficient_privilege using message = 'ROLE_REQUIRED';
  end if;
end;
$$;

revoke all on function public.current_app_role() from public;
revoke all on function public.require_app_role(text[]) from public;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.require_app_role(text[]) to authenticated;

drop policy if exists "Users read their membership" on public.app_users;
create policy "Users read their membership" on public.app_users
  for select to authenticated
  using (
    user_id = auth.uid()
    or public.current_app_role() in ('owner', 'admin')
  );

revoke all on public.app_users from anon, authenticated;
grant select on public.app_users to authenticated;

create table if not exists public.app_audit_log (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.app_audit_log enable row level security;
drop policy if exists "Admins read audit log" on public.app_audit_log;
create policy "Admins read audit log" on public.app_audit_log
  for select to authenticated
  using (public.current_app_role() in ('owner', 'admin'));
revoke all on public.app_audit_log from anon, authenticated;
grant select on public.app_audit_log to authenticated;

create or replace function public.write_app_audit(
  p_action text,
  p_entity_type text,
  p_entity_id text,
  p_old_data jsonb,
  p_new_data jsonb
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.app_audit_log(actor_user_id, action, entity_type, entity_id, old_data, new_data)
  values(auth.uid(), p_action, p_entity_type, p_entity_id, p_old_data, p_new_data);
$$;

revoke all on function public.write_app_audit(text,text,text,jsonb,jsonb) from public;

alter table public.orders add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table public.orders add column if not exists updated_by uuid references auth.users(id) on delete set null;
alter table public.inventory_movements add column if not exists actor_user_id uuid references auth.users(id) on delete set null;

commit;

-- Después de crear el usuario en Authentication > Users, autorizarlo así:
-- insert into public.app_users(user_id, role, display_name)
-- values ('UUID_DEL_USUARIO', 'owner', 'Nombre')
-- on conflict (user_id) do update set role='owner', active=true, updated_at=now();

