'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';

const ReelCard = ({ reel, index }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    // Auto-play video when in viewport
    useEffect(() => {
        const video = videoRef.current;
        if (video && !videoError) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => {
                                console.error('Autoplay failed:', e);
                                setVideoError(true);
                            });
                            setIsPlaying(true);
                        } else {
                            video.pause();
                            setIsPlaying(false);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(video);
            return () => observer.disconnect();
        }
    }, [videoError]);

    // Set video speed when video loads
    useEffect(() => {
        const video = videoRef.current;
        if (video && reel.speed) {
            video.playbackRate = reel.speed;
        }
    }, [reel.speed]);

    const handleVideoError = (e) => {
        console.error('Video error:', e);
        setVideoError(true);
    };

    const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setVideoError(false);

        // Set speed when video loads
        const video = videoRef.current;
        if (video && reel.speed) {
            video.playbackRate = reel.speed;
        }
    };

    const handleInstagramRedirect = () => {
        window.open(reel.instagramUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex-shrink-0 w-[300px]" style={{ scrollSnapAlign: 'start' }}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[9/16] group bg-gray-100">

                    {/* Video or Poster Image */}
                    {reel.videoUrl && reel.videoUrl !== '/api/placeholder/300/400' && !videoError ? (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster={reel.posterUrl}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onEnded={() => setIsPlaying(false)}
                            onError={handleVideoError}
                            onLoadedData={handleVideoLoad}
                            controls={false}
                        >
                            <source src={reel.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="w-full h-full relative flex items-center justify-center bg-gray-200">
                            {videoError ? (
                                <div className="text-center p-4">
                                    <p className="text-red-500 text-sm mb-2">Video failed to load</p>
                                    <p className="text-gray-500 text-xs">Click button below to view on Instagram</p>
                                </div>
                            ) : (
                                <Image
                                    src={reel.posterUrl}
                                    alt={`Reel ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="300px"
                                />
                            )}
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {/* Views Counter */}
                    {reel.views && (
                        <div className="absolute top-4 left-4">
                            <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded text-sm">
                                <EyeIcon className="w-4 h-4" />
                                <span className="font-medium">{reel.views}</span>
                            </div>
                        </div>
                    )}

                    {/* Speed Indicator */}
                    {/*{reel.speed && reel.speed !== 1 && (*/}
                    {/*    <div className="absolute top-4 right-4">*/}
                    {/*        <div className="bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">*/}
                    {/*            {reel.speed}x*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/* Playing Indicator */}
                    {isPlaying && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                                Playing
                            </div>
                        </div>
                    )}
                    {/* Product Info & Instagram Button */}
                    <div className=" absolute bottom-0 w-full opacity-80 p-4 bg-gray-50">
                        <div className="text-center">
                            {/* Product Name */}
                            {reel.product?.name && (
                                <h3 className="font-medium text-gray-900 text-sm mb-3 line-clamp-2">
                                    {reel.product.name}
                                </h3>
                            )}

                            {/* Instagram Button */}
                            <button
                                onClick={handleInstagramRedirect}
                                className="w-full bg-gradient-to-r from-pink to-lightpink text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                Watch on Instagram
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

const WatchAndShop = ({ reels = [], title = "Watch and Shop" }) => {
    const scrollContainerRef = useRef(null);
    const autoScrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isPaused) {
            autoScrollRef.current = setInterval(() => {
                scrollToNext();
            }, 5000); // 5 seconds
        }

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [isPaused, currentIndex]);

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
        setIsPaused(true);
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const scrollTo = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const cardWidth = 320;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Update current index
            if (direction === 'left') {
                setCurrentIndex(prev => Math.max(0, prev - 1));
            } else {
                setCurrentIndex(prev => Math.min(reelsData.length - 1, prev + 1));
            }
        }
    };

    const scrollToNext = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const cardWidth = 320;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;

            if (currentScroll >= maxScroll - 10) {
                // Reset to beginning
                container.scrollTo({ left: 0, behavior: 'smooth' });
                setCurrentIndex(0);
            } else {
                // Scroll to next
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                setCurrentIndex(prev => Math.min(reelsData.length - 1, prev + 1));
            }
        }
    };

    // Simplified default reels data
    const defaultReels = [
        {
            id: 1,
            videoUrl: '/videos/mainHeroVid.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/DLXk05lzu-0/',
            speed: 2.2,
            product: {
                name: 'Handcrafted Silver Necklace'
            },
            views: '2.5K'
        },
        {
            id: 2,
            videoUrl: '/videos/mainHeroVid.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/ANOTHER-REEL/',
            speed: 1.3,
            product: {
                name: 'Traditional Gold Earrings'
            },
            views: '1.8K'
        },
        {
            id: 3,
            videoUrl: '/videos/mainHeroVid2.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/THIRD-REEL/',
            speed: 1.0,
            product: {
                name: 'Designer Bracelet Collection'
            },
            views: '3.2K'
        },
        {
            id: 4,
            videoUrl: '/videos/mainHeroVid.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/FOURTH-REEL/',
            speed: 1.5,
            product: {
                name: 'Vintage Ring Set'
            },
            views: '4.1K'
        },
        {
            id: 5,
            videoUrl: '/videos/mainHeroVid2.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/FIFTH-REEL/',
            speed: 1.1,
            product: {
                name: 'Pearl Pendant Collection'
            },
            views: '1.9K'
        },
        {
            id: 6,
            videoUrl: '/videos/mainHeroVid.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/FOURTH-REEL/',
            speed: 1.5,
            product: {
                name: 'Vintage Ring Set'
            },
            views: '4.1K'
        },
        {
            id: 7,
            videoUrl: '/videos/mainHeroVid.mp4',
            posterUrl: '/api/placeholder/300/400',
            instagramUrl: 'https://www.instagram.com/reel/FIFTH-REEL/',
            speed: 1.1,
            product: {
                name: 'Pearl Pendant Collection'
            },
            views: '1.9K'
        }
    ];

    const reelsData = reels.length > 0 ? reels : defaultReels;

    return (
        <section className="pt-12 md:pt-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {title}
                    </h2>
                    {/*<p className="text-gray-600 mt-2">*/}
                    {/*    Videos play automatically • Auto-scrolls every 5 seconds • Hover to pause*/}
                    {/*</p>*/}
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Minimalistic Navigation Buttons */}
                    <button
                        onClick={() => scrollTo('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 shadow-sm"
                        aria-label="Previous"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-gray-700" />
                    </button>

                    <button
                        onClick={() => scrollTo('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 shadow-sm"
                        aria-label="Next"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-gray-700" />
                    </button>

                    {/*/!* Auto-scroll Indicator *!/*/}
                    {/*<div className="absolute top-4 right-4 z-10">*/}
                    {/*    <div className={`bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-opacity duration-200 ${isPaused ? 'opacity-100' : 'opacity-60'}`}>*/}
                    {/*        <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-400' : 'bg-green-400'}`}></div>*/}
                    {/*        {isPaused ? 'Paused' : 'Auto'}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Reels Container - Add group class for hover effects */}
                    <div className="group">
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto scrollbar-hide gap-6 px-12 py-4"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {reelsData.map((reel, index) => (
                                <ReelCard key={reel.id} reel={reel} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center mt-4 gap-2">
                        {reelsData.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                    index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="text-center mt-8">
                    {/*<p className="text-gray-500 text-sm mb-2">*/}
                    {/*    🎥 Videos autoplay • ⚡ Enhanced playback speed • ⏱️ Auto-scrolls every 5s*/}
                    {/*</p>*/}
                    <p className="text-gray-500 text-sm">
                        Follow us on{' '}
                        <a
                            href="https://www.instagram.com/tilottamabyarchana/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700 font-medium"
                        >
                            @tilottamabyarchana
                        </a>
                        {' '}for more updates
                    </p>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default WatchAndShop;