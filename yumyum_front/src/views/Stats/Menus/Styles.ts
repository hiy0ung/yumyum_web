import { css } from "@emotion/react";

export const menusStatsContainer = css`
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    padding: 70px 30px 0 30px;
`;

/* Left Container */
export const menuStatsLeft = css`
    width: 40%;
    min-width: 600px;
    aspect-ratio: 1;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    margin-right: 30px;
`;

export const menuStatsLeftTopContainer = css`
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
`;

export const menuStatsLeftTopLeft = css`
    display: flex;

    & > div {
        border-radius: 10px;
        padding: 0 20px;
        background-color: #eff6ff;
        box-shadow: 0 0 10px 1px #e9e9e9;
        border: 1px solid #e9e9e9;
        font-size: 16px;
    }
`;

export const today = css`
    margin-right: 10px;
`;

export const yesterday = css`
    margin-right: 10px;
`;

export const thisMonth = css``;

/* Calendar */
export const calendarContainer = css`
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    border-radius: 10px;
    background-color: #eff6ff;
`;

export const calendarDate = css`
    padding: 0 20px;
    font-size: 16px;
    text-align: center;
`;

export const calendarContainerBlock = css``;
export const calendarContainerNone = css``;

/* Chart Left Result */
export const chartResultLeftContainer = css`
    width: 100%;
`;

/* Right Container */
export const menuStatsRightContainer = css`
    width: 40%;
    min-width: 600px;
    aspect-ratio: 1;
`;

export const menuStatsRightTitle = css`
    border-radius: 12px;
    padding: 0 20px;
    background-color: #eff6ff;
    font-size: 18px;
    height: 46px;
    line-height: 46px;
    width: 50%;
    text-align: center;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
`;

export const menuStatsRightAllResult = css`
    display: flex;
    border-radius: 15px;
    margin: 20px 0;
    height: 80px;
    line-height: 80px;
    background-color: #ff6a7b;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;

    & > div {
        color: white;
        flex: 1;
        text-align: center;
    }
`;

export const menuStatsRightTextContainer = css`
    background-color: #eff6ff;
    height: 530px;
    display: flex;
    padding: 30px;
    justify-content: space-around;
    text-align: center;
    border-radius: 15px;
    overflow: auto;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
`;

/* Statistics Columns */
export const orderProductName = css`
    width: 40%;
    text-align: center;

    & > div:nth-of-type(1) {
        font-size: 22px;
        padding-bottom: 20px;
    }

    & > div {
        min-width: 0;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & > div:not(:nth-of-type(1)) {
        padding: 15px 0;
        margin-bottom: 10px;
        background-color: #ffffff;
        border-radius: 10px 0 0 10px;
        border: 1px solid #e9e9e9;
        border-right: none;
        box-shadow: -5px 0 10px -5px #e9e9e9;
    }
`;

export const totalQuantitySold = css`
    width: 30%;

    & > div:nth-of-type(1) {
        text-align: center;
        font-size: 22px;
        padding-bottom: 20px;
    }

    & > div:not(:nth-of-type(1)) {
        padding: 15px 0;
        margin-bottom: 10px;
        background-color: #ffffff;
        border: 1px solid #e9e9e9;
        border-right: none;
        border-left: none;
    }
`;

export const totalPrice = css`
    width: 30%;

    & > div:nth-of-type(1) {
        text-align: center;
        font-size: 22px;
        padding-bottom: 20px;
    }

    & > div:not(:nth-of-type(1)) {
        padding: 15px 0;
        margin-bottom: 10px;
        background-color: #ffffff;
        border-radius: 0 10px 10px 0;
        border: 1px solid #e9e9e9;
        border-left: none;
        box-shadow: 5px 0 10px -5px #e9e9e9;
    }
`;
