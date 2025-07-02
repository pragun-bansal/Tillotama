// app/api/products/bestsellers/route.js - Get bestseller products
export async function GET(request) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const sort = searchParams.get('sort') || 'rating'; // rating, createdAt, name, price

        const skip = (page - 1) * limit;

        let sortQuery = {};
        switch (sort) {
            case 'rating':
                sortQuery = { rating: -1, createdAt: -1 };
                break;
            case 'newest':
                sortQuery = { createdAt: -1 };
                break;
            case 'oldest':
                sortQuery = { createdAt: 1 };
                break;
            case 'name':
                sortQuery = { name: 1 };
                break;
            case 'price-low':
                sortQuery = { price: 1 };
                break;
            case 'price-high':
                sortQuery = { price: -1 };
                break;
            default:
                sortQuery = { rating: -1, createdAt: -1 };
        }

        const bestsellers = await Product.find({ bestseller: true })
            .populate('reviews')
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const totalCount = await Product.countDocuments({ bestseller: true });
        const totalPages = Math.ceil(totalCount / limit);

        const pagination = {
            currentPage: page,
            totalPages,
            totalCount,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        };

        return NextResponse.json({
            message: "Bestsellers fetched successfully",
            data: bestsellers,
            pagination
        });

    } catch (error) {
        console.error('Get bestsellers error:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}