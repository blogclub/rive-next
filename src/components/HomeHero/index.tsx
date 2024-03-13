import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axiosFetch from "@/Utils/fetch";

const HomeHero = ({ children }: any) => {
  const [data, setData] = useState(axiosFetch({ requestID: "trending" }));
  // console.log(axiosFetch({ requestID: "trending" }));
  return (
    <div className={styles.HomeHero} >
    </div>
  );
};

export default HomeHero;
