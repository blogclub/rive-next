import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Watch.module.scss"
import { setContinueWatching } from "@/Utils/continueWatching";
const Watch = () => {
  const params = useSearchParams();
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<string | null>("");
  const [season, setSeason] = useState<string | null>();
  const [episode, setEpisode] = useState<string | null>();
  useEffect(() => {
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    setContinueWatching({ type: params.get("type"), id: params.get("id") });
  }, []);
  // useEffect(() => {
  //   // Override window.open to prevent opening new tabs
  //   window.open = function (url, target, features, replace) {
  //     console.log("window.open is blocked:", url);
  //     return null; // Return null to prevent opening new tabs
  //   };
  // }, [window]);
  const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL;
  return (
    <div className={styles.watch}>
      <iframe src={type === "movie" ? `${STREAM_URL}/embed/${id}` : (season === null || season === undefined ? `${STREAM_URL}/embed/${id}` : `${STREAM_URL}/embed/${id}/${season}/${episode}`)} className={styles.iframe} allowFullScreen></iframe>
    </div>
  )
};

export default Watch;