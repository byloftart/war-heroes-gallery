/**
 * War Heroes Photo Gallery - Shared Types
 * Living Memorial Theme
 */

export interface HeroPhoto {
  id: string;
  name: string;
  imageUrl: string;
  rank?: string;
  unit?: string;
  birthYear?: number;
  deathYear?: number;
  description?: string;
  tags?: string[];
}

export interface GalleryState {
  photos: HeroPhoto[];
  filteredPhotos: HeroPhoto[];
  searchQuery: string;
  selectedPhotoId?: string;
  isLoading: boolean;
  error?: string;
}
