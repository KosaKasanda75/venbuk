import NewConjugationTense from "./NewConjugationTense";
import styles from "./NewWordForm.module.css";

function NewConjugationForm() {
  return (
    <form className={styles.formBox}>
      <div>
        <label for="rootWordText">Root Word/Infinitve</label>
        <br />
        <input
          className={styles.smallerTextBox}
          type="text"
          id="rootWordText"
        />
      </div>

      <div className={styles.oneLineField}>
        <label for="identifierType">Identifier</label>
        <select id="identifierType">
          <option value={1}>1</option>
        </select>
        <input
          className={styles.smallerTextBox}
          type="text"
          id="identifierId"
        />
      </div>

      <NewConjugationTense btnType="addMore" />
    </form>
  );
}

export default NewConjugationForm;
