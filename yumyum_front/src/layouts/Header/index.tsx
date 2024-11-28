/** @jsxImportSource @emotion/react */
import * as React from "react";
import {Link} from "react-router-dom";
import * as css from "./Style";
import {MAIN_PATH} from "../../constants";

export default function Header() {
    return (
        <>
            <header css={css.headerContainer}>
                <div css={css.headerFlexContainer}>
                    <h1 css={css.headerLeftContainer}>
                        <Link to={`${MAIN_PATH}`}>
                            <img css={css.headerLogoImg} src={require("../../img/yumyumLogo.png")} alt="logo img"/>
                        </Link>
                    </h1>
                    <div css={css.headerMiddleContainer}>
                        <span>header</span>
                    </div>
                    <div css={css.headerRightContainer}>
                        토글 버튼 자리
                    </div>
                </div>
            </header>
        </>
    );
}