import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
// import useDictionary from "../hooks/useDictionary";
// import useAuth from "../hooks/useAuth";
// import useEnum from "../hooks/useEnum";

function Settings() {
  // const { dictionaryList } = useDictionary();
  // const { isAuthenticated } = useAuth();
  // const { memberRoles } = useEnum();
  // console.log(dictionaryList);
  // console.log(isAuthenticated);
  // console.log(memberRoles);
  // console.log(`Dictionary is active: ${dictionaryExists}`);

  return (
    <PageContent menu={<MainMenu />}>
      <Outlet />
    </PageContent>
  );
}

export default Settings;
