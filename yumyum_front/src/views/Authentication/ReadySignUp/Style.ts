import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const signUp = css`
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

export const yumyumButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color:#58cdff;
    border-radius: 4px;
    width: 400px;
    height: 56px;
    margin-bottom: 10px;

    :hover {
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }

    & > img {
      height: 40px;
      margin-left: 20px;
    }

    & > span {
    margin-right: 70px;
    font-size: 14px;
    text-decoration: none;
    color: black;
    }
`;

export const oauthButtons = css`
  display: flex;
  flex-direction: column;
`;

export const kakaoButton = css`
  display: flex;
  justify-content: center;
  width: 400px;
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
  width: 400px;
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