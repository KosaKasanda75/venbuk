import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import useDictionary from "../hooks/useDictionary";

function Settings() {
  const { dictionary, dictionaryExists } = useDictionary();
  console.log(dictionary);
  console.log(`Dictionary is active: ${dictionaryExists}`);

  return (
    <PageContent menu={<MainMenu />}>
      <Outlet />
    </PageContent>
  );
}

export default Settings;
