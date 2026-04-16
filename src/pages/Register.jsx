import styles from "./Login.module.css";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import ResgisterPortal from "../components/ResgisterPortal";

function Register() {
  return (
    <PageContent menu={<MainMenu />}>
      <div className={styles.portalBox}>
        <ResgisterPortal />
      </div>
    </PageContent>
  );
}

export default Register;
