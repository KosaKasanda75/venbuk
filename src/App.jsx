// import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import NewEntry from "./pages/NewEntry";
// import Learning from "./pages/Learning";
// import Searchpage from "./pages/Searchpage";
// import Games from "./pages/Games";
// import Settings from "./pages/Settings";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Account from "./pages/Account";
// import NewDictionary from "./pages/NewDictionary";
// import PageNotFound from "./pages/PageNotFound";

const NewEntry = lazy(() => import("./pages/NewEntry"));
const Learning = lazy(() => import("./pages/Learning"));
const Searchpage = lazy(() => import("./pages/Searchpage"));
const Games = lazy(() => import("./pages/Games"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
const Account = lazy(() => import("./pages/Account"));
const NewDictionary = lazy(() => import("./pages/NewDictionary"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import NewWordForm from "./components/NewWordForm";
import NewHonorificForm from "./components/NewHonourificForm";
import NewExpressionForm from "./components/NewExpressionForm";
import NewConjugationForm from "./components/NewConjugationForm";
import QueryField from "./components/QueryField";
import WordResult from "./components/WordResult";
import SettingsHome from "./components/SettingsHome";
import SettingsTag from "./components/SettingsTag";
import SettingsDictionaries from "./components/SettingsDictionaries";
import SettingsConjugation from "./components/SettingsConjugation";
import SettingsNounClasses from "./components/SettingsNounClasses";
// import { AuthProvider } from "./contexts/AuthContext";
// import { DictionaryProvider } from "./contexts/DictionaryContext";
import FullPageLoading from "./pages/FullPageLoading";
import ProtectApp from "./pages/ProtectApp";
import ProtectDictionary from "./pages/ProtectDictionary";
import ProtectDictionaryRoute from "./pages/ProtectDictionaryRoute";
// import { EnumProvider } from "./contexts/EnumContext";
import useDictionary from "./hooks/useDictionary";
import SettingsMetadata from "./components/SettingsMetadata";

function App() {
  const { nounClasses, genders, tags, tenses } = useDictionary();
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          <Route element={<ProtectApp />}>
            <Route index element={<Navigate replace to="search" />} />
            <Route
              path="add-entry"
              element={
                <ProtectDictionary>
                  <NewEntry />
                </ProtectDictionary>
              }
            >
              <Route index element={<Navigate replace to="word" />} />
              <Route path="word" element={<NewWordForm />} />
              <Route path="honorific" element={<NewHonorificForm />} />
              <Route path="expression" element={<NewExpressionForm />} />
              <Route path="conjugation" element={<NewConjugationForm />} />
            </Route>

            <Route
              path="learning"
              element={
                <ProtectDictionary>
                  <Learning />
                </ProtectDictionary>
              }
            />

            <Route
              path="search"
              element={
                <ProtectDictionary>
                  <Searchpage />
                </ProtectDictionary>
              }
            >
              <Route index element={<QueryField />} />
              <Route path="result" element={<WordResult />} />
              <Route path="results/:id" element={<WordResult />} />
            </Route>

            <Route path="games" element={<Games />} />

            <Route path="settings" element={<Settings />}>
              <Route index element={<SettingsHome />} />
              <Route path="dictionaries" element={<SettingsDictionaries />} />
              <Route element={<ProtectDictionaryRoute />}>
                {/* <Route path="tags" element={<SettingsTag />} /> */}
                <Route
                  path="tags"
                  element={
                    <SettingsMetadata
                      metadataTitle="tags"
                      metaList={tags}
                      previousPage="Settings & Help"
                    />
                  }
                />
                <Route path="conjugation">
                  <Route index element={<SettingsConjugation />} />
                  <Route
                    path="tenses"
                    element={
                      <SettingsMetadata
                        metadataTitle="tenses"
                        metaList={tenses}
                        previousPage="Conjugation"
                      />
                    }
                  />
                  {/* <Route
                    path="noun-classes"
                    element={<SettingsNounClasses />}
                  /> */}
                  <Route
                    path="noun-classes"
                    element={
                      <SettingsMetadata
                        metadataTitle="nounClasses"
                        metaList={nounClasses}
                        previousPage="Conjugation"
                      />
                    }
                  />
                  <Route
                    path="genders"
                    element={
                      <SettingsMetadata
                        metadataTitle="genders"
                        metaList={genders}
                        previousPage="Conjugation"
                      />
                    }
                  />
                </Route>
              </Route>
            </Route>

            <Route path="account" element={<Account />} />
            <Route path="new-dictionary" element={<NewDictionary />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
          {/* <Route path="register" element={<Register />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
