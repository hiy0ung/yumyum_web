import {css} from "@emotion/react";

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

    & > div:nth-last-of-type(3),
    & > div:nth-last-of-type(5) {
        height: 54px;
        line-height: 54px;
        border: 1px solid #ccc;
        border-radius: 4px;
        position: relative;
        margin-bottom: 0;
    }

    & > div:nth-last-of-type(3) > svg,
    & > div:nth-last-of-type(5) > svg {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 0;
        cursor: pointer;
        margin: 15px;
        color: #999;
    }

    & > div:nth-last-of-type(3) > label,
    & > div:nth-last-of-type(5) > label {
        margin-left: 5px;
    }
`;

export const signUpTitle = css`
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    font-size: 32px;
`;

export const agreed = css`
    height: 100px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 15px;
`;

export const submitButton = css`
    height: 56px;
    width: 50%;
    text-align: center;
`;

export const duplicatedContainer = css`
    height: 56px;
    display: flex;

    & > div {
        flex: 4;
    }

    & button {
        flex: 1;

    }
`;