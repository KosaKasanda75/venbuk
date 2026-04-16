import Button from "./Button";
import styles from "./MetadataDetails.module.css";
import RequiredTag from "./RequiredTag";

function AddDictionary({
  dictionaryInfo,
  onCreate,
  onUpdate,
  onCancel,
  onDelete,
}) {
  return (
    <div>
      {!dictionaryInfo && <h1>Add Tag</h1>}
      {dictionaryInfo && <h1>Edit Tag</h1>}
      <form className={styles.formBox}>
        <div className={styles.formSection}>
          <label>
            Name
            <RequiredTag />
          </label>
          <br />
          <input className={styles.fullLineTextBox} type="text" />
        </div>

        <div className={styles.formSection}>
          <label>Language</label>
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
        {dictionaryInfo && <Button onClick={onUpdate}>Save Update</Button>}
        {!dictionaryInfo && <Button onClick={onCreate}>Create</Button>}
      </div>
      {dictionaryInfo && (
        <Button type="delete" onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default AddDictionary;
