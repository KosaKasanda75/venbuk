import { useContext } from "react";
import { DictionaryContext } from "../contexts/DictionaryContext";

function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined)
    throw Error("DictionaryContext used outsied DictionaryProvider");
  return context;
}

export default useDictionary;
