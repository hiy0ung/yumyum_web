import { css } from "@emotion/react";

export const StoreInfo = css`
    width: 700px !important;
    height: 900px;
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
  margin-top: 30px;

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
  align-items: center;
  justify-content: center;
  vertical-align : middle;
`;

export const Time = css`
  width: 500px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

export const buttons = css`
  margin-top: 20px;
  display: flex;
  width: 300px;
  justify-content: space-around;
`;

export const updateButton = css`
  width: 110px;
  font-size: 12px;
`;

export const deleteButton = css`
  width: 110px;
  color: red;
  border: 1px solid red;
  font-size: 12px;
`;