// app/api/reviewimport { NextRequest, NextResponse } from 'next/server';
// import connectMongoDB from '../../../../lib/config/db';
// import Product from '../../../../lib/models/Product';
// import Reviews from '../../../../lib/models/Reviews';
// import { verifyToken } from '../../../../lib/utils/auth';
//
// export async function POST(request) {
//     try {
//         await connectMongoDB();
//
//         const body = await request.json();
//         const { productId, reviewId, token } = body;
//
//         if (!token) {
//             return NextResponse.json({
//                 message: "You are not authenticated!"
//             }, { status: 401 });
//         }
//
//         const decoded = verifyToken(token);
//
//         let product = await Product.findOne({ _id: productId });
//         if (!product) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Product not found",
//             }, { status: 404 });
//         }
//
//         const deletedR = await Reviews.deleteOne({ _id: reviewId });
//         const data = await product.save();
//
//         return NextResponse.json({
//             success: true,
//             data,
//             message: "Review Deleted Successfully"
//         });
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({
//             success: false,
//             message: "Error in Deleting Review",
//             error: err.message
//         }, { status: 404 });
//     }
// }s/delete/route.js