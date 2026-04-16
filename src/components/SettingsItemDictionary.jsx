import { TbPencilMinus } from "react-icons/tb";
import styles from "./SettingsList.module.css";
import Button from "./Button";

function SettingsItemDictionary({ item, editMode, toEditPage }) {
  return (
    <li className={styles.settingsItem} key={item}>
      <div className={styles.settingsItemName}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
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
      {!editMode && item !== "Swahili" && <Button>Activate</Button>}
      {!editMode && item === "Swahili" && <p>Active</p>}
    </li>
  );
}

export default SettingsItemDictionary;
