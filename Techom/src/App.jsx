import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import HowItWorks from './components/HowItWorks';
import CollabFeatures from './components/CollabFeatures';
import Features from './components/Features';
import ComparisonSection from './components/ComparisonSection';
import Testimonials from './components/Testimonials';
import PricingTeaser from './components/PricingTeaser';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import LeadForm from './components/LeadForm';

// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h1>
            <p className="text-slate-600 mb-6">We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary w-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  try {
    return (
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen font-sans" data-name="app" data-file="app.js">
          <Header onOpenModal={openModal} />
          <main className="flex-grow">
            <Hero onOpenModal={openModal} />
            <TrustBar />
            <HowItWorks />
            <Features />
            <CollabFeatures />
            <ComparisonSection onOpenModal={openModal} />
            <Testimonials />
            <PricingTeaser onOpenModal={openModal} />
            <FAQ />
          </main>
          <Footer />
          <StickyCTA onOpenModal={openModal} />
          <LeadForm isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

export default App;