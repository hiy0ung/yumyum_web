// Style.ts
import { css } from "@emotion/react";

export const storeTitle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 50px;
  text-align: center;
`;

export const StoreInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
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
  p {
    margin: 8px 0;
    font-size: 1.1rem;
  }
`;

export const description = css`
  margin-top: 15px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  width: 100%;
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
  gap: 20px;
  justify-content: flex-end;
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
  border-color:  #f44336;
  
  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;
