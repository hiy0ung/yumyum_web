/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const [value, setValue] = useState('');


    const handleTabChange = (tab: string) => {
        setTabMenu(tab)
    }

    return (
        <>
            <div css={css.reviewTabMenuContainer}>
                <div onClick={() => handleTabChange("total")}
                     css={tabMenu === "total" ? css.reviewTabMenuTotalFocus : css.reviewTabMenuTotal}
                >
                    전체
                </div>
                <div onClick={() => handleTabChange("noAnswer")}
                     css={tabMenu === "noAnswer" ? css.reviewTabMenuNoAnswerFocus : css.reviewTabMenuNoAnswer}
                >
                    미답변
                </div>
                <div onClick={() => handleTabChange("event")}
                     css={tabMenu === "event" ? css.reviewTabMenuEventFocus : css.reviewTabMenuEvent}
                >
                    이벤트
                </div>
            </div>
            <div css={css.reviewTabMenuContext}>
                <div
                    css={tabMenu === "total" ? css.reviewTabMenuTotalContext : css.displayNone}
                >
                    전체 리뷰 내용
                </div>
                <div
                    css={tabMenu === "noAnswer" ? css.reviewTabMenuNoAnswerContext : css.displayNone}
                >
                    미답뷰 리뷰 내용
                </div>
                <div
                    css={tabMenu === "event" ? css.reviewTabMenuEventContext : css.displayNone}
                >
                    <div >
                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewComment