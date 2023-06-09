import styled from "styled-components";

export const StyleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 24px;
  min-height: 80vh;
`;

export const StyleContentLeft = styled.div`
  width: 10%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 20px;
  background-color: rgb(250, 250, 250);
  padding: 12px;
`;
export const StyleContetnRight = styled.div`
  background-color: rgb(250, 250, 250);
  background-repeat: no-repeat;
  width: 85%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 8px;
  border-radius: 15px;
  overflow-y: auto;
  padding: 24px 24px 0 24px;

`;


