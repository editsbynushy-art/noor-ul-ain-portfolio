import React from 'react';
import {
  Compass,
  Award,
  TrendingUp,
  Sparkles,
  Smartphone,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

interface ReasonItem {
  title: string;
  description: string;
}

interface WhyWorkWithMeProps {
  reasons: ReasonItem[];
}

export const WhyWorkWithMe: React.FC<WhyWorkWithMeProps> = ({ reasons }) => {
  const icons = [
    Compass,
    Award,
    TrendingUp,
    Sparkles,
    Smartphone,
    MessageSquare,
    Clock,
    CheckCircle
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Ambient Burgundy Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#360302]/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#b36361] mb-3">
            <span>07 / Advantage</span>
            <span className="w-8 h-[1px] bg-[#360302]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Why Work With Me?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light">
            A relentless commitment to creative excellence, clear communication, and measurable commercial results.
          </p>
        </div>

        {/* 8 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={reason.title}
                className="group p-6 rounded-2xl bg-neutral-950/70 border border-[#360302]/40 hover:border-[#630b09] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_rgba(54,3,2,0.65)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#360302]/50 border border-[#360302] flex items-center justify-center text-rose-100 group-hover:scale-110 group-hover:bg-[#360302] transition-all mb-4">
                    <Icon className="w-5 h-5 text-rose-200" />
                  </div>

                  <h3 className="text-base font-bold text-white font-display mb-2 group-hover:text-rose-100 transition-colors">
                    {reason.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#a85250]">
                  <span>Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
