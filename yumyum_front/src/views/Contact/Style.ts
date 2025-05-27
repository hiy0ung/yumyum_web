import {css} from "@emotion/react";

export const contactTitle = css`
    text-align: center;
    padding: 50px 0;
    font-size: 40px;
`;

export const inputTotalContainer = css`
    width: 600px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    margin: 0 auto;
    border-radius: 15px;
`;

export const inputContainer = css`
    display: flex;
    flex-direction: column;
    padding: 30px;
    
`;
export const email = css`
    padding: 10px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    &:focus {
        border-color: #007BFF; /* Blue border on focus */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; /* Removes default focus outline */
    }
`;
export const title = css`
    padding: 10px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    &:focus {
        border-color: #007BFF; /* Blue border on focus */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; /* Removes default focus outline */
    }
`;
export const textArea = css`
    padding: 10px;
    margin: 10px 0;
    height: 300px;
    font-size: 16px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    
    &:focus {
        border-color: #007BFF; /* Blue border on focus */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; /* Removes default focus outline */
    }
`;
export const buttonContainer = css`
    text-align: right;
    margin-top: 10px;
`;