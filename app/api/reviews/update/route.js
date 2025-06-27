//app/api/reviews/update/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Reviews from '../../../../lib/models/Review';
import { verifyToken } from '../../../../lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { reviewId, comment, title, rating, token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const review = await Reviews.findOne({ _id: reviewId });
        if (!review) {
            return NextResponse.json({
                success: false,
                message: "Review not found",
            }, { status: 404 });
        }

        review.title = title;
        review.comment = comment;
        review.rating = rating;
        const data = await review.save();

        return NextResponse.json({
            success: true,
            data,
            message: "Review Updated Successfully"
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error in Updating Review",
            error: err.message
        }, { status: 404 });
    }
}
