//app/api/wishlist/add/route.js

// app/api/wishlist/add/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Wishlist from '../../../../lib/models/Wishlist';
import Product from '../../../../lib/models/Product';
import { verifyToken } from '../../../../lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { productId, qty, token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            const newWishlist = await Wishlist.create({
                user: userId,
                items: [{ productId, qty }],
            });
            return NextResponse.json({
                success: true,
                wishlist: newWishlist,
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product Not Found"
            }, { status: 404 });
        }

        const itemIndex = wishlist.items.findIndex((p) => p.productId.toString() === productId.toString());

        if (itemIndex > -1) {
            const productItem = wishlist.items[itemIndex];
            productItem.qty = qty;
            wishlist.items[itemIndex] = productItem;
        } else {
            wishlist.items.push({ productId, qty });
        }

        const data = await wishlist.save();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error adding item to wishlist",
            error: err.message
        }, { status: 500 });
    }
}