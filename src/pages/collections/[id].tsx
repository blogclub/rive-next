import { useState, useEffect } from "react";
import axiosFetch from "@/Utils/fetchBackend";
// import styles from "@/components/CategorywisePage/style.module.scss";
import styles from "@/styles/Search.module.scss";
import MovieCardSmall from "@/components/MovieCardSmall";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import { useRouter } from "next/router";
// import MoviePoster from '@/components/MoviePoster';

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Collections = ({ categoryType }: any) => {
  const router = useRouter();
  const [id, setid] = useState<any>(router?.query?.id);
  const [data, setData] = useState<any>([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log({ id: router?.query?.id });
  useEffect(() => {
    setid(router?.query?.id);
  }, [router?.query?.id]);
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else NProgress.done(false);
  }, [loading]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // setData([0, 0, 0, 0, 0, 0, 0, 0, 0]); // for blink loading effect
      try {
        let data;
        data = await axiosFetch({
          requestID: `collection`,
          id: id,
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (id !== undefined && id !== null) fetchData();
  }, [id]);
  return (
    <div className={styles.MoviePage}>
      <h1>{data?.name || data?.title}</h1>
      <div className={styles.movieList}>
        {data?.parts?.map((ele: any) => {
          return (
            <MovieCardSmall
              data={ele}
              media_type={ele?.media_type || "movie"}
            />
          );
        })}
        {data?.length === 0 &&
          dummyList.map((ele) => <Skeleton className={styles.loading} />)}
        {/* {data?.total_results === 0 &&
          <h1>No Data Found</h1>} */}
      </div>
    </div>
  );
};

export default Collections;
