import { useState, useEffect } from "react";
import axiosFetch from "@/Utils/fetchBackend";
import styles from "./style.module.scss";
import MovieCardSmall from "@/components/MovieCardSmall";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Filter from "../Filter";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
// import MoviePoster from '@/components/MoviePoster';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const CategorywisePage = ({ categoryType }: any) => {
  const CapitalCategoryType = capitalizeFirstLetter(categoryType);
  const [category, setCategory] = useState("latest"); // latest, trending, topRated
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterGenreList, setFilterGenreList] = useState("");
  const [filterCountry, setFiltercountry] = useState();
  const [filterYear, setFilterYear] = useState();
  const [sortBy, setSortBy] = useState();
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(capitalizeFirstLetter(categoryType));
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
        if (category === "filter") {
          data = await axiosFetch({
            requestID: `${category}${CapitalCategoryType}`,
            page: currentPage,
            genreKeywords: filterGenreList,
            country: filterCountry,
            year: filterYear,
            sortBy: sortBy,
          });
        } else {
          data = await axiosFetch({
            requestID: `${category}${CapitalCategoryType}`,
            page: currentPage,
          });
        }
        // console.log();
        if (data.page > data.total_pages) {
          setCurrentPage(data.total_pages);
        }
        setData(data.results);
        setTotalpages(data.total_pages > 500 ? 500 : data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [category, currentPage, trigger]);

  const handleFilterClick = () => {
    setCurrentPage(1);
    setCategory("filter");
    setShowFilter(!showFilter);
  };
  return (
    <div className={styles.MoviePage}>
      <h1>{CapitalCategoryType}</h1>
      <div className={styles.category}>
        <p
          className={`${category === "latest" ? styles.active : styles.inactive}`}
          onClick={() => setCategory("latest")}
        >
          Latest
        </p>
        <p
          className={`${category === "trending" ? styles.active : styles.inactive}`}
          onClick={() => setCategory("trending")}
        >
          Trending
        </p>
        <p
          className={`${category === "topRated" ? styles.active : styles.inactive}`}
          onClick={() => setCategory("topRated")}
        >
          Top-Rated
        </p>
        <p
          className={`${category === "filter" ? styles.active : styles.inactive} ${styles.filter}`}
          onClick={handleFilterClick}
        >
          Filter{" "}
          {category === "filter" ? (
            <MdFilterAlt className={styles.active} />
          ) : (
            <MdFilterAltOff />
          )}
        </p>
      </div>
      {/* <Filter/> */}
      {showFilter && (
        <Filter
          categoryType={categoryType}
          setShowFilter={setShowFilter}
          setFilterYear={setFilterYear}
          setFiltercountry={setFiltercountry}
          setFilterGenreList={setFilterGenreList}
          filterGenreList={filterGenreList}
          filterCountry={filterCountry}
          filterYear={filterYear}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setCategory={setCategory}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      )}
      <div className={styles.movieList}>
        {data.map((ele: any) => {
          return <MovieCardSmall data={ele} media_type={categoryType} />;
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

export default CategorywisePage;
