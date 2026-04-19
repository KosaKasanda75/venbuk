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
// TO DO: Create dictionary refresh (check membership updates)

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://www.api.venbuk.com";

const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const initialState = {
  dictionary: null,
  dictionaryExists: false,
  dictionaryList: null,
  isMember: null,
  nounClasses: [],
  genders: [],
  tags: [],
  tenses: [],
  dictionaryLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, dictionaryLoading: true };
    case "completed":
      return { ...state, dictionaryLoading: false };
    case "create":
      return {
        ...state,
        dictionary: action.payload.newDictionary,
        dictionaryExists: true,
        dictionaryList: action.payload.newDictionaryList,
        isMember: true,
        dictionaryLoading: false,
      };
    case "get":
      return {
        ...state,
        dictionary: action.payload,
        dictionaryExists: true,
        isMember: true,
        dictionaryLoading: false,
      };
    case "getAll":
      return {
        ...state,
        dictionaryList: action.payload,
        dictionaryLoading: false,
      };
    case "update":
      return {
        ...state,
        dictionary: action.payload,
        dictionaryExists: true,
        dictionaryLoading: false,
      };
    case "delete":
      return {
        ...state,
        dictionary: null,
        dictionaryExists: false,
        isMember: null,
        nounClasses: [],
        tags: [],
        tenses: [],
        dictionaryLoading: false,
      };
    case "getAllMetadata":
      return {
        ...state,
        nounClasses: action.payload.nounClasses,
        genders: action.payload.genders,
        tags: action.payload.tags,
        tenses: action.payload.tenses,
        dictionaryLoading: false,
      };
    case "nounClassesRead":
      return {
        ...state,
        nounClasses: action.payload,
        dictionaryLoading: false,
      };
    case "gendersRead":
      return { ...state, genders: action.payload, dictionaryLoading: false };
    case "tagsRead":
      return { ...state, tags: action.payload, dictionaryLoading: false };
    case "tensesRead":
      return { ...state, tenses: action.payload, dictionaryLoading: false };
    default:
      throw new Error("Unknown action");
  }
}

function DictionaryProvider({ children }) {
  const [
    {
      dictionary,
      dictionaryExists,
      dictionaryList,
      isMember,
      nounClasses,
      genders,
      tags,
      tenses,
      dictionaryLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { isAuthenticated } = useAuth();

  async function createDictionary(dictionaryForm) {
    const body = JSON.stringify(dictionaryForm);

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

  async function getDictionary() {
    dispatch({ type: "loading" });
    // Fetch
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}`,
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
    getAllMetadata();
  }

  async function getDictionaryInfo(dictionaryId) {
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
      dispatch({ type: "completed" });
      return data;
    }
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

    if (!dictionaryList.some((dict) => dict.id === dictionary.id))
      dispatch({ type: "delete" });

    // const theDictionary = [];
    // dispatch({ type: "getAll", payload: theDictionary });
  }

  async function getAllMetadata() {
    dispatch({ type: "loading" });

    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/metadata`,
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
      dispatch({
        type: "getMetadata",
        payload: {
          nounClasses: data.noun_classes,
          genders: data.genders,
          tags: data.tags,
          tenses: data.tenses,
        },
      });
    }
  }

  async function updateDictionary(dictionaryId, dictionaryForm) {
    const body = JSON.stringify({
      name: dictionaryForm.name,
      description: dictionaryForm.description,
      language: "",
    });

    dispatch({ type: "loading" });
    // Fetch to create
    const res = await apiFetch(`${BASE_URL}/dictionaries/${dictionaryId}`, {
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

  async function deleteDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionaryId}`,
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
    getDictionaryList();
  }

  useEffect(
    function () {
      if (isAuthenticated) getDictionaryList();
    },
    [isAuthenticated],
  );

  async function readMetadata(resource) {
    dispatch({ type: "loading" });
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/${camelToSnakeCase(resource)}`,
      GetOptions,
    );

    if (res.status === 204) return null;
    if (!res.ok) {
      dispatch({ type: "completed" });
      throw new Error(`Failed to read ${resource} → ${res.status}`);
    }
    const data = res.json();
    console.log(data);

    dispatch({ type: `${resource}Read`, payload: data });
  }

  async function createMetadata(resource, body) {
    dispatch({ type: "loading" });
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/${camelToSnakeCase(resource)}`,
      { ...PostOptions, body: JSON.stringify(body) },
    );

    if (res.status === 204) return null;
    if (!res.ok) {
      dispatch({ type: "completed" });
      throw new Error(`Failed to create ${resource} → ${res.status}`);
    }
    const data = res.json();
    console.log(data);

    await readMetadata(resource);
  }

  async function updateMetadata(resource, itemId, body) {
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/${camelToSnakeCase(resource)}/${itemId}`,
      { ...PutOptions, body: JSON.stringify(body) },
    );

    if (res.status === 204) return null;
    if (!res.ok) {
      dispatch({ type: "completed" });
      throw new Error(`Failed to update ${resource} → ${res.status}`);
    }
    const data = res.json();
    console.log(data);

    await readMetadata(resource);
  }

  async function deleteMetadata(resource, itemId) {
    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/${camelToSnakeCase(resource)}/${itemId}`,
      DeleteOptions,
    );

    if (res.status === 204) return null;
    if (!res.ok) {
      dispatch({ type: "completed" });
      throw new Error(`Failed to delete ${resource} → ${res.status}`);
    }
    // const data = res.json();
    // console.log(data);

    await readMetadata(resource);
  }

  return (
    <DictionaryContext.Provider
      value={{
        dictionary,
        dictionaryExists,
        dictionaryList,
        isMember,
        nounClasses,
        genders,
        tags,
        tenses,
        dictionaryLoading,
        createDictionary,
        getDictionary,
        getDictionaryInfo,
        getDictionaryList,
        updateDictionary,
        deleteDictionary,
        createMetadata,
        updateMetadata,
        deleteMetadata,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}

export { DictionaryProvider, DictionaryContext };
