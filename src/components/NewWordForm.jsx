import { RxCross2 } from "react-icons/rx";
import styles from "./NewWordForm.module.css";
import Button from "./Button";
import useDictionary from "../hooks/useDictionary";
import { PostOptions } from "../helpers/fetchOptions";

function NewWordForm() {
  const { dictionary } = useDictionary();
  // ADD STATE

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/dictionaries/${dictionary.id}/words/`, {
      ...PostOptions,
      body: JSON.stringify(wordData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail ?? `HTTP ${res.status}`);
    }

    const data = await res.json(); // returns WordRead
    console.log(data);

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

    // EMPTY FORM AFTERWARDS
    // MAYBE GO TO WORD RESULT PAGE
  }

  return (
    <>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <div className={styles.oneLineField}>
          <label for="wordTextInput">Word</label>
          <input
            className={styles.oneLineTextBox}
            type="text"
            id="wordTextInput"
          />
        </div>

        <div>
          <label for="wordDescription">Description</label>
          <br />
          <input
            className={styles.largerTextBox}
            type="text"
            id="wordDescription"
          />
        </div>

        <div>
          <label for="wordExampleUse">Example Sentence</label>
          <br />
          <input
            className={styles.largerTextBox}
            type="text"
            id="wordExampleUse"
          />
        </div>

        <div className={styles.oneLineField}>
          <label for="wordClassSelect">Type</label>
          <select id="wordClassSelect">
            <option value={1}>1</option>
          </select>
        </div>

        <div className={styles.oneLineField}>
          <label for="nounClassSelect">Class</label>
          <select id="nounClassSelect">
            <option value={1}>1</option>
          </select>
        </div>

        <div className={styles.oneLineField}>
          <label for="genderSelect">Gender</label>
          <select id="genderSelect">
            <option value={1}>1</option>
          </select>
        </div>

        <div className={styles.oneLineField}>
          <label for="wordTagInput">Tags</label>
          <div className={styles.oneLineTextBox}>
            <input
              className={styles.autocompletedTextBox}
              type="text"
              id="wordTagInput"
            />
            {/* <ul className={styles.autocompleteOptions}></ul> */}
          </div>
        </div>
        <ul className={styles.selectedTags}>
          <li>
            <p className={styles.tagText}>Tag</p>
            <RxCross2 className={styles.tagIcon} />
          </li>
        </ul>
      </form>
      <Button type="central" onCLick={handleSubmit}>
        Create
      </Button>
    </>
  );
}

export default NewWordForm;
