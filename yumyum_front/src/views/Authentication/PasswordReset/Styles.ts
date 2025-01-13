import { css } from "@emotion/react";

export const changePasswordContainer = css`
    text-align: center;
    margin-top: 20px;
    padding: 0 150px;
`;

export const changePasswordTitle = css`
    font-size: 40px;
    padding: 50px 0;
`;

export const newPasswordContainer = css`
    & > input {
        padding: 15px;
        margin-bottom: 10px;
        width: 350px;
        border-radius: 10px;
        border: 1px solid #a0a096;
    }
`;
export const confirmPasswordContainer = css`
    & > input {
        padding: 15px;
        width: 350px;
        border-radius: 10px;
        border: 1px solid #a0a096;
    }
`;
export const changePasswordButton  = css`
    border: none;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border-radius: 10px;
    margin: 10px 0 10px 0;
    padding: 14px 20px;
    width: 350px;
    background-color: #58CDFF;
    color: white;
`;