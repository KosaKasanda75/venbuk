import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";
import useDictionary from "../hooks/useDictionary";
import { useNavigate } from "react-router-dom";

function HonorificInfo({ expression: expression }) {
  const { memberRole } = useDictionary();
  const navigate = useNavigate();
  // console.log(word);

  return (
    <div className={styles.wordBox}>
      {/* {word && <p>Filler</p>} */}
      <div className={styles.wordTopSection}>
        {expression.sentence && <h2>{expression.sentence}</h2>}
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
      {expression.literal_translation && (
        <p className={styles.pronunciation}>{expression.literal_translation}</p>
      )}
      <p className={styles.defintion}>{expression.real_meaning}</p>
    </div>
  );
}

export default HonorificInfo;
