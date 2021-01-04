import config from '../config';
import TokenService from '../services/token-service';


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

// Timestamps
export const postTimestamps = (timestamp, comment, volume) => {
  return fetch(`${config.API_BASE_URL}/timestamps`, {
    method: 'POST',
    header: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
    body: JSON.stringify({
      timestamp,
      comment,
      volume,
    }),
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
}

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
