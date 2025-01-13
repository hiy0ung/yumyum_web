/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as css from "./Style";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FindId = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errors, setErrors] = useState({
        userName: "",
        userEmail: "",
    });

    const navigate = useNavigate();

    const emailInputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if ( name === "userName" ) setUserName(value);
        if ( name === "userEmail" ) setUserEmail(value);

        validateField(name, value);
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
        const isUserEmailValid = validateField("userEmail", userEmail);

        return isUserNameValid && isUserEmailValid;
    };


    const findFetchId = async () => {
        if (!validateAllFields()) {
            alert("입력값을 확인해주세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:4041/api/v1/mail/send/id", {
                userName,
                userEmail
            });
            if (response.data.data) {
                console.log(response)
                alert("이메일을 전송했습니다. 요청하신 이메일로 인증처리를 완료해주세요");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버 요청 중 에러가 발생했습니다.");
        }
    };

    return (
        <div css={css.findIdContainer}>
            <div css={css.findIdTitle}>아이디 찾기</div>
            <div css={css.inputContainer}>
                <input
                    name="userName"
                    css={css.inputUsernameContainer}
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={userName}
                    onChange={emailInputHandler}
                />
                {errors.userName && <div css={css.errorText}>{errors.userName}</div>}
                <input
                    name="userEmail"
                    css={css.inputEmailContainer}
                    type="email"
                    placeholder="가입시 사용한 이메일을 입력해 주세요"
                    value={userEmail}
                    onChange={emailInputHandler}
                />
                {errors.userEmail && <div css={css.errorText}>{errors.userEmail}</div>}
                <button onClick={findFetchId} css={css.findIdButton}>인증 요청</button>
                <button onClick={() => navigate(-1)} css={css.backButton}>뒤로가기</button>
            </div>

        </div>
    );
};

export default FindId;
