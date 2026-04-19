import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import SettingsItemMeta from "./SettingsItemMeta";
import useDictionary from "../hooks/useDictionary";
// import AddTag from "./AddTag";
import AddMetadataItem from "./AddMetadataItem";

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
  const [tagInfo, setTagInfo] = useState(null);
  const { tags, createMetadata, updateMetadata, deleteMetadata } =
    useDictionary();

  function handleAdd() {
    setViewMode(false);
  }

  function handleEdit(tagObj) {
    setTagInfo(tagObj);
    setViewMode(false);
  }

  function handleCreate(body) {
    // Requires a refetch of tags
    createMetadata("tags", body);
    handleCancel();
  }

  function handleUpdate(tagId, body) {
    // Requires a refetch of tags
    updateMetadata("tags", tagId, body);
    handleCancel();
  }

  function handleDelete(tagId) {
    // Requires a refetch of dictionaries
    deleteMetadata("tags", tagId);
    handleCancel();
  }

  function handleCancel() {
    setViewMode(true);
    setTagInfo(null);
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
            {tags.sort().map((item) => (
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
        <AddTag
          tagInfo={tagInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )} */}
      {!viewMode && (
        <AddMetadataItem
          metaInfo={tagInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default SettingsTag;
