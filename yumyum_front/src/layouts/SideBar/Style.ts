import {css} from "@emotion/react";

export const categoryContainer = css`
    position: fixed;
    min-width: 250px;
    height: 100vh;
    text-align: center;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fafafa;
    overflow: auto;
    overflow-x: hidden;

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
        background-color: #eff6ff;
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

export const categoryLogoImg = css`
    min-width: 250px;
    height: 90px;
    object-fit: cover;
    text-align: center;
    line-height: 90px;
`;

export const categoryLogoImgContainer = css`
    display: block;
    height: 90px;
    background-color: #FAFAFA;
`;

export const categoriesStyle = css`
    background-color: #eff6ff;
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

export const profile = css`
    height: 70px;
    font-size: 16px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    margin : 10px 20px;
    border-radius: 12px;
    transition: transform 0.2s ease;

    & > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        text-align: center;
        border: 1px solid gray;
        margin-right: 10px;
    }
    
    &:hover {
        background-color: #eff6ff;
        transform: scale(1.05);
    }
`;

export const userActionsContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height:70px;

    
    &  > a {
        width: 40%;
        height: 50px;
        line-height: 50px;
        transition: transform 0.2s ease;
        margin: 0 10px;
        border-radius: 10px;
        color: black;
    }
    & > button {
        width: 40%;
        height: 50px;
        transition: transform 0.2s ease;
        border: none;
        margin: 0 10px;
        background-color: #FAFAFA ;
        border-radius: 10px;
        font-size: 16px;
    }
    
    &  > a:hover {
        transform: scale(1.05);
        background-color: #D4EBF8;
    }
    & > button:hover {
        transform: scale(1.05);
        background-color: #D4EBF8;
    }
    
`;