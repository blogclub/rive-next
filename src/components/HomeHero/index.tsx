import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetch";
import 'react-loading-skeleton/dist/skeleton.css'
// import Image from "next/image";
import Carousel from "../Carousel";
import Link from "next/link";
import { BsBookmarkPlus, BsFillBookmarkCheckFill, BsShare } from "react-icons/bs";
import { FaInfo, FaPlay } from "react-icons/fa";
import { setBookmarks, checkBookmarks, removeBookmarks } from "@/Utils/bookmark";
import { navigatorShare } from "@/Utils/share";
import Skeleton from "react-loading-skeleton";

const externalImageLoader = ({ src }: { src: string }) =>
  `${process.env.NEXT_PUBLIC_TMBD_IMAGE_URL}${src}`;

const HomeHero = () => {
  const [data, setData] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [index, setIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
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
        setImages(arr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setBookmarked(checkBookmarks({ id: data[index]?.id }));
    console.log({ index });
  }, [index]);

  const handleBookmarkAdd = () => {
    setBookmarks({ id: data[index].id });
    setBookmarked(!bookmarked);
  }
  const handleBookmarkRemove = () => {
    removeBookmarks({ id: data[index].id });
    setBookmarked(!bookmarked);
  }
  const handleShare = () => {
    let url;
    if (data[index].media_type === "movie") {
      url = `detail/movie/${data[index].id}`
    } else {
      url = `detail/tv/${data[index].id}`
    }
    navigatorShare({ text: data[index].title, url: url });
  }

  if (loading) {
    return (
      <div className={styles.HomeHero} >
        loading..
      </div >
    )
  } else
    return (
      <div className={styles.HomeHero} >
        <Carousel images={images} setIndex={setIndex} />
        <div className={styles.HomeHeroMeta} key={data[index]?.id}>
          <h1>{data[index]?.title || data[index]?.name || <Skeleton />}</h1>
          <div className={styles.HomeHeroMetaRow2} >
            <p className={styles.type}>{data[index] ? (data[index].media_type == "movie" ? "MOVIE" : "SHOW") : <Skeleton />}</p>
            {data[index] ?
              <>
                <Link className={styles.links} href={data[index]?.media_type === "movie" ? `/watch?type=${data[index]?.media_type}&id=${data[index]?.id}` : `/watch?type=${data[index]?.media_type}&id=${data[index]?.id}&season=1&episode=1`}>watch <FaPlay /></Link>
                <Link className={styles.links} href={`/detail?type=${data[index]?.media_type}&id=${data[index]?.id}`}> detail  < FaInfo /> </Link>

                {
                  bookmarked ? <BsFillBookmarkCheckFill onClick={handleBookmarkRemove} /> : <BsBookmarkPlus onClick={handleBookmarkAdd} />
                }
                <BsShare onClick={handleShare} />
              </>
              : <div ><Skeleton width={200} count={1} /></div>
            }
          </div>
        </div>
      </div >
    );
};

export default HomeHero;
