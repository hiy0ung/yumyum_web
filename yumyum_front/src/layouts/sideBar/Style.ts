import {css} from "@emotion/react";

export const categoryContainer = css`
    position: fixed;
    min-width: 250px;
    height: calc(100vh - 90px - 90px);
    text-align: center;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fafafa;

    & > nav > ul > li {
        margin-bottom: 10px;
        transition: transform 0.2s ease;
    }
    & > nav > ul > li:hover {
        transform: scale(1.05);
    }

    & > nav > ul > li > a {
        display: flex;
        justify-content: start;
        align-items: center;
        height: 20px;
        line-height: 20px;
        color: #757575;
        box-sizing: content-box;
        padding: 20px 0 20px 35px;
        border-radius: 20px;
        width: 75%;
        margin: 0 auto;
        z-index: 9;
    }

    & > nav > ul > li > a:hover {
        background-color: #d4ebf8;
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

    & > nav > ul > li > ul {
        padding-bottom: 5px;
    }

    & > nav > ul > li > ul > li {
        margin-bottom: 5px;
    }

    & > nav > ul > li > ul > li > a {
        display: flex;
        justify-content: start;
        align-items: center;
        height: 20px;
        line-height: 20px;
        color: #757575;
        box-sizing: content-box;
        padding: 20px 0 20px 40px;
        border-radius: 20px;
        width: 75%;
        margin: 0 auto;
    }
    & > nav > ul > li > ul > li > a > span {
        margin-left: 5px;
    }

    & > nav > ul > li > ul > li > a:hover {
        background-color: #cbdceb;
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
        border: 1px solid gray;
    }
`;
export const categoriesStyle = css`
    background-color: #d4ebf8;
    border-radius: 20px;
    width: 90%;
    margin: 0 auto;
`;
export const categoriesChildGroupOffStyle = css`
    display: none;
`;

export const categoriesChildGroupOnStyle = css`
    display: block;
`;

export const categoriesChildStyle = css`
    background-color: #cbdceb;
    border-radius: 20px;
    width: 90%;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;

    & span {
        color: black;
    }
`;
