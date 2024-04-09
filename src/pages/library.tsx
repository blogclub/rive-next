import { useState, useEffect } from "react";
import axiosFetch from "@/Utils/fetchBackend";
import styles from "@/styles/Library.module.scss";
import MovieCardSmall from "@/components/MovieCardSmall";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { getBookmarks, removeBookmarks } from "@/Utils/bookmark";
import {
  getContinueWatching,
  removeContinueWatching,
} from "@/Utils/continueWatching";
import { BsFillBookmarkXFill } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";
import NProgress from "nprogress";
// import MoviePoster from '@/components/MoviePoster';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Library = () => {
  const [category, setCategory] = useState("watchlist"); // latest, trending, topRated
  const [subCategory, setSubCategory] = useState("movie");
  const [ids, setIds] = useState([]);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userID = user.uid;
        setUser(userID);
        // setIds(await getBookmarks(userID)?.movie)
        // setLoading(false);
      } else {
        // setLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else NProgress.done(false);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    // setData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const fetchData = async () => {
      let arr: any = [];
      try {
        for (const ele of ids) {
          const data = await axiosFetch({
            requestID: `${subCategory}Data`,
            id: ele,
          });
          if (data !== undefined) await arr.push(data);
          console.log({ arr });
          // setLoading(false);
        }
        // if (ids.length === 0 || ids === null || ids === undefined)
        //   setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
      return arr;
    };
    fetchData().then((res) => {
      console.log({ res });
      setData(res);
      setLoading(false);
    });
  }, [ids]);

  useEffect(() => {
    // fetch bookmarks
    // console.log(getBookmarks());
    const fetch = async () => {
      if (category === "watchlist") {
        if (user !== null && user !== undefined)
          getBookmarks(user).then((res: any) => {
            subCategory === "movie" ? setIds(res?.movie) : setIds(res?.tv);
          });
        else {
          subCategory === "movie"
            ? setIds(getBookmarks(null)?.movie)
            : setIds(getBookmarks(null)?.tv);
        }
      } else if (category === "continueWatching") {
        subCategory === "movie"
          ? setIds(getContinueWatching()?.movie)
          : setIds(getContinueWatching()?.tv);
      }
    };
    if (user !== null) fetch();
  }, [category, subCategory, trigger, user]);

  const handleWatchlistremove = async ({ type, id }: any) => {
    if (user !== null && user !== undefined)
      removeBookmarks({ userId: user, type: type, id: id })?.then((res): any =>
        setTimeout(() => {
          setTrigger(!trigger);
        }, 500),
      );
    else {
      removeBookmarks({ userId: null, type: type, id: id });
      setTrigger(!trigger);
    }
  };
  console.log({ ids });

  return (
    <div className={styles.MoviePage}>
      {/* if login, "hello username" */}
      {/* else, "Login to sunc to cloud" */}
      <h1>Library</h1>
      <div className={styles.category}>
        <p
          className={`${category === "watchlist" ? styles.active : styles.inactive}`}
          onClick={() => setCategory("watchlist")}
        >
          Watchlist
        </p>
        <p
          className={`${category === "continueWatching" ? styles.active : styles.inactive}`}
          onClick={() => setCategory("continueWatching")}
        >
          Continue Watching
        </p>
      </div>
      <div className={styles.category}>
        <p
          className={`${subCategory === "movie" ? styles.active : styles.inactive}`}
          onClick={() => setSubCategory("movie")}
        >
          Movie
        </p>
        <p
          className={`${subCategory === "tv" ? styles.active : styles.inactive}`}
          onClick={() => setSubCategory("tv")}
        >
          TV Shows
        </p>
      </div>

      <div className={styles.movieList}>
        {data?.length !== 0 && ids?.length !== 0 && ids !== undefined ? (
          data?.map((ele: any) => {
            if (category === "watchlist") {
              return (
                <div className={styles.watchlistItems}>
                  <MovieCardSmall data={ele} media_type={subCategory} />
                  <BsFillBookmarkXFill
                    className={styles.bookmarkIcon}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Remove from Watchlist"
                    onClick={() =>
                      handleWatchlistremove({ type: subCategory, id: ele?.id })
                    }
                  />
                </div>
              );
            } else
              return <MovieCardSmall data={ele} media_type={subCategory} />;
          })
        ) : ids?.length === 0 || ids === undefined ? (
          <p>List Is Empty</p>
        ) : (
          dummyList.map((ele) => <Skeleton className={styles.loading} />)
        )}
        {/* {
          (data?.length === 0 || ids?.length === 0) && dummyList.map((ele) => (
            <Skeleton className={styles.loading} />
          ))
        } */}
      </div>
    </div>
  );
};

export default Library;
