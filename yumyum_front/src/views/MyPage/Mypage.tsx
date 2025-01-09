/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./MypageCss";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, MY_PAGE_UPDATE } from "../../constants";
import { Cookies, useCookies } from "react-cookie";

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
  const [cookies] = useCookies(['token'])

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
  };

  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    const token = cookies.token;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:4041/api/v1/mypage/delete`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      } catch (e) {
        console.log("해당 아이디가 없습니다.");
      }
      alert("성공적으로 삭제되었습니다.");
      navigate(HOME_PATH)
    } else {
      return;
    }
  };

  const fetchData = async () => {
    try {
      const token = cookies.token;
      const userData = await axios.get(
          `http://localhost:4041/api/v1/mypage/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
      );
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
        <hr style={{ border: "2px solid #000", marginTop: "0px", marginBottom: "10px"}} />
        <div css={s.body}>
          <div css={s.sort}>
            <div css={s.myProfile}>아이디</div>
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
            <div css={s.myProfile}>이름</div>
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
            <div css={s.myProfile}>이메일</div>
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
            <div css={s.myProfile}>휴대전화</div>
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
            <div css={s.myProfile}>사업자번호</div>
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
            <div css={s.myProfile_market}>
              마케팅 수신동의</div>
            {user.marketingAgreed === true ? (
                <input
                    css={s.checkBoxInput}
                    type="checkbox"
                    checked
                    onClick={handleCheckBox}
                    readOnly
                />
            ) : (
                <input
                    css={s.checkBoxInput}
                    type="checkbox"
                    onClick={handleCheckBox}
                    readOnly
                />
            )}
            <div css={s.myProfile_market_div}>무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</div>

          </div>

          <div css={s.buttonContainer}>
            <Link to={MY_PAGE_UPDATE} css={s.updateUser}>
              회원 수정
            </Link>
            <button css={s.deleteUser} onClick={handleDeleteUser}>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
  );
}