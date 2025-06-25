// lib/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    pfp: { type: String, default: "https://i.ibb.co/LNchwvr/5794329.jpg" },
    admin: { type: Boolean, default: false },
    hash: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    town: { type: String },
    city: { type: String },
    pinCode: { type: String },
    phoneNumber: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);