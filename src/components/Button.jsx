import styles from "./Button.module.css";

function Button({ onClick, type, children, disabled }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
