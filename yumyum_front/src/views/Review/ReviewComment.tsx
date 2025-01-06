/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import {useCookies} from 'react-cookie';
import ReactQuill, {Quill} from 'react-quill-new';
import 'quill/dist/quill.snow.css';
import QuillResizeImage from 'quill-resize-image';
import moment from 'moment';
Quill.register('modules/resize', QuillResizeImage);

interface ReviewsList {
    comment_date: string | null;
    guestNickname: string;
    id: number;
    is_reported: boolean;
    menuNames: string[];
    orderDate: string;
    profileImage: string | null;
    rating: number;
    reviewComment: string | null;
    reviewDate: string;
    reviewPhotos: string[];
    reviewText: string;
}

function ReviewComment() {
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const [tabMenu, setTabMenu] = useState<string>('total');
    const [data, setData] = useState<ReviewsList[]>([]);

    const quillRef = useRef<ReactQuill | null>(null);

    const handleTabChange = (tab: string) => {
        setTabMenu(tab);
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:4041/api/v1/reviews/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.data) {
                setData(response.data.data);
            }
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Quill toolbar 설정
    const toolbarOptions = [
        ['image', 'link'],
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }, { color: [] }, { background: [] }],
        ['clean'],
    ];
    const modules = {
        toolbar: toolbarOptions,
        resize: {},
    };

    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleSubmit = async () => {
        if (!quillRef.current) return;
        const editor = quillRef.current.getEditor();
        const editorContentHTML = editor.root.innerHTML;
        const base64ImageRegex = /<img[^>]+src="data:image\/[^">]+"[^>]*>/g;
        const srcExtractRegex = /src="([^"]+)"/;

        let newHTML = editorContentHTML;

        const formData = new FormData();
        const matches = editorContentHTML.match(base64ImageRegex) || [];
        matches.forEach((imgTag, index) => {
            const srcMatch = imgTag.match(srcExtractRegex);
            if (!srcMatch) return;
            const base64URL = srcMatch[1];
            const file = dataURLtoFile(base64URL, `image_${index}.png`);

            const newImgTag = imgTag.replace(base64URL, `image_${index}.png`);
            newHTML = newHTML.replace(imgTag, newImgTag);
            formData.append('noticePhotoUrl', file);
        });

        const noticeDate = moment().format('YYYY-MM-DDTHH:mm:ss');
        formData.append('noticeDate', noticeDate);
        formData.append('noticeText', newHTML);

        try {
            console.log('업로드할 FormData:', formData);

            const response = await axios.post(
                'http://localhost:4041/api/v1/reviews/notice/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('서버 응답:', response.data);

            alert('공지사항 등록 완료');
        } catch (error) {
            console.error(error);
            alert('업로드 중 문제가 발생했습니다.');
        }
    };

    return (
        <>
            <div css={css.reviewTabMenuContainer}>
                <div
                    onClick={() => handleTabChange('total')}
                    css={tabMenu === 'total' ? css.reviewTabMenuTotalFocus : css.reviewTabMenuTotal}
                >
                    전체
                </div>
                <div
                    onClick={() => handleTabChange('noAnswer')}
                    css={tabMenu === 'noAnswer' ? css.reviewTabMenuNoAnswerFocus : css.reviewTabMenuNoAnswer}
                >
                    미답변
                </div>
                <div
                    onClick={() => handleTabChange('event')}
                    css={tabMenu === 'event' ? css.reviewTabMenuEventFocus : css.reviewTabMenuEvent}
                >
                    이벤트
                </div>
            </div>

            <div css={css.reviewTabMenuContext}>
                <div css={tabMenu === 'total' ? css.reviewTabMenuTotalContext : css.displayNone}>
                    <ul>
                        {data.map((item) => (
                            <li css={css.totalReviewContainer} key={item.id}>
                                <div>
                                    {item.profileImage && (
                                        <img src={item.profileImage} alt="프로필 이미지" />
                                    )}
                                    <div>
                                        <div>{item.guestNickname}</div>
                                        <div>{item.rating}</div>
                                    </div>
                                    <div>{item.reviewDate}</div>
                                    <div>{item.reviewText}</div>
                                    {item.reviewPhotos &&
                                        item.reviewPhotos.map((photo, index) => (
                                            <div key={index}>
                                                <img src={photo} alt={`리뷰 사진 ${index}`} />
                                            </div>
                                        ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div css={tabMenu === 'noAnswer' ? css.reviewTabMenuNoAnswerContext : css.displayNone}>
                    미답변 리뷰 내용
                </div>

                <div css={tabMenu === 'event' ? css.reviewTabMenuEventContext : css.displayNone}>
                    <div css={css.quillContainer}>
                        <ReactQuill
                            ref={quillRef}
                            css={css.quill}
                            modules={modules}
                            theme="snow"
                            placeholder="리뷰 공지사항을 작성해주세요"
                        />
                    </div>
                    <div css={css.reviewNoticeUploadButtonContainer}>
                        <button css={css.reviewNoticeUploadButton} onClick={handleSubmit}>저장</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReviewComment;
