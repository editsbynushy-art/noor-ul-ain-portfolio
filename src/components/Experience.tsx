import React, { useState } from 'react';
import { ExperienceItem } from '../data/portfolioData';
import { CheckCircle2, Briefcase, Calendar, Sparkles } from 'lucide-react';

interface ExperienceProps {
  timeline: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ timeline }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeItem = timeline[selectedIdx];

  return (
    <section id="experience" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Burgundy Ambient Light */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#360302]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#b36361] mb-3">
            <span>05 / Career Track</span>
            <span className="w-8 h-[1px] bg-[#360302]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            4+ Years of Creative Experience
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 font-light max-w-xl">
            A track record of high-converting campaigns, brand architecture, and e-commerce craftsmanship.
          </p>
        </div>

        {/* Master-Detail / Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Discipline List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {timeline.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={item.discipline}
                  onClick={() => setSelectedIdx(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-950 border-[#360302] shadow-[0_0_25px_rgba(54,3,2,0.7)]'
                      : 'bg-black/50 border-white/5 hover:border-[#360302]/60 hover:bg-neutral-950/40 text-neutral-400'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#520504] to-[#360302]" />
                  )}

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#a85250]">
                      Track 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      4+ Years Experience
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold font-display ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {item.discipline}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1 font-light">
                    {item.focus}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Card for Active Track */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-[#360302]/70 shadow-[0_20px_50px_-10px_rgba(54,3,2,0.6)]">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c5807e]">
                    Specialized Expertise
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                    {activeItem.discipline}
                  </h3>
                  <div className="text-sm text-neutral-300 mt-0.5 font-light">
                    Role: <strong className="text-white font-medium">{activeItem.role}</strong>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-black border border-[#360302] flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <Calendar className="w-3.5 h-3.5 text-[#a85250]" />
                  <span>{activeItem.period}</span>
                </div>
              </div>

              {/* Core Focus Area */}
              <div className="py-6 border-b border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Primary Strategic Focus
                </div>
                <p className="text-base text-neutral-200 font-light leading-relaxed">
                  {activeItem.focus}
                </p>
              </div>

              {/* Key Milestones & Achievements */}
              <div className="pt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#a85250]" />
                  <span>Key Milestones & Production Highlights</span>
                </div>
                <ul className="space-y-3.5">
                  {activeItem.achievements.map((achieve, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#a85250] mt-0.5 shrink-0" />
                      <span>{achieve}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
