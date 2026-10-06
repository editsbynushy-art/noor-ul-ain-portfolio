import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Plus, Sliders } from 'lucide-react';

interface NavbarProps {
  onOpenEditor?: () => void;
  onOpenAddProject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEditor,
  onOpenAddProject
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Showcase', href: '#showcase' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-black/90 backdrop-blur-md border-b border-[#360302]/70 shadow-[0_10px_30px_rgba(54,3,2,0.5)]'
          : 'py-5 bg-black/40 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          {/* Rounded square badge 'NA' */}
          <div className="w-10 h-10 rounded-xl bg-[#360302] border border-[#520504] text-white font-extrabold flex items-center justify-center text-sm font-display tracking-wider shadow-[0_0_15px_rgba(54,3,2,0.8)] group-hover:scale-105 transition-transform">
            NA
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold tracking-wider text-white font-display uppercase leading-tight">
              NOOR UL AIN
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              DESIGNER & SHOPIFY DEV
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-neutral-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button & Management Toggle */}
        <div className="flex items-center gap-3">
          {/* Project Management Trigger */}
          {onOpenEditor && (
            <button
              onClick={onOpenEditor}
              title="Project Management & Uploads"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-950 border border-[#360302] hover:border-[#520504] text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>Project Manager</span>
            </button>
          )}

          {/* Primary Action Button: #360302 Burgundy */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#360302] hover:bg-[#480403] border border-[#520504] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(54,3,2,0.8)] hover:shadow-[0_0_30px_rgba(54,3,2,1)] hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            <span>LET'S WORK TOGETHER</span>
            <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-[#360302] px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-neutral-200 hover:text-white py-1"
              >
                {link.name}
              </a>
            ))}

            {onOpenEditor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditor();
                }}
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white py-2 border-t border-white/10"
              >
                <Sliders className="w-4 h-4 text-[#a85250]" />
                <span>Project Manager & Uploads</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="mt-2 text-center py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#360302] border border-[#520504] rounded-xl shadow-[0_0_20px_rgba(54,3,2,0.8)]"
            >
              LET'S WORK TOGETHER ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
