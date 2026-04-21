import { TbPencilMinus } from "react-icons/tb";
import styles from "./SettingsList.module.css";
import Button from "./Button";
import useDictionary from "../hooks/useDictionary";

function SettingsItemDictionary({ item, editMode, toEditPage }) {
  const { dictionary, getDictionary } = useDictionary();
  console.log(item);
  console.log(dictionary);
  return (
    <li className={styles.settingsItem} key={item.id}>
      <div className={styles.settingsItemName}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </div>
      {editMode && (
        <TbPencilMinus
          className={styles.editIcon}
          onClick={() => {
            toEditPage(item.name);
            // This function should be editPage(item){1) set some context variable on edit page 2)navigate to appropriate edit page}
          }}
        />
      )}
      {!editMode && item.id !== dictionary?.id && (
        <Button onClick={() => getDictionary(item.id)}>Activate</Button>
      )}
      {!editMode && item.id === dictionary?.id && <p>Active</p>}
    </li>
  );
}

export default SettingsItemDictionary;
