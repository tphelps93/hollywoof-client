// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
  shows: [],
  barks: [],
  timestamps: [],
  authToken: null,
  addMovies: () => {},
  addShows: () => {},
  addTimestamps: () => {},
  iterateConfirmations: () => {},
  resetList: () => {},
  setAuthToken: () => {},
  clearAuthToken: () => {},
});

export default DataContext;
