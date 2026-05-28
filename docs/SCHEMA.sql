-- Lakshya AI · Supabase schema
-- Run this in Supabase SQL Editor after creating the project.

-- Institutions
create table if not exists institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  state text not null,
  type text not null check (type in ('school', 'college', 'university')),
  logo_url text,
  total_score int not null default 0,
  created_at timestamptz default now()
);

-- Profiles (extends Supabase auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('teacher', 'student', 'admin')),
  institution_id uuid references institutions(id),
  grade text,           -- for students
  subject text,         -- for teachers
  xp int not null default 0,
  created_at timestamptz default now()
);

-- Teacher AI tool usage log
create table if not exists ai_tool_uses (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references profiles(id) on delete cascade,
  institution_id uuid references institutions(id),
  tool text not null check (tool in ('lesson_plan', 'quiz', 'explainer')),
  input jsonb not null,
  output text not null,
  created_at timestamptz default now()
);

-- Challenges
create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brief text not null,
  category text not null check (category in ('prompt-engineering', 'ai-ethics', 'ai-build', 'ai-solve')),
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  points_reward int not null default 100,
  deadline timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Submissions
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references challenges(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  institution_id uuid references institutions(id),
  content text not null,
  score int,
  feedback jsonb,
  created_at timestamptz default now()
);

-- Helper view: institution leaderboard
create or replace view institution_leaderboard as
select
  i.id,
  i.name,
  i.city,
  i.state,
  i.type,
  i.logo_url,
  i.total_score,
  count(distinct p_t.id) filter (where p_t.role = 'teacher') as teacher_count,
  count(distinct p_s.id) filter (where p_s.role = 'student') as student_count,
  count(distinct s.id) as wins,
  rank() over (order by i.total_score desc) as rank
from institutions i
left join profiles p_t on p_t.institution_id = i.id and p_t.role = 'teacher'
left join profiles p_s on p_s.institution_id = i.id and p_s.role = 'student'
left join submissions s on s.institution_id = i.id and s.score >= 70
group by i.id;

-- Function: bump institution score after a submission scored
create or replace function bump_institution_score()
returns trigger as $$
begin
  if new.score is not null and (old.score is null or old.score is distinct from new.score) then
    update institutions set total_score = total_score + new.score where id = new.institution_id;
    update profiles set xp = xp + new.score where id = new.student_id;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_submission_score on submissions;
create trigger trg_submission_score
after insert or update of score on submissions
for each row execute function bump_institution_score();

-- RLS
alter table profiles enable row level security;
alter table institutions enable row level security;
alter table ai_tool_uses enable row level security;
alter table challenges enable row level security;
alter table submissions enable row level security;

-- Everyone can read public data
create policy "public read institutions" on institutions for select using (true);
create policy "public read challenges" on challenges for select using (true);
create policy "public read leaderboard" on profiles for select using (true);

-- Authenticated users can write their own data
create policy "self insert profile" on profiles for insert with check (auth.uid() = id);
create policy "self update profile" on profiles for update using (auth.uid() = id);
create policy "self insert tool use" on ai_tool_uses for insert with check (auth.uid() = teacher_id);
create policy "self read tool use" on ai_tool_uses for select using (auth.uid() = teacher_id);
create policy "self insert submission" on submissions for insert with check (auth.uid() = student_id);
create policy "all read submissions" on submissions for select using (true);
