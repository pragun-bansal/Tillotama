// app/api/reviews/add/route.js - POST add a new review
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
        const { productId, title, comment, rating, token } = body;

        // Validate required fields
        if (!productId || !title || !comment || !rating || !token) {
            return NextResponse.json(
                {
                    message: 'Product ID, title, comment, rating, and token are required'
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

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: 'Product not found' },
                { status: 404 }
            );
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            product: productId,
            user: user._id
        });

        if (existingReview) {
            return NextResponse.json(
                {
                    message: 'You have already reviewed this product'
                },
                { status: 400 }
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

        // Create new review
        const newReview = new Review({
            product: productId,
            user: user._id,
            title: title.trim(),
            comment: comment.trim(),
            rating: ratingNum
        });

        await newReview.save();

        // Add review to product's reviews array
        await Product.findByIdAndUpdate(productId, {
            $push: { reviews: newReview._id }
        });

        // Populate the review with user data before returning
        const populatedReview = await Review.findById(newReview._id)
            .populate('user', 'name pfp')
            .lean();

        return NextResponse.json({
            success: true,
            data: populatedReview,
            message: 'Review added successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error adding review:', error);

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