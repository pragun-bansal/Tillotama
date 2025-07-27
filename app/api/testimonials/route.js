//
// // app/api/testimonials/route.js - Create testimonial
// import { NextResponse } from 'next/server';
// import connectMongoDB from '@/lib/config/db';
// import Testimonial from '@/lib/models/Testimonial';
// import User from '@/lib/models/User';
// import { verifyToken } from '@/lib/utils/auth';
// import { uploadImageToCloudinary } from '@/lib/utils/cloudinaryUpload';
//
// export async function POST(request) {
//     try {
//         await connectMongoDB();
//
//         const formData = await request.formData();
//         const authHeader = request.headers.get('authorization');
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return null;
//         }
//
//         const token = authHeader.substring(7);
//         const name = formData.get('name');
//         const rating = parseInt(formData.get('rating'));
//         const content = formData.get('content');
//         const photo = formData.get('photo');
//
//         if (!token) {
//             return NextResponse.json({
//                 message: "Authentication required"
//             }, { status: 401 });
//         }
//
//         const decoded = verifyToken(token);
//         const userId = decoded.user._id;
//
//         // Check if user already has a testimonial
//         const existingTestimonial = await Testimonial.findOne({ user: userId });
//         if (existingTestimonial) {
//             return NextResponse.json({
//                 message: "You already have a testimonial. Please edit it instead."
//             }, { status: 400 });
//         }
//
//         // Create testimonial object
//         const testimonialData = {
//             user: userId,
//             name: name.trim(),
//             rating,
//             content: content.trim()
//         };
//
//         // Handle photo upload if provided
//         if (photo && photo.size > 0) {
//             const bytes = await photo.arrayBuffer();
//             const buffer = Buffer.from(bytes);
//
//             const folder = `testimonials/${userId}`;
//             const publicId = `testimonial_photo`;
//             const uploadResult = await uploadImageToCloudinary(buffer, folder, publicId);
//             testimonialData.photo = uploadResult.secure_url;
//         }
//
//         const testimonial = new Testimonial(testimonialData);
//         await testimonial.save();
//
//         // Populate user data
//         await testimonial.populate('user', 'name email');
//
//         // Add testimonial to user's testimonials array
//         await User.findByIdAndUpdate(userId, {
//             $push: { testimonials: testimonial._id }
//         });
//
//         return NextResponse.json({
//             message: "Testimonial created successfully",
//             testimonial
//         }, { status: 201 });
//
//     } catch (error) {
//         console.error('Create testimonial error:', error);
//         return NextResponse.json({
//             message: "Internal server error",
//             error: error.message
//         }, { status: 500 });
//     }
// }
// app/api/testimonials/route.js - Create testimonial
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/utils/auth';
import { uploadImageToCloudinary } from '@/lib/utils/cloudinaryUpload';

export async function POST(request) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
        const authHeader = request.headers.get('authorization');

        // Fixed: Return proper NextResponse instead of null
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const name = formData.get('name');
        const rating = parseInt(formData.get('rating'));
        const content = formData.get('content');
        const photo = formData.get('photo');

        if (!token) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);
        const userId = decoded.user._id;

        // Check if user already has a testimonial
        const existingTestimonial = await Testimonial.findOne({ user: userId });
        if (existingTestimonial) {
            return NextResponse.json({
                message: "You already have a testimonial. Please edit it instead."
            }, { status: 400 });
        }

        // Create testimonial object
        const testimonialData = {
            user: userId,
            name: name.trim(),
            rating,
            content: content.trim()
        };

        // Handle photo upload if provided
        if (photo && photo.size > 0) {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const folder = `testimonials/${userId}`;
            const publicId = `testimonial_photo`;
            const uploadResult = await uploadImageToCloudinary(buffer, folder, publicId);
            testimonialData.photo = uploadResult.secure_url;
        }

        const testimonial = new Testimonial(testimonialData);
        await testimonial.save();

        // Populate user data
        await testimonial.populate('user', 'name email');

        // Add testimonial to user's testimonials array
        await User.findByIdAndUpdate(userId, {
            $push: { testimonials: testimonial._id }
        });

        return NextResponse.json({
            message: "Testimonial created successfully",
            testimonial
        }, { status: 201 });

    } catch (error) {
        console.error('Create testimonial error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}