-- ============================================================================
-- Kapital Insurance Group — Lead capture & CRM schema
-- Run in the Supabase SQL editor (or `supabase db push`).
-- Powers: Quote Wizard storage, Lead Dashboard, follow-up & conversion tracking.
-- ============================================================================

create extension if not exists "pgcrypto";

-- Lead lifecycle status.
do $$ begin
  create type lead_status as enum ('new', 'contacted', 'quoted', 'won', 'lost', 'nurture');
exception when duplicate_object then null; end $$;

create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  -- Quote details
  insurance_type    text not null,
  zip               text not null,
  asset_info        jsonb not null default '{}'::jsonb,   -- vehicle/home/business fields
  currently_insured text,                                  -- 'yes' | 'no'
  current_carrier   text,
  current_premium   text,
  driver_info       jsonb not null default '{}'::jsonb,    -- applicant/driver fields

  -- Contact
  first_name        text not null,
  last_name         text not null,
  email             text not null,
  phone             text not null,
  preferred_contact text default 'phone',
  consent           boolean not null default false,

  -- Pipeline / CRM
  status            lead_status not null default 'new',
  assigned_to       text,
  notes             text,
  estimated_premium numeric(10,2),
  won_premium       numeric(10,2),
  source            text default 'website-quote-wizard',
  utm               jsonb default '{}'::jsonb,

  -- Follow-up automation
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  converted_at      timestamptz
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx      on public.leads (status);
create index if not exists leads_type_idx        on public.leads (insurance_type);
create index if not exists leads_follow_up_idx   on public.leads (next_follow_up_at)
  where next_follow_up_at is not null;

-- Keep updated_at fresh.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- Activity log for follow-ups, calls, emails, status changes (CRM timeline).
create table if not exists public.lead_events (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  created_at  timestamptz not null default now(),
  type        text not null,          -- 'note' | 'call' | 'email' | 'sms' | 'status_change'
  body        text,
  meta        jsonb default '{}'::jsonb,
  actor       text
);
create index if not exists lead_events_lead_idx on public.lead_events (lead_id, created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- Leads are written by the server (service role, which bypasses RLS) and read
-- only by authenticated staff. The anon key has NO direct access.
-- ----------------------------------------------------------------------------
alter table public.leads        enable row level security;
alter table public.lead_events  enable row level security;

drop policy if exists "staff read leads" on public.leads;
create policy "staff read leads" on public.leads
  for select to authenticated using (true);

drop policy if exists "staff update leads" on public.leads;
create policy "staff update leads" on public.leads
  for update to authenticated using (true);

drop policy if exists "staff read events" on public.lead_events;
create policy "staff read events" on public.lead_events
  for all to authenticated using (true) with check (true);

-- Dashboard helper view: daily lead volume by type.
create or replace view public.lead_daily_stats as
select
  date_trunc('day', created_at)::date as day,
  insurance_type,
  count(*)                            as leads,
  count(*) filter (where status = 'won') as won
from public.leads
group by 1, 2
order by 1 desc;
