
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCart } from "@/store/slices/cartSlice";
import { removeFromWishlist, fetchWishlistData } from "@/store/slices/wishlistSlice";
// import { Player, Controls } from '@lottiefiles/react-lottie-player';
import axios from "axios";

const WishlistPage = () => {
    // Updated selector to match current Redux state structure
    const wishlistState = useSelector((state) => state.wishlist);
    const userState = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const router = useRouter();

    // Get token from Redux state or localStorage
    const token = userState.token || (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const isAuthenticated = userState.isAuthenticated || !!token;

    const [show1, setshow1] = useState(true);
    const [showlottie, setshowlottie] = useState(false);
    const [show2, setshow2] = useState(true);
    const [show3, setshow3] = useState(true);

    // Fetch wishlist data on component mount
    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchWishlistData());
        }
    }, [dispatch, isAuthenticated, token]);

    // Handle removing item from wishlist
    const handleRemove = async (product) => {
        try {
            // Use the proper product ID structure
            const productId = product.productId?._id || product.productId;

            // Dispatch Redux action (this will handle the API call)
            await dispatch(removeFromWishlist(productId)).unwrap();

            console.log("Item removed from wishlist successfully");
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    // Handle adding item to cart
    const handleAddToCart = async (product) => {
        try {
            // Use the proper product ID structure
            const productId = product.productId?._id || product.productId;

            // Dispatch Redux action (this will handle the API call)
            await dispatch(addToCart({ productId, qty: 1 })).unwrap();

            // Show lottie animation
            setshowlottie(true);

            // Hide animation after 3 seconds
            setTimeout(() => {
                setshowlottie(false);
            }, 3000);

            console.log("Item added to cart successfully");
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    // Handle navigation to login
    const handleLoginRedirect = () => {
        router.push('/login');
    };

    // Handle navigation to products
    const handleProductsRedirect = () => {
        router.push('/products');
    };

    // Show loading state
    if (wishlistState.loading) {
        return (
            <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (wishlistState.error) {
        return (
            <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">Error: {wishlistState.error}</p>
                    <button
                        onClick={() => dispatch(fetchWishlistData())}
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">Please log in to view your wishlist</p>
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Lottie Animation Overlay */}
            {/*{showlottie && (*/}
            {/*    <div className="fixed z-50 md:left-[17vw] xl:left-[40vw] translate-y-[0vh]">*/}
            {/*        <Player*/}
            {/*            autoplay*/}
            {/*            loop*/}
            {/*            src="https://lottie.host/a32aa65f-d8fd-445b-917d-6e9cd0049c17/waCAyqiy9U.json"*/}
            {/*            style={{ height: '50vh' }}*/}
            {/*        >*/}
            {/*            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />*/}
            {/*        </Player*/}
            {/*    </div>*/}
            {/*)}*/}

            <div className="mx-auto w-full container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
                <div className="flex flex-col justify-start items-start">
                    {/* Breadcrumb */}
                    <div>
                        <Link href="/" className="text-sm leading-4 text-gray-600 hover:text-gray-800 transition-colors">
                            Home
                        </Link>
                    </div>

                    {/* Title */}
                    <div className="mt-3">
                        <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
                            Favourites
                        </h1>
                    </div>

                    {/* Item Count */}
                    <div className="mt-4">
                        <p className="text-2xl tracking-tight leading-6 text-gray-600">
                            {wishlistState.totalItems || wishlistState.items.length} {" "}
                            {(wishlistState.totalItems || wishlistState.items.length) === 1 ? "item" : "items"}
                        </p>
                    </div>

                    {/* Wishlist Items Grid */}
                    <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                        {wishlistState.items && wishlistState.items.length > 0 ? (
                            wishlistState.items.map((product, index) => {
                                // Handle different product data structures
                                const productData = product.productId?.productId || product.productId || product;
                                const productImages = productData?.all_images || [];
                                const productName = productData?.name || 'Unknown Product';
                                const productTagline = productData?.tagline || '';
                                const productPrice = productData?.price || 0;
                                const productId = productData?._id;

                                return (
                                    <div key={productId || index} className="flex flex-col">
                                        {/* Product Image */}
                                        <div className="relative">
                                            <img
                                                className="hidden lg:block w-full h-128 object-cover"
                                                src={productImages[0] || '/placeholder-image.jpg'}
                                                alt={productName}
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(product)}
                                                aria-label="Remove from wishlist"
                                                className="absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 p-1.5 bg-gray-800 text-white hover:text-gray-400 rounded transition-colors"
                                            >
                                                <svg className="fill-current" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Product Info */}
                                        <div className="mt-6 flex justify-between items-center">
                                            <div className="flex justify-center items-center">
                                                <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
                                                    {productName}
                                                </p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <button
                                                    aria-label="toggle details"
                                                    onClick={() => setshow1(!show1)}
                                                    className="hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400 rounded transition-colors"
                                                >
                                                    <svg className={`fill-stroke ${show1 ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <svg className={`fill-stroke ${show1 ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className={`flex-col justify-start items-start mt-4 ${show1 ? "flex mb-2" : "hidden"}`}>
                                            {/* Tagline */}
                                            {productTagline && (
                                                <div>
                                                    <p className="tracking-tight text-xs leading-3 text-gray-800">
                                                        {productTagline}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Additional product details */}
                                            {/*<div className="mt-2">*/}
                                            {/*    <p className="tracking-tight text-base font-medium leading-4 text-gray-800">*/}
                                            {/*        {productData?.colors?.[0] || 'One colors'}*/}
                                            {/*    </p>*/}
                                            {/*</div>*/}

                                            {/*<div className="mt-6">*/}
                                            {/*    <p className="tracking-tight text-base font-medium leading-4 text-gray-800">*/}
                                            {/*        {productData?.sizes?.[0] || 'One size'}*/}
                                            {/*    </p>*/}
                                            {/*</div>*/}

                                            {/* Price */}
                                            <div className="mt-6">
                                                <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                                                    ₹{productPrice.toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Stock Status */}
                                            {productData?.stock !== undefined && (
                                                <div className="mt-2">
                                                    <p className={`tracking-tight text-sm leading-3 ${productData.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {productData.stock > 0 ? `${productData.stock} in stock` : 'Out of stock'}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                                <div className="w-full">
                                                    <Link
                                                        href={`/product/${productId}`}
                                                        className="block text-center focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 bg-white border border-gray-800 rounded transition-colors"
                                                    >
                                                        More information
                                                    </Link>
                                                </div>
                                                <div className="w-full">
                                                    <button
                                                        onClick={() => handleAddToCart(product)}
                                                        disabled={wishlistState.loading || (productData?.stock === 0)}
                                                        className="focus:outline-none focus:ring-pink focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-pink bg-lightpink border border-lightpink disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                                                    >
                                                        {wishlistState.loading ? 'Adding...' :
                                                            productData?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            // Empty wishlist state
                            <div className="col-span-full text-center py-20">
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                                <p className="text-gray-600 mb-6">Save items you love to your wishlist and shop them later.</p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 transition-colors"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;