import styles from "./LoadingContent.module.css";
import MainLogo from "./MainLogo";

function LoadingContent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spin}>
        <MainLogo />
      </div>
      <h2>Loading...</h2>
    </div>
  );
}

export default LoadingContent;
