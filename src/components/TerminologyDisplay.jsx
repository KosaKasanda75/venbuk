import BackButton from "./BackButton";
import styles from "./TerminologyDisplay.module.css";
import TerminologyInfo from "./TerminologyInfo";

function TerminologyDisplay({ title, explainer, previousPage }) {
  return (
    <div className={styles.terminologyBox}>
      {previousPage && <BackButton />}
      <TerminologyInfo title={title} explainer={explainer} />
    </div>
  );
}

export default TerminologyDisplay;
