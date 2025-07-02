// app/api/reviews/delete/page.jsx - POST delete a review
import Review from '@/lib/models/Review';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
import connectMongoDB from '@/lib/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { reviewId, productId, token } = body;

        // Validate required fields
        if (!reviewId || !productId || !token) {
            return NextResponse.json(
                {
                    message: 'Review ID, product ID, and token are required'
                },
                { status: 400 }
            );
        }

        // Verify token and get user
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (jwtError) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }

        const user = await User.findById(decoded.user._id);
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 401 }
            );
        }

        // Find the review
        const review = await Review.findById(reviewId);
        if (!review) {
            return NextResponse.json(
                { message: 'Review not found' },
                { status: 404 }
            );
        }

        // Check if user owns the review or is admin
        if (review.user.toString() !== user._id.toString() && !user.admin) {
            return NextResponse.json(
                {
                    message: 'You can only delete your own reviews'
                },
                { status: 403 }
            );
        }

        // Remove review from product's reviews array
        await Product.findByIdAndUpdate(productId, {
            $pull: { reviews: reviewId }
        });

        // Delete the review
        await Review.findByIdAndDelete(reviewId);

        return NextResponse.json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting review:', error);

        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
}