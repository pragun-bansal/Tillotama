'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import WatchAndShop from "../../components/WatchAndShop";

const AboutPage = () => {
    // Animation hook for scroll-triggered animations
    const useScrollAnimation = () => {
        const elementRef = useRef(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-slide-in');
                            entry.target.classList.remove('opacity-0', 'translate-y-8');
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            if (elementRef.current) {
                observer.observe(elementRef.current);
            }

            return () => {
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            };
        }, []);

        return elementRef;
    };

    // Create refs for each animated section
    const heroRef = useScrollAnimation();
    const specialRef = useScrollAnimation();
    const craftsmanshipRef = useScrollAnimation();
    const valuesRef = useScrollAnimation();
    const ctaRef = useScrollAnimation();

    return (
        <main className="min-h-screen bg-[#faf9f6]">
            {/* Custom CSS for animations */}
            <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .scroll-trigger {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .scroll-trigger.animate-slide-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .hero-image {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .parallax-bg {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>

            {/* Hero Section - About Us */}
            <section className="relative py-16 md:py-24 bg-[#faf9f6] overflow-hidden">
                <div className="absolute inset-0 parallax-bg">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div
                        ref={heroRef}
                        className="text-center max-w-4xl mx-auto scroll-trigger opacity-0 translate-y-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight animate-slide-up">
                            ABOUT US
                        </h1>
                        <div className="text-lg md:text-xl text-gray-700 space-y-6 leading-relaxed">
                            <p className="animate-fade-in stagger-1">
                                <strong className="text-gray-900">Fast fashion is out, slow fashion is in!</strong>
                            </p>
                            <p className="animate-fade-in stagger-2">
                                At Tilottama, we turn old materials into new favorites! From traditional fabrics
                                to hand-crafted pieces, creating one-of-a-kind statement pieces that tell a story.
                            </p>
                            <p className="animate-fade-in stagger-3">
                                <strong className="text-gray-900">Our mission?</strong> To bring traditional craftsmanship
                                back in style and create beautiful, sustainable pieces that make people say:
                                <em className="text-pink-600"> "Where did you get that?!"</em>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Special Section */}
            <section className="py-16 md:py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div
                        ref={specialRef}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center scroll-trigger opacity-0 translate-y-8"
                    >
                        {/* Image */}
                        <div className="relative group">
                            <div className="aspect-square group-hover:scale-110 relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/20 to-gray-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Image
                                    src="/images/Products1.jpg"
                                    alt="Traditional craftsmanship process"
                                    fill
                                    className="object-cover transition-transform duration-700  hero-image"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgMABAUGITFRkrHB/9oADAMBAAIRAxEAPwC7j1DVPg=="
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight animate-slide-up stagger-1">
                                What makes Tilottama special
                            </h2>
                            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                                <p className="animate-fade-in stagger-2 transform transition-all duration-500 hover:translate-x-2">
                                    All of our handcrafted products are <strong className="text-gray-900">made with love</strong> in
                                    our workshop — no factories, just skilled artisans and lots of creativity.
                                </p>
                                <p className="animate-fade-in stagger-3 transform transition-all duration-500 hover:translate-x-2">
                                    We prioritize <strong className="text-gray-900">sustainable materials</strong> and traditional
                                    techniques, giving timeless craftsmanship a modern twist. That means quality over quantity,
                                    less waste, and way more personality.
                                </p>
                                <p className="animate-fade-in stagger-4 transform transition-all duration-500 hover:translate-x-2">
                                    Each item is totally <strong className="text-gray-900">one-of-a-kind</strong> — colors and
                                    designs may vary slightly, making your piece just as unique as you are.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Craftsmanship Section */}
            <section className="py-16 md:py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div
                        ref={craftsmanshipRef}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center scroll-trigger opacity-0 translate-y-8"
                    >
                        {/* Content - Left side on desktop */}
                        <div className="space-y-6 lg:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight animate-slide-up stagger-1">
                                OUR TRADITIONAL CRAFTSMANSHIP
                            </h2>
                            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                                <p className="animate-fade-in stagger-2 transform transition-all duration-500 hover:translate-x-2">
                                    At Tilottama, we're passionate about preserving traditional art forms and giving them
                                    contemporary relevance — and our specialty? <strong className="text-gray-900">
                                    Handcrafted jewelry and accessories</strong>!
                                </p>
                                <p className="animate-fade-in stagger-3 transform transition-all duration-500 hover:translate-x-2">
                                    We carefully select premium materials and work with skilled artisans, creating
                                    <strong className="text-gray-900"> timeless pieces</strong> with modern appeal.
                                    Each piece is crafted with precision, care, and a story — ready to become part of your journey.
                                </p>
                            </div>
                        </div>

                        {/* Image - Right side on desktop */}
                        <div className="relative lg:order-2 group">
                            <div className="aspect-square group-hover:scale-110 relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/20 to-gray-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Image
                                    src="/images/Instagram.png"
                                    alt="Traditional craftsmanship process"
                                    fill
                                    className="object-cover transition-transform duration-700  hero-image"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgMABAUGITFRkrHB/9oADAMBAAIRAxEAPwC7j1DVPg=="
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-20 bg-[#faf9f6] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div
                        ref={valuesRef}
                        className="max-w-4xl mx-auto text-center scroll-trigger opacity-0 translate-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 animate-slide-up">
                            Our Values
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Sustainability */}
                            <div className="space-y-4 group animate-scale-in stagger-1 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-pink-200 group-hover:scale-110">
                                    <svg className="w-8 h-8 text-pink-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">Sustainability</h3>
                                <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                                    We believe in creating beautiful products while respecting our environment and supporting local communities.
                                </p>
                            </div>

                            {/* Quality */}
                            <div className="space-y-4 group animate-scale-in stagger-2 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-pink-200 group-hover:scale-110">
                                    <svg className="w-8 h-8 text-pink-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">Quality</h3>
                                <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                                    Every piece is meticulously crafted to last, combining traditional techniques with modern design sensibilities.
                                </p>
                            </div>

                            {/* Uniqueness */}
                            <div className="space-y-4 group animate-scale-in stagger-3 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-pink-200 group-hover:scale-110">
                                    <svg className="w-8 h-8 text-pink-600 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">Uniqueness</h3>
                                <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                                    Each piece tells its own story, ensuring you own something truly special and one-of-a-kind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <WatchAndShop />

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-pink to-lightpink relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div
                        ref={ctaRef}
                        className="scroll-trigger opacity-0 translate-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up">
                            Ready to find your perfect piece?
                        </h2>
                        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto animate-fade-in stagger-1">
                            Explore our collection of handcrafted jewelry and accessories, each made with love and designed to last.
                        </p>
                        <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-scale-in stagger-2">
                            Shop Our Collection
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default AboutPage;