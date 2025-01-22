import { css } from "@emotion/react";

const colors = {
  background: "#F5F5F5",
  primary: "rgba(252, 183, 54)",
  text: "#333333",
  button: "#58CCFF",
  buttonHover: "rgb(85, 193, 255)",
  modalOverlay: "rgba(0, 0, 0, 0.5)",
};

// 전체 컨테이너 스타일
export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 20px;
`;

// 현재 정보 섹션 스타일
export const currentInfoContainer = css`
  background-color: ${colors.primary};
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 40px;

  .completedCount {
    padding-bottom: 15px;
  }
`;

// 주문 테이블 컨테이너 스타일
export const orderTableContainer = css`
  width: 100%;
  max-width: 1000px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .orderStateButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 945px;
  }
`;

// 테이블 스타일
export const tableContainer = css`
  overflow-y: auto;
  overflow-x: hidden;
  width: 945px;
  max-height: 800px;
`;

export const table = css`
  width: 945px;
  border-collapse: collapse;
  text-align: left;
`;

export const tr = css`
  height: 60px;
  line-height: 40px;
  text-align: center;
  &:nth-of-type(odd) {
    background-color: ${colors.background};
  }

  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`;

export const td = css`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  color: ${colors.text};
`;

// 버튼 스타일
export const buttons = css`
  background-color: ${colors.button};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`;


export const detailButton = css`
  font-size: 12px;
  color: #999;
  cursor: pointer;
`;

// 모달 스타일
export const modal = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.modalOverlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContent = css`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const modalButtons = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const modalButton = css`
  background-color: ${colors.button};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`;

export const orderInfo = css`
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 10px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
`;

export const orderDetail = css`
  margin: 5px;

  & > span {
    margin-left: 5px;
    font-weight: bold;
  }
`;

export const optionDetail = css`
  margin-left: 5px;

  &> span {
    margin: 5px;
  }

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

export const button = css`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 16px; 
  border: none;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background-color:${colors.button};
  color: #ffffff;
  height: 60px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:focus {
    background-color: ${colors.background};
    color: ${colors.text};
  }
  `;
  
export const buttonActive = css`
  background-color: ${colors.background};
  color: ${colors.text};
  
  &:hover {
    background-color: ${colors.background};
    color: ${colors.text};
  }
`