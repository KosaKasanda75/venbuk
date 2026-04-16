import Button from "./Button";
import styles from "./NewWordForm.module.css";

function NewConjugationFormality({ btnType }) {
  return (
    <>
      <div className={styles.oneLineField}>
        <label>Formality</label>
        <select>
          <option value={1}>1</option>
        </select>
      </div>

      <div>
        <label for="rootWordText">Conjugated Word</label>
        <br />
        <input
          className={styles.smallerTextBox}
          type="text"
          id="rootWordText"
        />
      </div>

      <Button type={btnType}>Add Formality</Button>
    </>
  );
}

export default NewConjugationFormality;
