import { useState, useEffect } from "react";
import styles from "@/styles/Settings.module.scss";
const LoginPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>();
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);
  const handleDownload = async () => {
    if (deferredPrompt !== null && deferredPrompt !== undefined) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img
          src="/images/logo.svg"
          alt="logo"
          data-tooltip-id="tooltip"
          data-tooltip-content="Rive"
        />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.settings}>
        <h1>Downloads</h1>
        <div className={styles.group2}>
          <h1>PWA</h1>
          <p>
            This will install app for all device with very low space and data
          </p>
          <p>
            Download using Brave Browser or Chrome if you have ad-blocker on the
            chrome account, for ad-free experience
          </p>
          <p>If not downloading, refresh this page and try again</p>
          {/* <p>To download movies/tv shows, go to it's watch page, and use extensions like FetchV</p> */}
          <h4
            className={styles.downloadButton}
            onClick={handleDownload}
            data-tooltip-id="tooltip"
            data-tooltip-content="Download PWA"
          >
            Download
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
