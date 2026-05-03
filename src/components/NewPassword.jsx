import styles from "./LoginPortal.module.css";
import { useState } from "react";
import NamedLogo from "./NamedLogo";
import { PostOptions } from "../helpers/fetchOptions";
import LoadingContent from "./LoadingContent";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";

function NewPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, authLoading } = useAuth();
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [noLowerCase, setNoLowerCase] = useState(false);
  const [noUpperCase, setNoUpperCase] = useState(false);
  const [noNumber, setNoNumber] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notSamePassword, setNotSamePassword] = useState("");

  function validPassword(_password) {
    if (_password.length < 8 || _password.length > 20) {
      setWrongPassword(true);
      setShortPassword(true);
      return false;
    } else setShortPassword(false);

    if (!/[A-Z]/.test(_password)) {
      setWrongPassword(true);
      setNoUpperCase(true);
      return false;
    } else setNoUpperCase(false);

    if (!/[a-z]/.test(_password)) {
      setWrongPassword(true);
      setNoLowerCase(true);
      return false;
    } else setNoLowerCase(false);

    if (!/[0-9]/.test(_password)) {
      setWrongPassword(true);
      setNoNumber(true);
      return false;
    } else setNoNumber(false);

    setWrongPassword(false);
    return true;
  }

  function checkSamePassword() {
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setNotSamePassword(true);
    } else setNotSamePassword(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validPassword()) return;
    checkSamePassword();
    if (password && confirmPassword && token) await resetPassword(password);
  }

  return (
    <>
      <div className={styles.newPasswordBox}>
        <h1 className={styles.searchLabel}>Enter New Password</h1>
        {!authLoading && (
          <>
            <form className={styles.formBox} onSubmit={handleSubmit}>
              <div>
                <h3>Passwords should:</h3>
                <ul className={styles.passwordInfo}>
                  <li
                    className={`${styles.reqText} ${shortPassword && styles.invalid}`}
                  >
                    Be 8 to 20 characters long{" "}
                  </li>
                  <li className={`${noUpperCase && styles.invalid}`}>
                    Include at least one upper case letter{" "}
                  </li>
                  <li className={`${noLowerCase && styles.invalid}`}>
                    Include at least one lower case letter{" "}
                  </li>
                  <li className={`${noNumber && styles.invalid}`}>
                    Include at least one number{" "}
                  </li>
                </ul>
              </div>
              <InputField
                name="password"
                type="password"
                state={password}
                setState={setPassword}
                onValidate={validPassword}
                isWrong={wrongPassword}
                isWrongMsg={"Invalid password"}
              />

              <InputField
                name="confirm_password"
                type="password"
                state={confirmPassword}
                setState={setConfirmPassword}
                isWrong={notSamePassword}
                isWrongMsg={"Passwords must match"}
              />
            </form>
            <Button type="central" onClick={handleSubmit}>
              Reset Password
            </Button>
          </>
        )}
        {authLoading && <LoadingContent />}
      </div>
    </>
  );
}

export default NewPassword;
