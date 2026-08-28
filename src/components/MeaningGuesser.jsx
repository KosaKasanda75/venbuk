// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./MeaningGuesser.module.css";
import BackButton from "./BackButton";

// const STAGES = ["setup", "quiz", "results"];

function MeaningGuesser() {
  // const navigate = useNavigate();
  //   const [stage, setStage] = useState(STAGES.at(0));
  return (
    <div>
      <BackButton>Back to Games</BackButton>
      <h1>Meaning Guesser</h1>
    </div>
  );
}

function MGSetupGame() {
  return (
    <div>
      <p>Setting up game</p>
      <p className={styles.description}>Game Description</p>
    </div>
  );
}

function MGPlayGame() {
  return <div>Playing game</div>;
}

function MGGameResults() {
  return <div>Your results</div>;
}

export default MeaningGuesser;
