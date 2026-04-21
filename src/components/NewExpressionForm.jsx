import { useState } from "react";
import styles from "./NewWordForm.module.css";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";

function NewExpressionForm() {
  const [expression, setExpression] = useState("");
  const [literal, setLiteral] = useState("");
  const [meaning, setMeaning] = useState("");

  return (
    <form className={styles.formBox}>
      <div>
        <label for="expressionText">Expression</label>
        <br />
        <textarea
          className={styles.largeTextBox}
          type="text"
          id="expressionText"
          rows={LARGE_TEXT_AREA_ROWS}
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label for="expressionLiteralText">Literal Translation</label>
        <br />
        <textarea
          className={styles.largeTextBox}
          type="text"
          id="expressionLiteralText"
          rows={LARGE_TEXT_AREA_ROWS}
          value={literal}
          onChange={(e) => setLiteral(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label for="expressionMeaning">Meaning</label>
        <br />
        <textarea
          className={styles.largeTextBox}
          type="text"
          id="expressionMeaning"
          rows={LARGE_TEXT_AREA_ROWS}
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
        ></textarea>
      </div>
    </form>
  );
}

export default NewExpressionForm;
