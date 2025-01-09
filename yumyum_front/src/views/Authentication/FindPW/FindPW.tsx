/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as css from "./Style";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindPW = () => {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errors, setErrors] = useState({
        userName: "",
        userId: "",
        userEmail: "",
    });

    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "userName") setUserName(value);
        if (name === "userId") setUserId(value);
        if (name === "userEmail") setUserEmail(value);

        validateField(name, value); // 입력값 개별 검증
    };

    const validateField = (name: string, value: string) => {
        let error = "";
        let valid = false;

        if (name === "userName") {
            if (value === "") {
                error = "";
            } else {
                const nameRegex = /^[가-힣]+$/;
                if (!nameRegex.test(value)) {
                    error = "이름은 한글로 입력해주세요.";
                } else {
                    valid = true;
                    error = "";
                }
            }
        }
        if (name === "userId") {
            if (value === "") {
                error = "";
            } else {
                const idRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
                if (!idRegex.test(value)) {
                    error = "아이디는 영문 소문자와 숫자를 조합하여 4~20자로 입력해주세요.";
                } else {
                    valid = true;
                    error = "";
                }
            }
        }
        if (name === "userEmail") {
            if (value === "") {
                error = "";
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = "유효한 이메일 주소를 입력해주세요.";
                } else {
                    valid = true;
                    error = "";
                }
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));

        return valid;
    };

    const validateAllFields = () => {
        const isUserNameValid = validateField("userName", userName);
        const isUserIdValid = validateField("userId", userId);
        const isUserEmailValid = validateField("userEmail", userEmail);

        return isUserNameValid && isUserIdValid && isUserEmailValid;
    };

    const findFetchPW = async () => {
        if (!validateAllFields()) {
            alert("입력값을 확인해주세요.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4041/api/v1/mail/send/password", {
                userId,
                userName,
                userEmail,
            });
            if (response.data.data) {
                console.log(response)
                alert("인증 요청에 성공하셨습니다. 요청하신 메일로 가서 인증을 완료해주세요");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버 요청 중 에러가 발생했습니다.");
        }
    };

    return (
        <div css={css.findPWContainer}>
            <div css={css.findPWTitle}>비밀번호 찾기</div>
            <div css={css.inputContainer}>
                <input
                    name="userName"
                    css={css.inputUserNameContainer}
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={userName}
                    onChange={inputHandler}
                />
                {errors.userName && <div css={css.errorText}>{errors.userName}</div>}

                <input
                    name="userId"
                    css={css.inputUserIdContainer}
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    value={userId}
                    onChange={inputHandler}
                />
                {errors.userId && <div css={css.errorText}>{errors.userId}</div>}

                <input
                    name="userEmail"
                    css={css.inputUserEmailContainer}
                    type="email"
                    placeholder="인증받을 이메일을 입력해 주세요"
                    value={userEmail}
                    onChange={inputHandler}
                />
                {errors.userEmail && <div css={css.errorText}>{errors.userEmail}</div>}

                <button onClick={findFetchPW} css={css.findPWButton}>인증 요청</button>
                <button onClick={() => navigate(-1)} css={css.backButton}>뒤로가기</button>
            </div>
        </div>
    );
};

export default FindPW;
