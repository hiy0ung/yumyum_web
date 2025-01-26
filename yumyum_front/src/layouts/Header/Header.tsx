/** @jsxImportSource @emotion/react */
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import * as css from "./Style";
import {useCookies} from "react-cookie";
import axios from "axios";
import {TimeInfo} from "../../types/Store";
import useStoreImage from "../../stores/storeImg.store";

export default function Header() {
    const [status, setStatus] = useState<"OPEN" | "BREAK" | "CLOSE">("OPEN");
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [storeTimes, setStoreTimes] = useState<TimeInfo>({
        openingTime: "",
        closingTime: "",
        breakStartTime: "",
        breakEndTime: "",
    });
    const {setStoreImg} = useStoreImage();

    const fetchStore = async () => {
        try {
            const response = await axios.get("http://localhost:4041/api/v1/stores/", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.data) {
                const data = response.data.data;
                setStoreTimes({
                    openingTime: data.openingTime || "",
                    closingTime: data.closingTime || "",
                    breakStartTime: data.breakStartTime || "",
                    breakEndTime: data.breakEndTime || "",
                });

                const base64Image = data.logoUrl;
                if(base64Image.startsWith('data:image/png;base64,') || base64Image.startsWith('data:image/jpg;base64') || base64Image.startsWith('data:image/jpeg;base64')) {
                    setStoreImg(base64Image);
                } else {
                    console.error("지원되지 않는 이미지 형식입니다.");
                }
            }
        } catch (e) {
            console.error("Error fetching stores data:", e);
        }
    };
    

    const parseTime = (timeString: string) => {
        if(!timeString) {
            return null;
        }
        const now = new Date();
        const [ hours, minutes, seconds = 0 ] = timeString.split(":").map(Number);
        if(isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            console.error("Invalid time format: ", timeString);
            return null;
        }
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds)
    }

    const updateStatus = useCallback(() => {
        const currentTime = new Date();
        const opening = parseTime(storeTimes.openingTime);
        const breakStart = storeTimes.breakStartTime ? parseTime(storeTimes.breakStartTime) : null;
        const breakEnd = storeTimes.breakEndTime ? parseTime(storeTimes.breakEndTime) : null;
        const closing = parseTime(storeTimes.closingTime);

        if(!opening || !closing) {
            setStatus("CLOSE");
            return
        }
        if(currentTime >= opening && currentTime < closing) {
            if(breakStart && currentTime >= breakStart && breakEnd && currentTime < breakEnd ) {
                setStatus("BREAK");
            } else {
                setStatus("OPEN");
            } 
        } else {
            setStatus("CLOSE");
        }
    },[storeTimes]) 
    
    useEffect(() => {
        const fetchAndUpdate = async () => {
            await fetchStore();
            updateStatus();
        };
        fetchAndUpdate();
    },[token]);

    useEffect(() => {
        const intervalId = setInterval(updateStatus, 1000);
        return () => clearInterval(intervalId);
    }, [storeTimes]);

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