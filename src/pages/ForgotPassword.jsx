import { useState } from "react";
import validator from "validator";
import styles from "./ForgotPassword.module.css";
import InputField from "../components/InputField";
import PageContent from "../components/PageContent";
import NamedLogo from "../components/NamedLogo";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import LoadingContent from "../components/LoadingContent";
import BackButton from "../components/BackButton";
// import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const { forgotPassword, authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState("");
  const [reqRes, setReqRes] = useState(null);

  function validateEmail() {
    if (!validator.isEmail(email)) {
      setWrongEmail(true);
      return false;
    } else setWrongEmail(false);
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail()) return;
    if (email) setReqRes(await forgotPassword(email));
  }

  return (
    <PageContent>
      <NamedLogo />
      <div className={styles.contentBox}>
        <BackButton title="Login" path="/login" />
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit}>
            <InputField
              name="email"
              state={email}
              setState={setEmail}
              isWrong={wrongEmail}
              isWrongMsg={"The email you entered is invalid"}
            />
          </form>
          {!authLoading && (
            <Button type="addMore" onClick={handleSubmit}>
              Send Reset Email
            </Button>
          )}
          {reqRes && <p>{reqRes}</p>}
          {authLoading && <LoadingContent />}
        </div>
      </div>
    </PageContent>
  );
}

export default ForgotPassword;
