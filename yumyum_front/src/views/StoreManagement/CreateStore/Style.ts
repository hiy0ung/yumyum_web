import { css } from "@emotion/react";

export const formStyle = css`
    width: 80%;
    max-width: 800px;
    min-height: 100vh;
    padding: 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    background-color: #fafafa;
`;

export const storeTitle = css`
    margin: 10px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    font-size: 32px;
`;

export const basicProfile = css`
    display: flex;
    height: 200px;
    margin: 40px;
    margin-bottom: 40px;
    justify-content: space-around;
`;

export const storeNameAndCategory = css`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 10px;
    justify-content: space-between;
`;

export const logoImg = css`
    width: 200px;
    height: 200px;
`;

export const category = css`
    margin-top: 30px;
    width: 200px;
`;

export const storeTime = css`
    display: flex;
    width: 500px;
    justify-content: space-around;
    margin: 20px;
    height: 100px;
`;

export const descriptionBox = css`
    width: 500px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    white-space: pre-line;
`;

export const storeSubmitButton = css`
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
