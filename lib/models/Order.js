// lib/models/Order.js
import mongoose from 'mongoose';

const trackingEventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    transaction_number: { type: String },
    location: { type: String, required: true },
    event_description: { type: String, required: true }
}, { _id: false });

const trackingDataSchema = new mongoose.Schema({
    consignment_no: { type: String },
    due_date: { type: String },
    current_status: { type: String, required: true },
    tracking_events: [trackingEventSchema]
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tracking_id: {
        type: String,
        required: true,
        trim: true
    },
    recipient_name: {
        type: String,
        required: true,
        trim: true
    },
    recipient_location: {
        type: String,
        required: true,
        trim: true
    },
    courier_service: {
        type: String,
        enum: ['trackon', 'shree_tirupati'],
        required: true,
        default: 'trackon'
    },
    status: {
        type: String,
        enum: ['pending', 'tracking', 'delivered', 'error'],
        default: 'pending'
    },
    current_status: {
        type: String,
        trim: true
    },
    tracking_data: trackingDataSchema,

    // Additional order details
    order_value: {
        type: Number,
        default: 0
    },
    order_notes: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },

    // Tracking metadata
    last_tracked: {
        type: Date
    },
    tracking_attempts: {
        type: Number,
        default: 0
    },
    auto_track: {
        type: Boolean,
        default: true
    },

    // Delivery details
    expected_delivery: {
        type: Date
    },
    actual_delivery: {
        type: Date
    },
    delivery_notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});

// Index for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ tracking_id: 1, courier_service: 1 });
orderSchema.index({ status: 1, courier_service: 1 });
orderSchema.index({ user: 1, status: 1 });

// Virtual for formatted tracking ID
orderSchema.virtual('displayTrackingId').get(function() {
    return `${this.courier_service.toUpperCase()}-${this.tracking_id}`;
});

// Virtual for delivery status
orderSchema.virtual('deliveryStatus').get(function() {
    if (this.status === 'delivered') {
        return this.actual_delivery ? 'Delivered' : 'Marked as Delivered';
    }
    if (this.expected_delivery) {
        const now = new Date();
        const expected = new Date(this.expected_delivery);
        if (now > expected && this.status !== 'delivered') {
            return 'Delayed';
        }
        return 'On Time';
    }
    return 'Unknown';
});

// Virtual for days since order
orderSchema.virtual('daysSinceOrder').get(function() {
    const now = new Date();
    const created = new Date(this.createdAt);
    const diffInMs = now - created;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
});

// Virtual for formatted recipient info
orderSchema.virtual('recipientInfo').get(function() {
    return `${this.recipient_name} - ${this.recipient_location}`;
});

// Instance method to update tracking status
orderSchema.methods.updateTrackingStatus = function(trackingData) {
    this.tracking_data = trackingData;
    this.current_status = trackingData.current_status;
    this.last_tracked = new Date();
    this.tracking_attempts += 1;

    // Auto-determine status based on tracking data
    if (trackingData.current_status) {
        const statusLower = trackingData.current_status.toLowerCase();
        console.log(statusLower)
        if(statusLower.includes("undelivered") || statusLower.includes("pending")) {
            this.status = 'pending';
        }
        else if (statusLower.includes('delivered') || statusLower.includes('completed')) {
            this.status = 'delivered';
            if (!this.actual_delivery) {
                this.actual_delivery = new Date();
            }
        } else if (statusLower.includes('error') || statusLower.includes('failed')) {
            this.status = 'error';
        } else {
            this.status = 'tracking';
        }
    }

    return this.save();
};

// Instance method to mark as delivered
orderSchema.methods.markAsDelivered = function(deliveryNotes = '') {
    this.status = 'delivered';
    this.actual_delivery = new Date();
    this.delivery_notes = deliveryNotes;
    return this.save();
};

// Static method to get user orders with filters
orderSchema.statics.getUserOrders = function(userId, filters = {}) {
    const query = { user: userId };

    // Apply filters
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.courier_service) {
        query.courier_service = filters.courier_service;
    }
    if (filters.search) {
        query.$or = [
            { tracking_id: { $regex: filters.search, $options: 'i' } },
            { recipient_name: { $regex: filters.search, $options: 'i' } },
            { recipient_location: { $regex: filters.search, $options: 'i' } }
        ];
    }
    if (filters.priority) {
        query.priority = filters.priority;
    }

    // Date range filters
    if (filters.dateFrom || filters.dateTo) {
        query.createdAt = {};
        if (filters.dateFrom) {
            query.createdAt.$gte = new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
            query.createdAt.$lte = new Date(filters.dateTo);
        }
    }

    return this.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
};

// Static method to get orders requiring tracking
orderSchema.statics.getOrdersForTracking = function(courierService = null) {
    const query = {
        status: { $in: ['pending', 'tracking'] },
        auto_track: true
    };

    if (courierService) {
        query.courier_service = courierService;
    }

    // Only track orders that haven't been tracked recently (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    query.$or = [
        { last_tracked: { $exists: false } },
        { last_tracked: { $lt: thirtyMinutesAgo } }
    ];

    return this.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = function(userId = null) {
   const matchStage = userId ? { user: new mongoose.Types.ObjectId(userId) } : {};

    return this.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                pendingOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                },
                trackingOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'tracking'] }, 1, 0] }
                },
                deliveredOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
                },
                errorOrders: {
                    $sum: { $cond: [{ $eq: ['$status', 'error'] }, 1, 0] }
                },
                trackonOrders: {
                    $sum: { $cond: [{ $eq: ['$courier_service', 'trackon'] }, 1, 0] }
                },
                shreeTirupatiOrders: {
                    $sum: { $cond: [{ $eq: ['$courier_service', 'shree_tirupati'] }, 1, 0] }
                },
                averageDeliveryTime: {
                    $avg: {
                        $cond: [
                            { $and: [{ $ne: ['$actual_delivery', null] }, { $ne: ['$createdAt', null] }] },
                            { $divide: [{ $subtract: ['$actual_delivery', '$createdAt'] }, 24 * 60 * 60 * 1000] },
                            null
                        ]
                    }
                }
            }
        }
    ]);
};

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);