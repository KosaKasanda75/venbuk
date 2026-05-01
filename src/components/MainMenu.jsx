import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import useDictionary from "../hooks/useDictionary";
import {
  HiBookOpen,
  HiCog6Tooth,
  HiOutlineBookOpen,
  HiOutlineCog6Tooth,
  HiOutlinePencilSquare,
  HiPencilSquare,
} from "react-icons/hi2";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { IoGameController, IoGameControllerOutline } from "react-icons/io5";

function MainMenu() {
  const { memberRole } = useDictionary();
  return (
    <div className={styles.menuBox}>
      <ul className={styles.menuList}>
        {memberRole !== "viewer" && (
          <li className={styles.menuItem}>
            <NavLink to="/add-entry">
              {({ isActive }) =>
                isActive ? (
                  <HiPencilSquare className={styles.selectedIcon} />
                ) : (
                  <HiOutlinePencilSquare className={styles.icon} />
                )
              }
            </NavLink>
          </li>
        )}
        {/* <li className={styles.menuItem}>
          <NavLink to="/learning">
            {({ isActive }) =>
              isActive ? (
                <HiBookOpen className={styles.selectedIcon} />
              ) : (
                <HiOutlineBookOpen className={styles.icon} />
              )
            }
          </NavLink>
        </li> */}
        <li className={styles.menuItem}>
          <NavLink to="/search">
            {({ isActive }) =>
              isActive ? (
                <PiMagnifyingGlassFill className={styles.selectedIcon} />
              ) : (
                <PiMagnifyingGlassBold className={styles.icon} />
              )
            }
          </NavLink>
        </li>
        {/* <li className={styles.menuItem}>
          <NavLink to="/games">
            {({ isActive }) =>
              isActive ? (
                <IoGameController className={styles.selectedIcon} />
              ) : (
                <IoGameControllerOutline className={styles.icon} />
              )
            }
          </NavLink>
        </li> */}
        <li className={styles.menuItem}>
          <NavLink to="/settings">
            {({ isActive }) =>
              isActive ? (
                <HiCog6Tooth className={styles.selectedIcon} />
              ) : (
                <HiOutlineCog6Tooth className={styles.icon} />
              )
            }
          </NavLink>
        </li>
      </ul>
      {/* <div className={styles.extraSpace}></div> */}
    </div>
  );
}

export default MainMenu;
