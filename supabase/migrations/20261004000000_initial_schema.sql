create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users see own roles, admins see all" on public.user_roles for select to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then return false; end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;

create or replace function public.admin_exists()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where role = 'admin') $$;

create or replace function public.list_admins()
returns table (user_id uuid, email text, role app_role, created_at timestamptz)
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'forbidden'; end if;
  return query select r.user_id, u.email::text, r.role, r.created_at
    from public.user_roles r join auth.users u on u.id = r.user_id order by r.created_at;
end $$;

create or replace function public.grant_admin_by_email(_email text)
returns boolean language plpgsql security definer set search_path = public
as $$
declare uid uuid;
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'forbidden'; end if;
  select id into uid from auth.users where lower(email) = lower(_email);
  if uid is null then return false; end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin') on conflict do nothing;
  return true;
end $$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'journal' check (kind in ('journal','story')),
  title text not null default '',
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  cover_url text,
  category text not null default '',
  author text not null default '',
  person text not null default '',
  location text not null default '',
  consent_given boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  slug text not null unique,
  short_description text not null default '',
  full_description text not null default '',
  cover_url text,
  status text not null default 'active',
  featured boolean not null default false,
  donation_cta text not null default '',
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  event_date date,
  event_time text not null default '',
  location text not null default '',
  description text not null default '',
  cover_url text,
  link text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  value text not null default '',
  description text not null default '',
  year int,
  category text not null default '',
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text not null default '',
  alt text not null default '',
  category text not null default '',
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.people (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text not null default '',
  bio text not null default '',
  photo_url text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'contact',
  name text not null,
  email text not null,
  phone text not null default '',
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now(),
  constraint submissions_len check (char_length(name) <= 200 and char_length(email) <= 255 and char_length(message) <= 5000 and char_length(phone) <= 50 and char_length(kind) <= 40)
);

grant select on public.posts, public.programs, public.events, public.impact_metrics, public.media, public.people, public.site_settings to anon, authenticated;
grant insert, update, delete on public.posts, public.programs, public.events, public.impact_metrics, public.media, public.people, public.site_settings to authenticated;
grant insert on public.submissions to anon, authenticated;
grant select, update, delete on public.submissions to authenticated;
grant all on public.posts, public.programs, public.events, public.impact_metrics, public.media, public.people, public.site_settings, public.submissions to service_role;

alter table public.posts enable row level security;
alter table public.programs enable row level security;
alter table public.events enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.media enable row level security;
alter table public.people enable row level security;
alter table public.site_settings enable row level security;
alter table public.submissions enable row level security;

create policy "Public reads published posts" on public.posts for select to anon, authenticated
using (published and (kind <> 'story' or consent_given));
create policy "Public reads published programs" on public.programs for select to anon, authenticated using (published);
create policy "Public reads published events" on public.events for select to anon, authenticated using (published);
create policy "Public reads published metrics" on public.impact_metrics for select to anon, authenticated using (published);
create policy "Public reads published media" on public.media for select to anon, authenticated using (published);
create policy "Public reads published people" on public.people for select to anon, authenticated using (published);
create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);

create policy "Admins manage posts" on public.posts for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage programs" on public.programs for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage events" on public.events for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage metrics" on public.impact_metrics for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage media" on public.media for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage people" on public.people for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage settings" on public.site_settings for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create policy "Anyone can send a submission" on public.submissions for insert to anon, authenticated with check (handled = false);
create policy "Admins read submissions" on public.submissions for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins update submissions" on public.submissions for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins delete submissions" on public.submissions for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create trigger t_posts before update on public.posts for each row execute function public.touch_updated_at();
create trigger t_programs before update on public.programs for each row execute function public.touch_updated_at();
create trigger t_events before update on public.events for each row execute function public.touch_updated_at();
create trigger t_metrics before update on public.impact_metrics for each row execute function public.touch_updated_at();
create trigger t_media before update on public.media for each row execute function public.touch_updated_at();
create trigger t_people before update on public.people for each row execute function public.touch_updated_at();
create trigger t_settings before update on public.site_settings for each row execute function public.touch_updated_at();

create policy "Admins read media files" on storage.objects for select to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "Admins upload media files" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "Admins update media files" on storage.objects for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "Admins delete media files" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));