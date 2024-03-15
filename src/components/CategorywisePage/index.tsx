import { useState, useEffect } from 'react';
import axiosFetch from '@/Utils/fetch';
import styles from "@/styles/Movie.module.scss";
// import MovieCardSmall from '@/components/MovieCardSmall';
import MoviePoster from '@/components/MoviePoster';
import MovieCardSmall from '@/components/MovieCardSmall';

const CategorywisePage = ({ type }: any) => {
  const [category, setCategory] = useState("latest"); // latest, trending, topRated
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosFetch({ requestID: `${category}Movie`, page: currentPage });
        console.log({ data });
        setData(data.results);
        setTotalpages(data.total_pages);
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
              <MoviePoster data={ele} media_type="movie" />
            )
          })
        }
      </div>
    </div>
  )
}

export default CategorywisePage;