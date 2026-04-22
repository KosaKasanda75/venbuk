import { createContext, useEffect, useReducer } from "react";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions, PostOptions } from "../helpers/fetchOptions";

const AuthContext = createContext();
// wrong input field for long text

// const API_URL = "http://localhost:8000";
const API_URL = "https://api.venbuk.com";

const FAKE_USER = {
  name: "Jack",
  email: "jack@mail.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: null,
  authLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, authLoading: true };
    case "completed":
      return { ...state, authLoading: false };
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
  const [{ user, isAuthenticated, authLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function getUser() {
    return await fetch(`${API_URL}/users/me`, GetOptions);
  }

  useEffect(function () {
    async function verifyUser() {
      try {
        const res = await getUser();

        // const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          const err = await res.json();
          console.log(err.detail); // string, or array for validation errors (422)
          dispatch({ type: "completed" });
          return;
        }
        if (res.status !== 204) {
          const data = await res.json();
          // dispatch({ type: "login", payload: userData });
          dispatch({ type: "verify", payload: data });
        }
      } catch (fetchError) {
        console.log(fetchError);
      }
    }
    verifyUser();
  }, []);

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      // Fetch request
      const body = JSON.stringify({ email, password });

      const registerRes = await apiFetch(`${API_URL}/auth/login`, {
        ...PostOptions,
        body,
      });
      // const registerData = await registerRes.json();
      // console.log(registerData);

      if (!registerRes.ok) {
        const err = await registerRes.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }

      const userRes = await getUser();
      if (!userRes.ok) {
        const err = await userRes.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }
      if (userRes.status !== 204) {
        const userData = await userRes.json();
        dispatch({ type: "login", payload: userData });
        return userData;
      }
      // const userData = userRes.json();
      // console.log(userData);

      // const loggedInUser = { email, password };
      // if (email === FAKE_USER.email && password === FAKE_USER.password)

      // dispatch({ type: "login", payload: userData });
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function register(email, username, password) {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const body = JSON.stringify({ username, email, password });

      const registerRes = await apiFetch(`${API_URL}/auth/register`, {
        ...PostOptions,
        body,
      });
      // const registerData = await registerRes.json();
      // console.log(registerData);
      if (!registerRes.ok) {
        const err = await registerRes.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }

      const userRes = await getUser();
      if (!userRes.ok) {
        const err = await userRes.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }
      if (userRes.status !== 204) {
        const userData = await userRes.json();
        dispatch({ type: "register", payload: userData });
      }

      // const userRes = getUser();
      // const userData = userRes.json();
      // console.log(userData);

      // dispatch({ type: "register", payload: userData });
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function logout() {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const registerRes = await apiFetch(`${API_URL}/auth/logout`, {
        ...PostOptions,
      });
      // const registerData = await registerRes.json();
      // console.log(registerData);
      if (!registerRes.ok) {
        const err = await registerRes.json();
        console.log(err.detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }
    } catch (fetchError) {
      console.log(fetchError);
    }

    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
