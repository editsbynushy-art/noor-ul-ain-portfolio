import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SocialIcon } from './SocialIcons';

interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

interface FooterProps {
  name: string;
  socials: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ name, socials }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-[#360302] pt-16 pb-12 relative overflow-hidden text-neutral-300">
      {/* Ambient Burgundy Glow Center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#360302]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div>
            <div className="text-2xl font-bold tracking-tight text-white font-display">
              {name}
            </div>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-xl font-light">
              Digital Marketer • Graphic Designer • Video Editor • Shopify Developer • Social Media Manager
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-neutral-950 border border-[#360302] hover:border-[#520504] flex items-center justify-center text-white hover:bg-[#360302] transition-all duration-300 shadow-[0_0_15px_rgba(54,3,2,0.4)] cursor-pointer"
                >
                  <SocialIcon platform={social.name} className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/10 hover:border-[#360302] flex items-center justify-center text-white hover:bg-[#360302]/40 transition-all cursor-pointer shadow-sm"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom row: Nav shortcuts & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#skills" className="hover:text-white transition-colors">Tools & Skills</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#process" className="hover:text-white transition-colors">How I Work</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-neutral-400">
            © 2026 {name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
