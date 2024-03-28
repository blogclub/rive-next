import { useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const MoviePoster = ({ data, media_type }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Link
      href={`/detail?type=${media_type}&id=${data?.id}`}
      className={styles.MovieCardSmall}
      aria-label={data?.name || "poster"}
    >
      <div className={`${styles.img} ${imageLoading ? "skeleton" : null}`}>
        <AnimatePresence mode="sync">
          <motion.img
            key={data?.id}
            alt={data?.id || "sm"}
            src={`${data?.poster_path !== null && data?.poster_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data?.poster_path : "/images/logo.svg"}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: imageLoading ? 0 : 1,
            }}
            height="100%"
            width="100%"
            exit="exit"
            // className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
            onLoad={() => {
              setImageLoading(false);
            }}
            loading="lazy"
            // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default MoviePoster;
