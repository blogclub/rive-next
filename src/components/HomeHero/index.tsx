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
        if (arr.length === 0) arr.push("/images/logo.svg")
        setImages(arr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data[index] !== undefined && data[index] !== null) {
      setBookmarked(checkBookmarks({ type: data[index].media_type, id: data[index].id }));
      console.log(checkBookmarks({ type: data[index].media_type, id: data[index].id }));
    }
  }, [index, data]);

  const handleBookmarkAdd = () => {
    setBookmarks({ type: data[index]?.media_type, id: data[index].id });
    setBookmarked(!bookmarked);
  }
  const handleBookmarkRemove = () => {
    removeBookmarks({ type: data[index]?.media_type, id: data[index].id });
    setBookmarked(!bookmarked);
  }
  const handleShare = () => {
    const url = `/detail?type=${data[index].media_type}&id=${data[index].id}`;
    navigatorShare({ text: data[index].title, url: url });
  }
  return (
    <div className={styles.HomeHero} >
      {images.length > 0 ? <Carousel imageArr={images} setIndex={setIndex} mobileHeight="60vh" desktopHeight="80vh" objectFit={"cover"} /> : null}
      <div className={styles.HomeHeroMeta} key={data[index]?.id}>
        <h1>{data[index]?.title || data[index]?.name || <Skeleton />}</h1>
        <div className={styles.HomeHeroMetaRow2} >
          <p className={styles.type}>{data[index] ? (data[index].media_type == "movie" ? "MOVIE" : "SHOW") : <Skeleton />}</p>
          {data[index] ?
            <>
              <Link className={styles.links} href={`/watch?type=${data[index]?.media_type}&id=${data[index]?.id}`}>watch <FaPlay /></Link>
              <Link className={styles.links} href={`/detail?type=${data[index]?.media_type}&id=${data[index]?.id}`}> detail  </Link>

              {
                bookmarked ? <BsFillBookmarkCheckFill className={styles.HomeHeroIcons} onClick={handleBookmarkRemove} /> : <BsBookmarkPlus className={styles.HomeHeroIcons} onClick={handleBookmarkAdd} />
              }
              <BsShare className={styles.HomeHeroIcons} onClick={handleShare} />
            </>
            : <div ><Skeleton width={200} count={1} /></div>
          }
        </div>
      </div>
    </div >
  );
};

export default HomeHero;
