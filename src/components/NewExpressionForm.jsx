import styles from "./NewWordForm.module.css";

function NewExpressionForm() {
  return (
    <form className={styles.formBox}>
      <div>
        <label for="expressionText">Expression</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="expressionText"
        />
      </div>

      <div>
        <label for="expressionLiteralText">Literal Translation</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="expressionLiteralText"
        />
      </div>

      <div>
        <label for="expressionMeaning">Meaning</label>
        <br />
        <input
          className={styles.largerTextBox}
          type="text"
          id="expressionMeaning"
        />
      </div>
    </form>
  );
}

export default NewExpressionForm;
