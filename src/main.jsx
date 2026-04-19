import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { EnumProvider } from "./contexts/EnumContext.jsx";
import { DictionaryProvider } from "./contexts/DictionaryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EnumProvider>
        <DictionaryProvider>
          <App />
        </DictionaryProvider>
      </EnumProvider>
    </AuthProvider>
  </StrictMode>,
);
