import React from 'react';
import { Project } from '../data/portfolioData';
import { Plus, ArrowUpRight, Sparkles, FileText, Video as VideoIcon } from 'lucide-react';

interface ShowcaseStreamProps {
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  onOpenAddProject?: () => void;
}

export const ShowcaseStream: React.FC<ShowcaseStreamProps> = ({
  projects = [],
  onSelectProject,
  onOpenAddProject
}) => {
  // Split projects into 2 alternating rows for the dual-stream effect
  const safeProjects = projects && projects.length > 0 ? projects : [];
  const row1Projects = safeProjects.filter((_, idx) => idx % 2 === 0);
  const row2Projects = safeProjects.filter((_, idx) => idx % 2 !== 0);

  // Fallback if odd/few
  const row1 = row1Projects.length > 0 ? row1Projects : safeProjects;
  const row2 = row2Projects.length > 0 ? row2Projects : [...safeProjects].reverse();

  // Helper to map category to badge label similar to screenshot
  const getBadgeLabel = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shopify':
        return 'E-COMMERCE';
      case 'branding':
        return 'BRANDING';
      case 'digital marketing':
        return 'MARKETING';
      case 'video editing':
        return 'MOTION';
      case 'graphic design':
        return 'CAMPAIGN';
      case 'social media':
        return 'SOCIAL';
      default:
        return category.toUpperCase();
    }
  };

  const getSubtitle = (project: Project) => {
    if (project.services && project.services.length > 0) {
      return project.services[0];
    }
    switch (project.category.toLowerCase()) {
      case 'branding':
        return 'Brand Identity';
      case 'digital marketing':
      case 'social media':
        return 'Social Media Design';
      case 'shopify':
        return 'E-Commerce Store';
      case 'video editing':
        return 'Motion & Commercial Reel';
      default:
        return 'Creative Design';
    }
  };

  const renderCard = (project: Project, keyPrefix: string, idx: number) => {
    const badge = getBadgeLabel(project.category);
    const subtitle = getSubtitle(project);
    const isVideo = project.fileType === 'video' || project.image.startsWith('data:video');
    const isPdf = project.fileType === 'pdf';

    return (
      <div
        key={`${keyPrefix}-${project.id}-${idx}`}
        onClick={() => onSelectProject?.(project)}
        className="group relative w-[320px] sm:w-[380px] h-[220px] sm:h-[240px] shrink-0 rounded-3xl overflow-hidden bg-neutral-950 border border-[#360302] hover:border-[#520504] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(54,3,2,0.95)] select-none"
      >
        {/* Background Media */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {isVideo ? (
            <video
              src={project.image}
              className="w-full h-full object-cover pointer-events-none"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : isPdf ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <FileText className="w-12 h-12 text-[#a85250] mb-2" />
              <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                {project.fileName || 'PDF Case Asset'}
              </span>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </div>

        {/* Gradient Scrim for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

        {/* Top-Right Category Pill Badge matching screenshot */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#360302] text-[11px] font-mono font-bold tracking-wider text-white shadow-md">
            {badge}
          </span>
        </div>

        {/* Bottom Left Title & Subtitle matching screenshot */}
        <div className="absolute bottom-4 left-5 right-5 z-10 pointer-events-none text-left">
          <div className="text-xs text-neutral-300 font-medium font-sans mb-1 truncate drop-shadow">
            {subtitle}
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white font-display tracking-tight leading-snug truncate drop-shadow-md group-hover:text-rose-100 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <section id="showcase" className="py-14 bg-black border-y border-[#360302]/80 relative overflow-hidden text-white">
      {/* Background Burgundy Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#360302]/25 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#360302] ring-2 ring-[#520504] animate-pulse" />
            <span>Showcase Stream • Visual Arts & E-Commerce</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            Featured Works & Visual Showcase
          </h2>
        </div>

        {/* Upload / Add Work Trigger */}
        {onOpenAddProject && (
          <button
            onClick={onOpenAddProject}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#360302] hover:bg-[#480403] border border-[#520504] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(54,3,2,0.85)] cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Your Work</span>
          </button>
        )}
      </div>

      {/* Dynamic Project Streams OR Capability Ribbons if no projects yet */}
      {safeProjects.length > 0 ? (
        <>
          {/* Row 1: Scrolling Left */}
          <div className="relative w-full overflow-hidden py-3">
            <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
              {row1.map((p, idx) => renderCard(p, 'row1-a', idx))}
              {row1.map((p, idx) => renderCard(p, 'row1-b', idx))}
              {row1.map((p, idx) => renderCard(p, 'row1-c', idx))}
              {row1.map((p, idx) => renderCard(p, 'row1-d', idx))}
            </div>
          </div>

          {/* Row 2: Scrolling Right (Reverse) */}
          <div className="relative w-full overflow-hidden py-3 mt-1">
            <div className="animate-marquee-reverse flex items-center gap-6 whitespace-nowrap">
              {row2.map((p, idx) => renderCard(p, 'row2-a', idx))}
              {row2.map((p, idx) => renderCard(p, 'row2-b', idx))}
              {row2.map((p, idx) => renderCard(p, 'row2-c', idx))}
              {row2.map((p, idx) => renderCard(p, 'row2-d', idx))}
            </div>
          </div>

          {/* Subtle indicator under stream */}
          <div className="text-center mt-4">
            <span className="text-[11px] font-mono text-neutral-400">
              Hover to pause · Click any card to explore full case study
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Fallback Animated Capabilities Stream */}
          <div className="relative w-full overflow-hidden py-3">
            <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
              {[
                'Shopify Store Development',
                'Brand Identity Design',
                'Commercial Video Editing',
                'Meta & Google Ads Performance',
                'Viral TikTok & Instagram Reels',
                'Packaging & Vector Identity',
                'Social Media Growth Campaigns',
                'Conversion Rate Optimization (CRO)'
              ].flatMap((t) => [t, t, t]).map((item, idx) => (
                <div
                  key={`cap1-${idx}`}
                  className="px-5 py-3 rounded-2xl bg-neutral-950 border border-[#360302] text-xs font-mono font-semibold text-neutral-200 tracking-wide flex items-center gap-3 shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#360302]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-3 mt-1">
            <div className="animate-marquee-reverse flex items-center gap-4 whitespace-nowrap">
              {[
                '4+ Years Creative Experience',
                'UI/UX Storefront Architecture',
                'Kinetic Motion Graphics & SFX',
                'Liquid Theme Customization',
                'Editorial Planning & Copywriting',
                'High-Converting Ad Creatives',
                'Organic Growth & Community'
              ].flatMap((t) => [t, t, t]).map((item, idx) => (
                <div
                  key={`cap2-${idx}`}
                  className="px-5 py-3 rounded-2xl bg-neutral-950/80 border border-[#360302] text-xs font-mono font-medium text-neutral-300 tracking-wide flex items-center gap-3 shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#520504]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <span className="text-[11px] font-mono text-neutral-400">
              Showcase Stream active · Upload your work below to feature cards live
            </span>
          </div>
        </>
      )}
    </section>
  );
};
