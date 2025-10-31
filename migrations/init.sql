-- Optional: enable pgcrypto for gen_random_uuid()
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE offices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  address text,
  lat double precision,
  lng double precision,
  website text,
  hours text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id uuid REFERENCES offices(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  documents jsonb,
  fee numeric,
  estimated_time text
);

CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE,
  user_id uuid REFERENCES users(id),
  office_id uuid REFERENCES offices(id),
  title text,
  description text,
  status text DEFAULT 'received',
  evidence jsonb,
  location jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE tenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  office_id uuid REFERENCES offices(id),
  title text,
  description text,
  estimated_budget numeric,
  published_at timestamptz,
  deadline timestamptz
);
