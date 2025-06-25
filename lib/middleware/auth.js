// lib/middleware/auth.js
import { verifyToken } from '../utils/auth';
import User from '../models/User';
import connectMongoDB from '../config/db';

/**
 * Middleware to verify user authentication
 */
export const requireAuth = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }

        const decoded = verifyToken(token);

        await connectMongoDB();
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid!" });
    }
};

/**
 * Middleware to verify admin authentication
 */
export const requireAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }

        const decoded = verifyToken(token);

        await connectMongoDB();
        const user = await User.findById(decoded.user._id);

        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        if (!user.admin) {
            return res.status(404).json({ message: "You are not authorized to access this page" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid!" });
    }
};

/**
 * Helper function to run middleware in Next.js API routes
 */
export const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};