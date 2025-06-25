import connectMongoDB from '../../../lib/config/db';
import User from '../../../lib/models/User';
import { validPassword, issueJWT } from '../../../lib/utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectMongoDB();

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email or password not valid"
            });
        }

        const isValidPassword = await validPassword(password, user.hash);
        if (!isValidPassword) {
            return res.status(404).json({
                success: false,
                message: "Email or password not valid"
            });
        }

        const token = issueJWT(user);

        res.json({
            success: true,
            message: "Login Successful",
            user: user,
            token: token.token,
            expiresIn: token.expires,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error: " + error.message,
            success: false
        });
    }
}