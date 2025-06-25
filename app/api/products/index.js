import connectMongoDB from '../../../lib/config/db';
import Product from '../../../lib/models/Product';

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'GET') {
        try {
            const products = await Product.find();
            return res.status(200).json({
                message: "Products Found Successfully",
                data: products
            });
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                message: "Products can't be fetched",
                error: err
            });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}