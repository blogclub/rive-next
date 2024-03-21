import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillPlayCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import {
  IoLibrary,
  IoLibraryOutline,
  IoSettings,
  IoSettingsOutline,
  IoSearchOutline,
  IoSearch,
} from "react-icons/io5";
import { PiTelevisionFill, PiTelevisionLight } from "react-icons/pi";
import { usePathname, useSearchParams } from "next/navigation";

const Navbar = ({ children }: any) => {
  const path = usePathname();
  const params = useSearchParams();
  // const query=
  const [pathname, setPathname] = useState(path);
  useEffect(() => {
    if (params.get("type") !== null) setPathname("/" + params.get("type"));
    else setPathname(path);
    console.log(params.get("type"));
  }, [path, params]);
  return (
    <div className={styles.navbar}>
      <Link href="/" data-tooltip-id="tooltip" data-tooltip-content="Home">
        {pathname === "/" ? (
          <AiFillHome className={styles.active} />
        ) : (
          <AiOutlineHome className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/search"
        data-tooltip-id="tooltip"
        data-tooltip-content="Search, use CRTL+K as shortcut"
      >
        {pathname === "/search" ? (
          <IoSearch className={styles.active} />
        ) : (
          <IoSearchOutline className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/movie"
        data-tooltip-id="tooltip"
        data-tooltip-content="Movies"
      >
        {pathname === "/movie" ? (
          <AiFillPlayCircle className={styles.active} />
        ) : (
          <AiOutlinePlayCircle className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/tv"
        data-tooltip-id="tooltip"
        data-tooltip-content="TV shows"
      >
        {pathname === "/tv" ? (
          <PiTelevisionFill className={styles.active} />
        ) : (
          <PiTelevisionLight className={styles.inactive} />
        )}
      </Link>
      <Link
        href="/library"
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
        data-tooltip-id="tooltip"
        data-tooltip-content="Settings"
      >
        {pathname === "/settings" ||
        pathname === "/signup" ||
        pathname === "/login" ? (
          <IoSettings className={styles.active} />
        ) : (
          <IoSettingsOutline className={styles.inactive} />
        )}
      </Link>
    </div>
  );
};

export default Navbar;
