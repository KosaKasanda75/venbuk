import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import AddTag from "./AddTag";
import SettingsItemMeta from "./SettingsItemMeta";

const settingsOptions = {
  title: "Tags",
  settingsList: ["Body", "Greeting", "House", "Family", "Jobs"],
  options: {
    add: true,
    edit: true,
  },
};

function SettingsTag() {
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  function handleAdd() {
    setViewMode(false);
  }

  function handleEdit(tagObj) {
    setViewMode(false);
    if (!tagObj) return;
  }

  function handleCreate() {
    // Requires a refetch of tags
  }

  function handleUpdate() {
    // Requires a refetch of tags
  }

  function handleCancel() {
    setViewMode(true);
  }

  function handleDelete() {
    // Requires a refetch of dictionaries
    setViewMode(true);
  }

  return (
    <>
      {viewMode && (
        <SettingsList
          title={settingsOptions.title}
          previousPage="Settings & Help"
          options={settingsOptions.options}
          editMode={editMode}
          setEditMode={setEditMode}
          toAddPage={handleAdd}
        >
          <ul className={styles.settingsItemList}>
            {settingsOptions.settingsList.sort().map((item) => (
              <SettingsItemMeta
                key={item}
                item={item}
                editMode={editMode}
                toEditPage={handleEdit}
                description={true}
              />
            ))}
          </ul>
        </SettingsList>
      )}
      {!viewMode && (
        <AddTag
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default SettingsTag;
