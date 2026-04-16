import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import AddDictionary from "./AddDictionary";
import SettingsItemDictionary from "./SettingsItemDictionary";

const settingsOptions = {
  title: "Dictionaries",
  settingsList: ["Bemba", "Venda", "Tonga", "Swahili"],
  options: {
    links: false,
    add: true,
    edit: true,
    description: false,
    activeBtn: true,
    editPage: null,
    addPage: null,
  },
};

function SettingsDictionaries() {
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
    // Requires a refetch of dictionaries
  }

  function handleUpdate() {
    // Requires a refetch of dictionaries
  }

  function handleCancel() {
    setViewMode(true);
  }

  function handleDelete() {
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
              <SettingsItemDictionary
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
        <AddDictionary
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default SettingsDictionaries;
