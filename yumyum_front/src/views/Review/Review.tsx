/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import * as css from './Style';

import StatsReview from "./StatsReview";
import ReviewComment from "./ReviewComment";
import axios from "axios";
import {useCookies} from "react-cookie";
import {MonthReviewsStats, TotalReviewsStats, } from "../../types/ReviewStats";
import moment from "moment";


function Review() {
    const [totalReviewStats, setTotalTotalReviewStats] = useState<TotalReviewsStats[]>([]);
    const [monthReviewStats, setMonthReviewStats] = useState<MonthReviewsStats[]>([
        {
            reviewMonth: "",
            avgRating: 0,
            reviewMonthCount: 0
        }
    ]);
    const [cookies] = useCookies(["token"])
    const token = cookies.token;

    const totalReviewStatsFetch = async () => {
        try {
            const response = await axios.get(`http://localhost:4041/api/v1/reviews/rating`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
            if (response.data.data) {
                setTotalTotalReviewStats(response.data.data)
                console.log(response.data.data)
            }
        }catch(error) {
            console.log(error);
        }
    }
    const monthReviewStatsFetch = async () => {
        const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
        console.log(currentDate);
        try {

        const response = await axios.get('http://localhost:4041/api/v1/reviews/rating/month',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params : {
                    date: currentDate,
                }
            });
        if (response.data.data) {
            setMonthReviewStats(response.data.data)
            console.log(response.data.data)
        }
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        totalReviewStatsFetch();
        monthReviewStatsFetch();
    }, []);
    return (
        <>
            <div css={css.reviewContainer}>
                <div css={css.reviewLeftContainer}>
                    <StatsReview totalReviewStats={totalReviewStats} monthReviewStats={monthReviewStats} />
                </div>
                <div css={css.reviewRightContainer}>
                    <ReviewComment />
                </div>
            </div>
        </>
    )
}

export default Review


