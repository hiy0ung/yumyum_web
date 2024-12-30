export interface TotalReviewsStats {
    rating: number;
    reviewCount: number;
}

export interface MonthReviewsStats {
    avgRating: number;
    reviewMonth: number;
    reviewMonthCount: number;
}

export interface ReviewStatsProps {
    totalReviewStats: TotalReviewsStats[];
    monthReviewStats: MonthReviewsStats[];
}