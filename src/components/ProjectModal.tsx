import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Wrench,
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Upload,
  Video as VideoIcon
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { fileToDataUrl } from '../utils/storage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEditClick?: (project: Project) => void;
  onUpdateProject?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onEditClick,
  onUpdateProject
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setUploadFeedback(null);
  }, [project]);

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !project) return;
    setIsUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const u = await fileToDataUrl(files[i]);
        urls.push(u);
      }
      const updated: Project = {
        ...project,
        image: urls[0],
        gallery: urls
      };
      onUpdateProject?.(updated);
      setActiveImageIndex(0);
      setUploadFeedback(`Added ${urls.length} real asset(s)!`);
      setTimeout(() => setUploadFeedback(null), 4000);
    } catch (err) {
      console.error('Failed reading files in modal', err);
      setUploadFeedback('Error uploading files.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentGallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const activeMedia = currentGallery[activeImageIndex] || project.image;
  const isVideo = project.fileType === 'video' || activeMedia.endsWith?.('.mp4') || activeMedia.startsWith?.('data:video');
  const isPdf = project.fileType === 'pdf' || activeMedia.endsWith?.('.pdf') || activeMedia.startsWith?.('data:application/pdf');

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 text-white"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-[#360302] shadow-[0_25px_90px_rgba(54,3,2,1)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Buttons */}
        <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
          {/* Hidden File Input for Direct Upload */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadFiles}
            className="hidden"
          />

          {onUpdateProject && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="Upload your real project images"
              className="px-4 py-2 rounded-full bg-[#360302] hover:bg-[#480403] text-xs font-semibold text-white border border-[#520504] transition-all cursor-pointer shadow-lg flex items-center gap-1.5 hover:scale-105"
            >
              <Upload className="w-3.5 h-3.5 text-rose-200" />
              <span>{isUploading ? 'Uploading...' : 'Upload Real Images'}</span>
            </button>
          )}

          {onEditClick && (
            <button
              onClick={() => onEditClick(project)}
              title="Edit project & upload new assets"
              className="px-4 py-2 rounded-full bg-black/80 hover:bg-[#360302] text-xs font-semibold text-white border border-[#360302] transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <span>Edit Case</span>
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2.5 rounded-full bg-black/80 hover:bg-[#360302] text-neutral-300 hover:text-white border border-white/10 hover:border-[#360302] transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Display Area */}
        <div className="relative w-full h-80 sm:h-[420px] overflow-hidden bg-black rounded-t-3xl group flex items-center justify-center">
          {isVideo ? (
            <video
              src={activeMedia}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : isPdf ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <FileText className="w-16 h-16 text-[#a85250] mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">
                {project.fileName || 'PDF Document Asset'}
              </h3>
              <a
                href={activeMedia}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#360302] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#480403]"
              >
                <span>Open Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <img
              src={activeMedia}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain sm:object-cover transition-all duration-500"
            />
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

          {/* Gallery Navigation Controls */}
          {currentGallery.length > 1 && (
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-[#360302] text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Previous asset"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/70 hover:bg-[#360302] text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Next asset"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Gallery Thumbnails Selector & Quick Upload */}
          <div className="absolute top-4 left-6 z-20 flex flex-wrap items-center gap-2">
            {currentGallery.length > 1 && (
              <div className="flex items-center gap-1.5">
                {currentGallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#520504] ring-2 ring-[#360302]'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {onUpdateProject && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Replace project photos with your real files"
                className="px-3 py-1 rounded-lg bg-black/80 hover:bg-[#360302] border border-[#520504] text-[11px] font-semibold text-rose-200 hover:text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Upload className="w-3 h-3 text-[#a85250]" />
                <span>Replace / Upload Real Images</span>
              </button>
            )}
            {uploadFeedback && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-600 text-[11px] text-emerald-200 font-medium animate-pulse">
                {uploadFeedback}
              </span>
            )}
          </div>

          {/* Title and Badges over Media */}
          <div className="absolute bottom-6 left-6 sm:left-10 right-6 pointer-events-none">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-widest uppercase text-white font-semibold px-2.5 py-0.5 rounded-full bg-black/70 border border-[#360302]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {project.year || '2025'}
              </span>
              {project.metricBadge && (
                <span className="text-xs font-mono text-white px-2.5 py-0.5 rounded-full bg-[#360302]/80 border border-[#520504]">
                  {project.metricBadge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-1 max-w-2xl font-light">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Key Outcome Banner */}
          <div className="p-6 rounded-2xl bg-[#1f0101] border border-[#360302] shadow-[0_0_30px_rgba(54,3,2,0.6)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Project Outcome & Measurable Impact
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                {project.outcome}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
              Project Overview
            </h3>
            <p className="text-base text-neutral-200 leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              {project.challenge && (
                <div className="p-5 rounded-2xl bg-black border border-[#360302]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#a85250] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Challenge</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="p-5 rounded-2xl bg-black border border-[#360302]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a85250]" />
                    <span>Strategic Solution</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Services Provided & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            {/* Services */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                <Layers className="w-4 h-4 text-[#a85250]" />
                <span>Services Delivered</span>
              </div>
              <ul className="space-y-2">
                {project.services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#a85250] shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                <Wrench className="w-4 h-4 text-[#a85250]" />
                <span>Technologies & Software</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-lg bg-black border border-[#360302] text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {project.client && (
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400">
                  <span>Client / Brand: <strong className="text-white">{project.client}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Need a similar solution for your brand?
            </div>
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black border border-[#360302] hover:border-white/30 text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                  <span>Live Preview</span>
                </a>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#360302] hover:bg-[#480403] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(54,3,2,0.9)] cursor-pointer"
              >
                <span>Discuss Similar Project</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
