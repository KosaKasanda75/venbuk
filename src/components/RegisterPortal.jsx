import styles from "./LoginPortal.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import validator from "validator";
import useAuth from "../hooks/useAuth";
import InputField from "./InputField";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import NamedLogo from "./NamedLogo";
// import { RxCross2 } from "react-icons/rx";

function RegisterPortal({ toLogin, from }) {
  // const [email, setEmail] = useState("jack@mail.com");
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  // const [username, setUsername] = useState("coolio");
  const [username, setUsername] = useState("");
  const [wrongUsername, setWrongUsername] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState("");
  // const [usernameList, setUsernameList] = useState([]);
  // const [password, setPassword] = useState("qwerty");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [noLowerCase, setNoLowerCase] = useState(false);
  const [noUpperCase, setNoUpperCase] = useState(false);
  const [noNumber, setNoNumber] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notSamePassword, setNotSamePassword] = useState("");
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate(from, { replace: true });
    },
    [from, isAuthenticated, navigate],
  );

  // useEffect(
  //   function () {
  //     async function getUsernames() {
  //       try {
  //         const res = await apiFetch(
  //           `/users/usernames?q=${username}`,
  //           GetOptions,
  //         );

  //         if (!res.ok) {
  //           return;
  //         }

  //         const data = await res.json();
  //         setUsernameList(data);
  //       } catch (fetchError) {
  //         console.log(fetchError);
  //       }
  //     }
  //     getUsernames();
  //   },
  //   [username],
  // );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail()) return;
    if (!(await validUsername(username))) return;
    if (!validPassword(password)) return;
    if (!checkSamePassword()) return;
    register(email.toLowerCase(), username.toLowerCase(), password);
  }

  function validateEmail() {
    if (!validator.isEmail(email)) {
      setWrongEmail(true);
      return false;
    } else setWrongEmail(false);
    return true;
  }

  async function validUsername(currentUsername) {
    if (currentUsername.length < 4) {
      setWrongUsername(true);
      setUsernameMsg("Username is too short");
      return false;
    }
    if (currentUsername.length > 15) {
      setWrongUsername(true);
      setUsernameMsg("Username is too long");
      return false;
    }
    if (/[^a-zA-Z0-9_]/.test(currentUsername)) {
      setWrongUsername(true);
      setUsernameMsg("Username cannot contain special characters");
      return false;
    }
    if (!(await usernameIsAvailable(currentUsername))) {
      setWrongUsername(true);
      setUsernameMsg("Username has been taken");
      return false;
    }
    setWrongUsername(false);
    return true;
  }

  async function usernameIsAvailable(user_name) {
    try {
      const res = await apiFetch(
        `/users/check-username?username=${user_name}`,
        GetOptions,
      );

      if (res.status === 429) {
        // throw new Error("Too many requests, slow down");
        return true;
      }
      if (!res.ok) {
        // throw new Error("Unexpected error");
        return true;
      }

      const { available } = await res.json();
      return available;
    } catch (fetchError) {
      console.log(fetchError);
      return true;
    }
  }

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
      return false;
    }
    setNotSamePassword(false);
    return true;
  }

  return (
    <div className={styles.containerRegister}>
      <div className={styles.logoBackBox}>
        <BackButton override={toLogin} />
        <NamedLogo />
      </div>
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <InputField
            name="email"
            state={email}
            setState={setEmail}
            isWrong={wrongEmail}
            isWrongMsg={"The email you entered is invalid"}
          />

          <InputField
            name="username"
            state={username}
            setState={setUsername}
            onValidate={validUsername}
            isWrong={wrongUsername}
            isWrongMsg={usernameMsg}
          />

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
        <a
          href="/privacy-policy.html"
          className={`websiteLink ${styles.policyLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Privacy Policy
        </a>
        <Button type="central" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default RegisterPortal;
