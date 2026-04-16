import { TbPencilMinus } from "react-icons/tb";
import styles from "./SettingsList.module.css";

function SettingsItemMeta({ item, editMode, toEditPage, description }) {
  return (
    <li className={styles.settingsItem} key={item}>
      <div>
        <p className={styles.settingsItemName}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </p>
        {description && (
          <p className={styles.settingsItemDescription}>
            This is the associated description of this tag for your info
          </p>
        )}
      </div>
      {editMode && (
        <TbPencilMinus
          className={styles.editIcon}
          onClick={() => {
            toEditPage(item);
            // This function should be editPage(item){1) set some context variable on edit page 2)navigate to appropriate edit page}
          }}
        />
      )}
    </li>
  );
}

export default SettingsItemMeta;
