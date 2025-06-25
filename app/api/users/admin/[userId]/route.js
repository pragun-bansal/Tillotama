// app/api/users/admin/[userId]/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import User from '../../../../../lib/models/User';
import { verifyToken } from '../../../../../lib/utils/auth';

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { token, action } = body; // action: 'make' or 'remove'
        const { userId } = params;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded.user.admin) {
            return NextResponse.json({
                message: "You are not authorized!"
            }, { status: 403 });
        }

        const adminStatus = action === 'make' ? true : false;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { admin: adminStatus },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user admin status:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
}