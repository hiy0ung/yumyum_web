/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as css from "./Style";
import { Button } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";

const Contact = () => {
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    // 서버로 메일 전송 요청
    const handleSendEmail = async () => {
        // 사용자가 이메일을 입력하지 않았다면 처리
        if (!email) {
            alert("답장받을 이메일을 입력해주세요.");
            return;
        }

        try {
            // axios.post의 두 번째 인자는 전송할 데이터, 세 번째 인자는 설정(config)입니다.
            const response = await axios.post("http://localhost:4041/api/v1/contact",
                {
                    email,
                    title,
                    message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 서버 응답 형식에 맞춰 조건 처리 (예: response.data.data가 존재하면 성공)
            if (response.data.data) {
                alert("메일이 성공적으로 전송되었습니다!");
                // 폼 초기화 등 추가 작업
                setEmail("");
                setTitle("");
                setMessage("");
            } else {
                alert("메일 전송에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("서버 오류로 메일 전송에 실패했습니다.");
        }
    };

    return (
        <>
            <h2 css={css.contactTitle}>문의하기</h2>
            <div css={css.inputTotalContainer}>
                <div css={css.inputContainer}>
                    <input
                        css={css.email}
                        type="email"
                        placeholder="연락 받을 이메일을 적어주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        css={css.title}
                        type="text"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        css={css.textArea}
                        placeholder="문의 내용을 입력해주세요"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div css={css.buttonContainer}>
                        <Button variant="contained" onClick={handleSendEmail}>
                            메일 전송
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
