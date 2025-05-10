import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
  return response.data;
};
/*,,,,,,,,,,,,,,,,,,,*/



export const getMovieTrailer = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  const trailer = data.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  return trailer ? trailer.key : null;
};




