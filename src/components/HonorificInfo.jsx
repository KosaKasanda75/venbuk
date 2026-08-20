import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function HonorificInfo({ honorific: honorific }) {
  const { nounClasses, genders, memberRole } = useDictionary();
  const navigate = useNavigate();
  // console.log(word);

  return (
    <div className={styles.wordBox}>
      {/* {word && <p>Filler</p>} */}
      <div className={styles.wordTopSection}>
        {honorific.word_class !== "unsure" && (
          <h2>
            {honorific.word_class}{" "}
            {honorific.noun_class_id ? (
              <span className={styles.nounClassText}>
                -{" "}
                {
                  nounClasses.find((n) => n.id === honorific.noun_class_id)
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
              navigate("/add-entry/honorific", {
                state: { existingHonorific: honorific },
              })
            }
          />
        )}
      </div>
      {honorific.pronunciation && (
        <p className={styles.pronunciation}>{honorific.pronunciation}</p>
      )}
      {honorific.gender_id && (
        <h3>{genders.find((g) => g.id === honorific.gender_id)?.name}</h3>
      )}
      <p className={styles.defintion}>{honorific.definition}</p>
      {honorific.examples && (
        <ul className={styles.exampleSentenceList}>
          {honorific.examples.map((ex) => (
            <li key={ex.id} className={styles.exampleSentence}>
              {ex.example}
            </li>
          ))}
        </ul>
      )}
      {honorific.tags && (
        <div className={styles.tagsSection}>
          {/* <p>&larr;</p> */}
          <ul className={styles.tagList}>
            {honorific.tags.map((tag) => (
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
