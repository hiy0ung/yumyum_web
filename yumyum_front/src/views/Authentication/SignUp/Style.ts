import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  align-items: center;
  background-color: #f0f4f8;

  & * {
    font-family: "SB-어그로-L" !important;
  }
`;

export const signUpTitle = css`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  `;

export const formContainer = css`
  width: 60%;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  `;

export const formBox = css`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  align-items: center;
`;

export const gridRow = css`
  display: grid;
  grid-template-areas: 
    "label input button"
    "label helper helper"
    "collapse collapse collapse";
  grid-template-columns: 150px 1fr 120px; 
  align-items: center;
  position: relative;
  height: auto;
  column-gap: 20px;
`;

export const gridLabel = css`
  grid-area: label;
  text-align: left;
  font-weight: bold;
  position: relative;
  padding-right: 10px;
  align-items: center;
  line-height: 60px;
  height: 100px;
`;

export const inputBox = css`
  grid-area: input;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const customInputStyle = css`
  width: 100%;
  .MuiOutlinedInput-root {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ddd;
    &::placeholder {
      color: #999;
      font-size: 5px;
    }

    &:hover { 
      border-bottom: 1px solid #9f9f9f; 
    } 
    &.Mui-focused { 
      border-bottom: 2px solid #9f9f9f;
    }

    & fieldset {
      border: none;
  }
}
`;
    
export const duplicatedBtn = css`
  grid-area: button;
  height: 56px;
  width: 120px;
  font-size: 13px;
  font-weight: bold;
  background-color: #58cdff;
  border: none;
  color: white;

  &:hover {
    background-color: #0db4fc;
  }
`;

export const gridHelper = css`
  grid-area: helper; 
  width: 100%;
  min-height: 30px;
`;

export const heplerTextStyle = css`
  font-size: 12px;
  margin-top: 5px;

  &.error {
    color: #f44336;
  }
`;

export const agreed = css`
  box-sizing: border-box;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  overflow-y: scroll;
`;

export const submitButton = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 56px;
  width: 100%;

  & > button {
    width: 45%;
    height: 90%;
    font-weight: bold;
    font-size: 15px;
  }

  & > button:nth-child(1) {
    background-color: #58cdff;
  }

  & > button:nth-child(1):hover {
    background-color:  #0db4fc;
  }

  & > button:nth-child(2) {
    border: 1px solid #58cdff;
    color: #58cdff;
  }

  & > button:nth-child(2):hover {
    background-color:rgba(88, 205, 255, 0.14);
  }
`;

export const goBackButton = css`
  width: 100%;
`;