/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useState} from 'react';
import * as css from "./Style";
import starImg from "../../img/star.png";
import {CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {reviewsStatsProps} from "../../types/ReviewStats";

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
const StatsReview = ({reviewStats}: reviewsStatsProps) => {

    const averageRating : number | string = useMemo(() : number | string => {
            const totalWeightedRating = reviewStats.reduce((sum, item) => sum + item.rating * item.reviewCount, 0);
            const totalReviewCount = reviewStats.reduce((sum, item) => sum + item.reviewCount, 0);
            return totalReviewCount > 0 ? (totalWeightedRating / totalReviewCount).toFixed(1) : 0;
        }
        , [reviewStats]);

    return (
        <>
            <h2 css={css.reviewAverageContainer}>
                <div css={css.reviewAverageTitle}>평균 별점</div>
                <div css={css.reviewAverage}>{averageRating}</div>
            </h2>
            <div css={css.ratingBarContainer}>
                <div css={css.ratingBarContainer}>
                    {[5, 4, 3, 2, 1].map((starScore) => {
                        const found = reviewStats.find((item) => item.rating === starScore);
                        const reviewCount = found ? found.reviewCount : 0;

                        return (
                            <div css={css.ratingBarSet} key={starScore}>
                                <div css={css.ratingBarLeftContainer}>
                                    <img css={css.starImg} src={starImg} alt="리뷰 별점 사진"/>
                                    <div css={css.starScore}>{starScore}점</div>
                                    <div css={css.ratingBar}>
                                        <div></div>
                                    </div>
                                </div>
                                <div css={css.reviewCount}>{reviewCount}</div>
                            </div>
                        );
                    })}
                </div>

            </div>
            <ResponsiveContainer width={"90%"} height={300}
                                 style={{
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     paddingTop: "50px",
                                 }}>
                <LineChart data={data} margin={{top: 20}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="name"
                           padding={{left: 30, right: 30}}/>
                    <YAxis
                        domain={[0, 5]} // 최소값 0, 최대값 5로 설정
                        ticks={[0, 1, 2, 3, 4, 5]} // 눈금 값 지정
                        axisLine={{stroke: "none"}} // 축 선 색상 변경
                        tickLine={{display: "none"}}
                    />
                    <Line
                        type="linear"
                        dataKey="pv"
                        stroke="black"
                    >
                        <LabelList
                            position="top" offset={5}/>
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </>
    )
        ;
};

export default StatsReview;
