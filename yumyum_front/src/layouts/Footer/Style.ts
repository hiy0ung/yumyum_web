import {css} from "@emotion/react";

export const footerContainer = css`
    height: 90px;
    background-color: #FAFAFA;
    display: flex;
    align-self: center;
    z-index: 99999;
    position: relative;
`;

export const footerLeftContainer = css`
    position: fixed;
    
    left: 0;
    min-width: 250px;
    background-color: #FAFAFA;
    height: 90px;
    text-align: center;
    line-height: 90px;
    display: flex;


    & > a {
        width: 100%;
        font-size: 16px;
        color: black;
    }

    & > button {
        background-color: #FAFAFA;
        border: none;
        width: 100%;
        font-size: 16px;

    }
`;


export const footerRightContainer = css`
    position: fixed;
    left: 250px;
    right: 0;
    min-width: calc(1280px - 250px);
    flex: 1;
    line-height: 45px;
    text-align: center;
    font-size: 12px;
    z-index: 99999;
    background-color: #3874CB;
`;
