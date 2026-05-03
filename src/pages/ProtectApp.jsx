import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageLoading from "./FullPageLoading";

function ProtectApp() {
  const { isAuthenticated, authVerifying } = useAuth();
  const location = useLocation();

  if (authVerifying) return <FullPageLoading />;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectApp;
