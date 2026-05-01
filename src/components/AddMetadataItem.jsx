import { useState } from "react";
import Button from "./Button";
import Confirm from "./Confirm";
import styles from "./MetadataDetails.module.css";
import RequiredField from "./RequiredField";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";

function AddMetadataItem({ metaInfo, onCreate, onUpdate, onCancel, onDelete }) {
  const [name, setName] = useState(metaInfo ? metaInfo.name : "");
  const [description, setDescription] = useState(
    metaInfo ? metaInfo.description : "",
  );
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      {!metaInfo && <h1>Add Tag</h1>}
      {metaInfo && <h1>Edit Tag</h1>}
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
        {metaInfo && (
          <Button onClick={() => onUpdate(metaInfo.id, { name, description })}>
            Save Update
          </Button>
        )}
        {!metaInfo && (
          <Button onClick={() => onCreate({ name, description })}>
            Create
          </Button>
        )}
      </div>
      {metaInfo && (
        <Button type="delete" onClick={() => setShowConfirm(true)}>
          Delete
        </Button>
      )}
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete this item?"
          onConfirm={() => onDelete(metaInfo.id)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default AddMetadataItem;
