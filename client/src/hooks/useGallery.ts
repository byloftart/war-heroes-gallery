/**
 * useGallery Hook
 * Manages photo gallery state and search functionality
 * Living Memorial Theme
 */

import { useState, useCallback, useMemo } from 'react';
import type { HeroPhoto } from '@/../../shared/types';

export function useGallery(initialPhotos: HeroPhoto[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | undefined>();

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialPhotos;
    }

    const query = searchQuery.toLowerCase();
    return initialPhotos.filter((photo) => {
      const nameMatch = photo.name.toLowerCase().includes(query);
      const rankMatch = photo.rank?.toLowerCase().includes(query);
      const unitMatch = photo.unit?.toLowerCase().includes(query);
      const tagsMatch = photo.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return nameMatch || rankMatch || unitMatch || tagsMatch;
    });
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
