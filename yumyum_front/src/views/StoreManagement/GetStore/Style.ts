// Style.ts
import {css} from "@emotion/react";

export const storeTitle= css`
    margin: 50px 0;
    font-size: 40px;
    height: 50px;
    line-height: 57px;
    text-align: center;
`;
export const StoreInfo = css`
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

export const logoUrlContainer = css`
    width: 120px;
    height: 120px;
    margin: 30px auto 0;
`;
export const logoUrl = css`
    object-fit: cover;
    width: 120px;
    height: 120px;
    border-radius: 15px;
`;
export const BasicInfo = css`
    margin: 50px 0 30px 0;
    font-size: 20px;
    & > div > div {
        margin: 20px 0;
        padding: 20px;
        background-color: white;
        border-radius: 15px;
    }
`;
export const infoContainer = css`
    margin: 0 auto;
    width: 85%;
    min-width: 450px;
    
    & > div {
        display: flex;
        justify-content: center;
    }
    
    & > div > span {
        display: inline-block;
        width: 20%;
        
    }
    & > div > span:nth-of-type(1) {
        text-align: center;
        flex: 1;
    }
    & > div > span:nth-of-type(2) {
        flex: 2;
    }
`;

export const storeName = css`
    & > span > span{
        letter-spacing: 30px;
    }
`;

export const storeAddress = css`
    & > span:nth-of-type(2) {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const storeCategory  = css`
    letter-spacing: 1px;
`;

export const buttons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    margin: 0 auto;
    
    & > button {
        flex: 1;
        padding: 15px 0;
        display: inline-block;
        border-radius: 10px;
    }
    & > button:nth-of-type(1) {
        margin-right: 50px;
    }
`;

export const deleteButton = css`
    background-color: #ff6767;

`;
