import styles from "./SettingsList.module.css";
import Button from "./Button";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function SettingsItemDictionary({ item }) {
  const { dictionary, getDictionary } = useDictionary();
  const navigate = useNavigate();

  return (
    <li className={styles.settingsItem} key={item.id}>
      <div
        className={`${styles.settingsItemName} ${styles.settingsItemLink}`}
        onClick={() => navigate(`/dictionaries/${item.id}`)}
      >
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </div>
      {item.id !== dictionary?.id && (
        <Button onClick={() => getDictionary(item.id)}>Activate</Button>
      )}
      {item.id === dictionary?.id && <p>Active</p>}
    </li>
  );
}

export default SettingsItemDictionary;
