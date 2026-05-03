import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LoginPortal.module.css";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import InputField from "./InputField";
import MainLogo from "./MainLogo";
import NamedLogo from "./NamedLogo";

function LoginPortal({ toSignUp, from }) {
  // const [email, setEmail] = useState("jack@mail.com");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("qwerty");
  const [password, setPassword] = useState("");
  const [authFailure, setAuthFailure] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate(from, { replace: true });
    },
    [from, isAuthenticated, navigate],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      const user = await login(email.toLowerCase(), password);
      if (!user) setAuthFailure(true);
      else setAuthFailure(false);
    }
  }

  return (
    <div className={styles.container}>
      <NamedLogo />
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <InputField name="email" state={email} setState={setEmail} />

          <InputField
            name="password"
            type="password"
            state={password}
            setState={setPassword}
          />
          {authFailure && (
            <p className={styles.invalid}>
              The email and/or password are incorrect
            </p>
          )}
          <div className={styles.registerBox}>
            <Button type="lowkey" onClick={() => navigate("/forgot-password")}>
              Forgot Password
            </Button>
            <Button type="lowkey" onClick={toSignUp}>
              Sign Up?
            </Button>
          </div>
        </form>
        <Button type="central" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginPortal;
