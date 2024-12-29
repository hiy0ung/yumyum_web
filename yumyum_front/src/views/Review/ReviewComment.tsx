/** @jsxImportSource @emotion/react */
import React from 'react';
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

  return (
      <>
        <div css={css.reviewContainer}>

        </div>
      </>
  )
}

export default ReviewComment