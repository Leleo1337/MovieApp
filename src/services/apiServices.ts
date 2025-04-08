const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchPopularMovies() {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
   );
   const data = await response.json();
   return data.results;
}
export async function fetchTopRatedMovies() {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
   );
   const data = await response.json();
   return data.results;
}
export async function fetchUpcommingMovies() {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
   );
   const data = await response.json();
   return data.results;
}
