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
    width: 400px;
    height: 50px;
    
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

export const calendarStyle = css`
`;


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