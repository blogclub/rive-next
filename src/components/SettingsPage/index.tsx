import React, { useState, useEffect } from "react";
import styles from "@/styles/Settings.module.scss";
import Link from "next/link";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { getSettings, setSettings } from "@/Utils/settings";
import { usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";
import { logoutUser } from "@/Utils/firebaseUser";
import { useRouter } from "next/navigation";
import { fetchRandom } from "@/Utils/randomdata";

const SettingsPage = ({
  mode,
  theme,
  ascent_color,
  setMode,
  setTheme,
  setAscent_color,
}: any) => {
  const [user, setUser] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log({ user });
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, []);
  const handleSelect = ({ type, value }: any) => {
    const prevVal = { mode, theme, ascent_color };
    if (type === "mode") setSettings({ values: { ...prevVal, mode: value } });
    if (type === "theme") setSettings({ values: { ...prevVal, theme: value } });
    if (type === "ascent_color")
      setSettings({ values: { ...prevVal, ascent_color: value } });
  };
  const handleRandom = async () => {
    const res = await fetchRandom();
    console.log({ res });
    if (res?.type && res?.id) {
      push(`/detail?type=${res.type}&id=${res.id}`);
    }
  };
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.settings}>
        <h1>Account</h1>
        {user ? (
          <div className={styles.group}>
            <>
              <p className={styles.logout} onClick={() => logoutUser()}>
                Logout
              </p>
              {/* <Link href="/signup">Signup</Link> */}
            </>
            <h4 className={styles.profileCard}>Hi There!</h4>
          </div>
        ) : (
          <div className={styles.group}>
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
            <h4 className={styles.profileCard}>Login to sync to cloud</h4>
          </div>
        )}
        <h1>Appearence</h1>
        <div className={styles.group}>
          <div>
            <label htmlFor="mode">Mode</label>
            <select
              name="mode"
              id="mode"
              value={mode}
              onChange={(e) => {
                setMode(e.target.value);
                handleSelect({ type: "mode", value: e.target.value });
              }}
            >
              <option value="system" defaultChecked>
                System
              </option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="theme">Theme</label>
            <select name="theme" id="theme" value={theme} onChange={(e) => {setTheme(e.target.value);handleSelect({type:"theme",value:e.target.value})}}>
              <option value="liquidate" defaultChecked>Liquidate</option>
              <option value="normal">Normal</option>
            </select>
          </div> */}
          <div>
            <label htmlFor="ascent">Ascent Color</label>
            <select
              name="ascent"
              id="ascent"
              value={ascent_color}
              onChange={(e) => {
                setAscent_color(e.target.value);
                handleSelect({ type: "ascent_color", value: e.target.value });
              }}
            >
              <option value="gold" defaultChecked>
                Gold
              </option>
              <option value="#f44336">Red</option>
              <option value="#e91e63">Pink</option>
              <option value="#9c27b0">Purple</option>
              <option value="#673ab7">Deep Purple</option>
              <option value="#3f51b5">Indigo</option>
              <option value="#2196f3">Blue</option>
              <option value="#03a9f4">Light Blue</option>
              <option value="#00bcd4">Cyan</option>
              <option value="#009688">Teal</option>
              <option value="#4caf50">Green</option>
              <option value="#8bc34a">Light Green</option>
              <option value="#ffeb3b">Yellow</option>
              <option value="#ffc107">Amber</option>
              <option value="#ff9800">Orange</option>
              <option value="#ff5722">Deep Orange</option>
              <option value="#795548">Brown</option>
            </select>
          </div>
        </div>
        <h1>App Center</h1>
        <div className={styles.group}>
          <Link
            href=""
            onClick={handleRandom}
            data-tooltip-id="tooltip"
            data-tooltip-html="Random Movie/ Tv Show <span class='tooltip-btn'>CTRL + SHIFT + R</span>"
          >
            Random
          </Link>
          <Link
            href="/downloads"
            data-tooltip-id="tooltip"
            data-tooltip-content="Downloads"
          >
            Download
          </Link>
          <Link href="mailto:kumarashishranjan4971@hotmail.com">
            Contact Us
          </Link>
          {/* <Link href="/contact">Contact Us</Link> */}
        </div>
        <h1>Links</h1>
        <div className={styles.group}>
          <Link href={"https://github.com/Developabile/rive-next"}>
            <FaGithub /> Github
          </Link>
          <Link href={"/"}>
            <FaGlobe /> Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
