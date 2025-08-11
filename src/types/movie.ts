export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  release_date: string;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
}
