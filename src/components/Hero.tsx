import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Check, ShoppingBag, Camera } from 'lucide-react';
import referencePortrait from '@/src/assets/images/noor_ul_ain_reference_pose_1791228655315.jpg';
import { fileToDataUrl } from '../utils/storage';

interface HeroProps {
  name: string;
  portraitSrc?: string;
  experienceYears?: string;
  onUpdatePortrait?: (newPortraitUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  portraitSrc = referencePortrait,
  experienceYears = '4+ Years',
  onUpdatePortrait
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roles = [
    'Graphic Designer & Shopify Developer',
    'Digital Marketer & Creative Specialist',
    'Video Editor & Motion Designer',
    'Social Media Manager & Strategist'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePortrait) {
      try {
        const dataUrl = await fileToDataUrl(file);
        onUpdatePortrait(dataUrl);
      } catch (err) {
        console.error('Failed reading portrait file', err);
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-black text-white">
      {/* Deep Burgundy #360302 Ambient Glow Backdrop */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-[#360302]/35 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#360302]/25 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Pill: Available for Freelance Projects */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-950 border border-[#360302] w-fit mb-8 shadow-[0_0_15px_rgba(54,3,2,0.6)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#360302] ring-2 ring-[#520504] shadow-[0_0_10px_#360302] animate-pulse" />
              <span className="text-xs font-medium text-white tracking-wide">
                Available for Freelance Projects
              </span>
            </div>

            {/* Main Headline Line 1: Ultra-bold display font "Hi, I'm Noor" */}
            <h1 className="font-hero text-5xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.02]">
              Hi, I'm Noor
            </h1>

            {/* Main Headline Line 2: In #360302 burgundy glowing accent */}
            <div className="mt-2 min-h-[3rem] sm:min-h-[3.8rem] flex items-center">
              <h2 className="font-hero text-2xl sm:text-4xl xl:text-[2.75rem] font-extrabold text-white tracking-tight transition-all duration-300">
                <span className="text-white drop-shadow-[0_0_25px_rgba(54,3,2,0.9)]">
                  {roles[currentRoleIndex]}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
              I create compelling visual identities, high-converting social media designs, and modern Shopify stores that help brands look professional and grow online.
            </p>

            {/* The 2 Buttons: Burgundy #360302 styling */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              {/* Button 1: Solid #360302 button with down arrow */}
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-bold text-white bg-[#360302] hover:bg-[#480403] border border-[#520504] rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(54,3,2,0.8)] hover:shadow-[0_0_40px_rgba(54,3,2,1)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-white stroke-[2.5]" />
              </a>

              {/* Button 2: Outlined dark button with top-right arrow */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-medium text-white bg-black hover:bg-[#360302]/30 border border-[#360302] hover:border-[#520504] rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* Bottom 3 Checkmarks with hairline divider above */}
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-200 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#360302] flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
                <span>4+ Years Proven Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#360302] flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
                <span>International Client Base</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#360302] flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Glowing Outline & EXACT Requested Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Ambient Background Aura in #360302 */}
            <div className="absolute -inset-4 bg-[#360302]/35 rounded-[2.5rem] blur-3xl pointer-events-none -z-10" />

            {/* Floating Badge on Top Left: EXACTLY "E-Commerce" and "Creative Specialist" */}
            <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 z-30 p-3.5 sm:p-4 rounded-2xl bg-neutral-950/95 backdrop-blur-md border border-[#360302] shadow-[0_15px_35px_rgba(54,3,2,0.85)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#360302]/50 border border-[#360302] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5 text-white stroke-[2]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-mono tracking-wider text-neutral-300 font-semibold">
                  E-Commerce
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-display">
                  Creative Specialist
                </span>
              </div>
            </div>

            {/* Image Container with Burgundy Glow Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl p-1.5 bg-neutral-950 border border-[#360302]/80 shadow-[0_20px_50px_rgba(54,3,2,0.9)] overflow-hidden group">
              <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={portraitSrc}
                  alt="Noor Ul Ain - Creative Specialist & Freelancer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hero-contour-glow transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.35rem] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Hover Upload Button */}
                {onUpdatePortrait && (
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-[#360302] hover:bg-[#480403] text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(54,3,2,1)] border border-[#520504] hover:scale-105 transition-transform"
                    >
                      <Camera className="w-4 h-4 text-white" />
                      <span>Upload Your Photo</span>
                    </button>
                    <span className="text-[11px] text-neutral-300">
                      Supports JPG, PNG, WEBP without quality loss
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
