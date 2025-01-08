/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as css from "./Style";
import axios from "axios";
import {inputUsernameContainer} from "./Style";

const FindId = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const findFetchId = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4041/api/v1/find/userEmail?userEmail=" + userEmail);
            alert(`아이디 찾기 성공: ${response.data.data}`);
            if (response.data.data === true) {
                const response = await axios.post(`http://localhost:4041/api/v1/find/mail/send`, {userName, userEmail});
                console.log(response)
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버 요청 중 에러가 발생했습니다.");
        }
    };

    const emailInputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        if ( name === "userName" ) setUserName(value);
        if ( name === "userEmail" ) setUserEmail(value);
    }
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
                <input
                    name="userEmail"
                    css={css.inputEmailContainer}
                    type="email"
                    placeholder="인증받을 이메일을 입력해 주세요"
                    value={userEmail}
                    onChange={emailInputHandler}
                />
            </div>
            <button onClick={findFetchId} css={css.findIdButton}>인증 요청</button>
        </div>
    );
};

export default FindId;
