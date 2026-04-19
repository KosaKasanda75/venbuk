import { useState } from "react";
import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";

function AddTag({ tagInfo, onCreate, onUpdate, onCancel, onDelete }) {
  const [name, setName] = useState(tagInfo ? tagInfo.name : "");
  const [description, setDescription] = useState(
    tagInfo ? tagInfo.description : "",
  );

  return (
    <div>
      {!tagInfo && <h1>Add Tag</h1>}
      {tagInfo && <h1>Edit Tag</h1>}
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
        {tagInfo && (
          <Button onClick={() => onUpdate(tagInfo.id, { name, description })}>
            Save Update
          </Button>
        )}
        {!tagInfo && (
          <Button onClick={() => onCreate({ name, description })}>
            Create
          </Button>
        )}
      </div>
      {tagInfo && (
        <Button type="delete" onClick={() => onDelete(tagInfo.id)}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddTag;
