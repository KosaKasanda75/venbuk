import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import SettingsItemMeta from "./SettingsItemMeta";
import AddNounClass from "./AddNounClass";

const settingsOptions = {
  title: "Noun Classes",
  settingsList: ["Human", "Tree", "Tool", "Space", "Concepts"],
  options: {
    add: true,
    edit: true,
  },
};

function SettingsNounClasses() {
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
    // Requires a refetch of noun classes
  }

  function handleUpdate() {
    // Requires a refetch of noun classes
  }

  function handleCancel() {
    setViewMode(true);
  }

  function handleDelete() {
    // Requires a refetch of noun classes
    setViewMode(true);
  }

  return (
    <>
      {viewMode && (
        <SettingsList
          title={settingsOptions.title}
          previousPage="Conjugation"
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
        <AddNounClass
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default SettingsNounClasses;
