export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFmMjlkNjM4NDFmN2Q2NTI0NmQ5ZGY4MWRkOWJlYiIsIm5iZiI6MTc0MTUwODMzNy43ODgsInN1YiI6IjY3Y2Q0ZWYxMmJkMjFjODA2ZjEwZDgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.197CoizJJ_j86EcjwRv4ZFl_zbWbeh0ycAQEtj89VDQ",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFmMjlkNjM4NDFmN2Q2NTI0NmQ5ZGY4MWRkOWJlYiIsIm5iZiI6MTc0MTUwODMzNy43ODgsInN1YiI6IjY3Y2Q0ZWYxMmJkMjFjODA2ZjEwZDgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.197CoizJJ_j86EcjwRv4ZFl_zbWbeh0ycAQEtj89VDQ`,
    },
  };
  
  export const fetchMovies = async ({ query }: { query?: string }) => {
    try {   
    //   if (!TMDB_CONFIG.API_KEY) {
    //     throw new Error("Missing TMDB API key. Check environment variables.");
    //   }
  
      const endpoint = query?.trim()
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query.trim())}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
      console.log("Fetching movies from:", endpoint);
  
      const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.results || [];
    } catch (error:any) {
      console.error("Error fetching movies:", error.message);
      return [];
    }
  };
  
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};