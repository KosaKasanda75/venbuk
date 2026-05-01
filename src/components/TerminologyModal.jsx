import { RxCross2 } from "react-icons/rx";
import styles from "./TerminologyDisplay.module.css";

function TerminologyModal({ title, explainer, onClose }) {
  return (
    <div className={styles.terminologyBox}>
      <RxCross2 onClick={onClose} />

      <h1 className={`${styles.terminologyTitle}`}>{title}</h1>

      {/* <h2>{explainer[0].name}</h2> */}
      <p>{explainer[0].meaning}</p>
      {explainer[0].examples && <p>Examples: {explainer[0].examples}</p>}
      {explainer[0].note && <p>{explainer[0].note}</p>}

      {explainer.length > 1 &&
        explainer.slice(1).map((ex) => (
          <div key={ex.name}>
            <h3 className={styles.termTitle}>{ex.name}</h3>
            <p>{ex.meaning}</p>
            <p>Examples: {ex.examples}</p>
            <p>{ex.note}</p>
          </div>
        ))}
    </div>
  );
}

export default TerminologyModal;
