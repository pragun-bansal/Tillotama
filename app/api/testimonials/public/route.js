// app/api/testimonials/public/page.jsx
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import {verifyToken} from "@/lib/utils/auth";

// // GET /api/testimonials/public - Fetch approved and published testimonials
// export async function GET(request) {
//     try {
//         await connectMongoDB();
//
//         const { searchParams } = new URL(request.url);
//         const page = parseInt(searchParams.get('page')) || 1;
//         const limit = parseInt(searchParams.get('limit')) || 10;
//         const featured = searchParams.get('featured') === 'true';
//         const skip = (page - 1) * limit;
//
//         // Base query - only approved and published testimonials
//         let query = {
//             isApproved: true,
//             isPublished: true
//         };
//
//         // If requesting featured testimonials
//         if (featured) {
//             query.featured = true;
//         }
//
//         // Fetch testimonials
//         const testimonials = await Testimonial.find(query)
//             .populate('user', 'name lastName pfp')
//             .sort({
//                 ...(featured ? { featured: -1 } : {}),
//                 createdAt: -1
//             })
//             .skip(skip)
//             .limit(limit);
//
//         const totalCount = await Testimonial.countDocuments(query);
//         const totalPages = Math.ceil(totalCount / limit);
//
//         // Calculate average rating
//         const allApprovedTestimonials = await Testimonial.find({
//             isApproved: true,
//             isPublished: true
//         }).select('rating');
//
//         const averageRating = allApprovedTestimonials.length > 0
//             ? allApprovedTestimonials.reduce((sum, t) => sum + t.rating, 0) / allApprovedTestimonials.length
//             : 0;
//
//         // Calculate rating distribution
//         const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//         allApprovedTestimonials.forEach(testimonial => {
//             ratingDistribution[testimonial.rating]++;
//         });
//
//         return NextResponse.json({
//             message: "Public testimonials fetched successfully",
//             testimonials,
//             statistics: {
//                 totalTestimonials: allApprovedTestimonials.length,
//                 averageRating: Math.round(averageRating * 100) / 100,
//                 ratingDistribution
//             },
//             pagination: {
//                 currentPage: page,
//                 totalPages,
//                 totalCount,
//                 hasNextPage: page < totalPages,
//                 hasPreviousPage: page > 1,
//                 limit
//             },
//             featured
//         });
//
//     } catch (error) {
//         console.error("Error fetching public testimonials:", error);
//         return NextResponse.json({
//             message: "Internal server error",
//             error: error.message
//         }, { status: 500 });
//     }
// }
// app/api/testimonials/public/route.js - Get public testimonials
export async function GET(request) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const featured = searchParams.get('featured') === 'true';

        const skip = (page - 1) * limit;

        let query = { isApproved: true, isPublished: true };
        if (featured) {
            query.featured = true;
        }

        const testimonials = await Testimonial.find(query)
            .populate('user', 'name email')
            .sort({ featured: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCount = await Testimonial.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        const pagination = {
            currentPage: page,
            totalPages,
            totalCount,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        };

        return NextResponse.json({
            testimonials,
            pagination,
            featured
        });

    } catch (error) {
        console.error('Get public testimonials error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}