import {css} from "@emotion/react";
import ex1 from "../../img/food1.webp"
import defaultImg from "../../img/default_Profile_Img2.webp"
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
    box-shadow: 0 -18px 16px -7px rgba(0, 0, 0, 0.27);
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
    box-shadow: 0 -18px 16px -7px rgba(0, 0, 0, 0.27);
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
    box-shadow: 0 -18px 16px -7px rgba(0, 0, 0, 0.27);
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
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    background-color: ghostwhite;
    position: relative;
    height: auto;
`;

export const totalReviewInContainer = css`
`;

export const reviewDate = css`
    font-size: 10px;
    margin-bottom: 5px;
    color: #a0a096;
`;

export const reviewTopContainer = css`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;
export const guestInfoContainer = css`
    margin-left: 10px;
`;
export const guestNickname = css`
    font-size: 13px;
    margin-bottom: 5px;
`;

export const filledStar = css`
    color: gold;
    margin-right: 2px;
`;
export const emptyStar = css`
    color: lightgray;
    margin-right: 2px;
`;
export const reviewProfileImg = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
`;

export const reviewText = css`
    font-size: 13px;
    margin-bottom: 3px;
`;

export const reviewPhotosContainer = css`
    display: flex;
    align-items: center;
`;

export const reviewPhoto = css`
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-right: 5px;
    object-fit: cover;
    
`;

export const menuNamesContainer = css`
    display: flex;
    align-items: center;
`;
export const menuNames = css`
    background-color: white;
    font-size:10px;
    color: gray;
    border-radius: 8px;
    padding: 1px 3px;
    height: 15px;
    line-height: 13px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e9e9e9;
    margin-top: 3px;
`;

export const reviewCommentContainer = css`
    box-shadow: 0 0 10px 1px #e9e9e9;
    border: 1px solid #e6e6e6;
    position: absolute;
    right: 20px;
    bottom : 20px;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    background-color: white;
    
    &:hover {
        cursor: pointer;
    }
`;
export const commentInValidTextArea = css`
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 10px 0 0 20px;
`;

export const commentInValidTextAreaTail = css`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #ccc;
    top: 25px;
    left: 10px;
    z-index: 2;
    
`;

export const commentInValidTextAreaTailUpper = css`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid white;
    top: -10px;
    left: -7px;
    z-index: 3;
`;
export const reviewAddCommentContainer = css`
    
`;

export const reviewAddCommentInfoContainer = css`
    display: flex;
    position: relative;
`;

export const reviewProfileImg2 = css`
    background: url(${defaultImg}) center center no-repeat;
    background-size: cover;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
    
`;
export const textArea = css`
    width: 86%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 10px 0 0 20px;
    z-index: 2;
    position: relative;
    background-color: white;
    overflow-y: auto;
`;


export const textAreaTail = css`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #ccc;
    top: 20px;
    left: 70px;
    z-index: 2;
`;

export const textAreaTailUpper = css`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid white;
    top: -10px;
    left: -7px;
    z-index: 3;
`;

export const reviewAddCommentInValidContainer = css`
`;
export const reviewAddCommentTopContainer = css`
    display: flex;
`;
export const reviewAddCommentInValidRight = css`
    flex: 1;
    position: relative;
`;
export const reviewAddCommentButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    
    & > button {
        box-shadow: 0 0 10px 1px #e9e9e9;
        border: 1px solid #e6e6e6;
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 10px;
        background-color: white;
        margin-top: 5px;

        &:hover {
            cursor: pointer;
        }
    }
    & > button:nth-of-type(1) {
        margin-right: 5px;
    }
`;
export const noReviewsMessage = css`
    
`;
export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const modalContent = css`
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const modalImage = css`
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
`;

export const closeButton = css`
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
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