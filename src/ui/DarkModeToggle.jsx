import { useDarkMood } from "../context/DarkMoodContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
function DarkModeToggle() {
  const { isDarkMood, toogleDarkMood } = useDarkMood();
  return (
    <ButtonIcon onClick={toogleDarkMood}>
      {isDarkMood ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
