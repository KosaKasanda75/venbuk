import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MeaningGuesser.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import Confirm from "./Confirm";
import LoadingContent from "./LoadingContent";
import MeaningGuesserResults from "./MeaningGuesserResults";
import useDictionary from "../hooks/useDictionary";
import apiFetch from "../helpers/fetchWrapper";
import { PostOptions } from "../helpers/fetchOptions";
import {
  QUIZ_TYPES,
  QUIZ_MODES,
  promptText,
  answerText,
  scoreRows,
} from "../helpers/meaningGuess";

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 20;

function MeaningGuesser() {
  // setup -> loading -> quiz -> submitting -> results
  const [stage, setStage] = useState("setup");
  const [group, setGroup] = useState(null);
  const [selections, setSelections] = useState({});
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState("meaning");

  function startQuiz(loadedGroup, quizMode) {
    setGroup(loadedGroup);
    setMode(quizMode);
    setSelections({});
    setCurrent(0);
    setStage("quiz");
  }

  function resetToSetup() {
    setGroup(null);
    setSelections({});
    setCurrent(0);
    setStage("setup");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backRow}>
        <BackButton title="Games" path="/games" />
      </div>
      <h1>Name &amp; Meaning Guess</h1>

      {stage === "setup" && <MGSetup onReady={startQuiz} />}

      {stage === "quiz" && (
        <MGQuiz
          group={group}
          mode={mode}
          selections={selections}
          setSelections={setSelections}
          current={current}
          setCurrent={setCurrent}
          onSubmitted={() => setStage("submitting")}
          onDone={() => setStage("results")}
        />
      )}

      {stage === "submitting" && <LoadingContent />}

      {stage === "results" && (
        <div className={styles.stage}>
          <MeaningGuesserResults
            rows={group.rows}
            mode={mode}
            selections={selections}
          />
          <Button type="central" onClick={resetToSetup}>
            New Quiz
          </Button>
        </div>
      )}
    </div>
  );
}

function MGSetup({ onReady }) {
  const navigate = useNavigate();
  const { dictionary } = useDictionary();
  const [type, setType] = useState("word");
  const [mode, setMode] = useState("meaning");
  const [count, setCount] = useState(10);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function changeCount(next) {
    setCount(Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, next)));
  }

  async function handleStart() {
    setMessage("");
    setBusy(true);

    try {
      const res = await apiFetch(
        `/dictionaries/${dictionary.id}/meaning_guess/generate`,
        { ...PostOptions, body: JSON.stringify({ type, count }) },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!data.available) {
        setMessage(
          data.message ??
            `This dictionary needs at least 15 ${type}s to play. It has ${data.term_count ?? 0}.`,
        );
        setBusy(false);
        return;
      }

      onReady(data, mode);
    } catch (fetchError) {
      console.log(fetchError);
      setMessage("Something went wrong starting the quiz. Please try again.");
      setBusy(false);
    }
  }

  if (busy) return <LoadingContent />;

  return (
    <div className={styles.stage}>
      <p className={styles.description}>
        Match each term with the right answer from four choices.
      </p>

      <div className={styles.setupField}>
        <span className={styles.setupLabel}>Quiz type</span>
        <div className={styles.typeRow}>
          {QUIZ_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              className={`${styles.typePill} ${
                mode === m.value ? styles.typePillActive : ""
              }`}
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <span className={styles.hint}>
          {QUIZ_MODES.find((m) => m.value === mode)?.hint}
        </span>
      </div>

      <div className={styles.setupField}>
        <span className={styles.setupLabel}>Term type</span>
        <div className={styles.typeRow}>
          {QUIZ_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`${styles.typePill} ${
                type === t.value ? styles.typePillActive : ""
              }`}
              onClick={() => setType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.setupField}>
        <label className={styles.setupLabel} htmlFor="questionCount">
          Number of questions
        </label>
        <div className={styles.counterRow}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => changeCount(count - 1)}
            disabled={count <= MIN_QUESTIONS}
          >
            &minus;
          </button>
          <input
            id="questionCount"
            className={styles.countInput}
            type="number"
            min={MIN_QUESTIONS}
            max={MAX_QUESTIONS}
            value={count}
            onChange={(e) => changeCount(Number(e.target.value))}
          />
          <button
            type="button"
            className={styles.stepBtn}
            onClick={() => changeCount(count + 1)}
            disabled={count >= MAX_QUESTIONS}
          >
            +
          </button>
        </div>
        <span className={styles.hint}>Up to {MAX_QUESTIONS} per quiz.</span>
      </div>

      {message && <p className={styles.error}>{message}</p>}

      <Button type="central" onClick={handleStart}>
        Start Quiz
      </Button>
      <Button type="plain" onClick={() => navigate("past-quizzes")}>
        Previous Tests
      </Button>
    </div>
  );
}

function MGQuiz({
  group,
  mode,
  selections,
  setSelections,
  current,
  setCurrent,
  onSubmitted,
  onDone,
}) {
  const { dictionary } = useDictionary();
  const [showConfirm, setShowConfirm] = useState(false);

  const rows = group.rows;
  const row = rows[current];
  const isLast = current === rows.length - 1;
  const { answered, total } = scoreRows(rows, selections);

  function choose(optionId) {
    setSelections((prev) => ({ ...prev, [row.id]: optionId }));
  }

  async function submit() {
    setShowConfirm(false);
    onSubmitted();

    const payload = Object.entries(selections).map(([rowId, optionId]) => ({
      row_id: rowId,
      selected_option_id: optionId,
    }));

    try {
      if (payload.length > 0) {
        const res = await apiFetch(
          `/dictionaries/${dictionary.id}/meaning_guess/${group.group_id}/answers`,
          { ...PostOptions, body: JSON.stringify(payload) },
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail ?? `HTTP ${res.status}`);
        }
      }
    } catch (fetchError) {
      console.log(fetchError);
    }

    onDone();
  }

  function handleSubmitClick() {
    if (answered < total) {
      setShowConfirm(true);
      return;
    }
    submit();
  }

  return (
    <div className={styles.stage}>
      <div className={styles.progressRow}>
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{answered} answered</span>
      </div>

      <div className={styles.questionCard}>
        <p className={styles.questionPrompt}>{promptText(row.term, mode)}</p>

        <ul className={styles.optionList}>
          {row.options.map((option) => {
            const selected = selections[row.id] === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={`${styles.option} ${
                    selected ? styles.optionSelected : ""
                  }`}
                  onClick={() => choose(option.id)}
                >
                  {answerText(option, mode)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.navRow}>
        <Button
          type="subtle"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          Back
        </Button>
        {isLast ? (
          <Button type="central" onClick={handleSubmitClick}>
            Submit
          </Button>
        ) : (
          <Button
            type="central"
            onClick={() => setCurrent((c) => Math.min(rows.length - 1, c + 1))}
          >
            Next
          </Button>
        )}
      </div>

      {showConfirm && (
        <Confirm
          message={`You have ${total - answered} unanswered question${
            total - answered === 1 ? "" : "s"
          }. Submit anyway?`}
          onConfirm={submit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default MeaningGuesser;
