import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton({ title, override, path }) {
  const navigate = useNavigate();

  function defaultHandleClick(e) {
    e.preventDefault();
    navigate(path || -1);
  }

  const handleClick = override || defaultHandleClick;

  return (
    <Button type="plain" onClick={handleClick}>
      &larr; {title || "Back"}
    </Button>
  );
}

export default BackButton;
// Need another back button incase someone jumps to page instead of navigating to it
