import { useNavigate } from "react-router-dom";
import useDictionary from "../hooks/useDictionary";
import { useEffect } from "react";

function ProtectDictionary({ children }) {
  const { dictionaryExists } = useDictionary();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!dictionaryExists)
        navigate("/settings/dictionaries", { replace: true });
    },
    [dictionaryExists, navigate],
  );

  return dictionaryExists ? children : null;
}

export default ProtectDictionary;
