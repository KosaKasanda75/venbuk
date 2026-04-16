import { useNavigate } from "react-router-dom";
import styles from "./QueryField.module.css";

function QueryField() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <form className={styles.queryBox}>
        <label className={styles.searchLabel} for="searchText">
          Search
        </label>
        <input type="text" className={styles.inputField} id="searchText" />
      </form>

      <ul className={styles.suggestedResults}>
        <li
          className={styles.suggestedResult}
          onClick={() => navigate("/search/result")}
        >
          <p className={styles.suggestedWord}>
            <em>Word</em>
          </p>
          <p className={styles.suggestedDefinition}>This is a definition</p>
        </li>
      </ul>
    </div>
  );
}

export default QueryField;
