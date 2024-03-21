import styles from "@/styles/Settings.module.scss";
const OfflinePage = () => {
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.errorData}>
        <h1>503</h1>
        <p>No Internet</p>
        {/* <details>
          <summary>No Internet/ Unavailable</summary>
          <h4>This can happen for a number of reasons, including:</h4>
          <p>1. Server maintenance running</p>
          <p>2. Server is overloaded due to unexpected traffic surges or attacks</p>
          <p>3. Client-side DNS configuration error</p>
          <p>4. The connection to the internet has been lost or interfered with</p>
          <p>5. The site has been deleted or moved</p>
          <p>6. The site is experiencing too much traffic and is temporarily down</p>
          <h4>Try:</h4>
          <p>1. Checking the network cables, modem, and router</p>
          <p>1. Reconnecting to Wi-Fi</p>
          <p>1. Running Windows Network Diagnostics</p>
        </details> */}
      </div>
    </div>
  );
};

export default OfflinePage;
