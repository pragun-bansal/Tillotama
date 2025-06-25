// lib/models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, default: 0 },
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);