import styles from "./Account.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PageContent from "../components/PageContent";
import useAuth from "../hooks/useAuth";

function Account() {
  const { logout, user } = useAuth();
  return (
    <PageContent>
      <BackButton />
      <h1>Account</h1>
      <div className={styles.articleBox}>
        <div className={styles.infoBox}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email ?? ""}
          </p>
        </div>
        <Button type="logout" onClick={logout}>
          Logout
        </Button>
      </div>
    </PageContent>
  );
}

export default Account;
