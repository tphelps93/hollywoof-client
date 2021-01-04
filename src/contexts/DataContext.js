// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
  shows: [],
  detailMovie: '',
  authToken: null,
  addMovies: () => {},
  addShows: () => {},
  handleDetail: () => {},
  resetList: () => {},
  setAuthToken: () => {},
  clearAuthToken: () => {},
});

export default DataContext;
