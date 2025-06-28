// app/api/reviews/stats/[productId]/route.js - GET review statistics for a product
import Review from '@/lib/models/Review';
import connectMongoDB from '@/lib/config/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        await connectMongoDB();

        const { productId } = await params;

        if (!productId) {
            return NextResponse.json(
                { message: 'Product ID is required' },
                { status: 400 }
            );
        }

        // Get all reviews for the product
        const reviews = await Review.find({ product: productId }).select('rating').lean();

        if (reviews.length === 0) {
            return NextResponse.json({
                success: true,
                data: {
                    totalReviews: 0,
                    averageRating: 0,
                    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                    percentageDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                }
            });
        }

        // Calculate statistics
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const averageRating = totalRating / totalReviews;

        // Calculate rating distribution
        const ratingDistribution = reviews.reduce((dist, review) => {
            const rating = review.rating || 1;
            dist[rating] = (dist[rating] || 0) + 1;
            return dist;
        }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

        // Calculate percentage distribution
        const percentageDistribution = Object.keys(ratingDistribution).reduce((acc, rating) => {
            acc[rating] = Math.round((ratingDistribution[rating] / totalReviews) * 100);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: {
                totalReviews,
                averageRating: Math.round(averageRating * 100) / 100,
                ratingDistribution,
                percentageDistribution
            }
        });

    } catch (error) {
        console.error('Error fetching review statistics:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
}