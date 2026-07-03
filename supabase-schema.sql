-- Supabase SQL Editor에서 실행하세요.

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  name text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('seminar', 'request', 'call', 'ndr-corpday', 'dept-support')),
  occurred_at timestamptz not null, -- 일시
  analyst text not null, -- 애널리스트
  target text, -- 대상자 (seminar/request/call/dept-support 전용)
  institution text, -- 기관 (ndr-corpday 전용)
  company text, -- 기업 (ndr-corpday 전용)
  author_id uuid not null references users(id) on delete cascade,
  author_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists posts_category_idx on posts (category, created_at desc);

-- 이 앱은 서버 측에서 Service Role Key로만 접근하므로 RLS는 기본적으로 막아둡니다.
alter table users enable row level security;
alter table posts enable row level security;
