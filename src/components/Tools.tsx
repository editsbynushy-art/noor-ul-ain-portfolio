import React from 'react';
import { ToolItem } from '../data/portfolioData';
import { Cpu, Palette, Video, ShoppingCart, BarChart3, Wand2 } from 'lucide-react';

interface ToolsProps {
  tools: ToolItem[];
}

export const Tools: React.FC<ToolsProps> = ({ tools }) => {
  const getToolIcon = (category: string) => {
    switch (category) {
      case 'Creative Design':
        return Palette;
      case 'Video Production':
      case 'Viral Video':
        return Video;
      case 'E-Commerce':
        return ShoppingCart;
      case 'Marketing':
        return BarChart3;
      case 'Innovation':
        return Wand2;
      default:
        return Cpu;
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Burgundy Ambient Light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#360302]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#b36361] mb-3">
              <span>06 / Technical Stack</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              Tools & Software
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-light max-w-xl">
              Industry-standard software suites harnessed for precision, speed, and elevated aesthetics.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {tools.map((tool) => {
            const Icon = getToolIcon(tool.category);
            return (
              <div
                key={tool.name}
                className="group p-5 rounded-2xl bg-neutral-950/70 border border-[#360302]/40 hover:border-[#630b09] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(54,3,2,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#360302]/40 border border-[#360302] flex items-center justify-center text-rose-100 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#a85250] px-2 py-0.5 rounded-full bg-black border border-[#360302]/60">
                      {tool.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display group-hover:text-rose-100 transition-colors">
                    {tool.name}
                  </h3>

                  <div className="text-[11px] font-mono text-neutral-500 mt-0.5 mb-2">
                    {tool.category}
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
