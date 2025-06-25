//app/api/auth/google/register/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../lib/config/db';
import User from '../../../../../lib/models/User';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { name, email, profile } = body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomstring.generate(10), salt);

        const newUser = new User({
            name: name.toLowerCase(),
            hash: hashedPassword,
            email: email,
            pfp: profile,
        });

        await newUser.save();

        const token = jwt.sign(
            { user: newUser },
            process.env.JWT_SECRET_KEY
        );

        return NextResponse.json({
            success: true,
            message: "Google Registration Successful",
            user: newUser,
            token: token,
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error: " + error.message,
            success: false
        }, { status: 500 });
    }
}