import styles from "./Confirm.module.css";
import Button from "./Button";

function Confirm({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonBox}>
          <Button type="subtle" onClick={onCancel}>
            No
          </Button>
          <Button type="delete" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
