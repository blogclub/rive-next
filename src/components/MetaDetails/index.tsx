import { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import axiosFetch from '@/Utils/fetch';
import Link from 'next/link';
import { motion } from "framer-motion";
import MovieCardLarge from '../MovieCardLarge';
import { FaStar } from "react-icons/fa";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MetaDetails = ({ id, type, data }: any) => {
  const [category, setCategory] = useState("overview"); // latest, trending, topRated
  const [categoryData, setCategoryData] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [reviewDetail, setReviewDetail] = useState(false);

  const genres: Array<string> = [];
  data?.genres?.map((ele: any) => {
    genres.push(ele.name);
  })
  const spoken_languages: Array<string> = [];
  data?.spoken_languages?.map((ele: any) => {
    spoken_languages.push(ele.name);
  })
  const production_countries: Array<string> = [];
  data?.production_countries?.map((ele: any) => {
    production_countries.push(ele.name);
  })
  const release_date = new Date(data?.release_date);
  const birthday = new Date(data?.birthday);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const fetchData = async () => {
      const CapitalCategoryType = capitalizeFirstLetter(category);
      if (category !== "overview") {
        try {
          let res = await axiosFetch({ requestID: `${type}${CapitalCategoryType}`, id: id });
          setCategoryData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className={styles.MetaDetailPage}>
      <div className={styles.MetaDetails}>
        <div className={styles.category}>
          {type === "tv" ? <p className={`${category === "episodes" ? styles.active : styles.inactive}`} onClick={() => setCategory("episodes")}>Episodes</p> : null}
          <p className={`${category === "overview" ? styles.active : styles.inactive}`} onClick={() => setCategory("overview")}>Overview</p>
          {
            type !== "person" ?
              <>
                <p className={`${category === "casts" ? styles.active : styles.inactive}`} onClick={() => setCategory("casts")}>Casts</p>
                <p className={`${category === "reviews" ? styles.active : styles.inactive}`} onClick={() => setCategory("reviews")}>Reviews</p>
                <p className={`${category === "related" ? styles.active : styles.inactive}`} onClick={() => setCategory("related")}>Related</p>
              </>
              :
              <>
                <p className={`${category === "movie" ? styles.active : styles.inactive}`} onClick={() => setCategory("movie")}>Movies</p>
                <p className={`${category === "tv" ? styles.active : styles.inactive}`} onClick={() => setCategory("tv")}>TV Shows</p>

              </>
          }
        </div>
        <div className={styles.categoryDetails}>
          {
            category === "overview" && type !== "person" && (
              <>
                <p>{data?.overview}</p>
                <h3>Release</h3>
                <p>{`${release_date.getDate()} ${monthNames[release_date.getMonth()]} ${release_date.getFullYear()}`}</p>
                <h3>Runtime</h3>
                <p>{`${Math.floor((data?.runtime) / 60)}hr ${((data?.runtime) % 60).toFixed(0)}min`}</p>
                <h3>Genre</h3>
                <p>{genres?.join(", ")}</p>
                <h3>Spoken Languages</h3>
                <p>{spoken_languages?.join(", ")}</p>
                <h3>Production Countries</h3>
                <p>{production_countries?.join(", ")}</p>
              </>
            )
          }
          {
            category === "overview" && type === "person" && (
              <>
                <p>{data?.biography}</p>
                <h3>Birthday</h3>
                <p>{`${birthday.getDate()} ${monthNames[birthday.getMonth()]} ${birthday.getFullYear()}`}</p>
                <h3>Place of Birth</h3>
                <p>{data?.place_of_birth}</p>
                <h3>Department</h3>
                <p>{data?.known_for_department}</p>
              </>
            )
          }
          <div className={styles.casts}>
            {
              category === "casts" && categoryData?.cast?.map((ele: any) => (
                <div className={styles.cast}>
                  <Link href={`/person?id=${ele?.id}`} className={styles.CardSmall}>
                    <div className={`${styles.img} ${imageLoading ? "skeleton" : null}`}>
                      <motion.img
                        key={ele?.id}
                        src={process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.profile_path}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: imageLoading ? 0 : 1
                        }}
                        height="100%"
                        width="100%"
                        exit="exit"
                        className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                        onLoad={() => { setImageLoading(false); }}
                        loading="lazy"
                        style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                      />
                    </div>
                  </Link>
                  <div className={styles.castName}>
                    <h4>{ele?.name}</h4>
                    <p>{ele?.character}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className={styles.MovieList}>
            {
              category === "related" && categoryData?.results?.map((ele) => {
                return (
                  <MovieCardLarge data={ele} media_type={type} />
                )
              })
            }
          </div>
          <div className={styles.ReviewList}>
            {
              category === "reviews" && categoryData?.results?.map((ele) => {
                const review_date = new Date(ele?.created_at);
                return (
                  <div className={`${styles.Review} ${reviewDetail === true ? styles.ReviewDetail : null}`} onClick={() => setReviewDetail(!reviewDetail)}>
                    <h4>{ele?.author}</h4>
                    <p>{`${review_date.getDate()} ${monthNames[review_date.getMonth()]} ${review_date.getFullYear()}`}</p>
                    <p className={styles.rating}><FaStar /> {ele?.author_details?.rating}</p>
                    <p>{ele?.content}</p>
                  </div>
                )
              })
            }
          </div>
          <div className={styles.MovieList}>
            {
              category === "movie" && categoryData?.cast?.map((ele) => {
                return (
                  <MovieCardLarge data={ele} media_type="movie" />
                )
              })
            }
          </div>
          <div className={styles.MovieList}>
            {
              category === "tv" && categoryData?.cast?.map((ele) => {
                return (
                  <MovieCardLarge data={ele} media_type="tv" />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetaDetails