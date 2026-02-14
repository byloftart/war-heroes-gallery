import { useMemo, useState } from 'react';
import { PhotoCard } from '@/components/PhotoCard';
import { PhotoModal } from '@/components/PhotoModal';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { useGallery } from '@/hooks/useGallery';
import { translations } from '@/lib/translations';
import heroes from '@/data/heroes.json';
import type { HeroPhotoLite } from '@/../../shared/types';

export default function Home() {
  const photos = useMemo(() => heroes as HeroPhotoLite[], []);
  const gallery = useGallery(photos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPhoto = (photoId: string) => {
    gallery.selectPhoto(photoId);
    setIsModalOpen(true);
  };

  const handleNextPhoto = () => {
    const currentIndex = gallery.filteredPhotos.findIndex(
      (photo) => photo.id === gallery.selectedPhotoId
    );
    if (currentIndex < gallery.filteredPhotos.length - 1) {
      gallery.selectPhoto(gallery.filteredPhotos[currentIndex + 1].id);
    }
  };

  const handlePreviousPhoto = () => {
    const currentIndex = gallery.filteredPhotos.findIndex(
      (photo) => photo.id === gallery.selectedPhotoId
    );
    if (currentIndex > 0) {
      gallery.selectPhoto(gallery.filteredPhotos[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="border-b border-amber-100 bg-white/80 px-4 py-6 backdrop-blur">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-2xl font-bold text-amber-900 sm:text-3xl">{translations.title}</h1>
          <p className="mt-2 text-sm text-amber-700 sm:text-base">{translations.subtitle}</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8">
        <SearchBar
          value={gallery.searchQuery}
          onChange={gallery.handleSearch}
          totalResults={gallery.filteredPhotos.length}
        />

        <div className="mt-6">
          {gallery.filteredPhotos.length === 0 && gallery.searchQuery ? (
            <EmptyState searchQuery={gallery.searchQuery} onClear={() => gallery.handleSearch('')} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
              {gallery.filteredPhotos.map((photo) => (
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
      </main>

      {isModalOpen && gallery.selectedPhoto ? (
        <PhotoModal
          photo={gallery.selectedPhoto}
          allPhotos={gallery.filteredPhotos}
          onClose={() => setIsModalOpen(false)}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
        />
      ) : null}

      <footer className="border-t border-amber-100 bg-white px-4 py-5 text-center text-xs text-amber-700 sm:text-sm">
        {translations.footer}
      </footer>
    </div>
  );
}
