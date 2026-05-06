import styles from "./Login.module.css";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import RegisterPortal from "../components/RegisterPortal";

function Register() {
  return (
    <PageContent menu={<MainMenu />}>
      <div className={styles.portalBox}>
        <RegisterPortal />
      </div>
    </PageContent>
  );
}

export default Register;
