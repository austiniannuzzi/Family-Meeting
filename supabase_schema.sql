-- ============================================
-- Family Meeting App — Supabase Schema
-- Run this in Supabase > SQL Editor > New Query
-- ============================================

-- User Settings (one row per user)
create table if not exists user_settings (
  id uuid default gen_random_uuid() primary key,
  user_id text unique not null,
  family_name text default 'Our Family',
  meeting_day text default 'Sunday',
  meeting_time text default '6:00 PM',
  meeting_time24 text default '18:00',
  theme text default 'warm',
  font text default 'fraunces',
  timer_sound boolean default true,
  show_spiritual boolean default true,
  show_vision boolean default true,
  custom_accent text,
  members jsonb default '["Mom","Dad","Child 1","Child 2"]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Action Items
create table if not exists actions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  text text not null,
  owner text,
  due date,
  done boolean default false,
  created_at timestamptz default now()
);

-- Bible Reading Log
create table if not exists bible_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  book text not null,
  chapter text not null,
  verses text,
  notes text,
  participants jsonb,
  date date not null,
  created_at timestamptz default now()
);

-- Kids Lesson Log
create table if not exists lesson_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  child text not null,
  topic text not null,
  resource text,
  insight text,
  completed boolean default false,
  date date not null,
  created_at timestamptz default now()
);

-- Vision Items
create table if not exists vision_items (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  horizon text not null,
  text text not null,
  status text,
  pinned boolean default false,
  created_at timestamptz default now()
);

-- Meeting History
create table if not exists meeting_history (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  date date not null,
  rating integer,
  highlights jsonb,
  action_count integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- Row Level Security (keeps each family's
-- data private — very important!)
-- ============================================

alter table user_settings   enable row level security;
alter table actions         enable row level security;
alter table bible_log       enable row level security;
alter table lesson_log      enable row level security;
alter table vision_items    enable row level security;
alter table meeting_history enable row level security;

-- Policies: users can only see/edit their own rows

create policy "user_settings_own" on user_settings   for all using (user_id = requesting_user_id());
create policy "actions_own"       on actions         for all using (user_id = requesting_user_id());
create policy "bible_log_own"     on bible_log       for all using (user_id = requesting_user_id());
alter  table lesson_log    force row level security;
create policy "lesson_log_own"    on lesson_log      for all using (user_id = requesting_user_id());
create policy "vision_items_own"  on vision_items    for all using (user_id = requesting_user_id());
create policy "meeting_history_own" on meeting_history for all using (user_id = requesting_user_id());

-- Helper function used by policies above
create or replace function requesting_user_id() returns text as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$ language sql stable;
