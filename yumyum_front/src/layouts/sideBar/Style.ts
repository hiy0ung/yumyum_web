import {css} from "@emotion/react";


export const categoryContainer = css`
    position: fixed;
    width: 250px;
    text-align: center;
    z-index: 100;
    display: flex;
    flex-direction: column;
    
    & > nav > ul > li > a {
        display: flex;
        justify-content: start;
        align-items: center;
        height: 20px;
        line-height: 20px;
        color: #757575;
        box-sizing: content-box;
        padding: 20px 0 20px 35px;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    & > nav > ul > li > a:hover {
        background-color: #D1E4F6;
    }

    & > nav > ul > li > a > svg {
        font-size: 25px;
        color: #757575;
    }

    & > nav > ul > li > a > span {
        margin-top: 3px;
        margin-left: 10px;
        color: black;
        font-size: 18px;
    }
`;

export const profile = css`
    display: block;
    justify-content: center;
    height: 50px;
    & > img {
        height: 50px;
        border-radius: 50%;
        text-align: center;
        border : 1px solid gray;
    }
`;

