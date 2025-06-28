// "use client";
// import React, { useState, useEffect, Fragment } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
//
// // Redux imports with memoized selectors
// import { useAppDispatch } from '@/hooks/redux';
// import {
//     useProducts,
//     usePaginatedProducts,
//     usePagination,
//     useProductFilters
// } from '@/hooks/redux';
// import {
//     fetchAllProducts,
//     setFilters,
//     clearFilters,
//     setCurrentPage,
// } from '@/store/slices/allProductSlice';
//
// // Components
// import ProductCard from '@/components/allProducts/ProductCard';
// import { Categories } from "@/public/Categories";
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
//
// // Helper function to encode category name for URL
// const encodeCategoryForUrl = (categoryName) => {
//     if (categoryName === 'all') return 'all';
//     return encodeURIComponent(categoryName);
// };
//
// // Helper function to decode category name from URL
// const decodeCategoryFromUrl = (urlCategory) => {
//     if (!urlCategory || urlCategory === 'all') return 'all';
//     return decodeURIComponent(urlCategory);
// };
//
// // Helper function to find matching category
// const findMatchingCategory = (decodedCategory) => {
//     if (decodedCategory === 'all') return { name: 'all' };
//
//     return Categories.find(cat =>
//         cat.name.toLowerCase() === decodedCategory.toLowerCase()
//     ) || { name: 'all' };
// };
//
// const AllProductsPage = () => {
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const params = useParams();
//
//     // Redux state with memoized selectors
//     const {
//         items: allProducts,
//         loading,
//         error,
//         status,
//         categories: reduxCategories,
//     } = useProducts();
//
//     // Memoized selectors
//     const paginatedProducts = usePaginatedProducts();
//     const pagination = usePagination();
//     const { filters, hasActiveFilters } = useProductFilters();
//
//     // URL params with proper decoding
//     const rawCategory = params.category || 'all';
//     const decodedCategory = decodeCategoryFromUrl(rawCategory);
//     const currentCategory = findMatchingCategory(decodedCategory);
//     const sortBy = params.sortBy || '';
//
//     // Local state for immediate UI updates
//     const [localSearchTerm, setLocalSearchTerm] = useState('');
//     const [localPriceRange, setLocalPriceRange] = useState([0, 10000]);
//     const [isInitialized, setIsInitialized] = useState(false);
//     const [showFilters, setShowFilters] = useState(false);
//
//     // Get max price from products
//     const maxPrice = allProducts.length > 0
//         ? Math.max(...allProducts.map(product => product.price || 0))
//         : 10000;
//
//     // Initialize component
//     useEffect(() => {
//         const initializeComponent = async () => {
//             try {
//                 // Fetch products if not already loaded
//                 if (status === 'idle' || allProducts.length === 0) {
//                     console.log('🔄 Fetching products...');
//                     await dispatch(fetchAllProducts()).unwrap();
//                 }
//
//                 // Set initial filters based on URL
//                 const initialFilters = {
//                     category: currentCategory.name !== 'all' ? currentCategory.name : '',
//                     search: '',
//                     priceRange: [0, maxPrice],
//                     sortBy: getSortByValue(sortBy),
//                     sortOrder: getSortOrderValue(sortBy),
//                 };
//
//                 dispatch(setFilters(initialFilters));
//                 setLocalPriceRange([0, maxPrice]);
//                 setIsInitialized(true);
//
//                 console.log('✅ Component initialized with category:', currentCategory.name);
//                 console.log('✅ Decoded category:', decodedCategory);
//                 console.log('✅ Initial filters:', initialFilters);
//             } catch (error) {
//                 console.error('❌ Failed to initialize component:', error);
//             }
//         };
//
//         initializeComponent();
//     }, [dispatch, status, allProducts.length, currentCategory.name, sortBy, maxPrice]);
//
//     // Update local price range when max price changes
//     useEffect(() => {
//         if (maxPrice > 0 && !isInitialized) {
//             setLocalPriceRange([0, maxPrice]);
//         }
//     }, [maxPrice, isInitialized]);
//
//     // Handle search with debouncing
//     useEffect(() => {
//         const delayedSearch = setTimeout(() => {
//             dispatch(setFilters({ search: localSearchTerm }));
//         }, 300);
//
//         return () => clearTimeout(delayedSearch);
//     }, [localSearchTerm, dispatch]);
//
//     // Handle price range with debouncing
//     useEffect(() => {
//         const delayedPriceUpdate = setTimeout(() => {
//             dispatch(setFilters({ priceRange: localPriceRange }));
//         }, 500);
//
//         return () => clearTimeout(delayedPriceUpdate);
//     }, [localPriceRange, dispatch]);
//
//     // Helper functions for sorting
//     const getSortByValue = (sortParam) => {
//         switch (sortParam) {
//             case 'incPrice':
//             case 'decPrice':
//                 return 'price';
//             case 'userRating':
//                 return 'averageRating';
//             case 'newArrivals':
//                 return 'createdAt';
//             default:
//                 return 'createdAt';
//         }
//     };
//
//     const getSortOrderValue = (sortParam) => {
//         switch (sortParam) {
//             case 'incPrice':
//                 return 'asc';
//             case 'decPrice':
//             case 'userRating':
//             case 'newArrivals':
//                 return 'desc';
//             default:
//                 return 'desc';
//         }
//     };
//
//     // Navigation handlers
//     const handleSortChange = (newSortBy) => {
//         const sortBy = getSortByValue(newSortBy);
//         const sortOrder = getSortOrderValue(newSortBy);
//
//         dispatch(setFilters({ sortBy, sortOrder }));
//
//         // Use encoded category for URL
//         const encodedCategory = encodeCategoryForUrl(currentCategory.name);
//         router.push(`/allproducts/${encodedCategory}/${newSortBy}`);
//     };
//
//     const handleCategoryChange = (newCategory) => {
//         const categoryValue = newCategory.name === 'all' ? '' : newCategory.name;
//         dispatch(setFilters({ category: categoryValue }));
//
//         // Use encoded category for URL
//         const encodedCategory = encodeCategoryForUrl(newCategory.name);
//         const currentSort = sortBy || 'newArrivals';
//         router.push(`/allproducts/${encodedCategory}/${currentSort}`);
//     };
//
//     const handlePageChange = (pageNumber) => {
//         dispatch(setCurrentPage(pageNumber));
//         // Smooth scroll to top
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     const handleClearFilters = () => {
//         dispatch(clearFilters());
//         setLocalSearchTerm('');
//         setLocalPriceRange([0, maxPrice]);
//         router.push('/allproducts/all/newArrivals');
//     };
//
//     // Display helper function
//     const getDisplayCategoryName = (categoryName) => {
//         if (categoryName === 'all') return 'All Products';
//         return categoryName.split(' ').map(word =>
//             word.charAt(0).toUpperCase() + word.slice(1)
//         ).join(' ');
//     };
//
//     // Loading state
//     if (loading && !isInitialized) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading products...</p>
//                 </div>
//             </div>
//         );
//     }
//
//     // Error state
//     if (error && !allProducts.length) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-center">
//                     <div className="text-red-500 text-xl mb-4">⚠️ Error loading products</div>
//                     <p className="text-gray-600 mb-4">{error}</p>
//                     <button
//                         onClick={() => dispatch(fetchAllProducts())}
//                         className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className='mx-[2%] py-8'>
//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                     {getDisplayCategoryName(currentCategory.name)}
//                 </h1>
//                 {/*<p className="text-gray-600">*/}
//                 {/*    {pagination.totalItems > 0 ? `${pagination.totalItems} products available` : 'No products found'}*/}
//                 {/*</p>*/}
//
//                 {/* Category Navigation */}
//                 <div className="flex flex-wrap gap-2 mb-4 mt-4">
//                     <button
//                         onClick={() => handleCategoryChange({ name: 'all' })}
//                         className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                             currentCategory.name === 'all'
//                                 ? 'bg-pink-600 text-white'
//                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                         }`}
//                     >
//                         All Products
//                     </button>
//                     {Categories.map((cat) => (
//                         <button
//                             key={cat.name}
//                             onClick={() => handleCategoryChange(cat)}
//                             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                                 currentCategory.name === cat.name
//                                     ? 'bg-pink-600 text-white'
//                                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                             }`}
//                         >
//                             {getDisplayCategoryName(cat.name)}
//                         </button>
//                     ))}
//                 </div>
//
//                 {/*/!* Debug info (remove in production) *!/*/}
//                 {/*{process.env.NODE_ENV === 'development' && (*/}
//                 {/*    <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-4">*/}
//                 {/*        <p>Raw URL category: {rawCategory}</p>*/}
//                 {/*        <p>Decoded category: {decodedCategory}</p>*/}
//                 {/*        <p>Current category: {currentCategory.name}</p>*/}
//                 {/*        <p>Filters category: {filters.category}</p>*/}
//                 {/*    </div>*/}
//                 {/*)}*/}
//             </div>
//
//             {/* Search Bar and Controls */}
//             <div className='mb-6'>
//                 {/* Top Row: Sort, Search, and Filters */}
//                 <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 items-stretch sm:items-center mb-4">
//                     {/* Sort Dropdown - Left */}
//                     <Menu as="div" className="relative inline-block text-left flex-shrink-0">
//                         <div>
//                             <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto">
//                                 Sort By
//                                 <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </Menu.Button>
//                         </div>
//                         <Transition
//                             as={Fragment}
//                             enter="transition ease-out duration-100"
//                             enterFrom="transform opacity-0 scale-95"
//                             enterTo="transform opacity-100 scale-100"
//                             leave="transition ease-in duration-75"
//                             leaveFrom="transform opacity-100 scale-100"
//                             leaveTo="transform opacity-0 scale-95"
//                         >
//                             <Menu.Items className="absolute z-20 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                 <div className="py-1">
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <button
//                                                 onClick={() => handleSortChange('incPrice')}
//                                                 className={classNames(
//                                                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                                                     'block px-4 py-2 text-sm w-full text-left',
//                                                     sortBy === 'incPrice' ? 'bg-pink-50 text-pink-700' : ''
//                                                 )}
//                                             >
//                                                 Price: Low to High
//                                             </button>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <button
//                                                 onClick={() => handleSortChange('decPrice')}
//                                                 className={classNames(
//                                                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                                                     'block px-4 py-2 text-sm w-full text-left',
//                                                     sortBy === 'decPrice' ? 'bg-pink-50 text-pink-700' : ''
//                                                 )}
//                                             >
//                                                 Price: High to Low
//                                             </button>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <button
//                                                 onClick={() => handleSortChange('userRating')}
//                                                 className={classNames(
//                                                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                                                     'block px-4 py-2 text-sm w-full text-left',
//                                                     sortBy === 'userRating' ? 'bg-pink-50 text-pink-700' : ''
//                                                 )}
//                                             >
//                                                 Customer Rating
//                                             </button>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <button
//                                                 onClick={() => handleSortChange('newArrivals')}
//                                                 className={classNames(
//                                                     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                                                     'block px-4 py-2 text-sm w-full text-left',
//                                                     sortBy === 'newArrivals' ? 'bg-pink-50 text-pink-700' : ''
//                                                 )}
//                                             >
//                                                 Newest Arrivals
//                                             </button>
//                                         )}
//                                     </Menu.Item>
//                                 </div>
//                             </Menu.Items>
//                         </Transition>
//                     </Menu>
//
//                     {/* Search Bar - Center */}
//
//
//                     {/* Filters Toggle Button - Right */}
//                     <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto"
//                     >
//                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
//                         </svg>
//                         Filters
//                         {hasActiveFilters && (
//                             <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-pink-100 bg-pink-600 rounded-full ml-1">
//                                 {[
//                                     filters.search && 1,
//                                     filters.category && 1,
//                                     (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && 1,
//                                     filters.inStock && 1,
//                                     filters.minRating > 0 && 1
//                                 ].filter(Boolean).length}
//                             </span>
//                         )}
//                         <ChevronDownIcon className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} aria-hidden="true" />
//                     </button>
//                     <div className="relative flex-grow col-span-2">
//                         <input
//                             type='text'
//                             placeholder='Search products by name, description, or category...'
//                             value={localSearchTerm}
//                             onChange={(e) => setLocalSearchTerm(e.target.value)}
//                             className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-pink-500 focus:border-transparent pl-10 pr-4'
//                         />
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </div>
//                         {localSearchTerm && (
//                             <button
//                                 onClick={() => setLocalSearchTerm('')}
//                                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                             >
//                                 <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         )}
//                     </div>
//                 </div>
//
//                 {/* Search Helper Text */}
//                 {localSearchTerm && (
//                     <p className="text-sm text-gray-500 mb-2">
//                         Searching for "{localSearchTerm}"...
//                     </p>
//                 )}
//
//                 {/* Filters Panel - Shows/Hides on button click */}
//                 {showFilters && (
//                     <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//                         <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                             {/* Price Range Filter */}
//                             <div>
//                                 <label className='block text-sm font-medium text-gray-700 mb-3'>
//                                     Price Range: ₹{localPriceRange[0].toLocaleString()} - ₹{localPriceRange[1].toLocaleString()}
//                                 </label>
//                                 <Slider
//                                     range
//                                     min={0}
//                                     max={maxPrice}
//                                     value={localPriceRange}
//                                     onChange={(value) => setLocalPriceRange(value)}
//                                     className="mb-2"
//                                     trackStyle={[{ backgroundColor: '#ec4899' }]}
//                                     handleStyle={[
//                                         { borderColor: '#ec4899', backgroundColor: '#ec4899' },
//                                         { borderColor: '#ec4899', backgroundColor: '#ec4899' }
//                                     ]}
//                                 />
//                                 <div className='flex justify-between text-xs text-gray-500'>
//                                     <span>₹0</span>
//                                     <span>₹{maxPrice.toLocaleString()}</span>
//                                 </div>
//                             </div>
//
//                             {/* Stock and Rating Filters */}
//                             <div className="space-y-4 grid grid-cols-2 gap-4">
//                                 {/* Rating Filter */}
//                                 <div>
//                                     <label className='block text-sm font-medium text-gray-700 mb-2'>
//                                         Minimum Rating
//                                     </label>
//                                     <select
//                                         value={filters.minRating || 0}
//                                         onChange={(e) => dispatch(setFilters({ minRating: parseInt(e.target.value) }))}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-sm"
//                                     >
//                                         <option value={0}>Any Rating</option>
//                                         <option value={1}>1+ Stars</option>
//                                         <option value={2}>2+ Stars</option>
//                                         <option value={3}>3+ Stars</option>
//                                         <option value={4}>4+ Stars</option>
//                                         <option value={5}>5 Stars Only</option>
//                                     </select>
//                                 </div>
//
//                                 {/* Stock Filter */}
//                                 <div className="flex items-center pt-6">
//                                     <label className="flex items-center text-sm">
//                                         <input
//                                             type="checkbox"
//                                             checked={filters.inStock || false}
//                                             onChange={(e) => dispatch(setFilters({ inStock: e.target.checked }))}
//                                             className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 mr-2"
//                                         />
//                                         <span className="text-gray-700">In Stock Only</span>
//                                     </label>
//                                 </div>
//                             </div>
//
//                             {/* Action Buttons */}
//                             <div className="flex flex-col sm:flex-row gap-2 justify-end">
//                                 <button
//                                     onClick={handleClearFilters}
//                                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
//                                 >
//                                     Clear All Filters
//                                 </button>
//                                 <button
//                                     onClick={() => setShowFilters(false)}
//                                     className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
//                                 >
//                                     Hide Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//
//             {/* Active Filters Display */}
//             {hasActiveFilters && filters.category != "" && (
//                 <div className="mb-4 p-3 bg-pink-50 rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-medium text-pink-800">Active Filters:</p>
//                         <button
//                             onClick={handleClearFilters}
//                             className="text-xs text-pink-600 hover:text-pink-800 underline"
//                         >
//                             Clear all
//                         </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {filters.search && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
//                                 Search: "{filters.search}"
//                                 <button
//                                     onClick={() => {
//                                         setLocalSearchTerm('');
//                                         dispatch(setFilters({ search: '' }));
//                                     }}
//                                     className="ml-1 text-pink-600 hover:text-pink-800"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         {filters.category && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
//                                 Category: {getDisplayCategoryName(filters.category)}
//                                 <button
//                                     onClick={() => dispatch(setFilters({ category: '' }))}
//                                     className="ml-1 text-pink-600 hover:text-pink-800"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         {(filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice)) && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
//                                 Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
//                                 <button
//                                     onClick={() => {
//                                         setLocalPriceRange([0, maxPrice]);
//                                         dispatch(setFilters({ priceRange: [0, maxPrice] }));
//                                     }}
//                                     className="ml-1 text-pink-600 hover:text-pink-800"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         {filters.inStock && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
//                                 In Stock Only
//                                 <button
//                                     onClick={() => dispatch(setFilters({ inStock: false }))}
//                                     className="ml-1 text-pink-600 hover:text-pink-800"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         {filters.minRating > 0 && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
//                                 {filters.minRating}+ Stars
//                                 <button
//                                     onClick={() => dispatch(setFilters({ minRating: 0 }))}
//                                     className="ml-1 text-pink-600 hover:text-pink-800"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             )}
//
//             {/* Results Count */}
//             <div className="mb-4 flex justify-between items-center">
//                 <p className="text-gray-600">
//                     Showing {paginatedProducts.length} of {pagination.totalItems} products
//                     {pagination.currentPage > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
//                 </p>
//                 {loading && (
//                     <div className="flex items-center text-sm text-gray-500">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
//                         Updating...
//                     </div>
//                 )}
//             </div>
//
//             {/* Products Grid */}
//             <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-8'>
//                 {paginatedProducts.length > 0 ? (
//                     paginatedProducts.map((product) => (
//                         <ProductCard key={product._id} product={product} />
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-12">
//                         <div className="text-gray-400 text-6xl mb-4">📦</div>
//                         <p className="text-gray-500 text-lg mb-2">No products found matching your criteria.</p>
//                         <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search terms.</p>
//                         <button
//                             onClick={handleClearFilters}
//                             className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
//                         >
//                             Clear All Filters
//                         </button>
//                     </div>
//                 )}
//             </div>
//
//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//                 <div className='flex justify-center'>
//                     <nav className="flex items-center space-x-2" aria-label="Pagination">
//                         <button
//                             onClick={() => handlePageChange(pagination.currentPage - 1)}
//                             disabled={!pagination.hasPreviousPage}
//                             className={`px-3 py-2 rounded-md text-sm font-medium ${
//                                 !pagination.hasPreviousPage
//                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                     : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                             }`}
//                         >
//                             Previous
//                         </button>
//
//                         {/* Page numbers */}
//                         {(() => {
//                             const pages = [];
//                             const showPages = 5; // Show 5 page numbers at a time
//                             let startPage = Math.max(1, pagination.currentPage - Math.floor(showPages / 2));
//                             let endPage = Math.min(pagination.totalPages, startPage + showPages - 1);
//
//                             // Adjust start page if we're near the end
//                             if (endPage - startPage < showPages - 1) {
//                                 startPage = Math.max(1, endPage - showPages + 1);
//                             }
//
//                             // First page and ellipsis
//                             if (startPage > 1) {
//                                 pages.push(
//                                     <button
//                                         key={1}
//                                         onClick={() => handlePageChange(1)}
//                                         className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                                     >
//                                         1
//                                     </button>
//                                 );
//                                 if (startPage > 2) {
//                                     pages.push(
//                                         <span key="ellipsis1" className="px-3 py-2 text-gray-500">
//                                             ...
//                                         </span>
//                                     );
//                                 }
//                             }
//
//                             // Main page numbers
//                             for (let i = startPage; i <= endPage; i++) {
//                                 pages.push(
//                                     <button
//                                         key={i}
//                                         onClick={() => handlePageChange(i)}
//                                         className={`px-3 py-2 rounded-md text-sm font-medium ${
//                                             pagination.currentPage === i
//                                                 ? 'bg-pink-600 text-white'
//                                                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                                         }`}
//                                     >
//                                         {i}
//                                     </button>
//                                 );
//                             }
//
//                             // Last page and ellipsis
//                             if (endPage < pagination.totalPages) {
//                                 if (endPage < pagination.totalPages - 1) {
//                                     pages.push(
//                                         <span key="ellipsis2" className="px-3 py-2 text-gray-500">
//                                             ...
//                                         </span>
//                                     );
//                                 }
//                                 pages.push(
//                                     <button
//                                         key={pagination.totalPages}
//                                         onClick={() => handlePageChange(pagination.totalPages)}
//                                         className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
//                                     >
//                                         {pagination.totalPages}
//                                     </button>
//                                 );
//                             }
//
//                             return pages;
//                         })()}
//
//                         <button
//                             onClick={() => handlePageChange(pagination.currentPage + 1)}
//                             disabled={!pagination.hasNextPage}
//                             className={`px-3 py-2 rounded-md text-sm font-medium ${
//                                 !pagination.hasNextPage
//                                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                     : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                             }`}
//                         >
//                             Next
//                         </button>
//                     </nav>
//                 </div>
//             )}
//
//             {/* Go to Top Button */}
//             {pagination.currentPage > 1 && (
//                 <div className="fixed bottom-6 right-6">
//                     <button
//                         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                         className="p-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors"
//                         aria-label="Go to top"
//                     >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//                         </svg>
//                     </button>
//                 </div>
//             )}
//
//             {/* Footer */}
//             <div className="mt-12 border-t pt-8 text-center text-gray-500">
//                 <p>
//                     Can't find what you're looking for?{' '}
//                     <button
//                         onClick={() => setLocalSearchTerm('')}
//                         className="text-pink-600 hover:text-pink-700 underline"
//                     >
//                         Browse all products
//                     </button>
//                     {' '}or{' '}
//                     <a
//                         href="/contact"
//                         className="text-pink-600 hover:text-pink-700 underline"
//                     >
//                         contact us
//                     </a>
//                     .
//                 </p>
//             </div>
//         </div>
//     );
// };
//
// export default AllProductsPage;
"use client";
import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Redux imports with memoized selectors
import { useAppDispatch } from '@/hooks/redux';
import {
    useProducts,
    usePaginatedProducts,
    usePagination,
    useProductFilters
} from '@/hooks/redux';
import {
    fetchAllProducts,
    setFilters,
    clearFilters,
    setCurrentPage,
} from '@/store/slices/allProductSlice';

// Components
import ProductCard from '@/components/allProducts/ProductCard';
import { Categories } from "@/public/Categories";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// Helper function to encode category name for URL
const encodeCategoryForUrl = (categoryName) => {
    if (categoryName === 'all') return 'all';
    return encodeURIComponent(categoryName);
};

// Helper function to decode category name from URL
const decodeCategoryFromUrl = (urlCategory) => {
    if (!urlCategory || urlCategory === 'all') return 'all';
    return decodeURIComponent(urlCategory);
};

// Helper function to find matching category
const findMatchingCategory = (decodedCategory) => {
    if (decodedCategory === 'all') return { name: 'all' };

    return Categories.find(cat =>
        cat.name.toLowerCase() === decodedCategory.toLowerCase()
    ) || { name: 'all' };
};

const AllProductsPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams(); // Add this to get URL search parameters

    // Redux state with memoized selectors
    const {
        items: allProducts,
        loading,
        error,
        status,
        categories: reduxCategories,
    } = useProducts();

    // Memoized selectors
    const paginatedProducts = usePaginatedProducts();
    const pagination = usePagination();
    const { filters, hasActiveFilters } = useProductFilters();

    // URL params with proper decoding
    const rawCategory = params.category || 'all';
    const decodedCategory = decodeCategoryFromUrl(rawCategory);
    const currentCategory = findMatchingCategory(decodedCategory);
    const sortBy = params.sortBy || '';

    // Get search parameter from URL
    const searchParam = searchParams.get('search') || '';

    // Local state for immediate UI updates
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [localPriceRange, setLocalPriceRange] = useState([0, 10000]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Get max price from products
    const maxPrice = allProducts.length > 0
        ? Math.max(...allProducts.map(product => product.price || 0))
        : 10000;

    // Initialize component
    useEffect(() => {
        const initializeComponent = async () => {
            try {
                // Fetch products if not already loaded
                if (status === 'idle' || allProducts.length === 0) {
                    console.log('🔄 Fetching products...');
                    await dispatch(fetchAllProducts()).unwrap();
                }

                // Set initial filters based on URL and search params
                const initialFilters = {
                    category: currentCategory.name !== 'all' ? currentCategory.name : '',
                    search: searchParam, // Use search parameter from URL
                    priceRange: [0, maxPrice],
                    sortBy: getSortByValue(sortBy),
                    sortOrder: getSortOrderValue(sortBy),
                };

                dispatch(setFilters(initialFilters));
                setLocalSearchTerm(searchParam); // Set local search term from URL
                setLocalPriceRange([0, maxPrice]);
                setIsInitialized(true);

                console.log('✅ Component initialized with category:', currentCategory.name);
                console.log('✅ Decoded category:', decodedCategory);
                console.log('✅ Search param:', searchParam);
                console.log('✅ Initial filters:', initialFilters);
            } catch (error) {
                console.error('❌ Failed to initialize component:', error);
            }
        };

        initializeComponent();
    }, [dispatch, status, allProducts.length, currentCategory.name, sortBy, maxPrice, searchParam]);

    // Update local search term when URL search param changes
    useEffect(() => {
        setLocalSearchTerm(searchParam);
    }, [searchParam]);

    // Update local price range when max price changes
    useEffect(() => {
        if (maxPrice > 0 && !isInitialized) {
            setLocalPriceRange([0, maxPrice]);
        }
    }, [maxPrice, isInitialized]);

    // Handle search with debouncing
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            dispatch(setFilters({ search: localSearchTerm }));
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [localSearchTerm, dispatch]);

    // Handle price range with debouncing
    useEffect(() => {
        const delayedPriceUpdate = setTimeout(() => {
            dispatch(setFilters({ priceRange: localPriceRange }));
        }, 500);

        return () => clearTimeout(delayedPriceUpdate);
    }, [localPriceRange, dispatch]);

    // Helper functions for sorting
    const getSortByValue = (sortParam) => {
        switch (sortParam) {
            case 'incPrice':
            case 'decPrice':
                return 'price';
            case 'userRating':
                return 'averageRating';
            case 'newArrivals':
                return 'createdAt';
            default:
                return 'createdAt';
        }
    };

    const getSortOrderValue = (sortParam) => {
        switch (sortParam) {
            case 'incPrice':
                return 'asc';
            case 'decPrice':
            case 'userRating':
            case 'newArrivals':
                return 'desc';
            default:
                return 'desc';
        }
    };

    // Navigation handlers
    const handleSortChange = (newSortBy) => {
        const sortBy = getSortByValue(newSortBy);
        const sortOrder = getSortOrderValue(newSortBy);

        dispatch(setFilters({ sortBy, sortOrder }));

        // Use encoded category for URL and preserve search parameter
        const encodedCategory = encodeCategoryForUrl(currentCategory.name);
        const searchQuery = searchParam ? `?search=${encodeURIComponent(searchParam)}` : '';
        router.push(`/allproducts/${encodedCategory}/${newSortBy}${searchQuery}`);
    };

    const handleCategoryChange = (newCategory) => {
        const categoryValue = newCategory.name === 'all' ? '' : newCategory.name;
        dispatch(setFilters({ category: categoryValue }));

        // Use encoded category for URL and preserve search parameter
        const encodedCategory = encodeCategoryForUrl(newCategory.name);
        const currentSort = sortBy || 'newArrivals';
        const searchQuery = searchParam ? `?search=${encodeURIComponent(searchParam)}` : '';
        router.push(`/allproducts/${encodedCategory}/${currentSort}${searchQuery}`);
    };

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        setLocalSearchTerm('');
        setLocalPriceRange([0, maxPrice]);
        router.push('/allproducts/all/newArrivals');
    };

    // Display helper function
    const getDisplayCategoryName = (categoryName) => {
        if (categoryName === 'all') return 'All Products';
        return categoryName.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Loading state
    if (loading && !isInitialized) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !allProducts.length) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️ Error loading products</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchAllProducts())}
                        className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='mx-[2%] py-8'>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {searchParam ?
                        `Search Results for "${searchParam}"` :
                        getDisplayCategoryName(currentCategory.name)
                    }
                </h1>

                {/* Show search context if there's a search term */}
                {searchParam && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">
                            Showing results for "<strong>{searchParam}</strong>"
                            {currentCategory.name !== 'all' && ` in ${getDisplayCategoryName(currentCategory.name)}`}
                        </p>
                        <button
                            onClick={() => {
                                setLocalSearchTerm('');
                                router.push(`/allproducts/${encodeCategoryForUrl(currentCategory.name)}/newArrivals`);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm underline mt-1"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Category Navigation */}
                <div className="flex flex-wrap gap-2 mb-4 mt-4">
                    <button
                        onClick={() => handleCategoryChange({ name: 'all' })}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentCategory.name === 'all'
                                ? 'bg-pink-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All Products
                    </button>
                    {Categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                currentCategory.name === cat.name
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {getDisplayCategoryName(cat.name)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar and Controls */}
            <div className='mb-6'>
                {/* Top Row: Sort, Search, and Filters */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 items-stretch sm:items-center mb-4">
                    {/* Sort Dropdown - Left */}
                    <Menu as="div" className="relative inline-block text-left flex-shrink-0">
                        <div>
                            <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto">
                                Sort By
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute z-20 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSortChange('incPrice')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full text-left',
                                                    sortBy === 'incPrice' ? 'bg-pink-50 text-pink-700' : ''
                                                )}
                                            >
                                                Price: Low to High
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSortChange('decPrice')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full text-left',
                                                    sortBy === 'decPrice' ? 'bg-pink-50 text-pink-700' : ''
                                                )}
                                            >
                                                Price: High to Low
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSortChange('userRating')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full text-left',
                                                    sortBy === 'userRating' ? 'bg-pink-50 text-pink-700' : ''
                                                )}
                                            >
                                                Customer Rating
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleSortChange('newArrivals')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full text-left',
                                                    sortBy === 'newArrivals' ? 'bg-pink-50 text-pink-700' : ''
                                                )}
                                            >
                                                Newest Arrivals
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Filters Toggle Button - Right */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                    >
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                        </svg>
                        Filters
                        {hasActiveFilters && (
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-pink-100 bg-pink-600 rounded-full ml-1">
                                {[
                                    filters.search && 1,
                                    filters.category && 1,
                                    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && 1,
                                    filters.inStock && 1,
                                    filters.minRating > 0 && 1
                                ].filter(Boolean).length}
                            </span>
                        )}
                        <ChevronDownIcon className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <div className="relative flex-grow col-span-2">
                        <input
                            type='text'
                            placeholder='Search products by name, description, or category...'
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                            className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-pink-500 focus:border-transparent pl-10 pr-4'
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        {localSearchTerm && (
                            <button
                                onClick={() => setLocalSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Helper Text */}
                {localSearchTerm && (
                    <p className="text-sm text-gray-500 mb-2">
                        Searching for "{localSearchTerm}"...
                    </p>
                )}

                {/* Filters Panel - Shows/Hides on button click */}
                {showFilters && (
                    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            {/* Price Range Filter */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-3'>
                                    Price Range: ₹{localPriceRange[0].toLocaleString()} - ₹{localPriceRange[1].toLocaleString()}
                                </label>
                                <Slider
                                    range
                                    min={0}
                                    max={maxPrice}
                                    value={localPriceRange}
                                    onChange={(value) => setLocalPriceRange(value)}
                                    className="mb-2"
                                    trackStyle={[{ backgroundColor: '#ec4899' }]}
                                    handleStyle={[
                                        { borderColor: '#ec4899', backgroundColor: '#ec4899' },
                                        { borderColor: '#ec4899', backgroundColor: '#ec4899' }
                                    ]}
                                />
                                <div className='flex justify-between text-xs text-gray-500'>
                                    <span>₹0</span>
                                    <span>₹{maxPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Stock and Rating Filters */}
                            <div className="space-y-4 grid grid-cols-2 gap-4">
                                {/* Rating Filter */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Minimum Rating
                                    </label>
                                    <select
                                        value={filters.minRating || 0}
                                        onChange={(e) => dispatch(setFilters({ minRating: parseInt(e.target.value) }))}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-sm"
                                    >
                                        <option value={0}>Any Rating</option>
                                        <option value={1}>1+ Stars</option>
                                        <option value={2}>2+ Stars</option>
                                        <option value={3}>3+ Stars</option>
                                        <option value={4}>4+ Stars</option>
                                        <option value={5}>5 Stars Only</option>
                                    </select>
                                </div>

                                {/* Stock Filter */}
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={filters.inStock || false}
                                            onChange={(e) => dispatch(setFilters({ inStock: e.target.checked }))}
                                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 mr-2"
                                        />
                                        <span className="text-gray-700">In Stock Only</span>
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 justify-end">
                                <button
                                    onClick={handleClearFilters}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors"
                                >
                                    Hide Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && filters.category != "" && (
                <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-pink-800">Active Filters:</p>
                        <button
                            onClick={handleClearFilters}
                            className="text-xs text-pink-600 hover:text-pink-800 underline"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.search && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                Search: "{filters.search}"
                                <button
                                    onClick={() => {
                                        setLocalSearchTerm('');
                                        dispatch(setFilters({ search: '' }));
                                    }}
                                    className="ml-1 text-pink-600 hover:text-pink-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.inStock && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                In Stock Only
                                <button
                                    onClick={() => dispatch(setFilters({ inStock: false }))}
                                    className="ml-1 text-pink-600 hover:text-pink-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.minRating > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                {filters.minRating}+ Stars
                                <button
                                    onClick={() => dispatch(setFilters({ minRating: 0 }))}
                                    className="ml-1 text-pink-600 hover:text-pink-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Results Count */}
            <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                    Showing {paginatedProducts.length} of {pagination.totalItems} products
                    {pagination.currentPage > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
                </p>
                {loading && (
                    <div className="flex items-center text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                        Updating...
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-8'>
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <p className="text-gray-500 text-lg mb-2">No products found matching your criteria.</p>
                        <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={handleClearFilters}
                            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className='flex justify-center'>
                    <nav className="flex items-center space-x-2" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPreviousPage}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                !pagination.hasPreviousPage
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            Previous
                        </button>

                        {/* Page numbers */}
                        {(() => {
                            const pages = [];
                            const showPages = 5; // Show 5 page numbers at a time
                            let startPage = Math.max(1, pagination.currentPage - Math.floor(showPages / 2));
                            let endPage = Math.min(pagination.totalPages, startPage + showPages - 1);

                            // Adjust start page if we're near the end
                            if (endPage - startPage < showPages - 1) {
                                startPage = Math.max(1, endPage - showPages + 1);
                            }

                            // First page and ellipsis
                            if (startPage > 1) {
                                pages.push(
                                    <button
                                        key={1}
                                        onClick={() => handlePageChange(1)}
                                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    >
                                        1
                                    </button>
                                );
                                if (startPage > 2) {
                                    pages.push(
                                        <span key="ellipsis1" className="px-3 py-2 text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                            }

                            // Main page numbers
                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            pagination.currentPage === i
                                                ? 'bg-pink-600 text-white'
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i}
                                    </button>
                                );
                            }

                            // Last page and ellipsis
                            if (endPage < pagination.totalPages) {
                                if (endPage < pagination.totalPages - 1) {
                                    pages.push(
                                        <span key="ellipsis2" className="px-3 py-2 text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                                pages.push(
                                    <button
                                        key={pagination.totalPages}
                                        onClick={() => handlePageChange(pagination.totalPages)}
                                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    >
                                        {pagination.totalPages}
                                    </button>
                                );
                            }

                            return pages;
                        })()}

                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                !pagination.hasNextPage
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}

            {/* Go to Top Button */}
            {pagination.currentPage > 1 && (
                <div className="fixed bottom-6 right-6">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="p-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors"
                        aria-label="Go to top"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="mt-12 border-t pt-8 text-center text-gray-500">
                <p>
                    Can't find what you're looking for?{' '}
                    <button
                        onClick={() => setLocalSearchTerm('')}
                        className="text-pink-600 hover:text-pink-700 underline"
                    >
                        Browse all products
                    </button>
                    {' '}or{' '}
                    <a
                        href="/contact"
                        className="text-pink-600 hover:text-pink-700 underline"
                    >
                        contact us
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default AllProductsPage;