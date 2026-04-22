-- Phase 4 schema additions: automation, revenue intelligence, retention, communications, integrations, insights, hardening

create table if not exists automations (
  id text primary key,
  name text not null,
  trigger text not null,
  condition_summary text not null,
  actions text[] not null default '{}',
  owner text not null,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists automation_logs (
  id text primary key,
  automation_id text not null references automations(id) on delete cascade,
  trigger text not null,
  project_id text references projects(id) on delete set null,
  matched boolean not null,
  result text not null,
  details text not null,
  executed_actions text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists deal_values (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  service_type text not null,
  stage text not null,
  deal_value numeric not null,
  probability_pct int not null,
  expected_revenue numeric not null,
  is_retainer boolean not null default false,
  monthly_recurring_value numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pipeline_snapshots (
  id text primary key,
  total_pipeline_value numeric not null,
  weighted_pipeline_value numeric not null,
  won_value numeric not null,
  lost_value numeric not null,
  projected_next_30_days numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists retention_signals (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  signal_type text not null,
  severity int not null,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_health (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  score int not null,
  level text not null,
  risk_flags text[] not null default '{}',
  engagement_signals text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists expansion_opportunities (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  service_suggestion text not null,
  rationale text not null,
  confidence text not null,
  next_opportunity_note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists communication_messages (
  id text primary key,
  type text not null,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  subject text not null,
  body_draft text not null,
  editable_body text not null,
  status text not null,
  sent_at timestamptz,
  generated_by_ai boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists integrations_config (
  id text primary key,
  provider text not null,
  enabled boolean not null default false,
  status text not null,
  notes text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists derived_metrics (
  id text primary key,
  metric_key text not null,
  metric_label text not null,
  value numeric not null,
  unit text not null,
  interpretation text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id text primary key,
  actor text not null,
  role text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  summary text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
