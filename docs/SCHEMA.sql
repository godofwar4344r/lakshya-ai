-- Lakshya AI Supabase schema
-- Project: edu ai

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('teacher', 'student')),
  points integer not null default 0,
  level integer not null default 1 check (level in (1, 2, 3)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level integer not null check (level in (1, 2, 3)),
  module_key text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, level, module_key)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level integer not null check (level in (1, 2, 3)),
  score integer not null default 0,
  max_score integer not null default 5,
  points_awarded integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.point_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('module_complete', 'quiz_passed', 'tool_used', 'manual_adjustment')),
  points integer not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tool_name text not null,
  level integer not null check (level in (1, 2, 3)),
  prompt text,
  response text,
  created_at timestamptz not null default now()
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

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.refresh_profile_points()
returns trigger
language plpgsql
as $$
begin
  update public.profiles
  set
    points = greatest(0, coalesce((select sum(points) from public.point_events where user_id = coalesce(new.user_id, old.user_id)), 0)),
    level = case
      when coalesce((select sum(points) from public.point_events where user_id = coalesce(new.user_id, old.user_id)), 0) >= 750 then 3
      when coalesce((select sum(points) from public.point_events where user_id = coalesce(new.user_id, old.user_id)), 0) >= 300 then 2
      else 1
    end
  where id = coalesce(new.user_id, old.user_id);
  return coalesce(new, old);
end;
$$;

drop trigger if exists point_events_refresh_profile on public.point_events;
create trigger point_events_refresh_profile
after insert or update or delete on public.point_events
for each row execute function public.refresh_profile_points();

alter table public.profiles enable row level security;
alter table public.learning_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.point_events enable row level security;
alter table public.tool_usage enable row level security;

create policy "profiles self read" on public.profiles for select using (auth.uid() = id);
create policy "profiles self insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles self update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "learning self read" on public.learning_progress for select using (auth.uid() = user_id);
create policy "learning self insert" on public.learning_progress for insert with check (auth.uid() = user_id);

create policy "quiz self read" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "quiz self insert" on public.quiz_attempts for insert with check (auth.uid() = user_id);

create policy "points self read" on public.point_events for select using (auth.uid() = user_id);
create policy "points self insert" on public.point_events for insert with check (auth.uid() = user_id);

create policy "tool self read" on public.tool_usage for select using (auth.uid() = user_id);
create policy "tool self insert" on public.tool_usage for insert with check (auth.uid() = user_id);
