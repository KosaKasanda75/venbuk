import EntryType from "../components/EntryType";
import MainMenu from "../components/MainMenu";
import NewWordForm from "../components/NewWordForm";
import PageContent from "../components/PageContent";
import { Outlet } from "react-router-dom";

// const entryTypes = ["word", "honorific", "expression", "conjugation"];

function NewEntry() {
  return (
    <PageContent menu={<MainMenu />}>
      {/* <EntryType entryTypes={entryTypes} /> */}
      <Outlet />
    </PageContent>
  );
}

export default NewEntry;
