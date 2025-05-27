import {css} from "@emotion/react";

export const headerContainer = css`
    position: relative;
    left: 0;
    top: 0;
    height: 90px;
    z-index: 9999;
`;

export const headerFlexContainer = css`
    position: fixed;
    top: 0;
    right: 0;
    left: 250px;
    height: 90px;
    display: flex;
`;

export const headerLeftContainer = css`
    flex: 1;
    background-color: #eff6ff;
`;

export const headerRightContainer = css`
    width: 250px;
    background-color: #eff6ff;
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
    background-color: #eaeef1;
    width: 200px;
    padding: 15px;
    height: 60px;
`;

export const statusToggleButtonStyles = css`
    font-size: 14px;
    font-weight: bold;
    border: none;
    padding: 5px 8px;
    height: 30px;
    border-radius: 15px;
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