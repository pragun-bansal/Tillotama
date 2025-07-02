// app/api/reviews/update/[reviewId]/page.jsx - PUT update a review
import Review from '@/lib/models/Review';
import User from '@/lib/models/User';
import connectMongoDB from '@/lib/config/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { reviewId } = await params;
        const body = await request.json();
        const { title, comment, rating, token } = body;

        // Validate required fields
        if (!reviewId || !title || !comment || !rating || !token) {
            return NextResponse.json(
                {
                    message: 'Review ID, title, comment, rating, and token are required'
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

        // Check if user owns the review
        if (review.user.toString() !== user._id.toString()) {
            return NextResponse.json(
                {
                    message: 'You can only update your own reviews'
                },
                { status: 403 }
            );
        }

        // Validate rating
        const ratingNum = parseInt(rating);
        if (ratingNum < 1 || ratingNum > 5) {
            return NextResponse.json(
                { message: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Update the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                title: title.trim(),
                comment: comment.trim(),
                rating: ratingNum,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('user', 'name pfp').lean();

        return NextResponse.json({
            success: true,
            data: updatedReview,
            message: 'Review updated successfully'
        });

    } catch (error) {
        console.error('Error updating review:', error);

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
