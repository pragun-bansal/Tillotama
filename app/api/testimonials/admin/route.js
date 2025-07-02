import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import {verifyToken} from "@/lib/utils/auth";
import User from '@/lib/models/User';

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

        // Check if user is admin
        const user = await User.findById(decoded.user._id);
        if (!user || !user.admin) {
            return NextResponse.json({
                message: "Admin access required"
            }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const status = searchParams.get('status'); // 'pending', 'approved', 'all'
        const featured = searchParams.get('featured');

        const skip = (page - 1) * limit;

        let query = {};
        if (status === 'pending') {
            query.isApproved = false;
        } else if (status === 'approved') {
            query.isApproved = true;
        }

        if (featured === 'true') {
            query.featured = true;
        } else if (featured === 'false') {
            query.featured = false;
        }

        const testimonials = await Testimonial.find(query)
            .populate('user', 'name email pfp')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCount = await Testimonial.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        // Get counts for different statuses
        const counts = {
            all: await Testimonial.countDocuments(),
            pending: await Testimonial.countDocuments({ isApproved: false }),
            approved: await Testimonial.countDocuments({ isApproved: true }),
            featured: await Testimonial.countDocuments({ featured: true })
        };

        const pagination = {
            currentPage: page,
            totalPages,
            totalCount,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        };

        return NextResponse.json({
            testimonials,
            pagination,
            counts
        });

    } catch (error) {
        console.error('Admin get testimonials error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}