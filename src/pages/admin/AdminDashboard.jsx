import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Wrench, 
  Camera, 
  Video, 
  Users, 
  Briefcase, 
  Mail, 
  ShieldAlert, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  X,
  UploadCloud,
  Loader2,
  RefreshCw,
  Image as ImageIcon,
  Play,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { 
  signOutAdmin, 
  adminGetDashboardStats,
  adminGetAllServices,
  adminSaveService,
  adminDeleteService,
  adminGetAllPhotos,
  adminSavePhoto,
  adminDeletePhoto,
  adminGetAllVideos,
  adminSaveVideo,
  adminDeleteVideo,
  adminGetAllClients,
  adminSaveClient,
  adminDeleteClient,
  adminGetAllApplications,
  adminUpdateApplicationStatus,
  adminDeleteApplication,
  adminGetAllMessages,
  adminUpdateMessage,
  adminDeleteMessage,
  adminGetProfiles,
  getSignedResumeUrl,
  uploadStorageAsset,
  adminSeedDefaultData
} from '../../lib/supabase';
import { 
  DEFAULT_SERVICES, 
  DEFAULT_PHOTOS, 
  DEFAULT_VIDEOS, 
  DEFAULT_CLIENTS 
} from '../../data/defaultData';
import { 
  extractYouTubeId, 
  getVideoPoster,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
  OFFICIAL_AL_AREESH_PRESETS
} from '../../lib/videoHelper';

export default function AdminDashboard({ profile }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Module state
  const [services, setServices] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [clients, setClients] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [adminProfiles, setAdminProfiles] = useState([]);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isSeeding, setIsSeeding] = useState(false);

  // Upload states
  const [isUploading, setIsUploading] = useState({
    photo: false,
    video: false,
    client: false,
    service: false
  });

  // File input refs for device selection
  const photoFileRef = useRef(null);
  const videoFileRef = useRef(null);
  const clientFileRef = useRef(null);
  const serviceFileRef = useRef(null);

  // Modals & detailed views
  const [activeMessageModal, setActiveMessageModal] = useState(null);
  const [activeVideoPreview, setActiveVideoPreview] = useState(null);
  const [newServiceModal, setNewServiceModal] = useState(false);
  const [newPhotoModal, setNewPhotoModal] = useState(false);
  const [newVideoModal, setNewVideoModal] = useState(false);
  const [newClientModal, setNewClientModal] = useState(false);

  // Video modal mode: 'youtube' or 'device'
  const [videoInputMode, setVideoInputMode] = useState('youtube');
  const [previewAddVideo, setPreviewAddVideo] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState({ 
    title: '', 
    slug: '', 
    category: 'Demolition', 
    short_description: '', 
    featured_image: '', 
    is_published: true 
  });
  const [photoForm, setPhotoForm] = useState({ 
    title: '', 
    category: 'All', 
    image_url: '', 
    location: 'Dubai, UAE', 
    is_published: true 
  });
  const [videoForm, setVideoForm] = useState({ 
    title: '', 
    category: 'Building Demolition', 
    video_url: '', 
    duration: '02:30', 
    description: '', 
    is_published: true 
  });
  const [clientForm, setClientForm] = useState({ 
    name: '', 
    category: 'Government & Master Developers', 
    logo_url: '', 
    website_url: 'https://', 
    is_active: true 
  });

  const navigate = useNavigate();

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 5000);
  };

  useEffect(() => {
    let isMounted = true;
    adminGetDashboardStats().then((data) => {
      if (isMounted) {
        if (data) setStats(data);
        setLoadingStats(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Load module data on tab change (Seamlessly showing previous default data if database is empty)
  useEffect(() => {
    let isMounted = true;
    async function loadTabData() {
      setModuleLoading(true);
      try {
        if (activeTab === 'services') {
          const data = await adminGetAllServices();
          if (isMounted) setServices(data && data.length > 0 ? data : DEFAULT_SERVICES);
        } else if (activeTab === 'photos') {
          const data = await adminGetAllPhotos();
          if (isMounted) setPhotos(data && data.length > 0 ? data : DEFAULT_PHOTOS);
        } else if (activeTab === 'videos') {
          const data = await adminGetAllVideos();
          if (isMounted) setVideos(data && data.length > 0 ? data : DEFAULT_VIDEOS);
        } else if (activeTab === 'clients') {
          const data = await adminGetAllClients();
          if (isMounted) setClients(data && data.length > 0 ? data : DEFAULT_CLIENTS);
        } else if (activeTab === 'jobs') {
          const appsData = await adminGetAllApplications();
          if (isMounted) setApplications(appsData);
        } else if (activeTab === 'messages') {
          const data = await adminGetAllMessages();
          if (isMounted) setMessages(data);
        } else if (activeTab === 'admins') {
          const data = await adminGetProfiles();
          if (isMounted) setAdminProfiles(data);
        }
      } catch (err) {
        console.error('Error loading tab data:', err);
        showFeedback('error', err.message);
      } finally {
        if (isMounted) setModuleLoading(false);
      }
    }
    loadTabData();
    return () => { isMounted = false; };
  }, [activeTab]);

  const handleLogout = async () => {
    await signOutAdmin();
    navigate('/admin/login');
  };

  // Device file upload handler
  const handleDeviceFileUpload = async (type, bucketName, file, folder) => {
    if (!file) return;
    setIsUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const publicUrl = await uploadStorageAsset(bucketName, file, folder);
      if (type === 'photo') {
        setPhotoForm((prev) => ({ ...prev, image_url: publicUrl }));
      } else if (type === 'video') {
        setVideoForm((prev) => ({ ...prev, video_url: publicUrl }));
      } else if (type === 'client') {
        setClientForm((prev) => ({ ...prev, logo_url: publicUrl }));
      } else if (type === 'service') {
        setServiceForm((prev) => ({ ...prev, featured_image: publicUrl }));
      }
      showFeedback('success', `File "${file.name}" uploaded successfully from your device!`);
    } catch (err) {
      console.error('Upload error:', err);
      showFeedback('error', `Device upload error: ${err.message}`);
    } finally {
      setIsUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // One-click sync to save all previous/default data into Supabase
  const handleSyncWebsiteData = async () => {
    setIsSeeding(true);
    try {
      const counts = await adminSeedDefaultData({
        services: DEFAULT_SERVICES,
        photos: DEFAULT_PHOTOS,
        videos: DEFAULT_VIDEOS,
        clients: DEFAULT_CLIENTS
      });

      const [freshServices, freshPhotos, freshVideos, freshClients, freshStats] = await Promise.all([
        adminGetAllServices(),
        adminGetAllPhotos(),
        adminGetAllVideos(),
        adminGetAllClients(),
        adminGetDashboardStats()
      ]);

      setServices(freshServices && freshServices.length > 0 ? freshServices : DEFAULT_SERVICES);
      setPhotos(freshPhotos && freshPhotos.length > 0 ? freshPhotos : DEFAULT_PHOTOS);
      setVideos(freshVideos && freshVideos.length > 0 ? freshVideos : DEFAULT_VIDEOS);
      setClients(freshClients && freshClients.length > 0 ? freshClients : DEFAULT_CLIENTS);
      if (freshStats) setStats(freshStats);

      showFeedback(
        'success',
        `Successfully synced to Supabase: ${counts.services} services, ${counts.photos} photos, ${counts.videos} videos, and ${counts.clients} clients saved!`
      );
    } catch (err) {
      console.error('Seed error:', err);
      showFeedback('error', `Failed to sync website data: ${err.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  // Compute displayed counts (combining live database and default content)
  const displayCounts = {
    services: (stats?.services || 0) > 0 ? stats.services : DEFAULT_SERVICES.length,
    photos: (stats?.photos || 0) > 0 ? stats.photos : DEFAULT_PHOTOS.length,
    videos: (stats?.videos || 0) > 0 ? stats.videos : DEFAULT_VIDEOS.length,
    clients: (stats?.clients || 0) > 0 ? stats.clients : DEFAULT_CLIENTS.length,
    unreadMessages: stats?.unreadMessages || 0,
    newApplications: stats?.newApplications || 0
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ea1d25] to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-lg tracking-wider text-slate-900">
                AL AREESH <span className="text-[#ea1d25]">ADMIN</span>
              </span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600 font-medium hidden sm:inline">
              Super Admin: <strong className="text-slate-900">{profile.email}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
              {profile.role.replace('_', ' ')}
            </span>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'services'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4" />
              <span>Services</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">{displayCounts.services}</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'photos'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Camera className="w-4 h-4" />
              <span>Photo Gallery</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">{displayCounts.photos}</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'videos'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Video className="w-4 h-4" />
              <span>Video Gallery</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">{displayCounts.videos}</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'clients'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Clients</span>
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">{displayCounts.clients}</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'jobs'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" />
              <span>Applications</span>
            </span>
            {displayCounts.newApplications > 0 && (
              <span className="text-[10px] bg-[#ea1d25] text-white font-bold px-2 py-0.5 rounded-full">
                {displayCounts.newApplications} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'messages'
                ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>Contact Inquiries</span>
            </span>
            {displayCounts.unreadMessages > 0 && (
              <span className="text-[10px] bg-[#00a4e4] text-white font-bold px-2 py-0.5 rounded-full">
                {displayCounts.unreadMessages} Unread
              </span>
            )}
          </button>

          {profile.role === 'super_admin' && (
            <button
              onClick={() => setActiveTab('admins')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'admins'
                  ? 'bg-[#ea1d25] text-white shadow-md shadow-red-500/20'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white bg-white/70 border border-slate-200'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Super Admin Settings</span>
              </span>
            </button>
          )}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[500px]">
          {/* Feedback Alert */}
          {feedback.text && (
            <div className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
              feedback.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
            }`}>
              {feedback.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW METRICS                                   */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">Dashboard Overview</h2>
                  <p className="text-xs text-slate-500 mt-1">Live metrics and previous website content management.</p>
                </div>
                <button
                  onClick={handleSyncWebsiteData}
                  disabled={isSeeding}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                  title="Save all previous default services, gallery photos, videos, and clients into Supabase"
                >
                  {isSeeding ? <Loader2 className="w-4 h-4 animate-spin text-[#00a4e4]" /> : <RefreshCw className="w-4 h-4 text-[#00a4e4]" />}
                  <span>{isSeeding ? 'Syncing to Supabase...' : 'Sync Previous Data to Database'}</span>
                </button>
              </div>

              {loadingStats ? (
                <div className="text-xs text-slate-500 py-8">Loading database metrics...</div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services</div>
                    <div className="text-3xl font-black text-slate-900 mt-2">{displayCounts.services}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Available offerings</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Photos &amp; Videos</div>
                    <div className="text-3xl font-black text-[#00a4e4] mt-2">{displayCounts.photos + displayCounts.videos}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{displayCounts.photos} Photos, {displayCounts.videos} Videos</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clients</div>
                    <div className="text-3xl font-black text-emerald-600 mt-2">{displayCounts.clients}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Partner &amp; developer logos</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiries</div>
                    <div className="text-3xl font-black text-[#ea1d25] mt-2">{displayCounts.unreadMessages}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Unread quote inquiries</div>
                  </div>
                </div>
              )}

              {/* Data Sync & Device Upload Info Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 space-y-3">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[#00a4e4]" />
                  <span>Device Uploads &amp; YouTube Video Reels Active</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All previous website items (11 Services, 8 Gallery Photos, 8 Video Reels, and 12 Client Logos) are loaded into your dashboard. You can click <strong>&quot;Sync Previous Data to Database&quot;</strong> above to write them to Supabase, or add new pictures and YouTube/device videos directly using the <strong>&quot;Add Video&quot;</strong> button.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Supabase Backend Connection Active</span>
                </div>
                <p className="text-xs text-emerald-800/90 leading-relaxed">
                  Row Level Security (RLS) is active across all 13 tables. Public visitors cannot read private inquiries, applicant resumes, or admin profiles. The designated Super Admin account is permanently locked to <strong className="text-emerald-950 font-bold">alareesh738@gmail.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SERVICES MANAGEMENT                                */}
          {/* ========================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Services Management</h2>
                  <p className="text-xs text-slate-500 mt-1">Showing all {services.length} services (previous website items &amp; database entries).</p>
                </div>
                <button
                  onClick={() => setNewServiceModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading services...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Slug</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {services.map((svc) => (
                        <tr key={svc.id || svc.slug} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900">{svc.title}</td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{svc.slug}</td>
                          <td className="py-3.5 px-4 text-slate-600">{svc.category}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              svc.is_published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {svc.is_published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            {svc.id && (
                              <>
                                <button
                                  onClick={async () => {
                                    await adminSaveService({ id: svc.id, is_published: !svc.is_published });
                                    setServices(services.map(s => s.id === svc.id ? { ...s, is_published: !s.is_published } : s));
                                    showFeedback('success', `Toggled ${svc.title} status.`);
                                  }}
                                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold text-[11px]"
                                >
                                  Toggle
                                </button>
                                <button
                                  onClick={async () => {
                                    if (window.confirm(`Delete service: ${svc.title}?`)) {
                                      await adminDeleteService(svc.id);
                                      setServices(services.filter(s => s.id !== svc.id));
                                      showFeedback('success', `Deleted service.`);
                                    }
                                  }}
                                  className="p-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {!svc.id && (
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Default Website Data</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PHOTO GALLERY MANAGEMENT                           */}
          {/* ========================================================= */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Photo Gallery</h2>
                  <p className="text-xs text-slate-500 mt-1">Showing all {photos.length} project pictures (upload from device or use link).</p>
                </div>
                <button
                  onClick={() => setNewPhotoModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading photos...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((item, idx) => (
                    <div key={item.id || idx} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden group">
                      <div className="h-32 w-full bg-slate-100 relative">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/service-building-demolition.jpg'; }}
                        />
                        {item.id && (
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete photo: ${item.title}?`)) {
                                await adminDeletePhoto(item.id);
                                setPhotos(photos.filter(p => p.id !== item.id));
                                showFeedback('success', 'Photo removed.');
                              }
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-500 flex items-center justify-between">
                          <span>{item.category}</span>
                          <span className={item.is_published ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                            {item.is_published ? 'Active' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: VIDEO GALLERY MANAGEMENT (Enhanced YouTube & MP4)  */}
          {/* ========================================================= */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Video Gallery</h2>
                  <p className="text-xs text-slate-500 mt-1">Showing all {videos.length} videos. Click any card to preview and test the video player.</p>
                </div>
                <button
                  onClick={() => setNewVideoModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video</span>
                </button>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading videos...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {videos.map((vid, idx) => {
                    const poster = getVideoPoster(vid);
                    return (
                      <div key={vid.id || idx} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#ea1d25] transition-all">
                        {/* Video Thumbnail with Play Button */}
                        <div
                          onClick={() => setActiveVideoPreview(vid)}
                          className="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={poster}
                            alt={vid.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                            onError={(e) => { e.target.src = '/service-building-demolition.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#ea1d25] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                              <Play className="w-5 h-5 fill-white" />
                            </div>
                          </div>
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono font-semibold">
                            {vid.duration || '02:00'}
                          </span>
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 text-slate-900 text-[10px] font-bold">
                            {vid.category}
                          </span>
                          {(() => {
                            const cardYtId = extractYouTubeId(vid.youtubeId || vid.video_url || vid.videoUrl);
                            if (cardYtId) {
                              return (
                                <a
                                  href={getYouTubeWatchUrl(cardYtId)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute top-2 right-2 px-2 py-0.5 rounded bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow-xs"
                                  title="Open directly on YouTube"
                                >
                                  <span>YouTube</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              );
                            }
                            return null;
                          })()}
                        </div>

                        {/* Video Info & Controls */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h4
                              onClick={() => setActiveVideoPreview(vid)}
                              className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-[#ea1d25] cursor-pointer"
                            >
                              {vid.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-mono truncate">{vid.video_url}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveVideoPreview(vid)}
                                className="text-xs font-bold text-[#ea1d25] hover:underline flex items-center gap-1"
                              >
                                <Play className="w-3 h-3 fill-[#ea1d25]" />
                                <span>Play / Test</span>
                              </button>
                              {(() => {
                                const cardYtId = extractYouTubeId(vid.youtubeId || vid.video_url || vid.videoUrl);
                                if (cardYtId) {
                                  return (
                                    <a
                                      href={getYouTubeWatchUrl(cardYtId)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[11px] text-slate-500 hover:text-red-600 font-semibold flex items-center gap-0.5"
                                    >
                                      <span>Watch</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                            {vid.id && (
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Delete video: ${vid.title}?`)) {
                                    await adminDeleteVideo(vid.id);
                                    setVideos(videos.filter(v => v.id !== vid.id));
                                    showFeedback('success', 'Video deleted.');
                                  }
                                }}
                                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                                title="Delete Video"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                            {!vid.id && (
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Default Reel</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: CLIENTS MANAGEMENT                                 */}
          {/* ========================================================= */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Clients &amp; Partners</h2>
                  <p className="text-xs text-slate-500 mt-1">Showing all {clients.length} master developers and partners.</p>
                </div>
                <button
                  onClick={() => setNewClientModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Client</span>
                </button>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading clients...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {clients.map((cli, idx) => (
                    <div key={cli.id || idx} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 flex flex-col justify-between space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cli.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}`}>
                          {cli.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {cli.id && (
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete client: ${cli.name}?`)) {
                                await adminDeleteClient(cli.id);
                                setClients(clients.filter(c => c.id !== cli.id));
                                showFeedback('success', 'Client deleted.');
                              }
                            }}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="text-center font-bold text-sm text-slate-900">{cli.name}</div>
                      <div className="text-[10px] text-slate-500 text-center truncate">{cli.category}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: CAREERS & APPLICATIONS                             */}
          {/* ========================================================= */}
          {activeTab === 'jobs' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Job Applications</h2>
                  <p className="text-xs text-slate-500 mt-1">Review candidates and download applicant CV resumes.</p>
                </div>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading candidates...</div>
              ) : applications.length === 0 ? (
                <div className="text-xs text-slate-500 py-6">No applications submitted yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Resume</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900">{app.applicant_name}</td>
                          <td className="py-3.5 px-4 text-slate-700">{app.job_title}</td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div>{app.email}</div>
                            <div className="text-[10px] text-slate-400">{app.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={app.status}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                await adminUpdateApplicationStatus(app.id, newStatus);
                                setApplications(applications.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
                                showFeedback('success', `Status updated.`);
                              }}
                              className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] text-slate-800 focus:outline-none focus:border-[#ea1d25]"
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4">
                            {app.resume_url ? (
                              <button
                                onClick={async () => {
                                  const url = await getSignedResumeUrl(app.resume_url);
                                  if (url) window.open(url, '_blank');
                                  else alert('Unable to generate signed URL.');
                                }}
                                className="text-[#00a4e4] hover:underline flex items-center gap-1 font-semibold"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </button>
                            ) : (
                              <span className="text-slate-400">None</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={async () => {
                                if (window.confirm(`Delete application from ${app.applicant_name}?`)) {
                                  await adminDeleteApplication(app.id);
                                  setApplications(applications.filter(a => a.id !== app.id));
                                  showFeedback('success', 'Application deleted.');
                                }
                              }}
                              className="p-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: CONTACT INQUIRIES & MESSAGES                       */}
          {/* ========================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">Contact &amp; Quote Inquiries</h2>
                  <p className="text-xs text-slate-500 mt-1">Review inquiries received from website visitors.</p>
                </div>
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-xs text-slate-500 py-6">No inquiries received yet.</div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setActiveMessageModal(msg)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        msg.is_read
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-white border-[#00a4e4] shadow-md shadow-sky-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{msg.name}</span>
                            {!msg.is_read && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                                Unread
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500">{msg.source}</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700">{msg.subject}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{msg.message}</div>
                        </div>

                        <div className="text-right text-[11px] text-slate-500 shrink-0">
                          <div>{new Date(msg.created_at).toLocaleDateString()}</div>
                          <div className="text-[10px] font-semibold capitalize text-[#00a4e4] mt-1">{msg.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: SUPER ADMIN SETTINGS (alareesh738@gmail.com ONLY)   */}
          {/* ========================================================= */}
          {activeTab === 'admins' && profile.role === 'super_admin' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">Super Admin Management</h2>
                <p className="text-xs text-slate-500 mt-1">Manage secondary administrator roles and system security settings.</p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
                <strong>Super Admin Policy:</strong> Only the confirmed account <strong>alareesh738@gmail.com</strong> can hold the Super Admin role. This is enforced at the PostgreSQL database level via the <code>super_admin_email_lock</code> check constraint and the <code>trg_enforce_super_admin</code> trigger.
              </div>

              {moduleLoading ? (
                <div className="text-xs text-slate-500 py-8">Loading admin accounts...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Admin Email</th>
                        <th className="py-3 px-4">Full Name</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {adminProfiles.map((adm) => (
                        <tr key={adm.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-900 font-medium">{adm.email}</td>
                          <td className="py-3.5 px-4 text-slate-700">{adm.full_name}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                              {adm.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-emerald-600 font-bold text-[11px]">
                            {adm.is_active ? 'Active' : 'Inactive'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================= */}
      {/* MODALS WITH DEVICE FILE SELECTION & PREVIEWS                  */}
      {/* ============================================================= */}

      {/* Message Detail Modal */}
      {activeMessageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Inquiry Details</h3>
              <button onClick={() => setActiveMessageModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div><strong className="text-slate-600">From:</strong> {activeMessageModal.name}</div>
              <div><strong className="text-slate-600">Email:</strong> {activeMessageModal.email}</div>
              <div><strong className="text-slate-600">Phone:</strong> {activeMessageModal.phone}</div>
              <div><strong className="text-slate-600">Subject:</strong> {activeMessageModal.subject}</div>
              <div className="pt-2"><strong className="text-slate-600">Message:</strong></div>
              <div className="p-3 bg-slate-50 rounded-xl whitespace-pre-wrap text-slate-700 border border-slate-200">
                {activeMessageModal.message}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={async () => {
                  await adminUpdateMessage(activeMessageModal.id, { is_read: true, status: 'in_progress' });
                  setMessages(messages.map(m => m.id === activeMessageModal.id ? { ...m, is_read: true, status: 'in_progress' } : m));
                  setActiveMessageModal(null);
                  showFeedback('success', 'Marked as read & in-progress.');
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-500/20"
              >
                Mark as In-Progress
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this message?')) {
                    await adminDeleteMessage(activeMessageModal.id);
                    setMessages(messages.filter(m => m.id !== activeMessageModal.id));
                    setActiveMessageModal(null);
                    showFeedback('success', 'Message deleted.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Player Modal in Admin */}
      {activeVideoPreview && (
        <div
          onClick={() => setActiveVideoPreview(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-white flex flex-col"
          >
            <button
              onClick={() => setActiveVideoPreview(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/80 hover:bg-[#ea1d25] text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {(() => {
                const ytId = extractYouTubeId(activeVideoPreview.youtubeId || activeVideoPreview.video_url || activeVideoPreview.videoUrl);
                if (ytId) {
                  return (
                    <iframe
                      src={getYouTubeEmbedUrl(ytId, { autoplay: true })}
                      title={activeVideoPreview.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  );
                }
                const fileUrl = activeVideoPreview.video_url || activeVideoPreview.videoUrl;
                if (fileUrl) {
                  return (
                    <video
                      src={fileUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  );
                }
                return <div className="text-slate-400 text-sm">Video stream unavailable</div>;
              })()}
            </div>

            {/* In-Modal YouTube Resilience Notification Bar */}
            {(() => {
              const ytId = extractYouTubeId(activeVideoPreview.youtubeId || activeVideoPreview.video_url || activeVideoPreview.videoUrl);
              if (ytId) {
                return (
                  <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00a4e4] shrink-0" />
                      <span>Direct YouTube link active for this reel:</span>
                    </span>
                    <a
                      href={getYouTubeWatchUrl(ytId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ea1d25] hover:text-red-400 font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              }
              return null;
            })()}

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea1d25]">{activeVideoPreview.category}</span>
                <h3 className="font-bold text-sm text-white">{activeVideoPreview.title}</h3>
              </div>
              {(() => {
                const ytId = extractYouTubeId(activeVideoPreview.youtubeId || activeVideoPreview.video_url || activeVideoPreview.videoUrl);
                if (ytId) {
                  return (
                    <a
                      href={getYouTubeWatchUrl(ytId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* New Service Modal (With Device Picture Upload) */}
      {newServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add New Service</h3>
              <button onClick={() => setNewServiceModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. High-Reach Building Demolition"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Slug</label>
                <input
                  type="text"
                  value={serviceForm.slug}
                  onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="e.g. high-reach-building-demolition"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>
              
              {/* Featured Image - Device Upload Option */}
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Featured Picture</label>
                <input
                  type="file"
                  ref={serviceFileRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDeviceFileUpload('service', 'service-images', file, 'services');
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => serviceFileRef.current?.click()}
                  disabled={isUploading.service}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#ea1d25] bg-slate-50 hover:bg-red-50/30 flex items-center justify-center gap-2 text-slate-700 font-semibold transition-colors disabled:opacity-50"
                >
                  {isUploading.service ? <Loader2 className="w-4 h-4 animate-spin text-[#ea1d25]" /> : <UploadCloud className="w-4 h-4 text-[#ea1d25]" />}
                  <span>{isUploading.service ? 'Uploading from device...' : 'Choose Picture from Device'}</span>
                </button>
                {serviceForm.featured_image && (
                  <div className="mt-2 text-[11px] text-emerald-600 flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{serviceForm.featured_image}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Short Description</label>
                <textarea
                  rows={2}
                  value={serviceForm.short_description}
                  onChange={(e) => setServiceForm({ ...serviceForm, short_description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setNewServiceModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">Cancel</button>
              <button
                onClick={async () => {
                  if (!serviceForm.title || !serviceForm.slug) return alert('Title and slug required.');
                  const created = await adminSaveService(serviceForm);
                  setServices([...services, created]);
                  setNewServiceModal(false);
                  showFeedback('success', 'Service created successfully.');
                }}
                className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/20"
              >
                Create Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Photo Modal (With Device Picture Upload) */}
      {newPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Picture to Gallery</h3>
              <button onClick={() => setNewPhotoModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Commercial Building Dismantling"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>

              {/* Device Picture Selection */}
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Select Picture from Device</label>
                <input
                  type="file"
                  ref={photoFileRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDeviceFileUpload('photo', 'gallery-images', file, 'photos');
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoFileRef.current?.click()}
                  disabled={isUploading.photo}
                  className="w-full py-3 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#ea1d25] bg-slate-50 hover:bg-red-50/30 flex items-center justify-center gap-2 text-slate-700 font-semibold transition-colors disabled:opacity-50"
                >
                  {isUploading.photo ? <Loader2 className="w-4 h-4 animate-spin text-[#ea1d25]" /> : <ImageIcon className="w-4 h-4 text-[#ea1d25]" />}
                  <span>{isUploading.photo ? 'Uploading from device...' : 'Choose Picture on Device (PNG, JPG, WEBP)'}</span>
                </button>
                {photoForm.image_url && (
                  <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <img src={photoForm.image_url} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                    <span className="text-[11px] text-emerald-600 truncate font-medium">Picture ready</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Or Enter Picture URL</label>
                <input
                  type="text"
                  value={photoForm.image_url}
                  onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })}
                  placeholder="/service-building-demolition.jpg or URL"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Category</label>
                <select
                  value={photoForm.category}
                  onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                >
                  <option value="All">All</option>
                  <option value="Building Demolition">Building Demolition</option>
                  <option value="Controlled Demolition">Controlled Demolition</option>
                  <option value="Concrete Breaking">Concrete Breaking</option>
                  <option value="Excavation">Excavation</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Villa Demolition">Villa Demolition</option>
                </select>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setNewPhotoModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">Cancel</button>
              <button
                onClick={async () => {
                  if (!photoForm.title || !photoForm.image_url) return alert('Title and Image required.');
                  const created = await adminSavePhoto(photoForm);
                  setPhotos([...photos, created]);
                  setNewPhotoModal(false);
                  showFeedback('success', 'Photo added to gallery.');
                }}
                className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/20"
              >
                Add Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced New Video Modal (With YouTube Link Preview & Device Video Upload) */}
      {newVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#ea1d25]" />
                <span>Add Video Reel</span>
              </h3>
              <button onClick={() => setNewVideoModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick 1-Click Preset Selector from Official Channel */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ea1d25]" />
                  <span>Choose from Official Al Areesh Video Reels:</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Click to auto-fill</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {OFFICIAL_AL_AREESH_PRESETS.map((preset) => (
                  <button
                    key={preset.video_url}
                    type="button"
                    onClick={() => {
                      setVideoForm({
                        title: preset.title,
                        category: preset.category,
                        video_url: preset.video_url,
                        duration: preset.duration,
                        description: preset.description,
                        is_published: true
                      });
                      setVideoInputMode('youtube');
                      setPreviewAddVideo(true);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                      videoForm.video_url === preset.video_url
                        ? 'bg-[#ea1d25] text-white border-[#ea1d25] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {preset.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setVideoInputMode('youtube')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  videoInputMode === 'youtube'
                    ? 'bg-white text-[#ea1d25] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-[#ea1d25] text-[#ea1d25]" />
                <span>YouTube Link (Recommended)</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoInputMode('device')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  videoInputMode === 'device'
                    ? 'bg-white text-[#00a4e4] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#00a4e4]" />
                <span>Device Upload (MP4)</span>
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Video Title</label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. Commercial Multi-Storey Building High-Reach Demolition"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>

              {/* Mode 1: YouTube Link Input with Live Thumbnail Preview */}
              {videoInputMode === 'youtube' && (
                <div className="space-y-2">
                  <label className="block text-slate-600 font-semibold">
                    Paste YouTube URL or Video ID
                  </label>
                  <input
                    type="text"
                    value={videoForm.video_url}
                    onChange={(e) => {
                      const val = e.target.value;
                      setVideoForm({ ...videoForm, video_url: val });
                    }}
                    placeholder="e.g. https://www.youtube.com/watch?v=TVmIlM3znvg or TVmIlM3znvg"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                  />
                  {(() => {
                    const detectedYtId = extractYouTubeId(videoForm.video_url);
                    if (detectedYtId) {
                      return (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={`https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`}
                                alt="YouTube Thumbnail"
                                className="w-16 h-12 object-cover rounded-lg shadow-xs shrink-0"
                              />
                              <div className="space-y-0.5 text-emerald-900">
                                <div className="font-bold flex items-center gap-1 text-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Valid YouTube Reel Detected</span>
                                </div>
                                <div className="text-[10px] font-mono text-emerald-700">ID: {detectedYtId}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviewAddVideo(!previewAddVideo)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 transition-colors"
                              >
                                <Play className="w-3 h-3 fill-white" />
                                <span>{previewAddVideo ? 'Hide Player' : 'Test Play'}</span>
                              </button>
                              <a
                                href={getYouTubeWatchUrl(detectedYtId)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-[10px] flex items-center gap-1 transition-colors"
                              >
                                <span>YouTube</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>

                          {previewAddVideo && (
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mt-2 border border-emerald-300">
                              <iframe
                                src={getYouTubeEmbedUrl(detectedYtId, { autoplay: true })}
                                title="Video Test Play"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (videoForm.video_url) {
                      return (
                        <div className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                          Please paste a valid YouTube watch link (e.g. <code>https://www.youtube.com/watch?v=...</code>) or 11-character video ID.
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              {/* Mode 2: Device Video File Upload */}
              {videoInputMode === 'device' && (
                <div className="space-y-2">
                  <label className="block text-slate-600 font-semibold">Select Video from Device</label>
                  <input
                    type="file"
                    ref={videoFileRef}
                    accept="video/mp4,video/webm,video/quicktime,video/ogg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleDeviceFileUpload('video', 'gallery-videos', file, 'videos');
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => videoFileRef.current?.click()}
                    disabled={isUploading.video}
                    className="w-full py-3.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#ea1d25] bg-slate-50 hover:bg-red-50/30 flex items-center justify-center gap-2 text-slate-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    {isUploading.video ? <Loader2 className="w-4 h-4 animate-spin text-[#00a4e4]" /> : <UploadCloud className="w-4 h-4 text-[#00a4e4]" />}
                    <span>{isUploading.video ? 'Uploading video file to Supabase...' : 'Choose MP4 / WebM File on Device'}</span>
                  </button>

                  {videoForm.video_url && !extractYouTubeId(videoForm.video_url) && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                      <div className="text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Uploaded File Ready</span>
                      </div>
                      <video src={videoForm.video_url} controls className="w-full h-28 object-contain rounded-lg bg-black" />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Category</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                  >
                    <option value="Building Demolition">Building Demolition</option>
                    <option value="Controlled Demolition">Controlled Demolition</option>
                    <option value="Concrete Breaking">Concrete Breaking</option>
                    <option value="Villa Demolition">Villa Demolition</option>
                    <option value="Excavation">Excavation</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Fleet & Logistics">Fleet & Logistics</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Duration (MM:SS)</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="02:30"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Operational scope of the video footage..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setNewVideoModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">Cancel</button>
              <button
                onClick={async () => {
                  if (!videoForm.title) return alert('Video title is required.');
                  if (!videoForm.video_url) return alert('Please enter a YouTube link or choose a video file.');
                  const created = await adminSaveVideo(videoForm);
                  setVideos([...videos, created]);
                  setNewVideoModal(false);
                  showFeedback('success', 'Video added to gallery successfully.');
                }}
                className="px-5 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/20"
              >
                Save Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Client Modal (With Device Logo Upload) */}
      {newClientModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Client / Master Developer</h3>
              <button onClick={() => setNewClientModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Client Name</label>
                <input
                  type="text"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="e.g. Dubai Municipality"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>

              {/* Device Logo Selection */}
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Select Logo from Device</label>
                <input
                  type="file"
                  ref={clientFileRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDeviceFileUpload('client', 'client-logos', file, 'logos');
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => clientFileRef.current?.click()}
                  disabled={isUploading.client}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#ea1d25] bg-slate-50 hover:bg-red-50/30 flex items-center justify-center gap-2 text-slate-700 font-semibold transition-colors disabled:opacity-50"
                >
                  {isUploading.client ? <Loader2 className="w-4 h-4 animate-spin text-[#ea1d25]" /> : <UploadCloud className="w-4 h-4 text-[#ea1d25]" />}
                  <span>{isUploading.client ? 'Uploading logo...' : 'Choose Logo on Device (PNG, SVG, JPG)'}</span>
                </button>
                {clientForm.logo_url && (
                  <div className="mt-2 text-[11px] text-emerald-600 flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{clientForm.logo_url}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Or Enter Logo URL</label>
                <input
                  type="text"
                  value={clientForm.logo_url}
                  onChange={(e) => setClientForm({ ...clientForm, logo_url: e.target.value })}
                  placeholder="/clients/dubai-municipality.png"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#ea1d25]"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setNewClientModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">Cancel</button>
              <button
                onClick={async () => {
                  if (!clientForm.name) return alert('Name required.');
                  const created = await adminSaveClient(clientForm);
                  setClients([...clients, created]);
                  setNewClientModal(false);
                  showFeedback('success', 'Client created.');
                }}
                className="px-4 py-2 rounded-xl bg-[#ea1d25] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/20"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
