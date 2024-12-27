import { css } from "@emotion/react";

export const storeTitle = css`
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    font-size: 32px;
`;

export const StoreInfo = css`
    width: 700px !important;
    min-height: 700px;
    padding: 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const BasicInfo = css`
  width: 600px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 50px;

  & > div > p {
    margin-top: 10px;
  }
`;

export const logoUrl = css`
  margin: 0;
  width: 200px;
  height: 200px;
`;

export const BasicInfoContent = css`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const description = css`
  white-space: pre-wrap;

  & > p {
    margin-top: 10px;
  }
`;

export const StoreTimeAndBreakTime = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Time = css`
  width: 500px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  margin-top: 50px;

  & > div > p {
    margin-bottom: 10px;
  }
`;

export const buttons = css`
  margin-top: 100px;
  display: flex;
  width: 300px;
  justify-content: space-around;
`;

export const updateButton = css`
  width: 110px;
  font-size: 12px;

  :hover {
    background-color: #1976d2;
    color: white;
  }
`;

export const deleteButton = css`
  width: 110px;
  color: red;
  border: 1px solid red;
  font-size: 12px;

  :hover {
    background-color: red;
    color: white;
  }
`;