// // pages/api/orders/[orderId]/track.js - Track individual order
// import { requireAuth } from '../../../../lib/middleware/auth';
// import { runMiddleware } from '../../../../lib/middleware/auth';
// import Order from '../../../../lib/models/Order';
// import connectMongoDB from '../../../../lib/config/db';
// import axios from 'axios';
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
//         if (order.courier_service !== 'trackon') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Tracking is only available for Trackon orders'
//             });
//         }
//
//         // Call external tracking API
//         const API_BASE_URL = process.env.TRACKING_API_URL || 'http://localhost:8000';
//
//         const trackingResponse = await axios.post(`${API_BASE_URL}/track`, {
//             tracking_id: order.tracking_id,
//             recipient_name: order.recipient_name,
//             recipient_location: order.recipient_location
//         }, {
//             timeout: 30000 // 30 seconds timeout
//         });
//
//         if (trackingResponse.data.success) {
//             // Update order with tracking data
//             await order.updateTrackingStatus(trackingResponse.data.data);
//             await order.populate('user', 'name email');
//
//             res.status(200).json({
//                 success: true,
//                 message: 'Order tracking updated successfully',
//                 order
//             });
//         } else {
//             // Update order status to error
//             order.status = 'error';
//             order.current_status = trackingResponse.data.error || 'Tracking failed';
//             order.last_tracked = new Date();
//             order.tracking_attempts += 1;
//             await order.save();
//             await order.populate('user', 'name email');
//
//             res.status(200).json({
//                 success: true,
//                 message: 'Tracking attempted but failed',
//                 order,
//                 tracking_error: trackingResponse.data.error
//             });
//         }
//     } catch (error) {
//         console.error('Order tracking error:', error);
//
//         // Update order with error status
//         try {
//             const order = await Order.findById(orderId);
//             if (order) {
//                 order.status = 'error';
//                 order.current_status = 'Tracking service unavailable';
//                 order.last_tracked = new Date();
//                 order.tracking_attempts += 1;
//                 await order.save();
//             }
//         } catch (updateError) {
//             console.error('Error updating order status:', updateError);
//         }
//
//         res.status(500).json({
//             success: false,
//             message: 'Failed to track order',
//             error: error.message
//         });
//     }
// }
// app/api/orders/[orderId]/track/route.js - Track individual order
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import Order from '../../../../../lib/models/Order';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function POST(request, { params }) {
    try {
        await connectMongoDB();

        const { orderId } = await params;

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

        if (order.courier_service !== 'trackon') {
            return NextResponse.json({
                success: false,
                message: 'Tracking is only available for Trackon orders'
            }, { status: 400 });
        }

        // Call external tracking API
        const API_BASE_URL = process.env.TRACKING_API_URL || 'http://localhost:8000';

        const trackingResponse = await axios.post(`${API_BASE_URL}/track`, {
            tracking_id: order.tracking_id,
            recipient_name: order.recipient_name,
            recipient_location: order.recipient_location
        }, {
            timeout: 30000 // 30 seconds timeout
        });

        if (trackingResponse.data.success) {
            // Update order with tracking data
            await order.updateTrackingStatus(trackingResponse.data.data);
            await order.populate('user', 'name email');

            return NextResponse.json({
                success: true,
                message: 'Order tracking updated successfully',
                order
            });
        } else {
            // Update order status to error
            order.status = 'error';
            order.current_status = trackingResponse.data.error || 'Tracking failed';
            order.last_tracked = new Date();
            order.tracking_attempts += 1;
            await order.save();
            await order.populate('user', 'name email');

            return NextResponse.json({
                success: true,
                message: 'Tracking attempted but failed',
                order,
                tracking_error: trackingResponse.data.error
            });
        }
    } catch (error) {
        console.error('Order tracking error:', error);

        // Update order with error status
        try {
            const order = await Order.findById(orderId);
            if (order) {
                order.status = 'error';
                order.current_status = 'Tracking service unavailable';
                order.last_tracked = new Date();
                order.tracking_attempts += 1;
                await order.save();
            }
        } catch (updateError) {
            console.error('Error updating order status:', updateError);
        }
        return NextResponse.json({
            success: false,
            message: 'Failed to track order',
            error: error.message
        }, { status: 500 });
    }
}