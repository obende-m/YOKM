-- CMS completion: gallery albums, journal categories, editable page items,
-- submission workflow, public media bucket, indexes and admin bootstrap hardening.
-- Written to be safe on a database that already has the initial schema and data:
-- it only adds tables/columns, never drops data.

-- ---------------------------------------------------------------------------
-- Admin bootstrap hardening
-- The first-signup-claims-admin flow let anyone who reached a fresh deployment
-- first take over the CMS. The first administrator is now granted with SQL
-- (see README). Further administrators are added in the CMS by an existing admin.
-- ---------------------------------------------------------------------------
drop function if exists public.claim_first_admin();

-- has_role is used by RLS policies for signed-in users; anonymous visitors never need it.
-- (Functions are executable by PUBLIC by default, so revoke from PUBLIC as well as anon.)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

create or replace function public.revoke_admin(_user_id uuid)
returns boolean language plpgsql security definer set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'forbidden'; end if;
  if _user_id = auth.uid() then raise exception 'You cannot remove your own administrator access'; end if;
  if (select count(*) from public.user_roles where role = 'admin') <= 1 then
    raise exception 'At least one administrator must remain';
  end if;
  delete from public.user_roles where user_id = _user_id and role = 'admin';
  return true;
end $$;
revoke execute on function public.revoke_admin(uuid) from public, anon;
grant execute on function public.revoke_admin(uuid) to authenticated, service_role;
revoke execute on function public.grant_admin_by_email(text) from public, anon;
grant execute on function public.grant_admin_by_email(text) to authenticated, service_role;
revoke execute on function public.list_admins() from public, anon;
grant execute on function public.list_admins() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Gallery albums
-- ---------------------------------------------------------------------------
create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  slug text not null unique,
  description text not null default '',
  album_date date,
  cover_url text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media add column if not exists album_id uuid references public.albums(id) on delete set null;
alter table public.media add column if not exists featured boolean not null default false;
alter table public.media add column if not exists taken_on date;
alter table public.media add column if not exists storage_path text;

-- ---------------------------------------------------------------------------
-- Journal categories
-- ---------------------------------------------------------------------------
create table if not exists public.post_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 80),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.post_categories (name)
select distinct trim(category) from public.posts
where kind = 'journal' and trim(category) <> ''
on conflict (name) do nothing;

-- ---------------------------------------------------------------------------
-- Editable page items (vision statements, mission commitments, areas of work)
-- ---------------------------------------------------------------------------
create table if not exists public.page_items (
  id uuid primary key default gen_random_uuid(),
  item_group text not null check (item_group in ('vision', 'mission', 'work_area')),
  label text not null default '',
  body text not null default '',
  scripture text not null default '',
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed with the ministry's own supplied wording (previously hardcoded in src/lib/yokm.ts).
insert into public.page_items (item_group, label, body, scripture, sort_order)
select * from (values
  ('vision', 'Purpose', 'To fulfil the plans and purpose of God in the life of widows.', '', 1),
  ('vision', 'Independence', 'To make them independent.', '', 2),
  ('vision', 'Discovery', 'To train and equip widows with the undiluted Word of God, and make them discover their talents and gifts.', '', 3),
  ('mission', 'Reaching Out', 'Total reaching out to widows in all aspects of life.', 'Matthew 28:19–20', 1),
  ('mission', 'The Gospel', 'To present the Gospel of Jesus to the widows.', 'John 4:17', 2),
  ('mission', 'Independence', 'To make them independent, and not dependent on people.', '1 Thessalonians 4:11–12', 3),
  ('mission', 'Community', 'To teach them how to edify one another.', 'Romans 14:19', 4),
  ('mission', 'Stewardship', 'To make them faithful stewards for Jesus.', '1 Corinthians 4:2', 5),
  ('mission', 'Good Works', 'To provoke one another to good works.', 'Hebrews 10:24', 6),
  ('mission', 'Skills & Resources', 'To teach them to be skillful and manage resources.', 'Proverbs 18:16, 20:13, 22:29', 7),
  ('mission', 'Family, Church & Society', 'To build the widows to be pillars at home, in the Church and in society.', 'Proverbs 31:15–30', 8),
  ('mission', 'Giving', 'To teach them how to be givers and not only receivers, especially in the area of building the Kingdom of God.', 'Acts 20:35; Luke 6:38', 9),
  ('mission', 'Standing in the Gap', 'To teach them how to stand in the gap for the nation and others.', 'Ezekiel 22:30', 10),
  ('work_area', 'Spiritual Growth', 'Presenting the Gospel and helping widows grow in their faith.', 'John 4:17', 1),
  ('work_area', 'Independence', 'Helping widows become less dependent on others and develop sustainable independence.', '1 Thessalonians 4:11–12', 2),
  ('work_area', 'Skills & Talents', 'Helping widows discover and develop their talents and practical skills.', 'Proverbs 22:29', 3),
  ('work_area', 'Resource Management', 'Teaching practical resource and stewardship principles.', '1 Corinthians 4:2', 4),
  ('work_area', 'Community & Mutual Support', 'Encouraging widows to support and edify one another.', 'Romans 14:19', 5),
  ('work_area', 'Family, Church & Society', 'Helping widows become pillars within their homes, churches and communities.', 'Proverbs 31:15–30', 6)
) as seed(item_group, label, body, scripture, sort_order)
where not exists (select 1 from public.page_items);

-- ---------------------------------------------------------------------------
-- Submissions: volunteer / partner enquiries and a status workflow
-- ---------------------------------------------------------------------------
alter table public.submissions add column if not exists organisation text not null default '';
alter table public.submissions add column if not exists subject text not null default '';
alter table public.submissions add column if not exists status text not null default 'new';
alter table public.submissions add column if not exists notes text not null default '';
alter table public.submissions add column if not exists updated_at timestamptz not null default now();

update public.submissions set status = 'handled' where handled and status = 'new';

do $$ begin
  alter table public.submissions add constraint submissions_status_check
    check (status in ('new', 'in_progress', 'handled', 'archived'));
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.submissions add constraint submissions_kind_check
    check (kind in ('contact', 'volunteer', 'partner'));
exception when duplicate_object or check_violation then null; end $$;

do $$ begin
  alter table public.submissions add constraint submissions_extra_len
    check (char_length(organisation) <= 200 and char_length(subject) <= 200 and char_length(notes) <= 5000);
exception when duplicate_object then null; end $$;

-- The public may only create brand-new, unhandled, note-free submissions.
drop policy if exists "Anyone can send a submission" on public.submissions;
create policy "Anyone can send a submission" on public.submissions for insert to anon, authenticated
with check (handled = false and status = 'new' and notes = '');

drop policy if exists "Admins update submissions" on public.submissions;
create policy "Admins update submissions" on public.submissions for update to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Grants, RLS and policies for new tables
-- ---------------------------------------------------------------------------
grant select on public.albums, public.post_categories, public.page_items to anon, authenticated;
grant insert, update, delete on public.albums, public.post_categories, public.page_items to authenticated;
grant all on public.albums, public.post_categories, public.page_items to service_role;

alter table public.albums enable row level security;
alter table public.post_categories enable row level security;
alter table public.page_items enable row level security;

-- A photograph is public only if it is published and is not inside a draft album.
drop policy if exists "Public reads published media" on public.media;
create policy "Public reads published media" on public.media for select to anon, authenticated
using (published and (album_id is null or exists (select 1 from public.albums a where a.id = album_id and a.published)));

drop policy if exists "Public reads published albums" on public.albums;
create policy "Public reads published albums" on public.albums for select to anon, authenticated using (published);
drop policy if exists "Admins manage albums" on public.albums;
create policy "Admins manage albums" on public.albums for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Public reads categories" on public.post_categories;
create policy "Public reads categories" on public.post_categories for select to anon, authenticated using (true);
drop policy if exists "Admins manage categories" on public.post_categories;
create policy "Admins manage categories" on public.post_categories for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Public reads published page items" on public.page_items;
create policy "Public reads published page items" on public.page_items for select to anon, authenticated using (published);
drop policy if exists "Admins manage page items" on public.page_items;
create policy "Admins manage page items" on public.page_items for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists t_albums on public.albums;
create trigger t_albums before update on public.albums for each row execute function public.touch_updated_at();
drop trigger if exists t_categories on public.post_categories;
create trigger t_categories before update on public.post_categories for each row execute function public.touch_updated_at();
drop trigger if exists t_page_items on public.page_items;
create trigger t_page_items before update on public.page_items for each row execute function public.touch_updated_at();
drop trigger if exists t_submissions on public.submissions;
create trigger t_submissions before update on public.submissions for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Indexes for the public read paths and admin lists
-- ---------------------------------------------------------------------------
create index if not exists posts_kind_published_idx on public.posts (kind, published, published_at desc);
create index if not exists programs_published_idx on public.programs (published, sort_order);
create index if not exists events_published_date_idx on public.events (published, event_date);
create index if not exists media_published_order_idx on public.media (published, sort_order);
create index if not exists media_album_idx on public.media (album_id, sort_order);
create index if not exists albums_published_idx on public.albums (published, sort_order);
create index if not exists page_items_group_idx on public.page_items (item_group, sort_order);
create index if not exists people_published_idx on public.people (published, sort_order);
create index if not exists metrics_published_idx on public.impact_metrics (published, sort_order);
create index if not exists submissions_status_idx on public.submissions (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Storage: public-read "media" bucket (images only, 10 MB), admin-only writes.
-- Public reads are served directly by Supabase Storage/CDN, so the website
-- needs no service-role key.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
on conflict (id) do update set public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
