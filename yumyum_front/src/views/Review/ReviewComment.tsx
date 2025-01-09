/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import {useCookies} from 'react-cookie';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import defaultImg from "../../img/default_Profile_Img.webp"
import defaultImg2 from "../../img/default_Profile_Img2.webp"
import defaultImg3 from "../../img/ex1.webp";
import ReviewNotice from "./ReviewNotice";

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
    const [commentTab, setCommentTab] = useState<{ [key: number]: boolean }>({});
    const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string>('');


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


    const toggleCommentTab = (id: number) => {
        setCommentTab((prev) => ({
            ...prev, [id]: !prev[id],
        }));
    };

    const handleCommentChange = (id: number, text: string) => {
        setCommentText((prev) => ({
            ...prev, [id]: text,
        }))
    };
    const addComment = async (reviewId: any) => {
        const commentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
        console.log(reviewId);
        try {
            const response = await axios.post(`http://localhost:4041/api/v1/reviews/comment/create/${reviewId}`, {
                commentText: commentText[reviewId],
                commentDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            console.log('댓글 추가 성공:', response.data);
            alert('댓글이 추가되었습니다.');
            setCommentTab((prev) => ({...prev, [reviewId]: false}));
            setCommentText((prev) => ({...prev, [reviewId]: ''}));
            fetchReviews();
        } catch (error) {
            console.error('댓글 추가 실패:', error);
            alert('댓글 추가에 실패했습니다.');
        }

    };

    const deleteComment = async (reviewId : any) => {
        try {
            const response = await axios.delete(`http://localhost:4041/api/v1/reviews/comment/delete/${reviewId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('댓글 삭제 성공:', response.data);
            alert('댓글이 삭제 되었습니다.');
            setCommentTab((prev) => ({...prev, [reviewId]: false}));
            setCommentText((prev) => ({...prev, [reviewId]: ''}));
            fetchReviews();
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            alert('댓글 삭제에 실패했습니다.');
        }
    }

    const openModal = (image: string) => {
        setModalImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (<>
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
                        <li css={css.totalReviewContainer} key={item.id} data-id={item.id}>
                            <div css={css.totalReviewInContainer}>
                                <div css={css.reviewDate}>{moment(item.reviewDate).format("YYYY-MM-DD")}</div>
                                <div css={css.reviewTopContainer}>
                                    {
                                        item.profileImage && (
                                            <img css={css.reviewProfileImg} src={defaultImg} alt="프로필 이미지"/>)
                                    }
                                    <div css={css.guestInfoContainer}>
                                        <div css={css.guestNickname}>{item.guestNickname}</div>
                                        {Array.from({length: item.rating}, () => (
                                            <span css={css.filledStar}>★</span>))}
                                        {Array.from({length: 5 - item.rating}, () => (
                                            <span css={css.emptyStar}>☆</span>))}
                                    </div>
                                </div>
                                <div css={css.reviewText}>{item.reviewText}</div>
                                {
                                    item.reviewPhotos && (
                                        <div css={css.reviewPhotosContainer}>
                                            {item.reviewPhotos.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    css={css.reviewPhoto}
                                                    src={defaultImg3}
                                                    alt="리뷰 사진"
                                                    onClick={() => openModal(photo)}
                                                />
                                            ))}
                                        </div>
                                    )
                                }

                                {
                                    item.menuNames.length > 0 ? (
                                            <ul css={css.menuNamesContainer}>
                                                {
                                                    item.menuNames.map((menu, index) => (
                                                        <li css={css.menuNames} key={index}>{menu}</li>))
                                                }
                                            </ul>)
                                        : (
                                            <div>메뉴 정보 없음</div>
                                        )
                                }
                                {
                                    commentTab[item.id] ? (
                                        <div css={css.reviewAddCommentContainer}>
                                            <div css={css.reviewAddCommentInfoContainer}>
                                                <div css={css.reviewProfileImg2}></div>
                                                <textarea
                                                    css={css.textArea}
                                                    value={commentText[item.id] || ''}
                                                    onChange={(e) =>
                                                        handleCommentChange(item.id, e.target.value)}
                                                />
                                                <div css={css.textAreaTail}>
                                                    <div css={css.textAreaTailUpper}></div>
                                                </div>
                                            </div>
                                            <div css={css.reviewAddCommentButtonContainer}>
                                                <button onClick={(e) => {
                                                    const parent = e.currentTarget.closest('li');
                                                    const id = parent?.dataset.id;
                                                    return addComment(id);
                                                }}>저장
                                                </button>
                                                <button onClick={() => toggleCommentTab(item.id)}>취소</button>
                                            </div>
                                        </div>
                                    ) : (
                                        !item.reviewComment ? (
                                            <div css={css.reviewCommentContainer}
                                                 onClick={() => toggleCommentTab(item.id)}>
                                                댓글 추가
                                            </div>
                                        ) : (
                                            <div css={css.reviewAddCommentInValidContainer}>
                                                <div css={css.reviewAddCommentTopContainer}>
                                                    <div css={css.reviewProfileImg2}></div>
                                                    <div css={css.reviewAddCommentInValidRight}>
                                                        <textarea css={css.commentInValidTextArea}>
                                                            {item.reviewComment}
                                                        </textarea>
                                                        <div css={css.commentInValidTextAreaTail}>
                                                            <div css={css.commentInValidTextAreaTailUpper}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div css={css.reviewAddCommentButtonContainer}>
                                                    <button onClick={(e) => {
                                                        const parent = e.currentTarget.closest('li');
                                                        const id = parent?.dataset.id;
                                                        return deleteComment(id);
                                                    }}>삭제
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </li>))
                    }
                </ul>
            </div>
            {modalOpen && (
                <div css={css.modalOverlay} onClick={closeModal}>
                    <div css={css.modalContent}>
                        <img src={modalImage} alt="확대 이미지" css={css.modalImage} />
                        <button css={css.closeButton} onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
            <div css={tabMenu === 'noAnswer' ? css.reviewTabMenuNoAnswerContext : css.displayNone}>
                미답변 리뷰 내용
            </div>

            <div css={tabMenu === 'event' ? css.reviewTabMenuEventContext : css.displayNone}>
                <ReviewNotice/>
            </div>
        </div>
    </>);
}

export default ReviewComment;
