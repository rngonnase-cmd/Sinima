'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const MovieContext = createContext(null);

export function MovieProvider({ children }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const toggleLike = useCallback((id) => {
    setLikedMovies(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  }, []);

  const toggleWatchLater = useCallback((id) => {
    setWatchLaterMovies(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  }, []);

  const isLiked = useCallback((id) => likedMovies.includes(id), [likedMovies]);
  const isWatchLater = useCallback((id) => watchLaterMovies.includes(id), [watchLaterMovies]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedActor('');
    setSelectedType('');
  }, []);

  return (
    <MovieContext.Provider value={{
      likedMovies,
      watchLaterMovies,
      searchQuery,
      selectedCategory,
      selectedActor,
      selectedType,
      toggleLike,
      toggleWatchLater,
      setSearchQuery,
      setSelectedCategory,
      setSelectedActor,
      setSelectedType,
      isLiked,
      isWatchLater,
      clearFilters,
    }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) throw new Error('useMovies must be used within MovieProvider');
  return context;
}
