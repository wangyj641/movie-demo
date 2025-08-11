import axios from "axios";
import { Movie } from "../types/movie";

// 使用 expo-constants 读取环境变量
import Constants from "expo-constants";

const TMDB_API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;

// 调试：检查环境变量是否被正确读取
console.log("Constants.expoConfig:", Constants.expoConfig);
console.log("Constants.expoConfig?.extra:", Constants.expoConfig?.extra);
console.log("TMDB_API_KEY:", TMDB_API_KEY);
console.log("TMDB_API_KEY type:", typeof TMDB_API_KEY);

// 检查 API 密钥是否存在
if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY 环境变量未设置，请检查 .env 文件和 app.config.js 配置");
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
