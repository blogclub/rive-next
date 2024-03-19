import React, { useState, useEffect } from 'react'
import styles from '@/styles/Settings.module.scss';
import Link from 'next/link';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { getSettings, setSettings } from '@/Utils/settings';
import { usePathname } from 'next/navigation';
const SettingsPage = ({ mode, theme, ascent_color, setMode, setTheme, setAscent_color }: any) => {
  // const [mode, setMode] = useState("system");
  // const [theme, setTheme] = useState("liquidate");
  // const [ascent_color, setAscent_color] = useState("gold");
  // const [settingCurrent, setCurrentSetting] = useState({ mode: "system", theme: "liquidate", ascent_color: "gold" });
  // useEffect(() => {
  //   const values = getSettings();
  //   console.log({ values });
  //   if (values !== null) {
  //     setMode(values?.mode);
  //     setTheme(values?.theme);
  //     setAscent_color(values?.ascent_color);
  //   }
  // }, []);
  const handleSelect = ({ type, value }: any) => {
    const prevVal = { mode, theme, ascent_color };
    if (type === "mode") setSettings({ values: { ...prevVal, mode: value } });
    if (type === "theme") setSettings({ values: { ...prevVal, theme: value } });
    if (type === "ascent_color") setSettings({ values: { ...prevVal, ascent_color: value } });
  }
  return (
    <div className={`${styles.settingsPage}`}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.settings}>
        <h1>Account</h1>
        <div className={styles.group}>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
        <h1>Appearence</h1>
        <div className={styles.group}>
          <div>
            <label htmlFor="mode">Mode</label>
            <select name="mode" id="mode" value={mode} onChange={(e) => { setMode(e.target.value); handleSelect({ type: "mode", value: e.target.value }) }}>
              <option value="system" defaultChecked>System</option>
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
            <select name="ascent" id="ascent" value={ascent_color} onChange={(e) => { setAscent_color(e.target.value); handleSelect({ type: "ascent_color", value: e.target.value }) }}>
              <option value="gold" defaultChecked>Gold</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="#0693E3">Blue</option>
              <option value="#8ED1FC">Sky Blue</option>
              <option value="black">Black</option>
              <option value="pink">Pink</option>
              <option value="hotpink">Hotpink</option>
              <option value="wheat">Wheat</option>
              <option value="orange">Orange</option>
              <option value="#ABB8C3">Gray</option>
              <option value="#9900EF">Purple</option>
            </select>
          </div>
        </div>
        <h1>App Center</h1>
        <div className={styles.group}>
          <Link href="/download">Download</Link>
          <Link href="mailto:kumarashishranjan4971@hotmail.com">Contact Us</Link>
          {/* <Link href="/contact">Contact Us</Link> */}
        </div>
        <h1>Links</h1>
        <div className={styles.group}>
          <Link href={"https://github.com/Devolopabile/rive-next"}>
            <FaGithub /> Github
          </Link>
          <Link href={"/"}>
            <FaGlobe /> Website
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage;