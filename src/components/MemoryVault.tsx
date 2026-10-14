import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Upload, Info, Heart, Pin } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { sounds } from '../utils/soundEffects';

interface MemoryVaultProps {
  photos: MemoryPhoto[];
  recipientName: string;
  onOpenPhotoManager: () => void;
}

export const MemoryVault: React.FC<MemoryVaultProps> = ({
  photos,
  recipientName,
  onOpenPhotoManager
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const featuredPhoto = photos[0];
  const galleryPhotos = photos.slice(1);

  const handleOpenLightbox = (index: number) => {
    sounds.playClick();
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    sounds.playClick();
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    setLikedPhotos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="vault" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase mb-3">
          <Camera className="w-4 h-4 text-purple-400" />
          <span>PHASE 2: THE ARCHIVES</span>
          <span aria-hidden="true">·</span>
          <span>EVIDENCE REPOSITORY</span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Our Memory Vault
        </h2>

        <p className="font-body text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          A timeless collection of unfiltered moments, rooftop talks, and proof that {recipientName} has always been the main character.
        </p>

        {/* Action & instructions banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-xl glass-panel text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Info className="w-3.5 h-3.5" /> Pro-Tip:
          </span>
          <span>Click any memory to inspect. You can also customize or upload your real photos directly.</span>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenPhotoManager();
            }}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3 h-3" /> Add / Replace Photos
          </button>
        </div>
      </div>

      {/* Featured Hero Photo (Special Highlight) */}
      {featuredPhoto && (
        <div className="mb-16 max-w-4xl mx-auto">
          <div
            onClick={() => handleOpenLightbox(0)}
            className="group relative rounded-3xl glass-panel-elevated p-4 sm:p-6 cursor-pointer overflow-hidden border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-2xl"
          >
            {/* Subtle tape accent on top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/10 backdrop-blur-sm -rotate-1 border border-white/15 rounded-sm z-20 pointer-events-none" />

            <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 mb-4">
              <img
                src={featuredPhoto.url}
                alt={featuredPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-amber-400/30 text-[11px] font-mono text-amber-300 uppercase tracking-wider">
                FEATURED MASTERPIECE
              </div>

              {/* Expand icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="font-outfit text-lg sm:text-xl font-bold text-white mb-1">
                  {featuredPhoto.caption}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                  <span>{featuredPhoto.date}</span>
                  {featuredPhoto.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{featuredPhoto.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Polaroid Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {galleryPhotos.map((photo, i) => {
          const actualIndex = i + 1;
          const isLiked = !!likedPhotos[photo.id];
          const rotation = photo.rotation || ((i % 3) - 1) * 2;

          return (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(actualIndex)}
              style={{
                transform: `rotate(${rotation}deg)`
              }}
              className="group relative bg-[#0e0d1a] border border-white/10 hover:border-purple-400/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Pushpin / Tape graphic */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Pin className="w-5 h-5 text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] fill-amber-400" />
              </div>

              {/* Polaroid Image Frame */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-3 border border-white/5">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* View Icon */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Polaroid Bottom Notes Area */}
              <div className="pt-1">
                <p className="font-body text-xs sm:text-sm text-slate-200 line-clamp-2 mb-2 leading-relaxed font-medium">
                  {photo.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/5 pt-2">
                  <span>{photo.date}</span>
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Like memory"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-500'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Viewer */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            aria-label="Close photo viewer"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl w-full max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden max-h-[70vh] bg-black/60 shadow-2xl border border-white/10">
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].caption}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Lightbox Caption bar */}
            <div className="mt-4 text-center max-w-xl">
              <p className="text-white text-base sm:text-lg font-outfit font-semibold mb-1">
                {photos[selectedPhotoIndex].caption}
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-mono">
                <span>Memory {selectedPhotoIndex + 1} of {photos.length}</span>
                <span aria-hidden="true">·</span>
                <span>{photos[selectedPhotoIndex].date}</span>
                {photos[selectedPhotoIndex].location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{photos[selectedPhotoIndex].location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
