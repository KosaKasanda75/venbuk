import MainMenu from "../components/MainMenu";
import PageContent from "../components/PageContent";
import StartDictionary from "../components/StartDictionary";

function NewDictionary() {
  return (
    <PageContent menu={<MainMenu />}>
      <StartDictionary />
    </PageContent>
  );
}

export default NewDictionary;
