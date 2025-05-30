/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./MypageCss";
import { Link, useNavigate } from "react-router-dom";
import {
  MAIN_PATH,
  MY_PAGE_UPDATE,
} from "../../constants";
import { Cookies, useCookies } from "react-cookie";
import { Button } from "@mui/material";
import { MYPAGE_API } from "../../apis";

interface User {
  userId: string;
  userPw: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userBusinessNumber: string;
  marketingAgreed: boolean;
}

export default function Mypage() {
  const [cookies, , removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState<User>({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userBusinessNumber: "",
    marketingAgreed: false,
  });

  const handleCheckBox = () => {
    user.marketingAgreed = !user.marketingAgreed;
    return false;
  };

  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    const token = cookies.token;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(MYPAGE_API.DELETE_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        removeCookie("token");
      } catch (e) {
        console.log("해당 아이디가 없습니다.");
      }
      alert("성공적으로 삭제되었습니다.");
      navigate(MAIN_PATH);
    } else {
      return;
    }
  };

  const fetchData = async () => {
    try {
      const token = cookies.token;
      const userData = await axios.get(MYPAGE_API.GET_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userData);
      setUser(userData.data.data);
    } catch (e) {
      console.error("데이터를 불러오지 못했습니다.", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={s.all}>
      <div css={s.header}>
        <h1>마이페이지</h1>
      </div>
      <div css={s.body}>
        <div css={s.sort}>
          <div>아이디</div>
          <div css={s.user}>
            <input
              type="text"
              css={s.userDetail}
              value={user.userId}
              readOnly
            />
          </div>
        </div>

        <div css={s.sort}>
          <div>이름</div>
          <div css={s.user}>
            <input
              type="text"
              css={s.userDetail}
              value={user.userName}
              readOnly
            />
          </div>
        </div>
        <div css={s.sort}>
          <div>이메일</div>
          <div css={s.user}>
            <input
              type="text"
              css={s.userDetail}
              value={user.userEmail}
              readOnly
            />
          </div>
        </div>
        <div css={s.sort}>
          <div>휴대전화</div>
          <div css={s.user}>
            <input
              type="text"
              css={s.userDetail}
              value={user.userPhone}
              readOnly
            />
          </div>
        </div>
        <div css={s.sort}>
          <div>사업자번호</div>
          <div css={s.user}>
            <input
              type="text"
              css={s.userDetail}
              value={user.userBusinessNumber}
              readOnly
            />
          </div>
        </div>
        <div css={s.sort}>
          <div>마케팅 수신동의</div>
          <div css={s.myProfile_market_input}>
            {user.marketingAgreed ? (
              <input
                css={s.checkBoxInput}
                type="checkbox"
                checked
                onClick={handleCheckBox}
                disabled
              />
            ) : (
              <input
                css={s.checkBoxInput}
                type="checkbox"
                onClick={handleCheckBox}
                disabled
              />
            )}
            <div css={s.myProfile_market_div}>
              무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)
            </div>
          </div>
        </div>

        <div css={s.buttonContainer}>
          <Link to={MY_PAGE_UPDATE}>
            <Button variant="contained">회원 수정</Button>
          </Link>
          <Button
            css={s.deleteUser}
            onClick={handleDeleteUser}
            variant="contained"
          >
            회원 탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}
