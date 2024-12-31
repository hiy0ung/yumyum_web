import {css} from "@emotion/react";

export const menuAll = css`
  /* width: 1280px; */
`

export const menu = css`
  display: flex;
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 8px;
  margin: 3px;
  align-items: center;
  justify-content: space-between;
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
  margin-top: 10px;
  margin-right: 5px;
`

export const selectMenu = css`
  display: flex;
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  justify-content: start;
  margin-top: 10px;
  margin-left: 5px;
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
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  right: 20px;
  top: 180px;
  padding: 10px;
  


  & > div {
    margin-top: 5px;
    margin-left: 10px;
  }

  & > div > input {
    margin: 5px 0px 5px 0px;
  }

  & > div > select {
    margin: 5px 0px 10px 0px;
  }
`

export const modalSubmitButton = css`
  position: relative;
  margin-left: 130px;
  width: 50px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  
`

export const modalButton = css`
  display: flex;

`

export const modalCancleButton = css`
  position: relative;
  margin-left: 20px;
  width: 50px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
`

export const submitMenu = css`
  border: 1px solid #000;
  border-radius: 5px;
`

export const addCategory = css`
  list-style: none;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
`

export const addCategoryButton = css`
  margin-top: 20px;
`

export const modalCategory = css`
  margin-left: 10px;
`

export const categorySubmit = css`
  margin-bottom: 10px;
  margin-top: 10px;
`

export const categoryCancle = css`
  position: absolute;
  right: 10px;
  bottom: 10px;
`

export const option = css`
  border: 1px solid #999;
  border-radius: 5px;
  margin-bottom: 3px;
  padding: 10px;
  margin-left: 3px;
  margin-top: 3px;

  & > div {
    margin-top: 5px;
    margin-left: 5px;
  }

  
`

export const cancelOption = css`
  margin-left: 5px;
`

export const cancel = css`
  margin-left: 5px;
  margin-bottom: 5px;
`

export const optionModal = css`
  font-size: 16px;
  position: absolute;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  right: 40px;
  top: 200px;
  max-height: 600px;
  overflow: hidden;
  overflow-y: scroll;
`

export const optionDetail = css`
  margin-left: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
`

export const optionAdd = css`
  margin-bottom: 5px;
`

export const optionConfirm = css`
  position: relative;
  display: flex;
  padding: 10px;
  right: -110px;
`

export const optionCheck = css`
  margin-right: 10px;
`

export const menuImage = css`
  height: 125px;
  width: 125px;
  border: 1px solid #000;
  margin: 5px;
`

export const menuName = css`
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 18px;
  height: 40px;
`

export const menuBody = css`
  flex: 1;
  min-width: 300px;
  margin: 5px;
`

export const menuDescription = css`
  margin-top: 5px;
  font-size: 14px;
  border: 1px solid #000;
  border-radius: 3px;
  height: calc(125px - 45px);
`

export const menuPrice = css`
  font-size: 18px;
  margin-top: 40px;
  right: -90px;
  bottom: 5px;
  text-align: end;
  padding-right: 5px;
  
`

export const menuIsAvailable = css`
  margin-left: 50px;
`

export const menuFoot = css`

` 

export const menuButtonContainer = css`
  margin-left: 130px;

  & > button {
    border: none;
    background-color: white;
    color: #6666ff;
    font-size: 14px;
    
  }
  & > button:hover {
    cursor: pointer;
  };
`