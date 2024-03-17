import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetch";
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import MovieCardSmall from "../MovieCardSmall";

const externalImageLoader = ({ src }: { src: string }) =>
  `${process.env.NEXT_PUBLIC_TMBD_IMAGE_URL}${src}`;

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HomeListAll = () => {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestTv, setLatestTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lM = await axiosFetch({ requestID: "latestMovie" });
        const lT = await axiosFetch({ requestID: "latestTv" });
        const pM = await axiosFetch({ requestID: "popularMovie", sortBy: "vote_average.asc" });
        const pT = await axiosFetch({ requestID: "popularTv", sortBy: "vote_average.asc" });
        setLatestMovie(lM.results);
        setLatestTv(lT.results)
        setPopularMovie(pM.results);
        setPopularTv(pT.results);
        console.log({ pM });
        setLoading(false);
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
        }{
          latestMovie?.length === 0 && dummyList.map((ele) => (
            <Skeleton height={"15rem"} count={1} width={"10rem"} />
          ))
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
        }{
          latestTv?.length === 0 && dummyList.map((ele) => (
            <Skeleton height={"15rem"} count={1} width={"10rem"} />
          ))
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
        }{
          popularMovie?.length === 0 && dummyList.map((ele) => (
            <Skeleton height={"15rem"} count={1} width={"10rem"} />
          ))
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
        }{
          popularTv?.length === 0 && dummyList.map((ele) => (
            <Skeleton height={"15rem"} count={1} width={"10rem"} />
          ))
        }
      </div>
    </div >
  );
};

export default HomeListAll;
