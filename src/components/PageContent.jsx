import useAuth from "../hooks/useAuth";
import LongLogo from "./LongLogo";

function PageContent({ children, menu }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fullpage">
      {isAuthenticated && (
        <div className="inactiveTop">
          <LongLogo />
        </div>
      )}
      <div className="activeBox">{children}</div>
      {menu}
    </div>
  );
}

export default PageContent;
