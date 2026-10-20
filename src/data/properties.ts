export const propertyCategories = ['all', 'cabin', 'beach', 'city', 'villa'] as const;

export type PropertyCategory = (typeof propertyCategories)[number];
export type StayCategory = Exclude<PropertyCategory, 'all'>;

export type Property = {
  id: string;
  title: string;
  location: string;
  category: StayCategory;
  nightlyPrice: number;
  rating: number;
  imageUrl: string;
  blurhash: string;
  amenities: readonly string[];
  vibes: readonly string[];
};

export const properties: readonly Property[] = [
  {
    id: 'arrowhead-modern-cabin',
    title: 'Modern Cabin with Hot Tub',
    location: 'Lake Arrowhead, California',
    category: 'cabin',
    nightlyPrice: 286,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L56R;T9F00~q_3M{RjRj00of-;of',
    amenities: ['hot tub', 'fire pit', 'pet friendly', 'fireplace'],
    vibes: ['quiet', 'cozy', 'wooded', 'romantic'],
  },
  {
    id: 'big-sur-glass-cabin',
    title: 'Glass Cabin Above the Redwoods',
    location: 'Big Sur, California',
    category: 'cabin',
    nightlyPrice: 248,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L36R5w-;00D%~qM{RjRj00of%MRj',
    amenities: ['forest view', 'fireplace', 'outdoor shower'],
    vibes: ['secluded', 'quiet', 'design forward', 'nature'],
  },
  {
    id: 'malibu-beach-house',
    title: 'Sunset Beach House',
    location: 'Malibu, California',
    category: 'beach',
    nightlyPrice: 395,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L69jH^-;00M{~qRjRjof00of%MRj',
    amenities: ['ocean view', 'beach access', 'outdoor dining'],
    vibes: ['sunny', 'airy', 'romantic', 'coastal'],
  },
  {
    id: 'miami-palm-villa',
    title: 'Palm Courtyard Villa',
    location: 'Miami, Florida',
    category: 'villa',
    nightlyPrice: 440,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L77nYk?b00t7~qRjRjj[00WB%MRj',
    amenities: ['pool', 'courtyard', 'chef kitchen', 'parking'],
    vibes: ['social', 'bright', 'luxury', 'tropical'],
  },
  {
    id: 'brooklyn-loft',
    title: 'Sunny Design Loft',
    location: 'Brooklyn, New York',
    category: 'city',
    nightlyPrice: 235,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L88W6g%M00M{~qWBRjof00of%MRj',
    amenities: ['workspace', 'fast wifi', 'walkable', 'city view'],
    vibes: ['creative', 'lively', 'modern', 'local'],
  },
  {
    id: 'scottsdale-desert-villa',
    title: 'Desert Villa with Pool',
    location: 'Scottsdale, Arizona',
    category: 'villa',
    nightlyPrice: 315,
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    blurhash: 'L8B4Y*~q00M{?bRjRjof00of%MRj',
    amenities: ['pool', 'fire pit', 'mountain view', 'parking'],
    vibes: ['peaceful', 'warm', 'spacious', 'sunny'],
  },
];

