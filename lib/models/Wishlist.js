// lib/models/wishlist.js
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, default: 0 },
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Wishlist || mongoose.model("wishlist", wishlistSchema);
