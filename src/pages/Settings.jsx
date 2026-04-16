import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";

function Settings() {
  return (
    <PageContent menu={<MainMenu />}>
      <Outlet />
    </PageContent>
  );
}

export default Settings;
