/** @jsxImportSource @emotion/react */
import * as React from "react";
import * as css from "./Style";
import useStoreTimes from "../../Stroes/store.store";
import {useState, useEffect} from "react";

export default function Header() {
    const {openingTime, closingTime, breakStartTime, breakEndTime} = useStoreTimes();
    const [status, setStatus] = useState<"OPEN" | "BREAK" | "CLOSE">("OPEN");

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(" ")[0];
    }

    const parseTime = (timeString: string) => {
        const now = new Date();
        const [ hours, minutes, seconds ] = timeString.split(":").map(Number);
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds || 0);
    }

    const updateStatus = () => {
        const currentTime = new Date();
        const opening = parseTime(openingTime);
        const breakStart = parseTime(breakStartTime);
        const breakEnd = parseTime(breakEndTime);
        const closing = parseTime(closingTime);
        if(currentTime >= opening && currentTime < breakStart) {
            setStatus("OPEN");
        } else if(currentTime >= breakStart && currentTime < breakEnd) {
            setStatus("BREAK");
        } else if(currentTime >= breakEnd && currentTime < closing) {
            setStatus("OPEN");
        } else {
            setStatus("CLOSE");
        }
    }

    useEffect(() => {
        const intervalId = setInterval(updateStatus, 1000);
        return () => clearInterval(intervalId);
    }, [openingTime, closingTime, breakStartTime, breakEndTime]);

    return (
        <header css={css.headerContainer}>
            <div css={css.headerFlexContainer}>
                <div css={css.headerLeftContainer}>
                </div>
                <div css={css.headerRightContainer}>
                    <div css={css.statusToggleButtonGroup}>
                        <button css={[css.statusToggleButtonStyles, css.openStyle, status === "OPEN" ? css.activeStyle : css.passive]}>
                            오픈
                        </button>
                        <button css={[css.statusToggleButtonStyles, css.breakStyle, status === "BREAK" ? css.activeStyle : css.passive]}>
                            휴식
                        </button>
                        <button css={[css.statusToggleButtonStyles, css.closeStyle, status === "CLOSE" ? css.activeStyle : css.passive]}>
                            마감
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}