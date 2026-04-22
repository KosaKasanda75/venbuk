import { createContext, useCallback, useEffect, useReducer } from "react";
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

// const API_URL = "http://localhost:8000";
const API_URL = "https://www.api.venbuk.com";

// const camelToSnakeCase = (str) =>
//   str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const camelToUrlCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const storedDictionary = JSON.parse(
  localStorage.getItem("venbuk_dictionary") || "null",
);
const storedNounClasses = JSON.parse(
  localStorage.getItem("venbuk_nounClasses") || "[]",
);
const storedGenders = JSON.parse(
  localStorage.getItem("venbuk_genders") || "[]",
);
const storedTags = JSON.parse(localStorage.getItem("venbuk_tags") || "[]");

const initialState = {
  dictionary: storedDictionary,
  dictionaryExists: !!storedDictionary,
  dictionaryList: null,
  isMember: storedDictionary ? true : null,
  nounClasses: storedNounClasses,
  genders: storedGenders,
  tags: storedTags,
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

  useEffect(() => {
    if (dictionary) {
      localStorage.setItem("venbuk_dictionary", JSON.stringify(dictionary));
    } else {
      localStorage.removeItem("venbuk_dictionary");
    }
  }, [dictionary]);

  useEffect(() => {
    localStorage.setItem("venbuk_nounClasses", JSON.stringify(nounClasses));
    localStorage.setItem("venbuk_genders", JSON.stringify(genders));
    localStorage.setItem("venbuk_tags", JSON.stringify(tags));
  }, [nounClasses, genders, tags]);

  async function createDictionary(dictionaryForm) {
    const body = JSON.stringify(dictionaryForm);

    dispatch({ type: "loading" });
    // Fetch to create
    try {
      const res = await apiFetch(`${API_URL}/dictionaries`, {
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
        const resList = await apiFetch(`${API_URL}/dictionaries`, GetOptions);
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
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function getDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionaryId}`,
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

      getAllMetadata(dictionaryId);
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function getDictionaryInfo(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionaryId}`,
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
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  const getDictionaryList = useCallback(async function () {
    dispatch({ type: "loading" });
    // Fetch
    try {
      const res = await apiFetch(`${API_URL}/dictionaries`, GetOptions);
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
      // return data;
    } catch (fetchError) {
      console.log(fetchError);
    }
  }, []);

  async function getAllMetadata(dictionaryId) {
    dispatch({ type: "loading" });

    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionaryId}/metadata`,
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
          type: "getAllMetadata",
          payload: {
            nounClasses: data.noun_classes,
            genders: data.genders,
            tags: data.tags,
            tenses: data.tenses,
          },
        });
        console.log(data);
      }
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function updateDictionary(dictionaryId, dictionaryForm) {
    const body = JSON.stringify({
      name: dictionaryForm.name,
      description: dictionaryForm.description,
      language: "",
    });

    try {
      dispatch({ type: "loading" });
      // Fetch to create
      const res = await apiFetch(`${API_URL}/dictionaries/${dictionaryId}`, {
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
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function deleteDictionary(dictionaryId) {
    dispatch({ type: "loading" });
    // Fetch
    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionaryId}`,
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
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) getDictionaryList();
    },
    [isAuthenticated, getDictionaryList],
  );

  useEffect(
    function () {
      if (isAuthenticated && dictionary) getAllMetadata(dictionary.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, dictionary?.id],
  );

  useEffect(
    function () {
      if (
        dictionary &&
        dictionaryList &&
        !dictionaryList?.some((dict) => dict.id === dictionary.id)
      )
        dispatch({ type: "delete" });
    },
    [dictionaryList, dictionary],
  );

  useEffect(() => {
    if (dictionary) {
      localStorage.setItem("venbuk_dictionary", JSON.stringify(dictionary));
    } else {
      localStorage.removeItem("venbuk_dictionary");
    }
  }, [dictionary]);

  async function readMetadata(resource) {
    try {
      dispatch({ type: "loading" });
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/${camelToUrlCase(resource)}`,
        GetOptions,
      );

      if (res.status === 204) return null;
      if (!res.ok) {
        dispatch({ type: "completed" });
        throw new Error(`Failed to read ${resource} → ${res.status}`);
      }
      const data = await res.json();

      dispatch({ type: `${resource}Read`, payload: data });
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function createMetadata(resource, body) {
    try {
      dispatch({ type: "loading" });
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/${camelToUrlCase(resource)}`,
        { ...PostOptions, body: JSON.stringify(body) },
      );

      if (res.status === 204) return null;
      if (!res.ok) {
        dispatch({ type: "completed" });
        throw new Error(`Failed to create ${resource} → ${res.status}`);
      }
      const data = await res.json();

      await readMetadata(resource);

      return data;
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function updateMetadata(resource, itemId, body) {
    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/${camelToUrlCase(resource)}/${itemId}`,
        { ...PutOptions, body: JSON.stringify(body) },
      );

      if (res.status === 204) return null;
      if (!res.ok) {
        dispatch({ type: "completed" });
        throw new Error(`Failed to update ${resource} → ${res.status}`);
      }
      const data = await res.json();

      await readMetadata(resource);

      return data;
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function deleteMetadata(resource, itemId) {
    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/${camelToUrlCase(resource)}/${itemId}`,
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
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  useEffect(() => {
    localStorage.setItem("venbuk_nounClasses", JSON.stringify(nounClasses));
    localStorage.setItem("venbuk_genders", JSON.stringify(genders));
    localStorage.setItem("venbuk_tags", JSON.stringify(tags));
  }, [nounClasses, genders, tags]);

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
