import useAuth from "../hooks/useAuth";
import LongLogo from "./LongLogo";

function PageContent({ children, type, menu }) {
  const { isAuthenticated } = useAuth();

  function getBackground(selector = "none") {
    switch (selector) {
      case "login":
        return "loginBg";
      case "search":
        return "searchBg";
      default:
        return "";
    }
  }

  const bg = getBackground(type);

  return (
    <div className={`fullpage ${bg}`}>
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
