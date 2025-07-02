// // app/api/testimonials/page.jsx
// import { NextRequest, NextResponse } from 'next/server';
// import connectMongoDB from '@/lib/config/db';
// import Testimonial from '@/lib/models/Testimonial';
// import User from '@/lib/models/User';
// import jwt from 'jsonwebtoken';
// import { uploadImageToCloudinary } from '@/lib/utils/cloudinaryUpload';
//
// // Helper function to verify JWT token
// async function verifyToken(request) {
//     try {
//         const authHeader = request.headers.get('authorization');
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return null;
//         }
//
//         const token = authHeader.substring(7);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         await connectMongoDB();
//         const user = await User.findById(decoded.user._id);
//
//         return user;
//     } catch (error) {
//         console.error('Token verification error:', error);
//         return null;
//     }
// }
//
// // GET /api/testimonials - Fetch all testimonials (admin only) or user's own testimonials
// export async function GET(request) {
//     try {
//         await connectMongoDB();
//
//         const user = await verifyToken(request);
//         const { searchParams } = new URL(request.url);
//         const page = parseInt(searchParams.get('page')) || 1;
//         const limit = parseInt(searchParams.get('limit')) || 10;
//         const skip = (page - 1) * limit;
//
//         let query = {};
//         let testimonials;
//         let totalCount;
//
//         if (user && user.admin) {
//             // Admin can see all testimonials
//             const status = searchParams.get('status'); // 'approved', 'pending', 'all'
//
//             if (status === 'approved') {
//                 query.isApproved = true;
//             } else if (status === 'pending') {
//                 query.isApproved = false;
//             }
//             // 'all' or no status means no additional filter
//
//             testimonials = await Testimonial.find(query)
//                 .populate('user', 'name lastName email pfp')
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(limit);
//
//             totalCount = await Testimonial.countDocuments(query);
//         } else if (user) {
//             // Regular user can only see their own testimonials
//             query.user = user._id;
//
//             testimonials = await Testimonial.find(query)
//                 .populate('user', 'name lastName email pfp')
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(limit);
//
//             totalCount = await Testimonial.countDocuments(query);
//         } else {
//             return NextResponse.json({
//                 message: "Authentication required"
//             }, { status: 401 });
//         }
//
//         const totalPages = Math.ceil(totalCount / limit);
//
//         return NextResponse.json({
//             message: "Testimonials fetched successfully",
//             testimonials,
//             pagination: {
//                 currentPage: page,
//                 totalPages,
//                 totalCount,
//                 hasNextPage: page < totalPages,
//                 hasPreviousPage: page > 1,
//                 limit
//             }
//         });
//
//     } catch (error) {
//         console.error("Error fetching testimonials:", error);
//         return NextResponse.json({
//             message: "Internal server error",
//             error: error.message
//         }, { status: 500 });
//     }
// }
//
// // POST /api/testimonials - Create new testimonial
// export async function POST(request) {
//     try {
//         await connectMongoDB();
//
//         const user = await verifyToken(request);
//         if (!user) {
//             return NextResponse.json({
//                 message: "Authentication required"
//             }, { status: 401 });
//         }
//
//         // Check if user already has a testimonial
//         const existingTestimonial = await Testimonial.findOne({ user: user._id });
//         if (existingTestimonial) {
//             return NextResponse.json({
//                 message: "You already have a testimonial. Please edit your existing one."
//             }, { status: 409 });
//         }
//
//         const formData = await request.formData();
//         const name = formData.get('name');
//         const rating = parseInt(formData.get('rating'));
//         const content = formData.get('content');
//         const photo = formData.get('photo');
//
//         // Validation
//         if (!name || !content || !rating) {
//             return NextResponse.json({
//                 message: "Name, content, and rating are required"
//             }, { status: 400 });
//         }
//
//         if (rating < 1 || rating > 5) {
//             return NextResponse.json({
//                 message: "Rating must be between 1 and 5"
//             }, { status: 400 });
//         }
//
//         if (content.length < 10 || content.length > 1000) {
//             return NextResponse.json({
//                 message: "Content must be between 10 and 1000 characters"
//             }, { status: 400 });
//         }
//
//         // Create testimonial object
//         const testimonialData = {
//             user: user._id,
//             name: name.trim(),
//             rating,
//             content: content.trim(),
//             isApproved: false, // Requires admin approval
//             isPublished: true
//         };
//
//         // Handle photo upload if provided
//         if (photo && photo.size > 0) {
//             try {
//                 const bytes = await photo.arrayBuffer();
//                 const buffer = Buffer.from(bytes);
//
//                 const folder = `testimonials/${user._id}`;
//                 const publicId = `testimonial_${Date.now()}`;
//
//                 const uploadResult = await uploadImageToCloudinary(buffer, folder, publicId);
//                 testimonialData.photo = uploadResult.secure_url;
//             } catch (uploadError) {
//                 console.error('Photo upload error:', uploadError);
//                 return NextResponse.json({
//                     message: "Failed to upload photo"
//                 }, { status: 500 });
//             }
//         }
//
//         // Create testimonial
//         const testimonial = new Testimonial(testimonialData);
//         await testimonial.save();
//
//         // Add testimonial to user's testimonials array
//         await User.findByIdAndUpdate(user._id, {
//             $push: { testimonials: testimonial._id }
//         });
//
//         // Populate user data for response
//         await testimonial.populate('user', 'name lastName email pfp');
//
//         return NextResponse.json({
//             message: "Testimonial created successfully. It will be visible after admin approval.",
//             testimonial
//         }, { status: 201 });
//
//     } catch (error) {
//         console.error("Error creating testimonial:", error);
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
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
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