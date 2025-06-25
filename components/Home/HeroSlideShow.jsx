import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [nextSlide, setNextSlide] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [contentVisible, setContentVisible] = useState(true);

    // Sample slide data - replace with your actual content
    const slides = [
        {
            id: 1,
            subheading: "Nish Hair",
            title: "Get Celebrity Like Hair",
            description: "AS SEEN ON",
            buttonText: "Shop Premium",
            buttonLink: "/collections/premium",
            videoSrc: "/videos/mainHeroVid.mp4",
            videoPoster: "/images/hero-poster-1.jpg"
        },
        {
            id: 2,
            subheading: "Nish Hair",
            title: "Your 5 Second Hair Fix",
            description: "Human Hair Donut Scrunchie",
            buttonText: "Shop Now",
            buttonLink: "/collections/donut-scrunchies",
            videoSrc: "/videos/mainHeroVid2.mp4",
            videoPoster: "/images/hero-poster-2.jpg"
        }
    ];

    // Handle client-side mounting
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-advance slides every 7 seconds
    useEffect(() => {
        if (!isMounted || isTransitioning) return;

        const timer = setInterval(() => {
            const nextIndex = (currentSlide + 1) % slides.length;
            handleSlideChange(nextIndex);
        }, 5000); // Increased to 5 seconds for better visibility

        return () => clearInterval(timer);
    }, [currentSlide, slides.length, isMounted, isTransitioning]);

    const handleSlideChange = (newSlideIndex) => {
        if (newSlideIndex === currentSlide || isTransitioning) return;

        setIsTransitioning(true);
        setNextSlide(newSlideIndex);
        setContentVisible(false);

        // Change to next slide after content fade out
        setTimeout(() => {
            setCurrentSlide(newSlideIndex);
            setContentVisible(true);
        }, 300);

        // Reset transition state
        setTimeout(() => {
            setIsTransitioning(false);
            setNextSlide(null);
        }, 1200); // Match the video transition duration
    };

    // Fixed SplitText component that uses spans instead of divs in p tags
    const SplitText = ({ children, delay = 0, className = "" }) => {
        const words = children.split(' ');
        return (
            <span className={`inline-block ${className}`}>
                {words.map((word, index) => (
                    <span
                        key={`${currentSlide}-${index}`} // Add currentSlide to key to force re-render
                        className="split-word inline-block opacity-0 transform translate-y-full mr-2"
                        style={{
                            animationDelay: `${delay + index * 0.1}s`
                        }}
                    >
                        {word}
                    </span>
                ))}
            </span>
        );
    };

    // Don't render until mounted to prevent hydration issues
    if (!isMounted) {
        return (
            <div className="relative w-screen h-screen overflow-hidden bg-black">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Current Slide Video - Always visible */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className={`absolute top-0 left-0 w-full h-full transform transition-all duration-1200 ease-out ${
                    isTransitioning ? 'scale-110 blur-sm opacity-70' : 'scale-100 blur-0 opacity-100'
                }`}>
                    <video
                        key={`video-${currentSlide}`} // Force re-render when slide changes
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={slides[currentSlide].videoPoster}
                    >
                        <source src={slides[currentSlide].videoSrc} type="video/mp4" />
                    </video>
                </div>

                {/* Overlay with dynamic opacity */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/40 transition-opacity duration-1200 ${
                    isTransitioning ? 'opacity-80' : 'opacity-100'
                }`} />
            </div>

            {/* Next Slide Video - Only visible during transition */}
            {nextSlide !== null && (
                <div className="absolute top-0 left-0 w-full h-full z-5">
                    <div className={`absolute top-0 left-0 w-full h-full transform transition-all duration-1200 ease-out ${
                        isTransitioning ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-110 opacity-0'
                    }`}>
                        <video
                            key={`next-video-${nextSlide}`}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={slides[nextSlide].videoPoster}
                        >
                            <source src={slides[nextSlide].videoSrc} type="video/mp4" />
                        </video>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/40" />
                </div>
            )}

            {/* Content Layer */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white z-10">
                <div className="max-w-4xl px-8 md:px-4">
                    {slides[currentSlide].subheading && (
                        <div
                            key={`subheading-${currentSlide}`}
                            className={`text-sm md:text-base font-light tracking-widest uppercase mb-4 transform transition-all duration-700 ease-out ${
                                contentVisible && !isTransitioning
                                    ? 'opacity-100 translate-y-0 delay-300'
                                    : 'opacity-0 translate-y-8'
                            }`}
                        >
                            {slides[currentSlide].subheading}
                        </div>
                    )}

                    <h1
                        key={`title-${currentSlide}`}
                        className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 ${
                            contentVisible && !isTransitioning ? 'animate-words' : 'opacity-0'
                        }`}
                    >
                        <SplitText delay={0.2}>{slides[currentSlide].title}</SplitText>
                    </h1>

                    {slides[currentSlide].description && (
                        <div
                            key={`description-${currentSlide}`}
                            className={`text-lg md:text-xl font-light tracking-wider mb-10 transform transition-all duration-700 ease-out ${
                                contentVisible && !isTransitioning
                                    ? 'opacity-100 translate-y-0 delay-700'
                                    : 'opacity-0 translate-y-8'
                            }`}
                        >
                            <SplitText delay={0.6}>{slides[currentSlide].description}</SplitText>
                        </div>
                    )}

                    {slides[currentSlide].buttonText && (
                        <div
                            key={`button-${currentSlide}`}
                            className={`transform transition-all duration-700 ease-out ${
                                contentVisible && !isTransitioning
                                    ? 'opacity-100 translate-y-0 delay-1000'
                                    : 'opacity-0 translate-y-8'
                            }`}
                        >
                            <a
                                href={slides[currentSlide].buttonLink}
                                className="inline-block px-8 py-4 md:px-10 md:py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                            >
                                <span>{slides[currentSlide].buttonText}</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Cinematic Transition Overlay */}
            {isTransitioning && (
                <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
                    {/* Top bar */}
                    <div className="absolute top-0 left-0 w-full h-16 bg-black transform -translate-y-full animate-cinematic-top" />
                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-black transform translate-y-full animate-cinematic-bottom" />
                </div>
            )}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 hover:bg-white/50 hover:scale-125 ${
                            index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-transparent'
                        }`}
                        onClick={() => handleSlideChange(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        disabled={isTransitioning}
                    />
                ))}
            </div>

            {/* Debug info - remove in production */}
            {/*<div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded z-40">*/}
            {/*    Current: {currentSlide + 1} / {slides.length}*/}
            {/*    {isTransitioning && <span className="ml-2">Transitioning...</span>}*/}
            {/*</div>*/}

            <style jsx global>{`
                .split-word {
                    animation: wordSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .animate-words .split-word {
                    animation: wordSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                @keyframes wordSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-cinematic-top {
                    animation: cinematicTop 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .animate-cinematic-bottom {
                    animation: cinematicBottom 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes cinematicTop {
                    0% { transform: translateY(-100%); }
                    15% { transform: translateY(0); }
                    85% { transform: translateY(0); }
                    100% { transform: translateY(-100%); }
                }

                @keyframes cinematicBottom {
                    0% { transform: translateY(100%); }
                    15% { transform: translateY(0); }
                    85% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
};

export default HeroSlideshow;