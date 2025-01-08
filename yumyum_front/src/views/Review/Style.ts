import {css} from "@emotion/react";

export const reviewContainer = css`
    padding: 70px 30px 0 30px;
    display: flex;
    justify-content: center;

`;
export const reviewLeftContainer = css`
    width: 45%;
    min-width: 600px;
    max-width: 800px;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    margin-right: 50px;
    box-sizing: border-box;
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
export const totalRatingBarContainer = css`
    padding: 10px 0;
    margin: 0 auto;
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
`;
export const reviewImgContainer = css`
    width: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    & > div {
        height: calc( 200px / 5);
        line-height: calc( 200px / 5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & > div > img {
        height: 25px;
        width: 25px;
    }
`;
export const reviewRatingContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    padding-left: 5px;
    & > div{
        width: 25px;
        height: calc( 200px / 5);
        line-height: calc( 200px / 5);
        font-size: 15px;
    }
`;
export const reviewRatingBarContainer = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    padding-left: 10px;
`;
export const ratingBar = css`
    height: calc( 200px / 5);
    display: flex;
    justify-content: center;
    align-items: center;
    
    & > div {
        position: relative;
        border: 1px solid #a0a096;
        border-radius: 2px;
        width: 100%;
        height: 25px;
        margin: 5px 0;
    }
`;

export const ratingBarFill = (percentage: number) => css`
    position: absolute;
    top: -1px;
    left: -1px;
    background-color: #fb8494;
    border: 1px solid black;
    width: ${percentage}%;
    height: 25px;
    border-radius: 2px;
`;

export const reviewCounterContainer = css`
    padding-left: 20px;
    & > div {
        max-width: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const reviewCount = css`
    height: calc( 200px / 5);
    line-height: calc( 200px / 5);
`;

export const charStyle = css`
    padding: 0 10px;
`

export const chartX = css`
    & > text:nth-of-type(0) {
        margin-top: 2px;
    }
`;
export const reviewRightContainer = css`
    width: 45%;
    min-width: 600px;
    max-width: 800px;
    border-radius: 20px;
`;
export const reviewTabMenuContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    
    & > div{
        flex: 1;
        padding: 30px 20px;
        font-size: 20px;
    }
`;

export const reviewTabMenuTotal = css`
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #F5F7FA;
    color: white;
`;
export const reviewTabMenuTotalFocus= css`
    box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -webkit-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -moz-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    color: #1681FF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: none;
    background-color: #EFF6FF;
`;

export const reviewTabMenuNoAnswer = css`
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #F5F7FA;
    color: white;
`;

export const reviewTabMenuNoAnswerFocus = css`
    box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -webkit-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -moz-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    color: #1681FF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: none;
    background-color: #EFF6FF;
`;


export const reviewTabMenuEvent = css`
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #F5F7FA;
    color: white;
`;
export const reviewTabMenuEventFocus = css`
    box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -webkit-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    -moz-box-shadow: 0px -18px 16px -7px rgba(0,0,0,0.27);
    color: #1681FF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: none;
    background-color: #EFF6FF;
`;

export const reviewTabMenuContext = css`
    box-shadow: 0 0 10px 1px #e9e9e9;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    
`;
export const displayNone = css`
    display: none;
`;

export const reviewTabMenuTotalContext = css`
    background-color: #EFF6FF;
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 30px;
    min-width: 600px;
    height: 600px;
    max-width: 800px;
    overflow-y: auto;
    box-sizing: border-box;
`;

export const totalReviewContainer = css`
    width: 100%;
    min-height: 150px;
    border: 1px solid #a0a096;
    padding: 10px;
    border-radius: 10px;
`;

export const reviewTabMenuNoAnswerContext = css`
    background-color: #EFF6FF;
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 30px;
    min-width: 600px;
    height: 600px;
    max-width: 800px;
    overflow-y: auto;
    box-sizing: border-box;
    
`;
export const reviewTabMenuEventContext = css`
    background-color: #EFF6FF;
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 30px;
    min-width: 600px;
    height: 600px;
    max-width: 800px;
    overflow-y: auto;
    box-sizing: border-box;
`;

export const quillContainer = css`
`;

export const quill  = css`
    & > div:nth-of-type(1) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    & > div:nth-of-type(2) {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        height: 430px;
    }
`;

export const reviewNoticeUploadButtonContainer = css`
    text-align: right;
`;
export const reviewNoticeUploadButton = css`
    font-size: 20px;
    background-color: white;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border-radius: 5px;
    border: none;
    margin: 10px 0 10px 0;
    padding: 10px 20px;
    line-height: 30px;
    height: 45px;
`;