// components/product/RatingGraph.jsx
"use client";
import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectReviewStats, selectRatingPercentages } from '@/store/slices/reviewSlice';
import  Skeleton  from '@/components/product/Skeleton';

const RatingGraph = ({ productId, className = "" }) => {
    const reviewStats = useAppSelector(selectReviewStats);
    const ratingPercentages = useAppSelector(selectRatingPercentages);
    const loading = useAppSelector(state => state.reviews.loading);

    if (loading) {
        return <RatingGraphSkeleton />;
    }

    const { totalReviews, averageRating } = reviewStats;

    return (
        <div className={`lg:w-[50vw] ml-4 mt-16 ${className}`}>
            {/* Overall Rating Display */}
            <div className="flex items-center mb-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 mr-1 ${
                                i < Math.round(averageRating)
                                    ? 'text-[#EE6983]'
                                    : 'text-gray-300 dark:text-gray-500'
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-500">
                    {averageRating.toFixed(1)} out of 5
                </p>
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>

            {/* Rating Distribution */}
            {totalReviews > 0 ? (
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <span className="text-sm font-medium text-black hover:underline cursor-pointer w-12">
                                {rating} star
                            </span>
                            <div className="flex-1 h-5 mx-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#EE6983] rounded-full transition-all duration-300 ease-in-out"
                                    style={{
                                        width: `${ratingPercentages[rating] || 0}%`
                                    }}
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-10 text-right">
                                {ratingPercentages[rating] || 0}%
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">⭐</div>
                    <p className="text-gray-500 text-sm">No reviews yet</p>
                    <p className="text-gray-400 text-xs">Be the first to review this product</p>
                </div>
            )}

            {/* Additional Stats (if needed) */}
            {totalReviews > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-lg font-semibold text-gray-800">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500">Avg Rating</div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-800">
                                {totalReviews}
                            </div>
                            <div className="text-xs text-gray-500">
                                Total Review{totalReviews !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Skeleton component for loading state
const RatingGraphSkeleton = () => {
    return (
        <div className="lg:w-[50vw] ml-4 mt-16">
            {/* Overall rating skeleton */}
            <div className="flex items-center mb-2">
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="w-4 h-4" />
                    ))}
                </div>
                <Skeleton className="ml-2 h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16 mb-4" />

            {/* Rating distribution skeleton */}
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        <Skeleton className="w-12 h-5" />
                        <Skeleton className="flex-1 h-5 mx-4" />
                        <Skeleton className="w-10 h-5" />
                    </div>
                ))}
            </div>

            {/* Stats skeleton */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <Skeleton className="h-6 w-8 mx-auto mb-1" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                    <div>
                        <Skeleton className="h-6 w-8 mx-auto mb-1" />
                        <Skeleton className="h-3 w-20 mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingGraph;