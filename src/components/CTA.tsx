import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onWorkTogetherClick?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onWorkTogetherClick }) => {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Intense Burgundy Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[#360302]/35 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Glow Container Card */}
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#180202] via-neutral-950 to-black border border-[#360302] shadow-[0_20px_70px_rgba(54,3,2,0.8)] overflow-hidden">
          {/* Subtle Ambient Radial Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#360302]/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#360302] text-xs font-mono text-rose-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#a85250]" />
              <span>Initiate Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight max-w-3xl leading-[1.1]">
              Let's Create Something Great Together.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
              Have a project, brand or business idea in mind? Let’s turn it into a professional digital experience.
            </p>

            <div className="mt-8 sm:mt-10">
              <a
                href="#contact"
                onClick={onWorkTogetherClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 text-sm sm:text-base font-bold text-white bg-black border border-[#360302] hover:border-[#6b0b08] rounded-2xl shadow-[0_0_35px_rgba(54,3,2,0.9)] hover:shadow-[0_0_50px_rgba(54,3,2,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#360302] via-[#520504] to-[#360302] opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Let's Work Together</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
