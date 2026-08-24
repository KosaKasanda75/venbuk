import { useState } from "react";
import styles from "./NewWordForm.module.css";
import { LARGE_TEXT_AREA_ROWS } from "../helpers/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeleteOptions,
  PostOptions,
  PutOptions,
} from "../helpers/fetchOptions";
import useDictionary from "../hooks/useDictionary";
import apiFetch from "../helpers/fetchWrapper";
import Button from "./Button";
import Confirm from "./Confirm";

function NewExpressionForm() {
  const { dictionary } = useDictionary();
  const navigate = useNavigate();
  const { state } = useLocation();
  const existingExpression = state?.existingExpression ?? {};
  const isEditing = Boolean(existingExpression.id);

  const [expression, setExpression] = useState(
    existingExpression.sentence || "",
  );
  const [literal, setLiteral] = useState(
    existingExpression.literal_translation || "",
  );
  const [meaning, setMeaning] = useState(existingExpression.real_meaning || "");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successFading, setSuccessFading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function clearForm() {
    setExpression("");
    setLiteral("");
    setMeaning("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!expression || !meaning) return;

    const expressionBody = {
      sentence: expression,
      literal_translation: literal,
      real_meaning: meaning,
    };

    const url = isEditing
      ? `/dictionaries/${dictionary.id}/expressions/${existingExpression.id}`
      : `/dictionaries/${dictionary.id}/expressions`;
    const fetchOptions = isEditing ? PutOptions : PostOptions;

    try {
      const res = await apiFetch(url, {
        ...fetchOptions,
        body: JSON.stringify(expressionBody),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      // const data = await res.json();

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
        `/dictionaries/${dictionary.id}/expressions/${existingExpression.id}`,
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
        <div>
          <label htmlFor="expressionText">Expression</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="expressionText"
            rows={LARGE_TEXT_AREA_ROWS}
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="expressionLiteralText">Literal Translation</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="expressionLiteralText"
            rows={LARGE_TEXT_AREA_ROWS}
            value={literal}
            onChange={(e) => setLiteral(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="expressionMeaning">Meaning</label>
          <br />
          <textarea
            className={styles.largeTextBox}
            type="text"
            id="expressionMeaning"
            rows={LARGE_TEXT_AREA_ROWS}
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          ></textarea>
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
            <p>New Expression Added</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NewExpressionForm;
