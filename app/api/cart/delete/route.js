import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Cart from '../../../../lib/models/Cart';
import { verifyToken } from '../../../../lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { productId, token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({
                success: false,
                message: "Cart Not Found"
            }, { status: 404 });
        }

        const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        }

        const data = await cart.save();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error deleting item from cart",
            error: err.message
        }, { status: 500 });
    }
}