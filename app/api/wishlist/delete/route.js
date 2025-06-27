import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Wishlist from '../../../../lib/models/Wishlist';
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

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return NextResponse.json({
                success: false,
                message: "wishlist Not Found"
            }, { status: 404 });
        }

        const itemIndex = wishlist.items.findIndex((p) => p.productId.toString() === productId);
        if (itemIndex > -1) {
            wishlist.items.splice(itemIndex, 1);
        }

        const newWishlist = await wishlist.save();
        return NextResponse.json({ success: true, newWishlist });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error deleting item from wishlist",
            error: err.message
        }, { status: 500 });
    }
}