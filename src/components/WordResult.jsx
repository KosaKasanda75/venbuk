import styles from "./WordResult.module.css";
import BackButton from "./BackButton";
import WordInfo from "./WordInfo";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import useDictionary from "../hooks/useDictionary";
import LoadingContent from "./LoadingContent";

function WordResult() {
  // const data = useLoaderData();
  // console.log(data);
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("word");
  const { dictionary } = useDictionary();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function lookUpWord() {
        setLoading(true);

        const res = await apiFetch(
          `/dictionaries/${dictionary.id}/words/spelling?q=${searchWord}`,
          GetOptions,
        );
        if (!res.ok) {
          const err = await res.json();
          setLoading(false);
          console.error(err.detail ?? `HTTP ${res.status}`);
          return;
        }
        const data = await res.json();
        setData(data);
        setLoading(false);
      }
      lookUpWord();
    },
    [searchWord, dictionary],
  ); // important: refetch if word changes

  return (
    <div className={styles.container}>
      <BackButton />
      {data && !loading && (
        <>
          <h1>{searchWord}</h1>
          {!Array.isArray(data) && <WordInfo word={data} />}
          {Array.isArray(data) &&
            data.map((word) => <WordInfo key={word.id} word={word} />)}
        </>
      )}
      {loading && <LoadingContent />}
      {!data && !loading && <p>{searchWord} not found</p>}
    </div>
  );
}

export default WordResult;
