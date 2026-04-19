import { useState } from "react";
import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";

function AddDictionary({
  dictionaryInfo,
  onCreate,
  onUpdate,
  onCancel,
  onDelete,
}) {
  const [name, setName] = useState(dictionaryInfo ? dictionaryInfo.name : "");
  const [description, setDescription] = useState(
    dictionaryInfo ? dictionaryInfo.description : "",
  );

  return (
    <div>
      {!dictionaryInfo && <h1>Add Tag</h1>}
      {dictionaryInfo && <h1>Edit Tag</h1>}
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

        <div>
          <label>Description</label>
          <br />
          <input
            className={styles.largeTextBox}
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
      <div className={styles.buttonBox}>
        <Button type="subtle" onClick={onCancel}>
          Cancel
        </Button>
        {dictionaryInfo && (
          <Button
            onClick={() => onUpdate(dictionaryInfo.id, { name, description })}
          >
            Save Update
          </Button>
        )}
        {!dictionaryInfo && (
          <Button onClick={() => onCreate({ name, description })}>
            Create
          </Button>
        )}
      </div>
      {dictionaryInfo && (
        <Button type="delete" onClick={() => onDelete(dictionaryInfo.id)}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddDictionary;
