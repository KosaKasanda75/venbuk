import styles from "./WordResult.module.css";
import BackButton from "./BackButton";
import WordInfo from "./WordInfo";
import ExpressionInfo from "./ExpressionInfo";
import HonorificInfo from "./HonorificInfo";
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
  const searchWordId = searchParams.get("id");
  const searchWordType = searchParams.get("type");
  const { dictionary } = useDictionary();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(`Type: ${searchWordType}`);

  useEffect(
    function () {
      async function lookUpWord() {
        setLoading(true);

        const res = searchWord
          ? await apiFetch(
              `/dictionaries/${dictionary.id}/${searchWordType}s/spelling?q=${searchWord}`,
              GetOptions,
            )
          : await apiFetch(
              `/dictionaries/${dictionary.id}/${searchWordType}s/${searchWordId}`,
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
    [searchWord, dictionary, searchWordType, searchWordId],
  ); // important: refetch if word changes

  function renderResult(item) {
    if (searchWordType === "expression") {
      return <ExpressionInfo key={item.id} expression={item} />;
    }
    if (searchWordType === "honorific") {
      return <HonorificInfo key={item.id} honorific={item} />;
    }
    return <WordInfo key={item.id} word={item} />;
  }

  return (
    <div className={styles.container}>
      <BackButton title="Search" path="/search" />
      {data && !loading && (
        <>
          <p>{searchWordType || `hello`}</p>
          {searchWordType === "word" && <h1>{searchWord}</h1>}
          {/* {searchWordType === "expression" && <h1>{data.sentence}</h1>} */}
          {searchWordType === "honorific" && (
            <h1>
              {data.placement === "prefix" ? `${data.word}-` : `-${data.word}`}
            </h1>
          )}
          {!Array.isArray(data) && renderResult(data)}
          {Array.isArray(data) && data.map((item) => renderResult(item))}
        </>
      )}
      {loading && <LoadingContent />}
      {!data && !loading && (
        <p>{searchWord ? `${searchWord} not found` : "Not found"}</p>
      )}
    </div>
  );
}

export default WordResult;
