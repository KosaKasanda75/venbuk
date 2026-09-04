import { useCallback, useEffect, useState } from "react";
import styles from "./MeaningGuesserPastQuizzes.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import LoadingContent from "../components/LoadingContent";
import MeaningGuesserResults from "../components/MeaningGuesserResults";
import useDictionary from "../hooks/useDictionary";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import { QUIZ_MODES, scoreRows } from "../helpers/meaningGuess";

const PAGE_SIZE = 20;

function MeaningGuesserPastQuizzes() {
  const { dictionary } = useDictionary();
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("meaning");

  const loadPage = useCallback(
    async function loadPage(nextOffset) {
      const first = nextOffset === 0;
      if (first) setLoading(true);
      else setLoadingMore(true);
      setError("");

      try {
        const res = await apiFetch(
          `/dictionaries/${dictionary.id}/meaning_guess?limit=${PAGE_SIZE}&offset=${nextOffset}`,
          GetOptions,
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail ?? `HTTP ${res.status}`);
        }
        const data = await res.json();
        const pageItems = data.items ?? [];
        setItems((prev) => (first ? pageItems : [...prev, ...pageItems]));
        setOffset(nextOffset + pageItems.length);
        setHasMore(Boolean(data.next));
      } catch (fetchError) {
        console.log(fetchError);
        setError("Could not load previous quizzes.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [dictionary.id],
  );

  useEffect(() => {
    loadPage(0);
  }, [loadPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.backRow}>
        <BackButton title="Name & Meaning Guess" path="/games/meaning-guesser" />
      </div>
      <h1>Previous Tests</h1>

      {!loading && !error && items.length > 0 && (
        <div className={styles.modeRow}>
          {QUIZ_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              className={`${styles.modePill} ${
                mode === m.value ? styles.modePillActive : ""
              }`}
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {loading && <LoadingContent />}
      {!loading && error && <p className={styles.error}>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className={styles.empty}>You haven&apos;t taken any quizzes yet.</p>
      )}

      {!loading && items.length > 0 && (
        <ul className={styles.quizList}>
          {items.map((item, index) => (
            <PastQuizCard
              key={item.group_id}
              item={item}
              mode={mode}
              label={`Quiz ${items.length - index}`}
            />
          ))}
        </ul>
      )}

      {hasMore && !loading && (
        <Button
          type="subtle"
          onClick={() => loadPage(offset)}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading…" : "Load more"}
        </Button>
      )}
    </div>
  );
}

function PastQuizCard({ item, label, mode }) {
  const { dictionary } = useDictionary();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [selections, setSelections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const answeredCount = item.rows.filter((r) => r.answer_id != null).length;
  const complete = answeredCount === item.row_count;

  async function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);

    if (detail) return;

    setLoading(true);
    setError("");
    try {
      const res = await apiFetch(
        `/dictionaries/${dictionary.id}/meaning_guess/${item.group_id}`,
        GetOptions,
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }
      const data = await res.json();
      const picks = {};
      for (const row of data.rows) {
        if (row.answer_id != null) picks[row.id] = row.answer_id;
      }
      setDetail(data);
      setSelections(picks);
    } catch (fetchError) {
      console.log(fetchError);
      setError("Could not load this quiz.");
    } finally {
      setLoading(false);
    }
  }

  const score =
    detail && selections ? scoreRows(detail.rows, selections) : null;

  return (
    <li className={styles.card}>
      <button type="button" className={styles.cardHeader} onClick={toggle}>
        <span className={styles.cardTitle}>{label}</span>
        <span className={styles.cardMeta}>
          {score
            ? `${score.correct}/${score.total}`
            : `${answeredCount}/${item.row_count}`}
          <span
            className={`${styles.status} ${
              complete ? styles.statusDone : styles.statusOpen
            }`}
          >
            {complete ? "Completed" : "In progress"}
          </span>
          <span className={styles.chevron}>{open ? "▲" : "▼"}</span>
        </span>
      </button>

      {open && (
        <div className={styles.cardBody}>
          {loading && <LoadingContent />}
          {error && <p className={styles.error}>{error}</p>}
          {detail && selections && (
            <MeaningGuesserResults
              rows={detail.rows}
              mode={mode}
              selections={selections}
            />
          )}
        </div>
      )}
    </li>
  );
}

export default MeaningGuesserPastQuizzes;
