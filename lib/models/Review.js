// lib/models/Review.js
import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true, default: "" },
    rating: { type: Number, required: true, default: 5 },
    comment: { type: String, required: true, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
