import { RxCross2 } from "react-icons/rx";
import styles from "./NewWordForm.module.css";
import Button from "./Button";
import useDictionary from "../hooks/useDictionary";
import { PostOptions } from "../helpers/fetchOptions";
import apiFetch from "../helpers/fetchWrapper";
import { useState } from "react";
import useEnum from "../hooks/useEnum";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";

const API_URL = "http://localhost:8001";
// const API_URL = "https://api.venbuk.com";

function NewWordForm() {
  const { dictionary, nounClasses, genders, tags } = useDictionary();
  const { wordClasses } = useEnum();
  const [spelling, setSpelling] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [wordClass, setWordClass] = useState("unsure");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [nounClassId, setNounClassId] = useState(
    nounClasses?.at(0)?.id || null,
  );
  const [genderId, setGenderId] = useState(genders?.at(0)?.id || null);
  const [tagQuery, setTagQuery] = useState("");
  const [tagIds, setTagIds] = useState([]);

  function clearForm() {
    setSpelling("");
    setPronunciation("");
    setWordClass("unsure");
    setDefinition("");
    setNounClassId(nounClasses?.at(0)?.id || null);
    setGenderId(genders?.at(0)?.id || null);
    setTagQuery("");
    setTagIds([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!spelling || !wordClass || !definition) return;

    // Need to add example sentences
    const word = {
      spelling: spelling.toLowerCase(),
      word_class: wordClass,
      definition,
      ...(pronunciation && { pronunciation: pronunciation }),
      ...(wordClass === "noun" && nounClassId && { noun_class_id: nounClassId }),
      ...(genderId && { gender_id: genderId }),
      ...(tagIds && { tag_ids: tagIds }),
    };

    console.log(word);

    try {
      const res = await apiFetch(
        `${API_URL}/dictionaries/${dictionary.id}/words/`,
        {
          ...PostOptions,
          body: JSON.stringify(word),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const data = await res.json(); // returns WordRead
      return data;
    } catch (fetchError) {
      console.log(fetchError);
    }

    // const wordData = {
    //   // Required
    //   spelling: "amani",
    //   word_class: "noun",
    //   definition: "A state of harmony and absence of conflict.",

    //   // Optional
    //   summary_definition: "peace",
    //   noun_class_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // only if word_class is "noun"
    //   gender_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    //   tag_ids: [
    //     "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    //     "deadbeef-dead-beef-dead-beefdeadbeef",
    //   ],
    // };

    // const wordData = {
    //   spelling: "kuruka",
    //   word_class: "verb",
    //   definition: "To propel oneself upward off the ground.",
    // };

    clearForm();
    // MAYBE GO TO WORD RESULT PAGE
  }

  return (
    <>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <div className={styles.oneLineField}>
          <label htmlFor="wordTextInput">Word</label>
          <input
            className={styles.oneLineTextBox}
            type="text"
            id="wordTextInput"
            value={spelling}
            onChange={(e) => setSpelling(e.target.value)}
          />
        </div>

        <div className={styles.oneLineField}>
          <label htmlFor="wordPronunciation">Pronunciation</label>
          <input
            className={styles.oneLineTextBox}
            type="text"
            id="wordPronunciation"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="wordDefinition">Definition</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="wordDefinition"
            rows={LARGE_TEXT_AREA_ROWS}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="wordExampleUse">Example Sentence</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="wordExampleUse"
            rows={LARGE_TEXT_AREA_ROWS}
            value={example}
            onChange={(e) => setExample(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.oneLineField}>
          <label htmlFor="wordClassSelect">Type</label>
          <select
            id="wordClassSelect"
            value={wordClass}
            onChange={(e) => setWordClass(e.target.value)}
          >
            {[...wordClasses]
              .sort((a, b) => {
                if (a.toLowerCase() === "unsure") return -1;
                if (b.toLowerCase() === "unsure") return 1;
                return a.localeCompare(b);
              })
              .map((wClass) => (
                <option key={wClass} value={wClass}>
                  {wClass}
                </option>
              ))}
            {/* <option value={1}>1</option> */}
          </select>
        </div>

        {nounClassId && wordClass.toLowerCase() === "noun" && (
          <div className={styles.oneLineField}>
            <label htmlFor="nounClassSelect">Class</label>
            <select
              id="nounClassSelect"
              value={nounClassId}
              onChange={(e) => setNounClassId(e.target.value)}
            >
              {nounClasses.map((nClass) => (
                <option key={nClass.id} value={nClass.id}>
                  {nClass.name}
                </option>
              ))}
              {/* <option value={1}>1</option> */}
            </select>
          </div>
        )}
        {!nounClassId && wordClass.toLowerCase() === "noun" && (
          <div className={styles.oneLineField}>
            <label htmlFor="nounClassSelect">Class</label>
            <select id="nounClassSelect">
              <option value={1}>No Noun Classes Defined</option>
            </select>
          </div>
        )}

        {genderId && (
          <div className={styles.oneLineField}>
            <label htmlFor="genderSelect">Gender</label>
            <select
              id="genderSelect"
              value={genderId}
              onChange={(e) => setGenderId(e.target.value)}
            >
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
              {/* <option value={1}>1</option> */}
            </select>
          </div>
        )}
        {!genderId && (
          <div className={styles.oneLineField}>
            <label htmlFor="genderSelect">Gender</label>
            <select id="genderSelect">
              <option value={1}>No Genders Defined</option>
            </select>
          </div>
        )}

        <div className={styles.oneLineField}>
          <label htmlFor="wordTagInput">Tags</label>
          <div className={styles.oneLineTextBox}>
            <input
              className={styles.autocompletedTextBox}
              type="text"
              id="wordTagInput"
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
            />
            {tagQuery && (
              <ul className={styles.autocompleteOptions}>
                {tags
                  .filter((tag) =>
                    tag.name.toLowerCase().includes(tagQuery.toLowerCase()),
                  )
                  .map((tag) => (
                    <li
                      key={tag.id}
                      onClick={() => {
                        setTagIds((tagList) => [...tagList, tag.id]);
                        setTagQuery("");
                      }}
                    >
                      {tag.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <ul className={styles.selectedTags}>
          {tags
            .filter((obj) => tagIds.includes(obj.id))
            .map((tag) => (
              <li key={tag.id}>
                <p className={styles.tagText}>{tag.name}</p>
                <RxCross2
                  className={styles.tagIcon}
                  onClick={() =>
                    setTagIds((ids) => ids.filter((id) => id !== tag.id))
                  }
                />
              </li>
            ))}
          {/* <li>
            <p className={styles.tagText}>Tag</p>
            <RxCross2 className={styles.tagIcon} />
          </li> */}
        </ul>
      </form>
      <Button type="central" onClick={handleSubmit}>
        Create
      </Button>
    </>
  );
}

export default NewWordForm;
