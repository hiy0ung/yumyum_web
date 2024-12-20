import {css} from "@emotion/react";

export const menuAll = css`
  /* width: 1280px; */
`

export const menu = css`
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 8px;
  margin: 3px;
`

export const topMenu = css`
  display: flex;
  width: 100%;
`

export const addMenu = css`
  display: flex;
  position: relative;
  height: 30px;
  width: 100%;
  justify-content: end;
`

export const selectMenu = css`
  display: flex;
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  justify-content: start;
`

export const selectMenuName = css`
  display: flex;
  margin-bottom: 20px;
  height: 30px;
  margin-right: 5px;
`

export const selectMenuCategory = css`
  display: flex;
  margin-bottom: 20px;
  height: 30px;
`

export const inputMenu = css`
  font-size: 16px;
  position: absolute;
  top: 45%;
  left: 80%;
  transform: translate(-29.5%, -55%);
  width: 400px;
  height: 450px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 5px;


  & > div {
    margin-top: 5px;
    margin-left: 10px;
  }

  & > div > input {
    margin: 5px 0px 10px 0px;
  }

  & > div > select {
    margin: 5px 0px 10px 0px;
  }
`

export const modalSubmitButton = css`
  position: relative;
  top: 60px;
  margin-left: 130px;
  width: 50px;
  height: 30px;
  
`

export const modalButton = css`
  display: flex;

`

export const modalCancleButton = css`
  position: relative;
  top: 60px;
  margin-left: 20px;
  width: 50px;
  height: 30px;
`

export const submitMenu = css`
  border: 1px solid #000;
  border-radius: 5px;
`