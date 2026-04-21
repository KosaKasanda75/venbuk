import { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";

const EnumContext = createContext();

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://www.api.venbuk.com";

const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const initialState = {
  memberRoles: [],
  wordClasses: [],
  placements: [],
  regularities: [],
  pluralities: [],
  persons: [],
  formalities: [],
  enumsLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, enumsLoading: true };
    case "completed":
      return { ...state, enumsLoading: false };
    case "setup":
      return {
        ...state,
        memberRoles: action.payload.member_role,
        wordClasses: action.payload.word_class,
        placements: action.payload.placement,
        regularities: action.payload.regularity,
        pluralities: action.payload.plurality,
        persons: action.payload.person,
        formalities: action.payload.formality,
        enumsLoading: false,
      };
    case "memberRoles":
      return { ...state, memberRoles: action.payload };
    case "wordClasses":
      return { ...state, wordClasses: action.payload };
    case "placements":
      return { ...state, placements: action.payload };
    case "regularities":
      return { ...state, regularities: action.payload };
    case "pluralities":
      return { ...state, pluralities: action.payload };
    case "persons":
      return { ...state, persons: action.payload };
    case "formalities":
      return { ...state, formalities: action.payload };
    default:
      throw Error("Unknown action");
  }
}

function EnumProvider({ children }) {
  const [
    {
      memberRoles,
      wordClasses,
      placements,
      regularities,
      pluralities,
      persons,
      formalities,
      enumsLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { isAuthenticated } = useAuth();

  async function setupEnums() {
    dispatch({ type: "loading" });

    try {
      const res = apiFetch(`${BASE_URL}/enums`, GetOptions);
      if (!res.ok) {
        dispatch({ type: "completed" });
        throw new Error(`Enums not found`);
      }
      const data = await res.json();

      dispatch({ type: "setup", payload: data });
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) setupEnums();
    },
    [isAuthenticated],
  );

  async function getEnum(enumName) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `${BASE_URL}/enums/${camelToSnakeCase(enumName)}`,
        GetOptions,
      );
      if (!res.ok) {
        dispatch({ type: "completed" });
        throw new Error(`Enum not found: ${enumName}`);
      }
      const data = res.json();

      dispatch({ type: enumName, payload: data });
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  return (
    <EnumContext.Provider
      value={{
        memberRoles,
        wordClasses,
        placements,
        regularities,
        pluralities,
        persons,
        formalities,
        enumsLoading,
        getEnum,
      }}
    >
      {children}
    </EnumContext.Provider>
  );
}

export { EnumContext, EnumProvider };
