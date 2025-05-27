export interface TotalReviewsStats {
    rating: number;
    reviewCount: number;
}

export interface MonthReviewsStats {
    reviewMonth: string;
    avgRating: number;
    reviewMonthCount: number;
}

export interface ReviewStatsProps {
    totalReviewStats: TotalReviewsStats[];
    monthReviewStats: MonthReviewsStats[];
}