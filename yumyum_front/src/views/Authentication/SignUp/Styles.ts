import { css } from "@emotion/react";

export const container = css`
  background-color: #f0f4f8;
  padding-bottom: 30px;

  & * {
    font-family: "SB-어그로-L" !important;
  }
`;

export const formStyle = css`
  width: 550px !important;
  padding: 20px;
  margin: 0 auto;
  border: none;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'SB-어그로-L', sans-serif;

  & > div {
    margin-bottom: 20px;
    border-radius: 10px;
  }

  & > label {
    margin: 0 auto;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 54px;
  }

  & > div:nth-last-of-type(3),
  & > div:nth-last-of-type(5) {
    height: 54px;
    line-height: 54px;
    border: 1px solid #ccc;
    border-radius: 4px;
    position: relative;
    margin-bottom: 0;
  }

  & > div:nth-last-of-type(3) > svg,
  & > div:nth-last-of-type(5) > svg {
    position: absolute;
    width: 25px;
    height: 25px;
    right: 0;
    cursor: pointer;
    margin: 15px;
    color: #999;
  }

  & > div:nth-last-of-type(3) > label,
  & > div:nth-last-of-type(5) > label {
    margin-left: 5px;
  }
`;

export const signUpTitle = css`
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-weight: bold;
  font-size: 32px;
  font-family: "Pretendard-Regular" !important;
`;

export const agreed = css`
  height: 100px;

  box-sizing: border-box;
  padding: 15px;
  background-color: #f0f8ff;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
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

export const duplicatedContainer = css`
  height: 56px;
  display: flex;

  & > div {
    flex: 4;
  }

  & button {
    flex: 1;
    margin-left: 15px;
    border: none;
    border-radius: 5px;
    background-color: #58cdff;
    color: white;
    font-weight: bold;
    font-size: 13px;
  }
  & button:hover {
    background-color: #0db4fc;
  }
`;

export const customInputStyle = css`
  width: 100%;
  border-radius: 8px;
  .MuiOutlinedInput-root {
    &::placeholder {
      color: #999;
      font-size: 5px;
    }

    & fieldset {
      border-color: #ddd;
    }
    &:hover fieldset {
      border-color: #9f9f9f;
    }
    &.Mui-focused fieldset {
      border-color: #9f9f9f;
    }
  }
`;

