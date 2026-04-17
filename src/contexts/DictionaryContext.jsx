import { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import apiFetch from "../helpers/fetchWrapper";
import {
  DeleteOptions,
  GetOptions,
  PostOptions,
  PutOptions,
} from "../helpers/fetchOptions";

const DictionaryContext = createContext();

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://www.api.venbuk.com";

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
    case "completed":
      return { ...state, isLoading: false };
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
    const body = JSON.stringify({
      name: dictionaryForm.name,
      description: dictionaryForm.description,
      language: "",
    });

    dispatch({ type: "loading" });
    // Fetch to create
    const res = await apiFetch(`${BASE_URL}/dictionaries`, {
      ...PostOptions,
      body,
    });
    // const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      const err = await res.json();
      console.log(err.detail); // string, or array for validation errors (422)
      dispatch({ type: "completed" });
      return;
    }

    // 204 responses (DELETE, login, logout, refresh) have no body — do NOT call res.json()
    if (res.status !== 204) {
      const newDictionary = await res.json();

      // Fetch new list of all dictionaries
      const resList = await apiFetch(`${BASE_URL}/dictionaries`, GetOptions);
      if (!resList.ok) {
        const err = await resList.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }
      if (resList.status !== 204) {
        const newDictionaryList = await resList.json();
        dispatch({
          type: "create",
          payload: {
            newDictionary,
            newDictionaryList,
          },
        });
      } else {
        dispatch({
          type: "create",
          payload: {
            newDictionary,
            newDictionaryList: dictionaryList,
          },
        });
      }
    }
    // const theDictionary = dictionaryForm;

    // const theDictionaryList = dictionaryForm;
    // dispatch({
    //   type: "create",
    //   payload: {
    //     newDictionary: theDictionary,
    //     newDictionaryList: theDictionaryList,
    //   },
    // });

    // Fetch to get all
  }

  async function getDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionaryId}`,
      GetOptions,
    );
    // const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      const err = await res.json();
      console.log(err.detail); // string, or array for validation errors (422)
      dispatch({ type: "completed" });
      return;
    }

    // 204 responses (DELETE, login, logout, refresh) have no body — do NOT call res.json()
    if (res.status !== 204) {
      const data = await res.json();
      dispatch({ type: "get", payload: data });
    }

    // const theDictionary = dictionaryId;
  }

  async function getDictionaryList() {
    dispatch({ type: "loading" });
    // Fetch
    const res = await apiFetch(`${BASE_URL}/dictionaries`, GetOptions);
    // const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      const err = await res.json();
      console.log(err.detail); // string, or array for validation errors (422)
      dispatch({ type: "completed" });
      return;
    }

    // 204 responses (DELETE, login, logout, refresh) have no body — do NOT call res.json()
    if (res.status !== 204) {
      const data = await res.json();
      dispatch({ type: "getAll", payload: data });
    }

    // const theDictionary = [];
    // dispatch({ type: "getAll", payload: theDictionary });
  }

  async function updateDictionary(dictionaryForm) {
    const body = JSON.stringify({
      name: dictionaryForm.name,
      description: dictionaryForm.description,
      language: "",
    });

    dispatch({ type: "loading" });
    // Fetch to create
    const res = await apiFetch(`${BASE_URL}/dictionaries/${dictionary.Id}`, {
      ...PutOptions,
      body,
    });
    // const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      const err = await res.json();
      console.log(err.detail); // string, or array for validation errors (422)
      dispatch({ type: "completed" });
      return;
    }

    // 204 responses (DELETE, login, logout, refresh) have no body — do NOT call res.json()
    if (res.status !== 204) {
      const data = await res.json();
      dispatch({ type: "update", payload: data });
    }

    // const theDictionary = dictionaryForm;
    // dispatch({ type: "update", payload: theDictionary });
  }

  async function deleteDictionary() {
    dispatch({ type: "loading" });
    // Fetch
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.Id}`,
      DeleteOptions,
    );
    // const data = await res.json();
    // console.log(data);
    if (!res.ok) {
      const err = await res.json();
      console.log(err.detail); // string, or array for validation errors (422)
      dispatch({ type: "completed" });
      return;
    }

    dispatch({ type: "delete" });
    // getDictionaryList();
  }

  useEffect(
    function () {
      // async function loadDictionaries() {
      //   await getDictionaryList();
      //   // await getDictionary();
      // }
      if (isAuthenticated) getDictionaryList();
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
