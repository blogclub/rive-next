import { useState, useEffect, useRef } from "react";
import axiosFetch from "@/Utils/fetchBackend";
// import styles from "@/components/CategorywisePage/style.module.scss";
import styles from "@/styles/Search.module.scss";
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
  const [totalpages, setTotalpages] = useState(
    Math.floor(CollectionIDs?.length / 20),
  );
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const searchBar: any = useRef(null);
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else NProgress.done(false);
  }, [loading]);

  // focus the input on "/"
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // console.log(event.key);
      if (event.key === "/") {
        event.preventDefault();
        searchBar?.current.focus();
        // setSearchQuery((prev: any) => prev + "/");
      } else if (event.key === "Escape") {
        event.preventDefault();
        searchBar?.current.blur();
        // setSearchQuery((prev: any) => prev + "/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
    if (searchQuery === null || searchQuery?.length <= 2)
      fetchData().then((res) => {
        console.log({ res });
        setData(res);
        setLoading(false);
      });
  }, [ids, currentPage, searchQuery]);
  useEffect(() => {
    if (searchQuery === "" || searchQuery === null) {
      setCurrentPage(1);
      setTotalpages(Math.floor(CollectionIDs?.length / 20));
    } else {
      setCurrentPage(1);
    }
  }, [searchQuery]);
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const fetchData = async (mode: any) => {
      setLoading(true);
      // setData([null, null, null, null, null, null, null, null, null, null]);
      try {
        let data;
        if (mode) {
          data = await axiosFetch({
            requestID: `searchCollection`,
            page: currentPage,
            query: searchQuery,
          });
          // console.log();
          if (data.page > data.total_pages) {
            setCurrentPage(data.total_pages);
          }
          if (currentPage > data.total_pages) {
            setCurrentPage(1);
            return;
          }
          setTotalpages(data.total_pages > 500 ? 500 : data.total_pages);
        }
        setData(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (searchQuery.length >= 3) {
          fetchData(true);
        }
      }, 600);
    };
    if (searchQuery?.length > 2) debounceSearch();
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  return (
    <div className={styles.MoviePage}>
      {/* <h1>Collections</h1> */}
      <div className={styles.InputWrapper}>
        <input
          ref={searchBar}
          type="text"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Please enter at least 3 characters to search collections...."
          onFocus={() => setIsSearchBarFocused(true)}
          onBlur={() => setIsSearchBarFocused(false)}
          // data-tooltip-id="tooltip"
          // data-tooltip-html={"<div>focus :  <span class='tooltip-btn'>/</span></div><div>unfocus :  <span class='tooltip-btn'>Esc</span></div>"}
        />
        <div className={styles.inputShortcut}>
          {!isSearchBarFocused ? (
            <span className="tooltip-btn">/</span>
          ) : (
            <span className="tooltip-btn">Esc</span>
          )}
        </div>
      </div>
      {searchQuery?.length > 2 ? (
        <h1>
          showing collections for{" "}
          <span className={styles.serachQuery}>{searchQuery}</span>
        </h1>
      ) : (
        <h1>
          All Collections <span className={styles.serachQuery}></span>
        </h1>
      )}
      <div className={styles.movieList}>
        {data.map((ele: any) => {
          return <MovieCardSmall data={ele} media_type={"collection"} />;
        })}
        {searchQuery?.length > 2 && data?.length === 0 ? (
          <h1>No Data Found</h1>
        ) : null}
        {(searchQuery === null || searchQuery === "") &&
          data?.length === 0 &&
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
        forcePage={currentPage - 1}
        pageCount={totalpages}
        breakLabel=" ... "
        previousLabel={<AiFillLeftCircle className={styles.paginationIcons} />}
        nextLabel={<AiFillRightCircle className={styles.paginationIcons} />}
      />
    </div>
  );
};

export default Collections;
