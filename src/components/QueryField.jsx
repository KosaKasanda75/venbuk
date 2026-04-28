import { useNavigate } from "react-router-dom";
import styles from "./QueryField.module.css";
import { useEffect, useState } from "react";
import apiFetch from "../helpers/fetchWrapper";
import useDictionary from "../hooks/useDictionary";
import { GetOptions } from "../helpers/fetchOptions";

const RANDOM_WORD_LIST = "RandomWords";

function QueryField() {
  const navigate = useNavigate();
  const [query, setQuery] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const { dictionary } = useDictionary();

  useEffect(
    function () {
      async function getRandomWords() {
        try {
          const res = await apiFetch(
            `/dictionaries/${dictionary.id}/words`,
            GetOptions,
          );
          if (!res.ok) {
            const err = await res.json();
            console.log(err.detail ?? `HTTP ${res.status}`);
            return;
          }

          const data = await res.json(); // array of words, sorted alphabetically
          setRandomWords(data.items);
          localStorage.setItem(
            RANDOM_WORD_LIST,
            JSON.stringify({ id: dictionary.id, words: data.items }),
          );
        } catch (fetchError) {
          console.log(fetchError);
        }
      }
      async function putRandomWords(words) {
        setRandomWords(words);
      }

      const storedWords = JSON.stringify(
        localStorage.getItem(RANDOM_WORD_LIST),
      );
      if (!storedWords || storedWords?.id !== dictionary.id) {
        getRandomWords();
      } else {
        putRandomWords(storedWords.words);
      }
    },
    [dictionary],
  );

  async function findMatchingWords(currentQuery) {
    if (currentQuery.length < 2) {
      setSuggestedWords([]);
      return;
    }

    try {
      const res = await apiFetch(
        `/dictionaries/${dictionary.id}/words/search?q=${encodeURIComponent(currentQuery)}`,
        GetOptions,
      );
      if (!res.ok) {
        const err = await res.json();
        console.log(err.detail ?? `HTTP ${res.status}`);
        return;
      }

      const data = await res.json(); // array of words, sorted alphabetically
      const unique = [...new Map(data.map((w) => [w.spelling, w])).values()];
      setSuggestedWords(unique);
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  return (
    <div className={styles.wrapper}>
      {suggestedWords.length < 1 && randomWords && (
        <ul className={styles.randomResults}>
          {randomWords.map((word) => (
            <li className={styles.randomResult} key={word.id}>
              <p className={styles.suggestedWord}>
                <em>{word.spelling}</em>
              </p>
              <p className={styles.suggestedDefinition}>
                <strong>{word.word_class}: </strong>
                {word.definition}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.foreground}>
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

          {suggestedWords.length > 0 && (
            <ul className={styles.suggestedResults}>
              {suggestedWords.map((word) => (
                <li
                  className={styles.suggestedResult}
                  key={word.id}
                  onClick={() =>
                    navigate(
                      `/search/results?word=${encodeURIComponent(word.spelling)}`,
                    )
                  }
                >
                  <p className={styles.suggestedWord}>
                    <em>{word.spelling}</em>
                  </p>
                  {/* <p className={styles.suggestedDefinition}>
                  <strong>{word.word_class}: </strong>
                  {word.definition}
                </p> */}
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
      </div>
    </div>
  );
}

export default QueryField;
