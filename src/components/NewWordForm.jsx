import { RxCross2 } from "react-icons/rx";
import styles from "./NewWordForm.module.css";

function NewWordForm() {
  return (
    <form className={styles.formBox}>
      <div className={styles.oneLineField}>
        <label for="wordTextInput">Word</label>
        <input
          className={styles.oneLineTextBox}
          type="text"
          id="wordTextInput"
        />
      </div>

      <div>
        <label for="wordDescription">Description</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="wordDescription"
        />
      </div>

      <div>
        <label for="wordExampleUse">Example Sentence</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="wordExampleUse"
        />
      </div>

      <div className={styles.oneLineField}>
        <label for="wordClassSelect">Type</label>
        <select id="wordClassSelect">
          <option value={1}>1</option>
        </select>
      </div>

      <div className={styles.oneLineField}>
        <label for="nounClassSelect">Class</label>
        <select id="nounClassSelect">
          <option value={1}>1</option>
        </select>
      </div>

      <div className={styles.oneLineField}>
        <label for="genderSelect">Gender</label>
        <select id="genderSelect">
          <option value={1}>1</option>
        </select>
      </div>

      <div className={styles.oneLineField}>
        <label for="wordTagInput">Tags</label>
        <div className={styles.oneLineTextBox}>
          <input
            className={styles.autocompletedTextBox}
            type="text"
            id="wordTagInput"
          />
          {/* <ul className={styles.autocompleteOptions}></ul> */}
        </div>
      </div>
      <ul className={styles.selectedTags}>
        <li>
          <p className={styles.tagText}>Tag</p>
          <RxCross2 className={styles.tagIcon} />
        </li>
      </ul>
    </form>
  );
}

export default NewWordForm;
