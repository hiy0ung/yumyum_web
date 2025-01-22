/** @jsxImportSource @emotion/react */
import React from "react";
import * as css from "./Style";
import kakao from "../../../images/kakao.png";
import naver from "../../../images/naver.png";
import yumyum from "../../../images/yumyumLogo2.webp";
import { Link } from "react-router-dom";
import { AUTH_PATH_SIGN_UP } from "../../../constants";
import {SIGN_UP_SNS_API} from "../../../apis/snsLogInAndSignUp";

export default function ReadySignUp() {
  const onSnsButtonClickHandler = (sns: "kakao" | "naver") => {
    window.location.href = `${SIGN_UP_SNS_API}${sns}`;
  };

  return (
    <div css={css.container}>
      <div css={css.signUp}>
        <Link to={AUTH_PATH_SIGN_UP}>
          <div css={css.yumyumButton}>
            <img src={yumyum} alt="logo" />
            <span>YumYumTrack 회원가입</span>
          </div>
        </Link>
        <div
          css={css.kakaoButton}
          onClick={() => onSnsButtonClickHandler("kakao")}
        >
          <img src={kakao} alt="카카오 심볼" />
          <span>카카오톡 회원가입</span>
        </div>
        <div
          css={css.naverButton}
          onClick={() => onSnsButtonClickHandler("naver")}
        >
          <img src={naver} alt="네이버 심볼"></img>
          <span>네이버 회원가입</span>
        </div>
      </div>
    </div>
  );
}
