/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react';
import * as css from "./Styles";
import {useSearchParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {MAIN_PATH} from "../../../constants";

const ChangePassword = () => {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const queryToken = searchParams.get("token");
        if (queryToken) {
            setToken(queryToken);
        }
    }, [searchParams]);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "newPassword") {
            setNewPassword(value);
        }
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }
    const handlePasswordChange = async () => {

        try {
            const response = await axios.post('http://localhost:4041/api/v1/password/change', {
                token,
                newPassword,
                confirmPassword,
            });
            if (response.data.result) {
                navigate(MAIN_PATH);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div css={css.changePasswordContainer}>
            <h1 css={css.changePasswordTitle}>비밀번호 변경</h1>
            <div css={css.newPasswordContainer}>
                <input
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={inputHandler}
                    placeholder="새 비밀번호를 입력해주세요"
                />
            </div>
            <div css={css.confirmPasswordContainer}>
                <input
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={inputHandler}
                    placeholder="비밀번호를 다시 입력해 주세요"
                />
            </div>
            <div>
                <button css={css.changePasswordButton} onClick={handlePasswordChange}>변경하기</button>

            </div>
        </div>
    );
};

export default ChangePassword;
