import styles from "./Logo.module.css";
import logo from "../assets/Icon_with_Side_Name.svg";

function LongLogo() {
  return (
    <div className={styles.longLogoBox}>
      <img src={logo} alt="Venbuk Logo" className={styles.longLogoIcon} />
    </div>
  );
}

export default LongLogo;
