-- ==============================================================================
-- AL AREESH DEMOLITION - PRODUCTION DATABASE SCHEMA & SECURITY POLICIES
-- Target Super Admin: alareesh738@gmail.com
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. SECURITY HELPER FUNCTIONS
-- ==============================================================================

-- Trigger function: Automatically manage updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
supabase_schemaSECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Role verification: Checks active status and confirmed email in auth.users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.admin_profiles p
    JOIN auth.users u ON u.id = p.id
    WHERE p.id = auth.uid()
      AND p.is_active = TRUE
      AND p.role IN ('super_admin', 'admin', 'editor')
      AND u.email_confirmed_at IS NOT NULL
  );
END;
$$;

-- Strict Super Admin verification: Checks auth.uid(), confirmed email, and exact address
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.admin_profiles p
    JOIN auth.users u ON u.id = p.id
    WHERE p.id = auth.uid()
      AND p.is_active = TRUE
      AND p.role = 'super_admin'
      AND LOWER(u.email) = 'alareesh738@gmail.com'
      AND u.email_confirmed_at IS NOT NULL
  );
END;
$$;

REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

-- ==============================================================================
-- 3. SUPER ADMIN AUTH.USERS ENFORCEMENT TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.enforce_super_admin_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
DECLARE
  auth_email TEXT;
  auth_confirmed BOOLEAN;
BEGIN
  -- Whenever super_admin role is assigned or modified, strictly verify against real auth.users
  IF NEW.role = 'super_admin' THEN
    SELECT LOWER(email), (email_confirmed_at IS NOT NULL)
    INTO auth_email, auth_confirmed
    FROM auth.users
    WHERE id = NEW.id;

    IF auth_email IS NULL THEN
      RAISE EXCEPTION 'SECURITY VIOLATION: User ID % does not exist in auth.users.', NEW.id;
    END IF;

    IF auth_email != 'alareesh738@gmail.com' THEN
      RAISE EXCEPTION 'SECURITY VIOLATION: Only the verified Auth user "alareesh738@gmail.com" may hold the super_admin role. Attempted on: %', auth_email;
    END IF;

    IF NOT auth_confirmed THEN
      RAISE EXCEPTION 'SECURITY VIOLATION: Email for "alareesh738@gmail.com" is not confirmed in auth.users.';
    END IF;

    -- Guarantee admin_profiles.email mirrors actual auth.users email
    NEW.email := auth_email;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.enforce_super_admin_auth_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.enforce_super_admin_auth_user() TO authenticated;

-- ==============================================================================
-- 4. SPAM PROTECTION & VALIDATION FUNCTIONS
-- ==============================================================================

-- Contact message validation & rate limiting
CREATE OR REPLACE FUNCTION public.validate_contact_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  recent_count INT;
BEGIN
  IF length(trim(COALESCE(NEW.name, ''))) < 2 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters.';
  END IF;

  IF NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR length(NEW.email) > 150 THEN
    RAISE EXCEPTION 'Please provide a valid email address.';
  END IF;

  IF length(trim(COALESCE(NEW.phone, ''))) < 7 OR length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Phone number must be between 7 and 30 characters.';
  END IF;

  IF length(trim(COALESCE(NEW.subject, ''))) < 3 OR length(NEW.subject) > 200 THEN
    RAISE EXCEPTION 'Subject must be between 3 and 200 characters.';
  END IF;

  IF length(trim(COALESCE(NEW.message, ''))) < 10 OR length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be between 10 and 5000 characters.';
  END IF;

  -- Sliding window anti-spam: Max 5 submissions per email within 10 minutes
  SELECT COUNT(*) INTO recent_count
  FROM public.contact_messages
  WHERE LOWER(email) = LOWER(NEW.email)
    AND created_at > (NOW() - INTERVAL '10 minutes');

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Submission limit reached. Please wait a few minutes before submitting another inquiry.';
  END IF;

  -- Protect against client tampering with read status or creation timestamp
  NEW.is_read := FALSE;
  NEW.status := 'unread';
  NEW.created_at := NOW();

  RETURN NEW;
END;
$$;

-- Career application validation & rate limiting
CREATE OR REPLACE FUNCTION public.validate_career_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  recent_count INT;
BEGIN
  IF length(trim(COALESCE(NEW.applicant_name, ''))) < 2 OR length(NEW.applicant_name) > 100 THEN
    RAISE EXCEPTION 'Applicant name must be between 2 and 100 characters.';
  END IF;

  IF NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR length(NEW.email) > 150 THEN
    RAISE EXCEPTION 'Please provide a valid email address.';
  END IF;

  IF length(trim(COALESCE(NEW.phone, ''))) < 7 OR length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Phone number must be between 7 and 30 characters.';
  END IF;

  IF length(trim(COALESCE(NEW.experience_summary, ''))) > 3000 THEN
    RAISE EXCEPTION 'Experience summary cannot exceed 3000 characters.';
  END IF;

  -- Anti-spam: Max 1 application per email for the same job within 15 minutes
  SELECT COUNT(*) INTO recent_count
  FROM public.careers_applications
  WHERE LOWER(email) = LOWER(NEW.email)
    AND job_id IS NOT DISTINCT FROM NEW.job_id
    AND created_at > (NOW() - INTERVAL '15 minutes');

  IF recent_count >= 1 THEN
    RAISE EXCEPTION 'An application for this role has already been submitted recently from this email.';
  END IF;

  -- Protect against client tampering with application status
  NEW.status := 'new';
  NEW.created_at := NOW();

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_contact_message() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_contact_message() TO anon, authenticated;

REVOKE ALL ON FUNCTION public.validate_career_application() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_career_application() TO anon, authenticated;

-- ==============================================================================
-- 5. TABLE CREATION & COLUMN SYNCHRONIZATION
-- ==============================================================================

-- 5.1 Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'editor';
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.admin_profiles DROP CONSTRAINT IF EXISTS chk_admin_profiles_role;
ALTER TABLE public.admin_profiles ADD CONSTRAINT chk_admin_profiles_role CHECK (role IN ('super_admin', 'admin', 'editor'));

-- Strict database-level lock: Only alareesh738@gmail.com can EVER have role='super_admin'
ALTER TABLE public.admin_profiles DROP CONSTRAINT IF EXISTS super_admin_email_lock;
ALTER TABLE public.admin_profiles ADD CONSTRAINT super_admin_email_lock CHECK (
  role != 'super_admin' OR LOWER(email) = 'alareesh738@gmail.com'
);

-- Trigger: Enforce actual auth.users email and confirmation on Super Admin assignment
DROP TRIGGER IF EXISTS trg_enforce_super_admin ON public.admin_profiles;
CREATE TRIGGER trg_enforce_super_admin
BEFORE INSERT OR UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.enforce_super_admin_auth_user();

DROP TRIGGER IF EXISTS trg_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER trg_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.2 Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL DEFAULT 'Demolition',
  short_description TEXT,
  featured_image TEXT,
  overview_headline TEXT,
  overview_paragraphs TEXT[] DEFAULT '{}',
  safety_headline TEXT,
  safety_features TEXT[] DEFAULT '{}',
  cost_factors TEXT[] DEFAULT '{}',
  order_index INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Demolition';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS overview_headline TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS overview_paragraphs TEXT[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS safety_headline TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS safety_features TEXT[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cost_factors TEXT[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.services SET is_published = TRUE WHERE is_published IS NULL;

DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
CREATE TRIGGER trg_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.3 Sub-Services
CREATE TABLE IF NOT EXISTS public.service_sub_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'CheckCircle2',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_sub_services ADD COLUMN IF NOT EXISTS service_id UUID;
ALTER TABLE public.service_sub_services ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.service_sub_services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.service_sub_services ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'CheckCircle2';
ALTER TABLE public.service_sub_services ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.service_sub_services DROP CONSTRAINT IF EXISTS fk_sub_services_service;
ALTER TABLE public.service_sub_services ADD CONSTRAINT fk_sub_services_service
  FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

-- 5.4 Process Steps
CREATE TABLE IF NOT EXISTS public.service_process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  step_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_process_steps ADD COLUMN IF NOT EXISTS service_id UUID;
ALTER TABLE public.service_process_steps ADD COLUMN IF NOT EXISTS step_number TEXT;
ALTER TABLE public.service_process_steps ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.service_process_steps ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.service_process_steps ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.service_process_steps DROP CONSTRAINT IF EXISTS fk_process_steps_service;
ALTER TABLE public.service_process_steps ADD CONSTRAINT fk_process_steps_service
  FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

-- 5.5 Service FAQs
CREATE TABLE IF NOT EXISTS public.service_faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_faqs ADD COLUMN IF NOT EXISTS service_id UUID;
ALTER TABLE public.service_faqs ADD COLUMN IF NOT EXISTS question TEXT;
ALTER TABLE public.service_faqs ADD COLUMN IF NOT EXISTS answer TEXT;
ALTER TABLE public.service_faqs ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.service_faqs DROP CONSTRAINT IF EXISTS fk_faqs_service;
ALTER TABLE public.service_faqs ADD CONSTRAINT fk_faqs_service
  FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

-- 5.6 Service Images
CREATE TABLE IF NOT EXISTS public.service_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.service_images ADD COLUMN IF NOT EXISTS service_id UUID;
ALTER TABLE public.service_images ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.service_images ADD COLUMN IF NOT EXISTS caption TEXT;
ALTER TABLE public.service_images ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

ALTER TABLE public.service_images DROP CONSTRAINT IF EXISTS fk_images_service;
ALTER TABLE public.service_images ADD CONSTRAINT fk_images_service
  FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

-- 5.7 Photo Gallery
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'All',
  image_url TEXT NOT NULL,
  location TEXT DEFAULT 'Dubai, UAE',
  aspect_ratio TEXT DEFAULT 'square',
  order_index INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'All';
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Dubai, UAE';
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS aspect_ratio TEXT DEFAULT 'square';
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.gallery_photos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.gallery_photos SET is_published = TRUE WHERE is_published IS NULL;

DROP TRIGGER IF EXISTS trg_gallery_photos_updated_at ON public.gallery_photos;
CREATE TRIGGER trg_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.8 Video Gallery
CREATE TABLE IF NOT EXISTS public.gallery_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Operations',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Operations';
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS duration TEXT;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.gallery_videos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.gallery_videos SET is_published = TRUE WHERE is_published IS NULL;

DROP TRIGGER IF EXISTS trg_gallery_videos_updated_at ON public.gallery_videos;
CREATE TRIGGER trg_gallery_videos_updated_at
BEFORE UPDATE ON public.gallery_videos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.9 Clients
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Government & Master Developers',
  logo_url TEXT NOT NULL,
  website_url TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Government & Master Developers';
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.clients SET is_active = TRUE WHERE is_active IS NULL;

DROP TRIGGER IF EXISTS trg_clients_updated_at ON public.clients;
CREATE TRIGGER trg_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.10 Page Contents (Protected with is_published)
CREATE TABLE IF NOT EXISTS public.page_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_page_section UNIQUE (page_key, section_key)
);

ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS page_key TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS section_key TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;
ALTER TABLE public.page_contents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.page_contents SET is_published = TRUE WHERE is_published IS NULL;

DROP TRIGGER IF EXISTS trg_page_contents_updated_at ON public.page_contents;
CREATE TRIGGER trg_page_contents_updated_at
BEFORE UPDATE ON public.page_contents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.11 Careers Jobs
CREATE TABLE IF NOT EXISTS public.careers_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Dubai, UAE',
  job_type TEXT NOT NULL DEFAULT 'Full-Time',
  experience TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Dubai, UAE';
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS job_type TEXT DEFAULT 'Full-Time';
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS experience TEXT;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE public.careers_jobs SET is_active = TRUE WHERE is_active IS NULL;

DROP TRIGGER IF EXISTS trg_careers_jobs_updated_at ON public.careers_jobs;
CREATE TRIGGER trg_careers_jobs_updated_at
BEFORE UPDATE ON public.careers_jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5.12 Careers Applications (Strictly Private)
CREATE TABLE IF NOT EXISTS public.careers_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.careers_jobs(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience_summary TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS job_id UUID;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS applicant_name TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS experience_summary TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS resume_url TEXT;
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE public.careers_applications ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.careers_applications DROP CONSTRAINT IF EXISTS chk_careers_applications_status;
ALTER TABLE public.careers_applications ADD CONSTRAINT chk_careers_applications_status CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected'));

ALTER TABLE public.careers_applications DROP CONSTRAINT IF EXISTS fk_applications_job;
ALTER TABLE public.careers_applications ADD CONSTRAINT fk_applications_job
  FOREIGN KEY (job_id) REFERENCES public.careers_jobs(id) ON DELETE SET NULL;

DROP TRIGGER IF EXISTS trg_validate_career_app ON public.careers_applications;
CREATE TRIGGER trg_validate_career_app
BEFORE INSERT ON public.careers_applications
FOR EACH ROW EXECUTE FUNCTION public.validate_career_application();

-- 5.13 Contact Messages (Strictly Private)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'Contact Us Page',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'Contact Us Page';
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'unread';
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.contact_messages DROP CONSTRAINT IF EXISTS chk_contact_messages_status;
ALTER TABLE public.contact_messages ADD CONSTRAINT chk_contact_messages_status CHECK (status IN ('unread', 'in_progress', 'quoted', 'archived'));

DROP TRIGGER IF EXISTS trg_validate_contact_msg ON public.contact_messages;
CREATE TRIGGER trg_validate_contact_msg
BEFORE INSERT ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.validate_contact_message();

-- ==============================================================================
-- 6. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_pub_order ON public.services(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_sub_services_sid ON public.service_sub_services(service_id);
CREATE INDEX IF NOT EXISTS idx_process_steps_sid ON public.service_process_steps(service_id);
CREATE INDEX IF NOT EXISTS idx_service_faqs_sid ON public.service_faqs(service_id);
CREATE INDEX IF NOT EXISTS idx_service_images_sid ON public.service_images(service_id);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_pub_cat ON public.gallery_photos(is_published, category);
CREATE INDEX IF NOT EXISTS idx_gallery_videos_pub ON public.gallery_videos(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_clients_active_order ON public.clients(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_page_contents_lookup ON public.page_contents(page_key, section_key, is_published);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_active ON public.careers_jobs(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_contact_messages_date ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_applications_date ON public.careers_applications(created_at DESC);

-- ==============================================================================
-- 7. PERMISSIONS & TABLE GRANTS
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Public can SELECT published website data
GRANT SELECT ON public.services TO anon, authenticated;
GRANT SELECT ON public.service_sub_services TO anon, authenticated;
GRANT SELECT ON public.service_process_steps TO anon, authenticated;
GRANT SELECT ON public.service_faqs TO anon, authenticated;
GRANT SELECT ON public.service_images TO anon, authenticated;
GRANT SELECT ON public.gallery_photos TO anon, authenticated;
GRANT SELECT ON public.gallery_videos TO anon, authenticated;
GRANT SELECT ON public.clients TO anon, authenticated;
GRANT SELECT ON public.page_contents TO anon, authenticated;
GRANT SELECT ON public.careers_jobs TO anon, authenticated;

-- Public can ONLY insert into forms (no SELECT, UPDATE, or DELETE)
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT INSERT ON public.careers_applications TO anon, authenticated;

-- Explicitly revoke public access from private tables
REVOKE ALL ON public.admin_profiles FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.careers_applications FROM anon;

-- Authenticated admins get full access managed by RLS
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, anon;

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_sub_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 8.1 ADMIN PROFILES (No Public Access; Only Super Admin modifies accounts)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view admin profiles" ON public.admin_profiles;
CREATE POLICY "Admins can view admin profiles"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Super Admins can create admin profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can create admin profiles"
  ON public.admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Super Admins can update admin profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can update admin profiles"
  ON public.admin_profiles FOR UPDATE
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Super Admins can delete admin profiles" ON public.admin_profiles;
CREATE POLICY "Super Admins can delete admin profiles"
  ON public.admin_profiles FOR DELETE
  TO authenticated
  USING (public.is_super_admin() AND id != auth.uid());

-- -----------------------------------------------------------------------------
-- 8.2 SERVICES POLICIES (Unpublished services hidden from public)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anon read published services" ON public.services;
DROP POLICY IF EXISTS "Public read published services" ON public.services;
CREATE POLICY "Anon read published services"
  ON public.services FOR SELECT
  TO anon
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Authenticated read services" ON public.services;
CREATE POLICY "Authenticated read services"
  ON public.services FOR SELECT
  TO authenticated
  USING (is_published = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage services" ON public.services;
CREATE POLICY "Admin manage services"
  ON public.services FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Sub-Services
DROP POLICY IF EXISTS "Anon read sub-services" ON public.service_sub_services;
DROP POLICY IF EXISTS "Public read sub-services" ON public.service_sub_services;
CREATE POLICY "Anon read sub-services"
  ON public.service_sub_services FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.is_published = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated read sub-services" ON public.service_sub_services;
CREATE POLICY "Authenticated read sub-services"
  ON public.service_sub_services FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND (s.is_published = TRUE OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Admin manage sub-services" ON public.service_sub_services;
CREATE POLICY "Admin manage sub-services"
  ON public.service_sub_services FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Process Steps
DROP POLICY IF EXISTS "Anon read process steps" ON public.service_process_steps;
DROP POLICY IF EXISTS "Public read process steps" ON public.service_process_steps;
CREATE POLICY "Anon read process steps"
  ON public.service_process_steps FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.is_published = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated read process steps" ON public.service_process_steps;
CREATE POLICY "Authenticated read process steps"
  ON public.service_process_steps FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND (s.is_published = TRUE OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Admin manage process steps" ON public.service_process_steps;
CREATE POLICY "Admin manage process steps"
  ON public.service_process_steps FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service FAQs
DROP POLICY IF EXISTS "Anon read service faqs" ON public.service_faqs;
DROP POLICY IF EXISTS "Public read service faqs" ON public.service_faqs;
CREATE POLICY "Anon read service faqs"
  ON public.service_faqs FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.is_published = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated read service faqs" ON public.service_faqs;
CREATE POLICY "Authenticated read service faqs"
  ON public.service_faqs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND (s.is_published = TRUE OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Admin manage service faqs" ON public.service_faqs;
CREATE POLICY "Admin manage service faqs"
  ON public.service_faqs FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service Images
DROP POLICY IF EXISTS "Anon read service images" ON public.service_images;
DROP POLICY IF EXISTS "Public read service images" ON public.service_images;
CREATE POLICY "Anon read service images"
  ON public.service_images FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.is_published = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated read service images" ON public.service_images;
CREATE POLICY "Authenticated read service images"
  ON public.service_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND (s.is_published = TRUE OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Admin manage service images" ON public.service_images;
CREATE POLICY "Admin manage service images"
  ON public.service_images FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.3 PHOTO & VIDEO GALLERIES (Drafts hidden from public)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anon read published photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Public read published photos" ON public.gallery_photos;
CREATE POLICY "Anon read published photos"
  ON public.gallery_photos FOR SELECT
  TO anon
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Authenticated read photos" ON public.gallery_photos;
CREATE POLICY "Authenticated read photos"
  ON public.gallery_photos FOR SELECT
  TO authenticated
  USING (is_published = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage photos" ON public.gallery_photos;
CREATE POLICY "Admin manage photos"
  ON public.gallery_photos FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Anon read published videos" ON public.gallery_videos;
DROP POLICY IF EXISTS "Public read published videos" ON public.gallery_videos;
CREATE POLICY "Anon read published videos"
  ON public.gallery_videos FOR SELECT
  TO anon
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Authenticated read videos" ON public.gallery_videos;
CREATE POLICY "Authenticated read videos"
  ON public.gallery_videos FOR SELECT
  TO authenticated
  USING (is_published = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage videos" ON public.gallery_videos;
CREATE POLICY "Admin manage videos"
  ON public.gallery_videos FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.4 CLIENTS (Inactive clients hidden from public)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anon read active clients" ON public.clients;
DROP POLICY IF EXISTS "Public read active clients" ON public.clients;
CREATE POLICY "Anon read active clients"
  ON public.clients FOR SELECT
  TO anon
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Authenticated read clients" ON public.clients;
CREATE POLICY "Authenticated read clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage clients" ON public.clients;
CREATE POLICY "Admin manage clients"
  ON public.clients FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.5 PAGE CONTENTS (Draft sections hidden from public)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anon read published page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Public read page contents" ON public.page_contents;
CREATE POLICY "Anon read published page contents"
  ON public.page_contents FOR SELECT
  TO anon
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Authenticated read page contents" ON public.page_contents;
CREATE POLICY "Authenticated read page contents"
  ON public.page_contents FOR SELECT
  TO authenticated
  USING (is_published = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage page contents" ON public.page_contents;
CREATE POLICY "Admin manage page contents"
  ON public.page_contents FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.6 CAREERS JOBS (Inactive jobs hidden from public)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anon read active jobs" ON public.careers_jobs;
DROP POLICY IF EXISTS "Public read active jobs" ON public.careers_jobs;
CREATE POLICY "Anon read active jobs"
  ON public.careers_jobs FOR SELECT
  TO anon
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Authenticated read jobs" ON public.careers_jobs;
CREATE POLICY "Authenticated read jobs"
  ON public.careers_jobs FOR SELECT
  TO authenticated
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage jobs" ON public.careers_jobs;
CREATE POLICY "Admin manage jobs"
  ON public.careers_jobs FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.7 SENSITIVE: CAREERS APPLICATIONS (Private; Zero public read)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public submit job applications" ON public.careers_applications;
CREATE POLICY "Public submit job applications"
  ON public.careers_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin view job applications" ON public.careers_applications;
CREATE POLICY "Admin view job applications"
  ON public.careers_applications FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update job applications" ON public.careers_applications;
CREATE POLICY "Admin update job applications"
  ON public.careers_applications FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin delete job applications" ON public.careers_applications;
CREATE POLICY "Admin delete job applications"
  ON public.careers_applications FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8.8 SENSITIVE: CONTACT MESSAGES (Private; Zero public read)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public submit contact messages" ON public.contact_messages;
CREATE POLICY "Public submit contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin view contact messages" ON public.contact_messages;
CREATE POLICY "Admin view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update contact messages" ON public.contact_messages;
CREATE POLICY "Admin update contact messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin delete contact messages" ON public.contact_messages;
CREATE POLICY "Admin delete contact messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ==============================================================================
-- 9. STORAGE BUCKETS SETUP & POLICIES
-- ==============================================================================

-- Create buckets idempotently
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('service-images', 'service-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('gallery-images', 'gallery-images', true, 15728640, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('gallery-videos', 'gallery-videos', true, 157286400, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('client-logos', 'client-logos', true, 5242880, ARRAY['image/png', 'image/svg+xml', 'image/webp']),
  ('page-images', 'page-images', true, 15728640, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('applicant-resumes', 'applicant-resumes', false, 10485760, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public can view files from public media buckets only
DROP POLICY IF EXISTS "Public view storage assets" ON storage.objects;
CREATE POLICY "Public view storage assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id IN ('service-images', 'gallery-images', 'gallery-videos', 'client-logos', 'page-images'));

-- Only confirmed admins can view uploaded applicant resumes
DROP POLICY IF EXISTS "Admins view resumes" ON storage.objects;
CREATE POLICY "Admins view resumes"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'applicant-resumes' AND public.is_admin());

-- Public can upload their resume with application
DROP POLICY IF EXISTS "Public upload resume" ON storage.objects;
CREATE POLICY "Public upload resume"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'applicant-resumes');

-- Only admins can upload files into website media buckets
DROP POLICY IF EXISTS "Admins upload media assets" ON storage.objects;
CREATE POLICY "Admins upload media assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id IN ('service-images', 'gallery-images', 'gallery-videos', 'client-logos', 'page-images')
    AND public.is_admin()
  );

-- Only admins can update storage files in any bucket
DROP POLICY IF EXISTS "Admins update storage assets" ON storage.objects;
CREATE POLICY "Admins update storage assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete storage files in any bucket
DROP POLICY IF EXISTS "Admins delete storage assets" ON storage.objects;
CREATE POLICY "Admins delete storage assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (public.is_admin());
