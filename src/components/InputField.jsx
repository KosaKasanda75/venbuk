import styles from "InputField.modules.css";

function InputField({ name, state, setState, isWrong }) {
  return (
    <div>
      <label className={styles.formLabel}>{name}</label>
      <input
        type="text"
        className={styles.inputField}
        id={name}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {isWrong && <p>Not a valid {state}.</p>}
    </div>
  );
}

export default InputField;
