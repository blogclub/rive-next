import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Watch.module.scss";
import { setContinueWatching } from "@/Utils/continueWatching";
import { toast } from "sonner";
const Watch = () => {
  const params = useSearchParams();
  // console.log(params.get("id"));
  const [type, setType] = useState<string | null>("");
  const [id, setId] = useState<any>();
  const [season, setSeason] = useState<string | null>();
  const [episode, setEpisode] = useState<string | null>();
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("SUP");
  if (type === null && params.get("id") !== null) setType(params.get("type"));
  if (id === null && params.get("id") !== null) setId(params.get("id"));
  if (season === null && params.get("season") !== null)
    setSeason(params.get("season"));
  if (episode === null && params.get("episode") !== null)
    setEpisode(params.get("episode"));
  useEffect(() => {
    setLoading(true);
    setType(params.get("type"));
    setId(params.get("id"));
    setSeason(params.get("season"));
    setEpisode(params.get("episode"));
    setContinueWatching({ type: params.get("type"), id: params.get("id") });

    toast.info(
      <div>
        Cloud: use AD-Block services for AD-free experience, like AD-Blocker
        extension or{" "}
        <a target="_blank" href="https://brave.com/">
          Brave Browser{" "}
        </a>
      </div>,
    );

    toast.info(
      <div>
        Cloud: use video download extensions like{" "}
        <a target="_blank" href="https://fetchv.net/">
          FetchV{" "}
        </a>{" "}
        or{" "}
        <a target="_blank" href="https://www.hlsloader.com/">
          Stream Recorder{" "}
        </a>{" "}
        for PC and{" "}
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=videoplayer.videodownloader.downloader"
        >
          AVDP{" "}
        </a>{" "}
        for Android, to download movies/tv shows. Refer{" "}
        <a
          target="_blank"
          href="https://www.reddit.com/r/DataHoarder/comments/qgne3i/how_to_download_videos_from_vidsrcme/"
        >
          Source Advice{" "}
        </a>
      </div>,
    );
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
  const STREAM_URL_EMB = process.env.NEXT_PUBLIC_STREAM_URL_EMB;
  const STREAM_URL_MULTI = process.env.NEXT_PUBLIC_STREAM_URL_MULTI;
  const STREAM_URL_SUP = process.env.NEXT_PUBLIC_STREAM_URL_SUP;

  return (
    <div className={styles.watch}>
      <select
        name="source"
        id="source"
        className={styles.source}
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="AGG">Aggregator : 1 (Multi-Server)</option>
        <option value="VID">Aggregator : 2 (Best-Server)</option>
        <option value="EMB">Aggregator : 3</option>
        <option value="MULTI">Aggregator : 4 (Fast-Server)</option>
        <option value="SUP" defaultChecked>
          Aggregator : 5 (Multi/Most-Server)
        </option>
      </select>
      <div className={`${styles.loader} skeleton`}></div>

      {source === "AGG" && id !== "" && id !== null ? (
        <iframe
          scrolling="no"
          src={
            type === "movie"
              ? `${STREAM_URL_AGG}/embed/${id}`
              : `${STREAM_URL_AGG}/embed/${id}/${season}/${episode}`
          }
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      ) : null}

      {source === "VID" && id !== "" && id !== null ? (
        <iframe
          scrolling="no"
          src={
            type === "movie"
              ? `${STREAM_URL_VID}/embed/${type}/${id}`
              : `${STREAM_URL_VID}/embed/${type}/${id}/${season}/${episode}`
          }
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      ) : null}

      {source === "EMB" && id !== "" && id !== null ? (
        <iframe
          scrolling="no"
          src={
            type === "movie"
              ? `${STREAM_URL_EMB}/embed/${type}/${id}`
              : `${STREAM_URL_EMB}/embed/${type}/${id}/${season}/${episode}`
          }
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      ) : null}

      {source === "MULTI" && id !== "" && id !== null ? (
        <iframe
          scrolling="no"
          src={
            type === "movie"
              ? `${STREAM_URL_MULTI}?video_id=${id}&tmdb=1`
              : `${STREAM_URL_MULTI}?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
          }
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      ) : null}

      {source === "SUP" && id !== "" && id !== null ? (
        <iframe
          scrolling="no"
          src={
            type === "movie"
              ? `${STREAM_URL_SUP}/?video_id=${id}&tmdb=1`
              : `${STREAM_URL_SUP}/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
          }
          className={styles.iframe}
          allowFullScreen
        ></iframe>
      ) : null}
    </div>
  );
};

export default Watch;
