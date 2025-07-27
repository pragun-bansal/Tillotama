"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Loader2 } from 'lucide-react';
import ProductCard from '@/components/allProducts/ProductCard'; // Adjust path as needed
import { fetchAllProducts } from '@/store/slices/allProductSlice';

const BestsellerCarousel = ({
                                autoPlayInterval = 4000,
                                showControls = true,
                                showIndicators = true,
                                className = '',
                                title = "Bestseller Products",
                                subtitle = "Discover our most loved products"
                            }) => {
    const dispatch = useDispatch();
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const autoPlayRef = useRef(null);

    // Get bestseller products from Redux store
    const {
        products,
        loading,
        error
    } = useSelector((state) => ({
        products: state.allProducts.items || [],
        loading: state.allProducts.loading,
        error: state.allProducts.error
    }));

    // Filter bestseller products
    console.log('Bestseller products:', products);
    const bestsellerProducts = products.filter(product => product.bestseller);
    console.log('Bestseller products:', bestsellerProducts);

    // Responsive items per view
    const [itemsPerView, setItemsPerView] = useState(4);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerView(2); // Mobile: show partial next item
            } else if (width < 768) {
                setItemsPerView(2);
            } else if (width < 1024) {
                setItemsPerView(3);
            } else if (width < 1280) {
                setItemsPerView(4);
            } else {
                setItemsPerView(4);
            }
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Fetch products on component mount
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    // Create infinite scroll effect by duplicating products
    const infiniteProducts = React.useMemo(() => {
        if (bestsellerProducts.length === 0) return [];

        // If we have fewer products than items per view, duplicate them
        const minRequired = Math.ceil(itemsPerView) * 3;
        let extendedProducts = [...bestsellerProducts];

        while (extendedProducts.length < minRequired) {
            extendedProducts = [...extendedProducts, ...bestsellerProducts];
        }

        // Add items at beginning and end for infinite effect
        const itemsToAdd = Math.ceil(itemsPerView);
        const start = extendedProducts.slice(-itemsToAdd);
        const end = extendedProducts.slice(0, itemsToAdd);

        return [...start, ...extendedProducts, ...end];
    }, [bestsellerProducts, itemsPerView]);

    // Auto-play functionality
    const startAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);

        autoPlayRef.current = setInterval(() => {
            if (isAutoPlaying && !isDragging) {
                goToNext();
            }
        }, autoPlayInterval);
    }, [isAutoPlaying, isDragging, autoPlayInterval]);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isAutoPlaying && infiniteProducts.length > 0) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }

        return () => stopAutoPlay();
    }, [isAutoPlaying, infiniteProducts.length, startAutoPlay, stopAutoPlay]);

    // Navigation functions
    const goToNext = useCallback(() => {
        if (!carouselRef.current || infiniteProducts.length === 0) return;

        const container = carouselRef.current;
        const itemWidth = container.scrollWidth / infiniteProducts.length;
        const newIndex = currentIndex + 1;

        setCurrentIndex(newIndex);
        container.scrollTo({
            left: newIndex * itemWidth,
            behavior: 'smooth'
        });

        // Reset to beginning if we've reached the duplicated end
        const maxIndex = infiniteProducts.length - Math.ceil(itemsPerView);
        if (newIndex >= maxIndex) {
            setTimeout(() => {
                const resetIndex = Math.ceil(itemsPerView);
                setCurrentIndex(resetIndex);
                container.scrollTo({
                    left: resetIndex * itemWidth,
                    behavior: 'auto'
                });
            }, 500);
        }
    }, [currentIndex, infiniteProducts.length, itemsPerView]);

    const goToPrev = useCallback(() => {
        if (!carouselRef.current || infiniteProducts.length === 0) return;

        const container = carouselRef.current;
        const itemWidth = container.scrollWidth / infiniteProducts.length;
        const newIndex = currentIndex - 1;

        setCurrentIndex(newIndex);
        container.scrollTo({
            left: newIndex * itemWidth,
            behavior: 'smooth'
        });

        // Reset to end if we've reached the duplicated beginning
        if (newIndex < Math.ceil(itemsPerView)) {
            setTimeout(() => {
                const resetIndex = infiniteProducts.length - Math.ceil(itemsPerView) - 1;
                setCurrentIndex(resetIndex);
                container.scrollTo({
                    left: resetIndex * itemWidth,
                    behavior: 'auto'
                });
            }, 500);
        }
    }, [currentIndex, infiniteProducts.length, itemsPerView]);

    // Touch/Mouse drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsAutoPlaying(false);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
        carouselRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        carouselRef.current.style.cursor = 'grab';
        setTimeout(() => setIsAutoPlaying(true), 1000);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsAutoPlaying(false);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }

        setTimeout(() => setIsAutoPlaying(true), 1000);
    };

    // Loading state
    if (loading && products.length === 0) {
        return (
            <div className={`py-12 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-600" />
                        <p className="mt-2 text-gray-600">Loading bestseller products...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={`py-12 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">Error loading products: {error}</p>
                        <button
                            onClick={() => dispatch(fetchAllProducts())}
                            className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No bestsellers state
    if (bestsellerProducts.length === 0) {
        return (
            <div className={`py-12 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Bestsellers Yet</h3>
                        <p className="text-gray-600">Check back soon for our trending products!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className={`py-12 bg-gradient-to-br from-pink-50 to-purple-50 ${className}`}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        {/*<div className="flex items-center bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full">*/}
                        {/*    <TrendingUp className="w-5 h-5 mr-2" />*/}
                        {/*    <span className="font-semibold">Bestsellers</span>*/}
                        {/*</div>*/}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                    {/*<div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">*/}
                    {/*    <div className="flex items-center">*/}
                    {/*        <Star className="w-4 h-4 text-yellow-400 mr-1" />*/}
                    {/*        <span>Top Rated</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>*/}
                    {/*    <span>{bestsellerProducts.length} Products</span>*/}
                    {/*    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>*/}
                    {/*    <span>Free Shipping</span>*/}
                    {/*</div>*/}
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    {showControls && (
                        <>
                            <button
                                onClick={goToPrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                aria-label="Previous products"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                aria-label="Next products"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Products Carousel */}
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto scroll-smooth gap-4 md:gap-6 pb-4 cursor-grab select-none scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitScrollbar: 'none'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        // onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {infiniteProducts.map((product, index) => (
                            <div
                                key={`${product._id}-${index}`}
                                className="flex-none"
                                style={{
                                    width: `calc((100% - ${Math.floor(itemsPerView) - 1} * 1.5rem) / ${itemsPerView})`
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    showTagline={true}
                                    showRating={true}
                                    showCartOptions={false}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Auto-play indicator */}
                    <div className="flex items-center justify-center mt-6 space-x-4">
                        {/*<button*/}
                        {/*    onClick={() => setIsAutoPlaying(!isAutoPlaying)}*/}
                        {/*    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${*/}
                        {/*        isAutoPlaying*/}
                        {/*            ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'*/}
                        {/*            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'*/}
                        {/*    }`}*/}
                        {/*>*/}
                        {/*    <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-pink-600' : 'bg-gray-400'}`}></div>*/}
                        {/*    <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>*/}
                        {/*</button>*/}

                        {/* Progress indicators */}
                        {showIndicators && (
                            <div className="flex space-x-2">
                                {bestsellerProducts.slice(0, 5).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            idx === (currentIndex % bestsellerProducts.length)
                                                ? 'bg-pink-600 w-8'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>


            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default BestsellerCarousel;