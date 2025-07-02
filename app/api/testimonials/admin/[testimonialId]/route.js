// app/api/testimonials/admin/[testimonialId]/route.js - Admin actions on testimonials
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import { verifyToken } from '@/lib/utils/auth';
import User from '@/lib/models/User';




export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { testimonialId } = params;
        const body = await request.json();
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7);
        const { action, value } = body; // action: 'approve', 'feature', 'publish'

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

        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            return NextResponse.json({
                message: "Testimonial not found"
            }, { status: 404 });
        }

        // Update based on action
        switch (action) {
            case 'approve':
                testimonial.isApproved = value;
                break;
            case 'feature':
                testimonial.featured = value;
                break;
            case 'publish':
                testimonial.isPublished = value;
                break;
            default:
                return NextResponse.json({
                    message: "Invalid action"
                }, { status: 400 });
        }

        await testimonial.save();
        await testimonial.populate('user', 'name email pfp');

        return NextResponse.json({
            message: `Testimonial ${action}d successfully`,
            testimonial
        });

    } catch (error) {
        console.error('Admin update testimonial error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectMongoDB();

        const { testimonialId } =await  params;
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
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

        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            return NextResponse.json({
                message: "Testimonial not found"
            }, { status: 404 });
        }

        // Remove from user's testimonials array
        await User.findByIdAndUpdate(testimonial.user, {
            $pull: { testimonials: testimonialId }
        });

        // Delete the testimonial
        await Testimonial.findByIdAndDelete(testimonialId);

        return NextResponse.json({
            message: "Testimonial deleted successfully"
        });

    } catch (error) {
        console.error('Admin delete testimonial error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}