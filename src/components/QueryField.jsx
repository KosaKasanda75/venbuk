import { useNavigate } from "react-router-dom";
import styles from "./QueryField.module.css";
import { useState } from "react";
import apiFetch from "../helpers/fetchWrapper";
import useDictionary from "../hooks/useDictionary";
import { GetOptions } from "../helpers/fetchOptions";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://www.api.venbuk.com";

function QueryField() {
  const navigate = useNavigate();
  const [query, setQuery] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);
  const { dictionary } = useDictionary();

  async function findMatchingWords() {
    if (query.length < 3) return;

    const res = await apiFetch(
      `${BASE_URL}/dictionaries/${dictionary.id}/words/search?q=${encodeURIComponent(query)}`,
      GetOptions,
    );
    if (!res.ok) {
      const err = await res.json();
      // throw new Error(err.detail ?? `HTTP ${res.status}`);
      console.log(err.detail ?? `HTTP ${res.status}`);
    }

    const data = await res.json(); // array of words, sorted alphabetically
    setSuggestedWords(data);
  }

  return (
    <div className={styles.container}>
      <form className={styles.queryBox}>
        <label className={styles.searchLabel} for="searchText">
          Search
        </label>
        <input
          type="text"
          className={styles.inputField}
          id="searchText"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            findMatchingWords();
          }}
        />
      </form>

      {suggestedWords && (
        <ul className={styles.suggestedResults}>
          {suggestedWords.map((word) => (
            <li
              className={styles.suggestedResult}
              onClick={() => navigate(`/search/result/${word.id}`)}
            >
              <p className={styles.suggestedWord}>
                <em>{word.spelling}</em>
              </p>
              <p className={styles.suggestedDefinition}>
                {word.word_class}:{word.definition}
              </p>
            </li>
          ))}
          {/* <li
          className={styles.suggestedResult}
          onClick={() => navigate("/search/result")}
        >
          <p className={styles.suggestedWord}>
            <em>Word</em>
          </p>
          <p className={styles.suggestedDefinition}>This is a definition</p>
        </li> */}
        </ul>
      )}
    </div>
  );
}

export default QueryField;
