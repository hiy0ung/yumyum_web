/** @jsxImportSource @emotion/react */
import React, {useMemo} from "react";
import * as css from "./Style";
import starImg from "../../img/star.png";
import {
    CartesianGrid,
    LabelList,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {TotalReviewsStats, TotalReviewsStatsProps} from "../../types/ReviewStats";

// 차트 예시 데이터
const data = [
    {name: "5월", pv: 4.5},
    {name: "6월", pv: 4.2},
    {name: "7월", pv: 3.9},
    {name: "8월", pv: 4.8},
    {name: "9월", pv: 3.6},
    {name: "10월", pv: 4.2},
];

const StatsReview = ({totalReviewStats}: TotalReviewsStatsProps) => {
    const totalReviewCount = useMemo(() => {
        return totalReviewStats.reduce((sum: number, item: TotalReviewsStats) => {
            return sum + item.reviewCount;
        }, 0);
    }, [totalReviewStats]);
    const averageRating = useMemo(() => {
        const totalWeightedRating = totalReviewStats.reduce(
            (sum: number, item: TotalReviewsStats) =>
                sum + item.rating * item.reviewCount,
            0
        );
        return totalReviewCount > 0
            ? (totalWeightedRating / totalReviewCount).toFixed(1)
            : "0";
    }, [totalReviewStats, totalReviewCount]);

    return (
        <>
            <h2 css={css.reviewAverageContainer}>
                <div css={css.reviewAverageTitle}>평균 별점</div>
                <div css={css.reviewAverage}>{averageRating}</div>
            </h2>

            <div css={css.totalRatingBarContainer}>
                <div css={css.reviewImgContainer}>
                    {[5, 4, 3, 2, 1].map((starScore) => (
                        <div key={starScore}>
                            <img src={starImg} alt="별 이미지"/>
                        </div>
                    ))}
                </div>

                <div css={css.reviewRatingContainer}>
                    {[5, 4, 3, 2, 1].map((starScore) => (
                        <div key={starScore}>{starScore}점</div>
                    ))}
                </div>
                <div css={css.reviewRatingBarContainer}>
                    {[5, 4, 3, 2, 1].map((starScore) => {
                        const found = totalReviewStats.find(
                            (item: TotalReviewsStats) => item.rating === starScore
                        );
                        const reviewCount = found ? found.reviewCount : 0;
                        const percentage =
                            totalReviewCount === 0
                                ? 0
                                : (reviewCount / totalReviewCount) * 100;

                        return (
                            <div key={starScore} css={css.ratingBar}>
                                <div>
                                    <div css={css.ratingBarFill(percentage)}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div css={css.reviewCounterContainer}>
                    {[5, 4, 3, 2, 1].map((starScore) => {
                        const found = totalReviewStats.find(
                            (item: TotalReviewsStats) => item.rating === starScore
                        );
                        const reviewCount = found ? found.reviewCount : 0;
                        return (
                            <div key={starScore} css={css.reviewCount}>
                                {reviewCount}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                css={css.charStyle}>
                <ResponsiveContainer
                    width={"100%"}
                    height={250}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <LineChart data={data} margin={{top: 20, right: 40}}>
                        <CartesianGrid strokeDasharray="1000 0" vertical={false}/>
                        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                        <YAxis
                            domain={[0, 5]}
                            ticks={[0, 1, 2, 3, 4, 5]}
                            axisLine={{stroke: "none"}}
                            tickLine={{display: "none"}}
                        />
                        <Line type="linear" dataKey="pv" stroke="black">
                            <LabelList position="top" offset={5}/>
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default StatsReview;
