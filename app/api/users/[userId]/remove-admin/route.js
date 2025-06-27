// app/api/users/[userId]/remove-admin/route.js
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/utils/auth';

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { token } = await request.json();
        const { userId } = params;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            return NextResponse.json({
                message: "Invalid token!"
            }, { status: 403 });
        }

        if (!decoded.user.admin) {
            return NextResponse.json({
                message: "You are not authorized!"
            }, { status: 403 });
        }

        // Prevent admin from removing their own admin privileges
        if (decoded.user._id === userId) {
            return NextResponse.json({
                message: "You cannot remove admin privileges from yourself!"
            }, { status: 400 });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { admin: false },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json({
                message: "User not found!"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Admin privileges removed successfully",
            user
        }, { status: 200 });

    } catch (error) {
        console.error('Error in remove-admin API:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}

