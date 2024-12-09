import { css } from "@emotion/react";

export const menusStatsTitle= css`
    font-size: 36px;
    padding: 10px 0 35px 0;
    text-align: center;
`;
export const menusStatsContainer= css`
    display: flex;
    justify-content: space-around;
    font-size: 20px;
`;
export const menuStatsLeft= css`
    width: 600px;
    margin-right: 20px;
    border : 1px solid gray;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 0 0 10px 1px #E6E6E6;
`;
export const menuStatsLeftTopContainer = css`
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
`;
export const menuStatsLeftTopLeft = css`
    display: flex;
    & >  div{
        border-radius: 7px;
        padding: 0 20px;
        background-color: #E6E6E6;
        font-size: 16px;
    }
`
export const today = css`
    margin-right: 10px;
`;
export const yesterday = css`
    margin-right: 10px;
`;
export const thisMonth = css`

`;

export const calendarContainer= css`
    display: flex;
    align-items: center;
`;
export const calendarDate = css`
    padding: 0 20px;
    border-radius: 7px;
    background-color: #E6E6E6;
    font-size: 16px;
    text-align: center;
`;
export const calendarContainerBlock= css``;
export const calendarContainerNone= css``;
export const chartResultLeftContainer= css``;
export const menuStatsRightContainer= css`
    width: 600px;
`;

export const menuStatsRightTitle= css`
    border-radius: 7px;
    padding: 0 20px;
    background-color: #E6E6E6;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 200px;
    text-align: center;
`;
export const menuStatsRightAllResult= css`
    display: flex;
    border-radius: 10px;
    margin: 20px 0;
    height: 80px;
    line-height: 80px;
    background-color: #FF6A7B;

    & > div {
        color: white;
        flex:1;
        text-align: center;
    }
    & > div:nth-of-type(1) {
    }
    & > div:nth-of-type(2) {
    }
`;
export const menuStatsRightTextContainer= css``;
export const orderProductName= css``;
export const totalQuantitySold= css``;
export const totalPrice= css``;