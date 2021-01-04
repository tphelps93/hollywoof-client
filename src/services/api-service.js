import config from '../config';

/* FETCH */

/* POST */

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
