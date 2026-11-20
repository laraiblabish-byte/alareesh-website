import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

/**
 * Checks whether Supabase credentials have been properly configured in .env
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  isValidUrl(supabaseUrl) &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

/**
 * Supabase client singleton
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * ==============================================================================
 * PUBLIC DATA API (With automatic graceful fallback to static data)
 * ==============================================================================
 */

/**
 * Fetch all published services
 */
export async function getServices() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        sub_services:service_sub_services(*),
        process_steps:service_process_steps(*),
        faqs:service_faqs(*),
        images:service_images(*)
      `)
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.warn('Supabase getServices warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getServices error:', err);
    return null;
  }
}

/**
 * Fetch single service by slug
 */
export async function getServiceBySlug(slug) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        sub_services:service_sub_services(*),
        process_steps:service_process_steps(*),
        faqs:service_faqs(*),
        images:service_images(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getServiceBySlug warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getServiceBySlug error:', err);
    return null;
  }
}

/**
 * Fetch published gallery photos
 */
export async function getGalleryPhotos(category = 'All') {
  if (!supabase) return null;
  try {
    let query = supabase
      .from('gallery_photos')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase getGalleryPhotos warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getGalleryPhotos error:', err);
    return null;
  }
}

/**
 * Fetch published gallery videos
 */
export async function getGalleryVideos(category = 'All') {
  if (!supabase) return null;
  try {
    let query = supabase
      .from('gallery_videos')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase getGalleryVideos warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getGalleryVideos error:', err);
    return null;
  }
}

/**
 * Fetch active clients
 */
export async function getClients() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.warn('Supabase getClients warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getClients error:', err);
    return null;
  }
}

/**
 * Fetch active career positions
 */
export async function getCareerJobs() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('careers_jobs')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.warn('Supabase getCareerJobs warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getCareerJobs error:', err);
    return null;
  }
}

/**
 * Fetch published page content section
 */
export async function getPageSection(pageKey, sectionKey) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*')
      .eq('page_key', pageKey)
      .eq('section_key', sectionKey)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.warn('Supabase getPageSection warning:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase getPageSection error:', err);
    return null;
  }
}

/**
 * ==============================================================================
 * PUBLIC SUBMISSION HANDLERS
 * ==============================================================================
 */

/**
 * Submit contact message or quote request
 * @param {Object} payload { name, email, phone, subject, message, source }
 */
export async function submitContactMessage(payload) {
  if (!supabase) {
    // Simulated success when offline or unconfigured
    return { success: true, simulated: true };
  }

  const { error } = await supabase.from('contact_messages').insert([
    {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      subject: (payload.subject || 'Inquiry from Website').trim(),
      message: payload.message.trim(),
      source: payload.source || 'Contact Us Page',
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Submit career job application
 * @param {Object} payload { job_id, job_title, applicant_name, email, phone, experience_summary }
 * @param {File|null} resumeFile Optional resume document (PDF, Word)
 */
export async function submitCareerApplication(payload, resumeFile = null) {
  if (!supabase) {
    return { success: true, simulated: true };
  }

  let resumeUrl = null;

  // Upload resume to strictly private bucket if provided
  if (resumeFile && resumeFile instanceof File) {
    const fileExt = resumeFile.name.split('.').pop() || 'pdf';
    const cleanFileName = `resume_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `resumes/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('applicant-resumes')
      .upload(filePath, resumeFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.warn('Resume upload warning:', uploadError.message);
    } else {
      resumeUrl = filePath;
    }
  }

  const { error } = await supabase.from('careers_applications').insert([
    {
      job_id: payload.job_id || null,
      job_title: payload.job_title || 'General Application',
      applicant_name: payload.applicant_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      experience_summary: payload.experience_summary || '',
      resume_url: resumeUrl,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * ==============================================================================
 * AUTHENTICATION HELPERS
 * ==============================================================================
 */

/**
 * Sign in admin user with email and password
 */
export async function signInAdmin(email, password) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out current admin user
 */
export async function signOutAdmin() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get current session
 */
export async function getSession() {
  if (!supabase) return null;
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

/**
 * Get current admin profile
 */
export async function getCurrentAdminProfile() {
  if (!supabase) return null;
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile) return null;
  return { ...profile, auth_email: user.email };
}

/**
 * ==============================================================================
 * ADMIN CRUD & MANAGEMENT HELPERS
 * ==============================================================================
 */

/**
 * Fetch overview metrics for the Admin Dashboard
 */
export async function adminGetDashboardStats() {
  if (!supabase) return null;
  try {
    const [
      { count: servicesCount },
      { count: photosCount },
      { count: videosCount },
      { count: clientsCount },
      { count: jobsCount },
      { count: unreadMessagesCount },
      { count: newApplicationsCount }
    ] = await Promise.all([
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('gallery_photos').select('*', { count: 'exact', head: true }),
      supabase.from('gallery_videos').select('*', { count: 'exact', head: true }),
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('careers_jobs').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('careers_applications').select('*', { count: 'exact', head: true }).eq('status', 'new')
    ]);

    return {
      services: servicesCount || 0,
      photos: photosCount || 0,
      videos: videosCount || 0,
      clients: clientsCount || 0,
      jobs: jobsCount || 0,
      unreadMessages: unreadMessagesCount || 0,
      newApplications: newApplicationsCount || 0
    };
  } catch (err) {
    console.error('adminGetDashboardStats error:', err);
    return null;
  }
}

/**
 * Upload asset to Supabase Storage bucket
 */
export async function uploadStorageAsset(bucketName, file, folder = 'uploads') {
  if (!supabase) throw new Error('Supabase is not configured');
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return publicUrl;
}

/**
 * Get signed URL for private resume document
 */
export async function getSignedResumeUrl(filePath) {
  if (!supabase || !filePath) return null;
  try {
    const { data, error } = await supabase.storage
      .from('applicant-resumes')
      .createSignedUrl(filePath, 3600); // 1-hour expiry
    if (error) throw error;
    return data?.signedUrl || null;
  } catch (err) {
    console.warn('getSignedResumeUrl error:', err.message);
    return null;
  }
}

/**
 * Admin: Fetch all services (published & unpublished)
 */
export async function adminGetAllServices() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Save or update service
 */
export async function adminSaveService(serviceData) {
  if (!supabase) throw new Error('Supabase not configured');
  if (serviceData.id) {
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', serviceData.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('services')
      .insert([serviceData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

/**
 * Admin: Delete service
 */
export async function adminDeleteService(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all gallery photos
 */
export async function adminGetAllPhotos() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Save or update photo
 */
export async function adminSavePhoto(photoData) {
  if (!supabase) throw new Error('Supabase not configured');
  if (photoData.id) {
    const { data, error } = await supabase
      .from('gallery_photos')
      .update(photoData)
      .eq('id', photoData.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('gallery_photos')
      .insert([photoData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

/**
 * Admin: Delete photo
 */
export async function adminDeletePhoto(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all gallery videos
 */
export async function adminGetAllVideos() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('gallery_videos')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Save or update video
 */
export async function adminSaveVideo(videoData) {
  if (!supabase) throw new Error('Supabase not configured');
  if (videoData.id) {
    const { data, error } = await supabase
      .from('gallery_videos')
      .update(videoData)
      .eq('id', videoData.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('gallery_videos')
      .insert([videoData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

/**
 * Admin: Delete video
 */
export async function adminDeleteVideo(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('gallery_videos').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all clients
 */
export async function adminGetAllClients() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Save or update client
 */
export async function adminSaveClient(clientData) {
  if (!supabase) throw new Error('Supabase not configured');
  if (clientData.id) {
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', clientData.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

/**
 * Admin: Delete client
 */
export async function adminDeleteClient(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('clients').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all careers jobs
 */
export async function adminGetAllJobs() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('careers_jobs')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Save or update job
 */
export async function adminSaveJob(jobData) {
  if (!supabase) throw new Error('Supabase not configured');
  if (jobData.id) {
    const { data, error } = await supabase
      .from('careers_jobs')
      .update(jobData)
      .eq('id', jobData.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('careers_jobs')
      .insert([jobData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

/**
 * Admin: Delete job
 */
export async function adminDeleteJob(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('careers_jobs').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all job applications
 */
export async function adminGetAllApplications() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('careers_applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Update application status
 */
export async function adminUpdateApplicationStatus(id, status) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('careers_applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin: Delete job application
 */
export async function adminDeleteApplication(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('careers_applications').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch all contact messages & inquiries
 */
export async function adminGetAllMessages() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Update contact message (is_read / status)
 */
export async function adminUpdateMessage(id, updates) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('contact_messages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin: Delete contact message
 */
export async function adminDeleteMessage(id) {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Admin: Fetch admin profiles
 */
export async function adminGetProfiles() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('admin_profiles')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Admin: Update admin profile (Super Admin only)
 */
export async function adminUpdateProfile(id, updates) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('admin_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin: Sync & seed default website content into Supabase
 */
export async function adminSeedDefaultData(payload) {
  if (!supabase) throw new Error('Supabase not configured');
  const counts = { services: 0, photos: 0, videos: 0, clients: 0 };

  // 1. Services
  if (payload.services?.length) {
    const { data: existing } = await supabase.from('services').select('slug');
    const existingSlugs = new Set((existing || []).map((s) => s.slug));
    const toInsert = payload.services.filter((s) => !existingSlugs.has(s.slug));
    if (toInsert.length > 0) {
      const { error } = await supabase.from('services').insert(toInsert);
      if (error) console.warn('Seed services error:', error.message);
      else counts.services = toInsert.length;
    }
  }

  // 2. Photos
  if (payload.photos?.length) {
    const { data: existing } = await supabase.from('gallery_photos').select('title');
    const existingTitles = new Set((existing || []).map((p) => p.title));
    const toInsert = payload.photos.filter((p) => !existingTitles.has(p.title));
    if (toInsert.length > 0) {
      const { error } = await supabase.from('gallery_photos').insert(toInsert);
      if (error) console.warn('Seed photos error:', error.message);
      else counts.photos = toInsert.length;
    }
  }

  // 3. Videos
  if (payload.videos?.length) {
    const { data: existing } = await supabase.from('gallery_videos').select('video_url');
    const existingUrls = new Set((existing || []).map((v) => v.video_url));
    const toInsert = payload.videos.filter((v) => !existingUrls.has(v.video_url));
    if (toInsert.length > 0) {
      const { error } = await supabase.from('gallery_videos').insert(toInsert);
      if (error) console.warn('Seed videos error:', error.message);
      else counts.videos = toInsert.length;
    }
  }

  // 4. Clients
  if (payload.clients?.length) {
    const { data: existing } = await supabase.from('clients').select('name');
    const existingNames = new Set((existing || []).map((c) => c.name));
    const toInsert = payload.clients.filter((c) => !existingNames.has(c.name));
    if (toInsert.length > 0) {
      const { error } = await supabase.from('clients').insert(toInsert);
      if (error) console.warn('Seed clients error:', error.message);
      else counts.clients = toInsert.length;
    }
  }

  return counts;
}
