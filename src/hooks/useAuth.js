import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("AuthContext used outside AuthProvider");
  return context;
}

export default useAuth;
