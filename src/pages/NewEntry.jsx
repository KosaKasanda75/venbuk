import EntryType from "../components/EntryType";
import MainMenu from "../components/MainMenu";
import NewWordForm from "../components/NewWordForm";
import PageContent from "../components/PageContent";
import { Outlet, useLocation } from "react-router-dom";

// const entryTypes = ["word", "honorific", "expression", "conjugation"];
const entryTypes = ["word", "honorific", "expression"];

function NewEntry() {
  const { pathname } = useLocation();
  const type = pathname.split("/").pop();
  console.log(type);

  return (
    <PageContent menu={<MainMenu />}>
      <EntryType entryTypes={entryTypes} selected={type} />
      <Outlet />
    </PageContent>
  );
}

export default NewEntry;
