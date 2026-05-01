import styles from "./Account.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import PageContent from "../components/PageContent";
import useAuth from "../hooks/useAuth";

function Account() {
  const { logout, user } = useAuth();
  const createdAt = new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageContent>
      <BackButton />
      <h1>Account</h1>
      <div className={styles.articleBox}>
        <div className={styles.infoBox}>
          <p className={styles.userInfo}>
            <strong>Username:</strong> {user.username}
          </p>
          <p className={styles.userInfo}>
            <strong>Email:</strong> {user.email ?? ""}
          </p>
          <p className={styles.joinDate}>
            <em>Joined: {createdAt}</em>
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
