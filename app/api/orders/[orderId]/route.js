// // pages/api/orders/[orderId].js - Individual order operations
// import { requireAuth } from '../../../lib/middleware/auth';
// import { runMiddleware } from '../../../lib/middleware/auth';
// import Order from '../../../lib/models/Order';
// import connectMongoDB from '../../../lib/config/db';
//
// export default async function handler(req, res) {
//     await connectMongoDB();
//
//     const { orderId } = req.query;
//
//     if (!orderId) {
//         return res.status(400).json({
//             success: false,
//             message: 'Order ID is required'
//         });
//     }
//
//     if (req.method === 'GET') {
//         // Get specific order
//         await runMiddleware(req, res, requireAuth);
//
//         try {
//             const order = await Order.findOne({
//                 _id: orderId,
//                 user: req.user._id
//             }).populate('user', 'name email');
//
//             if (!order) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Order not found'
//                 });
//             }
//
//             res.status(200).json({
//                 success: true,
//                 order
//             });
//         } catch (error) {
//             console.error('Order fetch error:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to fetch order',
//                 error: error.message
//             });
//         }
//     } else if (req.method === 'PUT') {
//         // Update order
//         await runMiddleware(req, res, requireAuth);
//
//         try {
//             const order = await Order.findOne({
//                 _id: orderId,
//                 user: req.user._id
//             });
//
//             if (!order) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Order not found'
//                 });
//             }
//
//             const {
//                 tracking_id,
//                 recipient_name,
//                 recipient_location,
//                 courier_service,
//                 order_value,
//                 order_notes,
//                 priority,
//                 expected_delivery,
//                 auto_track
//             } = req.body;
//
//             // Check for duplicate tracking ID if changed
//             if (tracking_id && tracking_id !== order.tracking_id) {
//                 const existingOrder = await Order.findOne({
//                     user: req.user._id,
//                     tracking_id,
//                     courier_service: courier_service || order.courier_service,
//                     _id: { $ne: orderId }
//                 });
//
//                 if (existingOrder) {
//                     return res.status(400).json({
//                         success: false,
//                         message: 'An order with this tracking ID already exists'
//                     });
//                 }
//             }
//
//             // Update fields
//             if (tracking_id) order.tracking_id = tracking_id.trim();
//             if (recipient_name) order.recipient_name = recipient_name.trim();
//             if (recipient_location) order.recipient_location = recipient_location.trim();
//             if (courier_service) {
//                 // If courier service changed, reset tracking data
//                 if (courier_service !== order.courier_service) {
//                     order.courier_service = courier_service;
//                     order.status = 'pending';
//                     order.current_status = undefined;
//                     order.tracking_data = undefined;
//                     order.last_tracked = undefined;
//                     order.tracking_attempts = 0;
//                 }
//             }
//             if (order_value !== undefined) order.order_value = order_value;
//             if (order_notes !== undefined) order.order_notes = order_notes.trim();
//             if (priority) order.priority = priority;
//             if (expected_delivery) order.expected_delivery = new Date(expected_delivery);
//             if (auto_track !== undefined) order.auto_track = auto_track;
//
//             await order.save();
//             await order.populate('user', 'name email');
//
//             res.status(200).json({
//                 success: true,
//                 message: 'Order updated successfully',
//                 order
//             });
//         } catch (error) {
//             console.error('Order update error:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to update order',
//                 error: error.message
//             });
//         }
//     } else if (req.method === 'DELETE') {
//         // Delete order
//         await runMiddleware(req, res, requireAuth);
//
//         try {
//             const order = await Order.findOneAndDelete({
//                 _id: orderId,
//                 user: req.user._id
//             });
//
//             if (!order) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Order not found'
//                 });
//             }
//
//             res.status(200).json({
//                 success: true,
//                 message: 'Order deleted successfully'
//             });
//         } catch (error) {
//             console.error('Order deletion error:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to delete order',
//                 error: error.message
//             });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//         res.status(405).json({
//             success: false,
//             message: `Method ${req.method} not allowed`
//         });
//     }
// }
// app/api/orders/[orderId]/route.js - Individual order operations
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Order from '../../../../lib/models/Order';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';

// Get specific order
export async function GET(request, { params }) {
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

        const order = await Order.findOne({
            _id: orderId,
            user: user._id
        }).populate('user', 'name email');

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Order fetch error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch order',
            error: error.message
        }, { status: 500 });
    }
}

// Update order
export async function PUT(request, { params }) {
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

        const body = await request.json();
        const {
            tracking_id,
            recipient_name,
            recipient_location,
            courier_service,
            order_value,
            order_notes,
            priority,
            expected_delivery,
            auto_track
        } = body;

        // Check for duplicate tracking ID if changed
        if (tracking_id && tracking_id !== order.tracking_id) {
            const existingOrder = await Order.findOne({
                user: user._id,
                tracking_id,
                courier_service: courier_service || order.courier_service,
                _id: { $ne: orderId }
            });

            if (existingOrder) {
                return NextResponse.json({
                    success: false,
                    message: 'An order with this tracking ID already exists'
                }, { status: 400 });
            }
        }

        // Update fields
        if (tracking_id) order.tracking_id = tracking_id.trim();
        if (recipient_name) order.recipient_name = recipient_name.trim();
        if (recipient_location) order.recipient_location = recipient_location.trim();
        if (courier_service) {
            // If courier service changed, reset tracking data
            if (courier_service !== order.courier_service) {
                order.courier_service = courier_service;
                order.status = 'pending';
                order.current_status = undefined;
                order.tracking_data = undefined;
                order.last_tracked = undefined;
                order.tracking_attempts = 0;
            }
        }
        if (order_value !== undefined) order.order_value = order_value;
        if (order_notes !== undefined) order.order_notes = order_notes.trim();
        if (priority) order.priority = priority;
        if (expected_delivery) order.expected_delivery = new Date(expected_delivery);
        if (auto_track !== undefined) order.auto_track = auto_track;

        await order.save();
        await order.populate('user', 'name email');

        return NextResponse.json({
            success: true,
            message: 'Order updated successfully',
            order
        });
    } catch (error) {
        console.error('Order update error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to update order',
            error: error.message
        }, { status: 500 });
    }
}

// Delete order
export async function DELETE(request, { params }) {
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

        const order = await Order.findOneAndDelete({
            _id: orderId,
            user: user._id
        });

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        console.error('Order deletion error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to delete order',
            error: error.message
        }, { status: 500 });
    }
}