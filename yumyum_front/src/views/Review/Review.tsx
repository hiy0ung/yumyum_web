/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {REVIEWS_LIST_URL} from '../../apis';
import * as css from './Style';
import starImg from "../../img/star.png"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import StatsReview from "./StatsReview";
// import StatsReview from "./StatsReview";

const data = [
  {
    name: "5월",
    pv: 4.5,
  },
  {
    name: "6월",
    pv: 4.2,
  },
  {
    name: "7월",
    pv: 3.9,
  },
  {
    name: "8월",
    pv: 4.8,
  },
  {
    name: "9월",
    pv: 3.6,
  },
  {
    name: "10월",
    pv: 4.2,
  }
];
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
    const response = await axios.get(`http://localhost:4041/api/v1/reviews/${1}`);
    setReviewList(response.data.data);
    console.log(response.data.data);
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
  }
  useEffect(() => {
    reviewsListGetApi();
  }, [])



  return (
      <>
        <div css={css.reviewContainer}>
          <div css={css.reviewLeftContainer}>
            <StatsReview />
          </div>
          <div css={css.reviewRightContainer}>
            <R
          </div>

        </div>
      </>
  )
}

export default Review