/** @jsxImportSource @emotion/react */
import React from 'react'
import * as css from "./Style";
import {Link} from "react-router-dom";
import {CONTACT_PATH} from "../../constants";


export default function Footer() {
    return (
        <footer css={css.footerContainer}>
            <div css={css.footerLeftContainer}>
                <Link to={CONTACT_PATH}>문의하기</Link>
                <button>로그아웃</button>
            </div>
            <div css={css.footerRightContainer}>
                <div>
                    사업자(법인)명 : ㈜ 얌얌트랙 | 부산광역시 부산진구 중앙대로 668, 에이원프라자 4층 | 전화문의 : 051-914-5890
                    <br/>
                    copyright ⓒ 2015 KOREA INFORMATION TECHNOLOGY ACADEMY. ALL RIGHTS RESERVED
                </div>
            </div>
        </footer>
    );
}
