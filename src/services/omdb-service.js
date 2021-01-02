import config from '../config';

/* FETCH */

export const fetchOmdb = (userInput) => {
  return fetch(`${config.OMDB_API_URL}${userInput}`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};
