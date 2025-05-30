/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import * as css from "./Style";
import starImg from "../../images/star.webp";
import {
    CartesianGrid,
    LabelList,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { ReviewStatsProps, TotalReviewsStats } from "../../types/ReviewStats";

const StatsReview: React.FC<ReviewStatsProps> = ({
                                                     totalReviewStats,
                                                     monthReviewStats,
                                                 }) => {
    const totalReviewCount = useMemo(() => {
        return totalReviewStats.reduce((sum: number, item: TotalReviewsStats) => {
            return sum + item.reviewCount;
        }, 0);
    }, [totalReviewStats]);

    const averageRating = useMemo(() => {
        const totalWeightedRating = totalReviewStats.reduce(
            (sum: number, item: TotalReviewsStats) => sum + item.rating * item.reviewCount,
            0
        );
        return totalReviewCount > 0
            ? (totalWeightedRating / totalReviewCount).toFixed(1)
            : "0";
    }, [totalReviewStats, totalReviewCount]);

    const chartData = useMemo(() => {
        return monthReviewStats.map((item) => {
            const [year, month] = item.reviewMonth.split("-");
            const monthNumber = `${month}월`;
            return {
                name: monthNumber,
                pv: item.avgRating,
                value: item.reviewMonthCount,
            };
        });
    }, [monthReviewStats]);
    function truncateLabel(originalLabel: string, maxLength: number) {
        if (originalLabel.length <= maxLength) return originalLabel;
        return originalLabel.slice(0, maxLength) + "+";
    }
    function renderCustomTick({ x, y, payload }: any) {
        const originalLabel = payload?.value || "";
        const truncatedLabel = truncateLabel(originalLabel, 3);
        const matchedItem = chartData.find((item) => item.name === originalLabel);
        const countLabel = matchedItem?.value ?? 0;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
                    {truncatedLabel}
                </text>
                <text x={0} y={18} dy={16} textAnchor="middle" fill="#999">
                    {countLabel}
                </text>
            </g>
        );
    }

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
                            <img src={starImg} alt="별 이미지" />
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
                            totalReviewCount === 0 ? 0 : (reviewCount / totalReviewCount) * 100;
                        return (
                            <div key={starScore} css={css.ratingBar}>
                                <div>
                                    <div css={css.ratingBarFill(percentage)} />
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
            <div css={css.charStyle}>
                <ResponsiveContainer
                    width={"100%"}
                    height={250}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <LineChart data={chartData} margin={{ top: 20, right: 40, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="1000 0" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickMargin={5}
                            padding={{ left: 30, right: 30 }}
                            tick={renderCustomTick}
                        />
                        <YAxis
                            domain={[0, 5]}
                            ticks={[0, 1, 2, 3, 4, 5]}
                            axisLine={{ stroke: "none" }}
                            tickLine={{ display: "none" }}
                        />
                        <Line
                            type="linear"
                            dataKey="pv"
                            stroke="#b1b1b1"
                            strokeWidth={2}
                            dot={{ fill: "black", r: 3 }}
                        >
                            <LabelList dataKey="pv" position="top" offset={8} />
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default StatsReview;
