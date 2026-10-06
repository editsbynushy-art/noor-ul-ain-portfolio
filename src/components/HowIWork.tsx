import React from 'react';
import { ProcessStep } from '../data/portfolioData';
import { Compass, Lightbulb, Code2, Rocket, CheckCircle2 } from 'lucide-react';

interface HowIWorkProps {
  steps?: ProcessStep[];
}

export const HowIWork: React.FC<HowIWorkProps> = ({ steps }) => {
  const defaultSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery & Strategic Direction',
      subtitle: 'Understanding the Brand DNA & Objectives',
      description:
        'Every project begins with a structured analysis of brand goals, customer demographics, competitor benchmarks, and conversion obstacles.',
      deliverables: ['Target Audience Mapping', 'Competitor & Moodboard Audit', 'Project Roadmap & Scope', 'Metric Milestones']
    },
    {
      number: '02',
      title: 'Concept & Creative Architecture',
      subtitle: 'Translating Strategy into Visual Form',
      description:
        'Developing the foundational visual direction, wireframes, kinetic typography, color palette, and high-impact layouts.',
      deliverables: ['Custom Typography & Palette', 'High-Fidelity Wireframes', 'Design Prototypes in Figma', 'Asset System Planning']
    },
    {
      number: '03',
      title: 'Execution & Shopify Development',
      subtitle: 'Building the High-Converting Experience',
      description:
        'Bringing designs to life with bespoke Shopify Liquid code, responsive styling, commercial video editing, and marketing assets.',
      deliverables: ['Custom Shopify Store Build', 'Mobile-First Layout Tuning', 'Kinetic Video Cuts & SFX', 'Ad Creative Suites']
    },
    {
      number: '04',
      title: 'Launch & Continuous Optimization',
      subtitle: 'Testing, Deployment & Growth',
      description:
        'Rigorous cross-browser QA, checkout flow verification, analytics pixel validation, and ongoing creative iteration.',
      deliverables: ['Storefront Speed Optimization', 'Analytics & Meta Pixel QA', 'Final Deliverables Handover', 'Post-Launch Support']
    }
  ];

  const processList = steps || defaultSteps;

  const stepIcons = [Compass, Lightbulb, Code2, Rocket];

  return (
    <section id="process" className="py-24 bg-black relative overflow-hidden border-t border-[#360302]/60 text-white">
      {/* Background Burgundy Ambient Light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#360302]/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-3">
              <span>06 / Methodology</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              How I Work
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-neutral-300 max-w-md font-light">
            A structured, transparent 4-stage creative process engineered for punctual delivery and measurable business growth.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processList.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={step.number}
                className="group relative p-7 rounded-2xl bg-neutral-950/80 border border-[#360302]/70 hover:border-[#520504] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(54,3,2,0.8)] flex flex-col justify-between overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#360302]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-[#a85250] font-bold">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#360302]/50 border border-[#360302] flex items-center justify-center text-white group-hover:bg-[#360302] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-rose-100 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs text-neutral-400 font-mono mb-3">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Key Milestones
                  </div>
                  {step.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a85250] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
