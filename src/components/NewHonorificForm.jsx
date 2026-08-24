import { useState } from "react";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";
import styles from "./NewWordForm.module.css";
import useEnum from "../hooks/useEnum";
import { useLocation, useNavigate } from "react-router-dom";
import Confirm from "./Confirm";
import Button from "./Button";
import apiFetch from "../helpers/fetchWrapper";
import useDictionary from "../hooks/useDictionary";
import {
  DeleteOptions,
  PostOptions,
  PutOptions,
} from "../helpers/fetchOptions";
import { RxCross2 } from "react-icons/rx";

function NewHonorificForm() {
  const { placements } = useEnum();
  const { dictionary } = useDictionary();
  const navigate = useNavigate();
  const { state } = useLocation();
  const existingHonorific = state?.existingHonorific ?? {};
  const isEditing = Boolean(existingHonorific.id);
  const [honorific, setHonorific] = useState(existingHonorific.word || "");
  const [placement, setPlacement] = useState(
    existingHonorific.placement || placements.at(0),
  );
  const [meaning, setMeaning] = useState(existingHonorific.meaning || "");
  const [examples, setExamples] = useState(
    existingHonorific.examples?.map((e) => e.example) ?? [""],
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [successFading, setSuccessFading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function clearForm() {
    setHonorific("");
    setPlacement(placements.at(0));
    setMeaning("");
    setExamples([""]);
  }

  function addExample() {
    setExamples((prev) => [...prev, ""]);
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

    if (!honorific || !meaning) return;

    const honorificBody = {
      word: honorific.toLowerCase(),
      placement,
      meaning,
    };

    const url = isEditing
      ? `/dictionaries/${dictionary.id}/honorifics/${existingHonorific.id}`
      : `/dictionaries/${dictionary.id}/honorifics`;
    const fetchOptions = isEditing ? PutOptions : PostOptions;

    try {
      const res = await apiFetch(url, {
        ...fetchOptions,
        body: JSON.stringify(honorificBody),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      const wordId = isEditing ? existingHonorific.id : data.id;

      if (isEditing && existingHonorific.examples?.length > 0) {
        await Promise.all(
          existingHonorific.examples.map((ex) =>
            apiFetch(
              `/dictionaries/${dictionary.id}/honorifics/${wordId}/examples/${ex.id}`,
              DeleteOptions,
            ),
          ),
        );
      }

      const nonEmptyExamples = examples.filter((ex) => ex.trim());
      if (nonEmptyExamples.length > 0) {
        await Promise.all(
          nonEmptyExamples.map((ex) =>
            apiFetch(
              `/dictionaries/${dictionary.id}/honorifics/${wordId}/examples`,
              {
                ...PostOptions,
                body: JSON.stringify({ example: ex }),
              },
            ),
          ),
        );
      }

      if (isEditing) {
        navigate(-1);
        return;
      }

      setShowSuccess(true);
      setTimeout(() => {
        clearForm();
        document
          .querySelector(".activeBox")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
      setTimeout(() => {
        setSuccessFading(true);
      }, 2000);
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessFading(false);
      }, 2500);
    } catch (fetchError) {
      console.log(fetchError);
    }
  }

  async function handleDelete() {
    try {
      const res = await apiFetch(
        `/dictionaries/${dictionary.id}/honorifics/${existingHonorific.id}`,
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
      <form className={styles.formBox}>
        <div className={styles.oneLineField}>
          <label htmlFor="honorificTextInput">Honorific</label>
          <input
            className={styles.oneLineTextBox}
            type="text"
            id="honorificTextInput"
            value={honorific}
            onChange={(e) => setHonorific(e.target.value)}
          />
        </div>

        <div className={styles.oneLineField}>
          <label htmlFor="honorificPositionSelect">Placement</label>
          <select
            id="honorificPositionSelect"
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
          >
            <option value={placements.at(0)}>{placements.at(0)}</option>
            <option value={placements.at(1)}>{placements.at(1)}</option>
          </select>
        </div>

        <div>
          <label htmlFor="honorificDescription">Significance</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="honorificDescription"
            rows={LARGE_TEXT_AREA_ROWS}
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label>Example Use</label>
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
      </form>

      <div className={styles.submitBtns}>
        <Button type="central" onClick={handleSubmit}>
          {isEditing ? "Update" : "Create"}
        </Button>
        {isEditing && (
          <Button type="delete" onClick={() => setShowConfirm(true)}>
            Delete
          </Button>
        )}
      </div>
      {isEditing && (
        <Button type="transparent" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      )}
      {showConfirm && (
        <Confirm
          message="Are you sure you want to delete this word?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showSuccess && (
        <div
          className={`${styles.modalOverlay} ${successFading ? styles.fadeOut : ""}`}
        >
          <div className={styles.successBox}>
            <p>New Honorific Added</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NewHonorificForm;
