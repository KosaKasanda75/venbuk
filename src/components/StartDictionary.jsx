import Button from "./Button";
import styles from "./StartDictionary.module.css";

function StartDictionary() {
  return (
    <div className={styles.container}>
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Begin</h1>
        <Button type="central">Create Dictionary</Button>
        <h2 className={styles.searchLabel}>Join Existing Dictionary</h2>
        <input
          type="text"
          className={styles.inputField}
          placeholder="dictionary ID"
        />
      </div>
    </div>
  );
}

export default StartDictionary;
