import { css } from "@emotion/react";

export const container = css`
  display: flex;
  justify-content: center;
`;

export const backgroundStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: 600px;
  padding: 32px;
`;

export const formStyle = css`
  width: 500px !important;
  padding: 24px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 20px;
  }

  & > label {
    margin: 0 auto;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 54px;
  }
`;

export const logInTitle = css`
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-weight: bold;
  font-size: 28px;
`;

export const errorMessage = css`
    color: red;
    font-size: 14px;
    padding: 5px;
    margin-bottom: 10px;
`;

export const submitButton = css`
  height: 56px;
  width: 100%;
  text-align: center;
  background-color:#58cdff;

  &:hover {
    background-color: #0db4fc;
  }
`;

export const snsContainer = css`
    border: 1px solid #ccc;
    position: relative;
    height: 1px;
    
    & > span {
        position: absolute;
        font-size: 12px;
        color: #ababab;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const oauthButtons = css`
  display: flex;
  flex-direction: column;
`;

export const kakaoButton = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;
  margin-bottom: 10px;
  border-radius: 4px;
  align-items: center;
  background-color: #FEE500;
  cursor: pointer;

  :hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 25%;
  }

  & > span {
    margin-right: 40px;
    font-size: 14px;
  }
`;

export const naverButton = css`
  display: flex;
  justify-content: center;
  gap:10px;
  width: 100%;
  height: 56px;
  margin-bottom: 10px;
  border-radius: 4px;
  align-items: center;
  background-color: rgb(3,199,90);
  cursor: pointer;

  :hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 25%;
  }

  & > span {
    margin-right: 40px;
    font-size: 14px;
  }
`;

export const duplicatedContainer = css`
  margin-top: 20px;
  height: 56px;
  display: flex;

  & > div {
    flex: 4;
  }

  & button {
    flex: 1;
    margin-left: 20px;
  }
`;

export const link = css`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

export const linkText = css`
  font-size: 14px;
  text-decoration: none;
  color: #333333;
  margin-right: 10px;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const customInputStyle = css`
  width: 100%;
  border-radius: 8px;
    & fieldset {
      border-color: #ddd;
    }
    &:hover fieldset {
      border-color: #9f9f9f;
    }
    &.Mui-focused fieldset {
      border-color: #9f9f9f;
    }
`;
