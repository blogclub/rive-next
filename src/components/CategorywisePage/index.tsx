import { useState, useEffect } from 'react';
import axiosFetch from '@/Utils/fetch';
import styles from "./style.module.scss";
import MovieCardSmall from '@/components/MovieCardSmall';
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
// import MoviePoster from '@/components/MoviePoster';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CategorywisePage = ({ categoryType }: any) => {
  const CapitalCategoryType = capitalizeFirstLetter(categoryType);
  const [category, setCategory] = useState("latest"); // latest, trending, topRated
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  console.log(capitalizeFirstLetter(categoryType));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosFetch({ requestID: `${category}${CapitalCategoryType}`, page: currentPage });
        // console.log();
        if (data.page > data.total_pages) {
          setCurrentPage(data.total_pages);
        }
        setData(data.results);
        setTotalpages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, currentPage]);
  return (
    <div className={styles.MoviePage}>
      <h1>Movies</h1>
      <div className={styles.category}>
        <p className={`${category === "latest" ? styles.active : styles.inactive}`} onClick={() => setCategory("latest")}>Latest</p>
        <p className={`${category === "trending" ? styles.active : styles.inactive}`} onClick={() => setCategory("trending")}>Trending</p>
        <p className={`${category === "topRated" ? styles.active : styles.inactive}`} onClick={() => setCategory("topRated")}>Top Rated</p>
        {/* <Filter/> */}
      </div>
      <div className={styles.movieList}>
        {
          data.map((ele) => {
            return (
              <MovieCardSmall data={ele} media_type={categoryType} />
            )
          })
        }
      </div>
      <ReactPaginate
        containerClassName={styles.pagination}
        pageClassName={styles.page_item}
        activeClassName={styles.paginateActive}
        onPageChange={(event) => {
          setCurrentPage(event.selected + 1);
          console.log({ event });
          if (currentPage > totalpages) { setCurrentPage(totalpages) }
        }}
        pageCount={totalpages}
        breakLabel=" ... "
        previousLabel={
          <AiFillLeftCircle className={styles.paginationIcons} />
        }
        nextLabel={
          <AiFillRightCircle className={styles.paginationIcons} />
        }
      />;
    </div>
  )
}

export default CategorywisePage;