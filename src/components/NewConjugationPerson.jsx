import Button from "./Button";
import NewConjugationFormality from "./NewConjugationFormality";
import styles from "./NewWordForm.module.css";

function NewConjugationPerson({ btnType }) {
  return (
    <>
      <div className={styles.oneLineField}>
        <label>Person</label>
        <select>
          <option value={1}>1</option>
        </select>
      </div>

      <NewConjugationFormality btnType={btnType} />

      <Button type={btnType}>Add Person</Button>
    </>
  );
}

export default NewConjugationPerson;
