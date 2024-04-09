import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Detail.module.scss";
import MetaDetails from "@/components/MetaDetails";
import Carousel from "@/components/Carousel";
import axiosFetch from "@/Utils/fetchBackend";
import MoviePoster from "@/components/MoviePoster";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import {
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
  BsShare,
} from "react-icons/bs";
import { FaPlay, FaYoutube } from "react-icons/fa";
import {
  setBookmarks,
  checkBookmarks,
  removeBookmarks,
} from "@/Utils/bookmark";
import { navigatorShare } from "@/Utils/share";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";
import { toast } from "sonner";

const DetailPage = () => {
  const params = useSearchParams();
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<string | null>("");
  const [season, setSeason] = useState<string | null>();
  const [episode, setEpisode] = useState<string | null>();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState<any>({});
  const [bookmarked, setBookmarked] = useState(false);
  const [trailer, setTrailer] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setLoading(true);
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    const fetchData = async () => {
      try {
        const data = await axiosFetch({ requestID: `${type}Data`, id: id });
        setData(data);
        const Videos = await axiosFetch({ requestID: `${type}Videos`, id: id });
        setTrailer(
          Videos?.results?.find(
            (ele: any) => ele.type === "Trailer" && ele.official === true,
          ),
        );
        const response = await axiosFetch({
          requestID: `${type}Images`,
          id: id,
        });
        // setImages(response.results);
        let arr: any = [];
        response.backdrops.map((ele: any, i: number) => {
          if (i < 20)
            arr.push(process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.file_path);
        });
        // if (arr.length === 0) {
        //   response.posters.map((ele: any, i) => {
        //     if (i < 10) arr.push(process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.file_path);
        //   });
        // }
        if (arr.length === 0) arr.push("/images/logo.svg");
        setImages(arr);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
      // finally {
      //   const data = await axiosFetch({ requestID: `${type}Data`, id: id });
      //   setData(data);
      // }
    };
    fetchData();
  }, [params, id]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userID = user.uid;
        setUser(userID);
        // setIds(await getBookmarks(userID)?.movie)
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (data !== undefined && data !== null) {
        if (user !== undefined && user !== null)
          setBookmarked(
            await checkBookmarks({ userId: user, type: type, id: data.id }),
          );
        else
          setBookmarked(
            await checkBookmarks({ userId: null, type: type, id: data.id }),
          );
        // console.log(checkBookmarks({ userId: user, type: type, id: data.id }));
      }
    };
    fetch();
  }, [index, data, user]);

  const handleBookmarkAdd = () => {
    setBookmarks({ userId: user, type: type, id: data.id });
    setBookmarked(!bookmarked);
  };
  const handleBookmarkRemove = () => {
    removeBookmarks({ userId: user, type: type, id: data.id });
    setBookmarked(!bookmarked);
  };
  const handleShare = () => {
    const url = `/detail?type=${type}&id=${id}`;
    navigatorShare({ text: data.title, url: url });
  };

  return (
    // carousel
    // detail
    <div className={styles.DetailPage}>
      <div className={styles.biggerPic}>
        {
          images?.length > 0 ? (
            <Carousel
              imageArr={images}
              setIndex={setIndex}
              mobileHeight="60vh"
              desktopHeight="95vh"
              objectFit={"cover"}
            />
          ) : (
            <Skeleton className={styles.CarouselLoading} />
          ) // if no images array, then use backdrop poster
        }
        <div className={styles.curvy}></div>
        <div className={styles.curvy2}></div>
        <div className={styles.DetailBanner}>
          <div className={styles.poster}>
            <div className={styles.curvy3}></div>
            <div className={styles.curvy4}></div>
            <div
              className={styles.rating}
              data-tooltip-id="tooltip"
              data-tooltip-content="Rating"
            >
              {data?.vote_average?.toFixed(1)}
            </div>
            <MoviePoster data={data} />
          </div>
          <div className={styles.HomeHeroMeta}>
            <h1
              data-tooltip-id="tooltip"
              data-tooltip-content={data?.title || data?.name || "name"}
            >
              {data?.title || data?.name || <Skeleton />}
            </h1>
            <div className={styles.HomeHeroMetaRow2}>
              <p className={styles.type}>
                {data ? (type == "movie" ? "MOVIE" : "SHOW") : null}
              </p>
              {data ? (
                <>
                  <Link
                    className={styles.links}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Watch Online"
                    href={`${type === "movie" ? `/watch?type=${type}&id=${data?.id}` : `/watch?type=${type}&id=${data?.id}&season=1&episode=1`}`}
                  >
                    watch <FaPlay className={styles.IconsMobileNone} />
                  </Link>
                  {trailer && (
                    <Link
                      className={styles.links}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Watch Trailer"
                      href={`https://youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                    >
                      trailer <FaYoutube className={styles.IconsMobileNone} />
                    </Link>
                  )}
                  {bookmarked ? (
                    <BsFillBookmarkCheckFill
                      className={styles.HomeHeroIcons}
                      onClick={handleBookmarkRemove}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Remove from Watchlist"
                    />
                  ) : (
                    <BsBookmarkPlus
                      className={styles.HomeHeroIcons}
                      onClick={handleBookmarkAdd}
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Add to Watchlist"
                    />
                  )}
                  <BsShare
                    className={styles.HomeHeroIcons}
                    onClick={handleShare}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Share"
                  />
                </>
              ) : (
                <div>
                  <Skeleton width={200} count={1} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.biggerDetail}>
        <MetaDetails id={id} type={type} data={data} />
      </div>
    </div>
  );
};

export default DetailPage;
