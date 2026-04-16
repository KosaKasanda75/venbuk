import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SettingsList.module.css";

function SettingsItem({ item }) {
  const navigate = useNavigate();

  return (
    <li
      className={`${styles.settingsItem} ${styles.settingsLinks}`}
      key={item}
      onClick={() => {
        if (item !== "account") navigate(item.replaceAll(" ", "-"));
      }}
    >
      {item === "account" && (
        <NavLink
          to="/account"
          className={`${styles.settingsItemName} ${styles.navlink}`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </NavLink>
      )}
      {item !== "account" && (
        <NavLink
          to={item}
          className={`${styles.settingsItemName} ${styles.navlink}`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </NavLink>
      )}
      {/* <div className={styles.settingsItemName}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </div> */}
    </li>
  );
}

export default SettingsItem;
