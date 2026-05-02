import { RxCross2 } from "react-icons/rx";
import styles from "./TerminologyDisplay.module.css";
import TerminologyInfo from "./TerminologyInfo";

function TerminologyModal({ title, explainer, onClose }) {
  return (
    <div className={styles.terminologyBox}>
      <RxCross2 onClick={onClose} />

      <TerminologyInfo title={title} explainer={explainer} />
    </div>
  );
}

export default TerminologyModal;
