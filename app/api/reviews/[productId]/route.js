// app/api/reviews/[productId]/route.js - GET reviews for a product
import Review from '@/lib/models/Review';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
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

        // Fetch reviews for the product with populated user data
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name pfp')
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: reviews,
            count: reviews.length
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
}