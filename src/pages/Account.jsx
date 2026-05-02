import styles from "./Account.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Confirm from "../components/Confirm";
import PageContent from "../components/PageContent";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

function Account() {
  const { logout, deleteAccount, user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
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
        <div className={styles.deleteAccount}>
          <Button type="delete" onClick={() => setShowConfirm(true)}>
            Delete Account
          </Button>
        </div>
      </div>
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete your account? This cannot be undone. (All your dictionaries will be passed on or deleted)"
          onConfirm={deleteAccount}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </PageContent>
  );
}

export default Account;
