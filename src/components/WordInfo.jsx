import { TbPencilMinus } from "react-icons/tb";
import styles from "./WordInfo.module.css";

function WordInfo({ wordObj }) {
  return (
    <div className={styles.wordBox}>
      {wordObj && <p>Filler</p>}
      <div className={styles.wordTop}>
        <h2>Word Class - Noun Class</h2>
        <TbPencilMinus className={styles.editIcon} />
      </div>
      <h3>Gender</h3>
      <p>Lorem ipsum a definition for your sticksum</p>
      <p>Here is an example sentence</p>
      <div className={styles.tagsSection}>
        <p>&larr;</p>
        <ul className={styles.tagList}>
          <li>Tag 1</li>
          <li>Tag 2</li>
          <li>Tag 3</li>
          <li>Tag 4</li>
          <li>Tag 5</li>
          <li>Tag 6</li>
          <li>Tag 7</li>
          <li>Tag 8</li>
          <li>Tag 9</li>
          <li>Tag 10</li>
        </ul>
        <p>&rarr;</p>
      </div>
    </div>
  );
}

export default WordInfo;
