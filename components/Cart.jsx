"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    fetchCartData,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
    updateCartItemQuantity
} from "@/store/slices/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";

const Cart = ({ show, setShow }) => {
    const cartState = useSelector((state) => state.cart);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    // Get token from Redux state or localStorage
    const token = userState.token || (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const isAuthenticated = userState.isAuthenticated || !!token;

    // Fetch cart data on component mount
    useEffect(() => {
        if (isAuthenticated && token) {
            dispatch(fetchCartData());
        }
    }, [dispatch, isAuthenticated, token]);

    // Handle increasing item quantity
    const handleIncrease = async (product) => {
        try {
            const productId = product.productId?._id || product.productId;
            const newQty = product.qty + 1;

            // Update Redux state immediately for better UX
            dispatch(increaseItemQuantity({ productId }));

            // Update quantity on server
            await dispatch(updateCartItemQuantity({ productId, qty: newQty })).unwrap();

            console.log("Item quantity increased successfully");
        } catch (error) {
            console.error("Error increasing item quantity:", error);
            // Optionally revert the optimistic update on error
        }
    };

    // Handle decreasing item quantity
    const handleDecrease = async (product) => {
        try {
            const productId = product.productId?._id || product.productId;

            if (product.qty > 1) {
                const newQty = product.qty - 1;

                // Update Redux state immediately
                dispatch(decreaseItemQuantity({ productId }));

                // Update quantity on server
                await dispatch(updateCartItemQuantity({ productId, qty: newQty })).unwrap();

                console.log("Item quantity decreased successfully");
            } else {
                // Remove item completely if quantity is 1
                await handleRemove(product);
            }
        } catch (error) {
            console.error("Error decreasing item quantity:", error);
        }
    };

    // Handle removing item from cart
    const handleRemove = async (product) => {
        try {
            const productId = product.productId?._id || product.productId;

            // Dispatch Redux action (this will handle the API call)
            await dispatch(removeFromCart(productId)).unwrap();

            console.log("Item removed from cart successfully");
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    // Handle adding item to wishlist
    const handleAddToWishlist = async (product) => {
        try {
            const productId = product.productId?._id || product.productId;

            // Dispatch Redux action (this will handle the API call)
            await dispatch(addToWishlist({ productId, qty: 1 })).unwrap();

            console.log("Item added to wishlist successfully");
        } catch (error) {
            console.error("Error adding item to wishlist:", error);
        }
    };

    // Handle checkout navigation
    const handleCheckout = () => {
        setShow(false);
        router.push('/checkout');
    };

    // Calculate totals
    const subtotal = cartState.totalCost || 0;
    const shipping = subtotal < 3000 ? 120 : 0;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    return (
        <>
            <div>
                {show && (
                    <div className="w-full h-full z-70 bg-black/50 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                        <div className="w-full absolute right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                            <div className="flex md:flex-row flex-col justify-end" id="cart">
                                {/* Cart Items Section */}
                                <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                    {/* Header */}
                                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer transition-colors" onClick={() => setShow(!show)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="text-sm pl-2 leading-none">Back</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Cart</p>
                                        {cartState.loading && (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                                        )}
                                    </div>

                                    {/* Loading State */}
                                    {cartState.loading && cartState.items.length === 0 ? (
                                        <div className="mt-20 text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                                            <p className="mt-4 text-gray-600">Loading your cart...</p>
                                        </div>
                                    ) : cartState.error ? (
                                        // Error State
                                        <div className="mt-20 text-center">
                                            <p className="text-red-600 mb-4">Error: {cartState.error}</p>
                                            <button
                                                onClick={() => dispatch(fetchCartData())}
                                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    ) : cartState.items && cartState.items.length > 0 ? (
                                        // Cart Items
                                        cartState.items.map((product, index) => {
                                            const productData = product.productId || product;
                                            const productImages = productData?.all_images || [];
                                            const productName = productData?.name || 'Unknown Product';
                                            const productTagline = productData?.tagline || '';
                                            const productPrice = productData?.price || 0;
                                            const productId = productData?._id;
                                            const productDescription = productData?.description || '';

                                            return (
                                                <div key={productId || index} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                                    {/* Product Image */}
                                                    <div className="w-1/4 cursor-pointer" onClick={() => setShow(false)}>
                                                        <Link href={`/products/${productId}`}>
                                                            <img
                                                                src={productImages[0] || '/placeholder-image.jpg'}
                                                                alt={productName}
                                                                className="w-full h-full object-center object-cover rounded-lg hover:opacity-80 transition-opacity"
                                                                onError={(e) => {
                                                                    e.target.src = '/placeholder-image.jpg';
                                                                }}
                                                            />
                                                        </Link>
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="md:pl-3 md:w-3/4">
                                                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{productTagline}</p>

                                                        <div className="flex items-center justify-between w-full pt-1">
                                                            <p className="text-base font-black leading-none text-gray-800">{productName}</p>

                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center border border-gray-200 rounded mr-6">
                                                                <button
                                                                    onClick={() => handleDecrease(product)}
                                                                    className="p-2 hover:bg-gray-100 transition-colors rounded-l"
                                                                    disabled={cartState.loading}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                                                    </svg>
                                                                </button>

                                                                <span className="px-4 py-2 border-l border-r border-gray-200 min-w-[3rem] text-center">
                                                                    {product.qty}
                                                                </span>

                                                                <button
                                                                    onClick={() => handleIncrease(product)}
                                                                    className="p-2 hover:bg-gray-100 transition-colors rounded-r"
                                                                    disabled={cartState.loading}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Product Description */}
                                                        {productDescription && (
                                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{productDescription}</p>
                                                        )}

                                                        {/* Actions and Price */}
                                                        <div className="flex items-center justify-between pt-5 pr-6">
                                                            <div className="flex items-center space-x-4">
                                                                <button
                                                                    onClick={() => handleAddToWishlist(product)}
                                                                    className="text-xs leading-3 underline text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
                                                                    disabled={cartState.loading}
                                                                >
                                                                    Add to wishlist
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRemove(product)}
                                                                    className="text-xs leading-3 underline text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                                                                    disabled={cartState.loading}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                            <p className="text-base font-black leading-none text-gray-800">
                                                                ₹{(productPrice * product.qty).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        // Empty Cart
                                        <div className="mt-20 text-center">
                                            <div className="text-gray-400 mb-4">
                                                <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5L12 8m0 0l3-3m-3 3L9 5" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                            <p className="text-gray-600 mb-6">Add some products to get started.</p>
                                            <button
                                                onClick={() => {
                                                    setShow(false);
                                                    router.push('/products');
                                                }}
                                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 transition-colors"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Summary Section - Only show if cart has items */}
                                {cartState.items && cartState.items.length > 0 && (
                                    <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                                        <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                            <div>
                                                <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>

                                                {/* Subtotal */}
                                                <div className="flex items-center justify-between pt-16">
                                                    <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                    <p className="text-base leading-none text-gray-800">₹{subtotal.toLocaleString()}</p>
                                                </div>

                                                {/* Shipping */}
                                                <div className="flex items-center justify-between pt-5">
                                                    <p className="text-base leading-none text-gray-800">
                                                        Shipping {subtotal >= 3000 && <span className="text-green-600 text-xs">(Free!)</span>}
                                                    </p>
                                                    <p className="text-base leading-none text-gray-800">₹{shipping}</p>
                                                </div>

                                                {/* Tax */}
                                                <div className="flex items-center justify-between pt-5">
                                                    <p className="text-base leading-none text-gray-800">Tax (18%)</p>
                                                    <p className="text-base leading-none text-gray-800">₹{tax.toLocaleString()}</p>
                                                </div>

                                                {/* Free shipping notice */}
                                                {subtotal < 3000 && (
                                                    <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                                                        <p className="text-sm text-blue-600">
                                                            Add ₹{(3000 - subtotal).toLocaleString()} more for free shipping!
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                {/* Total */}
                                                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20 border-t border-gray-300">
                                                    <p className="text-2xl leading-normal text-gray-800 font-semibold">Total</p>
                                                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                                                        ₹{total.toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Checkout Button */}
                                                <button
                                                    onClick={handleCheckout}
                                                    disabled={cartState.loading}
                                                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
                                                >
                                                    {cartState.loading ? 'Processing...' : 'Checkout'}
                                                </button>

                                                {/* Continue Shopping */}
                                                <button
                                                    onClick={() => {
                                                        setShow(false);
                                                        router.push('/products');
                                                    }}
                                                    className="text-base leading-none w-full py-3 mt-3 text-gray-800 hover:text-gray-600 transition-colors"
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                /* Scrollbar Styles */
                #scroll::-webkit-scrollbar {
                    width: 4px;
                }

                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 2px;
                }

                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                    border-radius: 2px;
                }

                #scroll::-webkit-scrollbar-thumb:hover {
                    background: rgb(100, 100, 100);
                }

                /* Line clamp utility */
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default Cart;