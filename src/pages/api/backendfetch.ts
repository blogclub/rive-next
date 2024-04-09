import type { NextApiRequest, NextApiResponse } from "next";
import axiosFetch from "@/Utils/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
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
  // console.log({result});
  res?.status(200)?.json(result);
  // res.status(200).json({ name: "John Doe" });
}
