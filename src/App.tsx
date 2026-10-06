/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PORTFOLIO_DATA } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseStream } from './components/ShowcaseStream';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Tools } from './components/Tools';
import { Portfolio } from './components/Portfolio';
import { HowIWork } from './components/HowIWork';
import { Experience } from './components/Experience';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuickEditDrawer } from './components/QuickEditDrawer';
import {
  savePortfolioToStorage,
  loadPortfolioFromStorage,
  clearPortfolioStorage
} from './utils/storage';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO_DATA);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Load persistent data from IndexedDB on startup & purge sample demo projects
  useEffect(() => {
    loadPortfolioFromStorage(INITIAL_PORTFOLIO_DATA).then((loaded) => {
      if (loaded) {
        const demoIds = new Set([
          'aura-studio-identity',
          'omni-retail-campaign',
          'burger-blaze-identity',
          'zenmart-ecommerce',
          'social-growth-carousels',
          'shopify-fashion-boutique',
          'kinetic-brand-motion',
          'swiss-legacy-horology',
          'luxe-cosmetics-rebrand',
          'aesthetic-motion-ad'
        ]);
        const cleanedProjects = (loaded.projects || []).filter((p) => !demoIds.has(p.id));
        const projectMap = new Map<string, any>();
        INITIAL_PORTFOLIO_DATA.projects.forEach((p) => projectMap.set(p.id, p));
        cleanedProjects.forEach((p) => projectMap.set(p.id, p));
        const finalProjects = Array.from(projectMap.values());
        const cleanedData = {
          ...loaded,
          projects: finalProjects
        };
        setPortfolioData(cleanedData);
        savePortfolioToStorage(cleanedData);
      }
    });
  }, []);

  // Handle hash scrolling on initial load (e.g. /#portfolio)
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  }, []);

  // Save changes to storage whenever updated
  const handleUpdateData = (newData: typeof INITIAL_PORTFOLIO_DATA) => {
    setPortfolioData(newData);
    savePortfolioToStorage(newData);
  };

  const handleResetData = async () => {
    await clearPortfolioStorage();
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-[#360302] selection:text-white transition-colors duration-300">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenEditor={() => setIsEditorOpen(true)} />

      {/* Hero Section with Live Photo Uploader & Creative Specialist Badge */}
      <Hero
        name={portfolioData.profile.name}
        portraitSrc={portfolioData.profile.avatar}
        experienceYears={portfolioData.profile.experienceYears}
        onUpdatePortrait={(newAvatar) => {
          handleUpdateData({
            ...portfolioData,
            profile: {
              ...portfolioData.profile,
              avatar: newAvatar
            }
          });
        }}
      />

      {/* Showcase Stream • Visual Arts & E-Commerce */}
      <ShowcaseStream
        projects={portfolioData.projects}
        onSelectProject={() => {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAddProject={() => {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Portfolio & Work Gallery with Animated Effect & Work Uploader */}
      <Portfolio
        projects={portfolioData.projects}
        onUpdateProjects={(updatedProjects) => {
          handleUpdateData({
            ...portfolioData,
            projects: updatedProjects
          });
        }}
      />

      {/* About Me Section */}
      <About
        heading={portfolioData.about.heading}
        paragraphs={portfolioData.about.paragraphs}
        stats={portfolioData.stats}
        highlights={portfolioData.about.highlights}
      />

      {/* What I Do Section */}
      <Services services={portfolioData.services} />

      {/* Tools & Skills Sections */}
      <Skills skills={portfolioData.skills} />
      <Tools tools={portfolioData.tools} />

      {/* How I Work Section */}
      <HowIWork steps={portfolioData.howIWork} />

      {/* 4+ Years Creative Experience Timeline */}
      <Experience timeline={portfolioData.experienceTimeline} />

      {/* Why Work With Me Section */}
      <WhyWorkWithMe reasons={portfolioData.whyWorkWithMe} />

      {/* Call to Action Section */}
      <CTA />

      {/* Contact Section with the 5 Verified Social Media Links */}
      <Contact
        socials={portfolioData.socials}
        email={portfolioData.profile.email}
        location={portfolioData.profile.location}
      />

      {/* Footer with Verified Social Media Links & Copyright */}
      <Footer
        name={portfolioData.profile.name}
        socials={portfolioData.socials}
      />

      {/* Clean Project & Portfolio Manager Drawer */}
      <QuickEditDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={portfolioData}
        onUpdate={handleUpdateData}
        onReset={handleResetData}
      />
    </div>
  );
}
