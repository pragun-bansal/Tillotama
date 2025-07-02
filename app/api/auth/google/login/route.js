//app/api/auth/google/login/page.jsx
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { email } = body;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const token = jwt.sign(
            { user: user },
            process.env.JWT_SECRET_KEY
        );

        return NextResponse.json({
            success: true,
            message: "Google Login Successful",
            user: user,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error: " + error.message,
            success: false
        }, { status: 500 });
    }
}