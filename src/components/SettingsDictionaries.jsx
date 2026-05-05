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
    edit: false,
    description: false,
    activeBtn: true,
    editPage: null,
    addPage: null,
  },
};

function SettingsDictionaries() {
  const [viewMode, setViewMode] = useState(true);
  const {
    dictionaryList,
    dictionaryLoading,
    createDictionary,
    // getDictionaryList,
    inviteMembers,
  } = useDictionary();

  function handleAdd() {
    setViewMode(false);
  }

  async function handleCreate(body, members) {
    const newDictionary = await createDictionary(body);
    if (newDictionary && members.length > 0)
      await inviteMembers(newDictionary.id, members);
    handleCancel();
  }

  function handleCancel() {
    setViewMode(true);
  }

  return (
    <>
      {viewMode && (
        <>
          {/* <IoMdRefresh className={styles.icon} onClick={getDictionaryList} /> */}
          <SettingsList
            title={settingsOptions.title}
            previousPage={{
              title: "Settings & Help",
              path: "/settings",
            }}
            options={settingsOptions.options}
            toAddPage={handleAdd}
          >
            <ul className={styles.settingsItemList}>
              {dictionaryList?.sort().map((item) => (
                <SettingsItemDictionary key={item.id} item={item} />
              ))}
            </ul>
          </SettingsList>
        </>
      )}
      {!viewMode && (
        <AddDictionary onCreate={handleCreate} onCancel={handleCancel} />
      )}
      {dictionaryLoading && <LoadingContent />}
    </>
  );
}

export default SettingsDictionaries;
