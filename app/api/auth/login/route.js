//app/api/auth/login/page.jsx
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import User from '../../../../lib/models/User';
import { validPassword, issueJWT } from '../../../../lib/utils/auth';
import { validateLoginInput } from '../../../../lib/utils/validation';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { errors, isValid } = validateLoginInput(body);

        if (!isValid) {
            return NextResponse.json(errors, { status: 400 });
        }

        const { email, password } = body;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Email or password not valid"
            }, { status: 404 });
        }

        const isValidPassword = await validPassword(password, user.hash);
        if (!isValidPassword) {
            return NextResponse.json({
                success: false,
                message: "Email or password not valid"
            }, { status: 404 });
        }

        const token = issueJWT(user);

        return NextResponse.json({
            success: true,
            message: "Login Successful",
            user: user,
            token: token.token,
            expiresIn: token.expires,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error: " + error.message,
            success: false
        }, { status: 500 });
    }
}