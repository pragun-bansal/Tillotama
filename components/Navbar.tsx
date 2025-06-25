// // 'use client';
// //
// // import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { useAppSelector, useAppDispatch } from '../hooks/redux';
// // import { logoutUser } from '../store/slices/userSlice';
// // import { toast } from 'react-toastify';
// // import {User, NavbarProps } from '../types';
// //
// // // Import your images (you'll need to add these to public folder)
// // import Logo3 from '@/public/images/Logo3.png';
// // import CartSVG from '@/public/svg/shopping-cart.png';
// //
// // // Categories - you can move this to a separate file
// // export const Categories = [
// //     { name: 'Women', slug: 'women' },
// //     { name: 'Men', slug: 'men' },
// //     { name: 'Kids', slug: 'kids' },
// //     { name: 'Accessories', slug: 'accessories' },
// // ];
// //
// // export const Navbar: React.FC<NavbarProps> = ({ show, setShow }) => {
// //     const [dropdown, setDropdown] = useState<boolean>(false);
// //     const [droppeddown, setDroppeddown] = useState<boolean>(false);
// //     const [dropdown2, setDropdown2] = useState<boolean>(false);
// //     const [droppeddown2, setDroppeddown2] = useState<boolean>(false);
// //
// //     const router = useRouter();
// //     const dispatch = useAppDispatch();
// //     const { data: user, token } = useAppSelector((state) => state.user);
// //
// //     const handleTestimonial = (): void => {
// //         console.log("check");
// //         router.push("/");
// //     };
// //
// //     const handleLogOut = (): void => {
// //         dispatch(logoutUser());
// //         toast.success('Come Back Soon', {
// //             position: "top-center",
// //             autoClose: 2000,
// //             hideProgressBar: false,
// //             closeOnClick: true,
// //             pauseOnHover: false,
// //             draggable: true,
// //             theme: "dark",
// //         });
// //         router.push("/login");
// //     };
// //
// //     return (
// //         <div className="mb-0 pb-0">
// //             {/* Top Banner */}
// //             <div className="h-[5vh] bg-lightpink text-white py-[1vh]">
// //                 <h1 className="drop-shadow-xl text-center">
// //                     Free shipping for orders over Rs.3000 and more
// //                 </h1>
// //             </div>
// //
// //             {/* Header Section */}
// //             <div className="flex h-[12vh] lg:h-[17vh] content-center justify-center align-middle">
// //                 {/* Social Media Links */}
// //                 <ul className="flex">
// //                     <li>
// //                         <a
// //                             target="_blank"
// //                             rel="noopener"
// //                             href="https://www.instagram.com/tilottamabyarchana/"
// //                             title="Tillotama By Archana on Instagram"
// //                         >
// //                             <svg
// //                                 className="h-[4vh] lg:h-[6vh] p-2 md:pr-4"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 height="1em"
// //                                 viewBox="0 0 448 512"
// //                             >
// //                                 <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
// //                             </svg>
// //                         </a>
// //                     </li>
// //                     <li>
// //                         <a
// //                             target="_blank"
// //                             rel="noopener"
// //                             href="https://www.facebook.com/tilottamabyarchana/"
// //                             title="Tilottama By Archana on Facebook"
// //                         >
// //                             <svg
// //                                 className="h-[4vh] lg:h-[6vh] p-2 md:pr-4"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 height="1em"
// //                                 viewBox="0 0 320 512"
// //                             >
// //                                 <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
// //                             </svg>
// //                         </a>
// //                     </li>
// //                     <li>
// //                         <a
// //                             target="_blank"
// //                             rel="noopener"
// //                             href="https://wa.me/+919311144320?text=Hey%20There,%20I'm%20interested%20in%20your%20products"
// //                             title="Tilottama on Whatsapp"
// //                         >
// //                             <svg
// //                                 className="h-[4vh] lg:h-[6vh] p-2 md:pr-4"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 height="1em"
// //                                 viewBox="0 0 448 512"
// //                             >
// //                                 <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
// //                             </svg>
// //                         </a>
// //                     </li>
// //                 </ul>
// //
// //                 {/* Logo */}
// //                 <Link href="/" className="mx-auto">
// //                     <Image
// //                         className="lg:h-[17vh] w-[50vw] lg:w-auto mx-auto"
// //                         src={Logo3}
// //                         alt="Logo"
// //                         priority
// //                     />
// //                 </Link>
// //
// //                 {/* User Actions */}
// //                 <div className="flex items-center space-x-2 ">
// //                     {token ? (
// //                         <div className="mb-4 lg:mb-0 mr-1 lg:translate-y-[11vh] 2xl:translate-y-[11.3vh] p-2">
// //                             <button
// //                                 onMouseOver={() => setDropdown2(true)}
// //                                 onMouseOut={() => setDropdown2(false)}
// //                                 className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 text-white md:p-0 md:w-auto"
// //                             >
// //                                 <Image
// //                                     className="h-[2.5vh] w-[2.5vh] md:w-10 md:h-10 rounded-full cursor-pointer"
// //                                     src={user?.pfp || '/default-avatar.png'}
// //                                     alt="Profile"
// //                                     width={40}
// //                                     height={40}
// //                                 />
// //                                 <span
// //                                     className={`${
// //                                         dropdown2 || droppeddown2
// //                                             ? 'block max-w-full transition-all duration-500 h-0.5 bg-white'
// //                                             : 'max-w-0 block transition-all duration-500 h-0.5 bg-white'
// //                                     }`}
// //                                 />
// //                             </button>
// //                             <div
// //                                 onMouseOver={() => setDroppeddown2(true)}
// //                                 onMouseOut={() => setDroppeddown2(false)}
// //                                 className={`${
// //                                     dropdown2 || droppeddown2
// //                                         ? 'absolute translate-x-[-10px] translate-y-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
// //                                         : 'hidden'
// //                                 }`}
// //                             >
// //                                 <ul className="py-2 text-sm text-gray-700">
// //                                     <li>
// //                                         <Link
// //                                             href="/profile"
// //                                             className="block px-4 py-2 hover:bg-gray-100 text-center"
// //                                         >
// //                                             View Profile
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <button
// //                                             onClick={handleLogOut}
// //                                             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
// //                                         >
// //                                             Logout User
// //                                         </button>
// //                                     </li>
// //                                 </ul>
// //                             </div>
// //                         </div>
// //                     ) : (
// //                         <button onClick={() => router.push('/login')}>
// //                             <svg
// //                                 className="h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 height="1em"
// //                                 viewBox="0 0 448 512"
// //                             >
// //                                 <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
// //                             </svg>
// //                         </button>
// //                     )}
// //
// //                     <button onClick={() => router.push('/wishlist')}>
// //                         <svg
// //                             className="fill-pink h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             height="1em"
// //                             viewBox="0 0 576 512"
// //                         >
// //                             <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
// //                         </svg>
// //                     </button>
// //
// //                     <button onClick={() => setShow(!show)}>
// //                         <Image
// //                             className="h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2"
// //                             src={CartSVG}
// //                             alt="cart"
// //                             width={40}
// //                             height={40}
// //                         />
// //                     </button>
// //                 </div>
// //             </div>
// //
// //             {/* Navigation Bar */}
// //             <div className="bg-pink bar-3">
// //                 <nav className="border-gray-200
// //                 {/*shadow-gray-400 shadow-lg*/}
// //                 ">
// //                     <div className="p-2">
// //                         <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
// //                             <ul className="flex flex-row font-medium text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
// //                                 <li className="basis-[10%]">
// //                                     <Link
// //                                         href="/"
// //                                         className="group block py-2 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0"
// //                                     >
// //                                         Home
// //                                         <span className="block max-w-0 lg:ml-[25%] lg:mr-[25%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
// //                                     </Link>
// //                                 </li>
// //
// //                                 <li className="basis-[10%]">
// //                                     <button
// //                                         onMouseOver={() => setDropdown(true)}
// //                                         onMouseOut={() => setDropdown(false)}
// //                                         className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 text-white md:p-0 md:w-auto"
// //                                     >
// //                                         Products
// //                                         <span
// //                                             className={`${
// //                                                 dropdown || droppeddown
// //                                                     ? 'block max-w-full transition-all duration-500 h-0.5 bg-white'
// //                                                     : 'max-w-0 block transition-all duration-500 h-0.5 bg-white'
// //                                             }`}
// //                                         />
// //                                     </button>
// //                                     <div
// //                                         onMouseOver={() => setDroppeddown(true)}
// //                                         onMouseOut={() => setDroppeddown(false)}
// //                                         className={`${
// //                                             dropdown || droppeddown
// //                                                 ? 'absolute translate-x-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
// //                                                 : 'hidden'
// //                                         }`}
// //                                     >
// //                                         <ul className="py-2 text-sm text-gray-700">
// //                                             {Categories.map((item, index) => (
// //                                                 <li key={index}>
// //                                                     <Link
// //                                                         href={`/allproducts/${item.slug}/newArrivals`}
// //                                                         className="block px-4 py-2 hover:bg-gray-100"
// //                                                     >
// //                                                         {item.name}
// //                                                     </Link>
// //                                                 </li>
// //                                             ))}
// //                                             <li>
// //                                                 <Link
// //                                                     href="/allproducts/all/newArrivals"
// //                                                     className="block px-4 py-2 hover:bg-gray-100"
// //                                                 >
// //                                                     All
// //                                                 </Link>
// //                                             </li>
// //                                         </ul>
// //                                     </div>
// //                                 </li>
// //
// //                                 <li className="basis-[10%]">
// //                                     <Link
// //                                         href="/about"
// //                                         className="group block py-2 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
// //                                     >
// //                                         About Us
// //                                         <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
// //                                     </Link>
// //                                 </li>
// //
// //                                 <li className="basis-[10%]">
// //                                     <Link
// //                                         href="/offers"
// //                                         className="block group text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
// //                                     >
// //                                         Discounts/Offers
// //                                         <span className="block max-w-0 group-hover:max-w-[100%] transition-all duration-500 h-0.5 bg-white" />
// //                                     </Link>
// //                                 </li>
// //
// //                                 <li className="basis-[10%]">
// //                                     <button
// //                                         onClick={handleTestimonial}
// //                                         className="block group text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
// //                                     >
// //                                         Testimonials
// //                                         <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
// //                                     </button>
// //                                 </li>
// //
// //                                 {user?.admin && (
// //                                     <li className="basis-[4%]">
// //                                         <button
// //                                             onClick={() => router.push('/admin')}
// //                                             className="block group text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
// //                                         >
// //                                             Admin
// //                                             <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
// //                                         </button>
// //                                     </li>
// //                                 )}
// //
// //                                 <li className={user?.admin ? 'basis-[32%]' : 'basis-[35%]'}>
// //                                     {/* Spacer */}
// //                                 </li>
// //
// //                                 <li className="basis-[20%]">
// //                                     <form>
// //                                         <div className="relative">
// //                                             <button
// //                                                 type="submit"
// //                                                 className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
// //                                                     droppeddown2 || dropdown2 ? 'translate-y-3' : ''
// //                                                 }`}
// //                                             >
// //                                                 <svg
// //                                                     className="w-4 h-4 text-white"
// //                                                     aria-hidden="true"
// //                                                     xmlns="http://www.w3.org/2000/svg"
// //                                                     fill="none"
// //                                                     viewBox="0 0 20 20"
// //                                                 >
// //                                                     <path
// //                                                         stroke="currentColor"
// //                                                         strokeLinecap="round"
// //                                                         strokeLinejoin="round"
// //                                                         strokeWidth="2"
// //                                                         d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
// //                                                     />
// //                                                 </svg>
// //                                             </button>
// //                                             {!(droppeddown2 || dropdown2) && (
// //                                                 <>
// //                                                     <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
// //                                                         Search
// //                                                     </label>
// //                                                     <input
// //                                                         type="search"
// //                                                         id="default-search"
// //                                                         className="z-50 flex underline w-full p-1 pl-10 text-sm text-white placeholder-white rounded-lg bg-pink"
// //                                                         placeholder="______________________"
// //                                                         required
// //                                                     />
// //                                                 </>
// //                                             )}
// //                                         </div>
// //                                     </form>
// //                                 </li>
// //                             </ul>
// //                         </div>
// //                     </div>
// //                 </nav>
// //             </div>
// //         </div>
// //     );
// // };
// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useAppSelector, useAppDispatch } from '../hooks/redux';
// import { logoutUser } from '../store/slices/userSlice';
// import { toast } from 'react-toastify';
// import {User, NavbarProps } from '../types';
//
// // Import your images (you'll need to add these to public folder)
// import Logo3 from '@/public/images/Logo3.png';
// import CartSVG from '@/public/svg/shopping-cart.png';
//
// // Categories - you can move this to a separate file
// export const Categories = [
//     { name: 'Women', slug: 'women' },
//     { name: 'Men', slug: 'men' },
//     { name: 'Kids', slug: 'kids' },
//     { name: 'Accessories', slug: 'accessories' },
// ];
//
// export const Navbar: React.FC<NavbarProps> = ({ show, setShow }) => {
//     const [dropdown, setDropdown] = useState<boolean>(false);
//     const [droppeddown, setDroppeddown] = useState<boolean>(false);
//     const [dropdown2, setDropdown2] = useState<boolean>(false);
//     const [droppeddown2, setDroppeddown2] = useState<boolean>(false);
//     const [isScrolled, setIsScrolled] = useState<boolean>(false);
//
//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const { data: user, token } = useAppSelector((state) => state.user);
//
//     // Handle scroll effect
//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY;
//             setIsScrolled(scrollTop > 10);
//         };
//
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);
//
//     const handleTestimonial = (): void => {
//         console.log("check");
//         router.push("/");
//     };
//
//     const handleLogOut = (): void => {
//         dispatch(logoutUser());
//         toast.success('Come Back Soon', {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: true,
//             theme: "dark",
//         });
//         router.push("/login");
//     };
//
//     return (
//         <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//             isScrolled
//                 ? 'bg-white shadow-lg'
//                 : 'bg-black/20 backdrop-blur-sm'
//         }`}>
//             {/* Top Banner */}
//             <div className={`h-[5vh]  py-[1vh] transition-all duration-300 ${
//                 isScrolled
//                     ? 'bg-lightpink text-white'
//                     : 'bg-lightpink/20 text-white/80'
//             }`}>
//                 <h1 className="drop-shadow-xl text-center">
//                     Free shipping for orders over Rs.3000 and more
//                 </h1>
//             </div>
//
//             {/* Header Section */}
//             <div className={`flex h-[12vh] lg:h-[17vh] content-center justify-center align-middle transition-all duration-300 ${
//                 isScrolled
//                     ? 'bg-white'
//                     : 'bg-transparent'
//             }`}>
//                 {/* Social Media Links */}
//                 <ul className="flex">
//                     <li>
//                         <a
//                             target="_blank"
//                             rel="noopener"
//                             href="https://www.instagram.com/tilottamabyarchana/"
//                             title="Tillotama By Archana on Instagram"
//                         >
//                             <svg
//                                 className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
//                                     isScrolled ? 'fill-black' : 'fill-white/60'
//                                 }`}
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 448 512"
//                             >
//                                 <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
//                             </svg>
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             target="_blank"
//                             rel="noopener"
//                             href="https://www.facebook.com/tilottamabyarchana/"
//                             title="Tilottama By Archana on Facebook"
//                         >
//                             <svg
//                                 className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
//                                     isScrolled ? 'fill-black' : 'fill-white/60'
//                                 }`}
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 320 512"
//                             >
//                                 <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
//                             </svg>
//                         </a>
//                     </li>
//                     <li>
//                         <a
//                             target="_blank"
//                             rel="noopener"
//                             href="https://wa.me/+919311144320?text=Hey%20There,%20I'm%20interested%20in%20your%20products"
//                             title="Tilottama on Whatsapp"
//                         >
//                             <svg
//                                 className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
//                                     isScrolled ? 'fill-black' : 'fill-white/60'
//                                 }`}
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 448 512"
//                             >
//                                 <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
//                             </svg>
//                         </a>
//                     </li>
//                 </ul>
//
//                 {/* Logo */}
//                 <Link href="/" className="mx-auto">
//                     <Image
//                         className="lg:h-[17vh] w-[50vw] lg:w-auto mx-auto"
//                         src={Logo3}
//                         alt="Logo"
//                         priority
//                     />
//                 </Link>
//
//                 {/* User Actions */}
//                 <div className="flex items-center space-x-2">
//                     {token ? (
//                         <div className="mb-4 lg:mb-0 mr-1 lg:translate-y-[11vh] 2xl:translate-y-[11.3vh] p-2">
//                             <button
//                                 onMouseOver={() => setDropdown2(true)}
//                                 onMouseOut={() => setDropdown2(false)}
//                                 className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
//                             >
//                                 <Image
//                                     className="h-[2.5vh] w-[2.5vh] md:w-10 md:h-10 rounded-full cursor-pointer"
//                                     src={user?.pfp || '/default-avatar.png'}
//                                     alt="Profile"
//                                     width={40}
//                                     height={40}
//                                 />
//                                 <span
//                                     className={`${
//                                         dropdown2 || droppeddown2
//                                             ? 'block max-w-full transition-all duration-500 h-0.5'
//                                             : 'max-w-0 block transition-all duration-500 h-0.5'
//                                     } ${isScrolled ? 'bg-black' : 'bg-white'}`}
//                                 />
//                             </button>
//                             <div
//                                 onMouseOver={() => setDroppeddown2(true)}
//                                 onMouseOut={() => setDroppeddown2(false)}
//                                 className={`${
//                                     dropdown2 || droppeddown2
//                                         ? 'absolute translate-x-[-10px] translate-y-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
//                                         : 'hidden'
//                                 }`}
//                             >
//                                 <ul className="py-2 text-sm text-gray-700">
//                                     <li>
//                                         <Link
//                                             href="/profile"
//                                             className="block px-4 py-2 hover:bg-gray-100 text-center"
//                                         >
//                                             View Profile
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <button
//                                             onClick={handleLogOut}
//                                             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//                                         >
//                                             Logout User
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     ) : (
//                         <button onClick={() => router.push('/login')}>
//                             <svg
//                                 className={`h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2 transition-colors duration-300 ${
//                                     isScrolled ? 'fill-black' : 'fill-white/60'
//                                 }`}
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 448 512"
//                             >
//                                 <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
//                             </svg>
//                         </button>
//                     )}
//
//                     <button onClick={() => router.push('/wishlist')}>
//                         <svg
//                             className={`h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2 transition-colors duration-300 ${
//                                 isScrolled ? 'fill-pink' : 'fill-pink/20'
//                             }`}
//                             xmlns="http://www.w3.org/2000/svg"
//                             height="1em"
//                             viewBox="0 0 576 512"
//                         >
//                             <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
//                         </svg>
//                     </button>
//
//                     <button onClick={() => setShow(!show)}>
//                         <Image
//                             className="h-[4vh] lg:h-[6vh] lg:translate-y-[5.5vh] translate-y-[-4vh] p-2"
//                             src={CartSVG}
//                             alt="cart"
//                             width={40}
//                             height={40}
//                             style={{
//                                 filter: isScrolled ? 'brightness(0)' : 'brightness(1)'
//                             }}
//                         />
//                     </button>
//                 </div>
//             </div>
//
//             {/* Navigation Bar */}
//             <div className={`bar-3 transition-all duration-300 ${
//                 isScrolled
//                     ? 'bg-pink text-white' : 'bg-pink/20 text-white/80'
//             }`}>
//                 <nav className="border-gray-200">
//                     <div className="p-2">
//                         <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
//                             <ul className="flex flex-row font-medium text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
//                                 <li className="basis-[10%]">
//                                     <Link
//                                         href="/"
//                                         className="group block py-2 pr-4  bg-blue-700 rounded md:bg-transparent  md:p-0"
//                                     >
//                                         Home
//                                         <span className="block max-w-0 lg:ml-[25%] lg:mr-[25%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
//                                     </Link>
//                                 </li>
//
//                                 <li className="basis-[10%]">
//                                     <button
//                                         onMouseOver={() => setDropdown(true)}
//                                         onMouseOut={() => setDropdown(false)}
//                                         className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
//                                     >
//                                         Products
//                                         <span
//                                             className={`${
//                                                 dropdown || droppeddown
//                                                     ? 'block max-w-full transition-all duration-500 h-0.5 bg-white'
//                                                     : 'max-w-0 block transition-all duration-500 h-0.5 bg-white'
//                                             }`}
//                                         />
//                                     </button>
//                                     <div
//                                         onMouseOver={() => setDroppeddown(true)}
//                                         onMouseOut={() => setDroppeddown(false)}
//                                         className={`${
//                                             dropdown || droppeddown
//                                                 ? 'absolute translate-x-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
//                                                 : 'hidden'
//                                         }`}
//                                     >
//                                         <ul className="py-2 text-sm text-gray-700">
//                                             {Categories.map((item, index) => (
//                                                 <li key={index}>
//                                                     <Link
//                                                         href={`/allproducts/${item.slug}/newArrivals`}
//                                                         className="block px-4 py-2 hover:bg-gray-100"
//                                                     >
//                                                         {item.name}
//                                                     </Link>
//                                                 </li>
//                                             ))}
//                                             <li>
//                                                 <Link
//                                                     href="/allproducts/all/newArrivals"
//                                                     className="block px-4 py-2 hover:bg-gray-100"
//                                                 >
//                                                     All
//                                                 </Link>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </li>
//
//                                 <li className="basis-[10%]">
//                                     <Link
//                                         href="/about"
//                                         className="group block py-2  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
//                                     >
//                                         About Us
//                                         <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
//                                     </Link>
//                                 </li>
//
//                                 <li className="basis-[10%]">
//                                     <Link
//                                         href="/offers"
//                                         className="block group  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
//                                     >
//                                         Discounts/Offers
//                                         <span className="block max-w-0 group-hover:max-w-[100%] transition-all duration-500 h-0.5 bg-white" />
//                                     </Link>
//                                 </li>
//
//                                 <li className="basis-[10%]">
//                                     <button
//                                         onClick={handleTestimonial}
//                                         className="block group  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
//                                     >
//                                         Testimonials
//                                         <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
//                                     </button>
//                                 </li>
//
//                                 {user?.admin && (
//                                     <li className="basis-[4%]">
//                                         <button
//                                             onClick={() => router.push('/admin')}
//                                             className="block group rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
//                                         >
//                                             Admin
//                                             <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
//                                         </button>
//                                     </li>
//                                 )}
//
//                                 <li className={user?.admin ? 'basis-[32%]' : 'basis-[35%]'}>
//                                     {/* Spacer */}
//                                 </li>
//
//                                 <li className="basis-[20%]">
//                                     <form>
//                                         <div className="relative">
//                                             <button
//                                                 type="submit"
//                                                 className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                                                     droppeddown2 || dropdown2 ? 'translate-y-3' : ''
//                                                 }`}
//                                             >
//                                                 <svg
//                                                     className={`w-4 h-4 ${
//                                                         isScrolled ? ' text-white ' : ' text-white/80 '
//                                                     }`}
//                                                     aria-hidden="true"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     fill="none"
//                                                     viewBox="0 0 20 20"
//                                                 >
//                                                     <path
//                                                         stroke="currentColor"
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth="2"
//                                                         d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                             {!(droppeddown2 || dropdown2) && (
//                                                 <>
//                                                     <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
//                                                         Search
//                                                     </label>
//                                                     <input
//                                                         type="search"
//                                                         id="default-search"
//                                                         className={`z-50 flex underline w-full p-1 pl-10 text-sm   rounded-lg transition-all duration-300 ${
//                                                             isScrolled ? 'bg-pink text-white placeholder-white' : 'bg-pink/0 text-white/80 placeholder-white/20'
//                                                         }`}
//                                                         placeholder="______________________"
//                                                         required
//                                                     />
//                                                 </>
//                                             )}
//                                         </div>
//                                     </form>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//         </div>
//     );
// };
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logoutUser } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import {User, NavbarProps } from '../types';

// Import your images (you'll need to add these to public folder)
import Logo3 from '@/public/images/Logo3.png';
import CartSVG from '@/public/svg/shopping-cart.png';

// Categories - you can move this to a separate file
export const Categories = [
    { name: 'Women', slug: 'women' },
    { name: 'Men', slug: 'men' },
    { name: 'Kids', slug: 'kids' },
    { name: 'Accessories', slug: 'accessories' },
];

export const Navbar: React.FC<NavbarProps> = ({ show, setShow }) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [droppeddown, setDroppeddown] = useState<boolean>(false);
    const [dropdown2, setDropdown2] = useState<boolean>(false);
    const [droppeddown2, setDroppeddown2] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: user, token } = useAppSelector((state) => state.user);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTestimonial = (): void => {
        console.log("check");
        router.push("/");
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
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white shadow-lg'
                : 'bg-black/20 backdrop-blur-sm'
        }`}>
            {/* Top Banner */}
            <div className={`h-[5vh] py-[1vh] transition-all duration-300 ${
                isScrolled
                    ? 'bg-lightpink text-white'
                    : 'bg-lightpink/20 text-white/80'
            }`}>
                <h1 className="drop-shadow-xl text-center">
                    Free shipping for orders over Rs.3000 and more
                </h1>
            </div>

            {/* Header Section */}
            <div className={`flex h-[18vh] lg:h-[10vh] content-center justify-between align-middle px-4 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white'
                    : 'bg-transparent'
            }`}>
                {/* Social Media Links - Left Side */}
                <div className="flex items-end">
                    <ul className="flex">
                        <li>
                            <a
                                target="_blank"
                                rel="noopener"
                                href="https://www.instagram.com/tilottamabyarchana/"
                                title="Tillotama By Archana on Instagram"
                            >
                                <svg
                                    className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
                                        isScrolled ? 'fill-black' : 'fill-white/60'
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
                                    className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
                                        isScrolled ? 'fill-black' : 'fill-white/60'
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
                                    className={`h-[4vh] lg:h-[6vh] p-2 md:pr-4 transition-colors duration-300 ${
                                        isScrolled ? 'fill-black' : 'fill-white/60'
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

                {/* Logo - Center */}
                <Link href="/" className="flex-1 flex justify-center items-center">
                    <Image
                        className="lg:h-[15vh] w-[50vw] lg:w-auto"
                        src={Logo3}
                        alt="Logo"
                        priority
                    />
                </Link>

                {/* User Actions - Right Side */}
                <div className="flex items-end space-x-2">
                    {token ? (
                        <div className="mb-4 lg:mb-0 mr-1 lg:translate-y-[11vh] 2xl:translate-y-[11.3vh] p-2">
                            <button
                                onMouseOver={() => setDropdown2(true)}
                                onMouseOut={() => setDropdown2(false)}
                                className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
                            >
                                <Image
                                    className="h-[2.5vh] w-[2.5vh] md:w-10 md:h-10 rounded-full cursor-pointer"
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
                                        ? 'absolute translate-x-[-10px] translate-y-[-10px] bg-white z-10 font-normal divide-y divide-gray-100 shadow-md w-44'
                                        : 'hidden'
                                }`}
                            >
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 text-center"
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
                                className={`h-[4vh] lg:h-[6vh] p-2 transition-colors duration-300 ${
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
                            className={`h-[4vh] lg:h-[6vh] p-2 transition-colors duration-300 ${
                                isScrolled ? 'fill-pink' : 'fill-pink/20'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 576 512"
                        >
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                    </button>

                    <button onClick={() => setShow(!show)}>
                        <Image
                            className="h-[4vh] lg:h-[6vh] p-2"
                            src={CartSVG}
                            alt="cart"
                            width={40}
                            height={40}
                            style={{
                                filter: isScrolled ? 'brightness(0)' : 'brightness(1)'
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className={`bar-3 transition-all duration-300 ${
                isScrolled
                    ? 'bg-pink text-white' : 'bg-pink/20 text-white/80'
            }`}>
                <nav className="border-gray-200">
                    <div className="p-2">
                        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                            <ul className="flex flex-row font-medium text-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                                <li className="basis-[10%]">
                                    <Link
                                        href="/"
                                        className="group block py-2 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0"
                                    >
                                        Home
                                        <span className="block max-w-0 lg:ml-[25%] lg:mr-[25%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                    </Link>
                                </li>

                                <li className="basis-[10%]">
                                    <button
                                        onMouseOver={() => setDropdown(true)}
                                        onMouseOut={() => setDropdown(false)}
                                        className="group flex items-center justify-between w-full py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
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
                                                        href={`/allproducts/${item.slug}/newArrivals`}
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

                                <li className="basis-[10%]">
                                    <Link
                                        href="/about"
                                        className="group block py-2 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                                    >
                                        About Us
                                        <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                    </Link>
                                </li>

                                <li className="basis-[10%]">
                                    <Link
                                        href="/offers"
                                        className="block group rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                                    >
                                        Discounts/Offers
                                        <span className="block max-w-0 group-hover:max-w-[100%] transition-all duration-500 h-0.5 bg-white" />
                                    </Link>
                                </li>

                                <li className="basis-[10%]">
                                    <button
                                        onClick={handleTestimonial}
                                        className="block group rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                                    >
                                        Testimonials
                                        <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                    </button>
                                </li>

                                {user?.admin && (
                                    <li className="basis-[4%]">
                                        <button
                                            onClick={() => router.push('/admin')}
                                            className="block group rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                                        >
                                            Admin
                                            <span className="block max-w-0 lg:ml-[20%] lg:mr-[20%] group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                                        </button>
                                    </li>
                                )}

                                <li className={user?.admin ? 'basis-[32%]' : 'basis-[35%]'}>
                                    {/* Spacer */}
                                </li>

                                <li className="basis-[20%]">
                                    <form>
                                        <div className="relative">
                                            <button
                                                type="submit"
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    droppeddown2 || dropdown2 ? 'translate-y-3' : ''
                                                }`}
                                            >
                                                <svg
                                                    className={`w-4 h-4 ${
                                                        isScrolled ? 'text-white' : 'text-white/80'
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
                                            {!(droppeddown2 || dropdown2) && (
                                                <>
                                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                                                        Search
                                                    </label>
                                                    <input
                                                        type="search"
                                                        id="default-search"
                                                        className={`z-50 flex underline w-full p-1 pl-10 text-sm rounded-lg transition-all duration-300 ${
                                                            isScrolled ? 'bg-pink text-white placeholder-white' : 'bg-pink/0 text-white/80 placeholder-white/20'
                                                        }`}
                                                        placeholder="______________________"
                                                        required
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};