import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetchBackend";
import "react-loading-skeleton/dist/skeleton.css";
// import Image from "next/image";
import Carousel from "../Carousel";
import Link from "next/link";
import {
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
  BsShare,
} from "react-icons/bs";
import { FaInfo, FaPlay } from "react-icons/fa";
import {
  setBookmarks,
  checkBookmarks,
  removeBookmarks,
  getBookmarks,
} from "@/Utils/bookmark";
import { navigatorShare } from "@/Utils/share";
import Skeleton from "react-loading-skeleton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";

const externalImageLoader = ({ src }: { src: string }) =>
  `${process.env.NEXT_PUBLIC_TMBD_IMAGE_URL}${src}`;

const HomeHero = () => {
  const [data, setData] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [index, setIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<any>(false);
  const [user, setUser] = useState<any>();
  const [bookmarkList, setBookmarkList] = useState<any>();
  console.log({ index });
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosFetch({ requestID: "trending" });
        setData(response.results);
        let arr: any = [];
        response.results.map((ele: any) => {
          arr.push(process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.backdrop_path);
        });
        if (arr.length === 0) arr.push("/images/logo.svg");
        setImages(arr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userID = user.uid;
        setUser(userID);
        // setBookmarkList(await getBookmarks({ userId: userID }));
        // setBookmarkList(getBookmarks(userID));
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    const check = async () => {
      if (data[index] !== undefined && data[index] !== null) {
        setBookmarked(
          await checkBookmarks({
            userId: user,
            type: data[index].media_type,
            id: data[index].id,
          }),
        );
      }
    };
    check();
  }, [index, data, user]);

  const handleBookmarkAdd = () => {
    console.log({ user });

    setBookmarks({
      userId: user,
      type: data[index]?.media_type,
      id: data[index].id,
    });
    setBookmarked(!bookmarked);
  };
  const handleBookmarkRemove = () => {
    removeBookmarks({
      userId: user,
      type: data[index]?.media_type,
      id: data[index].id,
    });
    setBookmarked(!bookmarked);
  };
  const handleShare = () => {
    const url = `/detail?type=${data[index].media_type}&id=${data[index].id}`;
    navigatorShare({ text: data[index].title, url: url });
  };
  return (
    <div className={styles.HomeHero}>
      <div className={styles.HomeCarousel}>
        {images.length > 0 ? (
          <Carousel
            imageArr={images}
            setIndex={setIndex}
            mobileHeight="60vh"
            desktopHeight="80vh"
            objectFit={"cover"}
          />
        ) : (
          <Skeleton className={styles.CarouselLoading} />
        )}
        <div className={styles.curvy}></div>
        <div className={styles.curvy2}></div>
        <div className={styles.curvy3}></div>
        <div className={styles.curvy4}></div>
        <div className={styles.HomeHeroMeta} key={data[index]?.id}>
          <h1
            data-tooltip-id="tooltip"
            data-tooltip-content={
              data[index]?.title || data[index]?.name || "name"
            }
          >
            {data[index]?.title || data[index]?.name || <Skeleton />}
          </h1>
          <div className={styles.HomeHeroMetaRow2}>
            <p className={styles.type}>
              {data[index] ? (
                data[index].media_type == "movie" ? (
                  "MOVIE"
                ) : (
                  "SHOW"
                )
              ) : (
                <Skeleton />
              )}
            </p>
            {data[index] ? (
              <>
                <Link
                  className={styles.links}
                  href={`${data[index]?.media_type === "movie" ? `/watch?type=${data[index]?.media_type}&id=${data[index]?.id}` : `/watch?type=${data[index]?.media_type}&id=${data[index]?.id}&season=1&episode=1`}`}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Watch Online"
                >
                  watch <FaPlay />
                </Link>
                <Link
                  className={styles.links}
                  href={`/detail?type=${data[index]?.media_type}&id=${data[index]?.id}`}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Know More"
                >
                  {" "}
                  detail{" "}
                </Link>

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
  );
};

export default HomeHero;
