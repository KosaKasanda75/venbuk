import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import SettingsItemMeta from "./SettingsItemMeta";
import useDictionary from "../hooks/useDictionary";
import AddMetadataItem from "./AddMetadataItem";
import AddNounClass from "./AddNounClass";

// const settingsOptions = {
//   title: "Tags",
//   settingsList: ["Body", "Greeting", "House", "Family", "Jobs"],
//   options: {
//     add: true,
//     edit: true,
//   },
// };

const NOUN_CLASSES = "nounClasses";

const camelToTitle = (text) => {
  return (
    text
      // 1. Insert a space before all caps
      .replace(/([A-Z])/g, " $1")
      // 2. Capitalize the first letter
      .replace(/^./, (str) => str.toUpperCase())
      // 3. Remove any leading/trailing whitespace
      .trim()
  );
};

function SettingsMetadata({ metadataTitle, metaList, previousPage }) {
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [metaInfo, setMetaInfo] = useState(null);
  const { createMetadata, updateMetadata, deleteMetadata, memberRole } =
    useDictionary();
  const canEdit = memberRole !== "viewer";
  console.log("list", metaList);

  function handleAdd() {
    setViewMode(false);
  }

  function handleEdit(metaObj) {
    setMetaInfo(metaObj);
    setViewMode(false);
  }

  function handleCreate(body) {
    createMetadata(metadataTitle, body);
    handleCancel();
  }

  function handleUpdate(metaId, body) {
    updateMetadata(metadataTitle, metaId, body);
    handleCancel();
  }

  async function handleDelete(metaId) {
    await deleteMetadata(metadataTitle, metaId);
    handleCancel();
  }

  function handleCancel() {
    setViewMode(true);
    setMetaInfo(null);
  }

  return (
    <>
      {viewMode && (
        <SettingsList
          title={camelToTitle(metadataTitle)}
          previousPage={previousPage}
          options={{ add: canEdit, edit: canEdit }}
          editMode={editMode}
          setEditMode={setEditMode}
          toAddPage={handleAdd}
        >
          <ul className={styles.settingsItemList}>
            {metaList
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <SettingsItemMeta
                  key={item.id}
                  item={item}
                  editMode={editMode}
                  toEditPage={() => handleEdit(item)}
                  description={true}
                />
              ))}
          </ul>
        </SettingsList>
      )}
      {!viewMode && metadataTitle !== NOUN_CLASSES && (
        <AddMetadataItem
          metaInfo={metaInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      {!viewMode && metadataTitle === NOUN_CLASSES && (
        <AddNounClass
          nounInfo={metaInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default SettingsMetadata;
