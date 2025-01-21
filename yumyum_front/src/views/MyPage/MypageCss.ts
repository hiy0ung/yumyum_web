import {css} from "@emotion/react"

export const all = css`
    margin-bottom: 100px;
`;

export const header = css`
    padding: 50px 0;
    font-size: 40px;
    text-align: center;
`;

export const body = css`
    width: 750px;
    border-radius: 15px;
    margin: 0 auto;
    padding: 30px 20px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    background-color: #EFF6FF;

`

export const user = css`
    box-sizing: border-box;
    display: flex;
    margin: 5px 10px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 96%;
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
        background-color: #EAEEF1;
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
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    & > div:nth-of-type(1) {
        flex: 1;
        padding-left: 40px;
    }

    & > div:nth-of-type(2) {
        flex: 4;
    }
`

export const myProfile_market_input = css`
    display: flex;
    align-items: center;
`;
export const myProfile_market_div = css`
    font-size: 16px;
    padding-top: 2px;


`

export const buttonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    padding: 30px 0;

    & button {
        padding: 12px 20px;
        width: 200px;
    }

    & > a > button {
        width: 200px;
    }
    & > a {
        margin-right: 20px;
    }
`
export const save = css`
    margin-right: 20px;
`;

export const deleteUser = css`
    background-color: #ff6767;

`

export const updateUserDetail = css`
    border: none;
    font-size: 19px;
    width: 100%;
    padding-left: 20px;

    &:read-only {
        background-color: #EAEEF1;
        color: #333;
        cursor: default;
    }

`

export const errorMsg = css`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 15px;


`

export const successMsg = css`
    color: green;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 15px;
`