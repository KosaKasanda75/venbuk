import { useState } from "react";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";

function AddNounClass({ nounInfo, onCreate, onUpdate, onCancel, onDelete }) {
  const [name, setName] = useState(nounInfo ? nounInfo.name : "");
  const [concord, setConcord] = useState(nounInfo ? nounInfo.concord : "");
  const [description, setDescription] = useState(
    nounInfo ? nounInfo.description : "",
  );
  const [showConfirm, setShowConfirm] = useState(false);

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

        <div className={styles.formSection}>
          <label>Concord</label>
          <br />
          <input
            className={styles.fullLineTextBox}
            type="text"
            id="concord"
            value={concord}
            onChange={(e) => setConcord(e.target.value.toLowerCase())}
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
          <Button
            onClick={() =>
              onUpdate(nounInfo.id, { name, concord, description })
            }
          >
            Save Update
          </Button>
        )}
        {!nounInfo && (
          <Button onClick={() => onCreate({ name, concord, description })}>
            Create
          </Button>
        )}
      </div>
      {nounInfo && (
        <Button type="delete" onClick={() => setShowConfirm(true)}>
          Delete
        </Button>
      )}
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete this noun class?"
          onConfirm={() => onDelete(nounInfo.id)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default AddNounClass;
