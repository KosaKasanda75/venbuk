import SettingsItem from "./SettingsItem";
import SettingsList from "./SettingsList";
import styles from "./SettingsList.module.css";

const settingsOptions = {
  title: "Terminology",
  //   settingsList: ["word classes", "honorifics", "noun classes", "tenses"],
  settingsList: ["word classes", "noun classes", "tenses"],
  options: {
    add: false,
    edit: false,
  },
};

function SettingsTerminology() {
  return (
    <SettingsList
      title={settingsOptions.title}
      previousPage={{
        title: "Settings & Help",
        path: "/settings",
      }}
      settingsList={settingsOptions.settingsList}
      options={settingsOptions.options}
    >
      <ul className={styles.settingsItemList}>
        {settingsOptions.settingsList.map((item) => (
          <SettingsItem key={item} item={item} />
        ))}
      </ul>
    </SettingsList>
  );
}

export default SettingsTerminology;
