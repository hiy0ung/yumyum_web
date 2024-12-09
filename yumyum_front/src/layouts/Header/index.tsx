/** @jsxImportSource @emotion/react */
import * as React from "react";
import * as css from "./Style";
import YumYumLogoImg from "../../img/yumyumLogo.png"
import {useState} from "react";

export default function Header() {

    interface Status {
        status: "OPEN" | "BREAK" | "CLOSE";
    }

    const [status, setStatus] = useState<Status>({status: "OPEN"});
    const statusHandler = (value: Status["status"]) => {
        setStatus({status: value});
    }

    return (
        <header css={css.headerContainer}>
            <div css={css.headerFlexContainer}>
                <h1 css={css.headerLeftContainer}>
                    <img css={css.headerLogoImg} src={YumYumLogoImg} alt="로고 사진"/>
                </h1>
                <div css={css.headerMiddleContainer}>
                </div>

                <div css={css.headerRightContainer}>

                    <div css={css.statusToggleButtonGroup}>
                            <button
                                css={[css.statusToggleButtonStyles, css.openStyle, status.status === "OPEN" ? css.activeStyle : css.passive]}
                                onClick={() => {
                                    statusHandler("OPEN")
                                }}
                            >
                                오픈
                            </button>
                            <button
                                css={[css.statusToggleButtonStyles, css.breakStyle, status.status === "BREAK" ? css.activeStyle : css.passive]}
                                onClick={() => {
                                    statusHandler("BREAK")
                                }}
                            >
                                휴식
                            </button>
                            <button
                                css={[css.statusToggleButtonStyles, css.closeStyle, status.status === "CLOSE" ? css.activeStyle : css.passive]}
                                onClick={() => {
                                    statusHandler("CLOSE")
                                }}
                            >
                                마감
                            </button>
                    </div>
                </div>
            </div>
        </header>
    );
}