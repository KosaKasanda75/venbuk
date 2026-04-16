import {
  BookOpenIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import { IoGameControllerOutline } from "react-icons/io5";

function MainMenu() {
  return (
    <div className={styles.menuBox}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <NavLink to="/add-entry">
            <PencilSquareIcon className={styles.icon} />
          </NavLink>
        </li>
        {/* <li className={styles.menuItem}>
          <NavLink to="/learning">
            <BookOpenIcon className={styles.icon} />
          </NavLink>
        </li> */}
        <li className={styles.menuItem}>
          <NavLink to="/search">
            <MagnifyingGlassIcon className={styles.icon} />
          </NavLink>
        </li>
        {/* <li className={styles.menuItem}>
          <NavLink to="/games">
            <IoGameControllerOutline className={styles.icon} />
          </NavLink>
        </li> */}
        <li className={styles.menuItem}>
          <NavLink to="/settings">
            <Cog8ToothIcon className={styles.icon} />
          </NavLink>
        </li>
      </ul>
      <div className={styles.extraSpace}></div>
    </div>
  );
}

export default MainMenu;
