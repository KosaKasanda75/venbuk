import { useNavigate } from "react-router-dom";
import styles from "./EntryType.module.css";

function EntryType({ entryTypes }) {
  const navigate = useNavigate();
  return (
    <select
      className={styles.dropdown}
      onChange={(e) => navigate(e.target.value)}
    >
      {entryTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default EntryType;
