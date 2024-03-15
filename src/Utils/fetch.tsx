import axios from "axios";

interface Fetch {
  requestID: any,
  id?: number,
  language?: string,
  page?: number,
  genreKeywords?: Array<number>,
  sortBy?: string,
  year?: number,
}
export default async function axiosFetch({ requestID, id, language = "en-US", page = 1, genreKeywords, sortBy, year }: Fetch) {
  const request = requestID;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = "https://api.themoviedb.org/3";
  const requests = {
    latestMovie: `${baseURL}/movie/now_playing?language=${language}&page=${page}`, //nowPlayingMovie
    latestTv: `${baseURL}/tv/airing_today?language=${language}&page=${page}`,  // airingTodayTv
    popularMovie: `${baseURL}/movie/popular?language=${language}&page=${page}&sort_by=${sortBy}`,  // current popular, so similar to latestMovie data 
    popularTv: `${baseURL}/tv/popular?language=${language}&page=${page}&sort_by=${sortBy}`,
    topRatedMovie: `${baseURL}/movie/top_rated?language=${language}&page=${page}`,
    topRatedTv: `${baseURL}/tv/top_rated?language=${language}&page=${page}`,
    genreMovie: `${baseURL}/discover/movie?with_keywords=${genreKeywords}&language=${language}&sort_by=${sortBy}&year=${year}`,
    genreTv: `${baseURL}/discover/tv?with_keywords=${genreKeywords}&language=${language}&sort_by=${sortBy}&year=${year}`,
    onTheAirTv: `${baseURL}/tv/on_the_air?language=${language}&page=${page}`,
    trending: `${baseURL}/trending/all/week?language=${language}`,
    trendingMovie: `${baseURL}/trending/movie/week?language=${language}`,
    trendingTv: `${baseURL}/trending/tv/week?language=${language}`,

    // filters
    genresOfMovie: `${baseURL}/genre/movie/list?language=${language}`,
    genresOfTv: `${baseURL}/genre/tv/list?language=${language}`,
    countries: `${baseURL}/configuration/countries?language=${language}`,
    languages: `${baseURL}/configuration/languages`,
  };
  const final_request = requests[request];
  // console.log({ final_request });

  try {
    const response = await axios.get(final_request, { params: { api_key: API_KEY } });
    return await response.data; // Return the resolved data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (e.g., throw a custom error or return null)
    throw new Error("Failed to fetch data"); // Example error handling
  }
}