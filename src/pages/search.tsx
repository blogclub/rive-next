import { useState, useEffect, useRef } from "react";
import axiosFetch from "@/Utils/fetchBackend";
import styles from "@/styles/Search.module.scss";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import MovieCardLarge from "@/components/MovieCardLarge";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
// import MoviePoster from '@/components/MoviePoster';

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SearchPage = ({ categoryType }: any) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genreListMovie, setGenreListMovie] = useState<any>([]);
  const [genreListTv, setGenreListTv] = useState<any>([]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const searchBar: any = useRef(null);

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
    searchBar?.current.focus();

    // focus the input on "/"
    const handleKeyDown = (event: any) => {
      if (event.key === "/") {
        event.preventDefault();
        searchBar?.current.focus();
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
    let debounceTimer: NodeJS.Timeout;
    const fetchData = async (mode: any) => {
      setLoading(true);
      // setData([null, null, null, null, null, null, null, null, null, null]);
      try {
        let data;
        if (mode) {
          data = await axiosFetch({
            requestID: `searchMulti`,
            page: currentPage,
            query: query,
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
        } else {
          data = await axiosFetch({ requestID: `trending` });
          setCurrentPage(1);
          setTotalpages(1);
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
        if (query.length >= 3) {
          fetchData(true);
        }
      }, 600);
    };
    if (query?.length > 2) debounceSearch();
    if (query?.length === 0) fetchData(false);
    return () => clearTimeout(debounceTimer);
  }, [query, currentPage]);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else NProgress.done(false);
  }, [loading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className={styles.MoviePage}>
      {/* <h1>Search</h1> */}
      <div className={styles.InputWrapper}>
        <input
          ref={searchBar}
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Please enter at least 3 characters to search..."
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
      {query.length > 2 ? (
        <h1>
          showing result for <span className={styles.serachQuery}>{query}</span>
        </h1>
      ) : (
        <h1>
          Top Searches <span className={styles.serachQuery}>today</span>
        </h1>
      )}
      <div className={styles.movieList}>
        {genreListMovie?.length > 0 &&
          genreListTv?.length > 0 &&
          data.map((ele: any) => {
            return (
              <MovieCardLarge
                data={ele}
                media_type={categoryType}
                genresMovie={genreListMovie}
                genresTv={genreListTv}
              />
            );
          })}
        {query.length > 2 && data?.length === 0 ? <h1>No Data Found</h1> : null}
        {query.length > 2 && data === undefined
          ? dummyList.map((ele) => <Skeleton className={styles.loading} />)
          : null}
        {genreListMovie?.length === 0 || genreListTv?.length === 0
          ? dummyList.map((ele: any) => {
              return (
                <MovieCardLarge
                  data={ele}
                  media_type={categoryType}
                  genresMovie={genreListMovie}
                  genresTv={genreListTv}
                />
              );
            })
          : null}
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
      ;
    </div>
  );
};

export default SearchPage;
