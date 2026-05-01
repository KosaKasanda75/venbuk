import BackButton from "./BackButton";
import styles from "./TerminologyDisplay.module.css";

function TerminologyDisplay({ title, explainer, previousPage }) {
  return (
    <div className={styles.terminologyBox}>
      {previousPage && <BackButton />}

      <h1 className={`${styles.terminologyTitle}`}>{title}</h1>

      <div className={styles.overviewBox}>
        {/* <h2>{explainer[0].name}</h2> */}
        <p>{explainer[0].meaning}</p>
        {explainer[0].examples && <p>Examples: {explainer[0].examples}</p>}
        {explainer[0].note && <p>{explainer[0].note}</p>}
      </div>

      {explainer.length > 1 &&
        explainer.slice(1).map((ex) => (
          <div key={ex.name} className={styles.termBox}>
            <h3 className={styles.termTitle}>{ex.name}</h3>
            <p className={styles.meaning}>{ex.meaning}</p>
            <p className={styles.examples}>Examples: {ex.examples}</p>
            <p className={styles.note}>{ex.note}</p>
          </div>
        ))}
    </div>
  );
}

export default TerminologyDisplay;
