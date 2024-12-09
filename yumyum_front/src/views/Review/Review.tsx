/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REVIEWS_LIST_URL } from '../../apis';

interface ReviewsPhotoArray {
  photo_url: string[];
}
interface ReviewsList{
  id: number;
  profile_image : string;
  nickname : string;
  rating : number;
  review_date : number;
  review_content : string;
  is_reported : boolean;
  photo_url : ReviewsPhotoArray
  comments : string;
  comment_date : Date;
}
/*
  !차트 라이브러리
  :Recharts
*/
function Review() {
  const [reviewsList, setReviewList] = useState<ReviewsList>();


  const reviewsListGetApi = async() => {
    const response = await axios.get(`${REVIEWS_LIST_URL}`);
    // setReviewList(prev => ({

    // }))

  }
  useEffect( () => {
    reviewsListGetApi();
  },[])
  return (
    <>
    <div>프로필 사진 : {}</div>
    <div>유저 닉네임</div>
    <div>유저 별점</div>
    <div>유저 리뷰 글</div>
    <div>유저 사진</div>
    <div>리뷰 작성 시간 : </div>
    <div>유저 신고 상태 : </div>
    <div>사장님 프로필 사진</div>
    <div>사장님 닉네임</div>
    <div>사장님 댓글 내용</div>
    </>
  )
}

export default Review