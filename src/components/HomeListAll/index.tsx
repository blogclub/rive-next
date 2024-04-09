import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetchBackend";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import MovieCardSmall from "../MovieCardSmall";
import { getContinueWatching } from "@/Utils/continueWatching";
import { useInView } from "react-intersection-observer";

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
  // const [continueWatching, setContinueWatching] = useState<any>();
  const [recommendations, setRecommendations] = useState([]);
  const [latestMovieRef, latestMovieInView] = useInView({
    triggerOnce: true,
  });
  const [latestTvRef, latestTvInView] = useInView({
    triggerOnce: true,
  });
  const [popularMovieRef, popularMovieInView] = useInView({
    triggerOnce: true,
  });
  const [popularTvRef, popularTvInView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const lM = await axiosFetch({ requestID: "trendingMovie" });
        // const lT = await axiosFetch({ requestID: "trendingTvDay" });
        // const pM = await axiosFetch({
        //   requestID: "popularMovie",
        //   sortBy: "vote_average.asc",
        // });
        // const pT = await axiosFetch({
        //   requestID: "trendingTv",
        //   sortBy: "vote_average.asc",
        // });
        // setLatestMovie(lM.results);
        // setLatestTv(lT.results);
        // setPopularMovie(pM.results);
        // setPopularTv(pT.results);
        // console.log({ pM });

        const continueWatching = await getContinueWatching();
        const asyncFunc = async () => {
          let arr: any[] = [];
          let i = 0;
          if (
            continueWatching &&
            (continueWatching?.tv?.length > 0 ||
              continueWatching?.movie?.length > 0)
          ) {
            for (const ele of continueWatching?.tv) {
              if (i < 5) {
                const res = await axiosFetch({
                  requestID: "tvRelated",
                  id: ele,
                });
                arr.push(res?.results);
                i++;
              }
            }
            for (const ele of continueWatching?.movie) {
              if (i < 10) {
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
          const uniqueArray: any = [];
          const usedIds = new Set();

          shuffledArray.forEach((item: any) => {
            if (!usedIds.has(item.id)) {
              uniqueArray.push(item);
              usedIds.add(item.id);
            }
          });
          // console.log({ uniqueArray });
          const shuffledUniqueArray = shuffle(uniqueArray);
          // console.log({ shuffledArray });
          setRecommendations(shuffledUniqueArray);
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lM = await axiosFetch({ requestID: "trendingMovie" });
        setLatestMovie(lM.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (latestMovieInView) fetchData();
  }, [latestMovieInView]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lT = await axiosFetch({ requestID: "trendingTvDay" });
        setLatestTv(lT.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (latestTvInView) fetchData();
  }, [latestTvInView]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pM = await axiosFetch({
          requestID: "popularMovie",
          sortBy: "vote_average.asc",
        });
        setPopularMovie(pM.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (popularMovieInView) fetchData();
  }, [popularMovieInView]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pT = await axiosFetch({
          requestID: "trendingTv",
          sortBy: "vote_average.asc",
        });
        setPopularTv(pT.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (popularTvInView) fetchData();
  }, [popularTvInView]);

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     let arr: any[] = [];
  //     let i = 0;
  //     if (
  //       continueWatching &&
  //       (continueWatching?.tv?.length > 0 ||
  //         continueWatching?.movie?.length > 0)
  //     ) {
  //       if (i < 5) {
  //         for (const ele of continueWatching?.tv) {
  //           const res = await axiosFetch({ requestID: "tvRelated", id: ele });
  //           arr.push(res?.results);
  //           i++;
  //         }
  //       }
  //       if (i < 10) {
  //         for (const ele of continueWatching?.movie) {
  //           const res = await axiosFetch({
  //             requestID: "movieRelated",
  //             id: ele,
  //           });
  //           arr.push(res?.results);
  //           i++;
  //         }
  //       }
  //     }
  //     return arr;
  //   };
  //   asyncFunc().then((arr) => {
  //     const shuffledArray = shuffle(arr.flat(Infinity));
  //     setRecommendations(shuffledArray);
  //   });
  // }, [continueWatching]);

  return (
    <div className={styles.HomeListAll}>
      {recommendations.length > 0 ? (
        <>
          <h1>Recommendation</h1>
          <div
            className={styles.HomeListSection}
            data-tooltip-id="tooltip"
            data-tooltip-content="recommendation based on what you have watched!"
          >
            {recommendations[0] !== undefined &&
              recommendations?.map((ele: any, i) => {
                return i < 20 ? (
                  <MovieCardSmall data={ele} media_type={ele?.media_type} />
                ) : null;
              })}
            {recommendations[0] === undefined &&
              dummyList.map((ele, i) => (
                <Skeleton className={styles.loading} key={i} />
              ))}
          </div>
        </>
      ) : null}
      <h1 ref={latestMovieRef}>Latest Movies</h1>
      <div className={styles.HomeListSection}>
        {latestMovie.map((ele) => {
          return <MovieCardSmall data={ele} media_type="movie" />;
        })}
        {latestMovie?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      <h1 ref={latestTvRef}>Latest TV Shows</h1>
      <div className={styles.HomeListSection}>
        {latestTv.map((ele) => {
          return <MovieCardSmall data={ele} media_type="tv" />;
        })}
        {latestTv?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      <h1 ref={popularMovieRef}>Popular Movies</h1>
      <div className={styles.HomeListSection}>
        {popularMovie.map((ele) => {
          return <MovieCardSmall data={ele} media_type="movie" />;
        })}
        {popularMovie?.length === 0 &&
          dummyList.map((ele, i) => (
            <Skeleton className={styles.loading} key={i} />
          ))}
      </div>
      <h1 ref={popularTvRef}>Popular TV Shows</h1>
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
