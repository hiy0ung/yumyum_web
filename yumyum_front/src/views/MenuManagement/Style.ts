import { css } from "@emotion/react";

export const menuAll = css`
  /* width: 1280px; */
  width: 60%;
  min-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 20px;
`;

export const menu = css`
  display: flex;
  font-size: 12px;
  background-color: #eff6ff;
  box-shadow: 0 0 10px 1px #e9e9e9;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  margin: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const topMenu = css`
  display: flex;
  width: 100%;
`;

export const addMenu = css`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: end;
  align-items: center;
  margin-top: 10px;
  margin-right: 5px;

  & > div {
    margin-right: 5px;
    background-color: #eff6ff;
    padding: 10px;
    border-radius: 3px;
    font-weight: bold;
  }

  & > button {
    background-color: #58ccff;
    border: none;
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    cursor: pointer;
  }
`;

export const selectMenu = css`
  display: flex;
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  justify-content: start;
  margin-top: 10px;
  margin-left: 5px;
`;

export const selectMenuName = css`
  display: flex;
  margin-bottom: 20px;
  height: 30px;
  margin-right: 5px;
`;

export const selectMenuCategory = css`
  display: flex;
  margin-bottom: 20px;
  height: 30px;
`;

export const inputMenu = css`
  font-size: 16px;
  position: absolute;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  right: 380px;
  top: 150px;
  padding: 0px 50px 30px 50px;

  & > div > input {
    margin: 5px 0px 5px 0px;
  }

  & > div > select {
    margin: 5px 0px 10px 0px;
  }
`;

export const modalSubmitButton = css`
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  border: none;
  background-color: #58ccff;
  color: #fff;
  border-radius: 5px;
  padding: 10px 0;
  cursor: pointer;
`;

export const modalButton = css`
  display: flex;
`;

export const modalCancleButton = css`
  position: relative;
  margin-left: 20px;
  width: 50px;
  height: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
`;


export const submitMenu = css`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

export const submitOptionMenu = css`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px 10px;
`;

export const addMenuBody = css`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const isAvailable = css`
  margin-top: 7px;
  transform: scale(1.3);
`;

export const addCategory = css`
  list-style: none;
  font-size: 18px;
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: left;

  & > button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    aspect-ratio: 1;
    width: 25px;
    background-color: #f44;
    color: #fff;
    cursor: pointer;
  }
`;
export const deleteOptionDetail = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
export const categoryValue = css`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const addCategoryButton = css`
  margin-top: 20px;
`;

export const modalCategory = css`
  margin-left: 10px;
`;

export const categorySubmit = css`
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  border: none;
  background-color: #58ccff;
  color: #fff;
  border-radius: 5px;
  padding: 10px 0;
  cursor: pointer;
`;

export const addOptionDetail = css`
  width: 100%;
  border: none;
  background-color: #58ccff !important;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export const categoryCancle = css`
  position: absolute;
  right: -17px;
  top: 2px;
  display: inline-block;
  padding: 0 20px;
  box-sizing: content-box;
  & > button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #eff6ff;

    color: #aaa;
    display: flex;
    align-items: center;
    aspect-ratio: 1;
  }
  & > button:hover {
    cursor: pointer;
    background-color: #ff4444;
    color: #fff;
  }
`;

export const categoryHeader = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  background-color: #eff6ff;
`;

export const categoryBody = css`
  margin-top: 70px;
`;

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
`;

export const cancelOption = css`
  margin-left: 5px;
`;

export const optionModal = css`
  font-size: 16px;
  position: absolute;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  right: 40px;
  top: 160px;
  padding: 0px 50px 30px 50px;
  max-height: 600px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const optionDetail = css`
  margin-left: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

export const optionAdd = css`
  margin: 5px 0 5px 0;
`;

export const menuImage = css`
  height: 125px;
  width: 125px;
  border: 1px solid #e4e4e4;
  margin: 5px;
  overflow: hidden;
  position: relative;
`;

export const menuName = css`
  box-shadow: 0 0 5px 1px #e9e9e9;
  padding-left: 5px;
  border-radius: 3px;
  border: 1px solid #e4e4e4;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
`;

export const menuBody = css`
  flex: 1;
  min-width: 300px;
  margin: 5px;
  background-color: #ffffff;
`;

export const menuDescription = css`
  margin-top: 5px;
  font-size: 14px;
  box-shadow: 0 0 5px 1px #e9e9e9;
  border-radius: 3px;
  border: 1px solid #e4e4e4;
  height: calc(125px - 45px);
  padding: 5px;
`;

export const menuPrice = css`
  font-size: 18px;
  margin-top: 40px;
  right: -90px;
  bottom: 5px;
  text-align: end;
  padding-right: 5px;
`;

export const menuIsAvailable = css`
  margin-left: 50px;
`;

export const menuFoot = css``;

export const menuButtonContainer = css`
  margin-left: 130px;

  & > button {
    border: none;
    background-color: white;
    font-size: 14px;
  }
  & > button:hover {
    cursor: pointer;
  }
`;

export const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
`;

export const icon = css`
  text-align: left;
`;

export const imageUpload = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const categoryName = css`
  font-size: 24px;
  padding: 5px;
  border-radius: 5px;
`;

export const topCategory = css`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const updateButton = css`
  color: #2222ff;
  background-color: #eff6ff !important;
`;

export const deleteButton = css`
  color: #ff2222;
  background-color: #eff6ff !important;
`;

export const category = css`
  & > div {
  }

  & > input {
    padding: 5px 24px;
    border-radius: 3px;
    margin-top: 10px;
  }

  & > input:focus {
    outline: none;
    border: 1px solid #22f;
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
  }
`;

export const addMenuButton = css`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #58ccff;
  color: #fff;
  opacity: 0.8;

  cursor: pointer;

  &:hover {
    background-color: rgb(85, 193, 255);
  }
`;

export const image = css`
  background-color: #58ccff;
  border: none;
  border-radius: 3px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  margin-left: 5px;
  cursor: pointer;
`;

export const imageLabel = css`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const imgPreview = css`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const optionDetailAdd = css`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: end;
  align-items: center;
  margin-top: 10px;
  margin-right: 5px;

  & > div {
    margin-right: 5px;
  }

  & > button {
    width: 30px;
    background-color: #1976d2;
    border: none;
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    cursor: pointer;
  }
`;

export const confirmButton = css`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 15px;

  & > div {
    margin: 0 0 0 10px;
  }

  & > div > button {
    border: none;
    background-color: #1976d2;
    border-radius: 3px;
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
