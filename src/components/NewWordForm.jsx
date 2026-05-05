import { RxCross2 } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiArrowFatLineDown, PiArrowFatLineDownFill } from "react-icons/pi";
import styles from "./NewWordForm.module.css";
import Button from "./Button";
import Confirm from "./Confirm";
import TerminologyModal from "./TerminologyModal";
import useDictionary from "../hooks/useDictionary";
import {
  DeleteOptions,
  PostOptions,
  PutOptions,
} from "../helpers/fetchOptions";
import apiFetch from "../helpers/fetchWrapper";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEnum from "../hooks/useEnum";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";
import { WordClassDefinitions, NounClassDefinition } from "../helpers/appInfo";

function NewWordForm() {
  const { state } = useLocation();
  const existingWord = state?.existingWord ?? {};
  const isEditing = Boolean(existingWord.id);
  const navigate = useNavigate();
  const { dictionary, nounClasses, genders, tags } = useDictionary();
  const { wordClasses } = useEnum();
  const [spelling, setSpelling] = useState(existingWord.spelling || "");
  const [lower, setLower] = useState(true);
  const [pronunciation, setPronunciation] = useState(
    existingWord.pronunciation || "",
  );
  const [wordClass, setWordClass] = useState(
    existingWord.word_class || "unsure",
  );
  const [definition, setDefinition] = useState(existingWord.definition || "");
  const [examples, setExamples] = useState(
    existingWord.examples?.map((e) => e.example) ?? [""],
  );
  const [nounClassId, setNounClassId] = useState(
    existingWord.noun_class_id || nounClasses?.at(0)?.id || null,
  );
  const [genderId, setGenderId] = useState(
    existingWord.gender_id || genders?.at(0)?.id || null,
  );
  const [tagQuery, setTagQuery] = useState("");
  const [tagIds, setTagIds] = useState(
    existingWord.tag_ids || existingWord.tags?.map((t) => t.id) || [],
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [modal, setModal] = useState(null);

  function clearForm() {
    setSpelling("");
    setPronunciation("");
    setWordClass("unsure");
    setDefinition("");
    setNounClassId(nounClasses?.at(0)?.id || null);
    setGenderId(genders?.at(0)?.id || null);
    setTagQuery("");
    setTagIds([]);
    setExamples([""]);
  }

  function addExample() {
    setExamples((prev) => [...prev, ""]);
  }

  function spellingCase(userInput) {
    const input = lower ? userInput.toLowerCase() : userInput;
    setSpelling(input);
  }

  function handleWordClassInfo() {
    if (wordClass.toLowerCase() !== "unsure") {
      const match = WordClassDefinitions.find(
        (def) =>
          def.name.toLowerCase().slice(0, -1) === wordClass.toLowerCase(),
      );
      match
        ? setModal({ title: match.name, explainer: [match] })
        : setModal({ title: "Word Classes", explainer: WordClassDefinitions });
    } else {
      setModal({ title: "Word Classes", explainer: WordClassDefinitions });
    }
  }

  function updateExample(index, value) {
    setExamples((prev) => prev.map((ex, i) => (i === index ? value : ex)));
  }

  function removeExample(index) {
    setExamples((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length === 0 ? [""] : next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!spelling || !wordClass || !definition) return;

    const word = {
      spelling: spelling.toLowerCase(),
      word_class: wordClass,
      definition,
      ...(pronunciation && { pronunciation: pronunciation }),
      ...(wordClass === "noun" &&
        nounClassId && { noun_class_id: nounClassId }),
      ...(genderId && { gender_id: genderId }),
      ...(!isEditing && tagIds.length > 0 && { tag_ids: tagIds }),
    };

    const url = isEditing
      ? `/dictionaries/${dictionary.id}/words/${existingWord.id}`
      : `/dictionaries/${dictionary.id}/words/`;
    const fetchOptions = isEditing ? PutOptions : PostOptions;

    try {
      const res = await apiFetch(url, {
        ...fetchOptions,
        body: JSON.stringify(word),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      const wordId = isEditing ? existingWord.id : data.id;

      if (isEditing) {
        const originalTagIds = existingWord.tags?.map((t) => t.id) ?? [];
        const tagsToAdd = tagIds.filter((id) => !originalTagIds.includes(id));
        const tagsToRemove = originalTagIds.filter(
          (id) => !tagIds.includes(id),
        );

        await Promise.all([
          ...tagsToAdd.map((tagId) =>
            apiFetch(
              `/dictionaries/${dictionary.id}/words/${wordId}/tags/${tagId}`,
              PostOptions,
            ),
          ),
          ...tagsToRemove.map((tagId) =>
            apiFetch(
              `/dictionaries/${dictionary.id}/words/${wordId}/tags/${tagId}`,
              DeleteOptions,
            ),
          ),
        ]);
      }

      if (isEditing && existingWord.examples?.length > 0) {
        await Promise.all(
          existingWord.examples.map((ex) =>
            apiFetch(
              `/dictionaries/${dictionary.id}/words/${wordId}/examples/${ex.id}`,
              DeleteOptions,
            ),
          ),
        );
      }

      const nonEmptyExamples = examples.filter((ex) => ex.trim());
      if (nonEmptyExamples.length > 0) {
        await apiFetch(
          `/dictionaries/${dictionary.id}/words/${wordId}/examples`,
          {
            ...PostOptions,
            body: JSON.stringify({ example: nonEmptyExamples }),
          },
        );
      }

      if (isEditing) {
        navigate(-1);
        return;
      }
    } catch (fetchError) {
      console.log(fetchError);
    }

    clearForm();
  }

  async function handleDelete() {
    try {
      const res = await apiFetch(
        `/dictionaries/${dictionary.id}/words/${existingWord.id}`,
        DeleteOptions,
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }
    } catch (fetchError) {
      console.log(fetchError);
    }
    clearForm();
    navigate(-1);
  }

  return (
    <>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <div className={styles.oneLineField}>
          <label htmlFor="wordTextInput">Word</label>
          <div className={styles.spellingInputWrapper}>
            <input
              className={styles.spellingInput}
              type="text"
              id="wordTextInput"
              value={spelling}
              onChange={(e) => spellingCase(e.target.value)}
            />
            {lower ? (
              <PiArrowFatLineDownFill
                className={styles.caseToggleIcon}
                onClick={() => setLower(false)}
              />
            ) : (
              <PiArrowFatLineDown
                className={styles.caseToggleIcon}
                onClick={() => setLower(true)}
              />
            )}
          </div>
        </div>

        <div className={styles.oneLineField}>
          <label htmlFor="wordPronunciation">Pronunciation</label>
          <input
            className={styles.oneLineTextBox}
            type="text"
            id="wordPronunciation"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value.toLowerCase())}
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
          <label>Example Sentences</label>
          {examples.map((ex, i) => (
            <div key={i} className={styles.exampleRow}>
              <textarea
                className={styles.largeTextBox}
                rows={LARGE_TEXT_AREA_ROWS}
                value={ex}
                onChange={(e) => updateExample(i, e.target.value)}
              />
              <RxCross2
                className={styles.tagIcon}
                onClick={() => removeExample(i)}
              />
            </div>
          ))}
          <Button type="transparent" onClick={addExample}>
            + Add Example
          </Button>
        </div>

        <div className={styles.oneLineField}>
          <label htmlFor="wordClassSelect">
            Type{" "}
            <IoInformationCircleOutline
              className={styles.infoIcon}
              onClick={handleWordClassInfo}
            />
          </label>
          <select
            id="wordClassSelect"
            className={styles.dropdown}
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
            <label htmlFor="nounClassSelect">
              Class{" "}
              <IoInformationCircleOutline
                className={styles.infoIcon}
                onClick={() =>
                  setModal({
                    title: "Noun Classes",
                    explainer: NounClassDefinition,
                  })
                }
              />
            </label>
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
            <label htmlFor="nounClassSelect">
              Class{" "}
              <IoInformationCircleOutline
                className={styles.infoIcon}
                onClick={() =>
                  setModal({
                    title: "Noun Classes",
                    explainer: NounClassDefinition,
                  })
                }
              />
            </label>
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
      <div className={styles.submitBtns}>
        <Button type="central" onClick={handleSubmit}>
          {isEditing ? "Update" : "Create"}
        </Button>
        {isEditing && (
          <Button type="central" onClick={() => setShowConfirm(true)}>
            Delete
          </Button>
        )}
      </div>
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete this word?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {modal && (
        <div className={styles.modalOverlay} onClick={() => setModal(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <TerminologyModal
              title={modal.title}
              explainer={modal.explainer}
              onClose={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NewWordForm;
