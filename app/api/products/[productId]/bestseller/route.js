// app/api/products/[productId]/bestseller/route.js - Toggle bestseller status
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/utils/auth';

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { productId } = await params;
        const { bestseller } = await request.json();
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }
        const token = authHeader.substring(7);

        if (!token) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);

        // Check if user is admin
        const user = await User.findById(decoded.user._id);
        if (!user || !user.admin) {
            return NextResponse.json({
                message: "Admin access required"
            }, { status: 403 });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                message: "Product not found"
            }, { status: 404 });
        }

        // Toggle bestseller status
        product.bestseller = bestseller;
        await product.save();

        return NextResponse.json({
            message: `Product ${bestseller ? 'added to' : 'removed from'} bestsellers successfully`,
            product: {
                _id: product._id,
                name: product.name,
                bestseller: product.bestseller,
                bestsellerStatus: product.bestsellerStatus
            }
        });

    } catch (error) {
        console.error('Toggle bestseller error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}