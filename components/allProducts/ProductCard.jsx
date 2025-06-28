
// File: components/ProductCard.js
"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist, removeFromWishlist, toggleWishlistItem } from "@/store/slices/wishlistSlice";
import {toast} from "react-toastify";

const ProductCard = ({ product,showTagline=false ,showRating=false,onQuickView }) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    // Get Redux state
    const cartState = useSelector((state) => state.cart);
    const wishlistState = useSelector((state) => state.wishlist);
    const userState = useSelector((state) => state.user);

    // Get token for authentication
    const token = userState.token || (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const isAuthenticated = userState.isAuthenticated || !!token;

    // Fallback image if product images fail to load
    const fallbackImage = "/images/placeholder-product.jpg";

    // Get primary and hover images
    const primaryImage = product.all_images?.[0] || product.main_image1 || product.image || fallbackImage;
    const hoverImage = product.all_images?.[1] || product.main_image2 || primaryImage;

    // Check if product is in cart
    const isInCart = useMemo(() => {
        return cartState.items?.some(item => {
            const itemProductId = item.productId?._id || item.productId;
            return itemProductId === product._id;
        });
    }, [cartState.items, product._id]);

    // Check if product is in wishlist
    const isInWishlist = useMemo(() => {
        return wishlistState.items?.some(item => {
            const itemProductId = item.productId?._id || item.productId;
            return itemProductId === product._id;
        });
    }, [wishlistState.items, product._id]);

    // Get cart item quantity if exists
    const cartItemQuantity = useMemo(() => {
        const cartItem = cartState.items?.find(item => {
            const itemProductId = item.productId?._id || item.productId;
            return itemProductId === product._id;
        });
        return cartItem?.qty || 0;
    }, [cartState.items, product._id]);

    // Handle add to cart
    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            alert("Please log in to add items to cart");
            return;
        }

        if (product.stock <= 0) {
            alert("Product is out of stock");
            return;
        }

        setIsAddingToCart(true);
        try {
            await dispatch(addToCart({
                productId: product._id,
                qty: 1
            })).unwrap();

            console.log('Added to cart:', product._id);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert("Failed to add to cart. Please try again.");
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Handle wishlist toggle
    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            alert("Please log in to add items to wishlist");
            return;
        }

        setIsAddingToWishlist(true);
        try {
            if (isInWishlist) {
                await dispatch(removeFromWishlist(product._id)).unwrap();
                console.log('Removed from wishlist:', product._id);
                toast.success("Removed From wishlist!", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else {
                await dispatch(addToWishlist({
                    productId: product._id,
                    qty: 1
                })).unwrap();
                console.log('Added to wishlist:', product._id);
                toast.success("Added to wishlist!", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert("Failed to update wishlist. Please try again.");
            toast.error("Failed to add to wishlist", {
                position: "top-right",
                autoClose: 2000,
            });
        } finally {
            setIsAddingToWishlist(false);
        }
    };

    // Handle quick view
    // const handleQuickView = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     if (onQuickView) {
    //         onQuickView(product);
    //     } else {
    //         console.log('Quick view:', product._id);
    //         // You can implement a modal or navigate to product page here
    //     }
    // };

    // Calculate discount percentage
    const discountPercentage = useMemo(() => {
        if (product.originalPrice && product.originalPrice > product.price) {
            return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        }
        return 0;
    }, [product.originalPrice, product.price]);

    return (
        <Link href={`/product/${product._id || product.id}`} className="group">
            <div className="relative flex flex-col bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl h-full">
                {/* Product Image */}
                <div
                    className="relative aspect-square h-64 md:h-auto overflow-hidden bg-gray-100"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <Image
                        src={hover && hoverImage !== primaryImage ? hoverImage : primaryImage}
                        alt={product.description || product.name || "Product image"}
                        fill
                        className="object-cover transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImageError(true)}
                    />

                    {/* Wishlist Button */}
                    <button
                        className={`absolute top-3 right-3 z-10 rounded-full h-6 w-6 md:h-10 md:w-10 p-1 md:p-2 shadow-md transition-all duration-200 group/wishlist ${
                            isInWishlist
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                        } ${isAddingToWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleWishlistToggle}
                        // disabled={isAddingToWishlist}
                        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        {isAddingToWishlist ? (
                            <div className="w-full h-full border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        ) : (
                            <svg
                                className={`w-full h-full transition-colors duration-200 ${
                                    isInWishlist
                                        ? 'fill-white'
                                        : 'fill-gray-400 group-hover/wishlist:fill-red-500'
                                }`}
                                viewBox="0 0 18 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
                                    strokeWidth="2"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Sale Badge */}
                    {discountPercentage > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {discountPercentage}% OFF
                        </div>
                    )}

                    {/* New Badge */}
                    {product.isNew && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                        </div>
                    )}

                    {/* Stock Badge */}
                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                        </div>
                    )}

                    {/* Low Stock Badge */}
                    {product.stock > 0 && product.stock <= 5 && (
                        <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Only {product.stock} left!
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow p-4">
                    {/* Product Name */}
                    <div className="flex justify-between mb-0">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-0.5 md:mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                    </h3>
                        {/* Rating */}
                        {(product.rating || product.averageRating) && (
                            <div className="hidden md:flex mb-auto items-center">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.round(product.rating || product.averageRating)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-xs text-gray-600">
                                ({(product.rating || product.averageRating).toFixed(1)})
                            </span>
                                {product.totalReviews && (
                                    <span className="ml-1 text-xs text-gray-500">
                                    ({product.totalReviews} reviews)
                                </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tagline */}
                    {product.tagline && showTagline && (
                        <p className="hidden md:block text-xs text-gray-600 mb-0 line-clamp-1">
                            {product.tagline}
                        </p>
                    )}



                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm md:text-md font-semibold text-gray-900">
                                ₹{product.price?.toLocaleString()}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Discount Percentage */}
                        {discountPercentage > 0 && (
                            <span className="text-xs font-medium text-green-600">
                                {discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                    {/* Rating */}
                    {(product.rating || product.averageRating) && showRating &&(
                        <div className="block md:hidden flex items-center mb-0">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.round(product.rating || product.averageRating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-600">
                                ({(product.rating || product.averageRating).toFixed(1)})
                            </span>
                            {product.totalReviews && (
                                <span className="ml-1 text-xs text-gray-500">
                                    ({product.totalReviews} reviews)
                                </span>
                            )}
                        </div>
                    )}

                    {/* Cart Quantity Display */}
                    {isInCart && (
                        <div className="hidden md:block mt-2 text-xs text-green-600 font-medium">
                            ✓ {cartItemQuantity} in cart
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="mt-3 flex space-x-2 mt-auto">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart || product.stock <= 0 || !isAuthenticated||isInCart}
                            className={`flex-1 text-sm font-medium py-2 px-3 rounded-md transition-all duration-200 ${
                                product.stock <= 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : isInCart
                                        ? 'bg-lightpink text-white disabled:'
                                        : 'bg-pink text-white hover:bg-pink-700'
                            } ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAddingToCart ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Adding...
                                </div>
                            ) : product.stock <= 0 ? (

                                'Out of Stock'
                            ) : isInCart ? (
                                `Already in Cart (${cartItemQuantity})`
                            ) : (
                                'Add to Cart'
                            )}
                        </button>

                        {/*<button*/}
                        {/*    onClick={handleQuickView}*/}
                        {/*    className="bg-gray-200 text-gray-800 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-300 transition-colors duration-200"*/}
                        {/*>*/}
                        {/*    Quick View*/}
                        {/*</button>*/}
                    </div>

                    {/* Authentication Required Message */}
                    {!isAuthenticated && (
                        <p className="mt-2 text-xs text-gray-500 text-center">
                            <Link href="/login" className="text-pink-600 hover:underline">
                                Log in
                            </Link> to add to cart or wishlist
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;