import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function WordInfo({ word }) {
  const { nounClasses, genders, memberRole } = useDictionary();
  const navigate = useNavigate();
  // console.log(word);

  return (
    <div className={styles.wordBox}>
      {/* {word && <p>Filler</p>} */}
      <div className={styles.wordTopSection}>
        {word.word_class !== "unsure" && (
          <h2>
            {word.word_class}{" "}
            {word.noun_class_id
              ? `- ${nounClasses.find((n) => n.id === word.noun_class_id)?.name}`
              : ""}
          </h2>
        )}
        {memberRole !== "viewer" && (
          <TbPencilMinus
            className={styles.editIcon}
            onClick={() =>
              navigate("/add-entry/word", { state: { existingWord: word } })
            }
          />
        )}
      </div>
      {word.pronunciation && <p>{word.pronunciation}</p>}
      {word.gender_id && (
        <h3>{genders.find((g) => g.id === word.gender_id)?.name}</h3>
      )}
      <p className={styles.defintion}>{word.definition}</p>
      {word.examples && (
        <ul className={styles.exampleSentenceList}>
          {word.examples.map((ex) => (
            <li key={ex.id} className={styles.exampleSentence}>
              {ex.example}
            </li>
          ))}
        </ul>
      )}
      {word.tags && (
        <div className={styles.tagsSection}>
          {/* <p>&larr;</p> */}
          <ul className={styles.tagList}>
            {word.tags.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
            {/* I NEED TO RESOLVE METADATA ID'S LIKE NOUN CLASS */}
            {/* <li>Tag 1</li>
            <li>Tag 2</li>
            <li>Tag 3</li>
            <li>Tag 4</li>
            <li>Tag 5</li>
            <li>Tag 6</li>
            <li>Tag 7</li>
            <li>Tag 8</li>
            <li>Tag 9</li>
            <li>Tag 10</li> */}
          </ul>
          {/* <p>&rarr;</p> */}
        </div>
      )}
    </div>
  );
}

export default WordInfo;
