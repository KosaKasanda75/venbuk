import Button from "./Button";
import NewConjugationPlurality from "./NewConjugationPlurality";
import styles from "./NewWordForm.module.css";

function NewConjugationTense({ btnType }) {
  return (
    <>
      <div className={styles.oneLineField}>
        <label>Tense</label>
        <div className={styles.oneLineTextBox}>
          <input className={styles.autocompletedTextBox} type="text" />
          {/* <ul className={styles.autocompleteOptions}></ul> */}
        </div>
      </div>

      <NewConjugationPlurality btnType={btnType} />

      <Button type={btnType}>Add Tense</Button>
    </>
  );
}

export default NewConjugationTense;
