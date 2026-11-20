-- ==============================================================================
-- ONE-TIME SECURE BOOTSTRAP SCRIPT FOR alareesh738@gmail.com
-- Execute in Supabase SQL Editor AFTER alareesh738@gmail.com is invited & confirmed
-- ==============================================================================
DO $$
DECLARE
  target_user_id UUID;
  target_email CONSTANT TEXT := 'alareesh738@gmail.com';
  is_confirmed BOOLEAN;
  existing_super_admin_count INT;
  existing_profile_email TEXT;
BEGIN
  -- 1. Query auth.users directly for exact user ID and confirmed status
  SELECT id, (email_confirmed_at IS NOT NULL)
  INTO target_user_id, is_confirmed
  FROM auth.users
  WHERE LOWER(email) = LOWER(target_email);

  -- 2. Validate user exists in auth.users
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'BOOTSTRAP ABORTED: User "%" was not found in auth.users. Please create or invite this user in Supabase Dashboard -> Authentication -> Users first.', target_email;
  END IF;

  -- 3. Validate confirmed status
  IF NOT is_confirmed THEN
    RAISE EXCEPTION 'BOOTSTRAP ABORTED: User "%" exists, but their email is unconfirmed (email_confirmed_at IS NULL). Please accept the invite email or toggle "Auto Confirm User".', target_email;
  END IF;

  -- 4. Guard against unauthorized existing Super Admin profiles
  SELECT COUNT(*) INTO existing_super_admin_count
  FROM public.admin_profiles
  WHERE role = 'super_admin' AND LOWER(email) != LOWER(target_email);

  IF existing_super_admin_count > 0 THEN
    RAISE EXCEPTION 'BOOTSTRAP ABORTED: An unauthorized super_admin profile already exists. Only "%" may hold this role.', target_email;
  END IF;

  -- 5. Guard against ID collision with a different email in admin_profiles
  SELECT email INTO existing_profile_email
  FROM public.admin_profiles
  WHERE id = target_user_id;

  IF existing_profile_email IS NOT NULL AND LOWER(existing_profile_email) != LOWER(target_email) THEN
    RAISE EXCEPTION 'BOOTSTRAP ABORTED: Profile ID % already belongs to email "%". Cannot reassign to "%".', target_user_id, existing_profile_email, target_email;
  END IF;

  -- 6. Safe insertion or verified update (trg_enforce_super_admin will double-check auth.users)
  INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
  VALUES (
    target_user_id,
    target_email,
    'Al Areesh Demolition Super Admin',
    'super_admin',
    TRUE
  )
  ON CONFLICT (id) DO UPDATE
    SET role = 'super_admin',
        email = target_email,
        is_active = TRUE,
        updated_at = NOW()
    WHERE LOWER(public.admin_profiles.email) = LOWER(target_email);

  -- 7. Post-provisioning cross-verification against auth.users
  IF NOT EXISTS (
    SELECT 1 
    FROM public.admin_profiles p
    JOIN auth.users u ON u.id = p.id
    WHERE p.id = target_user_id
      AND LOWER(u.email) = LOWER(target_email)
      AND LOWER(p.email) = LOWER(target_email)
      AND p.role = 'super_admin'
      AND p.is_active = TRUE
      AND u.email_confirmed_at IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'BOOTSTRAP FAILED: Post-provisioning integrity check failed against auth.users.';
  END IF;

  RAISE NOTICE 'SUCCESS: "%" (UUID: %) is confirmed in auth.users and safely established as the sole Super Admin.', target_email, target_user_id;
END $$;
