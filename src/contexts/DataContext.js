// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
  shows: [],
  detailMovie: '',
  addMovies: () => {},
  addShows: () => {},
  handleDetail: () => {},
  resetList: () => {},
});

export default DataContext;
