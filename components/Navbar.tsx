"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logoutUser } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import {User, NavbarProps } from '../types';
import { Categories } from "../public/Categories";

// Import your images (you'll need to add these to public folder)
import Logo3 from '@/public/images/Logo3.png';
import CartSVG from '@/public/svg/shopping-cart.png';
import { usePathname } from 'next/navigation';
// Categories - you can move this to a separate file


export const Navbar: React.FC<NavbarProps> = ({ show, setShow }) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [droppeddown, setDroppeddown] = useState<boolean>(false);
    const [dropdown2, setDropdown2] = useState<boolean>(false);
    const [droppeddown2, setDroppeddown2] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [navDropdown, setNavDropdown] = useState<boolean>(false);
     const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: user, token } = useAppSelector((state) => state.user);

    // Handle scroll effect
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         const wasScrolled = isScrolled;
    //         const nowScrolled = scrollTop > 10;
    //
    //         setIsScrolled(nowScrolled);
    //
    //         // Auto-close nav dropdown when scrolling down
    //         if (!wasScrolled && nowScrolled) {
    //             setNavDropdown(false);
    //         }
    //     };
    //
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [isScrolled]);
    // useEffect(() => {
    //     const currentPath = window.location.pathname;
    //     const isHomePage = currentPath === '/';
    //
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         const wasScrolled = isScrolled;
    //
    //         // If not on home page, always show scrolled state
    //         // If on home page, check scroll position
    //         const nowScrolled = !isHomePage || scrollTop > 10;
    //
    //         setIsScrolled(nowScrolled);
    //
    //         // Auto-close nav dropdown when scrolling down (only on home page)
    //         if (isHomePage && !wasScrolled && nowScrolled) {
    //             setNavDropdown(false);
    //         }
    //     };
    //
    //     // Initial check for route
    //     handleScroll();
    //
    //     if (isHomePage) {
    //         window.addEventListener('scroll', handleScroll);
    //     }
    //
    //     return () => {
    //         if (isHomePage) {
    //             window.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [isScrolled]);
    const pathname = usePathname(); // Add this hook

    useEffect(() => {
        const currentPath = pathname; // Use pathname from hook instead of window.location
        const isHomePage = currentPath === '/';

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const wasScrolled = isScrolled;

            // If not on home page, always show scrolled state
            // If on home page, check scroll position
            const nowScrolled = !isHomePage || scrollTop > 10;

            setIsScrolled(nowScrolled);

            // Auto-close nav dropdown when scrolling down (only on home page)
            if (isHomePage && !wasScrolled && nowScrolled) {
                setNavDropdown(false);
            }
        };

        // Initial check for route - always run this when route changes
        handleScroll();

        // Add scroll listener only for home page
        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        }

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname, isScrolled]); // Add pathname as dependency

    const handleTestimonial = (): void => {
        console.log("check");
        router.push("/");
    };
    // Handle search functionality
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navigate to all products page with search term
            router.push(`/allproducts/all/newArrivals?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleLogOut = (): void => {
        dispatch(logoutUser());
        toast.success('Come Back Soon', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
        router.push("/login");
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
            isScrolled
                ? 'bg-white shadow-lg'
                : 'bg-black/20 backdrop-blur-sm'
        }`}>
            {/*/!* Top Banner *!/*/}
            {/*<div className={`h-[5vh] py-[1vh] transition-all duration-300 overflow-hidden ${*/}
            {/*    isScrolled*/}
            {/*        ? 'bg-lightpink text-white'*/}
            {/*        : 'bg-lightpink/20 text-white/80'*/}
            {/*}`}>*/}
            {/*    <div className="flex items-center h-full">*/}
            {/*        <div*/}
            {/*            className="whitespace-nowrap"*/}
            {/*            style={{*/}
            {/*                animation: 'marquee 20s linear infinite',*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <h1 className="drop-shadow-xl inline-block px-8">*/}
            {/*                Free shipping for orders over Rs.3000 and more*/}
            {/*            </h1>*/}
            {/*            <h1 className="drop-shadow-xl inline-block px-8">*/}
            {/*                Free shipping for orders over Rs.3000 and more*/}
            {/*            </h1>*/}
            {/*            <h1 className="drop-shadow-xl inline-block px-8">*/}
            {/*                Free shipping for orders over Rs.3000 and more*/}
            {/*            </h1>*/}
            {/*            <h1 className="drop-shadow-xl inline-block px-8">*/}
            {/*                Free shipping for orders over Rs.3000 and more*/}
            {/*            </h1>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <style jsx>{`*/}
            {/*        @keyframes marquee {*/}
            {/*            0% {*/}
            {/*                transform: translateX(100%);*/}
            {/*            }*/}
            {/*            100% {*/}
            {/*                transform: translateX(-100%);*/}
            {/*            }*/}
            {/*        }*/}
            {/*    `}</style>*/}
            {/*</div>*/}
            {/* Top Banner */}
            <div className={`h-[5vh] py-[1vh] transition-all duration-300 overflow-hidden ${
                isScrolled
                    ? 'bg-lightpink text-white'
                    : 'bg-lightpink/20 text-white/80'
            }`}>
                <div className="flex items-center justify-center h-full">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="sliding-offers">
                            <h1 className="drop-shadow-xl text-center offer-slide">
                                Free shipping for orders over Rs.3000 and more
                            </h1>
                            <h1 className="drop-shadow-xl text-center offer-slide">
                                Get 20% off on your first purchase
                            </h1>
                            <h1 className="drop-shadow-xl text-center offer-slide">
                                Buy 2 Get 1 Free on selected items
                            </h1>
                            <h1 className="drop-shadow-xl text-center offer-slide">
                                Limited time: Extra 15% off on premium collection
                            </h1>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .sliding-offers {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .offer-slide {
                        position: absolute;
                        width: 100%;
                        opacity: 0;
                        transform: translateX(100%);
                        animation: slideOffers 16s infinite;
                    }

                    .offer-slide:nth-child(1) { animation-delay: 0s; }
                    .offer-slide:nth-child(2) { animation-delay: 4s; }
                    .offer-slide:nth-child(3) { animation-delay: 8s; }
                    .offer-slide:nth-child(4) { animation-delay: 12s; }

                    @keyframes slideOffers {
                        0% {
                            opacity: 0;
                            transform: translateX(100%);
                        }
                        6.25% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        18.75% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        25% {
                            opacity: 0;
                            transform: translateX(-100%);
                        }
                        100% {
                            opacity: 0;
                            transform: translateX(-100%);
                        }
                    }
                `}</style>
            </div>

            {/* Header Section */}
            <div className={`flex h-[10vh] lg:h-[10vh] content-center justify-between align-middle px-4 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white'
                    : 'bg-transparent'
            }`}>
                {/* Navigation Toggle & Search Section - Left Side */}
                <div className="absolute left-0 md:mt-[3vh]">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setNavDropdown(!navDropdown)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-all duration-300 ${
                            isScrolled ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    >
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                navDropdown ? 'rotate-180' : ''
                            } ${isScrolled ? 'text-black' : 'text-white'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Updated Search Form with proper functionality */}
                    <form className="hidden md:block w-48 lg:w-64" onSubmit={handleSearch}>
                        <div className="relative">
                            <button
                                type="submit"
                                className="absolute inset-y-0 left-0 flex items-center pl-3 hover:bg-gray-100 rounded-l-lg transition-colors z-10"
                            >
                                <svg
                                    className={`w-4 h-4 transition-colors duration-300 ${
                                        isScrolled ? 'text-black' : 'text-white/80'
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </button>
                            <label htmlFor="navbar-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                                Search
                            </label>
                            <input
                                type="search"
                                id="navbar-search"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                className={`w-full p-2 pl-10 text-sm border rounded-lg transition-all duration-300 ${
                                    isScrolled
                                        ? 'bg-gray-50 text-black placeholder-gray-500 border-gray-300'
                                        : 'bg-white/10 text-white placeholder-white/60 border-white/30 backdrop-blur-sm'
                                }`}
                                placeholder="Search products..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearch(e as any);
                                    }
                                }}
                            />

                        </div>
                    </form>
                </div>
                </div>

                {/* Logo - Center */}
                <Link href="/" className="flex-1 flex justify-center">
                    <Image
                        className="h-15vh lg:h-[10vh] w-auto"
                        src={Logo3}
                        alt="Logo"
                        priority
                    />
                </Link>

                {/* User Actions - Right Side */}
                <div className="absolute right-0 lg:mt-[2.5vh] translate-y-[3vh] lg:translate-y-0">
                <div className="flex items-center space-x-0 md:space-x-2">
                    {token ? (
                        <div className="mb-4 lg:mb-0 lg:mr-1 h-[4vh] lg:h-[5vh] translate-y-[3vh] md:translate-y-[4vh] lg:translate-y-[3vh] p-0 ">
                            <button
                                onMouseOver={() => setDropdown2(true)}
                                onMouseOut={() => setDropdown2(false)}
                                className="group flex items-center justify-between w-full py-2 pl-3 md:pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
                            >
                                <Image
                                    className={`h-[2.5vh] w-[2.5vh] lg:w-10 lg:h-10 rounded-full cursor-pointer hover:opacity-55 ${isScrolled ? 'opacity-100' : 'opacity-30'}`}
                                    src={user?.pfp || '/default-avatar.png'}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                />
                                <span
                                    className={`${
                                        dropdown2 || droppeddown2
                                            ? 'block max-w-full transition-all duration-500 h-0.5'
                                            : 'max-w-0 block transition-all duration-500 h-0.5'
                                    } ${isScrolled ? 'bg-black' : 'bg-white'}`}
                                />
                            </button>
                            <div
                                onMouseOver={() => setDroppeddown2(true)}
                                onMouseOut={() => setDroppeddown2(false)}
                                className={`${
                                    dropdown2 || droppeddown2
                                        ? 'absolute translate-x-[-10px] translate-y-[-10px]  z-10 font-normal divide-y bg-white divide-gray-100 shadow-md w-44'
                                        : 'hidden'
                                }`}
                            >
                                <ul className="py-2 text-sm text-gray-700 z-50">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 text-left"
                                        >
                                            View Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout User
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => router.push('/login')}>
                            <svg
                                className={`h-[4vh] lg:h-[5vh] translate-y-[2.5vh] p-2 transition-colors duration-300 ${
                                    isScrolled ? 'fill-black' : 'fill-white/60'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                            >
                                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                            </svg>
                        </button>
                    )}

                    <button onClick={() => router.push('/wishlist')}>
                        <svg
                            className={`h-[3vh] lg:h-[5vh] translate-y-[2.5vh] p-1 lg:p-2 transition-colors duration-300  ${
                                isScrolled ? 'fill-pink hover:fill-pink-500 ' : 'fill-pink/20 hover:fill-pink-500/50 '
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 576 512"
                        >
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                    </button>

                    <button onClick={() => setShow(!show)}>
                        {/*<Image*/}
                        {/*    className="h-[3vh] lg:h-[5vh] translate-y-[2.5vh] p-1 lg:p-2"*/}
                        {/*    src={CartSVG}*/}
                        {/*    alt="cart"*/}
                        {/*    width={40}*/}
                        {/*    height={40}*/}
                        {/*    style={{*/}
                        {/*        filter: isScrolled ? 'brightness(0)' : 'brightness(1)'*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<svg*/}
                        {/*    className={`h-[3vh] lg:h-[5vh] translate-y-[2.5vh] p-1 lg:p-2 transition-colors duration-300  ${*/}
                        {/*        isScrolled ? 'fill-pink hover:fill-pink-500 ' : 'fill-pink/20 hover:fill-pink-500/50 '*/}
                        {/*    }`}*/}
                        {/*    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.1 208.3">*/}
                        {/*    <style>{`.st6{fill:#4a4a4a}.st10{fill:#2a2a2a}.st11{fill:none;stroke:#000000;stroke-width:6.8376}.st15{fill:#6a6a6a}`}</style>*/}
                        {/*    <g id="Layer_4">*/}
                        {/*        <path transform="matrix(1 -.00483 .00483 1 -.522 .436)" className="st6" d="M53.6 73.3h73.2v70.1H53.6z"/>*/}
                        {/*        <path className="st15" d="m126.7 96.5-73.3-23 73.2-.4z"/>*/}
                        {/*        <path transform="matrix(-1 .00483 -.00483 -1 305.275 215.427)" className="st10" d="M126.7 73H178v70.1h-51.3z"/>*/}
                        {/*        <path transform="matrix(1 -.00483 .00483 1 -.297 .423)" className="st6" d="M47.6 50h80v23.4h-80z"/>*/}
                        {/*        <path transform="matrix(-1 .00483 -.00483 -1 311.392 121.89)" className="st10" d="M127.5 49.6h56V73h-56z"/>*/}
                        {/*        <g>*/}
                        {/*            <path transform="matrix(1 -.00483 .00483 1 -.149 .415)" className="st6" d="M66.5 12.6h38.6v37H66.5z"/>*/}
                        {/*            <path className="st15" d="M105 24.8 66.4 12.6l38.5-.1z"/>*/}
                        {/*            <path transform="matrix(-1 .00483 -.00483 -1 237.202 61.18)" className="st10" d="M105 12.4h27v37h-27z"/>*/}
                        {/*            <path transform="matrix(1 -.00483 .00483 1 -.03 .407)" className="st6" d="M63.3.2h42.1v12.3H63.3z"/>*/}
                        {/*            <path transform="matrix(-1 .00483 -.00483 -1 240.425 11.88)" className="st10" d="M105.4.1h29.5v12.3h-29.5z"/>*/}
                        {/*        </g>*/}
                        {/*        <g>*/}
                        {/*            <path className="st11" d="M0 51.1h27.4l17 95.7h157.3"/>*/}
                        {/*            <path className="st11" d="M30.8 75H212l-13.7 71.8M201.7 170.7H46.2c-6.6 0-12-5.4-12-12s5.4-12 12-12h15.4"/>*/}
                        {/*            <circle className="st11" cx="61.5" cy="194.6" r="10.3"/>*/}
                        {/*            <circle className="st11" cx="188" cy="194.6" r="10.3"/>*/}
                        {/*        </g>*/}
                        {/*    </g>*/}
                        {/*</svg>*/}
                        <svg
                            className={`h-[3vh] lg:h-[5vh] translate-y-[2.5vh] p-0 lg:p-0 transition-colors duration-300  ${
                                isScrolled ? 'fill-pink hover:fill-pink-500 ' : 'fill-pink/20 hover:fill-pink-500/50 '
                            }`}

                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" data-name="Shopping Cart"/></svg>
                    </button>
                </div>
                </div>
            </div>

            {/* Navigation Bar - Dropdown Style */}
            <div className={`transition-all duration-300 ${
                isScrolled
                    ? 'bg-pink text-white' : 'bg-pink/20 text-white/80'
            }`}>
                {/* Navigation Links */}
                <div className={` transition-all duration-300 ${
                    isScrolled
                        ? (navDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')
                        : 'max-h-96 opacity-100'
                }`}>
                    <nav className="border-gray-200">
                        <div className="md:p-2">
                            <div className=" w-full md:w-auto" id="navbar-dropdown">
                                <ul className="flex font-normal text-[10px] md:text-[15px] md:font-medium text-center  p-0 border-gray-100 rounded-lg flex-row md:space-x-8 mt-0 border-0 items-center justify-between">
                                    {/* Left Side Navigation */}
                                    <div className="flex space-x-8 justify-center items-center mx-auto">
                                        <li>
                                            <Link
                                                href="/"
                                                className="group block py-2 pr-4  rounded md:bg-transparent md:p-0"
                                            >
                                                Home
                                                <span className="block max-w-0 lg:ml-[25%] lg:mr-[25%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                            </Link>
                                        </li>

                                        <li className="relative">
                                            <button
                                                onMouseOver={() => setDropdown(true)}
                                                onMouseOut={() => setDropdown(false)}
                                                className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded  md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
                                            >
                                                Products
                                                <span
                                                    className={`${
                                                        dropdown || droppeddown
                                                            ? 'block max-w-full transition-all duration-500 h-0.5 bg-white'
                                                            : 'max-w-0 block transition-all duration-500 h-0.5 bg-white'
                                                    }`}
                                                />
                                            </button>
                                            <div
                                                onMouseOver={() => setDroppeddown(true)}
                                                onMouseOut={() => setDroppeddown(false)}
                                                className={`${
                                                    dropdown || droppeddown
                                                        ? 'absolute translate-x-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
                                                        : 'hidden'
                                                }`}
                                            >
                                                <ul className="py-2 text-sm text-gray-700">
                                                    {Categories.map((item, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                href={`/allproducts/${item.name}/newArrivals`}
                                                                className="block px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li>
                                                        <Link
                                                            href="/allproducts/all/newArrivals"
                                                            className="block px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            All
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li>
                                            <Link
                                                href="/about"
                                                className="group block py-2 rounded  md:hover:bg-transparent md:border-0 md:p-0"
                                            >
                                                About Us
                                                <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                            </Link>
                                        </li>



                                        <li>
                                            <button
                                                onClick={handleTestimonial}
                                                className="block group rounded  md:hover:bg-transparent md:border-0 md:p-0"
                                            >
                                                Testimonials
                                                <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                            </button>
                                        </li>

                                        {user?.admin && (
                                            <li>
                                                <button
                                                    onClick={() => router.push('/admin')}
                                                    className="block group rounded  md:hover:bg-transparent md:border-0 md:p-0"
                                                >
                                                    Admin
                                                    <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                                </button>
                                            </li>
                                        )}
                                    </div>

                                    {/* Right Side Social Media */}
                                    <div className="hidden md:block absolute right-0" >
                                    <div className="flex items-center">
                                        <ul className="flex">
                                            <li>
                                                <a
                                                    target="_blank"
                                                    rel="noopener"
                                                    href="https://www.instagram.com/tilottamabyarchana/"
                                                    title="Tillotama By Archana on Instagram"
                                                >
                                                    <svg
                                                        className={`h-[3vh] lg:h-[4vh] p-2 transition-colors duration-300 ${
                                                            isScrolled ? 'fill-white' : 'fill-white/80'
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="1em"
                                                        viewBox="0 0 448 512"
                                                    >
                                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    rel="noopener"
                                                    href="https://www.facebook.com/tilottamabyarchana/"
                                                    title="Tilottama By Archana on Facebook"
                                                >
                                                    <svg
                                                        className={`h-[3vh] lg:h-[4vh] p-2 transition-colors duration-300 ${
                                                            isScrolled ? 'fill-white' : 'fill-white/80'
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="1em"
                                                        viewBox="0 0 320 512"
                                                    >
                                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    rel="noopener"
                                                    href="https://wa.me/+919311144320?text=Hey%20There,%20I'm%20interested%20in%20your%20products"
                                                    title="Tilottama on Whatsapp"
                                                >
                                                    <svg
                                                        className={`h-[3vh] lg:h-[4vh] p-2 transition-colors duration-300 ${
                                                            isScrolled ? 'fill-white' : 'fill-white/80'
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="1em"
                                                        viewBox="0 0 448 512"
                                                    >
                                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};