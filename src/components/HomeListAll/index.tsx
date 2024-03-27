import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetch";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import MovieCardSmall from "../MovieCardSmall";
import { getContinueWatching } from "@/Utils/continueWatching";

const externalImageLoader = ({ src }: { src: string }) =>
  `${process.env.NEXT_PUBLIC_TMBD_IMAGE_URL}${src}`;

function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HomeListAll = () => {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestTv, setLatestTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [continueWatching, setContinueWatching] = useState<any>();
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lM = await axiosFetch({ requestID: "trendingMovie" });
        const lT = await axiosFetch({ requestID: "trendingTvDay" });
        const pM = await axiosFetch({
          requestID: "popularMovie",
          sortBy: "vote_average.asc",
        });
        const pT = await axiosFetch({
          requestID: "trendingTv",
          sortBy: "vote_average.asc",
        });
        setLatestMovie(lM.results);
        setLatestTv(lT.results);
        setPopularMovie(pM.results);
        setPopularTv(pT.results);
        console.log({ pM });
        setContinueWatching(await getContinueWatching());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      let arr: any[] = [];
      let i = 0;
      if (
        continueWatching &&
        (continueWatching?.tv?.length > 0 ||
          continueWatching?.movie?.length > 0)
      ) {
        if (i < 5) {
          for (const ele of continueWatching?.tv) {
            const res = await axiosFetch({ requestID: "tvRelated", id: ele });
            arr.push(res?.results);
            i++;
          }
        }
        if (i < 10) {
          for (const ele of continueWatching?.movie) {
            const res = await axiosFetch({
              requestID: "movieRelated",
              id: ele,
            });
            arr.push(res?.results);
            i++;
          }
        }
      }
      return arr;
    };
    asyncFunc().then((arr) => {
      const shuffledArray = shuffle(arr.flat(Infinity));
      setRecommendations(shuffledArray);
    });
  }, [continueWatching]);

  return (
    <div className={styles.HomeListAll}>
      <h1>Latest Movies</h1>
      <div className={styles.HomeListSection}>
        {latestMovie.map((ele) => {
          return <MovieCardSmall data={ele} media_type="movie" />;
        })}
        {latestMovie?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      <h1>Latest TV Shows</h1>
      <div className={styles.HomeListSection}>
        {latestTv.map((ele) => {
          return <MovieCardSmall data={ele} media_type="tv" />;
        })}
        {latestTv?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      {recommendations.length > 0 ? (
        <>
          <h1>Recommendation</h1>
          <div
            className={styles.HomeListSection}
            data-tooltip-id="tooltip"
            data-tooltip-content="recommendation based on what you watched!"
          >
            {recommendations?.map((ele, i) => {
              return i < 20 ? (
                <MovieCardSmall data={ele} media_type="tv" />
              ) : null;
            })}
            {recommendations?.length === 0 &&
              dummyList.map((ele, i) => (
                <Skeleton className={styles.loading} key={i} />
              ))}
          </div>
        </>
      ) : null}
      <h1>Popular Movies</h1>
      <div className={styles.HomeListSection}>
        {popularMovie.map((ele) => {
          return <MovieCardSmall data={ele} media_type="tv" />;
        })}
        {popularMovie?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      <h1>Popular TV Shows</h1>
      <div className={styles.HomeListSection}>
        {popularTv.map((ele) => {
          return <MovieCardSmall data={ele} media_type="tv" />;
        })}
        {popularTv?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
    </div>
  );
};

export default HomeListAll;
