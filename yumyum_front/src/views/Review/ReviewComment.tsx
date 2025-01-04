/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {quill} from "./Style";
import { useCookies } from 'react-cookie';

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
photo_url: ReviewsPhotoArray;
comments: string;
comment_date: Date;
}

function ReviewComment() {
const [tabMenu, setTabMenu] = useState<string>("total");
const [value, setValue] = useState("");
const [cookies] = useCookies(["token"]);
const token = cookies.token;

const handleTabChange = (tab: string) => {
setTabMenu(tab);
};

// const quillRef = useRef(null);

// const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//         if(input.files && input.files.length > 0) {
//             const file = input.files[0];
//             const formData = new FormData();
//             formData.append('noticePhotoUrl', file);
//             formData.append('noticeText', value);
//             formData.append('noticeDate', new Date().toISOString());

//             try {
//                 const response = await axios.post("http://localhost:4041/api/v1/reviews/notice/create", formData, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 console.log(response.data.data);
//             }catch(e) {
//                 console.error(e);
//             }
//         }
//     }
// }

// const modules = useMemo(() => ({
//     toolbar: {
//         container: [
//             [{header: 1}, {header: 2}],
//             [{size: []}],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{list: 'ordered'}, {list: 'bullet'}, {align: []}],
//             ['link', 'image'],
//         ],
//         handlers: {image: imageHandler},
//     },
//     Clipboard: {
//         matchVisual: false,
//     },
// }),[]);
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
                <div css={tabMenu === "total" ? css.reviewTabMenuTotalContext : css.displayNone}>
                    <ul>
                        <li css={css.totalReviewContainer}>1</li>
                        <li css={css.totalReviewContainer}>2</li>
                        <li css={css.totalReviewContainer}>3</li>
                        <li css={css.totalReviewContainer}>4</li>
                    </ul>
                </div>
                <div
                    css={tabMenu === "noAnswer" ? css.reviewTabMenuNoAnswerContext : css.displayNone}
                >
                    미답뷰 리뷰 내용
                </div>
                <div
                    css={tabMenu === "event" ? css.reviewTabMenuEventContext : css.displayNone}
                >
                    <div css={css.quillContainer}>
                        <ReactQuill css={css.quill} theme="snow" value={value} onChange={setValue} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewComment;
