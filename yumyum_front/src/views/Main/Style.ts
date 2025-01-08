import {css} from "@emotion/react";
import img1 from "../../img/img1.webp"
import img2 from "../../img/chartImg.webp"
import food1 from "../../img/food1.webp"
import food2 from "../../img/food2.webp"
import food3 from "../../img/food3.webp"
import food4 from "../../img/food4.webp"
import food5 from "../../img/food5.webp"
import food6 from "../../img/food6.webp"
import food7 from "../../img/food7.webp"
import food8 from "../../img/food8.webp"

export const wrap = css`
    min-width: 1280px;
`;
export const textBox1 = css`
    transform: translateY(100%);
    transition: all 1s ease-out;
    font-size: 100px;
    padding: 60px 0 10px 0;
    font-weight: 600;
`;
export const textBox2 = css`
    transform: translateY(100%);
    transition: all 0.8s ease-out;
    font-size: 100px;
    padding: 10px 0 30px 0;
    font-weight: 600;
`;
export const textBox3 = css`
    transform: translateY(100%);
    transition: all 1s ease-out;
    font-size: 40px;
    color: gray;
`;

export const headerContainer = css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 90px;
    width: 100%;
    z-index: 9999;
    min-width: 1280px;
`;
export const header = css`
    display: flex;
    justify-content: space-between;
    height: 90px;
    width: 95%;
    margin: 0 auto;
`;
export const scrolledHeader = css`
    background-color: white;
    color: black;
`;
export const mainVideoContainer = css`
    width: 100%;
    height: 100vh;
    object-fit: cover;
`;
export const logoImg = css`
    height: 90px;
`;
export const headerRightContainer = css`
    display: flex;
`;
export const logIn = css`
    border: transparent;
    background-color: transparent;
    height: 90px;
    line-height: 90px;
    padding: 0 20px;
    color: #FFFFFF;
    font-size: 20px;
`;

export const signUp = css`
    height: 90px;
    line-height: 90px;
    padding: 0 20px;
    color: #FFFFFF;
    font-size: 20px;
`;
export const scrollSignUp = css`
    color : black;
`;

export const textIntroContainer = css`
    width: 100%;
    background: #F9F9F9;
    padding: 150px 0;
    & > div {
        overflow: hidden;
    }
    & > div > div {
        text-align: center;
    }
`;

export const imgIntroContainer = css`
    padding: 150px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 1200px;
`;

export const imgIntroLeftContainer = css`
    overflow: hidden;
    width: 600px;
    min-width: 600px;
`;
export const imgIntroLeft= css`
    border-radius: 50%;

`;
export const imgIntroLeftIntoContainer  = css`
    overflow: hidden;
    width: 600px;
    height: 600px;
    background: url(${img1}) no-repeat center center;
    background-size: cover;
    border-radius: 50%;
    transition: all 0.6s;
    clip-path: circle(0% at 50% 50%);
`;
export const visibleCircleBox = css`
    clip-path: circle(50% at 50% 50%);
`;
export const visibleYBox = css`
    transform: translateY(0);
`;
export const visibleXBox = css`
    transform: translateX(0);
`;
export const imgIntroContainer2 = css`
    height: 100vh;
    clip-path: circle(50% at 50% 50%);
`;
export const imgIntroRightContainer = css`
    width: 600px;
    min-width: 600px;
`;

export const imgIntroRightLittleTitleHidden  = css`
    overflow: hidden;
`;
export const imgIntroRightLittleTitle = css`
    font-size: 20px;
    height: 40px;
    line-height: 20px;
    padding-left: 65px;
    transform: translateY(100%);
    transition: all 0.8s ease-out;
    
    &:before {
        display: block;
        content: "";
        width: 11px;
        height: 11px;
        background: gold;
        border-radius: 50%;
        position: relative;
        left: -15px;
        top: 15px;
    }
`;

export const imgIntroRightTitleHidden  = css`
    overflow: hidden;
`;
export const imgIntroRightTitle = css`
    font-size: 60px;
    padding-left: 50px;
    line-height: 80px;
    transform: translateY(100%);
    transition: all 0.8s ease-out;
`;
export const imgIntroRightBottomContainer = css`
    padding: 0 0 0 110px;
    position: relative;
    &:before {
        display: block;
        content: "";
        width: 11px;
        height: 11px;
        background: gray;
        border-radius: 50%;
        position: absolute;
        left: 75px;
        top: 45px;
        z-index: 2;
    }
    &:after {
        display: block;
        content: "";
        width: 1px;
        height: 450px;
        background: #787878;
        border-radius: 50%;
        position: absolute;
        left: 80px;
        top: 50px;
    }
    & > ul {
        overflow: hidden;
    }
    & > div {
        overflow: hidden;
    }
`;
export const imgIntroRightSubTitle = css`
    font-size: 40px;
    padding: 10px 0 0 50px;
    transform: translateX(-100%);
    transition: all 0.8s ease-out;

`;
export const imgIntroRightSubContext = css`
    font-size: 24px;
    padding: 10px 40px 0 50px;
    line-height: 30px;
    transform: translateX(-100%);
    transition: all 0.8s ease-out;
`;

export const listMenu1 = css`
    display: flex;
    align-items: center;
    padding: 10px 0 0 50px;
    font-size: 30px;
    transform: translateX(-100%);
    transition: all 0.8s ease-out;
`;
export const listMen1Img = css`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;
export const listMenu1Title = css`
    margin-left: 50px;
`;
export const listMenu2 = css`
    display: flex;
    align-items: center;
    padding: 10px 0 0 50px;
    font-size: 30px;
    transform: translateX(-100%);
    transition: all 0.8s ease-out;
`;
export const listMen2Img = css`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;
export const listMenu2Title = css`
    margin-left: 50px;
`;
export const cardInfoContainer = css`
    padding: 150px 0;
    background: url(${img2}) no-repeat center center;
    background-size: cover;
`;
export const visibleZBox = css`
    opacity: 1;
    transform: translatey(0);
    
`;
export const cardInfoCommonLayout = css`
    width: 300px;
    height: 300px;
    border-radius: 20px;
    opacity: 0;
    transform: translateZ(200px);
    transition: all 0.8s;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    padding: 0 0 30px 0;
 
    & > div {
        font-size: 30px;
        font-weight: 600;
        color: white;
    }
`;
export const cardInfoTopBottomContainer = css`
    perspective: 800px; 
    width: 1280px;
    margin : 0 auto;
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const cardInfoTopList1Container = css`
    background: url(${food1}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoTopList2Container = css`
    background: url(${food2}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoTopList3Container = css`
    background: url(${food3}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoTopList4Container = css`
    background: url(${food4}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoBottomList1Container = css`
    background: url(${food5}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoBottomList2Container = css`
    background: url(${food6}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoBottomList3Container = css`
    background: url(${food7}) no-repeat center center;
    background-size: cover;
`;
export const cardInfoBottomList4Container = css`
    background: url(${food8}) no-repeat center center;
    background-size: cover;
`;
export const logInContainer = css`
    padding: 150px 0;
    background-color: #f0f4f8;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const footerContainer = css`
    padding: 80px 0;
    background-color: #191919;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const footerLeftContainer = css`
    color: #ffffff;
`;
export const footerLeftLogo = css`
    height: 90px;
`;
export const LeftAddressContainer = css`
    line-height: 30px;
    margin-left: 30px;
    margin-top: 50px;
    font-style: normal;
    color: #828282;
`;
export const bar = css`
    width: 1px;
    height: 14px;
    display: inline-block;
    background-color: #828282;
    margin: 0 10px;
`;

export const footerRightContainer = css`
    color: #ffffff;
`;

export const rightAddressContainer = css`
    margin-right: 50px;
`;

export const ownerTel = css`
    font-size: 25px;
    font-weight: 600;
    font-style: normal;
`;
export const ownerTelNumber = css`
    font-size: 40px;
    font-style: normal;
    color: #2c90f5;
    font-weight: 600;
    display: inline-block;
    margin: 10px 0 ;
`;

export const businessTime = css`
    display: inline-block;
    font-style: normal;
    color: #828282;
`;
export const copyright = css`
    font-size: 12px;
    color: #444444;
    font-weight: 200;
    font-style: normal;
    margin-top: 80px;
`;
