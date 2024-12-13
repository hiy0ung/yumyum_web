import { css } from "@emotion/react";

export const formStyle = css`
    width: 500px !important;
    padding: 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    & > div {
        margin-bottom: 20px;
    }

    & > label {
        margin: 0 auto;
        width: 500px;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 54px;
    }
`;

export const logInTitle = css`
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    font-size: 32px;
`;

export const submitButton = css`
    height: 56px;
    width: 100%;
    text-align: center;
`;

export const duplicatedContainer = css`
    margin-top: 20px;
    height: 56px;
    display: flex;

    & > div {
        flex: 4;
    }

    & button {
        flex: 1;
        margin-left: 20px;
    }
`;

export const link = css`
    margin-top: 10px;
    display: flex;
    justify-content: center;
`;

export const linkText = css`
    font-size: 10px;
    text-decoration: none;
    color: black;
    margin-right: 10px;
    margin-left: 10px;
`;
