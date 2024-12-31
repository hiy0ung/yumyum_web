import {css} from "@emotion/react";

export const topContainer = css`
  display: flex;
  margin: 15px;
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
  background-color: aliceblue;
  color: #000000;
  border: none;
  pointer-events: none;
  `;

export const buttonStyle = css`
  text-align: center;
  justify-content: center;
  font-size: 20px;
  background-color: aliceblue;
  border: none;
  cursor: pointer;
  color: #757575;

  &:hover {
    color: #d4ebf8;
  }
`;

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

// export const calendarStyle = css`
//   display: flex;
//   flex-direction: column;
//   border: none;

//   .react-calendar__tile {
//     height: 50px;
//     border: none;
//     text-align: center;
    
//   }

//   .react-calendar__month-view {
//   }

//   .react-calendar__month-view__weekdays {
//     font-size: 10px;
//     height: 50px;
//   }

//   .react-calendar__navigation button {
//     font-size: 12px;
//     padding: 5px;
//   }

//   .calendar-cell {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50px; /* 셀 높이 */
//   width: 50px;  /* 셀 너비 */
//   border: 1px solid #000; /* 셀 경계선 */
//   box-sizing: border-box; /* 박스 크기 계산 */
// }
// `;


export const chartContainer = css`
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: auto 0;
  min-width: 1280px;

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