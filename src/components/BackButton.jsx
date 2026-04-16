import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton({ override }) {
  const navigate = useNavigate();

  function defaultHandleClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  const handleClick = override || defaultHandleClick;

  return (
    <Button type="plain" onClick={handleClick}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
// Need another back button incase someone jumps to page instead of navigating to it
