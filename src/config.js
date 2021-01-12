export default {
  OMDB_API_URL:
    process.env.OMDB_API_URL || 'http://www.omdbapi.com/?apikey=bd085d9a&s=',
  API_BASE_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api',
  TOKEN_KEY: 'hw-client-auth-token',
};
