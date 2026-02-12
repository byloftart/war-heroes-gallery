/**
 * Home Page - War Heroes Photo Gallery
 * Living Memorial Theme
 * Displays historical WWII photographs with search and full-screen viewing
 */

import { useState, useEffect } from 'react';
import { PhotoCard } from '@/components/PhotoCard';
import { PhotoModal } from '@/components/PhotoModal';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { useGallery } from '@/hooks/useGallery';
import { translations } from '@/lib/translations';
import type { HeroPhoto } from '@/../../shared/types';

// Sample data - Replace with your actual photos
const SAMPLE_PHOTOS: HeroPhoto[] = [
  {
    id: '1',
    name: 'John Smith',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rank: 'Kapitan',
    unit: '101st Airborne Division',
    birthYear: 1920,
    deathYear: 1945,
    tags: ['Airborne', 'Avropa'],
  },
  {
    id: '2',
    name: 'James Wilson',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rank: 'Leytenant',
    unit: 'Sakit Donanması',
    birthYear: 1918,
    deathYear: 1944,
    tags: ['Donanma', 'Sakit Okeanı'],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rank: 'Serjant',
    unit: '3rd Army',
    birthYear: 1922,
    deathYear: 1945,
    tags: ['Ordu', 'Avropa'],
  },
  {
    id: '4',
    name: 'Michael Brown',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rank: 'Korporal',
    unit: 'Dəniz Piyadaları',
    birthYear: 1923,
    deathYear: 1943,
    tags: ['Dəniz Piyadaları', 'Sakit Okeanı'],
  },
  {
    id: '5',
    name: 'David Lee',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rank: 'Birinci Sınıf Əsgər',
    unit: '82nd Airborne Division',
    birthYear: 1925,
    deathYear: 1944,
    tags: ['Airborne', 'Avropa'],
  },
  {
    id: '6',
    name: 'Thomas Davis',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rank: 'Major',
    unit: '8th Air Force',
    birthYear: 1915,
    deathYear: 1945,
    tags: ['Hava Qüvvələri', 'Avropa'],
  },
];

export default function Home() {
  const gallery = useGallery(SAMPLE_PHOTOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayPhotos, setDisplayPhotos] = useState(gallery.filteredPhotos);

  // Update display photos when filtered photos change
  useEffect(() => {
    setDisplayPhotos(gallery.filteredPhotos);
  }, [gallery.filteredPhotos]);

  const handleSelectPhoto = (photoId: string) => {
    gallery.selectPhoto(photoId);
    setIsModalOpen(true);
  };

  const handleNextPhoto = () => {
    const currentIndex = displayPhotos.findIndex(
      (p) => p.id === gallery.selectedPhotoId
    );
    if (currentIndex < displayPhotos.length - 1) {
      const nextPhoto = displayPhotos[currentIndex + 1];
      gallery.selectPhoto(nextPhoto.id);
    }
  };

  const handlePreviousPhoto = () => {
    const currentIndex = displayPhotos.findIndex(
      (p) => p.id === gallery.selectedPhotoId
    );
    if (currentIndex > 0) {
      const prevPhoto = displayPhotos[currentIndex - 1];
      gallery.selectPhoto(prevPhoto.id);
    }
  };

  const heroBackgroundUrl =
    'https://private-us-east-1.manuscdn.com/sessionFile/nRVQmU80SmnqDYPjtJEcyp/sandbox/1W5LoRDDuuKVM95GXKcytt-img-1_1770891159000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80';

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-25">
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center py-12 sm:py-16 md:py-20"
        style={{
          backgroundImage: `url(${heroBackgroundUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">
            {translations.title}
          </h1>
          <p className="text-lg text-amber-50 drop-shadow-md">
            {translations.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar
            value={gallery.searchQuery}
            onChange={gallery.handleSearch}
            totalResults={displayPhotos.length}
          />
        </div>

        {/* Gallery Grid or Empty State */}
        {displayPhotos.length === 0 && gallery.searchQuery ? (
          <EmptyState
            searchQuery={gallery.searchQuery}
            onClear={() => gallery.handleSearch('')}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={handleSelectPhoto}
                isSelected={gallery.selectedPhotoId === photo.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {isModalOpen && gallery.selectedPhoto && (
        <PhotoModal
          photo={gallery.selectedPhoto}
          allPhotos={displayPhotos}
          onClose={() => setIsModalOpen(false)}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-white py-8 text-center text-sm text-amber-700">
        <p>{translations.footer}</p>
      </footer>
    </div>
  );
}
