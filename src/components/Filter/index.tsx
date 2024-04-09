import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetchBackend";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const countryData = [
  { name: "Argentina", abbr: "AR" },
  { name: "Australia", abbr: "AU" },
  { name: "Austria", abbr: "AT" },
  { name: "Belgium", abbr: "BE" },
  { name: "Brazil", abbr: "BR" },
  { name: "Canada", abbr: "CA" },
  { name: "China", abbr: "CN" },
  { name: "France", abbr: "FR" },
  { name: "Germany", abbr: "DE" },
  { name: "India", abbr: "IN" },
  { name: "Italy", abbr: "IT" },
  { name: "Japan", abbr: "JP" },
  { name: "Mexico", abbr: "MX" },
  { name: "Netherlands", abbr: "NL" },
  { name: "Russia", abbr: "RU" },
  { name: "South Korea", abbr: "KR" },
  { name: "Spain", abbr: "ES" },
  { name: "Sweden", abbr: "SE" },
  { name: "Switzerland", abbr: "CH" },
  { name: "Taiwan", abbr: "TW" },
  { name: "United Kingdom", abbr: "UK" },
  { name: "United States", abbr: "US" },
  { name: "Denmark", abbr: "DK" },
  { name: "Norway", abbr: "NO" },
  { name: "Finland", abbr: "FI" },
  { name: "Portugal", abbr: "PT" },
  { name: "Greece", abbr: "GR" },
  { name: "Turkey", abbr: "TR" },
  { name: "Poland", abbr: "PL" },
  { name: "Czech Republic", abbr: "CZ" },
  { name: "Hungary", abbr: "HU" },
  { name: "Ireland", abbr: "IE" },
  { name: "New Zealand", abbr: "NZ" },
  { name: "South Africa", abbr: "ZA" },
  { name: "Egypt", abbr: "EG" },
  { name: "Thailand", abbr: "TH" },
  { name: "Singapore", abbr: "SG" },
  { name: "Malaysia", abbr: "MY" },
  { name: "Philippines", abbr: "PH" },
  { name: "Indonesia", abbr: "ID" },
  { name: "Vietnam", abbr: "VN" },
  { name: "United Arab Emirates", abbr: "AE" },
];
const Filter = ({
  categoryType,
  setShowFilter,
  setFilterYear,
  setFiltercountry,
  setFilterGenreList,
  filterGenreList,
  filterCountry,
  filterYear,
  sortBy,
  setSortBy,
  setCategory,
  setTrigger,
  trigger,
}: any) => {
  const CapitalCategoryType = capitalizeFirstLetter(categoryType);
  const [genreData, setGenreData] = useState([]);
  const [selectedCountryCheckbox, setSelectedCountryCheckbox] = useState();
  // const [countryData, setCountryData] = useState([]);
  const [yearData, setYearData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosFetch({
          requestID: `genres${CapitalCategoryType}`,
        });
        setGenreData(data.genres);
        // console.log({ data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setSelectedCountryCheckbox(filterCountry);
    console.log({ filterGenreList });
  }, []);
  const handleGenereSelect = (id: any) => {
    console.log({ id });
    setFilterGenreList(
      filterGenreList === "" ? id + "," : filterGenreList + id + ",",
    );
    // console.log({ filterGenreList });
  };
  const handleCountrySelect = (name: any) => {
    console.log({ name });
    setFiltercountry(name);
    setSelectedCountryCheckbox(name);
    // console.log({ filterGenreList });
  };
  const handleFilterSubmit = () => {
    setCategory("filter");
    setTrigger(!trigger);
    setShowFilter(false);
    // console.log({ filterGenreList });
  };
  const handleFilterReset = () => {
    setFilterGenreList("");
    setFilterYear(undefined);
    setFiltercountry(undefined);
    setSelectedCountryCheckbox(undefined);
  };

  return (
    <div className={styles.Filter}>
      <h1>Filter</h1>
      <h1
        className={styles.close}
        onClick={() => {
          setShowFilter(false);
        }}
      >
        x
      </h1>

      <h2>Genres</h2>
      {genreData.map((ele: any) => {
        const selectedGenres =
          typeof filterGenreList === "string" ? filterGenreList.split(",") : [];
        const isChecked = selectedGenres.includes(ele.id.toString());
        return (
          <div
            className={`${styles.checkboxDiv} ${isChecked ? styles.active : styles.inactive}`}
          >
            <label className={"container"} htmlFor={ele.id}>
              {ele.name}
              <input
                type="checkbox"
                id={ele.id}
                name={ele.name}
                value={ele.id}
                onChange={() => handleGenereSelect(ele.id)}
                checked={isChecked}
              />
              <span className={"checkmark"}></span>
            </label>
          </div>
        );
      })}
      <h2>Country</h2>
      {countryData.map((ele: any) => {
        return (
          <div
            className={`${styles.checkboxDiv} ${selectedCountryCheckbox === ele.abbr ? styles.active : styles.inactive}`}
          >
            <label className={"container"} htmlFor={ele.name}>
              {ele.name}
              <input
                type="checkbox"
                id={ele.name}
                name={ele.name}
                value={ele.name}
                onChange={() => handleCountrySelect(ele.abbr)}
                checked={selectedCountryCheckbox === ele.abbr}
              />
              <span className={"checkmark"}></span>
            </label>
          </div>
        );
      })}
      <h2>year</h2>
      <input
        type="text"
        id="input"
        name="input"
        value={filterYear}
        onChange={(e: any) => {
          setFilterYear(e.target.value);
        }}
        placeholder="Enter Year"
      />
      <h2>sort</h2>
      <select
        name="source"
        id="source"
        className={styles.source}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="popularity.desc" defaultChecked>
          Popularity &darr; (Desc){" "}
        </option>
        <option value="popularity.asc">Popularity &uarr; (Asc)</option>
        <option value="vote_average.desc">Vote &darr; (Desc)</option>
        <option value="vote_average.asc">Vote &uarr; (Asc)</option>
        {categoryType === "tv" && (
          <>
            <option value="name.desc">Name &darr; (Desc)</option>
            <option value="name.asc">Name &uarr; (Asc)</option>
            <option value="first_air_date.desc">
              First Air Date &darr; (Desc)
            </option>
            <option value="first_air_date.asc">
              First Air Date &uarr; (Asc)
            </option>
          </>
        )}
        {categoryType === "movie" && (
          <>
            <option value="title.desc">Title &darr; (Desc)</option>
            <option value="title.asc">Title &uarr; (Asc)</option>
            <option value="primary_release_date.desc">
              Release Date &darr; (Desc)
            </option>
            <option value="primary_release_date.asc">
              Release Date &uarr; (Asc)
            </option>
            <option value="revenue.desc">Revenue &darr; (Desc)</option>
            <option value="revenue.asc">Revenue &uarr; (Asc)</option>
          </>
        )}
      </select>

      <div className={styles.filterButtons}>
        <div className={styles.filterSubmit} onClick={handleFilterSubmit}>
          submit
        </div>
        <div className={styles.filterSubmit} onClick={handleFilterReset}>
          reset
        </div>
      </div>
    </div>
  );
};

export default Filter;
