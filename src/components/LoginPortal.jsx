import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LoginPortal.module.css";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function LoginPortal({ toSignUp, from }) {
  // const [email, setEmail] = useState("jack@mail.com");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("qwerty");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate(from, { replace: true });
    },
    [from, isAuthenticated, navigate],
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <div className={styles.container}>
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <div>
            <label className={styles.formLabel}>Email</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="abc@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className={styles.registerBox}>
              {/* <NavLink to="/register" className={styles.registerBtn}>
                Sign Up?
              </NavLink> */}
              <Button type="lowkey" onClick={toSignUp}>
                Sign Up?
              </Button>
            </div>
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
