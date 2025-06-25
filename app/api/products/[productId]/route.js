//app/api/products/[productId]/route.js
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/config/db';
import Product from '../../../../lib/models/Product';

export async function GET(request, { params }) {
    try {
        await connectMongoDB();

        const { productId } = params;

        const product = await Product.findOne({ _id: productId }).populate({
            path: "reviews",
            populate: { path: "user" },
        });

        if (!product) {
            return NextResponse.json({
                message: "No Product found",
                data: {}
            }, { status: 204 });
        }

        return NextResponse.json({
            message: "Product Found Successfully",
            data: product
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Product can't be fetched",
            error: err.message
        }, { status: 404 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();

        const { productId } = params;
        const formData = await request.formData();
        const images = formData.getAll('all_images');

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                message: "Product not found"
            }, { status: 404 });
        }

        // Update fields
        product.name = formData.get('name');
        product.category = JSON.parse(formData.get('category')).map(cat => cat.toLowerCase());
        product.tagline = formData.get('tagline');
        product.description = formData.get('description');
        product.price = formData.get('price');
        product.stock = formData.get('stock');
        product.sizes = JSON.parse(formData.get('sizes') || '[]');
        product.colors = JSON.parse(formData.get('colors') || '[]');

        // Handle new images
        if (images && images.length > 0) {
            const newImageUrls = await Promise.all(
                images.map(async (image, index) => {
                    const bytes = await image.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    const folder = `products/${product._id}`;
                    const publicId = `image_${index}`;
                    return uploadImageToCloudinary(buffer, folder, publicId);
                })
            );
            product.all_images = newImageUrls.map(img => img.secure_url);
        }

        await product.save();
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error editing product:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
}