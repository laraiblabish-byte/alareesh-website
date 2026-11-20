import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import FleetSection from './components/FleetSection';
import ProjectGallery from './components/ProjectGallery';
import WhyChooseUs from './components/WhyChooseUs';
import CostEstimator from './components/CostEstimator';
import Testimonials from './components/Testimonials';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ClientsPage from './pages/ClientsPage';
import CareersPage from './pages/CareersPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute';

// Slim top route change progress indicator driven 100% by CSS keyframes
function TopProgressBar() {
  const { pathname } = useLocation();

  return (
    <div
      key={`progress-${pathname}`}
      className="top-progress-bar fixed top-0 left-0 right-0 z-[9999] h-[3.5px] pointer-events-none"
    />
  );
}

// Automatically manages scrolling on route and hash changes
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// 100% Preserved Home Page Component
function HomePage({ onSelectServiceForQuote, onTransferEstimatorToQuote, quoteInitialData, scrollToQuote }) {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero onOpenQuote={() => scrollToQuote()} />

      {/* 2. Authority & Compliance Badges Bar */}
      <TrustBar />

      {/* 3. About Us & Credentials */}
      <AboutSection onOpenQuote={() => scrollToQuote()} />

      {/* 4. Special Wrecking & Demolition Services */}
      <ServicesSection onSelectServiceForQuote={onSelectServiceForQuote} />

      {/* 5. 4-Step Engineering Work Process */}
      <ProcessSection onOpenQuote={() => scrollToQuote()} />

      {/* 6. In-House Modern Heavy Fleet */}
      <FleetSection onOpenQuote={() => scrollToQuote()} />

      {/* 7. Picture Gallery / Executed Works */}
      <ProjectGallery onOpenQuote={() => scrollToQuote()} />

      {/* 8. Interactive Cost & Scope Estimator */}
      <CostEstimator onTransferToQuote={onTransferEstimatorToQuote} />

      {/* 9. Why Choose Al Areesh */}
      <WhyChooseUs onOpenQuote={() => scrollToQuote()} />

      {/* 10. Client Testimonials & Google Ratings */}
      <Testimonials />

      {/* 11. Request A Quote & Contact Form */}
      <QuoteSection
        key={quoteInitialData ? JSON.stringify(quoteInitialData) : 'default'}
        initialData={quoteInitialData}
      />
    </>
  );
}

// Wrapper for direct service slug routes
function DirectServiceWrapper({ slug, onOpenQuote }) {
  return <ServiceDetailPage includeLayout={false} onOpenQuote={onOpenQuote} customSlug={slug} />;
}

export default function App() {
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToQuote = (prefillData = null) => {
    if (prefillData) {
      setQuoteInitialData(prefillData);
    }
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#contact');
      }
    }
  };

  const handleSelectServiceForQuote = (serviceTitle) => {
    scrollToQuote({
      service: serviceTitle,
      details: `Inquiring specifically for: ${serviceTitle}`
    });
  };

  const handleTransferEstimatorToQuote = (estimatorData) => {
    scrollToQuote(estimatorData);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
      {/* Scroll restoration helper */}
      <ScrollManager />

      {/* Top Route Change Progress Bar */}
      <TopProgressBar />

      {/* Header & Top Bar with Navigation Support (Hidden on Admin Routes) */}
      {!isAdminRoute && <Header onOpenQuote={() => scrollToQuote()} />}

      {/* Main Content Area with React Router Routes & Page Transition */}
      <main className="flex-1">
        <div key={location.pathname} className="page-transition">
          <Routes location={location}>
            {/* 1. Home Page */}
            <Route
              path="/"
              element={
                <HomePage
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                  onTransferEstimatorToQuote={handleTransferEstimatorToQuote}
                  quoteInitialData={quoteInitialData}
                  scrollToQuote={scrollToQuote}
                />
              }
            />

            {/* 2. About Us Page (Matches https://alareeshdemolition.ae/about/) */}
            <Route
              path="/about"
              element={
                <AboutUs
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 3. Services Listing Page (Matches https://alareeshdemolition.ae/services/) */}
            <Route
              path="/services"
              element={
                <ServicesPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 4. Individual Service Detail Pages with /service/:slug */}
            <Route
              path="/service/:slug"
              element={
                <ServiceDetailPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 5. Direct 11 Service Routes (Matching Original Exact Sitemap URLs) */}
            <Route
              path="/building-demolition-services-in-dubai-uae"
              element={
                <DirectServiceWrapper
                  slug="building-demolition-services-in-dubai-uae"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/concrete-building-demolition"
              element={
                <DirectServiceWrapper
                  slug="concrete-building-demolition"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/villa-demolition-dubai"
              element={
                <DirectServiceWrapper
                  slug="villa-demolition-dubai"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/excavation-site-clearance-services-in-dubai"
              element={
                <DirectServiceWrapper
                  slug="excavation-site-clearance-services-in-dubai"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/demolition-contractors-in-uae"
              element={
                <DirectServiceWrapper
                  slug="demolition-contractors-in-uae"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/concrete-breaking-rcc-works"
              element={
                <DirectServiceWrapper
                  slug="concrete-breaking-rcc-works"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/scrap-metal-recycling"
              element={
                <DirectServiceWrapper
                  slug="scrap-metal-recycling"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/dismantling-structural-removal"
              element={
                <DirectServiceWrapper
                  slug="dismantling-structural-removal"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/excavation-earthworks"
              element={
                <DirectServiceWrapper
                  slug="excavation-earthworks"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/controlled-demolition-services"
              element={
                <DirectServiceWrapper
                  slug="controlled-demolition-services"
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/transportation-waste-disposal"
              element={
                <DirectServiceWrapper
                  slug="transportation-waste-disposal"
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 6. Gallery Pages */}
            <Route
              path="/photo-gallery"
              element={
                <PhotoGalleryPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/video-gallery"
              element={
                <VideoGalleryPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 7. Careers Page */}
            <Route
              path="/careers-dubai"
              element={
                <CareersPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/careers"
              element={
                <CareersPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 8. Our Clients Page (Matches https://alareeshdemolition.ae/our-clients/) */}
            <Route
              path="/our-clients"
              element={
                <ClientsPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/clients"
              element={
                <ClientsPage
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 9. Contact Us Page (Matches https://alareeshdemolition.ae/contact/) */}
            <Route
              path="/contact"
              element={
                <ContactUs
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />
            <Route
              path="/contact-us"
              element={
                <ContactUs
                  includeLayout={false}
                  onOpenQuote={scrollToQuote}
                />
              }
            />

            {/* 10. Admin Portal & Protected Dashboard */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  {({ profile }) => <AdminDashboard profile={profile} />}
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  {({ profile }) => <AdminDashboard profile={profile} />}
                </AdminProtectedRoute>
              }
            />

            {/* 11. Projects Redirect / Anchor */}
            <Route
              path="/projects"
              element={<Navigate to="/#gallery" replace />}
            />

            {/* Fallback Catch-All Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Footer with Navigation Support (Hidden on Admin Routes) */}
      {!isAdminRoute && <Footer />}

      {/* Floating Action Buttons (Hidden on Admin Routes) */}
      {!isAdminRoute && <FloatingActions />}
    </div>
  );
}
