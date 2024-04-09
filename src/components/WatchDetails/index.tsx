import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetchBackend";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
import MovieCardLarge from "../MovieCardLarge";
import { FaPlay, FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

// react-lazy-load-image-component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const WatchDetails = ({
  id,
  type,
  data,
  season,
  episode,
  setWatchDetails,
}: any) => {
  const [category, setCategory] = useState<any>(
    type === "tv" ? "episodes" : "related",
  ); // latest, trending, topRated
  const [categoryData, setCategoryData] = useState<any>();
  const [imageLoading, setImageLoading] = useState<any>(true);
  const [reviewDetail, setReviewDetail] = useState<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<any>(season);
  const [loading, setLoading] = useState(true);
  const [imagePlaceholder, setImagePlaceholder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [genreListMovie, setGenreListMovie] = useState<any>();
  const [genreListTv, setGenreListTv] = useState<any>();
  const watchDetailsPage: any = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gM = await axiosFetch({ requestID: "genresMovie" });
        const gT = await axiosFetch({ requestID: "genresTv" });
        setGenreListMovie(gM.genres);
        setGenreListTv(gT.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const CapitalCategoryType = capitalizeFirstLetter(category);
      if (category !== "overview") {
        try {
          let res;
          if (category === "episodes") {
            res = await axiosFetch({
              requestID: `${type}${CapitalCategoryType}`,
              id: id,
              season: selectedSeason,
            });
          } else if (category === "crew" || category === "guests") {
            res = await axiosFetch({
              requestID: `tvEpisodeDetail`,
              id: id,
              season: season,
              episode: episode,
              page: currentPage,
            });
          } else {
            res = await axiosFetch({
              requestID: `${type}${CapitalCategoryType}`,
              id: id,
              page: currentPage,
            });
            if (res.page > res.total_pages) {
              setCurrentPage(res.total_pages);
            }
            setTotalpages(res.total_pages > 500 ? 500 : res.total_pages);
          }
          setCategoryData(res);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [category, selectedSeason, currentPage]);

  const scrollToTop = () => {
    watchDetailsPage?.current?.scrollTo(0, 0);
  };

  return (
    <div className={styles.MetaDetailPage}>
      <p
        className={`${styles.close} btn`}
        onClick={() => setWatchDetails(false)}
      >
        x
      </p>
      <div className={styles.MetaDetails} ref={watchDetailsPage}>
        <div className={styles.category}>
          {type === "tv" ? (
            <>
              <p
                className={`${category === "episodes" ? styles.active : styles.inactive}`}
                onClick={() => setCategory("episodes")}
              >
                Episodes
              </p>
              <p
                className={`${category === "crew" ? styles.active : styles.inactive}`}
                onClick={() => setCategory("crew")}
              >
                Crew
              </p>
              <p
                className={`${category === "guests" ? styles.active : styles.inactive}`}
                onClick={() => setCategory("guests")}
              >
                Guests
              </p>
            </>
          ) : (
            <>
              <p
                className={`${category === "related" ? styles.active : styles.inactive}`}
                onClick={() => setCategory("related")}
              >
                Related
              </p>
              <p
                className={`${category === "similar" ? styles.active : styles.inactive}`}
                onClick={() => setCategory("similar")}
              >
                Similar
              </p>
            </>
          )}
        </div>

        {type === "tv" && category === "episodes" ? (
          <div className={styles.EpisodeList}>
            <select
              name="season"
              id="season"
              value={selectedSeason}
              onChange={(e: any) => setSelectedSeason(e.target.value)}
            >
              {data?.seasons?.map((ele: any, i: number) => {
                console.log({ i });
                return (
                  <option
                    key={ele.id}
                    value={ele?.season_number}
                    selected={i == 0}
                  >
                    {ele.name} {` (${ele.episode_count})`}
                  </option>
                );
              })}
            </select>
            {category === "episodes" &&
              categoryData?.episodes?.map((ele: any) => {
                return (
                  <div
                    className={`${styles.episode} ${reviewDetail === ele?.id ? styles.ReviewDetail : null} ${parseInt(selectedSeason) === parseInt(season) && parseInt(ele?.episode_number) === parseInt(episode) ? styles.highlightEpisode : null} ${new Date(ele?.air_date) >= new Date() ? styles.notAired : null}`}
                    onClick={(e) =>
                      setReviewDetail((prev: any) =>
                        prev !== ele?.id ? ele?.id : "",
                      )
                    }
                  >
                    <Link
                      href={`/watch?type=tv&id=${ele?.show_id}&season=${ele?.season_number}&episode=${ele?.episode_number}`}
                      className={styles.CardSmall}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                      >
                        {/* if rllic package is not available, then start using this code again, and comment/delete the rllic code */}
                        {/* <AnimatePresence mode="sync">
                          <motion.img
                            key={ele?.id}
                            src={`${ele?.still_path !== null && ele?.still_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.still_path : "/images/logo.svg"}`}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: imageLoading ? 0 : 1,
                            }}
                            height="100%"
                            width="100%"
                            exit="exit"
                            className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                            onLoad={() => {
                              setImageLoading(false);
                            }}
                            loading="lazy"
                            // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                          />
                        </AnimatePresence> */}

                        {/* react-lazy-load-image-component */}
                        <LazyLoadImage
                          key={ele?.id}
                          src={`${imagePlaceholder ? "/images/logo.svg" : ele?.still_path !== null && ele?.still_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.still_path : "/images/logo.svg"}`}
                          height="100%"
                          width="100%"
                          useIntersectionObserver={true}
                          effect="opacity"
                          className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                          onLoad={() => {
                            setImageLoading(false);
                          }}
                          onError={(e) => {
                            // console.log({ e });
                            setImagePlaceholder(true);
                            setImageLoading(false);
                          }}
                          loading="lazy"
                          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                        />
                      </div>
                    </Link>
                    <div className={styles.details}>
                      <h4>
                        {`EP ${ele.episode_number}`}
                        {`${ele?.name ? " : " + ele?.name : null}`}
                      </h4>
                      <p>
                        {`${ele?.vote_average >= 0 ? "• " + ele?.vote_average.toFixed(1) : null}`}{" "}
                        {ele?.runtime >= 60
                          ? `• ${Math.floor(ele?.runtime / 60)}hr ${(ele?.runtime % 60).toFixed(0)}min`
                          : null}
                        {ele?.runtime < 60
                          ? `• ${(ele?.runtime % 60).toFixed(0)}min`
                          : null}
                        {new Date(ele?.air_date) >= new Date() ? (
                          <span
                            className={styles.notAiredTag}
                          >{`• ${new Date(ele?.air_date).getDate()} ${monthNames[new Date(ele?.air_date).getMonth()]} ${new Date(ele?.air_date).getFullYear()}`}</span>
                        ) : null}
                      </p>
                      <Link
                        className={`${styles.links} btn`}
                        href={`/watch?type=tv&id=${ele?.show_id}&season=${ele?.season_number}&episode=${ele?.episode_number}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        watch <FaPlay />
                      </Link>
                      <p>{ele?.overview}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : null}

        {type === "tv" &&
        category === "episodes" &&
        categoryData?.episodes?.length === 0 ? (
          <p>No Episodes Found</p>
        ) : null}

        {type === "tv" && category === "episodes" && categoryData === undefined
          ? dummyList.map((ele) => (
              <div className={styles.episode}>
                <Skeleton height={100} className={styles.CardSmall} />
              </div>
            ))
          : null}
        <div className={styles.categoryDetails}>
          <div className={styles.casts}>
            {category === "crew" && (
              <>
                <div className={styles.header}>
                  <h4>{`S${season}E${episode}`}</h4>
                  {categoryData?.crew?.length !== 0 ? (
                    <p>crew of this episode</p>
                  ) : (
                    <p>No crew found</p>
                  )}
                </div>
                {categoryData?.crew?.map((ele: any) => (
                  <div className={styles.cast}>
                    <Link
                      href={`/person?id=${ele?.id}`}
                      className={styles.CardSmall}
                    >
                      <div
                        className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                      >
                        {/* if rllic package is not available, then start using this code again, and comment/delete the rllic code */}
                        {/* <AnimatePresence mode="sync">
                          <motion.img
                            key={ele?.id}
                            src={`${ele?.profile_path !== null && ele?.profile_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.profile_path : "/images/logo.svg"}`}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: imageLoading ? 0 : 1,
                            }}
                            height="100%"
                            width="100%"
                            exit="exit"
                            className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                            onLoad={() => {
                              setImageLoading(false);
                            }}
                            loading="lazy"
                          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                          />
                        </AnimatePresence> */}

                        {/* react-lazy-load-image-component */}
                        <LazyLoadImage
                          key={ele?.id}
                          src={`${imagePlaceholder ? "/images/logo.svg" : ele?.profile_path !== null && ele?.profile_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.profile_path : "/images/logo.svg"}`}
                          height="100%"
                          width="100%"
                          useIntersectionObserver={true}
                          effect="opacity"
                          className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                          onLoad={() => {
                            setImageLoading(false);
                          }}
                          onError={(e) => {
                            // console.log({ e });
                            setImagePlaceholder(true);
                            setImageLoading(false);
                          }}
                          loading="lazy"
                          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                        />
                      </div>
                    </Link>
                    <div className={styles.castName}>
                      <h4>{ele?.name}</h4>
                      <p>{ele?.character || ele?.job}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            {category === "crew" &&
              categoryData === undefined &&
              dummyList.map((ele) => (
                <div className={styles.cast}>
                  <Skeleton height={100} width={100} />
                  <Skeleton height={20} width={50} />
                </div>
              ))}
          </div>
          <div className={styles.casts}>
            {category === "guests" && (
              <>
                <div className={styles.header}>
                  <h4>{`S${season}E${episode}`}</h4>
                  {categoryData?.guest_stars?.length !== 0 ? (
                    <p>guest stars in this episode</p>
                  ) : (
                    <p>No notable guest star in this episode </p>
                  )}
                </div>
                {categoryData?.guest_stars?.map((ele: any) => (
                  <div className={styles.cast}>
                    <Link
                      href={`/person?id=${ele?.id}`}
                      className={styles.CardSmall}
                    >
                      <div
                        className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                      >
                        {/* if rllic package is not available, then start using this code again, and comment/delete the rllic code */}
                        {/* <AnimatePresence mode="sync">
                          <motion.img
                            key={ele?.id}
                            src={`${ele?.profile_path !== null && ele?.profile_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.profile_path : "/images/logo.svg"}`}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: imageLoading ? 0 : 1,
                            }}
                            height="100%"
                            width="100%"
                            exit="exit"
                            className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                            onLoad={() => {
                              setImageLoading(false);
                            }}
                            loading="lazy"
                          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                          />
                        </AnimatePresence> */}

                        {/* react-lazy-load-image-component */}
                        <LazyLoadImage
                          key={ele?.id}
                          src={`${imagePlaceholder ? "/images/logo.svg" : ele?.profile_path !== null && ele?.profile_path !== undefined ? process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele?.profile_path : "/images/logo.svg"}`}
                          height="100%"
                          width="100%"
                          useIntersectionObserver={true}
                          effect="opacity"
                          className={`${styles.img} ${imageLoading ? "skeleton" : null}`}
                          onLoad={() => {
                            setImageLoading(false);
                          }}
                          onError={(e) => {
                            // console.log({ e });
                            setImagePlaceholder(true);
                            setImageLoading(false);
                          }}
                          loading="lazy"
                          // style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
                        />
                      </div>
                    </Link>
                    <div className={styles.castName}>
                      <h4>{ele?.name}</h4>
                      <p>{ele?.character || ele?.job}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            {category === "guests" &&
              categoryData === undefined &&
              dummyList.map((ele) => (
                <div className={styles.cast}>
                  <Skeleton height={100} width={100} />
                  <Skeleton height={20} width={50} />
                </div>
              ))}
            {/* {category === "guests" &&
              categoryData?.guest_stars?.length === 0 && (
                <p>No notable guest star in this episode </p>
              )} */}
          </div>
          <div className={styles.MovieList}>
            <>
              {category === "related" &&
                categoryData?.results?.map((ele: any) => {
                  return (
                    <MovieCardLarge
                      data={ele}
                      media_type={type}
                      genresMovie={genreListMovie}
                      genresTv={genreListTv}
                    />
                  );
                })}
            </>
            {category === "related" && categoryData?.results?.length === 0 && (
              <p>No Recommendations</p>
            )}
            {category === "related" &&
              categoryData === undefined &&
              dummyList.map((ele) => (
                <div className={styles.MovieList}>
                  <Skeleton height={150} width={100} />
                  <div>
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={150} />
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.MovieList}>
            <>
              {category === "similar" &&
                categoryData?.results?.map((ele: any) => {
                  return (
                    <MovieCardLarge
                      data={ele}
                      media_type={type}
                      genresMovie={genreListMovie}
                      genresTv={genreListTv}
                    />
                  );
                })}
              {(category === "related" || category === "similar") &&
                categoryData?.results?.length > 0 && (
                  <ReactPaginate
                    containerClassName={styles.pagination}
                    pageClassName={styles.page_item}
                    activeClassName={styles.paginateActive}
                    onPageChange={(event) => {
                      setCurrentPage(event.selected + 1);
                      console.log({ event });
                      if (currentPage > totalpages) {
                        setCurrentPage(totalpages);
                      }
                      // window.scrollTo(0, 0);
                      scrollToTop();
                    }}
                    initialPage={0}
                    pageCount={totalpages}
                    breakLabel=" ... "
                    previousLabel={
                      <AiFillLeftCircle className={styles.paginationIcons} />
                    }
                    nextLabel={
                      <AiFillRightCircle className={styles.paginationIcons} />
                    }
                  />
                )}
            </>
            {category === "similar" && categoryData?.results?.length === 0 && (
              <p>No Recommendations</p>
            )}
            {category === "similar" &&
              categoryData === undefined &&
              dummyList.map((ele) => (
                <div className={styles.MovieList}>
                  <Skeleton height={150} width={100} />
                  <div>
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={150} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
