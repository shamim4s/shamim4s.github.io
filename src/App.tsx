import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { DeploymentModal } from './components/DeploymentModal';
import { triggerResumeDownload } from './utils/resumeGenerator';
import { updatePageSEO } from './utils/seo';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-dark-mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [deploymentGuideOpen, setDeploymentGuideOpen] = useState(false);

  useEffect(() => {
    // Initialize SEO meta tags and Open Graph protocol tags
    updatePageSEO();
    // Ensure viewport starts at the top (Home section)
    if (!window.location.hash || window.location.hash === '#home') {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-dark-mode', String(darkMode));
  }, [darkMode]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleDownloadResume = () => {
    addToast(
      'success',
      'Resume Download Initiated',
      'Opening high-resolution printable PDF resume for Md Shamim Mia.'
    );
    triggerResumeDownload();
  };

  const handleCopySuccess = (message: string) => {
    addToast('success', 'Copied to Clipboard', message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Fixed Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onDownloadResume={handleDownloadResume}
        onOpenDeploymentGuide={() => setDeploymentGuideOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Home Section */}
        <HomeSection />

        {/* 2. Professional Experience & Career Track Record */}
        <ExperienceSection />

        {/* 3. Customer Reviews & Upwork Client Satisfaction */}
        <ReviewsSection />

        {/* 4. Technical Skills */}
        <SkillsSection />

        {/* 5. Technical Projects */}
        <ProjectsSection />

        {/* 6. About / Executive Bio Section */}
        <Hero 
          onDownloadResume={handleDownloadResume} 
          onOpenDeploymentGuide={() => setDeploymentGuideOpen(true)}
        />

        {/* 7. Qualifications & Resume */}
        <ResumeSection
          onDownloadResume={handleDownloadResume}
          onCopySuccess={handleCopySuccess}
        />

        {/* 8. Technical Blog */}
        <BlogSection onCopySuccess={handleCopySuccess} />

        {/* 9. Direct Contact */}
        <ContactSection
          onSuccessToast={(title, msg) => addToast('success', title, msg)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deployment & Hosting Guide Modal */}
      <DeploymentModal
        isOpen={deploymentGuideOpen}
        onClose={() => setDeploymentGuideOpen(false)}
        onCopySuccess={handleCopySuccess}
      />

      {/* Interactive Toast Alerts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
