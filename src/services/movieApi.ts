import axios from "axios";
import { Movie } from "../types/movie";

// read env
import Constants from "expo-constants";

const TMDB_API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;

// debug info
console.log("Constants.expoConfig:", Constants.expoConfig);
console.log("Constants.expoConfig?.extra:", Constants.expoConfig?.extra);
console.log("TMDB_API_KEY:", TMDB_API_KEY);
console.log("TMDB_API_KEY type:", typeof TMDB_API_KEY);

// Check if API key exists
if (!TMDB_API_KEY) {
  throw new Error(
    "TMDB_API_KEY environment variable is not set. Please check your .env file and app.config.js configuration."
  );
}

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetail = async (id: number): Promise<Movie> => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: TMDB_API_KEY, language: "en-US" },
  });
  return response.data;
};
