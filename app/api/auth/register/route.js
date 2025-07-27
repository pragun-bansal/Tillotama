//app/api/auth/register/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import User from '../../../../lib/models/User';
import { genPassword, issueJWT } from '../../../../lib/utils/auth';
import { validateRegisterInput } from '../../../../lib/utils/Validation';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { errors, isValid } = validateRegisterInput(body);

        if (!isValid) {
            return NextResponse.json(errors, { status: 400 });
        }

        const { username, email, password } = body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists with this email"
            }, { status: 400 });
        }

        // Generate password hash
        const { hash } = await genPassword(password);

        // Create new user
        const user = new User({
            name: username,
            email: email,
            hash: hash,
        });

        const registeredUser = await user.save();

        // Issue JWT token
        const token = issueJWT(registeredUser);

        return NextResponse.json({
            success: true,
            message: "Registration Successful",
            user: registeredUser,
            token: token.token,
            expiresIn: token.expires,
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error: " + error.message,
            success: false
        }, { status: 500 });
    }
}