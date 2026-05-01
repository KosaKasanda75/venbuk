import { useState } from "react";
import { AppDescription, AppFeatures } from "../helpers/appInfo";
import styles from "./AppInfo.module.css";
import BackButton from "./BackButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function AppInfo() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.terminologyBox}>
      <BackButton />

      <h1 className={`${styles.terminologyTitle}`}>"App Info"</h1>

      <h2>App Description</h2>
      <p>{AppDescription}</p>

      <h2>Features</h2>
      {AppFeatures.map((feature, index) => (
        <div key={index}>
          <h3
            className={styles.featureName}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {feature.name}{" "}
            {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </h3>
          <div
            className={`${styles.wrapper} ${openIndex === index ? styles.open : ""}`}
          >
            <p className={styles.details}>{feature.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppInfo;
