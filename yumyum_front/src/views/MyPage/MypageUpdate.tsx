import { css } from "@emotion/react"

export const all = css`
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 100px;
  width: 100%;
  height: 100%;
`

export const header = css`
  box-sizing: border-box;
  display: flex;
  margin-bottom: 20px;
  padding: 0px 30px;
  width: 100%;
  height: 50px;
  font-size: 35px;

`

export const body = css`
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 1px solid #dbdbdb;
  width: 90%;
  height: 650px;
  background-color: white;
  border-radius: 10px;
  
`

export const updateBody = css`
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 1px solid #dbdbdb;
  width: 85% ;
  height: 850px;
  background-color: white;
  border-radius: 10px;
  
`

export const user = css`
  box-sizing: border-box;
  display: flex;
  margin: 5px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 50%;
  height: 50px;
  font-size: 19px;
  justify-content: left;
  
  
`

export const userDetail = css`
  border: none;
  font-size: 19px;
  width: 100%;
  padding-left: 20px;
  cursor: default;
  &:read-only {
    background-color: #f0f0f0;
    color: #333;
  }
`

export const checkBoxInput = css`
  box-sizing: border-box;
  display: flex;
  width: 20px;
  height: 20px;
  
`

export const sort = css`
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
  padding: 10px;
  align-items: flex-start;
  & > div:nth-of-type(1) {
    width: 200px;
  }
`

export const myProfile = css`
  display: flex;
  margin-left: 50px;
  align-items: center;
  margin-top: 22px;
  font-size: 16px;

`
export const myProfile_market = css`
  display: flex;
  margin-left: 50px;
  align-items: center;
  margin-top: 5px;
  font-size: 16px;

`
export const myProfile_market_div = css`
  padding-top: 5px;
  font-size: 16px;

`

export const dialogContent = css`
  background-color: white; 
  padding: 20px; 
  border-radius: 5px; 
  text-align:center
`

export const buttonContainer = css`
  display: flex;
  justify-content: center;
  text-align: center;
`

export const updateUser = css`
  border: 1px solid #808;
  border-radius: 3px;
  color: #808;
  background-color: #fff;
  margin: 0px 10px;
  padding: 10px 30px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  text-align: center;
  line-height: 17.778px;
  cursor: pointer;

  &:hover{
    background-color: #f0f0f0;
  }

  a {
    color: #808;
    text-decoration: none;
    display: block;
  }
  
`

export const deleteUser = css`
border: 1px solid #808;
  border-radius: 3px;
  color: #808;
  background-color: #fff;
  margin: 0px 10px;
  padding: 10px 30px;
  display: inline-block;
  text-align: center;
  cursor: pointer;

  &:hover{
    background-color: #f0f0f0;
  }

`
export const updateConfirm = css`
  border: 1px solid #808;
  border-radius: 3px;
  color: #808;
  background-color: #fff;
  margin: 0px 10px;
  padding: 10px 20px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
`

export const updateUserDetail = css`
  border: none;
  font-size: 19px;
  width: 100%;
  padding-left: 20px;
  &:read-only {
    background-color: #f0f0f0;
    color: #333;
    cursor: default;
  }
  
`

export const errorMsg = css`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 270px;

  
`

export const successMsg = css`
  color: green;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 270px;
`