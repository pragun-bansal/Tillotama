// lib/models/Testimonial.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 1000
    },
    photo: {
        type: String,
        default: null // URL to uploaded photo
    },
    isApproved: {
        type: Boolean,
        default: false // Admin approval system
    },
    isPublished: {
        type: Boolean,
        default: false // User can unpublish their own testimonial
    },
    featured: {
        type: Boolean,
        default: false // Admin can feature testimonials
    }
}, {
    timestamps: true,
});

// Index for better query performance
testimonialSchema.index({ user: 1, createdAt: -1 });
testimonialSchema.index({ isApproved: 1, isPublished: 1, featured: -1, createdAt: -1 });

// Virtual for formatted date
testimonialSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Ensure virtual fields are serialized
testimonialSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);