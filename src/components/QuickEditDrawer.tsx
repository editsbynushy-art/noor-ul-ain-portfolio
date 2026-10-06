import React, { useRef, useState } from 'react';
import { X, RotateCcw, Check, Sliders, Upload, Download, Camera } from 'lucide-react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';
import { fileToDataUrl, exportPortfolioToFile } from '../utils/storage';

interface QuickEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: typeof INITIAL_PORTFOLIO_DATA;
  onUpdate: (newData: typeof INITIAL_PORTFOLIO_DATA) => void;
  onReset: () => void;
}

export const QuickEditDrawer: React.FC<QuickEditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdate,
  onReset
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      onUpdate({
        ...data,
        profile: {
          ...data.profile,
          avatar: dataUrl
        }
      });
      setNotification('Profile photo updated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Failed reading photo', err);
    }
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed && parsed.profile && parsed.projects) {
        onUpdate(parsed);
        setNotification('Portfolio data successfully restored!');
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification('Invalid portfolio JSON file format');
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err) {
      console.error('Failed parsing JSON file', err);
      setNotification('Error importing JSON file.');
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-neutral-950 border-l border-white/10 p-6 overflow-y-auto text-left shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="text-lg font-bold text-white font-display">
                Portfolio Studio & Uploader
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-neutral-400 mt-2 mb-6 font-light">
            Everything is editable. Upload your photos, modify headlines, or export/import your complete site data.
          </p>

          {notification && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#360302] border border-[#520504] text-xs text-white flex items-center justify-between shadow-lg">
              <span>{notification}</span>
              <button
                onClick={() => setNotification(null)}
                className="text-neutral-400 hover:text-white ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <div className="space-y-5">
            {/* Hero Profile Photo Upload */}
            <div className="p-4 rounded-2xl bg-black border border-white/10">
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                Hero Portrait Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                  <img
                    src={data.profile.avatar}
                    alt="Current Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <span className="text-[11px] text-neutral-400">
                    JPG, PNG, or WEBP supported
                  </span>
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={data.profile.name}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    profile: { ...data.profile, name: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Headline Subtitle */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Hero Subtitle
              </label>
              <input
                type="text"
                value={data.profile.roleTagline}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    profile: { ...data.profile, roleTagline: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Experience Metric */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Experience Metric
              </label>
              <input
                type="text"
                value={data.profile.experienceYears}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    profile: { ...data.profile, experienceYears: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Hero Bio Description */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Hero Bio Description
              </label>
              <textarea
                rows={3}
                value={data.profile.heroDescription}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    profile: { ...data.profile, heroDescription: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={data.profile.email}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    profile: { ...data.profile, email: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Backup & Restore Files Zone */}
            <div className="pt-4 border-t border-white/10">
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                Export / Import Portfolio Files
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => exportPortfolioToFile(data)}
                  className="px-3 py-2 rounded-xl bg-black border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup</span>
                </button>

                <button
                  type="button"
                  onClick={() => jsonFileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl bg-black border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Backup</span>
                </button>

                <input
                  ref={jsonFileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (confirm('Reset portfolio data back to defaults?')) {
                onReset();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-black bg-[var(--accent)] hover:brightness-110 rounded-lg transition-colors shadow-md cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
