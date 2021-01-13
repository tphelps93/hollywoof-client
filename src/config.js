export default {
  OMDB_API_URL:
    process.env.OMDB_API_URL,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  TOKEN_KEY: 'hw-client-auth-token',
};
