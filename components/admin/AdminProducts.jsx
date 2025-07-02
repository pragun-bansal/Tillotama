// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import * as XLSX from 'xlsx';
// // import {
// //     IconPlus,
// //     IconEdit,
// //     IconTrash,
// //     IconDownload,
// //     IconChevronDown,
// //     IconChevronUp,
// //     IconSearch
// // } from '@tabler/icons-react';
// // import { useAdminProducts } from '@/hooks/useAdmin';
// //
// // const ProductCard = ({ product, onEdit, onDelete }) => {
// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg shadow-md relative group hover:shadow-lg transition-shadow"
// //         >
// //             <div className="relative">
// //                 <img
// //                     src={product.all_images?.[0] || "/placeholder-product.jpg"}
// //                     alt={product.name}
// //                     className="w-full h-48 object-cover rounded-md mb-3"
// //                 />
// //
// //                 {/* Action buttons */}
// //                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
// //                     <button
// //                         onClick={() => onEdit(product._id)}
// //                         className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
// //                         title="Edit Product"
// //                     >
// //                         <IconEdit size={16} />
// //                     </button>
// //                     <button
// //                         onClick={() => onDelete(product._id)}
// //                         className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
// //                         title="Delete Product"
// //                     >
// //                         <IconTrash size={16} />
// //                     </button>
// //                 </div>
// //
// //                 {/* Stock indicator */}
// //                 <div className="absolute top-2 left-2">
// //                     <span className={`text-xs font-medium px-2 py-1 rounded ${
// //                         product.stock > 10
// //                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
// //                             : product.stock > 0
// //                                 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
// //                                 : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
// //                     }`}>
// //                         Stock: {product.stock}
// //                     </span>
// //                 </div>
// //             </div>
// //
// //             <div>
// //                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
// //                     {product.name}
// //                 </h3>
// //                 <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
// //                     {product.tagline}
// //                 </p>
// //                 <div className="flex items-center justify-between">
// //                     <span className="text-lg font-bold text-gray-900 dark:text-white">
// //                         ₹{product.price}
// //                     </span>
// //                     <div className="flex flex-wrap gap-1">
// //                         {product.category.slice(0, 2).map((cat, index) => (
// //                             <span
// //                                 key={index}
// //                                 className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"
// //                             >
// //                                 {cat}
// //                             </span>
// //                         ))}
// //                         {product.category.length > 2 && (
// //                             <span className="text-xs text-gray-500 dark:text-gray-400">
// //                                 +{product.category.length - 2} more
// //                             </span>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </motion.div>
// //     );
// // };
// //
// // const CategorySection = ({ category, products, onEdit, onDelete, isOpen, onToggle }) => {
// //     return (
// //         <div className="mb-8">
// //             <button
// //                 onClick={onToggle}
// //                 className="flex items-center justify-between w-full text-left mb-4 p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors"
// //             >
// //                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
// //                     {category} ({products.length})
// //                 </h2>
// //                 {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
// //             </button>
// //
// //             {isOpen && (
// //                 <motion.div
// //                     initial={{ opacity: 0, height: 0 }}
// //                     animate={{ opacity: 1, height: "auto" }}
// //                     exit={{ opacity: 0, height: 0 }}
// //                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
// //                 >
// //                     {products.map((product) => (
// //                         <ProductCard
// //                             key={product._id}
// //                             product={product}
// //                             onEdit={onEdit}
// //                             onDelete={onDelete}
// //                         />
// //                     ))}
// //                 </motion.div>
// //             )}
// //         </div>
// //     );
// // };
// //
// // const AdminProducts = ({ onAddProduct, onEditProduct }) => {
// //     const {
// //         products,
// //         groupedProducts,
// //         loading,
// //         error,
// //         fetchProducts,
// //         deleteProduct
// //     } = useAdminProducts();
// //
// //     const [openCategories, setOpenCategories] = useState({});
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [filteredGroupedProducts, setFilteredGroupedProducts] = useState({});
// //
// //     useEffect(() => {
// //         fetchProducts();
// //     }, [fetchProducts]);
// //
// //     useEffect(() => {
// //         // Filter products based on search term
// //         if (searchTerm.trim()) {
// //             const filtered = {};
// //             Object.entries(groupedProducts).forEach(([category, categoryProducts]) => {
// //                 const matchingProducts = categoryProducts.filter(product =>
// //                     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                     product.tagline.toLowerCase().includes(searchTerm.toLowerCase())
// //                 );
// //                 if (matchingProducts.length > 0) {
// //                     filtered[category] = matchingProducts;
// //                 }
// //             });
// //             setFilteredGroupedProducts(filtered);
// //         } else {
// //             setFilteredGroupedProducts(groupedProducts);
// //         }
// //     }, [searchTerm, groupedProducts]);
// //
// //     const handleAddProduct = () => {
// //         if (onAddProduct) {
// //             onAddProduct();
// //         } else {
// //             // Fallback navigation
// //             window.location.href = '/admin/products/new';
// //         }
// //     };
// //
// //     const handleEditProduct = (productId) => {
// //         if (onEditProduct) {
// //             onEditProduct(productId);
// //         } else {
// //             // Fallback navigation
// //             window.location.href = `/admin/products/edit/${productId}`;
// //         }
// //     };
// //
// //     const handleDeleteProduct = async (productId) => {
// //         if (window.confirm('Are you sure you want to delete this product?')) {
// //             try {
// //                 await deleteProduct(productId);
// //                 // Product will be removed from state automatically via Redux
// //             } catch (err) {
// //                 console.error('Failed to delete product:', err);
// //                 alert('Failed to delete product. Please try again.');
// //             }
// //         }
// //     };
// //
// //     const handleDownloadExcel = () => {
// //         const flattenedProducts = products.map(product => ({
// //             ...product,
// //             colors: product.colors?.map(color => `${color.color} (₹${color.price})`).join(', ') || '',
// //             sizes: product.sizes?.map(size => `${size.size} (₹${size.price})`).join(', ') || '',
// //             all_images: product.all_images?.join(', ') || '',
// //             category: product.category?.join(', ') || ''
// //         }));
// //
// //         const worksheet = XLSX.utils.json_to_sheet(flattenedProducts);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
// //         XLSX.writeFile(workbook, "products.xlsx");
// //     };
// //
// //     const toggleCategory = (category) => {
// //         setOpenCategories(prev => ({
// //             ...prev,
// //             [category]: !prev[category]
// //         }));
// //     };
// //
// //     const toggleAllCategories = (open) => {
// //         const newState = {};
// //         Object.keys(filteredGroupedProducts).forEach(category => {
// //             newState[category] = open;
// //         });
// //         setOpenCategories(newState);
// //     };
// //
// //     if (loading && products.length === 0) {
// //         return (
// //             <div className="flex items-center justify-center h-64">
// //                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
// //             </div>
// //         );
// //     }
// //
// //     return (
// //         <div className="space-y-6">
// //             {/* Header */}
// //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //                 <div>
// //                     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                         Products Management
// //                     </h1>
// //                     <p className="text-gray-600 dark:text-gray-400 mt-1">
// //                         Manage your store's products and inventory
// //                     </p>
// //                 </div>
// //
// //                 <div className="flex flex-col sm:flex-row gap-2">
// //                     <button
// //                         onClick={handleDownloadExcel}
// //                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// //                     >
// //                         <IconDownload size={20} />
// //                         Export Excel
// //                     </button>
// //                     <button
// //                         onClick={handleAddProduct}
// //                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
// //                     >
// //                         <IconPlus size={20} />
// //                         Add Product
// //                     </button>
// //                 </div>
// //             </div>
// //
// //             {/* Search and Controls */}
// //             <div className="flex flex-col sm:flex-row gap-4 items-center">
// //                 <div className="relative flex-1">
// //                     <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //                     <input
// //                         type="text"
// //                         placeholder="Search products..."
// //                         value={searchTerm}
// //                         onChange={(e) => setSearchTerm(e.target.value)}
// //                         className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                 </div>
// //
// //                 <div className="flex gap-2">
// //                     <button
// //                         onClick={() => toggleAllCategories(true)}
// //                         className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
// //                     >
// //                         Expand All
// //                     </button>
// //                     <button
// //                         onClick={() => toggleAllCategories(false)}
// //                         className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
// //                     >
// //                         Collapse All
// //                     </button>
// //                 </div>
// //             </div>
// //
// //             {/* Stats */}
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                 <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
// //                     <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</h3>
// //                     <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
// //                 </div>
// //                 <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
// //                     <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</h3>
// //                     <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(groupedProducts).length}</p>
// //                 </div>
// //                 <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
// //                     <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stock</h3>
// //                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
// //                         {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
// //                     </p>
// //                 </div>
// //             </div>
// //
// //             {/* Error Display */}
// //             {error && (
// //                 <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
// //                     {error}
// //                 </div>
// //             )}
// //
// //             {/* Products by Category */}
// //             <div className="space-y-6">
// //                 {Object.keys(filteredGroupedProducts).length === 0 ? (
// //                     <div className="text-center py-12">
// //                         <div className="text-gray-400 mb-4">
// //                             <IconSearch size={48} className="mx-auto" />
// //                         </div>
// //                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
// //                             {searchTerm ? 'No products found' : 'No products yet'}
// //                         </h3>
// //                         <p className="text-gray-600 dark:text-gray-400 mb-4">
// //                             {searchTerm
// //                                 ? 'Try adjusting your search terms'
// //                                 : 'Get started by adding your first product'
// //                             }
// //                         </p>
// //                         {!searchTerm && (
// //                             <button
// //                                 onClick={handleAddProduct}
// //                                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mx-auto transition-colors"
// //                             >
// //                                 <IconPlus size={20} />
// //                                 Add Your First Product
// //                             </button>
// //                         )}
// //                     </div>
// //                 ) : (
// //                     Object.entries(filteredGroupedProducts).map(([category, categoryProducts]) => (
// //                         <CategorySection
// //                             key={category}
// //                             category={category}
// //                             products={categoryProducts}
// //                             onEdit={handleEditProduct}
// //                             onDelete={handleDeleteProduct}
// //                             isOpen={openCategories[category] ?? false}
// //                             onToggle={() => toggleCategory(category)}
// //                         />
// //                     ))
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default AdminProducts;
// import React, { useState, useEffect } from 'react';
// import {
//     Star,
//     Edit,
//     Trash2,
//     Eye,
//     Plus,
//     Search,
//     Filter,
//     ChevronLeft,
//     ChevronRight,
//     AlertCircle,
//     Package,
//     TrendingUp,
//     Award,
//     MoreVertical,
//     ShoppingCart,
//     DollarSign,
//     BarChart3
// } from 'lucide-react';
// import { useAppSelector, useAppDispatch } from '@/hooks/redux';
// import {
//     fetchAllProducts,
//     deleteProduct,
//     selectAllProducts,
//     selectProductsLoading,
//     selectProductsError
// } from '@/store/slices/allProductSlice';
// import {toast} from "react-toastify";
//
// const AdminProducts = ({ onAddProduct, onEditProduct }) => {
//     const dispatch = useAppDispatch();
//
//     // Redux state
//     const products = useAppSelector(selectAllProducts);
//     const loading = useAppSelector(selectProductsLoading);
//     const error = useAppSelector(selectProductsError);
//
//     // User token
//     const { user, token } = useAppSelector((state) => ({
//         user: state.user.data,
//         token: state.user.token
//     }));
//
//     // Local state
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('all');
//     const [bestsellerFilter, setBestsellerFilter] = useState('all'); // all, bestsellers, regular
//     const [sortBy, setSortBy] = useState('newest');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(12);
//
//     // UI state
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [productToDelete, setProductToDelete] = useState(null);
//     const [bestsellersLoading, setBestsellersLoading] = useState({});
//
//     // Statistics
//     const [stats, setStats] = useState({
//         total: 0,
//         bestsellers: 0,
//         lowStock: 0,
//         outOfStock: 0
//     });
//
//     // Initialize
//     useEffect(() => {
//         dispatch(fetchAllProducts());
//     }, [dispatch]);
//
//     // Calculate stats when products change
//     useEffect(() => {
//         const total = products.length;
//         const bestsellers = products.filter(p => p.bestseller).length;
//         const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
//         const outOfStock = products.filter(p => p.stock === 0).length;
//
//         setStats({ total, bestsellers, lowStock, outOfStock });
//     }, [products]);
//
//     // Get unique categories
//     const categories = ['all', ...new Set(products.flatMap(p => p.category || []))];
//
//     // Filter and sort products
//     const filteredProducts = products
//         .filter(product => {
//             // Search filter
//             if (searchTerm) {
//                 const searchLower = searchTerm.toLowerCase();
//                 const matchesSearch =
//                     product.name.toLowerCase().includes(searchLower) ||
//                     product.description.toLowerCase().includes(searchLower) ||
//                     product.category.some(cat => cat.toLowerCase().includes(searchLower));
//
//                 if (!matchesSearch) return false;
//             }
//
//             // Category filter
//             if (categoryFilter !== 'all') {
//                 if (!product.category.some(cat =>
//                     cat.toLowerCase() === categoryFilter.toLowerCase()
//                 )) return false;
//             }
//
//             // Bestseller filter
//             if (bestsellerFilter === 'bestsellers' && !product.bestseller) return false;
//             if (bestsellerFilter === 'regular' && product.bestseller) return false;
//
//             return true;
//         })
//         .sort((a, b) => {
//             switch (sortBy) {
//                 case 'newest':
//                     return new Date(b.createdAt) - new Date(a.createdAt);
//                 case 'oldest':
//                     return new Date(a.createdAt) - new Date(b.createdAt);
//                 case 'name':
//                     return a.name.localeCompare(b.name);
//                 case 'price-low':
//                     return a.price - b.price;
//                 case 'price-high':
//                     return b.price - a.price;
//                 case 'rating':
//                     return (b.rating || 0) - (a.rating || 0);
//                 case 'stock-low':
//                     return a.stock - b.stock;
//                 case 'stock-high':
//                     return b.stock - a.stock;
//                 default:
//                     return 0;
//             }
//         });
//
//     // Pagination
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
//
//     // Handle bestseller toggle
//     const handleBestsellerToggle = async (productId, currentStatus) => {
//         try {
//             setBestsellersLoading(prev => ({ ...prev, [productId]: true }));
//
//             const response = await fetch(`/api/products/${productId}/bestseller`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     token,
//                     bestseller: !currentStatus
//                 })
//             });
//
//             if (!response.ok) {
//                 toast.error('Failed to update bestseller status');
//                 throw new Error('Failed to update bestseller status');
//
//             }
//
//             // Refresh products
//             dispatch(fetchAllProducts());
//             toast.success(response.message);
//
//         } catch (err) {
//             console.error('Error toggling bestseller:', err);
//             alert('Failed to update bestseller status');
//             toast.error(err);
//         } finally {
//             setBestsellersLoading(prev => ({ ...prev, [productId]: false }));
//         }
//     };
//
//     // Handle delete product
//     const handleDeleteProduct = async (productId) => {
//         try {
//             await dispatch(deleteProduct(productId)).unwrap();
//             setShowDeleteConfirm(false);
//             setProductToDelete(null);
//         } catch (err) {
//             console.error('Error deleting product:', err);
//             alert('Failed to delete product');
//         }
//     };
//
//     // Utility functions
//     const formatPrice = (price) => `${price.toFixed(2)}`;
//
//     const getStockStatus = (stock) => {
//         if (stock === 0) return { text: 'Out of Stock', color: 'red' };
//         if (stock <= 10) return { text: 'Low Stock', color: 'yellow' };
//         return { text: 'In Stock', color: 'green' };
//     };
//
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };
//
//     // Render functions
//     const renderStars = (rating) => (
//         <div className="flex items-center space-x-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                     key={star}
//                     className={`w-4 h-4 ${
//                         star <= rating
//                             ? 'text-yellow-400 fill-current'
//                             : 'text-gray-300'
//                     }`}
//                 />
//             ))}
//             <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
//         </div>
//     );
//
//     const renderFilters = () => (
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <div className="flex flex-wrap gap-4 items-center">
//                 {/* Search */}
//                 <div className="flex-1 min-w-64">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                             type="text"
//                             placeholder="Search products..."
//                             value={searchTerm}
//                             onChange={(e) => {
//                                 setSearchTerm(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                     </div>
//                 </div>
//
//                 {/* Category Filter */}
//                 <select
//                     value={categoryFilter}
//                     onChange={(e) => {
//                         setCategoryFilter(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                     {categories.map(category => (
//                         <option key={category} value={category}>
//                             {category === 'all' ? 'All Categories' : category}
//                         </option>
//                     ))}
//                 </select>
//
//                 {/* Bestseller Filter */}
//                 <select
//                     value={bestsellerFilter}
//                     onChange={(e) => {
//                         setBestsellerFilter(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                     <option value="all">All Products</option>
//                     <option value="bestsellers">Bestsellers Only</option>
//                     <option value="regular">Regular Products</option>
//                 </select>
//
//                 {/* Sort */}
//                 <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                     <option value="newest">Newest First</option>
//                     <option value="oldest">Oldest First</option>
//                     <option value="name">Name A-Z</option>
//                     <option value="price-low">Price Low-High</option>
//                     <option value="price-high">Price High-Low</option>
//                     <option value="rating">Highest Rated</option>
//                     <option value="stock-low">Stock Low-High</option>
//                     <option value="stock-high">Stock High-Low</option>
//                 </select>
//
//                 {/* Add Product Button */}
//                 <button
//                     onClick={onAddProduct}
//                     className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                     <Plus className="w-4 h-4" />
//                     <span>Add Product</span>
//                 </button>
//             </div>
//         </div>
//     );
//
//     const renderStats = () => (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center">
//                     <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                         <Package className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-600">Total Products</p>
//                         <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center">
//                     <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                         <TrendingUp className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-600">Bestsellers</p>
//                         <p className="text-2xl font-bold text-gray-900">{stats.bestsellers}</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center">
//                     <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                         <AlertCircle className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-600">Low Stock</p>
//                         <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center">
//                     <div className="p-3 rounded-full bg-red-100 text-red-600">
//                         <Package className="w-6 h-6" />
//                     </div>
//                     <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-600">Out of Stock</p>
//                         <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
//
//     const renderProductCard = (product) => {
//         const stockStatus = getStockStatus(product.stock);
//
//         return (
//             <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                 <div className="relative">
//                     {/* Product Image */}
//                     <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-t-lg overflow-hidden">
//                         {product.all_images && product.all_images.length > 0 ? (
//                             <img
//                                 src={product.all_images[0]}
//                                 alt={product.name}
//                                 className="w-full h-48 object-cover"
//                             />
//                         ) : (
//                             <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                                 <Package className="w-12 h-12 text-gray-400" />
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Badges */}
//                     <div className="absolute top-2 left-2 flex flex-col space-y-1">
//                         {product.bestseller && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                                 <Award className="w-3 h-3 mr-1" />
//                                 Bestseller
//                             </span>
//                         )}
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                             stockStatus.color === 'green'
//                                 ? 'bg-green-100 text-green-800'
//                                 : stockStatus.color === 'yellow'
//                                     ? 'bg-yellow-100 text-yellow-800'
//                                     : 'bg-red-100 text-red-800'
//                         }`}>
//                             {stockStatus.text}
//                         </span>
//                     </div>
//                 </div>
//
//                 <div className="p-6">
//                     {/* Product Info */}
//                     <div className="mb-4">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                             {product.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm line-clamp-2 mb-2">
//                             {product.description}
//                         </p>
//
//                         {/* Categories */}
//                         <div className="flex flex-wrap gap-1 mb-2">
//                             {product.category.slice(0, 2).map((cat, index) => (
//                                 <span
//                                     key={index}
//                                     className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
//                                 >
//                                     {cat}
//                                 </span>
//                             ))}
//                             {product.category.length > 2 && (
//                                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
//                                     +{product.category.length - 2} more
//                                 </span>
//                             )}
//                         </div>
//
//                         {/* Rating */}
//                         {renderStars(product.rating || 0)}
//                     </div>
//
//                     {/* Price and Stock */}
//                     <div className="flex items-center justify-between mb-4">
//                         <div>
//                             <div className="text-xl font-bold text-gray-900">
//                                 {formatPrice(product.price)}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                                 Stock: {product.stock}
//                             </div>
//                         </div>
//                         <div className="text-sm text-gray-500">
//                             {formatDate(product.createdAt)}
//                         </div>
//                     </div>
//
//                     {/* Actions */}
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                             <button
//                                 onClick={() => onEditProduct(product._id)}
//                                 className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                             >
//                                 <Edit className="w-4 h-4" />
//                                 <span>Edit</span>
//                             </button>
//
//                             <button
//                                 onClick={() => {
//                                     setProductToDelete(product);
//                                     setShowDeleteConfirm(true);
//                                 }}
//                                 className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             >
//                                 <Trash2 className="w-4 h-4" />
//                                 <span>Delete</span>
//                             </button>
//                         </div>
//
//                         {/* Bestseller Toggle */}
//                         <button
//                             onClick={() => handleBestsellerToggle(product._id, product.bestseller)}
//                             disabled={bestsellersLoading[product._id]}
//                             className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors ${
//                                 product.bestseller
//                                     ? 'bg-purple-600 text-white hover:bg-purple-700'
//                                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                             } disabled:opacity-50`}
//                         >
//                             {bestsellersLoading[product._id] ? (
//                                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                             ) : (
//                                 <TrendingUp className="w-4 h-4" />
//                             )}
//                             <span>
//                                 {product.bestseller ? 'Remove' : 'Make'} Bestseller
//                             </span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
//
//     const renderPagination = () => {
//         if (totalPages <= 1) return null;
//
//         return (
//             <div className="flex justify-center items-center space-x-4 mt-8">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                 >
//                     <ChevronLeft className="w-4 h-4" />
//                     <span>Previous</span>
//                 </button>
//
//                 <div className="flex items-center space-x-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const pageNum = i + Math.max(1, currentPage - 2);
//                         if (pageNum > totalPages) return null;
//
//                         return (
//                             <button
//                                 key={pageNum}
//                                 onClick={() => setCurrentPage(pageNum)}
//                                 className={`px-3 py-2 rounded-lg transition-colors ${
//                                     pageNum === currentPage
//                                         ? 'bg-blue-600 text-white'
//                                         : 'bg-white border border-gray-300 hover:bg-gray-50'
//                                 }`}
//                             >
//                                 {pageNum}
//                             </button>
//                         );
//                     })}
//                 </div>
//
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                 >
//                     <span>Next</span>
//                     <ChevronRight className="w-4 h-4" />
//                 </button>
//             </div>
//         );
//     };
//
//     // Main render
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
//                     <p className="text-gray-600">
//                         Manage your product catalog and bestseller status
//                     </p>
//                 </div>
//             </div>
//
//             {/* Error Display */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex items-center">
//                         <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
//                         <p className="text-red-800">{error}</p>
//                     </div>
//                 </div>
//             )}
//
//             {/* Statistics */}
//             {renderStats()}
//
//             {/* Filters */}
//             {renderFilters()}
//
//             {/* Results Summary */}
//             <div className="bg-white rounded-lg shadow-sm p-4">
//                 <div className="flex items-center justify-between">
//                     <p className="text-gray-600">
//                         Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of{' '}
//                         {filteredProducts.length} products
//                         {searchTerm && ` matching "${searchTerm}"`}
//                         {categoryFilter !== 'all' && ` in ${categoryFilter}`}
//                         {bestsellerFilter !== 'all' && ` (${bestsellerFilter})`}
//                     </p>
//
//                     <button
//                         onClick={() => dispatch(fetchAllProducts())}
//                         disabled={loading}
//                         className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
//                     >
//                         {loading ? 'Refreshing...' : 'Refresh'}
//                     </button>
//                 </div>
//             </div>
//
//             {/* Products Grid */}
//             {loading ? (
//                 <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="text-gray-600 mt-4">Loading products...</p>
//                 </div>
//             ) : paginatedProducts.length === 0 ? (
//                 <div className="text-center py-12">
//                     <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//                     <p className="text-gray-600 mb-4">
//                         {searchTerm || categoryFilter !== 'all' || bestsellerFilter !== 'all'
//                             ? 'Try adjusting your search terms or filters'
//                             : 'Get started by adding your first product'
//                         }
//                     </p>
//                     {(!searchTerm && categoryFilter === 'all' && bestsellerFilter === 'all') && (
//                         <button
//                             onClick={onAddProduct}
//                             className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
//                         >
//                             <Plus className="w-5 h-5" />
//                             <span>Add First Product</span>
//                         </button>
//                     )}
//                 </div>
//             ) : (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {paginatedProducts.map(renderProductCard)}
//                 </div>
//             )}
//
//             {/* Pagination */}
//             {renderPagination()}
//
//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && productToDelete && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                             Delete Product
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             Are you sure you want to delete <strong>{productToDelete.name}</strong>?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex space-x-3">
//                             <button
//                                 onClick={() => {
//                                     setShowDeleteConfirm(false);
//                                     setProductToDelete(null);
//                                 }}
//                                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteProduct(productToDelete._id)}
//                                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default AdminProducts;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import {
    Star,
    Edit,
    Trash2,
    Eye,
    Plus,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Package,
    TrendingUp,
    Award,
    MoreVertical,
    ShoppingCart,
    DollarSign,
    BarChart3,
    Download
} from 'lucide-react';
import { useAdminProducts } from '@/hooks/useAdmin';
import { toast } from "react-toastify";

const ProductCard = ({ product, onEdit, onDelete, onBestsellerToggle, bestsellersLoading }) => {
    const getStockStatus = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', color: 'red' };
        if (stock <= 10) return { text: 'Low Stock', color: 'yellow' };
        return { text: 'In Stock', color: 'green' };
    };

    const stockStatus = getStockStatus(product.stock);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
            <div className="relative">
                {/* Product Image */}
                <div className="relative mb-3">
                    {product.all_images && product.all_images.length > 0 ? (
                        <img
                            src={product.all_images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                            <Package className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

                    {/* Action buttons - hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 rounded-md flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(product._id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                                title="Edit Product"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(product._id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                                title="Delete Product"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product.bestseller && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                <Award className="w-3 h-3 mr-1" />
                                Bestseller
                            </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            stockStatus.color === 'green'
                                ? 'bg-green-100 text-green-800'
                                : stockStatus.color === 'yellow'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                        }`}>
                            {stockStatus.text}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.tagline || product.description}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                    {product.category.slice(0, 2).map((cat, index) => (
                        <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                            {cat}
                        </span>
                    ))}
                    {product.category.length > 2 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{product.category.length - 2} more
                        </span>
                    )}
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xl font-bold text-gray-900">
                            ₹{product.price}
                        </div>
                        <div className="text-sm text-gray-600">
                            Stock: {product.stock}
                        </div>
                    </div>
                </div>

                {/* Bestseller Toggle */}
                <button
                    onClick={() => onBestsellerToggle(product._id, product.bestseller)}
                    disabled={bestsellersLoading[product._id]}
                    className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors ${
                        product.bestseller
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } disabled:opacity-50`}
                >
                    {bestsellersLoading[product._id] ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <TrendingUp className="w-4 h-4" />
                    )}
                    <span>
                        {product.bestseller ? 'Remove' : 'Make'} Bestseller
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

const CategorySection = ({ category, products, onEdit, onDelete, onBestsellerToggle, bestsellersLoading, isOpen, onToggle }) => {
    return (
        <div className="mb-8">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                    {category} ({products.length})
                </h2>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onBestsellerToggle={onBestsellerToggle}
                            bestsellersLoading={bestsellersLoading}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

const AdminProducts = ({ onAddProduct, onEditProduct }) => {
    const {
        products,
        groupedProducts,
        loading,
        error,
        fetchProducts,
        deleteProduct
    } = useAdminProducts();

    // Local state
    const [openCategories, setOpenCategories] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGroupedProducts, setFilteredGroupedProducts] = useState({});
    const [bestsellersLoading, setBestsellersLoading] = useState({});

    // Statistics
    const [stats, setStats] = useState({
        total: 0,
        bestsellers: 0,
        lowStock: 0,
        outOfStock: 0,
        categories: 0
    });

    // Initialize
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Calculate stats when products change
    useEffect(() => {
        const total = products.length;
        const bestsellers = products.filter(p => p.bestseller).length;
        const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
        const outOfStock = products.filter(p => p.stock === 0).length;
        const categories = Object.keys(groupedProducts).length;

        setStats({ total, bestsellers, lowStock, outOfStock, categories });
    }, [products, groupedProducts]);

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = {};
            Object.entries(groupedProducts).forEach(([category, categoryProducts]) => {
                const matchingProducts = categoryProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.tagline.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (matchingProducts.length > 0) {
                    filtered[category] = matchingProducts;
                }
            });
            setFilteredGroupedProducts(filtered);
        } else {
            setFilteredGroupedProducts(groupedProducts);
        }
    }, [searchTerm, groupedProducts]);

    // Handle bestseller toggle
    const handleBestsellerToggle = async (productId, currentStatus) => {
        try {
            setBestsellersLoading(prev => ({ ...prev, [productId]: true }));

            const response = await fetch(`/api/products/${productId}/bestseller`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    bestseller: !currentStatus
                })
            });

            if (!response.ok) {
                toast.error('Failed to update bestseller status');
                throw new Error('Failed to update bestseller status');
            }

            const data = await response.json();
            toast.success(data.message || 'Bestseller status updated successfully');

            // Refresh products
            await fetchProducts();

        } catch (err) {
            console.error('Error toggling bestseller:', err);
            toast.error('Failed to update bestseller status');
        } finally {
            setBestsellersLoading(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleAddProduct = () => {
        if (onAddProduct) {
            onAddProduct();
        } else {
            // Fallback navigation
            window.location.href = '/admin/products/new';
        }
    };

    const handleEditProduct = (productId) => {
        if (onEditProduct) {
            onEditProduct(productId);
        } else {
            // Fallback navigation
            window.location.href = `/admin/products/edit/${productId}`;
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                toast.success('Product deleted successfully');
            } catch (err) {
                console.error('Failed to delete product:', err);
                toast.error('Failed to delete product. Please try again.');
            }
        }
    };

    const handleDownloadExcel = () => {
        const flattenedProducts = products.map(product => ({
            ...product,
            colors: product.colors?.map(color => `${color.color} (₹${color.price})`).join(', ') || '',
            sizes: product.sizes?.map(size => `${size.size} (₹${size.price})`).join(', ') || '',
            all_images: product.all_images?.join(', ') || '',
            category: product.category?.join(', ') || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(flattenedProducts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        XLSX.writeFile(workbook, "products.xlsx");
        toast.success('Excel file downloaded successfully');
    };

    const toggleCategory = (category) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const toggleAllCategories = (open) => {
        const newState = {};
        Object.keys(filteredGroupedProducts).forEach(category => {
            newState[category] = open;
        });
        setOpenCategories(newState);
    };

    // Render functions
    const renderStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <Package className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Bestsellers</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.bestsellers}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Low Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Categories</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading && products.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Products Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your store's products and inventory
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        <Download size={20} />
                        Export Excel
                    </button>
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            )}

            {/* Statistics */}
            {renderStats()}

            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => toggleAllCategories(true)}
                            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Expand All
                        </button>
                        <button
                            onClick={() => toggleAllCategories(false)}
                            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Collapse All
                        </button>
                        <button
                            onClick={fetchProducts}
                            disabled={loading}
                            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Products by Category */}
            <div className="space-y-6">
                {Object.keys(filteredGroupedProducts).length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? 'No products found' : 'No products yet'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm
                                ? 'Try adjusting your search terms'
                                : 'Get started by adding your first product'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddProduct}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mx-auto transition-colors"
                            >
                                <Plus size={20} />
                                Add Your First Product
                            </button>
                        )}
                    </div>
                ) : (
                    Object.entries(filteredGroupedProducts).map(([category, categoryProducts]) => (
                        <CategorySection
                            key={category}
                            category={category}
                            products={categoryProducts}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                            onBestsellerToggle={handleBestsellerToggle}
                            bestsellersLoading={bestsellersLoading}
                            isOpen={openCategories[category] ?? false}
                            onToggle={() => toggleCategory(category)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminProducts;