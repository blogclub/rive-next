import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Watch.module.scss"
import { setContinueWatching } from "@/Utils/continueWatching";
const Watch = () => {
  const params = useSearchParams();
  // console.log(params.get("id"));
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<any>();
  const [season, setSeason] = useState<string | null>();
  const [episode, setEpisode] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("MULTI");
  if (type === null && params.get("id") !== null) setType(params.get("type"));
  if (id === null && params.get("id") !== null) setId(params.get("id"));
  if (season === null && params.get("season") !== null) setSeason(params.get("season"));
  if (episode === null && params.get("episode") !== null) setEpisode(params.get("episode"));
  useEffect(() => {
    setLoading(true);
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    setContinueWatching({ type: params.get("type"), id: params.get("id") });
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log({ id });
  //     setLoading(false);
  //   }, 1000);
  // }, [id]);

  // useEffect(() => {
  //   // Override window.open to prevent opening new tabs
  //   window.open = function (url, target, features, replace) {
  //     console.log("window.open is blocked:", url);
  //     return null; // Return null to prevent opening new tabs
  //   };
  // }, [window]);
  const STREAM_URL_AGG = process.env.NEXT_PUBLIC_STREAM_URL_AGG;
  const STREAM_URL_VID = process.env.NEXT_PUBLIC_STREAM_URL_VID;
  const STREAM_URL_MULTI = process.env.NEXT_PUBLIC_STREAM_URL_MULTI;
  return (
    <div className={styles.watch}>
      <select name="source" id="source" className={styles.source} value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="AGG">Aggregator : 1 (Multi-Source)</option>
        <option value="VID">Aggregator : 2</option>
        <option value="MULTI" defaultChecked>Aggregator : 3 (Fast-Server)</option>
      </select>

      {source === "AGG" && id !== "" && id !== null ? <iframe scrolling="no" src={type === "movie" ? `${STREAM_URL_AGG}/embed/${id}` : `${STREAM_URL_AGG}/embed/${id}/${season}/${episode}`} className={styles.iframe} allowFullScreen></iframe> : null}

      {source === "VID" && id !== "" && id !== null ? <iframe scrolling="no" src={type === "movie" ? `${STREAM_URL_VID}/embed/${type}/${id}` : `${STREAM_URL_VID}/embed/${type}/${id}/${season}/${episode}`} className={styles.iframe} allowFullScreen></iframe> : null
      }

      {source === "MULTI" && id !== "" && id !== null ? (<iframe scrolling="no" src={type === "movie" ? `${STREAM_URL_MULTI}?video_id=${id}&tmdb=1` : `${STREAM_URL_MULTI}?video_id=${id}&tmdb=1&s=${season}&e=${episode}`} className={styles.iframe} allowFullScreen></iframe>) : null}
    </div >
  )
};

export default Watch;