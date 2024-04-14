import axios from "axios";
import { setCache, getCache } from "./clientCache";

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
  sortBy = "popularity.desc",
  year,
  country,
  query,
  season,
  episode,
}: Fetch) {
  const request = requestID;
  // const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = "/api/backendfetch";
  // const randomURL = process.env.NEXT_PUBLIC_RANDOM_URL;
  const requests: any = {
    latestMovie: `${baseURL}?requestID=latestMovie&language=${language}&page=${page}`, //nowPlayingMovie
    latestTv: `${baseURL}?requestID=latestTv&language=${language}&page=${page}`, // airingTodayTv
    popularMovie: `${baseURL}?requestID=popularMovie&language=${language}&page=${page}&sortBy=${sortBy}`, // current popular, so similar to latestMovie data
    popularTv: `${baseURL}?requestID=popularTv&language=${language}&page=${page}&sortBy=${sortBy}`,
    topRatedMovie: `${baseURL}?requestID=topRatedMovie&language=${language}&page=${page}`,
    topRatedTv: `${baseURL}?requestID=topRatedTv&language=${language}&page=${page}`,
    filterMovie: `${baseURL}?requestID=filterMovie&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,
    filterTv: `${baseURL}?requestID=filterTv&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,
    onTheAirTv: `${baseURL}?requestID=onTheAirTv&language=${language}&page=${page}`,
    trending: `${baseURL}?requestID=trending&language=${language}&page=${page}`,
    trendingMovie: `${baseURL}?requestID=trendingMovie&language=${language}&page=${page}`,
    trendingTv: `${baseURL}?requestID=trendingTv&language=${language}&page=${page}`,
    trendingMovieDay: `${baseURL}?requestID=trendingMovieDay&language=${language}&page=${page}`,
    trendingTvDay: `${baseURL}?requestID=trendingTvDay&language=${language}&page=${page}`,
    searchMulti: `${baseURL}?requestID=searchMulti&query=${query}&language=${language}&page=${page}`,
    searchKeyword: `${baseURL}?requestID=searchKeyword&query=${query}&language=${language}&page=${page}`,
    searchMovie: `${baseURL}?requestID=searchMovie&query=${query}&language=${language}&page=${page}`,
    searchTv: `${baseURL}?requestID=searchTv&query=${query}&language=${language}&page=${page}`,

    // for a ID
    movieData: `${baseURL}?id=${id}&requestID=movieData&language=${language}`,
    tvData: `${baseURL}?id=${id}&requestID=tvData&language=${language}`,
    personData: `${baseURL}?id=${id}&requestID=personData&language=${language}`,
    movieVideos: `${baseURL}?id=${id}&requestID=movieVideos&language=${language}`,
    tvVideos: `${baseURL}?id=${id}/&?requestID=tvVideos&language=${language}`,
    movieImages: `${baseURL}?id=${id}&requestID=movieImages`,
    tvImages: `${baseURL}?id=${id}&requestID=tvImages`,
    personImages: `${baseURL}?id=${id}&requestID=personImages`,
    movieCasts: `${baseURL}?id=${id}&requestID=movieCasts&language=${language}`,
    tvCasts: `${baseURL}?id=${id}&requestID=tvCasts&language=${language}`,
    movieReviews: `${baseURL}?id=${id}&requestID=movieReviews&language=${language}`,
    tvReviews: `${baseURL}?id=${id}&requestID=tvReviews&language=${language}`,
    movieRelated: `${baseURL}?id=${id}&requestID=movieRelated&language=${language}&page=${page}`,
    tvRelated: `${baseURL}?id=${id}&requestID=tvRelated&language=${language}&page=${page}`,
    tvEpisodes: `${baseURL}?id=${id}&season=${season}&requestID=tvEpisodes&language=${language}`,
    tvEpisodeDetail: `${baseURL}?id=${id}&season=${season}&episode=${episode}&requestID=tvEpisodeDetail&language=${language}`,
    movieSimilar: `${baseURL}?id=${id}&requestID=movieSimilar&language=${language}&page=${page}`,
    tvSimilar: `${baseURL}?id=${id}&requestID=tvSimilar&language=${language}&page=${page}`,

    // person
    personMovie: `${baseURL}?id=${id}&requestID=personMovie&language=${language}&page=${page}`,
    personTv: `${baseURL}?id=${id}&requestID=personTv&language=${language}&page=${page}`,

    // filters
    genresMovie: `${baseURL}?requestID=genresMovie&language=${language}`,
    genresTv: `${baseURL}?requestID=genresTv&language=${language}`,
    countries: `${baseURL}?requestID=countries&language=${language}`,
    languages: `${baseURL}?requestID=languages`,

    // collections
    collection: `${baseURL}?requestID=collection&id=${id}`,
    searchCollection: `${baseURL}?requestID=searchCollection&query=${query}&page=${page}`,
  };
  const final_request = requests[request];
  // console.log({ final_request });

  // client side caching
  const cacheKey = final_request;
  const cachedResult = getCache(cacheKey);
  if (cachedResult) {
    return await cachedResult;
  }

  try {
    const response = await axios.get(final_request);
    setCache(cacheKey, response?.data);
    return await response.data; // Return the resolved data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (e.g., throw a custom error or return null)
    // throw new Error("Failed to fetch data"); // Example error handling
  }
}
