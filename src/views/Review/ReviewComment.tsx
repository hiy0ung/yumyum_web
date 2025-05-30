/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import * as css from './Style';
import {useCookies} from 'react-cookie';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import defaultImg from "../../images/default_Profile_Img.webp"
import defaultImg3 from "../../images/ex1.webp";
import ReviewNotice from "./ReviewNotice";
import useScrollTop from "../../hooks/scroll/useScrollToTop";
import { REVIEW_API } from "../../apis";

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
  menuCounts?: { [key: string]: number };
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
  const scrollToTop = useScrollTop();

  useEffect(() => {
    scrollToTop();
  }, []);


  useEffect(() => {
    fetchReviews();
  }, [])


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
  const handleTabChange = (tab: string) => {
    setTabMenu(tab);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(REVIEW_API.GET_REVIEWS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data) {
        const sortedData = response.data.data.sort((a: ReviewsList, b: ReviewsList) => {
          return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
        });

        const processedData = sortedData.map((review: ReviewsList) => {
          const menuCounts = review.menuNames.reduce((acc: { [key: string]: number }, menu: string) => {
            acc[menu] = (acc[menu] || 0) + 1;
            return acc;
          }, {});
          return {
            ...review,
            menuCounts,
          };
        });
        setData(processedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (reviewId: any) => {
    const commentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    try {
      const response = await axios.post(
        REVIEW_API.ADD_COMMENT(reviewId),
        {
          commentText: commentText[reviewId],
          commentDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

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

  const deleteComment = async (reviewId: any) => {
    try {
      const response = await axios.delete(
        REVIEW_API.DELETE_COMMENT(reviewId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const noAnswerReviews = useMemo(() => {
    return data.filter(review => review.reviewComment === null);
  }, [data]);

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
                                    onClick={(e) => openModal(e.currentTarget.src)}
                                />
                            ))}
                          </div>
                      )
                  }

                  {
                    item.menuCounts && Object.entries(item.menuCounts).length > 0 ? (
                        <ul css={css.menuNamesContainer}>
                          {Object.entries(item.menuCounts).map(([menu, count], index) => (
                              <li css={css.menuNames} key={index}>
                                {menu} {count > 1 ? `X ${count}` : ''}
                              </li>
                          ))}
                        </ul>
                    ) : (
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
                                <button style={{backgroundColor:"#FB8494"}} onClick={(e) => {
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
              <img src={modalImage} alt="확대 이미지" css={css.modalImage}/>
              <button css={css.closeButton} onClick={closeModal}>닫기</button>
            </div>
          </div>
      )}

      <div css={tabMenu === 'noAnswer' ? css.reviewTabMenuNoAnswerContext : css.displayNone}>
        {noAnswerReviews.length > 0 ? (
            <ul>
              {noAnswerReviews.map((item) => (
                  <li css={css.totalReviewContainer} key={item.id} data-id={item.id}>
                    <div css={css.totalReviewInContainer}>
                      <div css={css.reviewDate}>{moment(item.reviewDate).format("YYYY-MM-DD")}</div>
                      <div css={css.reviewTopContainer}>
                        {
                          item.profileImage ? (
                              <img css={css.reviewProfileImg}
                                  // src={item.profileImage}
                                   src={defaultImg}
                                   alt="프로필 이미지"/>
                          ) : (
                              <img css={css.reviewProfileImg} src={defaultImg} alt="기본 프로필 이미지"/>
                          )
                        }
                        <div css={css.guestInfoContainer}>
                          <div css={css.guestNickname}>{item.guestNickname}</div>
                          {Array.from({length: item.rating}, (_, idx) => (
                              <span css={css.filledStar} key={`filled-${idx}`}>★</span>
                          ))}
                          {Array.from({length: 5 - item.rating}, (_, idx) => (
                              <span css={css.emptyStar} key={`empty-${idx}`}>☆</span>
                          ))}
                        </div>
                      </div>
                      <div css={css.reviewText}>{item.reviewText}</div>
                      {
                          item.reviewPhotos.length > 0 && (
                              <div css={css.reviewPhotosContainer}>
                                {item.reviewPhotos.map((photo, index) => (
                                    <img
                                        key={index}
                                        css={css.reviewPhoto}
                                        src={defaultImg3}
                                        alt="리뷰 사진"
                                        onClick={(e) => openModal(e.currentTarget.src)}
                                    />
                                ))}
                              </div>
                          )
                      }

                      {
                        item.menuCounts && Object.entries(item.menuCounts).length > 0 ? (
                            <ul css={css.menuNamesContainer}>
                              {Object.entries(item.menuCounts).map(([menu, count], index) => (
                                  <li css={css.menuNames} key={index}>
                                    {menu} {count > 1 ? `X ${count}` : ''}
                                  </li>
                              ))}
                            </ul>
                        ) : (
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
                                <button onClick={() => addComment(item.id)}>저장</button>
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
                                                                <textarea
                                                                    css={css.commentInValidTextArea}
                                                                    readOnly
                                                                    value={item.reviewComment}
                                                                />
                                      <div css={css.commentInValidTextAreaTail}>
                                        <div css={css.commentInValidTextAreaTailUpper}></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div css={css.reviewAddCommentButtonContainer}>
                                    <button onClick={() => deleteComment(item.id)}>삭제</button>
                                  </div>
                                </div>
                            )
                        )
                      }
                    </div>
                  </li>))
              }
            </ul>
        ) : (
            <div css={css.noReviewsMessage}>답변되지 않은 리뷰가 없습니다.</div>
        )}
      </div>

      <div css={tabMenu === 'event' ? css.reviewTabMenuEventContext : css.displayNone}>
        <ReviewNotice/>
      </div>
    </div>
  </>);
}

export default ReviewComment;
