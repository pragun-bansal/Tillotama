// // pages/api/orders/track/batch.js - Batch tracking for multiple orders
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
//     const { orderIds, courierService = 'trackon' } = req.body;
//
//     if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: 'Order IDs array is required'
//         });
//     }
//
//     if (courierService !== 'trackon') {
//         return res.status(400).json({
//             success: false,
//             message: 'Batch tracking is only available for Trackon orders'
//         });
//     }
//
//     try {
//         // Fetch orders
//         const orders = await Order.find({
//             _id: { $in: orderIds },
//             user: req.user._id,
//             courier_service: courierService
//         });
//
//         if (orders.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No valid orders found for tracking'
//             });
//         }
//
//         // Prepare tracking requests
//         const trackingRequests = orders.map(order => ({
//             tracking_id: order.tracking_id,
//             recipient_name: order.recipient_name,
//             recipient_location: order.recipient_location
//         }));
//
//         // Call external batch tracking API
//         const API_BASE_URL = process.env.TRACKING_API_URL || 'http://localhost:8000';
//
//         const trackingResponse = await axios.post(`${API_BASE_URL}/track/batch`, {
//             tracking_requests: trackingRequests
//         }, {
//             timeout: 60000 // 60 seconds timeout for batch
//         });
//
//         const results = [];
//
//         if (trackingResponse.data.results && Array.isArray(trackingResponse.data.results)) {
//             // Process each result
//             for (let i = 0; i < orders.length; i++) {
//                 const order = orders[i];
//                 const result = trackingResponse.data.results[i];
//
//                 try {
//                     if (result && result.success) {
//                         // Update order with tracking data
//                         await order.updateTrackingStatus(result.data);
//                         await order.populate('user', 'name email');
//
//                         results.push({
//                             orderId: order._id,
//                             success: true,
//                             order,
//                             message: 'Tracking updated successfully'
//                         });
//                     } else {
//                         // Update order status to error
//                         order.status = 'error';
//                         order.current_status = result?.error || 'Tracking failed';
//                         order.last_tracked = new Date();
//                         order.tracking_attempts += 1;
//                         await order.save();
//                         await order.populate('user', 'name email');
//
//                         results.push({
//                             orderId: order._id,
//                             success: false,
//                             order,
//                             error: result?.error || 'Tracking failed'
//                         });
//                     }
//                 } catch (orderUpdateError) {
//                     console.error(`Error updating order ${order._id}:`, orderUpdateError);
//                     results.push({
//                         orderId: order._id,
//                         success: false,
//                         error: 'Failed to update order'
//                     });
//                 }
//             }
//         }
//
//         res.status(200).json({
//             success: true,
//             message: `Batch tracking completed for ${orders.length} orders`,
//             results,
//             total: orders.length,
//             successful: results.filter(r => r.success).length,
//             failed: results.filter(r => !r.success).length
//         });
//     } catch (error) {
//         console.error('Batch tracking error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to perform batch tracking',
//             error: error.message
//         });
//     }
// }
// app/api/orders/track/batch/route.js - Batch tracking for multiple orders
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import Order from '../../../../../lib/models/Order';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function POST(request) {
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

        const body = await request.json();
        const { orderIds, courierService = 'trackon' } = body;

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Order IDs array is required'
            }, { status: 400 });
        }

        if (courierService !== 'trackon') {
            return NextResponse.json({
                success: false,
                message: 'Batch tracking is only available for Trackon orders'
            }, { status: 400 });
        }

        // Fetch orders
        const orders = await Order.find({
            _id: { $in: orderIds },
            user: user._id,
            courier_service: courierService
        });

        if (orders.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No valid orders found for tracking'
            }, { status: 404 });
        }

        // Prepare tracking requests
        const trackingRequests = orders.map(order => ({
            tracking_id: order.tracking_id,
            recipient_name: order.recipient_name,
            recipient_location: order.recipient_location
        }));

        // Call external batch tracking API
        const API_BASE_URL = process.env.TRACKING_API_URL || 'http://localhost:8000';

        const trackingResponse = await axios.post(`${API_BASE_URL}/track/batch`, {
            tracking_requests: trackingRequests
        }, {
            timeout: 60000 // 60 seconds timeout for batch
        });

        const results = [];

        if (trackingResponse.data.results && Array.isArray(trackingResponse.data.results)) {
            // Process each result
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                const result = trackingResponse.data.results[i];

                try {
                    if (result && result.success) {
                        // Update order with tracking data
                        await order.updateTrackingStatus(result.data);
                        await order.populate('user', 'name email');

                        results.push({
                            orderId: order._id,
                            success: true,
                            order,
                            message: 'Tracking updated successfully'
                        });
                    } else {
                        // Update order status to error
                        order.status = 'error';
                        order.current_status = result?.error || 'Tracking failed';
                        order.last_tracked = new Date();
                        order.tracking_attempts += 1;
                        await order.save();
                        await order.populate('user', 'name email');

                        results.push({
                            orderId: order._id,
                            success: false,
                            order,
                            error: result?.error || 'Tracking failed'
                        });
                    }
                } catch (orderUpdateError) {
                    console.error(`Error updating order ${order._id}:`, orderUpdateError);
                    results.push({
                        orderId: order._id,
                        success: false,
                        error: 'Failed to update order'
                    });
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Batch tracking completed for ${orders.length} orders`,
            results,
            total: orders.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length
        });
    } catch (error) {
        console.error('Batch tracking error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to perform batch tracking',
            error: error.message
        }, { status: 500 });
    }
}