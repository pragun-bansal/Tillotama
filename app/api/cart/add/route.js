// app/api/cart/add/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Cart from '../../../../lib/models/Cart';
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

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [{ productId, qty }],
            });
            return NextResponse.json({
                success: true,
                cart: newCart,
            });
        }

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product Not Found"
            }, { status: 404 });
        }

        const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId.toString());

        if (itemIndex > -1) {
            const productItem = cart.items[itemIndex];
            productItem.qty = qty;
            cart.items[itemIndex] = productItem;
        } else {
            cart.items.push({ productId, qty });
        }

        const data = await cart.save();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Error adding item to cart",
            error: err.message
        }, { status: 500 });
    }
}