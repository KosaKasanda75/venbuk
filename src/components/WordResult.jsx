import styles from "./WordResult.module.css";
import BackButton from "./BackButton";
import WordInfo from "./WordInfo";

function WordResult() {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1>Word</h1>
      <WordInfo />
      <WordInfo />
    </div>
  );
}

export default WordResult;
