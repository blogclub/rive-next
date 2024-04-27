import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
// import {
//   AiFillHome,
//   AiOutlineHome,
//   AiFillPlayCircle,
//   AiOutlinePlayCircle,
// } from "react-icons/ai";
// import {
//   IoLibrary,
//   IoLibraryOutline,
//   IoSettings,
//   IoSettingsOutline,
//   IoSearchOutline,
//   IoSearch,
// } from "react-icons/io5";
// import { PiTelevisionFill, PiTelevisionLight } from "react-icons/pi";

import { IoLibrary, IoLibraryOutline } from "react-icons/io5";
import {
  MdOutlineCollectionsBookmark,
  MdCollectionsBookmark,
  MdHome,
  MdOutlineHome,
  MdPlayCircle,
  MdOutlinePlayCircle,
  MdSearch,
  MdOutlineSearch,
  MdSettings,
  MdOutlineSettings,
  MdTv,
  MdOutlineTv,
  MdTheaterComedy,
  MdOutlineTheaterComedy,
} from "react-icons/md";
import { RiEye2Line, RiEye2Fill } from "react-icons/ri";
import { usePathname, useSearchParams } from "next/navigation";

const Navbar = ({ children }: any) => {
  const path = usePathname();
  const params = useSearchParams();
  // const query=
  const [pathname, setPathname] = useState(path);
  useEffect(() => {
    if (params.get("type") !== null) setPathname("/" + params.get("type"));
    // else setPathname(path);
    else {
      const arr = path?.split("/");
      setPathname("/" + arr[1]);
    }
    // console.log(path);
  }, [path, params]);
  return (
    <div className={styles.navbar}>
      <Link
        href="/"
        aria-label="Home"
        data-tooltip-id="tooltip"
        data-tooltip-content="Home"
      >
        {pathname === "/" ? (
          <MdHome className={styles.active} />
        ) : (
          <MdOutlineHome className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/search"
        aria-label="Search"
        data-tooltip-id="tooltip"
        data-tooltip-html="<div>Search <span class='tooltip-btn'>CTRL + K</span></div>"
      >
        {pathname === "/search" ? (
          <MdSearch className={styles.active} />
        ) : (
          <MdOutlineSearch className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/movie"
        aria-label="Movies"
        data-tooltip-id="tooltip"
        data-tooltip-content="Movies"
      >
        {pathname === "/movie" ? (
          <MdPlayCircle className={styles.active} />
        ) : (
          <MdOutlinePlayCircle className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/tv"
        aria-label="Tv shows"
        data-tooltip-id="tooltip"
        data-tooltip-content="TV shows"
      >
        {pathname === "/tv" ? (
          <MdTv className={styles.active} />
        ) : (
          <MdOutlineTv className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/anime"
        aria-label="Anime"
        data-tooltip-id="tooltip"
        data-tooltip-content="Anime"
        className={styles.mobileHide}
      >
        {pathname === "/anime" ? (
          <RiEye2Fill className={styles.active} />
        ) : (
          <RiEye2Line className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/kdrama"
        aria-label="K-Drama"
        data-tooltip-id="tooltip"
        data-tooltip-content="K-Drama"
        className={styles.mobileHide}
      >
        {pathname === "/kdrama" ? (
          <MdTheaterComedy className={styles.active} />
        ) : (
          <MdOutlineTheaterComedy className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/collections"
        aria-label="Collections"
        data-tooltip-id="tooltip"
        data-tooltip-content="Collections"
      >
        {pathname === "/collections" ? (
          <MdCollectionsBookmark className={styles.active} />
        ) : (
          <MdOutlineCollectionsBookmark className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/library"
        aria-label="Library"
        data-tooltip-id="tooltip"
        data-tooltip-content="Library"
      >
        {pathname === "/library" ? (
          <IoLibrary className={styles.active} />
        ) : (
          <IoLibraryOutline className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/settings"
        aria-label="Settings"
        data-tooltip-id="tooltip"
        data-tooltip-content="Settings"
      >
        {pathname === "/settings" ||
        pathname === "/downloads" ||
        pathname === "/disclaimer" ||
        pathname === "/signup" ||
        pathname === "/login" ? (
          <MdSettings className={styles.active} />
        ) : (
          <MdOutlineSettings className={styles.inactive} />
        )}
      </Link>
    </div>
  );
};

export default Navbar;
