import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const button = css`
  width: 300px;
  height: 60px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:focus {
    background-color: #b3b3b3;
    outline: none;
  }
`;

export const tableContainer = css`
  width: 900px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid black;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
`;

export const tr = css`
  height: 60px;
  text-align: center;
`;

export const td = css`
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
  vertical-align: middle;
`;

export const actionButton = css`
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const buttons = css`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  text-align: center;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

export const modal = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalContent = css`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  height: 450px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalHeader = css`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const orderInfo = css`
  border: 1px solid black;
  border-radius: 5px;
  width: 300px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const price = css`
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const address = css`
  display: flex;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
  justify-content: center;
`;

export const modalButtons = css`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const modalButton = css`
  width: 100px;
  height: 30px;
  border: none;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;

  :hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;
