// app/api/testimonials/user/page.jsx
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import {verifyToken} from "@/lib/utils/auth";
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

// // Helper function to verify JWT token
// async function verifyToken(request) {
//     try {
//         const authHeader = request.headers.get('authorization');
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return null;
//         }
//
//         const token = authHeader.substring(7);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//
//         await connectMongoDB();
//         const user = await User.findById(decoded.user._id);
//
//         return user;
//     } catch (error) {
//         console.error('Token verification error:', error);
//         return null;
//     }
// }
//
// // GET /api/testimonials/user - Fetch user's own testimonials
// export async function GET(request) {
//     try {
//         await connectMongoDB();
//
//         const user = await verifyToken(request);
//         if (!user) {
//             return NextResponse.json({
//                 message: "Authentication required"
//             }, { status: 401 });
//         }
//
//         // Fetch user's testimonials
//         const testimonials = await Testimonial.find({ user: user._id })
//             .populate('user', 'name lastName email pfp')
//             .sort({ createdAt: -1 });
//
//         return NextResponse.json({
//             message: "User testimonials fetched successfully",
//             testimonials,
//             count: testimonials.length
//         });
//
//     } catch (error) {
//         console.error("Error fetching user testimonials:", error);
//         return NextResponse.json({
//             message: "Internal server error",
//             error: error.message
//         }, { status: 500 });
//     }
// }

export async function GET(request) {
    try {
        await connectMongoDB();

        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        const testimonials = await Testimonial.find({ user: userId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            testimonials
        });

    } catch (error) {
        console.error('Get user testimonials error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}