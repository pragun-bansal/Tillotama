// // lib/models/Product.js
// import mongoose from 'mongoose';
// import Review from './Review';
//
//
// const productSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         all_images: [{ type: String, required: true }],
//         category: [{ type: String, required: true }],
//         tagline: { type: String, required: true },
//         description: { type: String, required: true },
//         rating: { type: Number, required: true, default: 5 },
//         price: { type: Number, required: true, default: 0 },
//         stock: { type: Number, required: true, default: 0 },
//         sizes: [{
//             size: { type: String, required: true },
//             price: { type: Number, required: true }
//         }],
//         colors: [{
//             color: { type: String, required: true },
//             price: { type: Number, required: true }
//         }],
//         reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
//         offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
//     },
//     { timestamps: true }
// );
//
// // Pre hook to update rating when reviews change
// productSchema.pre("save", async function (next) {
//     const Review = mongoose.models.Review;
//     if (Review && this.reviews.length > 0) {
//         const reviewDocs = await Review.find({ _id: { $in: this.reviews } }).select("rating");
//
//         if (reviewDocs.length === 0) {
//             this.rating = 0;
//         } else {
//             const totalRating = reviewDocs.reduce((sum, review) => sum + review.rating, 0);
//             const averageRating = totalRating / reviewDocs.length;
//             this.rating = parseFloat(averageRating.toFixed(2));
//         }
//     }
//     next();
// });
//
// export default mongoose.models.Product || mongoose.model("Product", productSchema);

// lib/models/Product.js - Updated with bestseller field
import mongoose from 'mongoose';
import Review from './Review';

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

        // New bestseller field
        bestseller: {
            type: Boolean,
            default: false,
            index: true // Add index for better query performance
        }
    },
    { timestamps: true }
);

// Index for bestseller products query optimization
productSchema.index({ bestseller: 1, createdAt: -1 });
productSchema.index({ bestseller: 1, rating: -1 });

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

// Virtual for bestseller status display
productSchema.virtual('bestsellerStatus').get(function() {
    return this.bestseller ? 'Bestseller' : 'Regular';
});

// Virtual for product metrics (useful for admin)
productSchema.virtual('metrics').get(function() {
    return {
        hasReviews: this.reviews.length > 0,
        reviewCount: this.reviews.length,
        inStock: this.stock > 0,
        lowStock: this.stock > 0 && this.stock <= 10,
        outOfStock: this.stock === 0,
        highRated: this.rating >= 4,
        isBestseller: this.bestseller
    };
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Static methods for bestseller management
productSchema.statics.getBestsellers = function(limit = 10) {
    return this.find({ bestseller: true })
        .sort({ rating: -1, createdAt: -1 })
        .limit(limit);
};

productSchema.statics.getBestsellerCount = function() {
    return this.countDocuments({ bestseller: true });
};

productSchema.statics.toggleBestseller = async function(productId, isBestseller) {
    return this.findByIdAndUpdate(
        productId,
        { bestseller: isBestseller },
        { new: true }
    );
};

export default mongoose.models.Product || mongoose.model("Product", productSchema);