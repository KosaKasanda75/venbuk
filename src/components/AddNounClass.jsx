import { useState } from "react";
import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";

function AddNounClass({ nounInfo, onCreate, onUpdate, onCancel, onDelete }) {
  const [name, setName] = useState(nounInfo ? nounInfo.name : "");
  const [description, setDescription] = useState(
    nounInfo ? nounInfo.description : "",
  );

  return (
    <div>
      {!nounInfo && <h1>Add Noun Class</h1>}
      {nounInfo && <h1>Edit Noun Class</h1>}
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
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="description"
            rows={LARGE_TEXT_AREA_ROWS}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </form>
      <div className={styles.buttonBox}>
        <Button type="subtle" onClick={onCancel}>
          Cancel
        </Button>
        {nounInfo && (
          <Button onClick={() => onUpdate(nounInfo.id, { name, description })}>
            Save Update
          </Button>
        )}
        {!nounInfo && (
          <Button onClick={() => onCreate({ name, description })}>
            Create
          </Button>
        )}
      </div>
      {nounInfo && (
        <Button type="delete" onClick={() => onDelete(nounInfo.id)}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddNounClass;
