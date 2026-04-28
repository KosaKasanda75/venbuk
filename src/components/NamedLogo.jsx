import styles from "./Logo.module.css";
import logo from "../assets/Icon_with_Name.svg";

function NamedLogo() {
  return (
    <div className={styles.logoBox}>
      <img src={logo} alt="Venbuk Logo" className={styles.logoIcon} />
    </div>
  );
}

export default NamedLogo;
