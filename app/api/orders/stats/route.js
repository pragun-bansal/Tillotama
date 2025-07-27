// // pages/api/orders/stats.js - Order statistics
// import { requireAuth } from '@/lib/middleware/auth';
// import { runMiddleware } from '@/lib/middleware/auth';
// import Order from '@/lib/models/Order';
// import connectMongoDB from '@/lib/config/db';
//
// export default async function handler(req, res) {
//     await connectMongoDB();
//
//     if (req.method !== 'GET') {
//         res.setHeader('Allow', ['GET']);
//         return res.status(405).json({
//             success: false,
//             message: `Method ${req.method} not allowed`
//         });
//     }
//
//     await runMiddleware(req, res, requireAuth);
//
//     try {
//         const stats = await Order.getOrderStats(req.user._id);
//
//         const result = stats[0] || {
//             totalOrders: 0,
//             pendingOrders: 0,
//             trackingOrders: 0,
//             deliveredOrders: 0,
//             errorOrders: 0,
//             trackonOrders: 0,
//             shreeTirupatiOrders: 0,
//             averageDeliveryTime: 0
//         };
//
//         res.status(200).json({
//             success: true,
//             stats: result
//         });
//     } catch (error) {
//         console.error('Order stats error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch order statistics',
//             error: error.message
//         });
//     }
// }
// app/api/orders/stats/route.js - Order statistics
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Order from '../../../../lib/models/Order';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        await connectMongoDB();

        // Extract token from Authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: 'Authentication required'
            }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 401 });
        }

        const stats = await Order.getOrderStats(user._id);

        const result = stats[0] || {
            totalOrders: 0,
            pendingOrders: 0,
            trackingOrders: 0,
            deliveredOrders: 0,
            errorOrders: 0,
            trackonOrders: 0,
            shreeTirupatiOrders: 0,
            averageDeliveryTime: 0
        };

        return NextResponse.json({
            success: true,
            stats: result
        });
    } catch (error) {
        console.error('Order stats error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch order statistics',
            error: error.message
        }, { status: 500 });
    }
}