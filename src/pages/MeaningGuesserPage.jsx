import { Outlet } from "react-router-dom";
import PageContent from "../components/PageContent";
// import styles from "./MeaningGuesserPage.module.css";

function MeaningGuesserPage() {
  return (
    <PageContent>
      <Outlet />
    </PageContent>
  );
}

export default MeaningGuesserPage;
