import styled, { css } from "styled-components";
// const center = css`
//   text-align: center;
//   ${10 > 9 && "background-color: yellow"}
// `;
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: ${10 > 0 ? "4rem" : "20px"};
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: ${10 > 0 ? "3rem" : "20px"};
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: ${10 > 0 ? "2rem" : "20px"};
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
`;
export default Heading;
