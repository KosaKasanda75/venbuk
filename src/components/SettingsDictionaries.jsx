import styles from "./SettingsList.module.css";
import { useState } from "react";
import SettingsList from "./SettingsList";
import AddDictionary from "./AddDictionary";
import SettingsItemDictionary from "./SettingsItemDictionary";
import useDictionary from "../hooks/useDictionary";
import LoadingContent from "./LoadingContent";
import { IoMdRefresh } from "react-icons/io";

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
  const [dictionaryInfo, setDictionaryInfo] = useState(null);
  const {
    dictionaryList,
    dictionaryLoading,
    createDictionary,
    getDictionaryInfo,
    getDictionaryList,
    updateDictionary,
    deleteDictionary,
  } = useDictionary();

  function handleAdd() {
    setViewMode(false);
  }

  async function handleEdit(dictionaryId) {
    const dictionaryObj = await getDictionaryInfo(dictionaryId);
    setDictionaryInfo(dictionaryObj);
    setViewMode(false);
  }

  function handleCreate(body) {
    createDictionary(body);
    handleCancel();
  }

  function handleUpdate(dictionaryId, body) {
    updateDictionary(dictionaryId, body);
    handleCancel();
  }

  function handleDelete(dictionaryId) {
    deleteDictionary(dictionaryId);
    handleCancel();
  }

  function handleCancel() {
    setViewMode(true);
    setDictionaryInfo(null);
  }

  return (
    <>
      {viewMode && (
        <>
          <IoMdRefresh className={styles.icon} onClick={getDictionaryList} />
          <SettingsList
            title={settingsOptions.title}
            previousPage="Settings & Help"
            options={settingsOptions.options}
            editMode={editMode}
            setEditMode={setEditMode}
            toAddPage={handleAdd}
          >
            <ul className={styles.settingsItemList}>
              {dictionaryList?.sort().map((item) => (
                <SettingsItemDictionary
                  key={item.id}
                  item={item}
                  editMode={editMode}
                  toEditPage={() => handleEdit(item.id)}
                  description={true}
                />
              ))}
            </ul>
          </SettingsList>
        </>
      )}
      {!viewMode && (
        <AddDictionary
          dictionaryInfo={dictionaryInfo}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      {dictionaryLoading && <LoadingContent />}
    </>
  );
}

export default SettingsDictionaries;
