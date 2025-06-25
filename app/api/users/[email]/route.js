// app/api/users/[email]/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import User from '../../../../lib/models/User';

export async function GET(request, { params }) {
    try {
        await connectMongoDB();

        const { email } = params;
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(user, { status: 201 });
        } else {
            return NextResponse.json(null);
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json("something went wrong", { status: 500 });
    }
}

export async function PUT(request, { params }) {
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
        if (!decoded.user.admin) {
            return NextResponse.json({
                message: "You are not authorized!"
            }, { status: 403 });
        }

        const { email } = params;
        let user = await User.find({ email });

        if (user.length === 0) {
            user = await User.find({ name: email });
        }

        if (user.length > 0) {
            return NextResponse.json(user, { status: 201 });
        } else {
            return NextResponse.json(null);
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json("something went wrong", { status: 500 });
    }
}