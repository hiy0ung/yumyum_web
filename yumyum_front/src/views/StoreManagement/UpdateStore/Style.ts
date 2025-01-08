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
    margin: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 32px;
    color: #333;
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

