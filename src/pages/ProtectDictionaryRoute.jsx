import { Navigate, Outlet } from "react-router-dom";
import useDictionary from "../hooks/useDictionary";

function ProtectDictionaryRoute() {
  const { dictionaryExists } = useDictionary();

  return dictionaryExists ? (
    <Outlet />
  ) : (
    <Navigate to="/settings/dictionaries" replace />
  );
}

export default ProtectDictionaryRoute;
