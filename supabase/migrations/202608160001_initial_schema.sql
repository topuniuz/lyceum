create extension if not exists pgcrypto;

create type public.contact_request_status as enum ('new', 'contacted', 'resolved');

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  topic text,
  message text,
  status public.contact_request_status not null default 'new',
  assigned_to uuid references auth.users(id) on delete set null,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique,
  locale text not null check (locale in ('en', 'uz', 'ru')),
  title text,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  cover_image text,
  locale text not null default 'en' check (locale in ('en', 'uz', 'ru')),
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  department text,
  bio text,
  photo_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leadership (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  bio text,
  photo_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.academic_programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  subjects jsonb not null default '[]'::jsonb,
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  year integer,
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  alt_text text,
  category text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  locale text not null default 'en' check (locale in ('en', 'uz', 'ru')),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger contact_requests_updated_at before update on public.contact_requests for each row execute function public.set_updated_at();
create trigger site_content_updated_at before update on public.site_content for each row execute function public.set_updated_at();
create trigger news_updated_at before update on public.news for each row execute function public.set_updated_at();
create trigger teachers_updated_at before update on public.teachers for each row execute function public.set_updated_at();
create trigger leadership_updated_at before update on public.leadership for each row execute function public.set_updated_at();
create trigger academic_programs_updated_at before update on public.academic_programs for each row execute function public.set_updated_at();
create trigger faq_items_updated_at before update on public.faq_items for each row execute function public.set_updated_at();

alter table public.contact_requests enable row level security;
alter table public.site_content enable row level security;
alter table public.news enable row level security;
alter table public.teachers enable row level security;
alter table public.leadership enable row level security;
alter table public.academic_programs enable row level security;
alter table public.achievements enable row level security;
alter table public.gallery_items enable row level security;
alter table public.faq_items enable row level security;

create policy "public can create contact requests" on public.contact_requests for insert to anon, authenticated with check (true);
create policy "admins can read contact requests" on public.contact_requests for select to authenticated using (auth.uid() is not null);
create policy "admins can update contact requests" on public.contact_requests for update to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "public can read published content" on public.site_content for select to anon, authenticated using (published = true);
create policy "public can read published news" on public.news for select to anon, authenticated using (published = true);
create policy "public can read published teachers" on public.teachers for select to anon, authenticated using (published = true);
create policy "public can read published leadership" on public.leadership for select to anon, authenticated using (published = true);
create policy "public can read published programs" on public.academic_programs for select to anon, authenticated using (published = true);
create policy "public can read published achievements" on public.achievements for select to anon, authenticated using (published = true);
create policy "public can read published gallery" on public.gallery_items for select to anon, authenticated using (published = true);
create policy "public can read published faq" on public.faq_items for select to anon, authenticated using (published = true);

comment on table public.contact_requests is 'Inbound requests from the public website. Official admissions applications are not stored here.';
