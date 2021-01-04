import config from '../config';

/* FETCH */

// Timestamps
export const fetchTimestamps = () => {
  return fetch(`${config.API_BASE_URL}/timestamps`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

/* POST */

// Users
export const postUser = (name, user_name, password) => {
  return fetch(`${config.API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      user_name,
      password,
    }),
  }).then(res => {
    if (!res.ok) {
      throw new Error(
        'Something went wrong posting to "users", please try again later'
      );
    }
    return res.json();
  });
};

/* UPDATE */

/* DELETE */
