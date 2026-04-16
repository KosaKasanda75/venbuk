import styles from "./Login.module.css";
import LoginPortal from "../components/LoginPortal";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import { useState } from "react";
import ResgisterPortal from "../components/ResgisterPortal";

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);

  function toSignUpPage() {
    setIsNewUser(true);
  }

  function toLoginPage() {
    setIsNewUser(false);
  }

  return (
    <PageContent menu={<MainMenu />}>
      <div className={styles.portalBox}>
        {!isNewUser && <LoginPortal toSignUp={toSignUpPage} />}
        {isNewUser && <ResgisterPortal toLogin={toLoginPage} />}
      </div>
    </PageContent>
  );
}

export default Login;
