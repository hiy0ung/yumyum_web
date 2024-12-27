import React, {useState} from 'react';
import * as css from "./Style";
import starImg from "../../img/star.png";
import {CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";


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

const StatsReview = () => {

    const [reviewsList, setReviewList] = useState<any>({
        average: 0,
        reviews: [

        ]
    });
    return (
        <>
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
                        ? (<div css={css.reviewCount}>{reviewsList.reviews[1].count}</div>)
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
                        ? (<div css={css.reviewCount}>{reviewsList.reviews[2].count}</div>)
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
                        ? (<div css={css.reviewCount}>{reviewsList.reviews[3].count}</div>)
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
