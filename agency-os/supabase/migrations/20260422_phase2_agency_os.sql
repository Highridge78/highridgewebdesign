-- Phase 2 schema additions for Agency OS
-- Isolated blueprint migration. Apply in dedicated Agency OS Supabase project.

create type project_phase_name as enum (
  'strategy',
  'content',
  'design',
  'development',
  'qa',
  'launch',
  'post-launch'
);

create type project_status as enum ('active', 'paused', 'at-risk', 'completed');
create type project_health as enum ('green', 'yellow', 'red');
create type approval_status as enum ('draft', 'requested', 'approved', 'rejected', 'expired');
create type change_request_status as enum (
  'submitted',
  'reviewing',
  'approved',
  'declined',
  'merged-into-scope',
  'deferred'
);
create type dependency_owner as enum ('client', 'internal');

create table if not exists projects (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  client_name text not null,
  contact_name text not null,
  linked_proposal_id text not null,
  linked_onboarding_workspace_id text,
  current_phase project_phase_name not null,
  status project_status not null,
  health project_health not null default 'green',
  owner text not null,
  start_date date not null,
  target_launch_date date not null,
  target_post_launch_date date,
  internal_notes text not null default '',
  client_summary text not null default ''
);

create table if not exists project_phases (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase project_phase_name not null,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_milestones (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  title text not null,
  due_date date not null,
  completed_at date,
  owner text not null,
  client_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists delivery_items (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase project_phase_name not null,
  task_group text not null,
  title text not null,
  owner text not null,
  status text not null,
  dependency_owner dependency_owner,
  client_visible boolean not null default false,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_blockers (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  title text not null,
  description text not null,
  status text not null,
  owner text not null,
  dependency_owner dependency_owner not null,
  opened_at date not null,
  resolved_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists approvals (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  title text not null,
  type text not null,
  deliverable_ref text not null,
  requested_from text not null,
  requested_date date,
  due_date date not null,
  status approval_status not null,
  internal_notes text not null default '',
  client_message text not null default '',
  approved_at timestamptz,
  rejected_at timestamptz,
  revision_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists approval_events (
  id text primary key,
  approval_id text not null references approvals(id) on delete cascade,
  event_type text not null,
  actor text not null,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists change_requests (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  request_title text not null,
  request_description text not null,
  requested_by text not null,
  date_submitted date not null,
  status change_request_status not null,
  impact_summary text not null,
  timeline_impact_days int not null default 0,
  cost_impact text not null default 'TBD',
  internal_assessment text not null,
  client_summary text not null,
  decision_result text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_workspaces (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  kickoff_date date not null,
  kickoff_readiness text not null,
  internal_notes text not null default '',
  next_steps_client text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_items (
  id text primary key,
  workspace_id text not null references onboarding_workspaces(id) on delete cascade,
  project_id text not null references projects(id) on delete cascade,
  category text not null,
  title text not null,
  description text not null,
  status text not null,
  waiting_on dependency_owner not null,
  due_date date not null,
  client_visible boolean not null default true,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_updates (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  summary text not null,
  audience text not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_portal_visibility (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  resource text not null,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
