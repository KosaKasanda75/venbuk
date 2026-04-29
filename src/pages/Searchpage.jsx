import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";

function Searchpage() {
  return (
    <PageContent menu={<MainMenu />} type="search">
      <Outlet />
    </PageContent>
  );
}

export default Searchpage;
