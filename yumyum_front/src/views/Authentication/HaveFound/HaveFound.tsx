/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import * as css from "./Style";


const HaveFound = () => {

    const [userId, setUserId] = useState("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const userId = searchParams.get("userId");
        if (userId) {
            setUserId(userId);
        }
    }, []);
    return (
        <>
            <div css={css.found}>당신의 아이디는 {userId} 입니다.</div>
        </>
    );
};

export default HaveFound;