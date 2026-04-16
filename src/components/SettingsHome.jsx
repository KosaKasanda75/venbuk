import styles from "./SettingsList.module.css";
import SettingsItem from "./SettingsItem";
import SettingsList from "./SettingsList";
import { useState } from "react";

const settingsOptions = {
  title: "Settings & Help",
  settingsList: [
    "account",
    "dictionaries",
    "tags",
    "conjugation",
    "terminology",
    "app info",
    "privacy policy",
  ],
  options: {
    add: false,
    edit: false,
  },
};

function SettingsHome() {
  const [editMode, setEditMode] = useState(false);

  return (
    <SettingsList
      title={settingsOptions.title}
      options={settingsOptions.options}
      editMode={editMode}
      setEditMode={setEditMode}
    >
      <ul className={styles.settingsItemList}>
        {settingsOptions.settingsList.map((item) => (
          <SettingsItem key={item} item={item} />
        ))}
      </ul>
    </SettingsList>
  );
}

export default SettingsHome;
