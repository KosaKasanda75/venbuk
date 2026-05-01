import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import useEnum from "../hooks/useEnum";

function AddDictionary({
  dictionaryInfo,
  onCreate,
  onUpdate,
  onCancel,
  onDelete,
}) {
  const [name, setName] = useState(dictionaryInfo ? dictionaryInfo.name : "");
  const [showConfirm, setShowConfirm] = useState(false);
  const [description, setDescription] = useState(
    dictionaryInfo ? dictionaryInfo.description : "",
  );
  const [memberQuery, setMemberQuery] = useState("");
  const [usernameList, setUsernameList] = useState([]);
  const [members, setMembers] = useState(
    dictionaryInfo?.members?.map((m) => ({
      user_id: m.user_id,
      username: m.username,
      role: m.role,
    })) ?? [],
  );
  const { memberRoles } = useEnum();

  useEffect(
    function () {
      async function searchUsernames() {
        try {
          const res = await apiFetch(
            `/users/usernames?q=${memberQuery}`,
            GetOptions,
          );
          if (!res.ok) return;
          const data = await res.json();
          setUsernameList(data);
        } catch (fetchError) {
          console.log(fetchError);
        }
      }
      if (memberQuery) searchUsernames();
    },
    [memberQuery],
  );

  function addMember(user) {
    if (members.some((m) => m.user_id === user.id)) return;
    setMembers((prev) => [
      ...prev,
      { user_id: user.id, username: user.username, role: memberRoles?.[0] ?? "" },
    ]);
    setMemberQuery("");
  }

  function updateMemberRole(user_id, role) {
    setMembers((prev) =>
      prev.map((m) => (m.user_id === user_id ? { ...m, role } : m)),
    );
  }

  function removeMember(user_id) {
    setMembers((prev) => prev.filter((m) => m.user_id !== user_id));
  }

  return (
    <div>
      {!dictionaryInfo && <h1>Add Deictionary</h1>}
      {dictionaryInfo && <h1>Edit Deictionary</h1>}
      <form className={styles.formBox}>
        <div className={styles.formSection}>
          <label>
            Name
            <RequiredField />
          </label>
          <br />
          <input
            className={styles.fullLineTextBox}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formSection}>
          <label>Description</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="description"
            rows={LARGE_TEXT_AREA_ROWS}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.formSection}>
          <label>Collaborators</label>
          <br />
          <div className={styles.autocompleteWrapper}>
            <input
              className={styles.fullLineTextBox}
              type="text"
              value={memberQuery}
              onChange={(e) => setMemberQuery(e.target.value)}
            />
            {memberQuery && usernameList.length > 0 && (
              <ul className={styles.autocompleteOptions}>
                {usernameList
                  .filter(
                    (u) => !members.some((m) => m.user_id === u.id),
                  )
                  .map((u) => (
                    <li key={u.id} onClick={() => addMember(u)}>
                      {u.username}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <ul className={styles.memberList}>
            {members.map((member) => (
              <li key={member.user_id} className={styles.memberRow}>
                <span className={styles.memberUsername}>{member.username}</span>
                <select
                  value={member.role}
                  onChange={(e) =>
                    updateMemberRole(member.user_id, e.target.value)
                  }
                >
                  {memberRoles?.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <RxCross2
                  className={styles.removeIcon}
                  onClick={() => removeMember(member.user_id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </form>
      <div className={styles.buttonBox}>
        <Button type="subtle" onClick={onCancel}>
          Cancel
        </Button>
        {dictionaryInfo && (
          <Button
            onClick={() =>
              onUpdate(dictionaryInfo.id, { name, description }, members.map(({ user_id, role }) => ({ user_id, role })))
            }
          >
            Save Update
          </Button>
        )}
        {!dictionaryInfo && (
          <Button onClick={() => onCreate({ name, description }, members.map(({ user_id, role }) => ({ user_id, role })))}>
            Create
          </Button>
        )}
      </div>
      {dictionaryInfo && onDelete && (
        <Button type="delete" onClick={() => setShowConfirm(true)}>
          Delete
        </Button>
      )}
      {dictionaryInfo && onDelete && showConfirm && (
        <Confirm
          message="Are you sure you want to delete this dictionary? This action cannot be undone."
          onConfirm={() => onDelete(dictionaryInfo.id)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default AddDictionary;
