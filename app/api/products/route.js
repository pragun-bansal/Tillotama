//app/api/products/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/config/db';
import Product from '../../../lib/models/Product';
import { runMiddleware, requireAuth } from '../../../lib/middleware/auth';
import { runMulterMiddleware, uploadMiddleware } from '../../../lib/utils/fileUpload';
import { uploadImageToCloudinary } from '../../../lib/utils/cloudinaryUpload';

export async function GET() {
    try {
        await connectMongoDB();

        const products = await Product.find();
        return NextResponse.json({
            message: "product Found Successfully",
            data: products
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "product can't be fetched",
            error: err.message
        }, { status: 404 });
    }
}

export async function POST(request) {
    try {
        await connectMongoDB();

        // Handle file upload
        const formData = await request.formData();
        const images = formData.getAll('all_images');

        const productData = {
            name: formData.get('name'),
            category: JSON.parse(formData.get('category')).map(cat => cat.toLowerCase()),
            tagline: formData.get('tagline'),
            description: formData.get('description'),
            price: formData.get('price'),
            stock: formData.get('stock'),
            sizes: JSON.parse(formData.get('sizes') || '[]'),
            colors: JSON.parse(formData.get('colors') || '[]'),
        };

        const product = new Product(productData);

        if (images && images.length > 0) {
            const imageUrls = await Promise.all(
                images.map(async (image, index) => {
                    const bytes = await image.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    const folder = `products/${product._id}`;
                    const publicId = `image_${index}`;
                    return uploadImageToCloudinary(buffer, folder, publicId);
                })
            );
            product.all_images = imageUrls.map(result => result.secure_url);
        }

        await product.save();
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
}