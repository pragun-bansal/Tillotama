// File: components/product/ProductDescription.jsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

import {  useAuth, useCartOperations, useWishlistOperations } from '@/hooks/redux';
import { addItemToCart } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { CareGuide, ReturnPolicy, Terms } from '@/components/product/InfoJSON';
import { LensDemo } from '@/components/product/LensDemo';
import {useDispatch} from "react-redux";

const ProductDescription = ({ product }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, token } = useAuth();
    const { isInCart } = useCartOperations();
    const { isInWishlist } = useWishlistOperations();

    // Local state
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [showColour, setShowColour] = useState(false);
    const [showLottie, setShowLottie] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Check if product is already in cart/wishlist
    const isProductInCart = isInCart(product._id);
    const isProductInWishlist = isInWishlist(product._id);

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

        if (isProductInCart) {
            toast.info("Product already in cart", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        try {
            // Dispatch Redux action
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
        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error("Failed to add to cart", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        }
    };

    const handleAddToWishlist = async () => {
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

        if (isProductInWishlist) {
            toast.info("Product already in wishlist", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        try {
            // Dispatch Redux action
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
        } catch (error) {
            console.error('Add to wishlist error:', error);
            toast.error("Failed to add to wishlist", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
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

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={isProductInCart}
                            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white w-full py-4 transition-colors ${
                                isProductInCart
                                    ? 'bg-lightpink cursor-not-allowed'
                                    : 'bg-pink hover:shadow hover:shadow-xl'
                            }`}
                        >
                            <svg className="mr-3 fill-[white]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                            </svg>
                            {isProductInCart ? 'Already in Cart' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={handleAddToWishlist}
                            disabled={isProductInWishlist}
                            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white w-full py-4 transition-colors ${
                                isProductInWishlist
                                    ? 'bg-lightpink cursor-not-allowed'
                                    : 'bg-pink hover:shadow hover:shadow-xl'
                            }`}
                        >
                            <svg className="mr-3 fill-[white]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                            </svg>
                            {isProductInWishlist ? 'Already in wishlist' : 'Add to wishlist'}
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