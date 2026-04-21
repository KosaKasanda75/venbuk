import { useContext } from "react";
import { EnumContext } from "../contexts/EnumContext";

function useEnum() {
  const context = useContext(EnumContext);
  if (context === undefined)
    throw Error("EnumContext used outside EnumProvider");
  return context;
}

export default useEnum;
