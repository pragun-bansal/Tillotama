// app/api/testimonials/[testimonialId]/page.jsx
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/config/db';
import Testimonial from '@/lib/models/Testimonial';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { uploadImageToCloudinary ,deleteImageFromCloudinary, extractPublicIdFromUrl } from '@/lib/utils/cloudinaryUpload';
// import { deleteImageFromCloudinary, extractPublicIdFromUrl } from '@/lib/utils/cloudinaryUpload';

// Helper function to verify JWT token
async function verifyToken(request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        await connectMongoDB();
        const user = await User.findById(decoded.user._id);

        return user;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

// GET /api/testimonials/[testimonialId] - Get specific testimonial
export async function GET(request, { params }) {
    try {
        await connectMongoDB();

        const { testimonialId } = await params;
        const user = await verifyToken(request);

        const testimonial = await Testimonial.findById(testimonialId)
            .populate('user', 'name lastName email pfp');

        if (!testimonial) {
            return NextResponse.json({
                message: "Testimonial not found"
            }, { status: 404 });
        }

        // Check permissions
        if (!user) {
            // Public can only see approved and published testimonials
            if (!testimonial.isApproved || !testimonial.isPublished) {
                return NextResponse.json({
                    message: "Testimonial not found"
                }, { status: 404 });
            }
        } else if (!user.admin && testimonial.user._id.toString() !== user._id.toString()) {
            // Non-admin users can only see their own testimonials or approved public ones
            if (!testimonial.isApproved || !testimonial.isPublished) {
                return NextResponse.json({
                    message: "Testimonial not found"
                }, { status: 404 });
            }
        }

        return NextResponse.json({
            message: "Testimonial fetched successfully",
            testimonial
        });

    } catch (error) {
        console.error("Error fetching testimonial:", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}

// // PUT /api/testimonials/[testimonialId] - Update testimonial
// export async function PUT(request, { params }) {
//     try {
//         await connectMongoDB();
//
//         const { testimonialId } = await params;
//         const user = await verifyToken(request);
//
//         if (!user) {
//             return NextResponse.json({
//                 message: "Authentication required"
//             }, { status: 401 });
//         }
//
//         // Find testimonial
//         const testimonial = await Testimonial.findById(testimonialId);
//         if (!testimonial) {
//             return NextResponse.json({
//                 message: "Testimonial not found"
//             }, { status: 404 });
//         }
//
//         // Check permissions - only owner or admin can update
//         if (!user.admin && testimonial.user.toString() !== user._id.toString()) {
//             return NextResponse.json({
//                 message: "Unauthorized to update this testimonial"
//             }, { status: 403 });
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
//         // Update testimonial fields
//         testimonial.name = name.trim();
//         testimonial.rating = rating;
//         testimonial.content = content.trim();
//
//         // If updated by user (not admin), reset approval status
//         if (!user.admin) {
//             testimonial.isApproved = false;
//         }
//
//         // Handle photo upload if provided
//         if (photo && photo.size > 0) {
//             try {
//                 const bytes = await photo.arrayBuffer();
//                 const buffer = Buffer.from(bytes);
//
//                 const folder = `testimonials/${testimonial.user}`;
//                 const publicId = `testimonial_${Date.now()}`;
//
//                 const uploadResult = await uploadImageToCloudinary(buffer, folder, publicId);
//                 testimonial.photo = uploadResult.secure_url;
//             } catch (uploadError) {
//                 console.error('Photo upload error:', uploadError);
//                 return NextResponse.json({
//                     message: "Failed to upload photo"
//                 }, { status: 500 });
//             }
//         }
//
//         await testimonial.save();
//
//         // Populate user data for response
//         await testimonial.populate('user', 'name lastName email pfp');
//
//         return NextResponse.json({
//             message: user.admin ?
//                 "Testimonial updated successfully" :
//                 "Testimonial updated successfully. It will be visible after admin approval.",
//             testimonial
//         });
//
//     } catch (error) {
//         console.error("Error updating testimonial:", error);
//         return NextResponse.json({
//             message: "Internal server error",
//             error: error.message
//         }, { status: 500 });
//     }
// }

// PUT /api/testimonials/[testimonialId] - Update testimonial
export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { testimonialId } = await params;
        const user = await verifyToken(request);

        if (!user) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        // Find testimonial
        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            return NextResponse.json({
                message: "Testimonial not found"
            }, { status: 404 });
        }

        // Check permissions - only owner or admin can update
        if (!user.admin && testimonial.user.toString() !== user._id.toString()) {
            return NextResponse.json({
                message: "Unauthorized to update this testimonial"
            }, { status: 403 });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const rating = parseInt(formData.get('rating'));
        const content = formData.get('content');
        const photo = formData.get('photo');
        const removePhoto = formData.get('removePhoto'); // New field to indicate photo removal

        // Validation
        if (!name || !content || !rating) {
            return NextResponse.json({
                message: "Name, content, and rating are required"
            }, { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({
                message: "Rating must be between 1 and 5"
            }, { status: 400 });
        }

        if (content.length < 10 || content.length > 1000) {
            return NextResponse.json({
                message: "Content must be between 10 and 1000 characters"
            }, { status: 400 });
        }

        // Store old photo URL for potential cleanup
        const oldPhotoUrl = testimonial.photo;

        // Update testimonial fields
        testimonial.name = name.trim();
        testimonial.rating = rating;
        testimonial.content = content.trim();

        // If updated by user (not admin), reset approval status
        if (!user.admin) {
            testimonial.isApproved = false;
        }

        // Handle photo removal
        if (removePhoto === 'true') {
            console.log('🗑️ Removing photo from testimonial:', testimonialId);

            // Delete old photo from Cloudinary if it exists
            if (oldPhotoUrl) {
                try {
                    const oldPublicId = extractPublicIdFromUrl(oldPhotoUrl);
                    if (oldPublicId) {
                        await deleteImageFromCloudinary(oldPublicId);
                        console.log('🗑️ Old photo deleted from Cloudinary:', oldPublicId);
                    }
                } catch (deleteError) {
                    console.error('⚠️ Failed to delete old photo from Cloudinary:', deleteError);
                    // Continue execution - don't fail the entire update if photo deletion fails
                }
            }

            // Remove photo URL from testimonial
            testimonial.photo = null;
        }
        // Handle new photo upload
        else if (photo && photo.size > 0) {
            try {
                console.log('📸 Uploading new photo for testimonial:', testimonialId);

                const bytes = await photo.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const folder = `testimonials/${testimonial.user}`;
                const publicId = `testimonial_${Date.now()}`;

                const uploadResult = await uploadImageToCloudinary(buffer, folder, publicId);

                // Delete old photo from Cloudinary if it exists and is different from new one
                if (oldPhotoUrl && oldPhotoUrl !== uploadResult.secure_url) {
                    try {
                        const oldPublicId = extractPublicIdFromUrl(oldPhotoUrl);
                        if (oldPublicId) {
                            await deleteImageFromCloudinary(oldPublicId);
                            console.log('🗑️ Old photo replaced and deleted from Cloudinary:', oldPublicId);
                        }
                    } catch (deleteError) {
                        console.error('⚠️ Failed to delete old photo from Cloudinary:', deleteError);
                        // Continue execution - don't fail the entire update if old photo deletion fails
                    }
                }

                testimonial.photo = uploadResult.secure_url;
                console.log('✅ New photo uploaded successfully:', uploadResult.secure_url);

            } catch (uploadError) {
                console.error('❌ Photo upload error:', uploadError);
                return NextResponse.json({
                    message: "Failed to upload photo"
                }, { status: 500 });
            }
        }
        // If no new photo and no removal request, keep existing photo
        // (no action needed - photo field remains unchanged)

        await testimonial.save();

        // Populate user data for response
        await testimonial.populate('user', 'name lastName email pfp');

        return NextResponse.json({
            message: user.admin ?
                "Testimonial updated successfully" :
                "Testimonial updated successfully. It will be visible after admin approval.",
            testimonial
        });

    } catch (error) {
        console.error("Error updating testimonial:", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}

// DELETE /api/testimonials/[testimonialId] - Delete testimonial
export async function DELETE(request, { params }) {
    try {
        await connectMongoDB();

        const { testimonialId } = await params;
        const user = await verifyToken(request);

        if (!user) {
            return NextResponse.json({
                message: "Authentication required"
            }, { status: 401 });
        }

        // Find testimonial
        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            return NextResponse.json({
                message: "Testimonial not found"
            }, { status: 404 });
        }

        // Check permissions - only owner or admin can delete
        if (!user.admin && testimonial.user.toString() !== user._id.toString()) {
            return NextResponse.json({
                message: "Unauthorized to delete this testimonial"
            }, { status: 403 });
        }

        // Remove testimonial from user's testimonials array
        await User.findByIdAndUpdate(testimonial.user, {
            $pull: { testimonials: testimonialId }
        });

        // Delete testimonial
        await Testimonial.findByIdAndDelete(testimonialId);

        return NextResponse.json({
            message: "Testimonial deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}