/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./MypageCss";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, MAIN_PATH, MY_PAGE, MY_PAGE_UPDATE } from "../../constants";

interface User {
    userId: string;
    userPw: string;
    userConfirmPw: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userBusinessNumber: string;
    marketingAgreed: boolean;
}

export default function Mypage() {
    const [user, setUser] = useState<User>({
        userId: "",
        userPw: "",
        userConfirmPw: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        userBusinessNumber: "",
        marketingAgreed: false,
    });

    const [id, SetId] = useState<Number>(1);
    const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
    const [successMsg, setSuccessMsg] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMsg = "";

        switch (name) {
            case "userPw":
                const passwordRegex =
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,15}$/;
                if (!passwordRegex.test(value)) {
                    errorMsg =
                        "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8~15자 이내로 입력해주세요.";
                }
                break;
            case "userConfirmPw":
                if (value !== user.userPw) {
                    errorMsg = "비밀번호가 일치하지 않습니다.";
                } else {
                    setSuccessMsg((prev) => ({
                        ...prev,
                        userConfirmPw: "비밀번호가 일치합니다.",
                    }));

                }
                break;
            case "userPhone":
                const phoneRegex = /^\d{10,11}$/;
                if (!phoneRegex.test(value)) {
                    errorMsg = "유효한 휴대폰 번호를 입력해주세요. (10~11자리)";
                }
                break;
            default:
                break;
        }

        setErrorMsg((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCheckBox = () => {
        setUser((prevUser) => ({
            ...prevUser,
            marketingAgreed: !prevUser.marketingAgreed,
        }));
    };

    const fetchData = async () => {
        try {
            const userData = await axios.get(
                `http://localhost:4041/api/v1/mypage/${id}`
            );
            setUser(userData.data.data);
        } catch (e) {
            console.error("데이터를 불러오지 못했습니다.", e);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handlePutUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasErrors = Object.entries(errorMsg).some(([key, msg]) => key !== "form" && msg !== "")
        if (hasErrors) {
            setErrorMsg((prev) => ({ ...prev, form: "Errors in errorText "}));
            return
        }
        try{
            await axios.put(`http://localhost:4041/api/v1/mypage/update/${id}`, user);
            console.log(user);
            alert("수정이 완료되었습니다.")
            navigate(MAIN_PATH)
        } catch(e) {
            console.error("데이터를 불러오지 못했습니다.", e);
        }
    }

    return (
        <div css={s.all}>
            <div css={s.header}>
                <h1>마이페이지</h1>
            </div>
            <hr style={{ border: "2px solid #000", marginTop: "0px", marginBottom: "10px" }} />
            <div css={s.updateBody}>
                <div css={s.sort}>
                    <div css={s.myProfile}>아이디</div>
                    <div css={s.user}>
                        <input
                            type="text"
                            css={s.updateUserDetail}
                            value={user.userId}
                            readOnly
                        />
                    </div>
                </div>
                <div css={s.sort}>
                    <div css={s.myProfile}>비밀번호</div>
                    <div css={s.user}>
                        <input
                            type="password"
                            name="userPw"
                            css={s.updateUserDetail}
                            placeholder="비밀번호를 입력하세요"
                            onChange={handleInputChange}
                        />
                    </div>
                    {errorMsg.userPw && <div css={s.errorMsg}>{errorMsg.userPw}</div>}
                </div>
                <div css={s.sort}>
                    <div css={s.myProfile}>비밀번호 확인</div>
                    <div css={s.user}>
                        <input
                            type="password"
                            name="userConfirmPw"
                            css={s.updateUserDetail}
                            placeholder="다시 비밀번호를 입력하세요"
                            onChange={handleInputChange}
                        />
                    </div>
                    {user.userPw === user.userConfirmPw ? (
                        <div css={s.successMsg}>{successMsg.userConfirmPw}</div>
                    ) : errorMsg.userConfirmPw && (
                        <div css={s.errorMsg}>{errorMsg.userConfirmPw}</div>
                    )}
                </div>

                <div css={s.sort}>
                    <div css={s.myProfile}>이름</div>
                    <div css={s.user}>
                        <input
                            type="text"
                            css={s.updateUserDetail}
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
                            css={s.updateUserDetail}
                            value={user.userEmail}
                            readOnly
                        />
                    </div>
                </div>
                <div css={s.sort}>
                    <div css={s.myProfile}>핸드폰 번호</div>
                    <div css={s.user}>
                        <input
                            type="text"
                            name="userPhone"
                            css={s.updateUserDetail}
                            value={user.userPhone}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errorMsg.userPhone && (
                        <div css={s.errorMsg}>{errorMsg.userPhone}</div>
                    )}
                </div>
                <div css={s.sort}>
                    <div css={s.myProfile}>사업자번호</div>
                    <div css={s.user}>
                        <input
                            type="text"
                            css={s.updateUserDetail}
                            value={user.userBusinessNumber}
                            readOnly
                        />
                    </div>
                </div>
                <div css={s.sort}>
                    <div css={s.myProfile_market}>마케팅 수신동의</div>
                    {user.marketingAgreed === true ? (
                        <input
                            css={s.checkBoxInput}
                            type="checkbox"
                            checked
                            onClick={handleCheckBox}
                        />
                    ) : (
                        <input
                            css={s.checkBoxInput}
                            type="checkbox"
                            onClick={handleCheckBox}
                        />
                    )}
                    <div css={s.myProfile_market_div}>
                        무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)
                    </div>
                </div>

                <div css={s.buttonContainer}>
                    <button type="submit" css={s.updateConfirm} onClick={handlePutUser}>저장하기</button>
                    <button css={s.updateConfirm} onClick={() => { navigate(-1); }}>
                        취소하기

                    </button>
                </div>
            </div>
        </div>
    );
}