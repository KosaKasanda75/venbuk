import styles from "./DictionaryDetails.module.css";

function DictionaryDetails({ dictionaryInfo }) {
  const createdAt = new Date(dictionaryInfo.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className={styles.container}>
      <p className={styles.createdAt}>Created {createdAt}</p>

      <h2 className={styles.name}>{dictionaryInfo.name}</h2>

      {dictionaryInfo.description && (
        <p className={styles.description}>{dictionaryInfo.description}</p>
      )}

      {dictionaryInfo.members?.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionLabel}>Collaborators</h3>
          <ul className={styles.memberList}>
            {dictionaryInfo.members.map((member) => (
              <li key={member.user_id} className={styles.memberRow}>
                <span className={styles.username}>{member.username}</span>
                <span className={styles.role}>{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DictionaryDetails;
