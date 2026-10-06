import React from 'react';
import { Target, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

interface AboutProps {
  heading: string;
  paragraphs: string[];
  stats: Array<{ value: string; label: string; context: string }>;
  highlights: string[];
}

export const About: React.FC<AboutProps> = ({
  heading,
  paragraphs,
  stats,
  highlights
}) => {
  const pillars = [
    {
      icon: Target,
      title: 'Strategic Alignment',
      text: 'Every visual asset and campaign is engineered directly toward concrete business KPIs and audience conversion.'
    },
    {
      icon: Lightbulb,
      title: 'Aesthetic Authority',
      text: 'Delivering distinctive high-fashion editorial polish that commands attention and elevates brand perceived value.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Optimization',
      text: 'Iterating through data analytics, A/B creative variants, and audience metrics for sustained measurable growth.'
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Partnership',
      text: 'Dedicated project ownership with rigorous milestone reporting, active communication, and prompt delivery.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Subtle Burgundy Ambient Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#360302]/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#b36361] mb-3">
              <span>01 / Story</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              {heading}
            </h2>

            <div className="mt-8 space-y-5 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-neutral-300">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Values / Highlights */}
            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Core Working Principles
              </h3>
              <ul className="space-y-2.5">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#360302] mt-2 ring-1 ring-[#520504] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Stats & Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-neutral-950/80 border border-[#360302]/60 hover:border-[#520504] transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(54,3,2,0.5)] flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white group-hover:text-rose-100 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-neutral-200 mt-1">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 mt-3 pt-3 border-t border-white/5 font-light">
                    {stat.context}
                  </div>
                </div>
              ))}
            </div>

            {/* 4 Pillars Mini-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-black border border-white/5 hover:border-[#360302] transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#360302]/50 border border-[#360302] flex items-center justify-center text-rose-200 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
