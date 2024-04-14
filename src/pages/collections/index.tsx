import { useState, useEffect } from "react";
import axiosFetch from "@/Utils/fetchBackend";
import styles from "@/components/CategorywisePage/style.module.scss";
import MovieCardSmall from "@/components/MovieCardSmall";
import ReactPaginate from "react-paginate"; // for pagination
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import CollectionIDs from "@/assets/collection_ids.json";
// import MoviePoster from '@/components/MoviePoster';

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Collections = ({ categoryType }: any) => {
  const [ids, setids] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalpages, setTotalpages] = useState(CollectionIDs?.length / 20);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
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
        for (
          let i = (currentPage - 1) * 20;
          i < currentPage * 20 && i < CollectionIDs?.length - 1;
          i++
        ) {
          const data = await axiosFetch({
            requestID: `collection`,
            id: JSON.stringify(CollectionIDs[i]?.id),
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
  }, [ids, currentPage]);
  return (
    <div className={styles.MoviePage}>
      <h1>Collections</h1>
      <div className={styles.movieList}>
        {data.map((ele: any) => {
          return <MovieCardSmall data={ele} media_type={"collection"} />;
        })}
        {data?.length === 0 &&
          dummyList.map((ele) => <Skeleton className={styles.loading} />)}
        {/* {data?.total_results === 0 &&
          <h1>No Data Found</h1>} */}
      </div>
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
          window.scrollTo(0, 0);
        }}
        pageCount={totalpages}
        breakLabel=" ... "
        previousLabel={<AiFillLeftCircle className={styles.paginationIcons} />}
        nextLabel={<AiFillRightCircle className={styles.paginationIcons} />}
      />
      ;
    </div>
  );
};

export default Collections;
