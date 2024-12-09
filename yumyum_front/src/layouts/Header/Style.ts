import {css} from "@emotion/react";

export const headerContainer = css`
    position: relative;
    width: 100%;
    height: 90px;
    z-index: 9999;
`;

export const headerFlexContainer = css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    display: flex;
`;

export const headerLogoImg = css`
    min-width: 250px;
    height: 90px;
    object-fit: cover;
    text-align: center;
    line-height: 90px;
`;

export const headerLeftContainer = css`
    display: block;
    height: 90px;
    background-color: #FAFAFA;
`;

export const headerMiddleContainer = css`
    flex: 1;
    background-color: #3874CB;

    & > span {
        display: inline-block;
        color: white;
        height: 90px;
        line-height: 90px;
        margin-left: 30px;
        font-size: 25px;
    }
`;

export const headerRightContainer = css`
    width: 250px;
    background-color: #3874CB;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const statusToggleButtonGroup = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    background-color: cornflowerblue;
    width: 200px;
    padding: 15px;
    height: 60px;
`;

export const statusToggleButtonStyles = css`
    font-size: 14px;
    font-weight: bold;
    border: none;
    padding: 7px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
`;

export const openStyle = css`
    background-color: #4caf50;
    color: white;
`;

export const breakStyle = css`
    background-color: #ff9800;
    color: white;
`;

export const closeStyle = css`
    background-color: #f44336;
    color: white;
`;

export const activeStyle = css`
    transform: scale(1.3);
`;

export const passive = css`
    background-color: gray;
`;