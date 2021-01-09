// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
  shows: [],
  barks: [],
  timestamps: [],
  totalResults: 0,
  authToken: null,
  addMovies: () => {},
  addShows: () => {},
  addTimestamps: () => {},
  iterateConfirmations: () => {},
  iterateLikes: () => {},
  iterateDislikes: () => {},
  updateMoviesTotalResults: () => {},
  updateShowsTotalResults: () => {},
  updateBarkStatus: () => {},
  resetList: () => {},
  setAuthToken: () => {},
  clearAuthToken: () => {},
});

export default DataContext;
