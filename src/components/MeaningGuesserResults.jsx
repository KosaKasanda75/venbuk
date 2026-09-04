import styles from "./MeaningGuesser.module.css";
import {
  promptText,
  answerText,
  optionById,
  scoreRows,
} from "../helpers/meaningGuess";

// Renders a scored breakdown of a quiz group. Used both for a freshly
// submitted quiz and for expanding a past quiz. `mode` controls which way
// round the term is shown ("meaning" | "name").
function MeaningGuesserResults({
  rows,
  selections,
  mode = "meaning",
  showScore = true,
}) {
  const { correct, total } = scoreRows(rows, selections);

  return (
    <div className={styles.results}>
      {showScore && (
        <p className={styles.score}>
          {correct} / {total} correct
        </p>
      )}

      <ol className={styles.resultList}>
        {rows.map((row, index) => {
          const chosenId = selections[row.id];
          const isCorrect = chosenId === row.term?.id;
          const isAnswered = chosenId != null;
          const chosenTerm = chosenId ? optionById(row, chosenId) : null;

          return (
            <li key={row.id} className={styles.resultItem}>
              <p className={styles.resultTerm}>
                <span className={styles.resultNumber}>{index + 1}.</span>{" "}
                {promptText(row.term, mode)}
                <span
                  className={`${styles.resultBadge} ${
                    !isAnswered
                      ? styles.badgeSkipped
                      : isCorrect
                        ? styles.badgeCorrect
                        : styles.badgeWrong
                  }`}
                >
                  {!isAnswered ? "Skipped" : isCorrect ? "Correct" : "Wrong"}
                </span>
              </p>

              <p className={styles.resultCorrect}>
                <span className={styles.resultLabel}>Answer:</span>{" "}
                {answerText(row.term, mode)}
              </p>

              {isAnswered && !isCorrect && (
                <p className={styles.resultChosen}>
                  <span className={styles.resultLabel}>You chose:</span>{" "}
                  {chosenTerm ? answerText(chosenTerm, mode) : "—"}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default MeaningGuesserResults;
