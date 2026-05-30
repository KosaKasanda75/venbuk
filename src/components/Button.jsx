import styles from "./Button.module.css";

function Button({ onClick, type, children }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
