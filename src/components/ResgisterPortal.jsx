import styles from "./LoginPortal.module.css";
import BackButton from "./BackButton";
import Button from "./Button";

function ResgisterPortal({ toLogin }) {
  return (
    <div className={styles.container}>
      <BackButton override={toLogin} />
      <div className={styles.queryBox}>
        <h1 className={styles.searchLabel}>Welcome</h1>
        <form className={styles.formBox}>
          <div>
            <label className={styles.formLabel}>Email</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="abc@mail.com"
            />
          </div>
          <div>
            <label className={styles.formLabel}>Password</label>
            <input type="password" className={styles.inputField} />
          </div>
          <div>
            <label className={styles.formLabel}>Confirm Password</label>
            <input type="password" className={styles.inputField} />
          </div>
        </form>
        <Button type="central">Register</Button>
      </div>
    </div>
  );
}

export default ResgisterPortal;
