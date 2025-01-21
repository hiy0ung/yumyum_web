/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import React from "react";
import * as css from "./Style";
import kakao from "../../../images/kakao.png";
import naver from "../../../images/naver.png";
import yumyum from "../../../images/yumyumLogo2.webp";
import { Link } from "react-router-dom";
import { AUTH_PATH_SIGN_UP } from "../../../constants";

export default function ReadySignUp() {
  return (
    <div css={css.container}>
      <div css={css.signUp}>
        <Link to={AUTH_PATH_SIGN_UP}>
          <div css={css.yumyumButton}>
            <img src={yumyum} alt="logo" />
            <span>YumYumTrack 회원가입</span>
          </div>
        </Link>
        <div css={css.kakaoButton}>
          <img src={kakao} alt="카카오 심볼" />
          <span>카카오톡 회원가입</span>
        </div>
        <div css={css.naverButton}>
          <img src={naver} alt="네이버 심볼"></img>
          <span>네이버 회원가입</span>
        </div>
      </div>
    </div>
  );
}
