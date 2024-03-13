import axios from "axios";

interface Fetch {
  requestID: any,
  id?: number,
}
export default async function axiosFetch({ requestID, id }: Fetch) {
  const request = requestID;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = "https://api.themoviedb.org/3";
  const requests = {
    trending: `${baseURL}/trending/all/week`,
  };
  const final_request = requests[request];
  console.log({ final_request });

  const data = await axios.get(final_request, { params: { api_key: API_KEY } });
  return data;
}