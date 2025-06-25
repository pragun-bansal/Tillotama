// lib/models/Product.js
import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        all_images: [{ type: String, required: true }],
        category: [{ type: String, required: true }],
        tagline: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, default: 5 },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 0 },
        sizes: [{
            size: { type: String, required: true },
            price: { type: Number, required: true }
        }],
        colors: [{
            color: { type: String, required: true },
            price: { type: Number, required: true }
        }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
        offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
    },
    { timestamps: true }
);

// Pre hook to update rating when reviews change
productSchema.pre("save", async function (next) {
    const Review = mongoose.models.Review;
    if (Review && this.reviews.length > 0) {
        const reviewDocs = await Review.find({ _id: { $in: this.reviews } }).select("rating");

        if (reviewDocs.length === 0) {
            this.rating = 0;
        } else {
            const totalRating = reviewDocs.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviewDocs.length;
            this.rating = parseFloat(averageRating.toFixed(2));
        }
    }
    next();
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
