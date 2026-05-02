import { useState } from "react";
import styles from "./InputField.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  name,
  type = "text",
  state,
  setState,
  onValidate,
  isWrong,
  isWrongMsg,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setState(e.target.value);
    onValidate?.(e.target.value);
  }

  const resolvedType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label className={styles.formLabel}>
        {name.at(0).toUpperCase() + name.slice(1)}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={resolvedType}
          className={styles.inputField}
          id={name}
          value={state}
          onChange={(e) => handleChange(e)}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <FaEyeSlash className={styles.eyeIcon} />
            ) : (
              <FaEye className={styles.eyeIcon} />
            )}
          </button>
        )}
      </div>
      {isWrong && <p className={styles.invalidMessage}>{isWrongMsg}</p>}
    </div>
  );
}

export default InputField;
