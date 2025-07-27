//app/api/reviews/page.jsx
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/config/db';
import Product from '../../../lib/models/Product';
import Reviews from '../../../lib/models/Review';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { productId } = body;

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
            }, { status: 404 });
        }

        const reviews = product.reviews;
        const promises = reviews.map(async (r) => {
            const re = await Reviews.findOne({ _id: r });
            if (re) {
                return re;
            }
        });

        const reviewsFound = await Promise.all(promises);

        return NextResponse.json({
            success: true,
            message: "Reviews Found",
            reviews: reviewsFound
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error in getting Reviews",
            error: err.message
        }, { status: 404 });
    }
}