/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as css from './Style';
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
  const [reviewsList, setReviewList] = useState<any>({
    average: 0,
    reviews: [

    ]
  });


  // const reviewsListGetApi = async () => {
  //   const response = await axios.get(`http://localhost:4041/api/v1/reviews/${1}`);
  //   setReviewList(response.data.data);
  //   console.log(response.data.data);
    // 일단 하드 코딩

    // const response = {
    //   average: 4.5,
    //   reviews : [
    //     { count: 554044444444 },
    //     { count: 3523 },
    //     { count: 1235 },
    //     { count: 236 },
    //     { count: 114 },
    //   ]
    // }
    // setReviewList(response)




  return (
      <>
        <div css={css.reviewContainer}>

        </div>
      </>
  )
}

export default ReviewComment