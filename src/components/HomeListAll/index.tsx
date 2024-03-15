import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetch";
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import MovieCardSmall from "../MovieCardSmall";

const externalImageLoader = ({ src }: { src: string }) =>
  `${process.env.NEXT_PUBLIC_TMBD_IMAGE_URL}${src}`;

const HomeListAll = () => {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestTv, setLatestTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lM = await axiosFetch({ requestID: "latestMovie" });
        const lT = await axiosFetch({ requestID: "latestTv" });
        const pM = await axiosFetch({ requestID: "popularMovie", sortBy: "vote_average.asc" });
        const pT = await axiosFetch({ requestID: "popularTv", sortBy: "vote_average.asc" });
        setLatestMovie(lM.results);
        setLatestTv(lT.results)
        setPopularMovie(pM.results);
        setPopularTv(pT.results);
        console.log({ pM });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.HomeListAll} >
      <h1>Latest Movies</h1>
      <div className={styles.HomeListSection} >
        {
          latestMovie.map((ele) => {
            return (
              <MovieCardSmall data={ele} media_type="movie" />
            )
          })
        }
      </div>
      <h1>Latest TV Shows</h1>
      <div className={styles.HomeListSection} >
        {
          latestTv.map((ele) => {
            return (
              <MovieCardSmall data={ele} media_type="tv" />
            )
          })
        }
      </div>
      <h1>Popular Movies</h1>
      <div className={styles.HomeListSection} >
        {
          popularMovie.map((ele) => {
            return (
              <MovieCardSmall data={ele} media_type="tv" />
            )
          })
        }
      </div>
      <h1>Popular TV Shows</h1>
      <div className={styles.HomeListSection} >
        {
          popularTv.map((ele) => {
            return (
              <MovieCardSmall data={ele} media_type="tv" />
            )
          })
        }
      </div>
    </div >
  );
};

export default HomeListAll;
