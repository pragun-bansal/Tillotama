// lib/models/Threads.js
import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
});

export default mongoose.models.Threads || mongoose.model("Threads", threadSchema);