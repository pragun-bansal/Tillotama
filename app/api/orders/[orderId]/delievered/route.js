// // pages/api/orders/[orderId]/delivered.js - Mark order as delivered
// import { requireAuth } from '../../../../lib/middleware/auth';
// import { runMiddleware } from '../../../../lib/middleware/auth';
// import Order from '../../../../lib/models/Order';
// import connectMongoDB from '../../../../lib/config/db';
//
// export default async function handler(req, res) {
//     await connectMongoDB();
//
//     if (req.method !== 'POST') {
//         res.setHeader('Allow', ['POST']);
//         return res.status(405).json({
//             success: false,
//             message: `Method ${req.method} not allowed`
//         });
//     }
//
//     await runMiddleware(req, res, requireAuth);
//
//     const { orderId } = req.query;
//     const { deliveryNotes = '' } = req.body;
//
//     try {
//         const order = await Order.findOne({
//             _id: orderId,
//             user: req.user._id
//         });
//
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             });
//         }
//
//         // Mark as delivered
//         await order.markAsDelivered(deliveryNotes);
//         await order.populate('user', 'name email');
//
//         res.status(200).json({
//             success: true,
//             message: 'Order marked as delivered successfully',
//             order
//         });
//     } catch (error) {
//         console.error('Mark delivered error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to mark order as delivered',
//             error: error.message
//         });
//     }
// }
// app/api/orders/[orderId]/delivered/route.js - Mark order as delivered
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import Order from '../../../../../lib/models/Order';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request, { params }) {
    try {
        await connectMongoDB();

        const { orderId } =await params;

        if (!orderId) {
            return NextResponse.json({
                success: false,
                message: 'Order ID is required'
            }, { status: 400 });
        }

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

        const body = await request.json();
        const { deliveryNotes = '' } = body;

        const order = await Order.findOne({
            _id: orderId,
            user: user._id
        });

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found'
            }, { status: 404 });
        }

        // Mark as delivered
        await order.markAsDelivered(deliveryNotes);
        await order.populate('user', 'name email');

        return NextResponse.json({
            success: true,
            message: 'Order marked as delivered successfully',
            order
        });
    } catch (error) {
        console.error('Mark delivered error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to mark order as delivered',
            error: error.message
        }, { status: 500 });
    }
}