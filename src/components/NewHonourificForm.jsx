import { useState } from "react";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";
import styles from "./NewWordForm.module.css";

function NewHonorificForm() {
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");

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
        <textarea
          className={styles.largeTextBox}
          type="text"
          id="honorificDescription"
          rows={LARGE_TEXT_AREA_ROWS}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label for="honorificExampleUse">Example Use</label>
        <br />
        <textarea
          className={styles.largeTextBox}
          type="text"
          id="honorificExampleUse"
          rows={LARGE_TEXT_AREA_ROWS}
          value={example}
          onChange={(e) => setExample(e.target.value)}
        ></textarea>
      </div>
    </form>
  );
}

export default NewHonorificForm;
