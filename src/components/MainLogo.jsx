import styles from "./Logo.module.css";
import logo from "../assets/icon.svg";

function MainLogo() {
  return (
    <div className={styles.logoBox}>
      <img src={logo} alt="Venbuk Logo" className={styles.logoIcon} />
    </div>
  );
}

export default MainLogo;
