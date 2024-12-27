/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import * as css from './Style';

import StatsReview from "./StatsReview";
import ReviewComment from "./ReviewComment";
import axios from "axios";
import {useCookies} from "react-cookie";
import {reviewsStats} from "../../types/ReviewStats";


function Review() {
    const [reviewStats, setReviewStats] = useState<reviewsStats[]>([]);
    const [cookies] = useCookies(["token"])
    const token = cookies.token;

    const reviewStatsFetch = async () => {
        try {
            const response = await axios.get(`http://localhost:4041/api/v1/reviews/rating`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
            if (response.data.data) {
                setReviewStats(response.data.data)
            }
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        reviewStatsFetch();
    }, []);
    return (
        <>
            <div css={css.reviewContainer}>
                <div css={css.reviewLeftContainer}>
                    <StatsReview reviewStats={reviewStats} />
                </div>
                <div css={css.reviewRightContainer}>
                    <ReviewComment />
                </div>
            </div>
        </>
    )
}

export default Review


