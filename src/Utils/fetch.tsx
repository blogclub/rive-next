import axios from "axios";

interface Fetch {
  requestID: any;
  id?: string | null;
  language?: string;
  page?: number;
  genreKeywords?: string;
  sortBy?: string;
  year?: number;
  country?: string;
  query?: string;
  season?: number;
  episode?: number;
}
export default async function axiosFetch({
  requestID,
  id,
  language = "en-US",
  page = 1,
  genreKeywords,
  sortBy,
  year,
  country,
  query,
  season,
  episode,
}: Fetch) {
  const request = requestID;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = process.env.NEXT_PUBLIC_TMDB_API;
  const randomURL = process.env.NEXT_PUBLIC_RANDOM_URL;
  const requests: any = {
    latestMovie: `${baseURL}/movie/now_playing?language=${language}&page=${page}`, //nowPlayingMovie
    latestTv: `${baseURL}/tv/airing_today?language=${language}&page=${page}`, // airingTodayTv
    popularMovie: `${baseURL}/movie/popular?language=${language}&page=${page}&sort_by=${sortBy}`, // current popular, so similar to latestMovie data
    popularTv: `${baseURL}/tv/popular?language=${language}&page=${page}&sort_by=${sortBy}`,
    topRatedMovie: `${baseURL}/movie/top_rated?language=${language}&page=${page}`,
    topRatedTv: `${baseURL}/tv/top_rated?language=${language}&page=${page}`,
    filterMovie: `${baseURL}/discover/movie?with_genres=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}`,
    filterTv: `${baseURL}/discover/tv?with_genres=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&first_air_date_year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}`,
    onTheAirTv: `${baseURL}/tv/on_the_air?language=${language}&page=${page}`,
    trending: `${baseURL}/trending/all/day?language=${language}&page=${page}`,
    trendingMovie: `${baseURL}/trending/movie/week?language=${language}&page=${page}`,
    trendingTv: `${baseURL}/trending/tv/week?language=${language}&page=${page}`,
    trendingMovieDay: `${baseURL}/trending/movie/day?language=${language}&page=${page}`,
    trendingTvDay: `${baseURL}/trending/tv/day?language=${language}&page=${page}`,
    searchMulti: `${baseURL}/search/multi?query=${query}&language=${language}&page=${page}`,
    searchKeyword: `${baseURL}/search/keyword?query=${query}&language=${language}&page=${page}`,
    searchMovie: `${baseURL}/search/movie?query=${query}&language=${language}&page=${page}`,
    searchTv: `${baseURL}/search/tv?query=${query}&language=${language}&page=${page}`,

    // for a ID
    movieData: `${baseURL}/movie/${id}?language=${language}`,
    tvData: `${baseURL}/tv/${id}?language=${language}`,
    personData: `${baseURL}/person/${id}?language=${language}`,
    movieVideos: `${baseURL}/movie/${id}/videos?language=${language}`,
    tvVideos: `${baseURL}/tv/${id}/videos?language=${language}`,
    movieImages: `${baseURL}/movie/${id}/images`,
    tvImages: `${baseURL}/tv/${id}/images`,
    personImages: `${baseURL}/person/${id}/images`,
    movieCasts: `${baseURL}/movie/${id}/credits?language=${language}`,
    tvCasts: `${baseURL}/tv/${id}/credits?language=${language}`,
    movieReviews: `${baseURL}/movie/${id}/reviews?language=${language}`,
    tvReviews: `${baseURL}/tv/${id}/reviews?language=${language}`,
    movieRelated: `${baseURL}/movie/${id}/recommendations?language=${language}&page=${page}`,
    tvRelated: `${baseURL}/tv/${id}/recommendations?language=${language}&page=${page}`,
    tvEpisodes: `${baseURL}/tv/${id}/season/${season}?language=${language}`,
    tvEpisodeDetail: `${baseURL}/tv/${id}/season/${season}/episode/${episode}?language=${language}`,
    movieSimilar: `${baseURL}/movie/${id}/similar?language=${language}&page=${page}`,
    tvSimilar: `${baseURL}/tv/${id}/similar?language=${language}&page=${page}`,

    // person
    personMovie: `${baseURL}/person/${id}/movie_credits?language=${language}&page=${page}`,
    personTv: `${baseURL}/person/${id}/tv_credits?language=${language}&page=${page}`,

    // filters
    genresMovie: `${baseURL}/genre/movie/list?language=${language}`,
    genresTv: `${baseURL}/genre/tv/list?language=${language}`,
    countries: `${baseURL}/configuration/countries?language=${language}`,
    languages: `${baseURL}/configuration/languages`,

    // random
    random: `${randomURL}`,
  };
  const final_request = requests[request];
  // console.log({ final_request });

  try {
    const response = await axios.get(final_request, {
      params: { api_key: API_KEY },
    });
    return await response.data; // Return the resolved data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (e.g., throw a custom error or return null)
    // throw new Error("Failed to fetch data"); // Example error handling
  }
}
