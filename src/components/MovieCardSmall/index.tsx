import { useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const MovieCardSmall = ({ data, media_type }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Link
      key={data?.id}
      href={`/detail?type=${media_type}&id=${data?.id}`}
      className={styles.MovieCardSmall}
      aria-label={data?.name || "poster"}
    >
      {/* <img src={process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data.poster_path} alt="" /> */}
      <div
        className={`${styles.img} ${data?.poster_path !== null && data?.poster_path !== undefined ? "skeleton" : null}`}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={data?.id}
            src={
              process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data?.poster_path || null
            }
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
              }, 500);
            }}
            loading="lazy"
            onError={(e) => console.log(e)}
            alt={data?.id || "sm"}
            // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence>
      </div>
      <p>{data?.title || data?.name}</p>
    </Link>
  );
};

export default MovieCardSmall;
