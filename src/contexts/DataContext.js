// Dependency Imports
import React from 'react';

const DataContext = React.createContext({
  search: '',
  movies: [],
//   series: [],
  addMovies: () => {},
  resetList: () => {},
//   addSeries: () => {},
});

export default DataContext;
