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
  const referrer = document.referrer;
  if (referrer) {
    const referrerHostname = new URL(referrer).hostname;
    const currentHostname = window.location.hostname;
    console.log(referrerHostname);
    console.log(currentHostname);

    if (referrerHostname === currentHostname) {
      console.log("The user came from another page on this website.");
    } else {
      console.log("The user came from an external site: " + referrerHostname);
    }
  } else {
    console.log(
      "No referrer found (e.g., direct visit, typed URL, or privacy settings).",
    );
  }
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
