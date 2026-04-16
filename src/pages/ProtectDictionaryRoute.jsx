import { Navigate, Outlet } from "react-router-dom";
import useDictionary from "../hooks/useDictionary";

function ProtectDictionaryRoute() {
  const { dictionaryExists } = useDictionary();

  return dictionaryExists ? (
    <Outlet />
  ) : (
    <Navigate to="/new-dictionary" replace />
  );
}

export default ProtectDictionaryRoute;
