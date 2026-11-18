import { useState } from 'react';
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

export default function App() {
  const [quoteInitialData, setQuoteInitialData] = useState(null);

  const scrollToQuote = (prefillData = null) => {
    if (prefillData) {
      setQuoteInitialData(prefillData);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#ea1d25] selection:text-white">
      {/* Header & Top Bar */}
      <Header onOpenQuote={() => scrollToQuote()} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenQuote={() => scrollToQuote()} />

        {/* 2. Authority & Compliance Badges Bar */}
        <TrustBar />

        {/* 3. About Us & Credentials */}
        <AboutSection onOpenQuote={() => scrollToQuote()} />

        {/* 4. Special Wrecking & Demolition Services */}
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* 5. 4-Step Engineering Work Process */}
        <ProcessSection onOpenQuote={() => scrollToQuote()} />

        {/* 6. In-House Modern Heavy Fleet */}
        <FleetSection onOpenQuote={() => scrollToQuote()} />

        {/* 7. Picture Gallery / Executed Works */}
        <ProjectGallery onOpenQuote={() => scrollToQuote()} />

        {/* 8. Interactive Cost & Scope Estimator */}
        <CostEstimator onTransferToQuote={handleTransferEstimatorToQuote} />

        {/* 9. Why Choose Al Areesh */}
        <WhyChooseUs onOpenQuote={() => scrollToQuote()} />

        {/* 10. Client Testimonials & Google Ratings */}
        <Testimonials />

        {/* 11. Request A Quote & Contact Form */}
        <QuoteSection
          key={quoteInitialData ? JSON.stringify(quoteInitialData) : 'default'}
          initialData={quoteInitialData}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
}
