import styled from "styled-components";
import logo from "../../public/logo-light.png";
import logoDark from "../../public/logo-dark.png";
import { useDarkMood } from "../context/DarkMoodContext";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMood, toogleDarkMood } = useDarkMood();
  const image = isDarkMood ? logoDark : logo;

  return <StyledLogo>{<Img src={image} alt="Logo" />}</StyledLogo>;
}

export default Logo;
