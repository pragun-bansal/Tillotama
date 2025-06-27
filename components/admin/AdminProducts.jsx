import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import {
    IconPlus,
    IconEdit,
    IconTrash,
    IconDownload,
    IconChevronDown,
    IconChevronUp,
    IconSearch
} from '@tabler/icons-react';
import { useAdminProducts } from '@/hooks/useAdmin';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg shadow-md relative group hover:shadow-lg transition-shadow"
        >
            <div className="relative">
                <img
                    src={product.all_images?.[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                />

                {/* Action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                    <button
                        onClick={() => onEdit(product._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Edit Product"
                    >
                        <IconEdit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Delete Product"
                    >
                        <IconTrash size={16} />
                    </button>
                </div>

                {/* Stock indicator */}
                <div className="absolute top-2 left-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                        product.stock > 10
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                        Stock: {product.stock}
                    </span>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                    {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                    {product.tagline}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{product.price}
                    </span>
                    <div className="flex flex-wrap gap-1">
                        {product.category.slice(0, 2).map((cat, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"
                            >
                                {cat}
                            </span>
                        ))}
                        {product.category.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{product.category.length - 2} more
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CategorySection = ({ category, products, onEdit, onDelete, isOpen, onToggle }) => {
    return (
        <div className="mb-8">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left mb-4 p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors"
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    {category} ({products.length})
                </h2>
                {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
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

    const [openCategories, setOpenCategories] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGroupedProducts, setFilteredGroupedProducts] = useState({});

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // Filter products based on search term
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
                // Product will be removed from state automatically via Redux
            } catch (err) {
                console.error('Failed to delete product:', err);
                alert('Failed to delete product. Please try again.');
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Products Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your store's products and inventory
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        <IconDownload size={20} />
                        Export Excel
                    </button>
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        <IconPlus size={20} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => toggleAllCategories(true)}
                        className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        Expand All
                    </button>
                    <button
                        onClick={() => toggleAllCategories(false)}
                        className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        Collapse All
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(groupedProducts).length}</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stock</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
                    </p>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Products by Category */}
            <div className="space-y-6">
                {Object.keys(filteredGroupedProducts).length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <IconSearch size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {searchTerm ? 'No products found' : 'No products yet'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                                <IconPlus size={20} />
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