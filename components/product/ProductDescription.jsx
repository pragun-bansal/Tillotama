// File: components/product/ProductDescription.jsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

import {  useAuth, useCartOperations, useWishlistOperations } from '@/hooks/redux';
import { addItemToCart, updateCartItemQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { CareGuide, ReturnPolicy, Terms } from '@/components/product/InfoJSON';
import { LensDemo } from '@/components/product/LensDemo';
import {useDispatch} from "react-redux";

const ProductDescription = ({ product }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useAuth();
    const { isInCart, getItemQuantity } = useCartOperations();
    const { isInWishlist } = useWishlistOperations();

    // Local state
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [showColour, setShowColour] = useState(false);
    const [showLottie, setShowLottie] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isUpdatingCart, setIsUpdatingCart] = useState(false);
    const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

    // Check if product is already in cart/wishlist
    const isProductInCart = isInCart(product._id);
    const isProductInWishlist = isInWishlist(product._id);
    const cartItemQuantity = getItemQuantity(product._id);
    const isMaxQuantity = isProductInCart && cartItemQuantity >= product.stock;

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to continue", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        // Check stock availability
        if (product.stock <= 0) {
            toast.error("Product is out of stock");
            return;
        }

        // Check if adding one more would exceed stock
        if (isProductInCart && cartItemQuantity >= product.stock) {
            toast.error(`Only ${product.stock} items available in stock`);
            return;
        }

        setIsUpdatingCart(true);
        try {
            if (isProductInCart) {
                // If item is already in cart, increase quantity by 1
                await dispatch(updateCartItemQuantity({
                    productId: product._id,
                    qty: cartItemQuantity + 1
                })).unwrap();

                toast.success(`Quantity updated to ${cartItemQuantity + 1}`, {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                // If item is not in cart, add it with quantity 1
                await dispatch(addItemToCart({
                    productId: product._id,
                    qty: 1
                })).unwrap();

                setShowLottie(true);
                setTimeout(() => {
                    setShowLottie(false);
                }, 3000);

                toast.success("Added to cart!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error("Failed to update cart", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        } finally {
            setIsUpdatingCart(false);
        }
    };

    // Handle decrease quantity
    const handleDecreaseQuantity = async () => {
        if (!isProductInCart || cartItemQuantity <= 0) return;

        setIsUpdatingCart(true);
        try {
            if (cartItemQuantity === 1) {
                // Remove from cart if quantity would become 0
                await dispatch(removeFromCart(product._id)).unwrap();
                toast.success("Removed from cart", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                // Decrease quantity by 1
                await dispatch(updateCartItemQuantity({
                    productId: product._id,
                    qty: cartItemQuantity - 1
                })).unwrap();

                toast.success(`Quantity updated to ${cartItemQuantity - 1}`, {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.error("Failed to update cart");
        } finally {
            setIsUpdatingCart(false);
        }
    };

    const handleWishlistToggle = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to continue", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        setIsUpdatingWishlist(true);
        try {
            if (isProductInWishlist) {
                // Remove from wishlist
                await dispatch(removeFromWishlist(product._id)).unwrap();
                toast.success("Removed from wishlist!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                // Add to wishlist
                await dispatch(addToWishlist({
                    productId: product._id,
                    qty: 1
                })).unwrap();

                setShowLottie(true);
                setTimeout(() => {
                    setShowLottie(false);
                }, 3000);

                toast.success("Added to wishlist!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            toast.error("Failed to update wishlist", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        } finally {
            setIsUpdatingWishlist(false);
        }
    };

    // // Mock color options - you can replace with actual product colors
    // const colorOptions = [
    //     { name: 'Blue', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Blue_crocheting_thread.jpg' },
    //     { name: 'Red', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Blue_crocheting_thread.jpg' },
    //     { name: 'Green', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Blue_crocheting_thread.jpg' },
    //     { name: 'Yellow', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Blue_crocheting_thread.jpg' },
    //     { name: 'Purple', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Blue_crocheting_thread.jpg' },
    // ];

    return (
        <div>


            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">



                {/* Desktop Image Carousel */}
                <div className="xl:w-2/5 lg:w-2/5 w-80 md:block hidden">
                    {product.all_images && product.all_images.length > 0 ? (
                        <Carousel
                            autoPlay={true}
                            interval={3000}
                            infiniteLoop={true}
                            showStatus={false}
                            showThumbs={true}
                            thumbWidth={100}
                            dynamicHeight={false}
                            className="w-[100%] h-[100vh] md:h-[70vh] xl:h-[100vh] mb-[30px] align-middle object-scale-down"
                        >
                            {product.all_images.map((image, index) => (
                                <div key={index} className="align-middle py-auto">
                                    <LensDemo image={image} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>

                {/* Mobile Image Carousel */}
                <div className="md:hidden">
                    {product.all_images && product.all_images.length > 0 ? (
                        <Carousel
                            autoPlay={true}
                            interval={3000}
                            infiniteLoop={true}
                            showStatus={false}
                            showThumbs={true}
                            thumbWidth={60} // Smaller thumbs for mobile
                            dynamicHeight={false}
                            className="w-[100%] h-[35vh] align-middle object-scale-down"
                        >
                            {product.all_images.map((image, index) => (
                                <div key={index} className="align-middle py-auto">
                                    <LensDemo image={image} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>


                {/* Product Details */}
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 md:overflow-y-auto md:h-[70vh] xl:h-[100vh]">
                    {/* Product Title */}
                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-sm leading-none text-gray-600">{product.tagline}</p>
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                            {product.name}
                        </h1>
                    </div>

                    {/* Color Selection */}
                    <div onClick={() => setShowColour(!showColour)} className="py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer">
                        <p className="text-base leading-4 text-gray-800">Colour</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600 mr-3">Available Colors</p>
                            <button
                                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                aria-label="show or hide"
                            >
                                <svg className={`transform ${showColour ? "rotate-180" : "rotate-0"}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Color Options */}
                    <div className={`pt-4 text-base leading-normal pr-12 mb-4 w-[100%] text-gray-600 ${showColour ? "block" : "hidden"}`}>
                        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {product.colors.map((color, index) => (
                                <button key={index} className="grid grid-rows-2 gap-2">
                                    <Image
                                        src={color.image}
                                        alt={color.name}
                                        width={80}
                                        height={60}
                                        className="shadow-lg h-[7vh] lg:h-[10vh] w-full object-cover rounded"
                                    />
                                    <span className="text-sm text-center">{color.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                        ₹{product.price?.toLocaleString()}
                    </h1>

                    {/* Cart Quantity Display */}
                    {isProductInCart && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-green-600 font-medium flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.432-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                    </svg>
                                    {cartItemQuantity} in cart
                                </div>
                                {isMaxQuantity && (
                                    <span className="text-xs text-orange-600 font-medium">
                                        Max quantity reached
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        {isProductInCart ? (
                            /* Quantity Controls for items in cart */
                            <div className="flex items-center space-x-2 w-full">
                                <button
                                    onClick={handleDecreaseQuantity}
                                    disabled={isUpdatingCart}
                                    className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                                    aria-label="Decrease quantity"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>

                                <span className="flex-1 text-center font-medium text-gray-900 bg-gray-50 py-3 rounded-md text-lg">
                                    {cartItemQuantity}
                                </span>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isUpdatingCart || isMaxQuantity || product.stock <= 0 || !isAuthenticated}
                                    className={`flex items-center justify-center w-12 h-12 rounded-md transition-colors ${
                                        isMaxQuantity || product.stock <= 0
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-pink text-white hover:bg-pink-700'
                                    } ${isUpdatingCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    aria-label="Increase quantity"
                                >
                                    {isUpdatingCart ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        ) : (
                            /* Add to Cart Button */
                            <button
                                onClick={handleAddToCart}
                                disabled={isUpdatingCart || product.stock <= 0 || !isAuthenticated}
                                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white w-full py-4 transition-colors ${
                                    product.stock <= 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-pink hover:shadow hover:shadow-xl'
                                } ${isUpdatingCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUpdatingCart ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Adding...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="mr-3 fill-[white]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                        </svg>
                                        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </>
                                )}
                            </button>
                        )}

                        <button
                            onClick={handleWishlistToggle}
                            disabled={isUpdatingWishlist}
                            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white w-full py-4 transition-colors bg-pink hover:shadow hover:shadow-xl ${
                                isUpdatingWishlist ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isUpdatingWishlist ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    {isProductInWishlist ? 'Removing...' : 'Adding...'}
                                </div>
                            ) : (
                                <>
                                    <svg className="mr-3 fill-[white]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                        {isProductInWishlist ? (
                                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L502.6 300.4c53.6-50 54.6-133.1 2-184.6-52.7-51.6-137.6-51.6-190.3 0l-2.3 2.2-2.3-2.2c-52.7-51.6-137.6-51.6-190.3 0-52.6 51.5-51.6 134.6 2 184.6z"/>
                                        ) : (
                                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                        )}
                                    </svg>
                                    {isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Product Description */}
                    <div className="mt-6">
                        <p className="text-base leading-normal text-gray-600">
                            {product.description}
                        </p>
                    </div>

                    {/* Expandable Sections */}

                    {/* Care Guide */}
                    <div className="border-t border-b py-4 mt-7 border-gray-200">
                        <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">CARE GUIDE / SHIPPING INFO</p>
                            <button
                                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                aria-label="show or hide"
                            >
                                <svg className={`transform ${show ? "rotate-180" : "rotate-0"}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${show ? "block" : "hidden"}`}>
                            <div>
                                <ol>
                                    {CareGuide.map((item, index) => (
                                        <div key={index}>
                                            <li className="font-medium">{item.title}</li>
                                            <ul className="list-disc ml-8">
                                                {item.list.map((listItem, idx) => (
                                                    <li key={idx}>{listItem}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Return Policy */}
                    <div className="border-b py-4 border-gray-200">
                        <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">RETURN/EXCHANGE POLICIES</p>
                            <button
                                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                aria-label="show or hide"
                            >
                                <svg className={`transform ${show2 ? "rotate-180" : "rotate-0"}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${show2 ? "block" : "hidden"}`}>
                            {ReturnPolicy.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>

                    {/* Terms of Shopping */}
                    <div className="border-b py-4 border-gray-200">
                        <div onClick={() => setShow3(!show3)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">TERMS OF SHOPPING</p>
                            <button
                                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                                aria-label="show or hide"
                            >
                                <svg className={`transform ${show3 ? "rotate-180" : "rotate-0"}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={`pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ${show3 ? "block" : "hidden"}`}>
                            {Terms.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;