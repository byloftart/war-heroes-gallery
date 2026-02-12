/**
 * PhotoCard Component
 * Displays a single hero photo with name and metadata
 * Living Memorial Theme - Warm, respectful presentation
 */

import { useState } from 'react';
import type { HeroPhoto } from '@/../../shared/types';

interface PhotoCardProps {
  photo: HeroPhoto;
  onClick?: (photoId: string) => void;
  isSelected?: boolean;
}

export function PhotoCard({
  photo,
  onClick,
  isSelected = false,
}: PhotoCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-lg bg-white
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-amber-900/20
        ${isSelected ? 'ring-2 ring-amber-700' : ''}
      `}
      onClick={() => onClick?.(photo.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(photo.id);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={photo.imageUrl}
          alt={photo.name}
          className={`
            h-full w-full object-cover
            transition-transform duration-500 ease-out
            ${isImageLoaded ? 'scale-100' : 'scale-105'}
            group-hover:scale-105
          `}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />

        {/* Soft overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Info Section */}
      <div className="space-y-2 p-4">
        <h3 className="text-base font-semibold text-amber-900 line-clamp-2">
          {photo.name}
        </h3>

        {/* Metadata */}
        {(photo.rank || photo.unit) && (
          <div className="space-y-1 text-sm text-amber-700">
            {photo.rank && <p>{photo.rank}</p>}
            {photo.unit && <p className="text-xs text-amber-600">{photo.unit}</p>}
          </div>
        )}

        {/* Years */}
        {(photo.birthYear || photo.deathYear) && (
          <p className="text-xs text-amber-600">
            {photo.birthYear && `${photo.birthYear}`}
            {photo.birthYear && photo.deathYear && ' – '}
            {photo.deathYear && `${photo.deathYear}`}
          </p>
        )}

        {/* Tags */}
        {photo.tags && photo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {photo.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
