import { css } from "@emotion/react";

export const storeTitle = css`
    margin: 50px 0;
    font-size: 40px;
    height: 50px;
    line-height: 57px;
    text-align: center;
`;

export const formStyle = css`
    background-color: #EFF6FF;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border-radius: 20px;
    border: 1px solid #e4e4e4;
    width: 45%;
    min-width: 500px;
    margin: 0 auto 100px auto;
    padding: 30px 20px 60px 20px;
    max-width: 800px;
`;



export const basicProfile = css`
    display: flex;
    height: 200px;
    margin: 40px;
    justify-content: space-between;
`;

export const storeNameAndCategory = css`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 20px;
    margin: 30px;
    justify-content: space-between;
`;

export const logoImg = css`
    border-radius: 8px;
    width: 200px;
    height: 200px;
    cursor: pointer;
`;

export const category = css`
    margin-top: 30px;
    width: 200px;
`;

export const storeTime = css`
    display: flex;
    width: 500px;
    justify-content: space-around;
    height: 100px;
`;

export const address = css`
    margin: auto;

    & > textarea {
    width: 500px;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    margin-bottom: 20px;
    }
`;

export const descriptionBox = css`
    width: 500px;
    height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    margin-bottom: 20px;
    white-space: pre-line;
`;

export const storeUpdateButton = css`
    border: 1px solid #ccc;
    color: black;
    margin-left: auto;
    margin-top: 20px;
    display: block;

    :hover {
        background-color: #0db4fc;
        color: white;
    }
`;

