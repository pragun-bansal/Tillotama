// app/api/users/profile/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import User from '../../../../lib/models/User';
import { verifyToken } from '../../../../lib/utils/auth';
import { uploadImageToCloudinary } from '../../../../lib/utils/cloudinaryUpload';

export async function POST(request) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
        const token = formData.get('token');
        const profilePic = formData.get('profilePic');

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        if (!profilePic) {
            return NextResponse.json({
                error: 'No file uploaded'
            }, { status: 400 });
        }

        const bytes = await profilePic.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const folder = `user_pfps/${userId}`;
        const publicId = `profile_pic`;
        const result = await uploadImageToCloudinary(buffer, folder, publicId);

        const user = await User.findById(userId);
        user.pfp = result.secure_url;
        await user.save();

        return NextResponse.json({ filePath: result.secure_url });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'Error uploading profile picture'
        }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectMongoDB();

        const body = await request.json();
        const { token, name, lastName, username, addressLine1, addressLine2, town, city, pinCode, phoneNumber, email, gender } = body;

        if (!token) {
            return NextResponse.json({
                message: "You are not authenticated!"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: name.toLowerCase(),
                lastName: lastName.toLowerCase(),
                username: username.toLowerCase(),
                addressLine1,
                addressLine2,
                town,
                city,
                pinCode,
                phoneNumber,
                email,
                gender
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user details:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
}
