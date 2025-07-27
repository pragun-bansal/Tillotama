// // pages/api/orders/index.js - Main orders API
// import { requireAuth } from '../../../lib/middleware/auth';
// import { runMiddleware } from '../../../lib/middleware/auth';
// import Order from '../../../lib/models/Order';
// import connectMongoDB from '../../../lib/config/db';
//
// export default async function handler(req, res) {
//     await connectMongoDB();
//
//     if (req.method === 'GET') {
//         // Get user orders with filters
//         await runMiddleware(req, res, requireAuth);
//
//         try {
//             const {
//                 status,
//                 courier_service,
//                 search,
//                 priority,
//                 dateFrom,
//                 dateTo,
//                 sortBy = 'createdAt',
//                 sortOrder = 'desc',
//                 page = 1,
//                 limit = 10
//             } = req.query;
//
//             const filters = { user: req.user._id };
//
//             // Apply filters
//             if (status) filters.status = status;
//             if (courier_service) filters.courier_service = courier_service;
//             if (priority) filters.priority = priority;
//
//             // Search filter
//             if (search) {
//                 filters.$or = [
//                     { tracking_id: { $regex: search, $options: 'i' } },
//                     { recipient_name: { $regex: search, $options: 'i' } },
//                     { recipient_location: { $regex: search, $options: 'i' } },
//                     { current_status: { $regex: search, $options: 'i' } }
//                 ];
//             }
//
//             // Date range filters
//             if (dateFrom || dateTo) {
//                 filters.createdAt = {};
//                 if (dateFrom) filters.createdAt.$gte = new Date(dateFrom);
//                 if (dateTo) {
//                     const endDate = new Date(dateTo);
//                     endDate.setHours(23, 59, 59, 999);
//                     filters.createdAt.$lte = endDate;
//                 }
//             }
//
//             // Pagination
//             const pageNum = parseInt(page);
//             const limitNum = parseInt(limit);
//             const skip = (pageNum - 1) * limitNum;
//
//             // Sorting
//             const sortOptions = {};
//             sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
//
//             // Execute query
//             const [orders, totalCount] = await Promise.all([
//                 Order.find(filters)
//                     .populate('user', 'name email')
//                     .sort(sortOptions)
//                     .skip(skip)
//                     .limit(limitNum),
//                 Order.countDocuments(filters)
//             ]);
//
//             const totalPages = Math.ceil(totalCount / limitNum);
//
//             res.status(200).json({
//                 success: true,
//                 orders,
//                 pagination: {
//                     currentPage: pageNum,
//                     totalPages,
//                     totalCount,
//                     hasNextPage: pageNum < totalPages,
//                     hasPreviousPage: pageNum > 1
//                 }
//             });
//         } catch (error) {
//             console.error('Orders fetch error:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to fetch orders',
//                 error: error.message
//             });
//         }
//     } else if (req.method === 'POST') {
//         // Create new order
//         await runMiddleware(req, res, requireAuth);
//
//         try {
//             const {
//                 tracking_id,
//                 recipient_name,
//                 recipient_location,
//                 courier_service = 'trackon',
//                 order_value = 0,
//                 order_notes = '',
//                 priority = 'medium',
//                 expected_delivery,
//                 auto_track = true
//             } = req.body;
//
//             // Validation
//             if (!tracking_id || !recipient_name || !recipient_location) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Tracking ID, recipient name, and location are required'
//                 });
//             }
//
//             // Check for duplicate tracking ID for same user
//             const existingOrder = await Order.findOne({
//                 user: req.user._id,
//                 tracking_id,
//                 courier_service
//             });
//
//             if (existingOrder) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'An order with this tracking ID already exists'
//                 });
//             }
//
//             // Create order
//             const orderData = {
//                 user: req.user._id,
//                 tracking_id: tracking_id.trim(),
//                 recipient_name: recipient_name.trim(),
//                 recipient_location: recipient_location.trim(),
//                 courier_service,
//                 order_value,
//                 order_notes: order_notes.trim(),
//                 priority,
//                 auto_track
//             };
//
//             if (expected_delivery) {
//                 orderData.expected_delivery = new Date(expected_delivery);
//             }
//
//             const order = new Order(orderData);
//             await order.save();
//
//             // Populate user data
//             await order.populate('user', 'name email');
//
//             res.status(201).json({
//                 success: true,
//                 message: 'Order created successfully',
//                 order
//             });
//         } catch (error) {
//             console.error('Order creation error:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to create order',
//                 error: error.message
//             });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).json({
//             success: false,
//             message: `Method ${req.method} not allowed`
//         });
//     }
// }

// app/api/orders/route.js - Main orders API
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/config/db';
import Order from '../../../lib/models/Order';
import User from '../../../lib/models/User';
import jwt from 'jsonwebtoken';

// Get user orders with filters
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

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const courier_service = searchParams.get('courier_service');
        const search = searchParams.get('search');
        const priority = searchParams.get('priority');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 100;

        const filters = { user: user._id };

        // Apply filters
        if (status) filters.status = status;
        if (courier_service) filters.courier_service = courier_service;
        if (priority) filters.priority = priority;

        // Search filter
        if (search) {
            filters.$or = [
                { tracking_id: { $regex: search, $options: 'i' } },
                { recipient_name: { $regex: search, $options: 'i' } },
                { recipient_location: { $regex: search, $options: 'i' } },
                { current_status: { $regex: search, $options: 'i' } }
            ];
        }

        // Date range filters
        if (dateFrom || dateTo) {
            filters.createdAt = {};
            if (dateFrom) filters.createdAt.$gte = new Date(dateFrom);
            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                filters.createdAt.$lte = endDate;
            }
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const [orders, totalCount] = await Promise.all([
            Order.find(filters)
                .populate('user', 'name email')
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNum),
            Order.countDocuments(filters)
        ]);

        const totalPages = Math.ceil(totalCount / limitNum);

        return NextResponse.json({
            success: true,
            orders,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalCount,
                hasNextPage: pageNum < totalPages,
                hasPreviousPage: pageNum > 1
            }
        });
    } catch (error) {
        console.error('Orders fetch error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        }, { status: 500 });
    }
}

// Create new order
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
        const {
            tracking_id,
            recipient_name,
            recipient_location,
            courier_service = 'trackon',
            order_value = 0,
            order_notes = '',
            priority = 'medium',
            expected_delivery,
            auto_track = true
        } = body;

        // Validation
        if (!tracking_id || !recipient_name || !recipient_location) {
            return NextResponse.json({
                success: false,
                message: 'Tracking ID, recipient name, and location are required'
            }, { status: 400 });
        }

        // Check for duplicate tracking ID for same user
        const existingOrder = await Order.findOne({
            user: user._id,
            tracking_id,
            courier_service
        });

        if (existingOrder) {
            return NextResponse.json({
                success: false,
                message: 'An order with this tracking ID already exists'
            }, { status: 400 });
        }

        // Create order
        const orderData = {
            user: user._id,
            tracking_id: tracking_id.trim(),
            recipient_name: recipient_name.trim(),
            recipient_location: recipient_location.trim(),
            courier_service,
            order_value,
            order_notes: order_notes.trim(),
            priority,
            auto_track
        };

        if (expected_delivery) {
            orderData.expected_delivery = new Date(expected_delivery);
        }

        const order = new Order(orderData);
        await order.save();

        // Populate user data
        await order.populate('user', 'name email');

        return NextResponse.json({
            success: true,
            message: 'Order created successfully',
            order
        }, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        }, { status: 500 });
    }
}