import config from '../config';

/* FETCH */

export const fetchOmdb = userInput => {
  return fetch(`${config.OMDB_API_URL}${userInput}&type=movie`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchShows = userInput => {
  return fetch(`${config.OMDB_API_URL}${userInput}&type=series`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};
