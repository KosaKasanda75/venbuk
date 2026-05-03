import { createContext, useEffect, useReducer } from "react";
import apiFetch from "../helpers/fetchWrapper";
import {
  DeleteOptions,
  GetOptions,
  PostOptions,
} from "../helpers/fetchOptions";

const AuthContext = createContext();
// wrong input field for long text

const AUTH_CACHE_KEY = "authUser";

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
  authVerifying: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, authLoading: true };
    case "completed":
      return { ...state, authLoading: false };
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authVerifying: false,
      };
    case "register":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authVerifying: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authVerifying: false,
        authLoading: false,
      };
    case "delete":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authVerifying: false,
        authLoading: false,
      };
    case "reset-password":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authVerifying: false,
        authLoading: false,
      };
    case "verifyDone":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authVerifying: false,
      };
    case "verifyFailed":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authVerifying: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, authLoading, authVerifying }, dispatch] =
    useReducer(reducer, initialState);

  async function getUser() {
    return await apiFetch(`/users/me`, GetOptions);
  }

  useEffect(function () {
    async function verifyUser() {
      try {
        const res = await getUser();
        if (!res.ok) {
          localStorage.removeItem(AUTH_CACHE_KEY);
          dispatch({ type: "verifyFailed" });
          return;
        }
        if (res.status !== 204) {
          const data = await res.json();
          localStorage.setItem(
            AUTH_CACHE_KEY,
            JSON.stringify({ id: data.id, username: data.username }),
          );
          dispatch({ type: "verifyDone", payload: data });
        }
      } catch (fetchError) {
        console.log(fetchError);
        dispatch({ type: "verifyFailed" });
      }
    }
    verifyUser();
  }, []);

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      // Fetch request
      const body = JSON.stringify({ email, password });

      const registerRes = await apiFetch(`/auth/login`, {
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
        localStorage.setItem(
          AUTH_CACHE_KEY,
          JSON.stringify({ id: userData.id, username: userData.username }),
        );
        dispatch({ type: "login", payload: userData });
        return userData;
      }
    } catch (fetchError) {
      console.log(fetchError);
      return null;
    } finally {
      dispatch({ type: "completed" });
    }
  }

  async function register(email, username, password) {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const body = JSON.stringify({ username, email, password });

      const registerRes = await apiFetch(`/auth/register`, {
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
        localStorage.setItem(
          AUTH_CACHE_KEY,
          JSON.stringify({ id: userData.id, username: userData.username }),
        );
        dispatch({ type: "register", payload: userData });
      }
    } catch (fetchError) {
      console.log(fetchError);
    } finally {
      dispatch({ type: "completed" });
    }
  }

  async function logout() {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const registerRes = await apiFetch(`/auth/logout`, {
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

    localStorage.removeItem(AUTH_CACHE_KEY);
    dispatch({ type: "logout" });
  }

  async function deleteAccount() {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const registerRes = await apiFetch(`/users/me`, DeleteOptions);
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
      dispatch({ type: "completed" });
      return;
    }

    localStorage.removeItem(AUTH_CACHE_KEY);
    dispatch({ type: "delete" });
  }

  async function forgotPassword(email) {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const body = JSON.stringify({ email });

      const res = await apiFetch(`/auth/forgot-password`, {
        ...PostOptions,
        body,
      });

      if (!res.ok) {
        const { detail } = await res.json();
        console.log(detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return null;
      }
      dispatch({ type: "completed" });
      return "An email has been to the provided, given it currently has a Venbuk account";
    } catch (fetchError) {
      console.log(fetchError);
      dispatch({ type: "completed" });
      return null;
    }
  }

  async function resetPassword(new_password, token) {
    dispatch({ type: "loading" });
    // Fetch request
    try {
      const body = JSON.stringify({ new_password, token });

      const res = await apiFetch(`/auth/reset-password`, {
        ...PostOptions,
        body,
      });

      if (!res.ok) {
        const { detail } = await res.json();
        console.log(detail); // string, or array for validation errors (422)
        dispatch({ type: "completed" });
        return;
      }
      dispatch({ type: "reset-password" });
    } catch (fetchError) {
      console.log(fetchError);
      dispatch({ type: "completed" });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authLoading,
        authVerifying,
        login,
        register,
        logout,
        deleteAccount,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
