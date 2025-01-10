// Style.ts
import { css } from "@emotion/react";

export const storeTitle = css`
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const StoreInfo = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  padding: 30px;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const BasicInfo = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const logoUrl = css`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

export const BasicInfoContent = css`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  p {
    margin: 8px 0;
    font-size: 1.1rem;
  }
`;

export const description = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1.3;
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
`;

export const StoreTimeAndBreakTime = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

export const Time = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-bottom: 10px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    color: #555;

    p {
      margin: 0;
      font-weight: bold;
      font-size: 1.1rem;
      line-height: 2;
    }
  }
`;

export const buttons = css`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const updateButton = css`
  height: 40px;
  font-size: 14px;
  color: #58cdff;
  border-color: #58cdff;

  &:hover {
    background-color: #0db4fc;
    color: white;
  }
`;

export const deleteButton = css`
  height: 40px;
  font-size: 14px;
  color: #f44336;
  border-color: #f44336;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;
