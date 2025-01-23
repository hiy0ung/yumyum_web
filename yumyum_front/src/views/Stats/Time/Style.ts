import {css} from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
`; 

export const topContainer = css`
  display: flex;
  margin: 20px;
`;

export const dateContainerStyle = css`
  display: flex;
  text-align: center;
  padding: 10px;
  margin-left: 15px;
  font-size: 20px;
  width: 400px;
  height: 60px;
  box-shadow: 0 0 10px 1px #e9e9e9;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  background-color: #eff6ff;
  text-align: center;
  justify-content: center;
`;

export const inputStyle = css`
  text-align: center;
  justify-content: center;
  font-size: 20px;
  background-color: #eff6ff;
  color: #000000;
  border: none;
  pointer-events: none;
  `;

export const buttonStyle = css`
  text-align: center;
  justify-content: center;
  font-size: 20px;
  background-color: #eff6ff;
  border: none;
  cursor: pointer;
  color: #757575;

  &:hover {
    color:#90b2c5;
  }
`;

//& 오늘 날짜 이후 버튼 선택 X
export const nextButtonBlock = css`
  pointer-events: none;
  opacity: 0;
`;

//* 캘린더 영역
export const calendarContainer = css`
  position: relative;
`;

export const calendarIconStyle = css`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  box-shadow: 0 0 10px 1px #e9e9e9;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  background-color: #eff6ff;
  width: 60px;
  height: 60px;
  margin-left: 30px;
  cursor: pointer;
`;

export const calendarContainerBlock = css`
  position: absolute;
    top: 0;
    left: 80px;
    z-index: 999;
    width: 350px;
    
    & > div {
        width: 100%;
    }
    & div {
        font-size: 8px
    }
    & abbr {
        font-size: 14px;
    }
`;

export const calendarContainerNone = css`
  display: none;
`;

//* 차트 영역 
export const chartContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  margin: 20px 15px;
  min-width: 1280px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  & path {
    display: block;
  }
`;

export const chartLineNone = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: auto 0;
  min-width: 1280px;
  
  & path {
    display: none;
  }
`;

export const tooltipStyle = css`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #d2d5ca;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #383b43;
`;
export const labelTextStyle = css`
  /* color: #1683ffdf;
  margin-bottom: 3px;
  font-size: 13px; */
  font-weight: bold;
  margin-bottom: 5px;
  color: #58cdff;
`;

export const valueTextStyle = css`
  /* font-size: 15px; */
  color: #fdbe35;
`;

//* 차트 데이터 없을 때
export const chartDataNone = css`
  position: relative;
  height: 100vh;
  line-height: 50vh;
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #333333;
  font-size: 35px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.4;
`;
