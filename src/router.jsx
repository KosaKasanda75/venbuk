import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import WordResult from "./components/WordResult";
import apiFetch from "./helpers/fetchWrapper";
import { GetOptions } from "./helpers/fetchOptions";

const API_URL = "http://localhost:8001";
// const API_URL = "https://api.venbuk.com";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "results/:id",
        element: <WordResult />,
        loader: async ({ params }) => {
          const res = await apiFetch(
            `${API_URL}/dictionaries/words/${params.id}`,
            GetOptions,
          );
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail ?? `HTTP ${res.status}`);
          }
          return res.json();
        },
      },
    ],
  },
]);
