import styles from "./LoginPortal.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function ResgisterPortal({ toLogin, from }) {
  const [email, setEmail] = useState("jack@mail.com");
  const [username, setUsername] = useState("coolio");
  const [password, setPassword] = useState("qwerty");
  const [password2, setPassword2] = useState("qwerty");
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate(from, { replace: true });
    },
    [from, isAuthenticated, navigate],
  );

  function handleSubmit(e) {
    e.preventDefault();
    samePassword();
    if (email && username && password) register(email, username, password);
  }

  function samePassword() {
    if (password !== password2) {
      setPassword("");
      setPassword2("");
    }
  }

  return (
    <div className={styles.container}>
      <BackButton override={toLogin} />
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <div>
            <label className={styles.formLabel}>Email</label>
            <input
              type="text"
              className={styles.inputField}
              id="email"
              placeholder="abc@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.formLabel}>Username</label>
            <input
              type="text"
              className={styles.inputField}
              id="username"
              placeholder="abc@mail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.formLabel}>Confirm Password</label>
            <input
              type="password"
              className={styles.inputField}
              id="passwordConfirm"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </form>
        <Button type="central" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default ResgisterPortal;
