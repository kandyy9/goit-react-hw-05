import axios from "axios";

export const posterURL = (poster) =>
  `https://image.tmdb.org/t/p/w300/${poster}`;

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg2MjBlNDBhYTVhOWVhN2MxMzljNjk0MDA4YTcxNCIsIm5iZiI6MTcyNTc5Nzg4My45OTc5MzYsInN1YiI6IjY2ZGNjNDhlOGUzODAyY2M0OGI5MjQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8RlJTsfnto8e4KygvKSqTDaBef3KXEAV7qbnScFb1yI";

const options = {
  headers: {
    Authorization: API_KEY,
  },
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getTrendingMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US";

  const data = await fetchData(url);

  return data?.results || [];
};

export const getMovieByID = async (movieID) => {
  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
  return fetchData(url);
};

export const getReviews = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US`;

  const data = await fetchData(url);

  return data?.results || [];
};

export const getCast = async (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;

  const data = await fetchData(url);

  return data?.cast || [];
};

export const getMoviesByQuery = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;

  const data = await fetchData(url);

  // Переконайтеся, що повертається масив фільмів
  return data?.results || [];
};
