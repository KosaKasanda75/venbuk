import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TbPencilMinus } from "react-icons/tb";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import DictionaryDetails from "../components/DictionaryDetails";
import AddDictionary from "../components/AddDictionary";
import useDictionary from "../hooks/useDictionary";

function Dictionary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getDictionaryInfo,
    updateDictionary,
    deleteDictionary,
    inviteMembers,
    updateMemberRole,
    removeMember,
    memberRole,
  } = useDictionary();

  const [dictionaryInfo, setDictionaryInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(
    function () {
      async function loadDictionary() {
        const data = await getDictionaryInfo(id);
        setDictionaryInfo(data);
      }
      loadDictionary();
    },
    [id, getDictionaryInfo],
  );

  async function handleUpdate(dictionaryId, body, members) {
    const oldMembers = dictionaryInfo?.members ?? [];

    const toRemove = oldMembers.filter(
      (old) => !members.some((m) => m.user_id === old.user_id),
    );
    const toInvite = members.filter(
      (m) => !oldMembers.some((old) => old.user_id === m.user_id),
    );
    const toUpdate = members.filter((m) =>
      oldMembers.some(
        (old) => old.user_id === m.user_id && old.role !== m.role,
      ),
    );

    await Promise.all([
      ...toRemove.map((m) => removeMember(dictionaryId, m.user_id)),
      ...toInvite.map((m) =>
        inviteMembers(dictionaryId, [{ user_id: m.user_id, role: m.role }]),
      ),
      ...toUpdate.map((m) => updateMemberRole(dictionaryId, m.user_id, m.role)),
    ]);

    await updateDictionary(dictionaryId, body);

    const updated = await getDictionaryInfo(id);
    setDictionaryInfo(updated);
    setIsEditing(false);
  }

  async function handleDelete(dictionaryId) {
    await deleteDictionary(dictionaryId);
    navigate("/settings/dictionaries");
  }

  return (
    <PageContent menu={<MainMenu />}>
      {!dictionaryInfo && <p>Loading...</p>}
      {dictionaryInfo && !isEditing && (
        <>
          {memberRole !== "viewer" && (
            <TbPencilMinus onClick={() => setIsEditing(true)} />
          )}
          <DictionaryDetails dictionaryInfo={dictionaryInfo} />
        </>
      )}
      {dictionaryInfo && isEditing && (
        <AddDictionary
          dictionaryInfo={dictionaryInfo}
          onUpdate={handleUpdate}
          onDelete={memberRole === "owner" ? handleDelete : undefined}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </PageContent>
  );
}

export default Dictionary;
