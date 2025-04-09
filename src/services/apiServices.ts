const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchPopularMovies(page:number) {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
   );
   const data = await response.json();
   return data.results;
}
export async function fetchTopRatedMovies(page:number) {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
   );
   const data = await response.json();
   return data.results;
}
export async function fetchUpcommingMovies(page:number) {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
   );
   const data = await response.json();
   return data.results;
}

export async function handleQueryRequests(query: string, page:number) {
   const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
   );
   const data = await response.json();
   return data.results;
}
