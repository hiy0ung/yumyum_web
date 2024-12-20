/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {REVIEWS_LIST_URL} from '../../apis';
import * as css from './Style';
import starImg from "../../img/star.png"

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

/*
  !차트 라이브러리
  :Recharts
*/
function Review() {
  const [reviewsList, setReviewList] = useState<any>({
    average: 0,
    reviews: [

    ]
  });


  const reviewsListGetApi = async () => {
    // const response = await axios.get(`${REVIEWS_LIST_URL}`);
    // setReviewList(response.data.data);
    // console.log(response.data.data);
    // 일단 하드 코딩

    const response = {
      average: 4.5,
      reviews : [
        { count: 554044444444 },
        { count: 3523 },
        { count: 1235 },
        { count: 236 },
        { count: 114 },
      ]
    }
    setReviewList(response)



  }
  useEffect(() => {
    reviewsListGetApi();
  }, [])


  return (
      <>
        <div css={css.reviewContainer}>
          <div css={css.reviewLeftContainer}>
            <h2 css={css.reviewAverageContainer}>
              <div css={css.reviewAverageTitle}>평균 별점</div>
              <div css={css.reviewAverage}>{reviewsList.average}</div>
            </h2>
            <div css={css.ratingBarContainer}>
              <div css={css.ratingBarMargin}>
                <div css={css.ratingBarSet}>
                  <div css={css.ratingBarLeftContainer}>
                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                    <div css={css.starScore}>5점</div>
                    <div css={css.ratingBar}>
                      <div></div>
                    </div>
                  </div>
                  {
                    reviewsList.reviews.length > 0
                        ? (<div css={css.reviewCount}>{reviewsList.reviews[0].count}</div>)
                        : (<div css={css.reviewCount}>{"( error )"}</div>)
                  }
                </div>
                <div css={css.ratingBarSet}>
                  <div css={css.ratingBarLeftContainer}>
                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                    <div css={css.starScore}>4점</div>
                    <div css={css.ratingBar}>
                      <div></div>
                    </div>
                  </div>
                  {
                    reviewsList.reviews.length > 0
                        ? (<div css={css.reviewCount}>{"(" + reviewsList.reviews[1].count + ")"}</div>)
                        : (<div css={css.reviewCount}>{"( error )"}</div>)
                  }
                </div>
                <div css={css.ratingBarSet}>
                  <div css={css.ratingBarLeftContainer}>
                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                    <div css={css.starScore}>3점</div>
                    <div css={css.ratingBar}>
                      <div></div>
                    </div>
                  </div>
                  {
                    reviewsList.reviews.length > 0
                        ? (<div css={css.reviewCount}>{"(" + reviewsList.reviews[2].count + ")"}</div>)
                        : (<div css={css.reviewCount}>{"( error )"}</div>)
                  }
                </div>
                <div css={css.ratingBarSet}>
                  <div css={css.ratingBarLeftContainer}>
                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                    <div css={css.starScore}>2점</div>
                    <div css={css.ratingBar}>
                      <div></div>
                    </div>
                  </div>
                  {
                    reviewsList.reviews.length > 0
                        ? (<div css={css.reviewCount}>{"(" + reviewsList.reviews[3].count + ")"}</div>)
                        : (<div css={css.reviewCount}>{"( error )"}</div>)
                  }
                </div>
                <div css={css.ratingBarSet}>
                  <div css={css.ratingBarLeftContainer}>
                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                    <div css={css.starScore}>1점</div>
                    <div css={css.ratingBar}>
                      <div></div>
                    </div>
                  </div>
                  {
                    reviewsList.reviews.length > 0
                        ? (<div css={css.reviewCount}>{reviewsList.reviews[4].count}</div>)
                        : (<div css={css.reviewCount}>{"( error )"}</div>)
                  }
                </div>
              </div>
            </div>
          </div>
          <div css={css.reviewRightContainer}>

          </div>
          {/*<div>프로필 사진 : {}</div>*/}
          {/*<div>유저 닉네임</div>*/}
          {/*<div>유저 별점</div>*/}
          {/*<div>유저 리뷰 글</div>*/}
          {/*<div>유저 사진</div>*/}
          {/*<div>리뷰 작성 시간 :</div>*/}
          {/*<div>유저 신고 상태 :</div>*/}
          {/*<div>사장님 프로필 사진</div>*/}
          {/*<div>사장님 닉네임</div>*/}
          {/*<div>사장님 댓글 내용</div>*/}
        </div>
      </>
  )
}

export default Review