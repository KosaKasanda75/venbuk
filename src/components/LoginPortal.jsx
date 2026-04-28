import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LoginPortal.module.css";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import InputField from "./InputField";

function LoginPortal({ toSignUp, from }) {
  const [email, setEmail] = useState("jack@mail.com");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("qwerty");
  // const [password, setPassword] = useState("");
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
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          {/* <div>
            <label className={styles.formLabel}>Email</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="abc@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div> */}
          <InputField name="email" state={email} setState={setEmail} />
          {/* <div>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div> */}
          <InputField
            name="password"
            type="password"
            state={password}
            setState={setPassword}
          />
          {authFailure && (
            <p className={styles.invalid}>
              The email and/or password are incoreect
            </p>
          )}
          <div className={styles.registerBox}>
            {/* <NavLink to="/register" className={styles.registerBtn}>
                Sign Up?
              </NavLink> */}
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
