import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDictionary from "../hooks/useDictionary";

function ProtectEditorRoute({ children }) {
  const { memberRole } = useDictionary();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (memberRole === "viewer") navigate("/search", { replace: true });
    },
    [memberRole, navigate],
  );

  return memberRole === "viewer" ? null : children;
}

export default ProtectEditorRoute;
