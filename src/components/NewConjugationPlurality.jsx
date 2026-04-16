import Button from "./Button";
import NewConjugationGender from "./NewConjugationGender";
import styles from "./NewWordForm.module.css";

function NewConjugationPlurality({ btnType }) {
  return (
    <>
      <div className={styles.oneLineField}>
        <label>Plurality</label>
        <select>
          <option value={1}>1</option>
        </select>
      </div>

      <NewConjugationGender btnType={btnType} />

      <Button type={btnType}>Add Plurality</Button>
    </>
  );
}

export default NewConjugationPlurality;
