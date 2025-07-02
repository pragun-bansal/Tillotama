// app/api/products/bestsellers/stats/route.js - Get bestseller statistics
export async function GET() {
    try {
        await connectMongoDB();

        const totalProducts = await Product.countDocuments();
        const bestsellerCount = await Product.countDocuments({ bestseller: true });
        const bestsellerPercentage = totalProducts > 0 ? ((bestsellerCount / totalProducts) * 100).toFixed(1) : 0;

        // Get top rated bestsellers
        const topRatedBestsellers = await Product.find({ bestseller: true })
            .sort({ rating: -1 })
            .limit(5)
            .select('name rating price');

        // Get newest bestsellers
        const newestBestsellers = await Product.find({ bestseller: true })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name createdAt price');

        const stats = {
            totalProducts,
            bestsellerCount,
            bestsellerPercentage: parseFloat(bestsellerPercentage),
            regularProducts: totalProducts - bestsellerCount,
            topRatedBestsellers,
            newestBestsellers
        };

        return NextResponse.json({
            message: "Bestseller statistics fetched successfully",
            data: stats
        });

    } catch (error) {
        console.error('Get bestseller stats error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}