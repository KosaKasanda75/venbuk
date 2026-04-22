import styles from "./WordResult.module.css";
import BackButton from "./BackButton";
import WordInfo from "./WordInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiFetch from "../helpers/fetchWrapper";
import { GetOptions } from "../helpers/fetchOptions";
import useDictionary from "../hooks/useDictionary";

const API_URL = "http://localhost:8000";
// const API_URL = "https://www.api.venbuk.com";

function WordResult() {
  // const data = useLoaderData();
  // console.log(data);
  const { id } = useParams();
  const { dictionary } = useDictionary();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function lookUpWord() {
        setLoading(true);

        const res = await apiFetch(
          `${API_URL}/dictionaries/${dictionary.id}/words/${id}`,
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
    [id, dictionary],
  ); // important: refetch if id changes

  return (
    <div className={styles.container}>
      <BackButton />
      {data && (
        <>
          <h1>Word</h1>
          <WordInfo word={data} />
        </>
      )}
      {!data && <p>No data found</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default WordResult;
