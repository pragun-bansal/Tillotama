//app/api/wishlist/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/config/db';
import Wishlist from '../../../lib/models/Wishlist';
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

        const wishlist = await Wishlist.findOne({ user: userId }).populate("items.productId");

        if (!wishlist) {
            const newWishlist = await Wishlist.create({
                user: userId,
                items: [],
            });

            return NextResponse.json({
                status: "success",
                data: { wishlist: newWishlist }
            });
        }

        return NextResponse.json({
            status: "success",
            data: { wishlist }
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Error in fetching wishlist",
            error: err.message
        }, { status: 404 });
    }
}