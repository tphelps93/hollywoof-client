// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
  shows: [],
  addMovies: () => {},
  addShows: () => {},
  resetList: () => {},
});

export default DataContext;
