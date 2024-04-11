import type { NextApiRequest, NextApiResponse } from "next";
import axiosFetch from "@/Utils/fetch";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const cacheKey = JSON.stringify(req?.query);

  // Check if the result for this query is already cached
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return res.status(200).json(cachedResult);
  }
  const {
    requestID,
    id,
    language,
    page,
    genreKeywords,
    sortBy,
    year,
    country,
    query,
    season,
    episode,
  }: any = req?.query;
  // console.log({
  //   requestID,
  //   id,
  //   language,
  //   page,
  //   genreKeywords,
  //   sortBy,
  //   year,
  //   country,
  //   query,
  //   season,
  //   episode,
  // });
  const result: any = await axiosFetch({
    requestID,
    id,
    language,
    page,
    genreKeywords,
    sortBy,
    year,
    country,
    query,
    season,
    episode,
  });
  cache.set(cacheKey, result);
  console.log({ result });
  res?.status(200)?.json(result);
  // res.status(200).json({ name: "John Doe" });
}
