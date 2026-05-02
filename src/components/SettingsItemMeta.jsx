import { TbPencilMinus } from "react-icons/tb";
import styles from "./SettingsList.module.css";

function SettingsItemMeta({ item, editMode, toEditPage, description }) {
  return (
    <li className={styles.settingsItem} key={item.id}>
      <div>
        <p className={styles.settingsItemName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </p>
        {description && (
          <p className={styles.settingsItemDescription}>
            {item.concord && <strong>{item.concord}: </strong>}
            {item.description}
          </p>
        )}
      </div>
      {editMode && (
        <TbPencilMinus className={styles.editIcon} onClick={toEditPage} />
      )}
    </li>
  );
}

export default SettingsItemMeta;
