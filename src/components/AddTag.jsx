import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredTag from "./RequiredTag";

function AddTag({ tagInfo, onCreate, onUpdate, onCancel, onDelete }) {
  return (
    <div>
      {!tagInfo && <h1>Add Tag</h1>}
      {tagInfo && <h1>Edit Tag</h1>}
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
        {tagInfo && <Button onClick={onUpdate}>Save Update</Button>}
        {!tagInfo && <Button onClick={onCreate}>Create</Button>}
      </div>
      {tagInfo && (
        <Button type="delete" onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddTag;
