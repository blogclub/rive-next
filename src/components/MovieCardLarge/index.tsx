import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import axiosFetch from "@/Utils/fetch";

function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

const MovieCardLarge = ({ data, media_type }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [genreListMovie, setGenreListMovie] = useState([]);
  const [genreListTv, setGenreListTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const year = new Date(data?.release_date).getFullYear();
  const lang = data?.original_language;
  let Genres: Array<string> = [];
  data?.genre_ids?.map((ele: number) => {
    if (data?.media_type === "movie" || media_type === "movie") {
      genreListMovie?.map((val: any) => {
        if (val?.id === ele) {
          Genres.push(val?.name);
        }
      });
    } else if (data?.media_type === "tv" || media_type === "tv") {
      genreListTv?.map((val: any) => {
        if (val?.id === ele) {
          Genres.push(val?.name);
        }
      });
    }
  });
  console.log({ Genres });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gM = await axiosFetch({ requestID: "genresMovie" });
        const gT = await axiosFetch({ requestID: "genresTv" });
        setGenreListMovie(gM.genres);
        setGenreListTv(gT.genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);
  return (
    <Link
      key={data?.id}
      href={`${data?.media_type === "person" ? "/person?id=" + data?.id : "/detail?type=" + (data?.media_type || media_type) + "&id=" + data?.id}`}
      className={styles.MovieCardSmall}
      aria-label={data?.name || "poster"}
    >
      <div
        className={`${styles.img} ${data?.poster_path !== null && data?.poster_path !== undefined ? "skeleton" : null}`}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={data?.id}
            src={`${(data?.poster_path !== null && data?.poster_path !== undefined) || (data?.profile_path !== null && data?.profile_path !== undefined) || (data?.still_path !== null && data?.still_path !== undefined) ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + (data?.poster_path || data.profile_path || data?.still_path) || null : "/images/logo.svg"}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: imageLoading ? 0 : 1,
            }}
            height="100%"
            width="100%"
            exit="exit"
            className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
            onLoad={() => {
              setTimeout(() => {
                setImageLoading(false);
                setLoading(false);
              }, 100);
            }}
            loading="lazy"
            onError={(e) => console.log(e)}
            alt={data?.id || "sm"}
            // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence>
      </div>
      <div className={`${styles.metaData}`}>
        <h1>
          {data?.title || data?.name || (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Skeleton />
              <Skeleton />
            </div>
          )}
        </h1>
        <p>
          {capitalizeFirstLetter(data?.media_type || media_type)}
          {data?.vote_average ? ` • ${data?.vote_average.toFixed(1)}` : null}
          {!Number.isNaN(year) ? ` • ${year}` : null}{" "}
          {lang !== undefined ? ` • ${lang.toUpperCase()}` : null}
        </p>
        {Genres?.join(
          ", ",
        ) // || <Skeleton />
        }
      </div>
    </Link>
  );
};

export default MovieCardLarge;
