/**
 * PhotoModal Component
 * Full-screen photo viewer with navigation
 * Living Memorial Theme - Respectful, immersive experience
 */

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroPhoto } from '@/../../shared/types';

interface PhotoModalProps {
  photo: HeroPhoto;
  allPhotos: HeroPhoto[];
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function PhotoModal({
  photo,
  allPhotos,
  onClose,
  onNext,
  onPrevious,
}: PhotoModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const hasNext = currentIndex < allPhotos.length - 1;
  const hasPrevious = currentIndex > 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext?.();
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 sm:px-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            {photo.name}
          </h2>
          {photo.rank && (
            <p className="text-sm text-amber-200">{photo.rank}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Image */}
        <div className="relative max-h-full max-w-full">
          <img
            src={photo.imageUrl}
            alt={photo.name}
            className={`
              max-h-[70vh] max-w-full object-contain
              transition-opacity duration-300
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Footer with Info */}
      <div className="border-t border-white/10 bg-black/40 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-2">
          {photo.description && (
            <p className="text-sm text-gray-300">{photo.description}</p>
          )}

          {(photo.unit || photo.birthYear || photo.deathYear) && (
            <div className="flex flex-wrap gap-4 text-sm text-amber-200">
              {photo.unit && <span>{photo.unit}</span>}
              {(photo.birthYear || photo.deathYear) && (
                <span>
                  {photo.birthYear && `${photo.birthYear}`}
                  {photo.birthYear && photo.deathYear && ' – '}
                  {photo.deathYear && `${photo.deathYear}`}
                </span>
              )}
            </div>
          )}

          {/* Counter */}
          <p className="text-xs text-gray-400">
            {currentIndex + 1} / {allPhotos.length}
          </p>
        </div>
      </div>
    </div>
  );
}
