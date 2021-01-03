import config from '../config';

/* FETCH */

export const fetchMovies = (userInput, page) => {
  return fetch(`${config.OMDB_API_URL}${userInput}&type=movie&page=${page}`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchShows = (userInput, page) => {
  return fetch(`${config.OMDB_API_URL}${userInput}&type=series&page=${page}`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};
