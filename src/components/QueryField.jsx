import { useNavigate } from "react-router-dom";
import styles from "./QueryField.module.css";
import { useState } from "react";
import apiFetch from "../helpers/fetchWrapper";
import useDictionary from "../hooks/useDictionary";
import { GetOptions } from "../helpers/fetchOptions";

const API_URL = "http://localhost:8000";
// const API_URL = "https://www.api.venbuk.com";

function QueryField() {
  const navigate = useNavigate();
  const [query, setQuery] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);
  const { dictionary } = useDictionary();

  async function findMatchingWords(currentQuery) {
    if (currentQuery.length < 2) {
      setSuggestedWords([]);
      return;
    }

    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/words/search?q=${encodeURIComponent(currentQuery)}`,
        GetOptions,
      );
      if (!res.ok) {
        const err = await res.json();
        console.log(err.detail ?? `HTTP ${res.status}`);
        return;
      }

      const data = await res.json(); // array of words, sorted alphabetically
      setSuggestedWords(data);
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  return (
    <>
      <p className={styles.dictionaryName}>{dictionary.name} Dictionary</p>
      <div className={styles.container}>
        <form className={styles.queryBox}>
          <label className={styles.searchLabel} htmlFor="searchText">
            Search
          </label>
          <input
            type="text"
            className={styles.inputField}
            id="searchText"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              findMatchingWords(e.target.value);
            }}
          />
        </form>

        {suggestedWords && (
          <ul className={styles.suggestedResults}>
            {suggestedWords.map((word) => (
              <li
                className={styles.suggestedResult}
                key={word.id}
                onClick={() => navigate(`/search/results/${word.id}`)}
              >
                <p className={styles.suggestedWord}>
                  <em>{word.spelling}</em>
                </p>
                <p className={styles.suggestedDefinition}>
                  <strong>{word.word_class}: </strong>
                  {word.definition}
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
    </>
  );
}

export default QueryField;
