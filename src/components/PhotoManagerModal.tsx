import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Music, Check, Copy, Folder, AlertCircle } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { sounds } from '../utils/soundEffects';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: MemoryPhoto[];
  onUpdatePhoto: (index: number, newUrl: string, newCaption?: string) => void;
  onAddPhoto: (photo: MemoryPhoto) => void;
  onResetDefaults: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onAddPhoto,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'instructions' | 'music'>('upload');
  const [musicStatus, setMusicStatus] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const musicInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          onUpdatePhoto(index, result);
          sounds.playClick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sounds.setCustomAudio(file);
      setMusicStatus(`Loaded: "${file.name}"! Now playing as background soundtrack.`);
      sounds.playClick();
      setTimeout(() => setMusicStatus(null), 5000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-3xl glass-panel-elevated border border-purple-500/40 p-6 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <h3 className="font-outfit text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              <span>Personalize Photos & Custom Music</span>
            </h3>
            <p className="text-xs text-slate-400">
              Easily upload real photos of Shaurya or learn how to put files in the project.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons (Zero-pill discipline: segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl my-4 shrink-0">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Instant Photo Upload
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'music'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Custom Music
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Local Files Guide
          </button>
        </div>

        {/* Tab 1: Instant Photo Upload */}
        {activeTab === 'upload' && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              💡 <strong>Instant Swap:</strong> Select any photo below to replace it with a real photo from your device. Your changes will instantly display in the Memory Vault!
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-white block truncate">
                      {index === 0 ? '🌟 Hero Photo' : `Memory #${index + 1}`}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {photo.caption}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => {
                        fileInputRefs.current[index] = el;
                      }}
                      onChange={(e) => handleFileUpload(index, e)}
                      className="hidden"
                    />

                    <button
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="mt-1.5 px-2.5 py-1 rounded bg-purple-600/40 hover:bg-purple-600 text-white text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload Real Photo</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                onClick={onResetDefaults}
                className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Reset to Default Sample Photos
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Music */}
        {activeTab === 'music' && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-outfit text-base font-bold text-white">
                    Upload Your Own Song or Instrumental
                  </h4>
                  <p className="text-xs text-slate-400">
                    Select any MP3, M4A, or WAV file from your device.
                  </p>
                </div>
              </div>

              <input
                type="file"
                accept="audio/*"
                ref={musicInputRef}
                onChange={handleMusicUpload}
                className="hidden"
              />

              <button
                onClick={() => musicInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Audio File from Device</span>
              </button>

              {musicStatus && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-mono">
                  {musicStatus}
                </div>
              )}

              <div className="text-xs text-slate-400 space-y-1">
                <p>⚡ <strong>Built-in Synth:</strong> The website also includes a built-in ambient cinematic synthesizer that plays whenever music is active!</p>
                <p>🎵 <strong>Autoplay Compliant:</strong> Music starts automatically after clicking "ENTER AT YOUR OWN RISK", adhering to mobile browser policies.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Local Files Guide */}
        {activeTab === 'instructions' && (
          <div className="overflow-y-auto space-y-4 pr-1 flex-1 text-xs text-slate-300 font-body">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <h4 className="font-outfit text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Folder className="w-4 h-4" /> Adding Photos Directly to the Codebase
              </h4>
              <p>
                To keep photos permanently stored in the repository when running or deploying:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                <li>
                  Place your image files in the <code className="bg-white/10 px-1 py-0.5 rounded text-amber-200">public/photos/</code> directory (e.g. <code className="bg-white/10 px-1 py-0.5 rounded text-amber-200">public/photos/shaurya1.jpg</code>).
                </li>
                <li>
                  Open <code className="bg-white/10 px-1 py-0.5 rounded text-amber-200">src/data/birthdayConfig.ts</code>.
                </li>
                <li>
                  Change the <code className="bg-white/10 px-1 py-0.5 rounded text-purple-200">url</code> field of each item to <code className="bg-white/10 px-1 py-0.5 rounded text-purple-200">"/photos/shaurya1.jpg"</code>.
                </li>
                <li>
                  You can also customize captions, dates, and roast descriptions in that file.
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <h4 className="font-outfit text-sm font-bold text-cyan-300">
                🚀 How to Run Locally
              </h4>
              <div className="p-2.5 rounded-lg bg-black/80 font-mono text-[11px] text-slate-200">
                <code>
                  git clone &lt;repo&gt;<br />
                  npm install<br />
                  npm run dev
                </code>
              </div>
              <p>Open <code className="text-cyan-300">http://localhost:3000</code> in your browser to experience the website.</p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
