// app/api/users/getUser/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import User from '../../../../lib/models/User';
import { verifyToken } from '../../../../lib/utils/auth';

export async function PUT(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err) {
        console.log(err);
        return NextResponse.json("something went wrong", { status: 500 });
    }
}