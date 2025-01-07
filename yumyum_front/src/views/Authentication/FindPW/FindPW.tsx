/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import * as css from "./Style";
import axios from "axios";

const FindPW = () => {

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        if ( name === "userName" ) setUserName(value);
        if (name === "userId") setUserId(value);
        if ( name === "userEmail" ) setUserEmail(value);
    }

    const findFetchPW = async () => {
        try {
            const response = await axios.post("http://localhost:4041/api/v1/mail/send", {userId, userName, userEmail});
            console.log(response);

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
                <input
                    name="userId"
                    css={css.inputUserIdContainer}
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    value={userId}
                    onChange={inputHandler}
                />
                <input
                    name="userEmail"
                    css={css.inputUserEmailContainer}
                    type="email"
                    placeholder="인증받을 이메일을 입력해 주세요"
                    value={userEmail}
                    onChange={inputHandler}
                />
            </div>
            <button onClick={findFetchPW} css={css.findPWButton}>인증 요청</button>
        </div>
    );
};

export default FindPW;