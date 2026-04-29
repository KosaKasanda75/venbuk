import styles from "./Login.module.css";
import LoginPortal from "../components/LoginPortal";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import { useState } from "react";
import ResgisterPortal from "../components/ResgisterPortal";
import { useLocation } from "react-router-dom";

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function toSignUpPage() {
    setIsNewUser(true);
  }

  function toLoginPage() {
    setIsNewUser(false);
  }

  return (
    <PageContent type="login">
      <div className={styles.portalBox}>
        {!isNewUser && <LoginPortal toSignUp={toSignUpPage} from={from} />}
        {isNewUser && <ResgisterPortal toLogin={toLoginPage} from={from} />}
      </div>
    </PageContent>
  );
}

export default Login;
