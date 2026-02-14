import { useState } from 'react';
import type { HeroPhotoLite } from '@/../../shared/types';

interface PhotoCardProps {
  photo: HeroPhotoLite;
  onClick?: (photoId: string) => void;
  isSelected?: boolean;
}

export function PhotoCard({
  photo,
  onClick,
  isSelected = false,
}: PhotoCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { firstLine, secondLine } = splitName(photo.name);

  return (
    <article
      className={`
        group relative overflow-hidden rounded-xl bg-white
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
      <div className="relative aspect-square overflow-hidden bg-amber-50 p-2">
        <img
          src={photo.imageUrl}
          alt={photo.name}
          sizes="(max-width: 767px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`
            h-full w-full object-contain
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

      <div className="flex min-h-24 items-center justify-center p-4">
        <h3 className="flex flex-col items-center justify-center text-center text-lg font-semibold leading-snug text-amber-900 sm:text-xl">
          <span>{firstLine}</span>
          <span className="text-base sm:text-lg">{secondLine}</span>
        </h3>
      </div>
    </article>
  );
}

function splitName(fullName: string): { firstLine: string; secondLine: string } {
  const tokens = fullName.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  if (tokens.length <= 2) {
    return { firstLine: fullName, secondLine: '' };
  }

  const normalize = (value: string) =>
    value
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

  const ogluIndex = tokens.findIndex((token) => normalize(token) === 'oglu');
  if (ogluIndex >= 1) {
    const firstLine = tokens.slice(0, 2).join(' ');
    const fatherName = tokens[ogluIndex - 1];
    return { firstLine, secondLine: `${fatherName} oğlu` };
  }

  return {
    firstLine: tokens.slice(0, 2).join(' '),
    secondLine: tokens.slice(2).join(' '),
  };
}
