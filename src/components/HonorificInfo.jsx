import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function HonorificInfo({ honorific: honorific }) {
  const { memberRole } = useDictionary();
  const navigate = useNavigate();
  // console.log(word);

  return (
    <div className={styles.wordBox}>
      {/* {word && <p>Filler</p>} */}
      <div className={styles.wordTopSection}>
        <h2>Honorific</h2>
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
      {honorific.placement && <h3>{honorific.placement}</h3>}
      {honorific.meaning && (
        // <p className={styles.pronunciation}>{honorific.pronunciation}</p>
        <p>{honorific.meaning}</p>
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
    </div>
  );
}

export default HonorificInfo;
