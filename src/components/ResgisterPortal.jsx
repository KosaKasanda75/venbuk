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

function ResgisterPortal({ toLogin, from }) {
  // const [email, setEmail] = useState("jack@mail.com");
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  // const [username, setUsername] = useState("coolio");
  const [username, setUsername] = useState("");
  const [wrongUsername, setWrongUsername] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState("");
  const [usernameList, setUsernameList] = useState([]);
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

  useEffect(
    function () {
      async function getUsernames() {
        try {
          const res = await apiFetch(
            `/users/usernames?q=${username}`,
            GetOptions,
          );

          if (!res.ok) {
            return;
          }

          const data = await res.json();
          setUsernameList(data);
        } catch (fetchError) {
          console.log(fetchError);
        }
      }
      getUsernames();
    },
    [username],
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail()) return;
    checkSamePassword();
    if (email && username && password)
      register(email.toLowerCase(), username.toLowerCase(), password);
  }

  function validateEmail() {
    if (!validator.isEmail(email)) {
      setWrongEmail(true);
      return false;
    } else setWrongEmail(false);
    return true;
  }

  async function validUsername() {
    if (username.length < 4) {
      setWrongUsername(true);
      setUsernameMsg("Username is too short");
      return;
    }
    if (username.length > 15) {
      setWrongUsername(true);
      setUsernameMsg("Username is too long");
      return;
    }
    if (/[^a-zA-Z0-9_]/.test(username)) {
      setWrongUsername(true);
      setUsernameMsg("Username cannot contain special characters");
      return;
    }
    if (usernameList.some((u) => u.username === username)) {
      setWrongUsername(true);
      setUsernameMsg("Username has been taken");
      return;
    }
    setWrongUsername(false);
  }

  function validPassword() {
    if (password.length < 8 || password.length > 20) {
      setWrongPassword(true);
      setShortPassword(true);
      return;
    } else setShortPassword(false);

    if (!/[A-Z]/.test(password)) {
      setWrongPassword(true);
      setNoUpperCase(true);
      return;
    } else setNoUpperCase(false);

    if (!/[a-z]/.test(password)) {
      setWrongPassword(true);
      setNoLowerCase(true);
      return;
    } else setNoLowerCase(false);

    if (!/[0-9]/.test(password)) {
      setWrongPassword(true);
      setNoNumber(true);
      return;
    } else setNoNumber(false);

    setWrongPassword(false);
  }

  function checkSamePassword() {
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setNotSamePassword(true);
    } else setNotSamePassword(false);
  }

  return (
    <div className={styles.container}>
      <BackButton override={toLogin} />
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
              <li className={`${shortPassword && styles.invalid}`}>
                Be 8 to 20 characters long{" "}
                {shortPassword && <span>&cross;</span>}
              </li>
              <li className={`${noUpperCase && styles.invalid}`}>
                Include at least one upper case letter{" "}
                {noUpperCase && <span>&cross;</span>}
              </li>
              <li className={`${noLowerCase && styles.invalid}`}>
                Include at least one lower case letter{" "}
                {noLowerCase && <span>&cross;</span>}
              </li>
              <li className={`${noNumber && styles.invalid}`}>
                Include at least one number {noNumber && <span>&cross;</span>}
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
        <a href="/privacy-policy.html" className="websiteLink" target="_blank" rel="noopener noreferrer">
          Our Privacy Policy
        </a>
        <Button type="central" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default ResgisterPortal;
