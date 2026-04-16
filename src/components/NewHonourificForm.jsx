import styles from "./NewWordForm.module.css";

function NewHonorificForm() {
  return (
    <form className={styles.formBox}>
      <div className={styles.oneLineField}>
        <label for="honorificTextInput">Honorific</label>
        <input
          className={styles.oneLineTextBox}
          type="text"
          id="honorificTextInput"
        />
      </div>

      <div className={styles.oneLineField}>
        <label for="honorificPositionSelect">Placement</label>
        <select id="honorificPositionSelect">
          <option value={1}>1</option>
        </select>
      </div>

      <div>
        <label for="honorificDescription">Significance</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="honorificDescription"
        />
      </div>

      <div>
        <label for="honorificExampleUse">Example Use</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="honorificExampleUse"
        />
      </div>
    </form>
  );
}

export default NewHonorificForm;
