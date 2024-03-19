import React, { useState, useEffect } from "react";
// import Spinner from "@/components/Spinner";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { getSettings } from "@/Utils/settings";
import SettingsPage from "../SettingsPage";
import { usePathname } from "next/navigation";
const Layout = ({ children }: any) => {
  const [theme, setTheme] = useState("system");
  const [mode, setMode] = useState("liquidate");
  const [ascent_color, setAscent_color] = useState("gold");
  useEffect(() => {
    const values = getSettings();
    if (values !== null) {
      setTheme(values?.theme);
      setMode(values?.mode);
      setAscent_color(values?.ascent_color);
    }
    console.log({ values });
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--ascent-color", ascent_color);
    document.documentElement.style.setProperty("--mode", mode);
  }, [mode, ascent_color])
  const path = usePathname();
  return (
    <>
      <div className={`${styles.background} ${mode === "dark" && "dark"} ${mode === "light" && "light"}`} >
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
        {path === "/settings" ? <SettingsPage mode={mode} theme={theme} ascent_color={ascent_color} setMode={setMode} setTheme={setTheme} setAscent_color={setAscent_color} /> : null}
      </div>
    </>
  );
};

export default Layout;
