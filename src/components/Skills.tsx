import React, { useState } from 'react';
import { SkillItem } from '../data/portfolioData';
import { Zap } from 'lucide-react';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Marketing' | 'Design' | 'Technical'>('All');

  const categories = ['All', 'Marketing', 'Design', 'Technical'] as const;

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden border-t border-[#360302]/60 text-white">
      {/* Background ambient lighting in #360302 */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#360302]/25 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-3">
              <span>03 / Proficiency & Core Capabilities</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              My Skills
            </h2>
          </div>

          {/* Category Filter Controls */}
          <div className="mt-6 md:mt-0 flex items-center gap-1.5 p-1 bg-neutral-950 border border-[#360302] rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#360302] text-white font-semibold shadow-[0_0_15px_rgba(54,3,2,0.9)] border border-[#520504]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-6 rounded-2xl bg-neutral-950/80 border border-[#360302] hover:border-[#520504] transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(54,3,2,0.8)] hover:-translate-y-1"
            >
              {/* Header with Title and Percentage */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-white group-hover:text-rose-100 transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2.5 rounded-full bg-neutral-900 border border-white/10 overflow-hidden p-[1px]">
                <div
                  className="h-full rounded-full bg-[#360302] transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(54,3,2,1)]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Category Subtext */}
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                <span>{skill.category} Track</span>
                <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <Zap className="w-3 h-3 text-[#a85250]" />
                  <span>Mastery Level</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
