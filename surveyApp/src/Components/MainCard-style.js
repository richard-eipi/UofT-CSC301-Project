import MainCard from "./MainCard";
import styled from "styled-components";

export const StyledMainCard = styled(MainCard)`
  background-color: #b5dafa;
  border-width: 3px;
  color: black;

  > h1 {
    font-size: 40px;
    font-weight: 400;
    font-family: "Quicksand";
    margin: 20px 20px 20px 20px;
    margin-bottom: 50px;
  }

  > p {
    font-size: 18px;
    font-weight: 200;
    margin-top: 8px;
    margin-left: 16px;
    margin-bottom: 8px;
    color: rgb(46, 42, 42);
    font-family: "Quicksand";
    text-decoration: underline;
  }

  > span {
    display: flex;
    flex-direction: column;
  }
`;
