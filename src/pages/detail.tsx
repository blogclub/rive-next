import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Detail.module.scss";
import MetaDetails from "@/components/MetaDetails";
import Carousel from "@/components/Carousel";
import axiosFetch from "@/Utils/fetch";
import MoviePoster from "@/components/MoviePoster";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { BsBookmarkPlus, BsFillBookmarkCheckFill, BsShare } from "react-icons/bs";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { setBookmarks, checkBookmarks, removeBookmarks } from "@/Utils/bookmark";
import { navigatorShare } from "@/Utils/share";

const DetailPage = () => {
  const params = useSearchParams();
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<string | null>("");
  const [season, setSeason] = useState<string | null>();
  const [episode, setEpisode] = useState<string | null>();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({});
  const [bookmarked, setBookmarked] = useState(false);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    const fetchData = async () => {
      try {
        const data = await axiosFetch({ requestID: `${type}Data`, id: id });
        setData(data);
        const Videos = await axiosFetch({ requestID: `${type}Videos`, id: id });
        setTrailer(Videos.results.find((ele: any) => ele.type === "Trailer" && ele.official === true));
        const response = await axiosFetch({ requestID: `${type}Images`, id: id });
        // setImages(response.results);
        let arr: any = [];
        response.backdrops.map((ele: any, i) => {
          if (i < 10) arr.push(process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + ele.file_path);
        });
        setImages(arr);
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
    setBookmarked(checkBookmarks({ id: data?.id }));
    console.log({ index });
  }, []);

  const handleBookmarkAdd = () => {
    setBookmarks({ id: data.id });
    setBookmarked(!bookmarked);
  }
  const handleBookmarkRemove = () => {
    removeBookmarks({ id: data.id });
    setBookmarked(!bookmarked);
  }
  const handleShare = () => {
    const url=`/detail?type=${type}&id=${id}`;
    navigatorShare({ text: data.title, url: url });
  }

  return (
    // carousel
    // detail
    <div className={styles.DetailPage} >
      <div className={styles.biggerPic}>
        {images?.length > 0 ? <Carousel imageArr={images} setIndex={setIndex} mobileHeight="60vh" desktopHeight="95vh" /> : null // if no images array, then use backdrop poster
        }
        <div className={styles.DetailBanner}>
          <div className={styles.poster}>
            <div className={styles.rating}>{data?.vote_average?.toFixed(1)}</div>
            <MoviePoster data={data} />
          </div>
          <div className={styles.HomeHeroMeta} key={data?.id}>
            <h1>{data?.title || data?.name || <Skeleton />}</h1>
            <div className={styles.HomeHeroMetaRow2} >
              <p className={styles.type}>{data ? (type == "movie" ? "MOVIE" : "SHOW") : <Skeleton />}</p>
              {data ?
                <>
                  <Link className={styles.links} href={`/watch?type=${type}&id=${data?.id}`}>watch <FaPlay /></Link>
                  {
                    trailer && <Link className={styles.links} href={`https://youtube.com/watch?v=${trailer.key}`} target="_blank">trailer <FaYoutube /></Link>
                  }
                  {
                    bookmarked ? <BsFillBookmarkCheckFill onClick={handleBookmarkRemove} /> : <BsBookmarkPlus onClick={handleBookmarkAdd} />
                  }
                  <BsShare onClick={handleShare} />
                </>
                : <div ><Skeleton width={200} count={1} /></div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles.biggerDetail}>
        <MetaDetails id={id} type={type} data={data} />
      </div>
    </div>
  )
};

export default DetailPage;