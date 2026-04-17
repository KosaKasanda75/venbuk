import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";

function WordInfo({ word }) {
  return (
    <div className={styles.wordBox}>
      {word && <p>Filler</p>}
      <div className={styles.wordTop}>
        <h2>
          {word.word_class} {word.noun_class ? `- ${word.noun_class}` : ""}
        </h2>
        <TbPencilMinus className={styles.editIcon} />
      </div>
      <h3>Gender</h3>
      <p>{word.definition}</p>
      <p>{word.examples}</p>
      {word.tags && (
        <div className={styles.tagsSection}>
          <p>&larr;</p>
          <ul className={styles.tagList}>
            {word.tags.map((tag) => (
              <li key={tag}>{tag}</li>
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
          <p>&rarr;</p>
        </div>
      )}
    </div>
  );
}

export default WordInfo;
