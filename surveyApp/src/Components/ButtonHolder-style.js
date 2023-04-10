import styled from "styled-components";

export const StyledButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    margin-bottom: 12px;
    width: 30%;
    height: 35px;
    max-width: 90px;
    border-radius: 8px;
    border-style: solid;
    background-color: #3ca4ff;
    border-color: #3ca4ff;
    align-self: center;
    font-weight: 700;
    color: white;
  }

  .button-holder button:hover {
    cursor: pointer;
    background-color: rgba(195, 82, 82, 0.888);
    color: white;
  }
`;
