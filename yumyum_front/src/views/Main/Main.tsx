/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useRef} from 'react';
import * as css from "./Style";
import useScrollElementsAnimation from "../../hooks/scroll/useScrollElementsAnimation";
import yumyumLogo2 from "../../images/yumyumLogo2.webp";
import img1 from "../../images/foodImg9.webp";
import img2 from "../../images/foodImg10.webp";
import {Link} from "react-router-dom";
import {READY_SIGN_UP} from "../../constants";
import Login from "../Authentication/Login/Login";
import useScrollYCheck from "../../hooks/scroll/useScrollYCheck"
import Footer from "../../layouts/Footer/Footer";
import useScrollTop from "../../hooks/scroll/useScrollToTop";


const Main = () => {
  const scrollY = useScrollYCheck();
  const scrollToTop = useScrollTop();

  const textIntro1 = useRef<HTMLDivElement>(null);
  const textIntro2 = useRef<HTMLDivElement>(null);
  const textIntro3 = useRef<HTMLDivElement>(null);
  const textIntro1IsVisible = useScrollElementsAnimation(textIntro1, 1);
  const textIntro2IsVisible = useScrollElementsAnimation(textIntro2, 1);
  const textIntro3IsVisible = useScrollElementsAnimation(textIntro3, 1);

  const imgIntro = useRef<HTMLDivElement>(null);
  const imgIntro1IsVisible = useScrollElementsAnimation(imgIntro, 0.5);

  const imgIntroRightLittleTitle = useRef<HTMLDivElement>(null);
  const imgIntroRightLittleTitleIsVisible = useScrollElementsAnimation(imgIntroRightLittleTitle, 0.85);

  const imgIntroRightTitle = useRef<HTMLDivElement>(null);
  const imgIntroRightTitleIsVisible = useScrollElementsAnimation(imgIntroRightTitle, 0.9);

  const imgIntroRightSubTitle = useRef<HTMLDivElement>(null);
  const imgIntroRightSubTitleIsVisible = useScrollElementsAnimation(imgIntroRightSubTitle, 0.9);

  const imgIntroRightSubContext = useRef<HTMLDivElement>(null);
  const imgIntroRightSubContextIsVisible = useScrollElementsAnimation(imgIntroRightSubContext, 0.9);

  const listMenu1 = useRef<HTMLLIElement>(null);
  const listMenu1IsVisible = useScrollElementsAnimation(listMenu1, 0.9);

  const listMenu2 = useRef<HTMLLIElement>(null);
  const listMenu2IsVisible = useScrollElementsAnimation(listMenu2, 0.9);

  const cardInfoTopList1Container = useRef<HTMLLIElement>(null);
  const cardInfoTopList1ContainerIsVisible = useScrollElementsAnimation(cardInfoTopList1Container, 0.8);

  const cardInfoTopList2Container = useRef<HTMLLIElement>(null);
  const cardInfoTopList2ContainerIsVisible = useScrollElementsAnimation(cardInfoTopList2Container, 0.76);

  const cardInfoTopList3Container = useRef<HTMLLIElement>(null);
  const cardInfoTopList3ContainerIsVisible = useScrollElementsAnimation(cardInfoTopList3Container, 0.73);

  const cardInfoTopList4Container = useRef<HTMLLIElement>(null);
  const cardInfoTopList4ContainerIsVisible = useScrollElementsAnimation(cardInfoTopList4Container, 0.7);

  const cardInfoBottomList1Container = useRef<HTMLLIElement>(null);
  const cardInfoBottomList1ContainerIsVisible = useScrollElementsAnimation(cardInfoBottomList1Container, 0.8);

  const cardInfoBottomList2Container = useRef<HTMLLIElement>(null);
  const cardInfoBottomList2ContainerIsVisible = useScrollElementsAnimation(cardInfoBottomList2Container, 0.76);

  const cardInfoBottomList3Container = useRef<HTMLLIElement>(null);
  const cardInfoBottomList3ContainerIsVisible = useScrollElementsAnimation(cardInfoBottomList3Container, 0.73);

  const cardInfoBottomList4Container = useRef<HTMLLIElement>(null);
  const cardInfoBottomList4ContainerIsVisible = useScrollElementsAnimation(cardInfoBottomList4Container, 0.7);


  const memoVideo = useMemo(() => (
      <video css={css.mainVideoContainer} autoPlay loop muted playsInline preload="metadata">
        <source src="/videoplayback.mp4" type="video/mp4"/>
      </video>
  ), []);

  const sectionHandler = (name: string) => {
    if (name === "logIn") {
      const loginSection = document.getElementById('logIn');
      if (loginSection) {
        loginSection.scrollIntoView({behavior: 'smooth'});
      }
    }
    if (name === "home") {
      const HomeSection = document.getElementById('home');
      if (HomeSection) {
        HomeSection.scrollIntoView({behavior: 'smooth'});
      }
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
      <>
        <div id="home" css={css.wrap}>
          <header css={[css.headerContainer, scrollY > 100 && css.headerScroll]}>
            <div css={css.header}>
              <h1>
                <img onClick={() => sectionHandler("home")} css={css.logoImg} src={yumyumLogo2}
                     alt="로고 이미지"/>
              </h1>
              <div css={css.headerRightContainer}>
                <button onClick={() => sectionHandler("logIn")} css={css.logIn}>LOGIN</button>
                <Link to={READY_SIGN_UP} css={css.signUp}>SIGNUP</Link>
              </div>
            </div>
          </header>
          {memoVideo}
          <div css={css.textIntroContainer}>
            <div>
              <div ref={textIntro1} css={[css.textBox1, textIntro1IsVisible && css.visibleYBox]}>
                정신 나갈 것 같애
              </div>
            </div>
            <div>
              <div ref={textIntro2} css={[css.textBox2, textIntro2IsVisible && css.visibleYBox]}>
                점심은 나가서 먹을 것 같애
              </div>
            </div>
            <div>
              <div ref={textIntro3} css={[css.textBox3, textIntro3IsVisible && css.visibleYBox]}>
                점심은 짜장면
              </div>
            </div>
          </div>
          <div css={css.imgIntroContainer}>
            <div css={css.imgIntroLeftContainer}>
              <div ref={imgIntro}
                   css={[css.imgIntroLeftIntoContainer, imgIntro1IsVisible && css.visibleCircleBox]}></div>
            </div>
            <div css={css.imgIntroRightContainer}>
              <div css={css.imgIntroRightLittleTitleHidden}>
                <h3 ref={imgIntroRightLittleTitle}
                    css={[css.imgIntroRightLittleTitle, imgIntroRightLittleTitleIsVisible && css.visibleYBox]}>
                  꼬로록...
                </h3>
              </div>
              <div css={css.imgIntroRightTitleHidden}>
                <h2 ref={imgIntroRightTitle}
                    css={[css.imgIntroRightTitle, imgIntroRightTitleIsVisible && css.visibleYBox]}>
                  배고프다 배고프다 배고파 오늘은 뭐 먹지?
                </h2>
              </div>
              <div css={css.imgIntroRightBottomContainer}>
                <div>
                  <h4 ref={imgIntroRightSubTitle}
                      css={[css.imgIntroRightSubTitle, imgIntroRightSubTitleIsVisible && css.visibleXBox]}>
                    요즘 뜨는 서면 맛집 순위
                  </h4>
                </div>
                <div>
                  <p ref={imgIntroRightSubContext}
                     css={[css.imgIntroRightSubContext, imgIntroRightSubContextIsVisible && css.visibleXBox]}>
                    3found 서면전포본점, 홍유단 서면, EU 피자 & 파스타 서면 본점, 물찬제비, 페이센동 전포본점, 하루우동 서면본점, 모찌의하루
                    서면본점, 바오하우스
                  </p>
                </div>
                <ul>
                  <li ref={listMenu1} css={[css.listMenu1, listMenu1IsVisible && css.visibleXBox]}>
                    <img css={css.listMen1Img} src={img1} alt="음식사진"/>
                    <h5 css={css.listMenu1Title}>이거지~</h5>
                  </li>
                  <li ref={listMenu2} css={[css.listMenu2, listMenu2IsVisible && css.visibleXBox]}>
                    <img css={css.listMen2Img} src={img2} alt="음식사진"/>
                    <h5 css={css.listMenu2Title}>땡긴다</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div css={css.cardInfoContainer}>
            <div css={css.cardInfoContainerRgba}>
              <ul css={css.cardInfoTopBottomContainer}>
                <li ref={cardInfoTopList1Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoTopList1Container,
                      cardInfoTopList1ContainerIsVisible && css.visibleZBox]}>
                  <div>배고프다</div>
                </li>
                <li ref={cardInfoTopList2Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoTopList2Container,
                      cardInfoTopList2ContainerIsVisible && css.visibleZBox]}>
                  <div>쉬고싶다</div>
                </li>
                <li ref={cardInfoTopList3Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoTopList3Container,
                      cardInfoTopList3ContainerIsVisible && css.visibleZBox]}>
                  <div>눕고싶다</div>
                </li>
                <li ref={cardInfoTopList4Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoTopList4Container,
                      cardInfoTopList4ContainerIsVisible && css.visibleZBox]}>
                  <div>사고싶다</div>
                </li>
              </ul>
              <ul css={css.cardInfoTopBottomContainer}>
                <li ref={cardInfoBottomList1Container}
                    css={[
                      css.cardInfoCommonLayout,
                      css.cardInfoBottomList1Container, cardInfoBottomList1ContainerIsVisible && css.visibleZBox]}>
                  <div>먹고싶다</div>
                </li>
                <li ref={cardInfoBottomList2Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoBottomList2Container, cardInfoBottomList2ContainerIsVisible && css.visibleZBox]}>
                  <div>놀고싶다</div>
                </li>
                <li ref={cardInfoBottomList3Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoBottomList3Container, cardInfoBottomList3ContainerIsVisible && css.visibleZBox]}>
                  <div>자고싶다</div>
                </li>
                <li ref={cardInfoBottomList4Container}
                    css={[css.cardInfoCommonLayout,
                      css.cardInfoBottomList4Container, cardInfoBottomList4ContainerIsVisible && css.visibleZBox]}>
                  <div></div>
                  <div>팔고싶다</div>
                </li>
              </ul>
            </div>
          </div>
          <div id="logIn" css={css.logInContainer}>
            <Login/>
          </div>
          <Footer/>
        </div>
      </>
  );
};

export default Main;
