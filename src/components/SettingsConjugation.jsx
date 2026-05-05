import SettingsItem from "./SettingsItem";
import SettingsList from "./SettingsList";
import styles from "./SettingsList.module.css";

const settingsOptions = {
  title: "Conjugation",
  // settingsList: ["identifiers", "tenses", "noun classes", "genders"],
  settingsList: ["tenses", "noun classes", "genders"],
  options: {
    add: false,
    edit: false,
  },
};

function SettingsConjugation() {
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

export default SettingsConjugation;
