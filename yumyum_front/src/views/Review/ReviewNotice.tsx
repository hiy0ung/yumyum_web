/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import * as css from "./Style";
import ReactQuill from "react-quill-new";
import moment from "moment/moment";
import axios from "axios";
import {useCookies} from "react-cookie";
import QuillResizeImage from "quill-resize-image";
import Quill from "quill";

Quill.register('modules/resize', QuillResizeImage);

const ReviewNotice = () => {
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const [imgUrl, setImgUrl] = useState("");

    const quillRef = useRef<ReactQuill | null>(null);

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

            const response = await axios.post('http://localhost:4041/api/v1/reviews/notice/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data',
                },
            });

            alert('공지사항 등록 완료');
            console.log('서버 응답:', response.data);
            setImgUrl(response.data.data.noticePhotoUrl);

        } catch (error) {
            console.error(error);
            alert('업로드 중 문제가 발생했습니다.');
        }
    };


    // Quill toolbar 설정
    const toolbarOptions = [['image', 'link'], [{header: [1, 2, 3, false]}], ['bold', 'italic', 'underline', 'strike'], [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}], [{align: []}, {color: []}, {background: []}], ['clean'],];

    const modules = {
        toolbar: toolbarOptions, resize: {},
    };


    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };




    const fetchImageUrl = async () => {

        try {
            const response = await axios.get(`http://localhost:4041/api/v1/reviews/notice`,
                {
                    headers : {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.data.data) {
                setImgUrl(response.data.data.noticePhotoUrl);
            }

        } catch (error) {
            console.error("이미지 URL을 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchImageUrl();
    }, []);

    return (
        <>
            <div css={css.quillContainer}>
                <ReactQuill
                    ref={quillRef}
                    css={css.quill}
                    modules={modules}
                    theme="snow"
                    placeholder="리뷰 공지사항을 작성해주세요"
                />
            </div>
            {imgUrl && (
                <img
                    src={`http://localhost:4041/notice/upload/${imgUrl}`}
                    alt="공지 이미지"
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                />
            )}
            <div css={css.reviewNoticeUploadButtonContainer}>
                <button css={css.reviewNoticeUploadButton} onClick={handleSubmit}>저장</button>
            </div>
        </>
    );
};

export default ReviewNotice;