import { NavLink, useNavigate } from "react-router-dom";
import styles from "./GamesOverview.module.css";
import { useEffect, useState } from "react";
import useDictionary from "../hooks/useDictionary";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import Button from "./Button";

function GamesOverview() {
  const navigate = useNavigate();
  const { dictionary, genders, nounClasses } = useDictionary();
  const [wordofTheDay, setWordOfTheDay] = useState(null);

  useEffect(
    function () {
      // Day boundary is UTC midnight, so key the cache by the UTC date.
      const utcDay = new Date().toISOString().slice(0, 10);
      const storageKey = `wordOfTheDay:${dictionary.id}`;

      function readCachedWord() {
        try {
          const cached = JSON.parse(localStorage.getItem(storageKey));
          if (cached && cached.date === utcDay && cached.word) {
            return cached.word;
          }
        } catch {
          // Ignore malformed cache and fall through to a fetch.
        }
        return null;
      }

      async function getWordOfTheDay() {
        const cachedWord = readCachedWord();
        if (cachedWord) {
          setWordOfTheDay(cachedWord);
          return;
        }

        try {
          const res = await apiFetch(
            `/dictionaries/${dictionary.id}/word_of_day`,
            GetOptions,
          );
          if (!res.ok) {
            const err = await res.json();
            console.log(err.detail ?? `HTTP ${res.status}`);
            return;
          }

          const data = await res.json();
          setWordOfTheDay(data.word);
          try {
            localStorage.setItem(
              storageKey,
              JSON.stringify({ date: utcDay, word: data.word }),
            );
          } catch {
            // Ignore storage write failures (e.g. quota, private mode).
          }
        } catch (fetchError) {
          console.log(fetchError);
        }
      }
      getWordOfTheDay();
    },
    [dictionary.id],
  );

  return (
    <div className={styles.container}>
      {wordofTheDay && (
        <div className={styles.wordOfDayBox}>
          <h1>Word of the Day</h1>
          <h2 className={styles.spelling}>{wordofTheDay.spelling}</h2>
          {wordofTheDay.word_class !== "unsure" && (
            <h3>
              {wordofTheDay.word_class.charAt(0).toUpperCase() +
                wordofTheDay.word_class.slice(1)}{" "}
              {wordofTheDay.noun_class_id ? (
                <span className={styles.nounClassText}>
                  -{" "}
                  {
                    nounClasses.find((n) => n.id === wordofTheDay.noun_class_id)
                      ?.name
                  }
                </span>
              ) : (
                ""
              )}
            </h3>
          )}
          {wordofTheDay.pronunciation && (
            <p className={styles.pronunciation}>{wordofTheDay.pronunciation}</p>
          )}
          {wordofTheDay.gender_id && (
            <h3>
              {genders.find((g) => g.id === wordofTheDay.gender_id)?.name}
            </h3>
          )}
          <p className={styles.defintion}>{wordofTheDay.definition}</p>
          {wordofTheDay.examples && (
            <ul className={styles.exampleSentenceList}>
              {wordofTheDay.examples.map((ex) => (
                <li key={ex.id} className={styles.exampleSentence}>
                  {ex.example}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Button onClick={() => navigate("meaning-guesser")}>
        Name &amp; Meaning Guess
      </Button>
    </div>
  );
}

export default GamesOverview;
