import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { AiFillHome, AiOutlineHome, AiFillPlayCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { IoLibrary, IoLibraryOutline, IoSettings, IoSettingsOutline } from "react-icons/io5";
import { PiTelevisionFill, PiTelevisionLight } from "react-icons/pi";
import { usePathname } from "next/navigation";

const Navbar = ({ children }: any) => {
  const path = usePathname();
  const [pathname, setPathname] = useState(path);
  useEffect(() => {
    const arr = path.split("/");
    if (arr.length > 2)
      setPathname("/" + arr[2]);
    else
      setPathname(path);
    console.log({ arr });
  }, [path])
  return (
    <div className={styles.navbar} >
      <Link href="/">
        {pathname === "/" ? <AiFillHome className={styles.active} /> : <AiOutlineHome className={styles.inactive} />}
      </Link>
      <Link href="/movie">
        {pathname === "/movie" ? <AiFillPlayCircle className={styles.active} /> : <AiOutlinePlayCircle className={styles.inactive} />}
      </Link>
      <Link href="/tv">
        {pathname === "/tv" ? <PiTelevisionFill className={styles.active} /> : <PiTelevisionLight className={styles.inactive} />}
      </Link>
      <Link href="/library">
        {pathname === "/library" ? <IoLibrary className={styles.active} /> : <IoLibraryOutline className={styles.inactive} />}
      </Link>
      <Link href="/settings">
        {pathname === "/settings" ? <IoSettings className={styles.active} /> : <IoSettingsOutline className={styles.inactive} />}
      </Link>
    </div>
  );
};

export default Navbar;
