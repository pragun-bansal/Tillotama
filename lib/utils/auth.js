// lib/utils/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Validates password against hash
 */
export const validPassword = async (password, hash) => {
    try {
        const validatePassword = await bcrypt.compare(password, hash);
        return validatePassword;
    } catch (err) {
        console.log(err);
        return false;
    }
};

/**
 * Generates hash from password
 */
export const genPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return { hash: hashedPassword };
};

/**
 * Issues JWT token
 */
export const issueJWT = (user) => {
    const expiresIn = "30d";
    const payload = { user: user };

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn,
    });

    return { token: signedToken, expires: expiresIn };
};

/**
 * Verifies JWT token
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid token');
    }
};