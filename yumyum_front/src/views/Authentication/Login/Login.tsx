/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { SignInResponseDto, UserLogInInfo } from "../../../types/logIn";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import * as css from "./Style";
import axios from "axios";
import {
  AUTH_PATH_SIGN_UP,
  HOME_PATH,
} from "../../../constants";
import { useCookies } from "react-cookie";
import useAuthStore from "../../../Stroes/auth.store";

export default function Login() {
  const navigate = useNavigate();

  const [userLogInInfo, setUserLogInInfo] = useState<UserLogInInfo>({
    userId: "",
    userPw: "",
  });

  const [error, setError] = useState<string>("");
  const [, setCookies] = useCookies(["token"]);
  const { login } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUserLogInInfo({
      ...userLogInInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4041/api/v1/auth/login`,
        userLogInInfo
      );
      console.log("로그인 응답:", response.data.data);

      if (response.data && response.data.data) {
        signInSuccessResponse(response.data.data);
        console.log(response.data.data);
      } 
    } catch (e) {
      setError("로그인 중 문제가 발생했습니다.");
    }
  };

  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + exprTime);
    console.log("토큰", token, "만료시간", expires)
    setCookies("token", token, { path: "/", expires });
  };

  const signInSuccessResponse = (data: SignInResponseDto) => {
    if (data) {
      const { token, exprTime } = data;
      setToken(token, exprTime);

      login({
        token: token,
      });

      navigate(HOME_PATH);
      console.log(token);
    } else {
      alert(error);
      setError("로그인 실패: 인증 정보를 확인해주세요.");
    }
  };


  return (
    <>
      <h2 css={css.logInTitle}>로그인</h2>
      <Box css={css.formStyle} component="form">
        <Box css={css.duplicatedContainer}>
          <TextField
            label="아아디"
            type="text"
            name="userId"
            variant="outlined"
            value={userLogInInfo.userId}
            onChange={handleInputChange}
            autoComplete="off"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <TextField
          label="비밀번호"
          type="password"
          name="userPw"
          variant="outlined"
          value={userLogInInfo.userPw}
          onChange={handleInputChange}
          autoComplete="off"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box>
          <Button
            css={css.submitButton}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >로그인
          </Button>
        </Box>
        <Box css={css.link}>
          <Link css={css.linkText} to={AUTH_PATH_SIGN_UP}>
            회원가입
          </Link>
          <p css={css.linkText}>/</p>
          <Link css={css.linkText} to={"/"}>
            아이디/비밀번호 찾기
          </Link>
        </Box>
      </Box>
    </>
  );
}
