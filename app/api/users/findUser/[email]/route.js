// app/api/users/findUser/[email]/route.js
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db'; // Adjust path as needed
import User from '@/lib/models/User'; // Adjust path as needed
import { verifyToken } from '@/lib/utils/auth'; // Add this import

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { token } = await request.json();
        const { email } = params;

        // Check if token exists
        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        // Verify the token
        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            return NextResponse.json({
                message: "Invalid token!"
            }, { status: 403 });
        }

        // Check if user is admin
        if (!decoded.user.admin) {
            return NextResponse.json({
                message: "You are not authorized!"
            }, { status: 403 });
        }

        // Search for users
        let users;
        if (email && email !== 'undefined' && email.trim() !== '') {
            // Search by specific criteria
            users = await User.find({
                $or: [
                    { email: { $regex: email, $options: 'i' } },
                    { name: { $regex: email, $options: 'i' } },
                    { username: { $regex: email, $options: 'i' } }
                ]
            }).select('-password'); // Exclude password field
        } else {
            // Return all users if no search term
            users = await User.find({}).select('-password').limit(50); // Limit for performance
        }

        return NextResponse.json(users, { status: 200 });

    } catch (error) {
        console.error('Error in findUser API:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}