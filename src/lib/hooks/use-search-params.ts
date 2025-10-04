import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export type SortOption = 'rating' | 'price-low' | 'price-high' | 'jobs';

export function useSearchParamsState() {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
    const categories = searchParams.get('category');
    return categories ? categories.split(',') : [];
  });

  const [selectedLocation, setSelectedLocation] = useState<string[]>(() => {
    const locations = searchParams.get('location');
    return locations ? locations.split(',') : [];
  });

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const priceFrom = searchParams.get('priceFrom');
    const priceTo = searchParams.get('priceTo');
    return [priceFrom ? parseInt(priceFrom, 10) : 0, priceTo ? parseInt(priceTo, 10) : 100000];
  });

  const [sortBy, setSortBy] = useState<SortOption>('rating');

  const [showVerifiedOnly, setShowVerifiedOnly] = useState(() => {
    return searchParams.get('verified') === '1';
  });

  return {
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    showVerifiedOnly,
    setShowVerifiedOnly,
  };
}
