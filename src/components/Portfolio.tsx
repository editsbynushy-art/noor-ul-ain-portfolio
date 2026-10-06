import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, SAMPLE_PROJECTS } from '../data/portfolioData';
import {
  ArrowUpRight,
  Eye,
  Search,
  LayoutGrid,
  List,
  Plus,
  Edit3,
  FileText,
  Video as VideoIcon,
  Upload,
  Sparkles,
  Layers,
  X,
  CheckCircle2,
  Trash2,
  CheckSquare,
  Square,
  RotateCcw
} from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { EditProjectModal } from './EditProjectModal';
import { fileToDataUrl } from '../utils/storage';

interface PortfolioProps {
  projects: Project[];
  onUpdateProjects?: (updatedProjects: Project[]) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects = [], onUpdateProjects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'detailed'>('grid');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Edit / Add modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Bulk selection state for multi-delete
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Direct multi-file batch upload input ref
  const batchUploadInputRef = useRef<HTMLInputElement>(null);
  const [isBatchUploading, setIsBatchUploading] = useState(false);

  // Single project replace / upload input ref
  const singleProjectUploadInputRef = useRef<HTMLInputElement>(null);
  const [targetProjectIdForUpload, setTargetProjectIdForUpload] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const categories = [
    'All',
    'Shopify',
    'Branding',
    'Graphic Design',
    'Video Editing',
    'Digital Marketing',
    'Social Media'
  ] as const;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleOpenAddProject = () => {
    setProjectToEdit(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const handleSaveProject = (savedProject: Project) => {
    if (!onUpdateProjects) return;
    const exists = projects.some((p) => p.id === savedProject.id);
    let newProjects: Project[];
    if (exists) {
      newProjects = projects.map((p) => (p.id === savedProject.id ? savedProject : p));
      showToast(`Updated "${savedProject.title}" successfully!`);
    } else {
      newProjects = [savedProject, ...projects];
      showToast(`Added "${savedProject.title}" to your portfolio!`);
    }
    onUpdateProjects(newProjects);

    if (activeModalProject && activeModalProject.id === savedProject.id) {
      setActiveModalProject(savedProject);
    }
  };

  const handleDeleteProject = (projectId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!onUpdateProjects) return;
    const target = projects.find((p) => p.id === projectId);
    const newProjects = projects.filter((p) => p.id !== projectId);
    onUpdateProjects(newProjects);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(projectId);
      return next;
    });
    showToast(`Deleted "${target?.title || 'Project'}".`);
    if (activeModalProject && activeModalProject.id === projectId) {
      setActiveModalProject(null);
    }
  };

  // Toggle selection for bulk deletion
  const handleToggleSelect = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  // Select all currently visible filtered projects
  const handleSelectAll = () => {
    if (selectedIds.size === filteredProjects.length && filteredProjects.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProjects.map((p) => p.id)));
    }
  };

  // Delete all selected items
  const handleDeleteSelected = () => {
    if (!onUpdateProjects || selectedIds.size === 0) return;
    const count = selectedIds.size;
    const newProjects = projects.filter((p) => !selectedIds.has(p.id));
    onUpdateProjects(newProjects);
    setSelectedIds(new Set());
    showToast(`Deleted ${count} selected work item(s).`);
  };

  // Clear all projects completely
  const handleClearAll = () => {
    if (!onUpdateProjects) return;
    onUpdateProjects([]);
    setSelectedIds(new Set());
    showToast('All works cleared. Your portfolio is ready for your uploads.');
  };

  // Restore sample demo templates if desired
  const handleLoadSamples = () => {
    if (!onUpdateProjects) return;
    onUpdateProjects(SAMPLE_PROJECTS);
    setSelectedIds(new Set());
    showToast('Loaded sample project templates.');
  };

  // Direct multi-file upload handler
  const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !onUpdateProjects) return;

    setIsBatchUploading(true);
    try {
      const newCreatedProjects: Project[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await fileToDataUrl(file);

        let detectedType: 'image' | 'video' | 'pdf' = 'image';
        if (file.type.includes('pdf')) {
          detectedType = 'pdf';
        } else if (file.type.includes('video') || file.name.endsWith('.mp4')) {
          detectedType = 'video';
        }

        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const cleanTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);

        const projectCategory: Project['category'] =
          selectedCategory !== 'All' ? (selectedCategory as Project['category']) : 'Shopify';

        newCreatedProjects.push({
          id: 'proj-' + Date.now() + '-' + i,
          title: cleanTitle || `Creative Work ${projects.length + i + 1}`,
          category: projectCategory,
          tagline: `${projectCategory} Project & Creative Deliverable`,
          image: dataUrl,
          gallery: [dataUrl],
          fileType: detectedType,
          fileName: file.name,
          overview: `Client project deliverables and visual showcase for ${cleanTitle}. Created by Noor Ul Ain.`,
          services: [projectCategory, 'Creative Production'],
          tools: ['Figma', 'Shopify', 'Adobe Suite'],
          outcome: 'Designed and deployed high-converting professional assets.',
          metricBadge: 'New Work',
          client: 'Client Project',
          year: new Date().getFullYear().toString()
        });
      }

      onUpdateProjects([...newCreatedProjects, ...projects]);
      showToast(`Successfully added ${newCreatedProjects.length} new work item(s) to your portfolio!`);
    } catch (err) {
      console.error('Failed reading files', err);
      showToast('Error uploading files. Please try again.');
    } finally {
      setIsBatchUploading(false);
      if (batchUploadInputRef.current) {
        batchUploadInputRef.current.value = '';
      }
    }
  };

  // Single project replace / upload handler
  const handleSingleProjectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !targetProjectIdForUpload || !onUpdateProjects) return;
    const targetProject = projects.find((p) => p.id === targetProjectIdForUpload);
    if (!targetProject) return;

    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        urls.push(await fileToDataUrl(files[i]));
      }
      const updated: Project = {
        ...targetProject,
        image: urls[0],
        gallery: urls
      };
      handleSaveProject(updated);
      showToast(`Uploaded ${urls.length} real image(s) for "${targetProject.title}"!`);
    } catch (err) {
      console.error('Error uploading project files', err);
      showToast('Error uploading files. Please try again.');
    } finally {
      if (singleProjectUploadInputRef.current) {
        singleProjectUploadInputRef.current.value = '';
      }
      setTargetProjectIdForUpload(null);
    }
  };

  return (
    <section
      id="portfolio"
      className="py-24 bg-black relative overflow-hidden border-t border-[#360302]/70 text-white"
    >
      {/* Background Burgundy Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[#360302]/25 rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#360302]/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Hidden batch file input */}
      <input
        ref={batchUploadInputRef}
        type="file"
        multiple
        accept="image/*,video/*,application/pdf"
        className="hidden"
        onChange={handleBatchUpload}
      />

      {/* Hidden single project replace input */}
      <input
        ref={singleProjectUploadInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleSingleProjectUpload}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a85250] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#360302] ring-2 ring-[#520504] animate-pulse" />
              <span>02 / PORTFOLIO & WORK GALLERY</span>
              <span className="w-8 h-[1px] bg-[#360302]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display">
              Curated Work & Visual Portfolio
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
              Explore and manage your creative projects across E-Commerce & Shopify, Branding, Motion, and Digital Marketing.
              Easily upload your own images, video reels, or case study files directly.
            </p>
          </div>

          {/* Action buttons: Add Project, Batch Upload & View Mode Toggle */}
          <div className="mt-8 md:mt-0 flex flex-wrap items-center gap-3">
            {onUpdateProjects && (
              <>
                <button
                  onClick={() => batchUploadInputRef.current?.click()}
                  disabled={isBatchUploading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-[#360302]/60 border border-[#360302] text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105"
                  title="Upload multiple images, videos or PDFs at once"
                >
                  <Upload className="w-4 h-4 text-[#a85250]" />
                  <span>{isBatchUploading ? 'Uploading...' : 'Batch Upload'}</span>
                </button>

                <button
                  onClick={handleOpenAddProject}
                  className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#360302] hover:bg-[#480403] border border-[#520504] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(54,3,2,0.9)] cursor-pointer hover:scale-105"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Work</span>
                </button>

                {projects.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-950 hover:bg-rose-950/60 border border-neutral-800 hover:border-rose-800 text-xs text-neutral-400 hover:text-rose-200 transition-colors cursor-pointer"
                    title="Delete all work items"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-neutral-950 border border-[#360302]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#360302] text-white font-bold shadow-[0_0_15px_rgba(54,3,2,0.8)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Bento Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'masonry'
                    ? 'bg-[#360302] text-white font-bold shadow-[0_0_15px_rgba(54,3,2,0.8)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Masonry Gallery View"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Masonry</span>
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-[#360302] text-white font-bold shadow-[0_0_15px_rgba(54,3,2,0.8)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Detailed Case View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar (Visible when items are selected or available) */}
        {projects.length > 0 && (
          <div className="mb-6 p-3 rounded-2xl bg-neutral-950/80 border border-[#360302] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-neutral-300 hover:text-white cursor-pointer px-2 py-1 rounded-lg hover:bg-neutral-900 transition-colors"
              >
                {selectedIds.size === filteredProjects.length && filteredProjects.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-[#a85250]" />
                ) : (
                  <Square className="w-4 h-4 text-neutral-500" />
                )}
                <span>
                  {selectedIds.size === filteredProjects.length && filteredProjects.length > 0
                    ? 'Deselect All'
                    : 'Select All'}
                </span>
              </button>

              {selectedIds.size > 0 && (
                <span className="font-mono text-[#a85250]">
                  ({selectedIds.size} of {filteredProjects.length} selected)
                </span>
              )}
            </div>

            {selectedIds.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-100 font-semibold text-xs transition-all shadow-md cursor-pointer hover:scale-105"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                <span>Delete Selected ({selectedIds.size})</span>
              </button>
            )}
          </div>
        )}

        {/* Animated Filter Bar & Quick Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-10 border-b border-white/10">
          {/* Animated Category Tabs with gliding background */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar relative">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 z-10 ${
                    isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {/* Sliding animated indicator pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#360302] border border-[#520504] rounded-xl shadow-[0_0_20px_rgba(54,3,2,0.95)] -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-black/60 text-white font-bold'
                        : 'bg-neutral-900 text-neutral-400 group-hover:text-white'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search with clear action */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search works, clients, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-neutral-950 border border-[#360302] focus:border-[#520504] text-xs text-white placeholder-neutral-500 outline-none transition-all focus:shadow-[0_0_20px_rgba(54,3,2,0.6)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Clean Slate / Empty Portfolio State */}
        {projects.length === 0 && (
          <div className="py-16 px-6 sm:px-12 text-center rounded-3xl bg-neutral-950/80 border-2 border-dashed border-[#360302] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#360302]/30 rounded-full blur-[140px] pointer-events-none" />

            {/* Glowing Icon */}
            <div className="w-20 h-20 rounded-3xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_35px_rgba(54,3,2,0.9)] animate-pulse-glow">
              <Upload className="w-10 h-10 stroke-[2] text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-[#360302] text-[11px] font-mono text-[#a85250] mb-3">
              <span>CLEAN SLATE • READY FOR YOUR WORK</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              All Projects Cleared
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
              Your portfolio is ready for you to upload your own projects. Add Shopify stores, graphic design, video editing reels, and marketing campaigns.
            </p>

            {/* Big Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => batchUploadInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#360302] hover:bg-[#4e0706] border border-[#520504] text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(54,3,2,0.95)] cursor-pointer hover:scale-105"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Files Directly</span>
              </button>

              <button
                onClick={handleOpenAddProject}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-semibold text-sm transition-all cursor-pointer hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Create Detailed Project Form</span>
              </button>
            </div>

            {/* Secondary template restore */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-xs text-neutral-400">
              <span>Want to preview how cards look?</span>
              <button
                onClick={handleLoadSamples}
                className="text-[#a85250] hover:text-white underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Load Sample Work Demos</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty Search / Filter State (when projects exist but query doesn't match) */}
        {projects.length > 0 && filteredProjects.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-neutral-950/60 border border-[#360302] p-8">
            <Sparkles className="w-10 h-10 text-[#a85250] mx-auto mb-3" />
            <p className="text-white text-base font-semibold">
              No projects found matching "{searchQuery}"
            </p>
            <p className="text-neutral-400 text-xs font-light mt-1">
              Try adjusting your category or search keywords, or add a new project right here.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs text-white bg-neutral-900 border border-white/10 rounded-xl cursor-pointer hover:bg-neutral-800"
              >
                Reset Filter
              </button>
              {onUpdateProjects && (
                <button
                  onClick={handleOpenAddProject}
                  className="px-5 py-2 text-xs text-white font-bold bg-[#360302] border border-[#520504] rounded-xl cursor-pointer hover:bg-[#480403] shadow-[0_0_20px_rgba(54,3,2,0.85)]"
                >
                  Upload Project Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 1: BENTO GRID VIEW                                  */}
        {/* ============================================================== */}
        {projects.length > 0 && viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {/* Dedicated Animated "+ Add New Work" Card in the Grid */}
            {onUpdateProjects && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-3xl bg-neutral-950/70 border-2 border-dashed border-[#360302] hover:border-[#7a0c0a] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(54,3,2,0.9)] hover:scale-[1.02] min-h-[300px]"
                onClick={handleOpenAddProject}
              >
                {/* Concentric Animated Glow Rings */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full bg-[#360302]/60 blur-xl animate-pulse-glow" />
                  <div className="w-16 h-16 rounded-2xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white relative z-10 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 shadow-xl">
                    <Plus className="w-8 h-8 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  Add Your Work
                </h3>
                <p className="text-xs text-neutral-300 font-light mt-1.5 max-w-[220px]">
                  Upload images, video reels, PDFs, or customize a case study.
                </p>

                {/* Quick actions inside the card */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      batchUploadInputRef.current?.click();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-[#360302] border border-[#360302] text-[11px] font-semibold text-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3 h-3 text-[#a85250]" />
                    <span>Upload Files</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAddProject();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#360302] hover:bg-[#4e0706] border border-[#520504] text-[11px] font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Fill Details</span>
                  </button>
                </div>

                {/* Badges of supported formats */}
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span>JPG • PNG</span>
                  <span>•</span>
                  <span>MP4 Video</span>
                  <span>•</span>
                  <span>PDF Document</span>
                </div>
              </motion.div>
            )}

            {/* Project Cards with Animation */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isWide = idx === 1 || idx === 4;
                const isPdf = project.fileType === 'pdf';
                const isVideo = project.fileType === 'video' || project.image.startsWith('data:video');
                const isSelected = selectedIds.has(project.id);

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActiveModalProject(project)}
                    className={`group relative rounded-3xl bg-neutral-950 border overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-10px_rgba(54,3,2,0.95)] flex flex-col ${
                      isSelected ? 'border-[#a85250] ring-2 ring-[#520504]' : 'border-[#360302] hover:border-[#520504]'
                    } ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
                  >
                    {/* Media Display Container */}
                    <div
                      className={`relative w-full overflow-hidden bg-black flex items-center justify-center ${
                        isWide ? 'h-72 sm:h-96' : 'h-64 sm:h-80'
                      }`}
                    >
                      {isPdf ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#360302]/60 border border-[#520504] flex items-center justify-center mb-3">
                            <FileText className="w-8 h-8 text-[#a85250]" />
                          </div>
                          <span className="text-sm font-bold text-white max-w-[240px] truncate">
                            {project.fileName || project.title}
                          </span>
                          <span className="text-xs text-neutral-400 mt-1">PDF Case Portfolio</span>
                        </div>
                      ) : isVideo ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                          <video
                            src={project.image}
                            className="w-full h-full object-cover pointer-events-none"
                            muted
                            loop
                            autoPlay
                            playsInline
                          />
                          <div className="absolute top-4 right-14 z-10 w-7 h-7 rounded-full bg-black/70 border border-[#360302] flex items-center justify-center text-white">
                            <VideoIcon className="w-3.5 h-3.5 text-[#a85250]" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}

                      {/* Deep gradient overlay for crystal clear text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none opacity-90 group-hover:opacity-80 transition-opacity" />

                      {/* Top Badges & Selection Checkbox */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        {onUpdateProjects && (
                          <button
                            type="button"
                            onClick={(e) => handleToggleSelect(project.id, e)}
                            className="p-1.5 rounded-lg bg-black/80 hover:bg-[#360302] border border-[#360302] text-white transition-colors cursor-pointer shadow-md"
                            title={isSelected ? 'Deselect project' : 'Select project to delete'}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#a85250]" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-400" />
                            )}
                          </button>
                        )}
                        <span className="text-[11px] font-mono tracking-wider uppercase text-white px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#360302] shadow-md">
                          {project.category}
                        </span>
                        {project.metricBadge && (
                          <span className="text-[11px] font-mono font-medium text-white px-2.5 py-1 rounded-full bg-[#360302] backdrop-blur-md border border-[#520504] shadow-md">
                            {project.metricBadge}
                          </span>
                        )}
                      </div>

                      {/* Quick upload badge on Wrap & Roll or any project */}
                      {onUpdateProjects && project.id === 'wrap-and-roll-branding-menu' && (
                        <div className="absolute top-14 left-4 z-20">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTargetProjectIdForUpload(project.id);
                              setTimeout(() => singleProjectUploadInputRef.current?.click(), 50);
                            }}
                            className="px-3 py-1 rounded-full bg-black/90 hover:bg-[#360302] border border-[#520504] text-[10px] font-mono font-bold text-rose-200 hover:text-white transition-all flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105"
                          >
                            <Upload className="w-3 h-3 text-[#a85250]" />
                            <span>Upload Real Images</span>
                          </button>
                        </div>
                      )}

                      {/* Top Right Action: Upload Real Images, Edit, Delete & Preview Buttons */}
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                        {onUpdateProjects && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTargetProjectIdForUpload(project.id);
                                setTimeout(() => singleProjectUploadInputRef.current?.click(), 50);
                              }}
                              title="Upload your real project photos (JPG/PNG)"
                              className="p-2 rounded-xl bg-black/80 hover:bg-[#360302] text-rose-200 hover:text-white border border-[#360302] hover:border-[#520504] transition-all shadow-md cursor-pointer hover:scale-110 flex items-center gap-1"
                            >
                              <Upload className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleOpenEditProject(e, project)}
                              title="Edit this project"
                              className="p-2 rounded-xl bg-black/80 hover:bg-[#360302] text-white border border-[#360302] transition-all shadow-md cursor-pointer hover:scale-110"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteProject(project.id, e)}
                              title="Delete this project"
                              className="p-2 rounded-xl bg-black/80 hover:bg-rose-950 text-neutral-300 hover:text-rose-200 border border-[#360302] hover:border-rose-800 transition-all shadow-md cursor-pointer hover:scale-110"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white font-bold px-3 py-1.5 rounded-xl bg-[#360302] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </span>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="absolute bottom-4 left-5 right-5 z-10 pointer-events-none">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-xl sm:text-2xl font-black text-white font-display group-hover:text-rose-100 transition-colors truncate drop-shadow-md">
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-300 line-clamp-1 font-light mt-0.5 drop-shadow">
                              {project.tagline}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-black/80 border border-[#360302] flex items-center justify-center text-white shrink-0 group-hover:bg-[#360302] group-hover:border-[#520504] transition-all shadow-lg group-hover:scale-110">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Details */}
                    <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-neutral-400 border-t border-white/5 bg-neutral-950">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[#a85250] font-mono shrink-0">Deliverables:</span>
                        <span className="truncate text-neutral-300">
                          {project.services.join(' · ')}
                        </span>
                      </div>
                      <span className="font-mono text-neutral-400 shrink-0 ml-2">
                        {project.year || '2025'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 2: MASONRY GALLERY VIEW                             */}
        {/* ============================================================== */}
        {projects.length > 0 && viewMode === 'masonry' && (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {/* Quick Add in Masonry */}
            {onUpdateProjects && (
              <div
                onClick={handleOpenAddProject}
                className="break-inside-avoid rounded-3xl bg-neutral-950/70 border-2 border-dashed border-[#360302] hover:border-[#7a0c0a] p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_35px_rgba(54,3,2,0.9)] hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-bold text-white">Add New Work</h4>
                <p className="text-xs text-neutral-400 mt-1">Upload images, videos or PDFs</p>
              </div>
            )}

            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setActiveModalProject(project)}
                className="break-inside-avoid rounded-3xl bg-neutral-950 border border-[#360302] hover:border-[#520504] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(54,3,2,0.9)] hover:scale-[1.02] group"
              >
                <div className="relative overflow-hidden bg-black">
                  {project.fileType === 'video' ? (
                    <video
                      src={project.image}
                      className="w-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : project.fileType === 'pdf' ? (
                    <div className="p-10 flex flex-col items-center justify-center text-center bg-black">
                      <FileText className="w-12 h-12 text-[#a85250] mb-2" />
                      <span className="text-xs font-bold text-white truncate max-w-[200px]">
                        {project.fileName || project.title}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    {onUpdateProjects && (
                      <button
                        type="button"
                        onClick={(e) => handleToggleSelect(project.id, e)}
                        className="p-1 rounded bg-black/80 border border-[#360302] text-white"
                      >
                        {selectedIds.has(project.id) ? (
                          <CheckSquare className="w-3.5 h-3.5 text-[#a85250]" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                      </button>
                    )}
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/80 text-white border border-[#360302]">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-100 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {onUpdateProjects && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTargetProjectIdForUpload(project.id);
                              setTimeout(() => singleProjectUploadInputRef.current?.click(), 50);
                            }}
                            title="Upload real project photos"
                            className="p-1.5 rounded-lg bg-black hover:bg-[#360302] text-rose-200 hover:text-white border border-[#360302] transition-colors"
                          >
                            <Upload className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleOpenEditProject(e, project)}
                            className="p-1.5 rounded-lg bg-black hover:bg-[#360302] text-white border border-[#360302] transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProject(project.id, e)}
                            className="p-1.5 rounded-lg bg-black hover:bg-rose-950 text-neutral-300 hover:text-rose-200 border border-[#360302] transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="truncate">{project.services[0]}</span>
                    <span className="font-mono">{project.year || '2025'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 3: DETAILED CASE VIEW                               */}
        {/* ============================================================== */}
        {projects.length > 0 && viewMode === 'detailed' && (
          <motion.div layout className="space-y-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveModalProject(project)}
                className="group p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-[#360302] hover:border-[#520504] transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(54,3,2,0.85)] cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Media */}
                  <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
                    {project.fileType === 'pdf' ? (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <FileText className="w-12 h-12 text-[#a85250] mb-2" />
                        <span className="text-sm font-semibold text-white">
                          {project.fileName || 'PDF Case Asset'}
                        </span>
                      </div>
                    ) : project.fileType === 'video' ? (
                      <video
                        src={project.image}
                        className="w-full h-full object-contain pointer-events-none"
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/80 text-white border border-[#360302]">
                        {project.category}
                      </span>
                      {project.metricBadge && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/80 text-white border border-[#520504]">
                          {project.metricBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Case Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                          {project.client || 'Client Project'} · {project.year || '2025'}
                        </span>
                        <div className="flex items-center gap-2">
                          {onUpdateProjects && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTargetProjectIdForUpload(project.id);
                                  setTimeout(() => singleProjectUploadInputRef.current?.click(), 50);
                                }}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-[#360302] text-rose-200 hover:text-white transition-colors cursor-pointer"
                                title="Upload real project photos"
                              >
                                <Upload className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleOpenEditProject(e, project)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-[#360302] text-white transition-colors cursor-pointer"
                                title="Edit project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteProject(project.id, e)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-200 transition-colors cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          <div className="inline-flex items-center gap-1.5 text-xs text-white group-hover:underline">
                            <span>View Full Case</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white font-display mt-2 group-hover:text-rose-100 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-300 font-light mt-2 leading-relaxed">
                        {project.overview}
                      </p>

                      {/* Outcome Highlight */}
                      <div className="mt-4 p-3.5 rounded-xl bg-black/70 border border-[#360302] flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#360302] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                          ★
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {project.outcome}
                        </span>
                      </div>
                    </div>

                    {/* Services and Tools Footer */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] rounded-lg bg-black border border-[#360302] text-neutral-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs text-neutral-400 font-mono">
                        {project.services[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal View for Project Details */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onEditClick={
            onUpdateProjects
              ? (p) => {
                  setProjectToEdit(p);
                  setIsEditModalOpen(true);
                }
              : undefined
          }
          onUpdateProject={onUpdateProjects ? handleSaveProject : undefined}
        />

        {/* Edit / Upload Project Modal */}
        <EditProjectModal
          project={projectToEdit}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setProjectToEdit(null);
          }}
          onSave={handleSaveProject}
          onDelete={handleDeleteProject}
        />

        {/* Floating Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-black border border-[#520504] shadow-[0_10px_40px_rgba(54,3,2,0.95)] text-white text-xs font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
              <button
                onClick={() => setToastMessage(null)}
                className="text-neutral-400 hover:text-white ml-2 text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
