-- Phase 3 schema additions: SEO planning, briefs, reports, SOPs, AI assist logs

create type page_intent as enum ('transactional', 'commercial', 'informational', 'navigational');
create type planned_page_type as enum ('service', 'location', 'landing', 'home', 'blog');
create type planned_page_status as enum ('planned', 'brief-ready', 'in-progress', 'published');
create type brief_type as enum ('service-page', 'location-page', 'landing-page', 'home-page', 'blog-article');
create type report_status as enum ('draft', 'final');
create type sop_status as enum ('draft', 'active', 'deprecated');

create table if not exists seo_strategies (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  owner text not null,
  title text not null,
  strategy_brief text not null,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists keyword_clusters (
  id text primary key,
  strategy_id text not null references seo_strategies(id) on delete cascade,
  cluster_name text not null,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  intent page_intent not null,
  priority_score int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists planned_pages (
  id text primary key,
  strategy_id text not null references seo_strategies(id) on delete cascade,
  project_id text not null references projects(id) on delete cascade,
  page_type planned_page_type not null,
  title text not null,
  target_audience text not null,
  intent page_intent not null,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  target_location text,
  cta_goal text not null,
  trust_elements_needed text[] not null default '{}',
  notes text not null default '',
  status planned_page_status not null,
  location_priority_score int,
  duplication_risk_warning text,
  thin_page_risk_warning text,
  internal_link_recommendation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists page_briefs (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  strategy_id text references seo_strategies(id) on delete set null,
  planned_page_id text references planned_pages(id) on delete set null,
  brief_type brief_type not null,
  title text not null,
  page_objective text not null,
  audience text not null,
  search_intent page_intent not null,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  conversion_goal text not null,
  cta text not null,
  trust_proof_elements text[] not null default '{}',
  objections_to_address text[] not null default '{}',
  messaging_angle text not null,
  section_outline text[] not null default '{}',
  faq_targets text[] not null default '{}',
  internal_notes text not null default '',
  required_assets text[] not null default '{}',
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_briefs (
  id text primary key,
  page_brief_id text not null references page_briefs(id) on delete cascade,
  title text not null,
  writer_owner text not null,
  due_date date not null,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reports (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  client_name text not null,
  period_start date not null,
  period_end date not null,
  kpi_summary text not null,
  wins text[] not null default '{}',
  concerns text[] not null default '{}',
  recommendations text[] not null default '{}',
  next_month_priorities text[] not null default '{}',
  internal_notes text not null default '',
  client_safe_summary text not null default '',
  status report_status not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists report_sections (
  id text primary key,
  report_id text not null references reports(id) on delete cascade,
  category text not null,
  summary text not null,
  observations text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sops (
  id text primary key,
  title text not null,
  category text not null,
  purpose text not null,
  owner text not null,
  status sop_status not null,
  linked_service_type text,
  linked_phase text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sop_steps (
  id text primary key,
  sop_id text not null references sops(id) on delete cascade,
  step_order int not null,
  step_title text not null,
  checklist text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_generations (
  id text primary key,
  project_id text references projects(id) on delete set null,
  action text not null,
  input_context text not null,
  output_draft text not null,
  output_structured jsonb not null default '{}',
  human_reviewed boolean not null default false,
  reviewer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
