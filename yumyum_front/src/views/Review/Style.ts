import {css} from "@emotion/react";

export const reviewContainer = css`
    padding: 70px 30px 0 30px;
    display: flex;
    justify-content: space-around;
`;
export const reviewLeftContainer = css`
    background-color: #e6e6e6;
    width: 45%;
    min-width: 600px;
    margin-right: 30px;
    aspect-ratio: 1;
`;
export const reviewAverageContainer = css`
    padding: 40px 0 0 0 ;
`;
export const reviewAverageTitle = css`
    text-align: center;
    font-size: 30px;
`;
export const reviewAverage = css`
    padding: 15px 0;
    text-align: center;
    font-size: 50px;
`;

export const ratingBarContainer = css`
    padding: 10px 0;
`;

export const ratingBarMargin = css`
    width: 90%;
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기 
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
    min-width: 500px;
    margin: 0 auto;
`;
export const ratingBarSet = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    
    & > div:nth-of-type(2) {
        background-color: gold;
        overflow: hidden;
        text-overflow: ellipsis;  
        white-space: nowrap; 
    }
`;
export const ratingBarLeftContainer = css`
    display: flex;
    flex: 1;
`
export const starScore = css`
    width: 30px;
    margin: 0 5px;
`;

export const ratingBar = css`
    position: relative;
    background-color: white;
    border: 2px solid black;
    width: 400px;
    flex: 1;
    height: 20px;
    margin-right: 10px;
    
    & > div{
        position: absolute;
        top: -2px;
        left: -2px;
        background-color: #fb8494;
        border: 2px solid black;
        width: 400px;
        height: 20px;
    }
`
export const starImg = css`
    height: 22px;
    
`
export const reviewCount = css`
    text-align: left;
    width: 90px;
    max-width: 90px;
    
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
`;

export const reviewRightContainer = css`
    background-color: #e6e6e6;
    width: 45%;
    min-width: 600px;
    aspect-ratio: 1;
    
`;