import Button from "./Button";
import NewConjugationPerson from "./NewConjugationPerson";
import styles from "./NewWordForm.module.css";

function NewConjugationGender({ btnType }) {
  return (
    <>
      <div className={styles.oneLineField}>
        <label>Gender</label>
        <select>
          <option value={1}>1</option>
        </select>
      </div>

      <NewConjugationPerson btnType={btnType} />

      <Button type={btnType}>Add Gender</Button>
    </>
  );
}

export default NewConjugationGender;
