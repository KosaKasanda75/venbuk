import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function HonorificInfo({ expression: expression }) {
  const { nounClasses, genders, memberRole } = useDictionary();
  const navigate = useNavigate();
  // console.log(word);

  return (
    <div className={styles.wordBox}>
      {/* {word && <p>Filler</p>} */}
      <div className={styles.wordTopSection}>
        {expression.word_class !== "unsure" && (
          <h2>
            {expression.word_class}{" "}
            {expression.noun_class_id ? (
              <span className={styles.nounClassText}>
                -{" "}
                {
                  nounClasses.find((n) => n.id === expression.noun_class_id)
                    ?.name
                }
              </span>
            ) : (
              ""
            )}
          </h2>
        )}
        {memberRole !== "viewer" && (
          <TbPencilMinus
            className={styles.editIcon}
            onClick={() =>
              navigate("/add-entry/expression", {
                state: { existingExpression: expression },
              })
            }
          />
        )}
      </div>
      {expression.pronunciation && (
        <p className={styles.pronunciation}>{expression.pronunciation}</p>
      )}
      {expression.gender_id && (
        <h3>{genders.find((g) => g.id === expression.gender_id)?.name}</h3>
      )}
      <p className={styles.defintion}>{expression.definition}</p>
      {expression.examples && (
        <ul className={styles.exampleSentenceList}>
          {expression.examples.map((ex) => (
            <li key={ex.id} className={styles.exampleSentence}>
              {ex.example}
            </li>
          ))}
        </ul>
      )}
      {expression.tags && (
        <div className={styles.tagsSection}>
          {/* <p>&larr;</p> */}
          <ul className={styles.tagList}>
            {expression.tags.map((tag) => (
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

export default HonorificInfo;
