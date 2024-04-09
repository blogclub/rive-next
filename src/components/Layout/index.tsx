import React, { useState, useEffect } from "react";
// import Spinner from "@/components/Spinner";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { getSettings } from "@/Utils/settings";
import SettingsPage from "../SettingsPage";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { fetchRandom } from "@/Utils/randomdata";

const Layout = ({ children }: any) => {
  const [theme, setTheme] = useState("system");
  const [mode, setMode] = useState("liquidate");
  const [ascent_color, setAscent_color] = useState("gold");
  const [themeColor, setThemeColor] = useState<any>();
  const { push } = useRouter();

  const fetchRandomData = async () => {
    const res: any = await fetchRandom();
    console.log({ res });
    if (res?.type && res?.id) {
      push(`/detail?type=${res.type}&id=${res.id}`);
    }
  };

  useEffect(() => {
    const values = getSettings();
    if (values !== null) {
      setTheme(values?.theme);
      setMode(values?.mode);
      setAscent_color(values?.ascent_color);
    }
    console.log({ values });
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeColor = prefersDarkMode ? "#1b1919" : "#f4f7fe";
    setThemeColor(themeColor);

    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        push("/search");
      }
      if (event.ctrlKey && event.key === "R") {
        event.preventDefault();
        fetchRandomData();
      }
    });
    // console.log({ prefersDarkMode });
    // const metaThemeColor = document.querySelector("meta[name=theme-color]");
    // metaThemeColor?.setAttribute("content", themeColor);
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--ascent-color", ascent_color);
    document.documentElement.style.setProperty("--mode", mode);
  }, [mode, ascent_color]);
  const path = usePathname();
  return (
    <>
      {mode === "dark" && (
        <Head>
          <meta name="theme-color" content="#1b1919" />
          <meta name="msapplication-TileColor" content="#1b1919" />
        </Head>
      )}
      {mode === "light" && (
        <Head>
          <meta name="theme-color" content="#f4f7fe" />
          <meta name="msapplication-TileColor" content="#f4f7fe" />
        </Head>
      )}
      {mode === "system" && (
        <Head>
          <meta name="theme-color" content={`${themeColor}`} />
          <meta name="msapplication-TileColor" content={`${themeColor}`} />
        </Head>
      )}
      <div
        className={`${styles.background} ${mode === "dark" && "dark"} ${mode === "light" && "light"}`}
      >
        <Navbar />
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
        {path === "/settings" ? (
          <SettingsPage
            mode={mode}
            theme={theme}
            ascent_color={ascent_color}
            setMode={setMode}
            setTheme={setTheme}
            setAscent_color={setAscent_color}
          />
        ) : null}
      </div>
    </>
  );
};

export default Layout;
