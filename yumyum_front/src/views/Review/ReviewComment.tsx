/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import {reviewTabMenuTotal} from "./Style";

interface ReviewsPhotoArray {
    photo_url: string[];
}

interface ReviewsList {
    id: number;
    profile_image: string;
    nickname: string;
    rating: number;
    review_date: number;
    review_content: string;
    is_reported: boolean;
    photo_url: ReviewsPhotoArray
    comments: string;
    comment_date: Date;
}

function ReviewComment() {

    const [tabMenu, setTabMenu] = useState<string>("total");

    const handleTabChange = (tab: string) => {
        setTabMenu(tab)
    }

    return (
        <>
            <div css={css.reviewTabMenu}>
                <div onClick={() => handleTabChange("total")}
                     css={tabMenu === "total" && css.reviewTabMenuTotal}
                >
                    전체
                </div>
                <div onClick={() => handleTabChange("noAnswer")}
                     css={tabMenu === "noAnswer" && css.reviewTabMenuNoAnswer}
                >
                    미답변
                </div>
                <div onClick={() => handleTabChange("event")}
                     css={tabMenu === "event" && css.reviewTabMenuEvent}
                >
                    이벤트
                </div>
            </div>
        </>
    )
}

export default ReviewComment