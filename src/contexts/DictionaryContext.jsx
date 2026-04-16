import { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";

const DictionaryContext = createContext();

const initialState = {
  dictionary: null,
  dictionaryExists: false,
  dictionaryList: null,
  isMember: null,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "create":
      return {
        ...state,
        dictionary: action.payload.newDictionary,
        dictionaryExists: true,
        dictionaryList: action.payload.newDictionaryList,
        isMember: true,
        isLoading: false,
      };
    case "get":
      return {
        ...state,
        dictionary: action.payload,
        dictionaryExists: true,
        isMember: true,
        isLoading: false,
      };
    case "getAll":
      return { ...state, dictionaryList: action.payload, isLoading: false };
    case "update":
      return {
        ...state,
        dictionary: action.payload,
        dictionaryExists: true,
        isLoading: false,
      };
    case "delete":
      return {
        ...state,
        dictionary: null,
        dictionaryExists: false,
        isMember: null,
        isLoading: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

function DictionaryProvider({ children }) {
  const [
    { dictionary, dictionaryExists, dictionaryList, isMember, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { isAuthenticated } = useAuth();

  async function createDictionary(dictionaryForm) {
    dispatch({ type: "loading" });
    // Fetch to create
    const theDictionary = dictionaryForm;
    // Fetch to get all
    const theDictionaryList = dictionaryForm;
    dispatch({
      type: "create",
      payload: {
        newDictionary: theDictionary,
        newDictionaryList: theDictionaryList,
      },
    });
  }

  async function getDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    const theDictionary = dictionaryId;
    dispatch({ type: "get", payload: theDictionary });
  }

  async function getDictionaryList() {
    dispatch({ type: "loading" });
    // Fetch
    const theDictionary = [];
    dispatch({ type: "getAll", payload: theDictionary });
  }

  function updateDictionary(dictionaryForm) {
    dispatch({ type: "loading" });
    // Fetch
    const theDictionary = dictionaryForm;
    dispatch({ type: "update", payload: theDictionary });
  }

  function deleteDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    console.log(dictionaryId);
    dispatch({ type: "delete" });
    getDictionaryList();
  }

  useEffect(
    function () {
      async function loadDictionaries() {
        await getDictionaryList();
        // await getDictionary();
      }
      if (isAuthenticated) loadDictionaries();
    },
    [isAuthenticated],
  );

  return (
    <DictionaryContext.Provider
      value={{
        dictionary,
        dictionaryExists,
        dictionaryList,
        isMember,
        isLoading,
        createDictionary,
        getDictionary,
        getDictionaryList,
        updateDictionary,
        deleteDictionary,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}

export { DictionaryProvider, DictionaryContext };
