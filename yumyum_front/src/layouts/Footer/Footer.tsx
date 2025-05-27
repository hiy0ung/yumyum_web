/** @jsxImportSource @emotion/react */
import React from 'react'
import * as css from "./Style";
import yumyumLogo2 from "../../images/yumyumLogo2.webp";

export default function Footer() {
    return (
        <footer css={css.footerContainer}>
            <div css={css.footerLeftContainer}>
                <div css={css.footerLeftLogo}>
                    <img src={yumyumLogo2} alt="로고 이미지"/>
                </div>
                <address css={css.LeftAddressContainer}>
                    (주)YUMYUM <span css={css.bar}></span> 대표 : 아무개 <span css={css.bar}></span> 사업자등록번호 :
                    111-22-33333
                    <br/>
                    본사 : 부산 부산진구 중앙대로 668 4층
                    <br/>
                    TEL : 1111-2222 <span css={css.bar}></span> FAX : 111-222-3333 <span
                    css={css.bar}></span> E-mail
                    : yumyumgroupmaster@gmail.com
                </address>

            </div>
            <div css={css.footerRightContainer}>
                <address css={css.rightAddressContainer}>
                    <div css={css.ownerTel}>대표전화</div>
                    <span css={css.ownerTelNumber}>1111-2222</span>
                    <br/>
                    <span css={css.businessTime}>평일 09:00~18:00 (토·일요일, 공휴일 휴무)</span>
                    <div css={css.copyright}>Copyright (C) 2024 Owellsteel Corp All Rights Reserved.</div>
                </address>
            </div>
        </footer>
    );
}
