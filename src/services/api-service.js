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

export const fetchBarks = () => {
  return fetch(`${config.API_BASE_URL}/barks`).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

/* POST */

// Timestamps
export const postTimestamps = (
  timestamp,
  comment,
  volume,
  confirmations,
  media_id,
  userid
) => {
  return fetch(`${config.API_BASE_URL}/timestamps`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
    body: JSON.stringify({
      timestamp,
      comment,
      volume,
      confirmations,
      media_id,
      userid,
    }),
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

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
export const updateConfirmationCount = (ts_id, confirmations, userid) => {
  return fetch(`${config.API_BASE_URL}/timestamps/${ts_id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
    body: JSON.stringify({
      ts_id,
      confirmations,
      userid,
    }),
  }).then(res => {
    if (!res.ok) {
      throw new Error(
        `Something went wrong updating ${ts_id}, please try again later.`
      );
    }
  });
};
/* DELETE */
