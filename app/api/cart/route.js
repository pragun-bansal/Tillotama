//app/api/cart/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/config/db';
import Cart from '../../../lib/models/Cart';
import { verifyToken } from '../../../lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        const cart = await Cart.findOne({ user: userId }).populate("items.productId");

        if (!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [],
            });

            return NextResponse.json({
                data: { cart: newCart }
            });
        }

        return NextResponse.json({
            data: { cart }
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Error in fetching cart",
            error: err.message
        }, { status: 404 });
    }
}