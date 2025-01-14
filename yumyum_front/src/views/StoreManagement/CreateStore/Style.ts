import { css } from "@emotion/react";

export const storeTitle = css`
    margin: 50px 0;
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    color: #333;
`;

export const formStyle = css`
    background-color: #f9fafc;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 30px;
    max-width: 600px;
    margin: 30px auto;
`;

export const basicProfile = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    & > div {
        width: 100%;
        text-align: center;
    }
`;

export const logoImg = css`
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const storeNameAndCategory = css`
    margin-top: 30px;
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-start;
    align-items: flex-end;

    & > div {
        width: 100%;
    }
`;

export const category = css`
    width: 100%;
`;

export const addressSection = css`
    margin-bottom: 25px;

    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        & > input {
            flex: 1;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
        }
    }
`;

export const address = css`
    display: inline-block;
    width: 100%;
    height: 56px;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const detailAddress = css`
    margin-right: 13px;
    width: 263px;
    height: 56px;
    padding: 5px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const openAndCloseTime = css`
    margin-top: 30px;
    display: flex;
    gap: 15px;

    & > div {
        flex: 1;
    }
`;

export const breakTime = css`
    margin-top: 10px;
    margin-bottom: 30px;
    display: flex;
    gap: 15px;

    & > div {
        flex: 1;
    }

`;

export const descriptionBox = css`
    width: 100%;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    font-size: 14px;
    margin-bottom: 30px;
    resize: none;
    background-color: #fff;
`;

export const storeSubmitButton = css`
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 15px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const logoUploadButton = css`
    margin-top: 10px;
    text-align: center;

    & > input {
        display: none;
    }

    & > button {
        padding: 8px 14px;
        font-size: 13px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #e0e0e0;
        }
    }
`;