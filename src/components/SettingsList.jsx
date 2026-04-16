import styles from "./SettingsList.module.css";
import BackButton from "./BackButton";
import Button from "./Button";

// Options
//  links => Lead to another settings menu?
//  add => Show add button?
//  edit => Show edit button?
//  description => Show menu item description?
//  editPage => Function leading to edit page
//  addPage => Function leading to add page

function SettingsList({
  title,
  previousPage,
  options,
  editMode,
  setEditMode,
  toAddPage,
  children,
}) {
  return (
    <div className={styles.settingsBox}>
      {previousPage && <BackButton />}

      <h1 className={`${styles.settingsTitle}`}>{title}</h1>

      <div className={styles.settingsButtons}>
        {options.add && !editMode && (
          <Button type="subtle" onClick={toAddPage}>
            Add
          </Button>
        )}
        {options.edit && (
          <Button type="subtle" onClick={() => setEditMode((mode) => !mode)}>
            {editMode ? "Cancel" : "Edit"}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

export default SettingsList;
