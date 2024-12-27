/** @jsxImportSource @emotion/react */
import React from 'react';
import * as css from './Style';

import StatsReview from "./StatsReview";
import ReviewComment from "./ReviewComment";

function Review() {

    return (
        <>
            <div css={css.reviewContainer}>
                <div css={css.reviewLeftContainer}>
                    <StatsReview />
                </div>
                <div css={css.reviewRightContainer}>
                    <ReviewComment />
                </div>
            </div>
        </>
    )
}

export default Review