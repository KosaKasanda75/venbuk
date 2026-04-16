import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredTag from "./RequiredTag";

function AddNounClass({ nounInfo, onCreate, onUpdate, onCancel, onDelete }) {
  return (
    <div>
      {!nounInfo && <h1>Add Noun Class</h1>}
      {nounInfo && <h1>Edit Noun Class</h1>}
      <form className={styles.formBox}>
        <div className={styles.formSection}>
          <label>
            Name
            <RequiredTag />
          </label>
          <br />
          <input className={styles.fullLineTextBox} type="text" />
        </div>

        <div>
          <label>Description</label>
          <br />
          <input className={styles.largeTextBox} type="text" />
        </div>
      </form>
      <div className={styles.buttonBox}>
        <Button type="subtle" onClick={onCancel}>
          Cancel
        </Button>
        {nounInfo && <Button onClick={onUpdate}>Save Update</Button>}
        {!nounInfo && <Button onClick={onCreate}>Create</Button>}
      </div>
      {nounInfo && (
        <Button type="delete" onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddNounClass;
