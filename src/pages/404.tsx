import styles from "@/styles/Settings.module.scss";
const ErrorPage = () => {
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.errorData}>
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    </div>
  );
};

export default ErrorPage;
