import React from 'react';
import { TrendingUp, Palette, Film, ShoppingBag, Share2, Sparkles } from 'lucide-react';
import { ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const serviceIcons: Record<string, React.ElementType> = {
    '01': TrendingUp,
    '02': Palette,
    '03': Film,
    '04': ShoppingBag,
    '05': Share2,
    '06': Sparkles,
  };

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden border-t border-[#360302]/70 text-white">
      {/* Ambient Burgundy Glow Center */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#360302]/25 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-3">
              <span>02 / Capabilities</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              What I Do
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-neutral-300 max-w-md font-light">
            End-to-end creative and commercial solutions calibrated to accelerate online awareness, conversion and revenue.
          </p>
        </div>

        {/* 6 Clean Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.number] || Sparkles;
            return (
              <div
                key={service.number}
                className="group relative p-8 rounded-2xl bg-neutral-950/80 border border-[#360302] hover:border-[#520504] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(54,3,2,0.85)] flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Card Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#360302]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Editorial Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-[#a85250] font-semibold">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#360302]/50 border border-[#360302] flex items-center justify-center text-white group-hover:bg-[#360302] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-rose-100 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables / Scope list */}
                <div className="pt-5 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#360302]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
