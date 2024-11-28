import { css } from "@emotion/react";

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
    & > a {
        display: block;
        width: 100%;
        height: 90px;
        background-color: #FAFAFA;
    }
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

export const headerRightContainer  = css`
    width: 250px;
    line-height: 90px;
    text-align: center;
    background-color: #3874CB;
`;
