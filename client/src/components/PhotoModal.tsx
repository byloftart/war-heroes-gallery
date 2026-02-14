import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '@/lib/translations';
import type { HeroPhotoLite } from '@/../../shared/types';

interface PhotoModalProps {
  photo: HeroPhotoLite;
  allPhotos: HeroPhotoLite[];
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
  const startX = useRef<number | null>(null);
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

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX.current;
    const delta = endX - startX.current;
    startX.current = null;

    if (Math.abs(delta) < 45) return;
    if (delta < 0 && hasNext) onNext?.();
    if (delta > 0 && hasPrevious) onPrevious?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 sm:px-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            {photo.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          aria-label={translations.photoModal.closeButton}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-14 py-6 sm:px-20">
        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-lg bg-black/55 p-3 text-white transition-colors hover:bg-black/75"
            aria-label={translations.photoModal.previousButton}
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
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-lg bg-black/55 p-3 text-white transition-colors hover:bg-black/75"
            aria-label={translations.photoModal.nextButton}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      <div className="border-t border-white/10 bg-black/40 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs text-gray-400">
            {currentIndex + 1} / {allPhotos.length}
          </p>
        </div>
      </div>
    </div>
  );
}
