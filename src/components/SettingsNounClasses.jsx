import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import SettingsItemMeta from "./SettingsItemMeta";
import useDictionary from "../hooks/useDictionary";
// import AddNounClass from "./AddNounClass";
import AddMetadataItem from "./AddMetadataItem";

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
  const [nounInfo, setNounInfo] = useState(null);
  const { nounClasses, createMetadata, updateMetadata, deleteMetadata } =
    useDictionary();

  function handleAdd() {
    setViewMode(false);
  }

  function handleEdit(nounObj) {
    setNounInfo(nounObj);
    setViewMode(false);
  }

  function handleCreate(body) {
    // Requires a refetch of noun classes
    createMetadata("nounClasses", body);
    handleCancel();
  }

  function handleUpdate(nounId, body) {
    // Requires a refetch of noun classes
    updateMetadata("nounClasses", nounId, body);
    handleCancel();
  }

  function handleDelete(nounId) {
    // Requires a refetch of noun classes
    deleteMetadata("nounClasses", nounId);
    handleCancel();
  }

  function handleCancel() {
    setViewMode(true);
    setNounInfo(null);
  }

  return (
    <>
      {viewMode && (
        <SettingsList
          title={settingsOptions.title}
          previousPage={{
            title: "Conjugation",
            path: "/settings/conjugation",
          }}
          options={settingsOptions.options}
          editMode={editMode}
          setEditMode={setEditMode}
          toAddPage={handleAdd}
        >
          <ul className={styles.settingsItemList}>
            {nounClasses.sort().map((item) => (
              <SettingsItemMeta
                key={item}
                item={item}
                editMode={editMode}
                toEditPage={() => handleEdit(item.id)}
                description={true}
              />
            ))}
          </ul>
        </SettingsList>
      )}
      {/* {!viewMode && (
        <AddNounClass
          nounInfo={nounInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )} */}
      {!viewMode && (
        <AddMetadataItem
          metaInfo={nounInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default SettingsNounClasses;
