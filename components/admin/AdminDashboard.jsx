import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IconUsers,
    IconShoppingBag,
    IconTrendingUp,
    IconCurrency
} from '@tabler/icons-react';
import { useAdminStats, useAdmin } from '@/hooks/useAdmin';

const StatCard = ({ title, value, icon, color, change }) => {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    {change && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            {change}
                        </p>
                    )}
                </div>
                <div className={`${colorClasses[color]} p-3 rounded-full text-white`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );
};

const RecentActivity = ({ users, products }) => {
    const recentUsers = users.slice(0, 5);
    const recentProducts = products.slice(0, 5);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Recent Users */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Users
                </h3>
                <div className="space-y-3">
                    {recentUsers.map((user) => (
                        <div key={user._id} className="flex items-center space-x-3">
                            <img
                                src={user.pfp || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {user.name} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                            {user.admin && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Admin
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Products */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Products
                </h3>
                <div className="space-y-3">
                    {recentProducts.map((product) => (
                        <div key={product._id} className="flex items-center space-x-3">
                            <img
                                src={product.all_images?.[0] || "/placeholder-product.jpg"}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {product.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    ₹{product.price} • Stock: {product.stock}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                    product.stock > 10
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                        : product.stock > 0
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const CategoryBreakdown = ({ products }) => {
    const categoryStats = products.reduce((acc, product) => {
        product.category.forEach(cat => {
            if (!acc[cat]) {
                acc[cat] = { count: 0, totalStock: 0 };
            }
            acc[cat].count += 1;
            acc[cat].totalStock += product.stock || 0;
        });
        return acc;
    }, {});

    const categoryEntries = Object.entries(categoryStats)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 6);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 border border-neutral-200 dark:border-neutral-700 mt-8"
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryEntries.map(([category, stats]) => (
                    <div key={category} className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                            {category}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {stats.count} products
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total stock: {stats.totalStock}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const AdminDashboard = () => {
    const { fetchUsers, fetchProducts, users, products } = useAdmin();
    const stats = useAdminStats();

    useEffect(() => {
        fetchUsers();
        fetchProducts();
    }, [fetchUsers, fetchProducts]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Overview of your store's performance
                    </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users.total}
                    icon={<IconUsers size={24} />}
                    color="blue"
                    change={`${stats.users.admins} admins`}
                />
                <StatCard
                    title="Total Products"
                    value={stats.products.total}
                    icon={<IconShoppingBag size={24} />}
                    color="green"
                    change={`${stats.products.categories} categories`}
                />
                <StatCard
                    title="Total Stock"
                    value={stats.products.totalStock}
                    icon={<IconTrendingUp size={24} />}
                    color="purple"
                />
                <StatCard
                    title="Avg. Price"
                    value={`₹${stats.products.averagePrice}`}
                    icon={<IconCurrency size={24} />}
                    color="orange"
                />
            </div>

            {/* Recent Activity */}
            <RecentActivity users={users} products={products} />

            {/* Category Breakdown */}
            <CategoryBreakdown products={products} />
        </div>
    );
};

export default AdminDashboard;