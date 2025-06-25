// lib/models/Offers.js
import mongoose from 'mongoose';

const offerSchema = mongoose.Schema({
    offer: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.models.Offer || mongoose.model("Offer", offerSchema);
