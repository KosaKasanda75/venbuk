import { NavLink } from "react-router-dom";
import styles from "./SettingsList.module.css";

function SettingsItem({ item }) {
  const label = item.charAt(0).toUpperCase() + item.slice(1);

  if (item === "privacy policy") {
    return (
      <li className={`${styles.settingsItem} ${styles.settingsLinks}`}>
        <a
          href="/privacy-policy.html"
          className={`${styles.settingsItemName} ${styles.navlink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </li>
    );
  }

  const to = item === "account" ? "/account" : item.replaceAll(" ", "-");

  return (
    <li className={`${styles.settingsItem} ${styles.settingsLinks}`}>
      <NavLink to={to} className={`${styles.settingsItemName} ${styles.navlink}`}>
        {label}
      </NavLink>
    </li>
  );
}

export default SettingsItem;
