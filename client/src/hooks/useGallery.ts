import { useState, useCallback, useMemo } from 'react';
import type { HeroPhotoLite } from '@/../../shared/types';

export function useGallery(initialPhotos: HeroPhotoLite[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | undefined>();

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialPhotos;
    }

    const query = searchQuery.toLowerCase();
    return initialPhotos.filter((photo) => photo.name.toLowerCase().includes(query));
  }, [initialPhotos, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const selectPhoto = useCallback((photoId: string) => {
    setSelectedPhotoId(photoId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPhotoId(undefined);
  }, []);

  const getSelectedPhoto = useCallback(() => {
    return initialPhotos.find((p) => p.id === selectedPhotoId);
  }, [initialPhotos, selectedPhotoId]);

  return {
    photos: initialPhotos,
    filteredPhotos,
    searchQuery,
    selectedPhotoId,
    selectedPhoto: getSelectedPhoto(),
    handleSearch,
    selectPhoto,
    clearSelection,
  };
}
