//app/api/reviews/add/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Product from '../../../../lib/models/Product';
import Reviews from '../../../../lib/models/Reviews';
import { verifyToken } from '../../../../lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        let { productId, comment, title, rating, token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const user = decoded.user;

        if (!rating) rating = 5;

        let product = await Product.findOne({ _id: productId });
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
            }, { status: 404 });
        }

        const userId = user._id;
        const review = await Reviews.create({
            product: product._id,
            title: title,
            comment: comment,
            rating: rating,
            user: userId
        });

        product.reviews.push(review._id);
        const data = await product.save();

        return NextResponse.json({
            success: true,
            data,
            review,
            message: "Review Added Successfully"
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error in Adding Review",
            error: err.message
        }, { status: 404 });
    }
}
