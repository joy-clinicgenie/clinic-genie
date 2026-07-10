create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  clinic_name text not null,
  email text not null,
  phone text,
  specialty text not null,
  message text not null,
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

create policy "contact_submissions_insert"
  on public.contact_submissions
  for insert
  with check (true);

create policy "contact_submissions_select"
  on public.contact_submissions
  for select
  using (true);
