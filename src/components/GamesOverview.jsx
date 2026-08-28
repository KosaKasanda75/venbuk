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
      async function getWordOfTheDay() {
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
        } catch (fetchError) {
          console.log(fetchError);
        }
      }
      getWordOfTheDay();
    },
    [dictionary.id],
  );

  return (
    <div>
      {wordofTheDay && (
        <div className={styles.wordOfDayBox}>
          <h1>Word of the Day</h1>
          <h2>{wordofTheDay.spelling}</h2>
          {wordofTheDay.word_class !== "unsure" && (
            <h2>
              {wordofTheDay.word_class}{" "}
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
            </h2>
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
      <NavLink to="/games/meaning-guesser">Meaning Guess</NavLink>
      <Button onClick={() => navigate("meaning-guesser")}>Meaning Guess</Button>
    </div>
  );
}

export default GamesOverview;
