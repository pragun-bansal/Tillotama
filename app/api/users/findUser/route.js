// app/api/users/findUser/page.jsx
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/utils/auth';

export async function POST(request) {
    try {
        await connectMongoDB();

        const { token, searchTerm } = await request.json();

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

        // Search for users or return all users
        let users;
        if (searchTerm && searchTerm.trim() !== '') {
            // Search by specific criteria
            users = await User.find({
                $or: [
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { username: { $regex: searchTerm, $options: 'i' } },
                    { lastName: { $regex: searchTerm, $options: 'i' } }
                ]
            })
                .select('-password') // Exclude password field
                .sort({ createdAt: -1 }) // Sort by newest first
                .limit(100); // Limit results for performance
        } else {
            // Return all users if no search term
            users = await User.find({})
                .select('-password') // Exclude password field
                .sort({ createdAt: -1 }) // Sort by newest first
                .limit(100); // Limit for performance
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

// Also support PUT method for backward compatibility
export async function PUT(request) {
    return POST(request);
}