// // hooks/useAdmin.js - Simplified version that works without admin slice
// import { useAppSelector, useAppDispatch } from './redux';
// import { useMemo, useCallback, useState } from 'react';
// import axios from 'axios';
//
// // Hook for admin permissions
// export const useAdminPermissions = () => {
//     const { user, isAuthenticated } = useAppSelector((state) => ({
//         user: state.user.data,
//         isAuthenticated: state.user.isAuthenticated,
//     }));
//
//     return useMemo(() => ({
//         isAdmin: user?.admin || false,
//         canAccessAdmin: isAuthenticated && user?.admin,
//         userId: user?._id,
//         userEmail: user?.email,
//     }), [user, isAuthenticated]);
// };
//
// // Hook for admin products (uses existing product slice)
// export const useAdminProducts = () => {
//     const dispatch = useAppDispatch();
//
//     const productsData = useAppSelector((state) => ({
//         products: state.allProducts.items,
//         filteredProducts: state.allProducts.filteredItems,
//         currentProduct: state.allProducts.currentProduct,
//         loading: state.allProducts.loading,
//         error: state.allProducts.error,
//         categories: state.allProducts.categories,
//     }));
//
//     // Import actions from your existing product slice
//     const { fetchAllProducts, deleteProduct } = require('../store');
//
//     const productActions = useMemo(() => ({
//         fetchProducts: () => dispatch(fetchAllProducts()),
//         deleteProduct: (productId) => dispatch(deleteProduct(productId)),
//     }), [dispatch]);
//
//     // Group products by category
//     const groupedProducts = useMemo(() => {
//         return productsData.products.reduce((acc, product) => {
//             product.category.forEach(cat => {
//                 if (!acc[cat]) {
//                     acc[cat] = [];
//                 }
//                 acc[cat].push(product);
//             });
//             return acc;
//         }, {});
//     }, [productsData.products]);
//
//     return {
//         ...productsData,
//         ...productActions,
//         groupedProducts,
//     };
// };
//
// // Hook for admin users (simplified without admin slice)
// export const useAdminUsers = () => {
//     const dispatch = useAppDispatch();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const token = useAppSelector((state) =>
//         state.user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
//     );
//
//     const fetchUsers = useCallback(async (searchQuery = '') => {
//         if (!token) {
//             setError('No authentication token found');
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         try {
//             console.log('👨‍💼 Fetching users with search term:', searchQuery);
//             const response = await axios.put(`/api/users/findUser/${searchQuery}`, { token });
//             console.log('👨‍💼 Users fetch response:', response.data);
//
//             const userData = response.data || [];
//             setUsers(userData);
//             setFilteredUsers(userData);
//         } catch (err) {
//             console.error('👨‍💼 Users fetch error:', err.response?.data || err.message);
//             setError(err.response?.data?.message || 'Failed to fetch users');
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);
//
//     const deleteUser = useCallback(async (userId) => {
//         if (!token) {
//             setError('No authentication token found');
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         try {
//             console.log('👨‍💼 Deleting user:', userId);
//             await axios.delete(`/api/users/${userId}`, {
//                 data: { token },
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//
//             // Remove user from local state
//             setUsers(prev => prev.filter(user => user._id !== userId));
//             setFilteredUsers(prev => prev.filter(user => user._id !== userId));
//         } catch (err) {
//             console.error('👨‍💼 Delete user error:', err.response?.data || err.message);
//             setError(err.response?.data?.message || 'Failed to delete user');
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);
//
//     const makeAdmin = useCallback(async (userId) => {
//         if (!token) {
//             setError('No authentication token found');
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         try {
//             console.log('👨‍💼 Making user admin:', userId);
//             await axios.put(`/api/users/${userId}/make-admin`, { token });
//
//             // Update user in local state
//             const updateUserInState = (userList) =>
//                 userList.map(user =>
//                     user._id === userId ? { ...user, admin: true } : user
//                 );
//
//             setUsers(updateUserInState);
//             setFilteredUsers(updateUserInState);
//         } catch (err) {
//             console.error('👨‍💼 Make admin error:', err.response?.data || err.message);
//             setError(err.response?.data?.message || 'Failed to make user admin');
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);
//
//     const removeAdmin = useCallback(async (userId) => {
//         if (!token) {
//             setError('No authentication token found');
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         try {
//             console.log('👨‍💼 Removing admin from user:', userId);
//             await axios.put(`/api/users/${userId}/remove-admin`, { token });
//
//             // Update user in local state
//             const updateUserInState = (userList) =>
//                 userList.map(user =>
//                     user._id === userId ? { ...user, admin: false } : user
//                 );
//
//             setUsers(updateUserInState);
//             setFilteredUsers(updateUserInState);
//         } catch (err) {
//             console.error('👨‍💼 Remove admin error:', err.response?.data || err.message);
//             setError(err.response?.data?.message || 'Failed to remove admin privileges');
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);
//
//     const handleSetSearchTerm = useCallback((term) => {
//         setSearchTerm(term);
//         // Filter users based on search term
//         if (term.trim()) {
//             const searchTermLower = term.toLowerCase();
//             const filtered = users.filter(user =>
//                 user.email?.toLowerCase().includes(searchTermLower) ||
//                 user.name?.toLowerCase().includes(searchTermLower) ||
//                 user.username?.toLowerCase().includes(searchTermLower)
//             );
//             setFilteredUsers(filtered);
//         } else {
//             setFilteredUsers(users);
//         }
//     }, [users]);
//
//     const clearError = useCallback(() => {
//         setError(null);
//     }, []);
//
//     return {
//         users,
//         filteredUsers,
//         searchTerm,
//         loading,
//         error,
//         fetchUsers,
//         deleteUser,
//         makeAdmin,
//         removeAdmin,
//         setSearchTerm: handleSetSearchTerm,
//         clearError,
//     };
// };
//
// // Hook for admin statistics
// export const useAdminStats = () => {
//     const { users } = useAdminUsers();
//     const { products } = useAdminProducts();
//
//     return useMemo(() => {
//         const totalUsers = users.length;
//         const totalAdmins = users.filter(user => user.admin).length;
//         const totalProducts = products.length;
//         const totalCategories = new Set(products.flatMap(p => p.category)).size;
//         const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
//         const averagePrice = products.length > 0
//             ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
//             : 0;
//
//         return {
//             users: {
//                 total: totalUsers,
//                 admins: totalAdmins,
//                 regular: totalUsers - totalAdmins,
//             },
//             products: {
//                 total: totalProducts,
//                 categories: totalCategories,
//                 totalStock,
//                 averagePrice: Math.round(averagePrice * 100) / 100,
//             },
//         };
//     }, [users, products]);
// };
//
// // Main admin hook that combines everything
// export const useAdmin = () => {
//     const [activeTab, setActiveTab] = useState('dashboard');
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//
//     const adminProducts = useAdminProducts();
//     const adminUsers = useAdminUsers();
//     const adminPermissions = useAdminPermissions();
//     const adminStats = useAdminStats();
//
//     return {
//         // UI state
//         activeTab,
//         setActiveTab,
//         sidebarOpen,
//         setSidebarOpen,
//
//         // Products
//         ...adminProducts,
//
//         // Users (prefixed to avoid conflicts)
//         users: adminUsers.users,
//         filteredUsers: adminUsers.filteredUsers,
//         userSearchTerm: adminUsers.searchTerm,
//         usersLoading: adminUsers.loading,
//         usersError: adminUsers.error,
//         fetchUsers: adminUsers.fetchUsers,
//         deleteUser: adminUsers.deleteUser,
//         makeAdmin: adminUsers.makeAdmin,
//         removeAdmin: adminUsers.removeAdmin,
//         setUserSearchTerm: adminUsers.setSearchTerm,
//         clearUsersError: adminUsers.clearError,
//
//         // Permissions
//         ...adminPermissions,
//
//         // Stats
//         stats: adminStats,
//     };
// };
// hooks/useAdmin.js - Updated version with fetchAllUsers for dashboard stats
import { useAppSelector, useAppDispatch } from './redux';
import { useMemo, useCallback, useState, useEffect } from 'react';
import axios from 'axios';

// Hook for admin permissions
export const useAdminPermissions = () => {
    const { user, isAuthenticated } = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated,
    }));

    return useMemo(() => ({
        isAdmin: user?.admin || false,
        canAccessAdmin: isAuthenticated && user?.admin,
        userId: user?._id,
        userEmail: user?.email,
    }), [user, isAuthenticated]);
};

// Hook for admin products (uses existing product slice)
export const useAdminProducts = () => {
    const dispatch = useAppDispatch();

    const productsData = useAppSelector((state) => ({
        products: state.allProducts.items,
        filteredProducts: state.allProducts.filteredItems,
        currentProduct: state.allProducts.currentProduct,
        loading: state.allProducts.loading,
        error: state.allProducts.error,
        categories: state.allProducts.categories,
    }));

    // Import actions from your existing product slice
    const { fetchAllProducts, deleteProduct } = require('../store');

    const productActions = useMemo(() => ({
        fetchProducts: () => dispatch(fetchAllProducts()),
        deleteProduct: (productId) => dispatch(deleteProduct(productId)),
    }), [dispatch]);

    // Group products by category
    const groupedProducts = useMemo(() => {
        return productsData.products.reduce((acc, product) => {
            product.category.forEach(cat => {
                if (!acc[cat]) {
                    acc[cat] = [];
                }
                acc[cat].push(product);
            });
            return acc;
        }, {});
    }, [productsData.products]);

    return {
        ...productsData,
        ...productActions,
        groupedProducts,
    };
};

// Hook for admin users (with both search and fetch all functionality)
export const useAdminUsers = () => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // For dashboard stats
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = useAppSelector((state) =>
        state.user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
    );

    // Fetch all users for dashboard stats (no search term)
    const fetchAllUsers = useCallback(async () => {
        if (!token) {
            setError('No authentication token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('👨‍💼 Fetching all users for dashboard stats');
            // Using empty string to get all users
            const response = await axios.put('/api/users/findUser/', { token });
            console.log('👨‍💼 All users fetch response:', response.data);

            const userData = response.data || [];
            setAllUsers(userData);

            // If no search is active, also update the main users state
            if (!searchTerm.trim()) {
                setUsers(userData);
                setFilteredUsers(userData);
            }
        } catch (err) {
            console.error('👨‍💼 Fetch all users error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [token, searchTerm]);

    // Fetch users with search functionality
    const fetchUsers = useCallback(async (searchQuery = '') => {
        if (!token) {
            setError('No authentication token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('👨‍💼 Fetching users with search term:', searchQuery);
            const response = await axios.put(`/api/users/findUser/${searchQuery}`, { token });
            console.log('👨‍💼 Users fetch response:', response.data);

            const userData = response.data || [];
            setUsers(userData);
            setFilteredUsers(userData);
        } catch (err) {
            console.error('👨‍💼 Users fetch error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const deleteUser = useCallback(async (userId) => {
        if (!token) {
            setError('No authentication token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('👨‍💼 Deleting user:', userId);
            await axios.delete(`/api/users/${userId}`, {
                data: { token },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Remove user from all state arrays
            const removeUserFromState = (userList) => userList.filter(user => user._id !== userId);

            setUsers(removeUserFromState);
            setFilteredUsers(removeUserFromState);
            setAllUsers(removeUserFromState);
        } catch (err) {
            console.error('👨‍💼 Delete user error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to delete user');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const makeAdmin = useCallback(async (userId) => {
        if (!token) {
            setError('No authentication token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('👨‍💼 Making user admin:', userId);
            await axios.put(`/api/users/${userId}/make-admin`, { token });

            // Update user in all state arrays
            const updateUserInState = (userList) =>
                userList.map(user =>
                    user._id === userId ? { ...user, admin: true } : user
                );

            setUsers(updateUserInState);
            setFilteredUsers(updateUserInState);
            setAllUsers(updateUserInState);
        } catch (err) {
            console.error('👨‍💼 Make admin error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to make user admin');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const removeAdmin = useCallback(async (userId) => {
        if (!token) {
            setError('No authentication token found');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('👨‍💼 Removing admin from user:', userId);
            await axios.put(`/api/users/${userId}/remove-admin`, { token });

            // Update user in all state arrays
            const updateUserInState = (userList) =>
                userList.map(user =>
                    user._id === userId ? { ...user, admin: false } : user
                );

            setUsers(updateUserInState);
            setFilteredUsers(updateUserInState);
            setAllUsers(updateUserInState);
        } catch (err) {
            console.error('👨‍💼 Remove admin error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to remove admin privileges');
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleSetSearchTerm = useCallback((term) => {
        setSearchTerm(term);
        // Filter users based on search term
        if (term.trim()) {
            const searchTermLower = term.toLowerCase();
            const filtered = users.filter(user =>
                user.email?.toLowerCase().includes(searchTermLower) ||
                user.name?.toLowerCase().includes(searchTermLower) ||
                user.username?.toLowerCase().includes(searchTermLower)
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [users]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Auto-fetch all users when component mounts (for dashboard stats)
    useEffect(() => {
        if (token) {
            fetchAllUsers();
        }
    }, [fetchAllUsers, token]);

    return {
        users,
        allUsers, // Separate state for all users (used in stats)
        filteredUsers,
        searchTerm,
        loading,
        error,
        fetchUsers,
        fetchAllUsers, // New function for dashboard
        deleteUser,
        makeAdmin,
        removeAdmin,
        setSearchTerm: handleSetSearchTerm,
        clearError,
    };
};

// Hook for admin statistics (now uses allUsers for accurate stats)
export const useAdminStats = () => {
    const { allUsers } = useAdminUsers();
    const { products } = useAdminProducts();

    return useMemo(() => {
        const totalUsers = allUsers.length;
        const totalAdmins = allUsers.filter(user => user.admin).length;
        const totalProducts = products.length;
        const totalCategories = new Set(products.flatMap(p => p.category)).size;
        const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
        const averagePrice = products.length > 0
            ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length
            : 0;

        // Additional user statistics
        const recentUsers = allUsers
            .filter(user => user.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        const userGrowthThisMonth = allUsers.filter(user => {
            if (!user.createdAt) return false;
            const userDate = new Date(user.createdAt);
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return userDate >= firstDayOfMonth;
        }).length;

        return {
            users: {
                total: totalUsers,
                admins: totalAdmins,
                regular: totalUsers - totalAdmins,
                recentUsers,
                growthThisMonth: userGrowthThisMonth,
            },
            products: {
                total: totalProducts,
                categories: totalCategories,
                totalStock,
                averagePrice: Math.round(averagePrice * 100) / 100,
                lowStockProducts: products.filter(p => (p.stock || 0) < 10).length,
                outOfStockProducts: products.filter(p => (p.stock || 0) === 0).length,
            },
        };
    }, [allUsers, products]);
};

// Main admin hook that combines everything
export const useAdmin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const adminProducts = useAdminProducts();
    const adminUsers = useAdminUsers();
    const adminPermissions = useAdminPermissions();
    const adminStats = useAdminStats();

    return {
        // UI state
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,

        // Products
        ...adminProducts,

        // Users (prefixed to avoid conflicts)
        users: adminUsers.users,
        allUsers: adminUsers.allUsers, // For dashboard stats
        filteredUsers: adminUsers.filteredUsers,
        userSearchTerm: adminUsers.searchTerm,
        usersLoading: adminUsers.loading,
        usersError: adminUsers.error,
        fetchUsers: adminUsers.fetchUsers,
        fetchAllUsers: adminUsers.fetchAllUsers, // New function
        deleteUser: adminUsers.deleteUser,
        makeAdmin: adminUsers.makeAdmin,
        removeAdmin: adminUsers.removeAdmin,
        setUserSearchTerm: adminUsers.setSearchTerm,
        clearUsersError: adminUsers.clearError,

        // Permissions
        ...adminPermissions,

        // Stats (now more comprehensive)
        stats: adminStats,
    };
};