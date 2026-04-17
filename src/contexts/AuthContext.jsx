import { createContext, useEffect, useReducer } from "react";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions, PostOptions } from "../helpers/fetchOptions";

const AuthContext = createContext();

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://www.api.venbuk.com";

const FAKE_USER = {
  name: "Jack",
  email: "jack@mail.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: null,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "register":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "verify":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function getUser() {
    return await apiFetch(`${BASE_URL}/users/me`, { ...GetOptions });
  }

  useEffect(function () {
    async function verifyUser() {
      const res = await getUser();
      const data = await res.json();
      console.log(data);
      // dispatch({ type: "verify", payload: data });
    }
    verifyUser();
  }, []);

  async function login(email, password) {
    dispatch({ type: "loading" });
    // Fetch request
    const body = JSON.stringify({ email, password });

    const registerRes = await apiFetch(`${BASE_URL}/auth/login`, {
      ...PostOptions,
      body,
    });
    const registerData = await registerRes.json();
    console.log(registerData);

    // const userRes = getUser();
    // const userData = userRes.json();
    // console.log(userData);

    // const loggedInUser = { email, password };
    // if (email === FAKE_USER.email && password === FAKE_USER.password)

    // dispatch({ type: "login", payload: userData });
  }

  async function register(email, username, password) {
    dispatch({ type: "loading" });
    // Fetch request
    const body = JSON.stringify({ username, email, password });

    const registerRes = await apiFetch(`${BASE_URL}/auth/register`, {
      ...PostOptions,
      body,
    });
    const registerData = await registerRes.json();
    console.log(registerData);

    // const userRes = getUser();
    // const userData = userRes.json();
    // console.log(userData);

    // dispatch({ type: "register", payload: userData });
  }

  async function logout() {
    dispatch({ type: "loading" });
    // Fetch request
    const registerRes = await apiFetch(`${BASE_URL}/auth/logout`, {
      ...PostOptions,
    });
    const registerData = await registerRes.json();
    console.log(registerData);

    // dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
