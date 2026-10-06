import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, Plus, Check, Sparkles, FileText, Video, Image as ImageIcon } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { fileToDataUrl } from '../utils/storage';

interface EditProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
  onDelete?: (projectId: string) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Project>(() => {
    if (project) return { ...project };
    return {
      id: 'proj-' + Date.now(),
      title: '',
      category: 'Shopify',
      tagline: '',
      image: '',
      gallery: [],
      fileType: 'image',
      fileName: '',
      overview: '',
      challenge: '',
      solution: '',
      services: ['Shopify Development'],
      tools: ['Shopify', 'Figma'],
      outcome: '',
      metricBadge: '',
      client: '',
      year: new Date().getFullYear().toString(),
      liveUrl: ''
    };
  });

  const [newService, setNewService] = useState('');
  const [newTool, setNewTool] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (project) {
      setFormData({ ...project });
    } else {
      setFormData({
        id: 'proj-' + Date.now(),
        title: '',
        category: 'Shopify',
        tagline: '',
        image: '',
        gallery: [],
        fileType: 'image',
        fileName: '',
        overview: '',
        challenge: '',
        solution: '',
        services: ['Shopify Development'],
        tools: ['Shopify', 'Figma'],
        outcome: '',
        metricBadge: '',
        client: '',
        year: new Date().getFullYear().toString(),
        liveUrl: ''
      });
    }
  }, [project]);

  if (!isOpen) return null;

  const handleMainFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      let detectedType: 'image' | 'video' | 'pdf' = 'image';
      if (file.type.includes('pdf')) {
        detectedType = 'pdf';
      } else if (file.type.includes('video') || file.name.endsWith('.mp4')) {
        detectedType = 'video';
      }

      setFormData((prev) => ({
        ...prev,
        image: dataUrl,
        fileType: detectedType,
        fileName: file.name,
        gallery: prev.gallery.length === 0 ? [dataUrl] : prev.gallery
      }));
    } catch (err) {
      console.error('Error reading file', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await fileToDataUrl(files[i]);
        newUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...newUrls]
      }));
    } catch (err) {
      console.error('Error reading gallery images', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => {
      const newGallery = prev.gallery.filter((_, i) => i !== index);
      return {
        ...prev,
        gallery: newGallery,
        image: newGallery.length > 0 && prev.image === prev.gallery[index] ? newGallery[0] : prev.image
      };
    });
  };

  const handleAddService = () => {
    if (!newService.trim()) return;
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newService.trim()]
    }));
    setNewService('');
  };

  const handleRemoveService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleAddTool = () => {
    if (!newTool.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tools: [...prev.tools, newTool.trim()]
    }));
    setNewTool('');
  };

  const handleRemoveTool = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Please enter a project title before saving.');
      return;
    }
    setFormError(null);
    onSave(formData);
    onClose();
  };

  const categories = [
    'Shopify',
    'Graphic Design',
    'Branding',
    'Video Editing',
    'Digital Marketing',
    'Social Media'
  ] as const;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 text-white"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-[#360302] shadow-[0_25px_80px_rgba(54,3,2,0.9)] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#360302] border border-[#520504] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                {project ? 'Edit Project & Upload Assets' : 'Upload New Project'}
              </h2>
              <p className="text-xs text-neutral-300">
                Upload JPG, PNG, WEBP, PDF, or MP4 files directly without alteration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Cover File Upload Zone */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Primary Project Asset (Image, Video MP4, or PDF) *
            </label>
            <div className="relative w-full min-h-[14rem] rounded-2xl border-2 border-dashed border-[#360302] hover:border-[#520504] bg-black overflow-hidden group transition-colors">
              {formData.image ? (
                <div className="relative w-full h-56 flex items-center justify-center bg-black">
                  {formData.fileType === 'video' ? (
                    <video
                      src={formData.image}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : formData.fileType === 'pdf' ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <FileText className="w-12 h-12 text-[#a85250] mb-2" />
                      <span className="text-sm font-semibold text-white">
                        {formData.fileName || 'PDF Document Uploaded'}
                      </span>
                      <span className="text-xs text-neutral-400 mt-1">
                        Exact PDF preserved and viewable
                      </span>
                    </div>
                  ) : (
                    <img
                      src={formData.image}
                      alt="Project Preview"
                      className="w-full h-full object-contain"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                    <button
                      type="button"
                      onClick={() => mainFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#360302] hover:bg-[#480403] text-white border border-[#520504] font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-white" />
                      <span>Replace File</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => mainFileInputRef.current?.click()}
                  className="w-full h-56 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-neutral-950 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#360302]/40 border border-[#360302] flex items-center justify-center text-white mb-3 group-hover:bg-[#360302]">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">Click or drag to upload project file</span>
                  <span className="text-xs text-neutral-400 mt-1">Supports JPG, PNG, WEBP, PDF, and MP4</span>
                </div>
              )}
              <input
                ref={mainFileInputRef}
                type="file"
                accept="image/*,application/pdf,video/mp4,video/webm"
                onChange={handleMainFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Multiple Gallery Screenshots Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Additional Gallery Assets (Images or Video)
              </label>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="text-xs font-semibold text-white hover:text-rose-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#a85250]" />
                <span>Add More Images</span>
              </button>
            </div>

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*,video/mp4"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />

            {formData.gallery && formData.gallery.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {formData.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-[#360302] bg-black">
                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/80 text-rose-300 opacity-0 group-hover:opacity-100 hover:bg-rose-950 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={() => galleryInputRef.current?.click()}
                className="p-4 rounded-xl border border-white/10 bg-neutral-950/60 text-center cursor-pointer text-xs text-neutral-400 hover:text-white"
              >
                No extra gallery files yet. Click here to upload multiple screenshots.
              </div>
            )}
          </div>

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. SRIMTON Swiss Legacy Store"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-sm text-white outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Short Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. High-end e-commerce store with custom Liquid animations"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-sm text-white outline-none"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Case Study Overview
            </label>
            <textarea
              rows={3}
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="Describe what was designed, developed, or marketed..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-sm text-white outline-none resize-none"
            />
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                The Challenge
              </label>
              <textarea
                rows={2}
                value={formData.challenge || ''}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What challenge did the brand face?"
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-xs text-white outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Strategic Solution
              </label>
              <textarea
                rows={2}
                value={formData.solution || ''}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How did you solve it?"
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-xs text-white outline-none resize-none"
              />
            </div>
          </div>

          {/* Metrics & Client Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Metric Badge
              </label>
              <input
                type="text"
                value={formData.metricBadge || ''}
                onChange={(e) => setFormData({ ...formData, metricBadge: e.target.value })}
                placeholder="e.g. +48% Conversion"
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Client / Brand Name
              </label>
              <input
                type="text"
                value={formData.client || ''}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. SRIMTON Horology"
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                Live URL / Demo Link
              </label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Outcome */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
              Project Outcome & Impact
            </label>
            <input
              type="text"
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="e.g. +48% Mobile Conversion Rate and over $85,000 debut sales"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#360302] focus:border-[#520504] text-sm text-white outline-none"
            />
          </div>

          {/* Deliverables / Services */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Deliverables / Services
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.services.map((srv, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-[#360302] text-xs text-neutral-200"
                >
                  <span>{srv}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="text-neutral-400 hover:text-rose-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
                placeholder="Add service (e.g. Liquid Theme Development)"
                className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-[#360302] text-xs text-white outline-none focus:border-[#520504]"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-3.5 py-1.5 rounded-lg bg-[#360302] text-xs text-white border border-[#520504] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tools & Software */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Tools & Software
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-[#360302] text-xs text-neutral-200"
                >
                  <span>{tool}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTool(idx)}
                    className="text-neutral-400 hover:text-rose-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTool();
                  }
                }}
                placeholder="Add tool (e.g. Shopify, Figma, Premiere Pro)"
                className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-[#360302] text-xs text-white outline-none focus:border-[#520504]"
              />
              <button
                type="button"
                onClick={handleAddTool}
                className="px-3.5 py-1.5 rounded-lg bg-[#360302] text-xs text-white border border-[#520504] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {formError && (
            <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200">
              {formError}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            {project && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${formData.title}"?`)) {
                    onDelete(project.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-950/60 text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Project</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-neutral-900 text-xs text-neutral-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#360302] hover:bg-[#480403] text-white border border-[#520504] font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(54,3,2,0.9)] cursor-pointer"
              >
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
                <span>{project ? 'Save Changes' : 'Upload & Publish'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
