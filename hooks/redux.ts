// // // // // hooks/redux.js
// // // // import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// // // // import type { RootState, AppDispatch } from '../store';
// // // //
// // // // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // // // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// // // //
// // // // // lib/utils/apiClient.js - Centralized API client
// // // // import axios from 'axios';
// // // //
// // // // const apiClient = axios.create({
// // // //     baseURL: process.env.NODE_ENV === 'production'
// // // //         ? 'https://your-domain.com'
// // // //         : 'http://localhost:3000',
// // // //     timeout: 10000,
// // // // });
// // // //
// // // // // Request interceptor to add auth token
// // // // apiClient.interceptors.request.use(
// // // //     (config) => {
// // // //         if (typeof window !== 'undefined') {
// // // //             const token = localStorage.getItem('token');
// // // //             if (token) {
// // // //                 config.headers.Authorization = `Bearer ${token}`;
// // // //             }
// // // //         }
// // // //         return config;
// // // //     },
// // // //     (error) => {
// // // //         return Promise.reject(error);
// // // //     }
// // // // );
// // // //
// // // // // Response interceptor for error handling
// // // // apiClient.interceptors.response.use(
// // // //     (response) => response,
// // // //     (error) => {
// // // //         if (error.response?.status === 401) {
// // // //             // Handle unauthorized access
// // // //             if (typeof window !== 'undefined') {
// // // //                 localStorage.removeItem('token');
// // // //                 localStorage.removeItem('user');
// // // //                 window.location.href = '/login';
// // // //             }
// // // //         }
// // // //         return Promise.reject(error);
// // // //     }
// // // // );
// // // //
// // // // export default apiClient;
// // // // hooks/redux.ts
// // // import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// // // import type { RootState, AppDispatch } from '../store';
// // //
// // // // Use throughout your app instead of plain `useDispatch` and `useSelector`
// // // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// // //
// // // // Custom hooks for common state selections
// // // export const useAuth = () => {
// // //     return useAppSelector((state) => ({
// // //         user: state.user.data,
// // //         token: state.user.token,
// // //         isAuthenticated: state.user.isAuthenticated,
// // //         isInitialized: state.user.isInitialized,
// // //         isLoading: state.user.isLoading,
// // //         error: state.user.error,
// // //         status: state.user.status,
// // //     }));
// // // };
// // //
// // // export const useCart = () => {
// // //     return useAppSelector((state) => ({
// // //         items: state.cart.items,
// // //         totalCost: state.cart.totalCost,
// // //         totalItems: state.cart.totalItems,
// // //         cartId: state.cart._id,
// // //         loading: state.cart.loading,
// // //         error: state.cart.error,
// // //         status: state.cart.status,
// // //         changed: state.cart.changed,
// // //     }));
// // // };
// // //
// // // export const useWishlist = () => {
// // //     return useAppSelector((state) => ({
// // //         items: state.wishlist.items,
// // //         totalItems: state.wishlist.totalItems,
// // //         wishlistId: state.wishlist._id,
// // //         loading: state.wishlist.loading,
// // //         error: state.wishlist.error,
// // //         status: state.wishlist.status,
// // //     }));
// // // };
// // //
// // // export const useProducts = () => {
// // //     return useAppSelector((state) => ({
// // //         items: state.allProducts.items,
// // //         filteredItems: state.allProducts.filteredItems,
// // //         currentProduct: state.allProducts.currentProduct,
// // //         totalCount: state.allProducts.totalCount,
// // //         categories: state.allProducts.categories,
// // //         filters: state.allProducts.filters,
// // //         loading: state.allProducts.loading,
// // //         error: state.allProducts.error,
// // //         status: state.allProducts.status,
// // //     }));
// // // };
// // //
// // // // Helper hooks for specific functionality
// // // export const useIsInWishlist = (productId: string) => {
// // //     return useAppSelector((state) =>
// // //         state.wishlist.items.some(item =>
// // //             item.productId?._id === productId || item.productId === productId
// // //         )
// // //     );
// // // };
// // //
// // // export const useIsInCart = (productId: string) => {
// // //     return useAppSelector((state) =>
// // //         state.cart.items.some(item =>
// // //             item.productId?._id === productId || item.productId === productId
// // //         )
// // //     );
// // // };
// // //
// // // export const useCartItemQuantity = (productId: string) => {
// // //     return useAppSelector((state) => {
// // //         const item = state.cart.items.find(item =>
// // //             item.productId?._id === productId || item.productId === productId
// // //         );
// // //         return item?.qty || 0;
// // //     });
// // // };
// // //
// // // export const useProductById = (productId: string) => {
// // //     return useAppSelector((state) =>
// // //         state.allProducts.items.find(product => product._id === productId)
// // //     );
// // // };
// // //
// // // // Admin-specific hooks
// // // export const useIsAdmin = () => {
// // //     return useAppSelector((state) => state.user.data?.admin || false);
// // // };
// // //
// // // // Loading states helper
// // // export const useAppLoading = () => {
// // //     return useAppSelector((state) => ({
// // //         userLoading: state.user.isLoading,
// // //         cartLoading: state.cart.loading,
// // //         wishlistLoading: state.wishlist.loading,
// // //         productsLoading: state.allProducts.loading,
// // //         anyLoading: state.user.isLoading || state.cart.loading || state.wishlist.loading || state.allProducts.loading,
// // //     }));
// // // };
// // //
// // // // Error states helper
// // // export const useAppErrors = () => {
// // //     return useAppSelector((state) => ({
// // //         userError: state.user.error,
// // //         cartError: state.cart.error,
// // //         wishlistError: state.wishlist.error,
// // //         productsError: state.allProducts.error,
// // //         hasAnyError: !!(state.user.error || state.cart.error || state.wishlist.error || state.allProducts.error),
// // //     }));
// // // };
// // // hooks/redux.ts
// // import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// // import { useMemo } from 'react';
// // import type { RootState, AppDispatch } from '../store';
// //
// // // Use throughout your app instead of plain `useDispatch` and `useSelector`
// // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// //
// // // ==================== MEMOIZED CUSTOM HOOKS ====================
// //
// // // Custom hooks for common state selections with memoization
// // export const useAuth = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             user: state.user.data,
// //             token: state.user.token,
// //             isAuthenticated: state.user.isAuthenticated,
// //             isInitialized: state.user.isInitialized,
// //             isLoading: state.user.isLoading,
// //             error: state.user.error,
// //             status: state.user.status,
// //         };
// //     });
// // };
// //
// // export const useCart = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             items: state.cart.items,
// //             totalCost: state.cart.totalCost,
// //             totalItems: state.cart.totalItems,
// //             cartId: state.cart._id,
// //             loading: state.cart.loading,
// //             error: state.cart.error,
// //             status: state.cart.status,
// //             changed: state.cart.changed,
// //         };
// //     });
// // };
// //
// // export const useWishlist = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             items: state.wishlist.items,
// //             totalItems: state.wishlist.totalItems,
// //             wishlistId: state.wishlist._id,
// //             loading: state.wishlist.loading,
// //             error: state.wishlist.error,
// //             status: state.wishlist.status,
// //         };
// //     });
// // };
// //
// // export const useProducts = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             items: state.allProducts.items,
// //             filteredItems: state.allProducts.filteredItems,
// //             currentProduct: state.allProducts.currentProduct,
// //             totalCount: state.allProducts.totalCount,
// //             categories: state.allProducts.categories,
// //             filters: state.allProducts.filters,
// //             loading: state.allProducts.loading,
// //             error: state.allProducts.error,
// //             status: state.allProducts.status,
// //         };
// //     });
// // };
// //
// // // ==================== HELPER HOOKS WITH MEMOIZATION ====================
// //
// // // Helper hooks for specific functionality with proper memoization
// // export const useIsInWishlist = (productId: string) => {
// //     return useAppSelector((state) => {
// //         if (!productId) return false;
// //         return state.wishlist.items.some(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         );
// //     });
// // };
// //
// // export const useIsInCart = (productId: string) => {
// //     return useAppSelector((state) => {
// //         if (!productId) return false;
// //         return state.cart.items.some(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         );
// //     });
// // };
// //
// // export const useCartItemQuantity = (productId: string) => {
// //     return useAppSelector((state) => {
// //         if (!productId) return 0;
// //         const item = state.cart.items.find(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         );
// //         return item?.qty || 0;
// //     });
// // };
// //
// // export const useProductById = (productId: string) => {
// //     return useAppSelector((state) => {
// //         if (!productId) return null;
// //         return state.allProducts.items.find(product => product._id === productId) || null;
// //     });
// // };
// //
// // // Admin-specific hooks
// // export const useIsAdmin = () => {
// //     return useAppSelector((state) => state.user.data?.admin || false);
// // };
// //
// // // Loading states helper with memoization
// // export const useAppLoading = () => {
// //     return useAppSelector((state) => {
// //         const userLoading = state.user.isLoading;
// //         const cartLoading = state.cart.loading;
// //         const wishlistLoading = state.wishlist.loading;
// //         const productsLoading = state.allProducts.loading;
// //
// //         return {
// //             userLoading,
// //             cartLoading,
// //             wishlistLoading,
// //             productsLoading,
// //             anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading,
// //         };
// //     });
// // };
// //
// // // Error states helper with memoization
// // export const useAppErrors = () => {
// //     return useAppSelector((state) => {
// //         const userError = state.user.error;
// //         const cartError = state.cart.error;
// //         const wishlistError = state.wishlist.error;
// //         const productsError = state.allProducts.error;
// //
// //         return {
// //             userError,
// //             cartError,
// //             wishlistError,
// //             productsError,
// //             hasAnyError: !!(userError || cartError || wishlistError || productsError),
// //         };
// //     });
// // };
// //
// // // ==================== ADVANCED SELECTORS ====================
// //
// // // Memoized selector hooks for complex data
// // export const usePaginatedProducts = () => {
// //     return useAppSelector((state) => {
// //         const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
// //         const startIndex = (currentPage - 1) * itemsPerPage;
// //         const endIndex = startIndex + itemsPerPage;
// //         return filteredItems.slice(startIndex, endIndex);
// //     });
// // };
// //
// // export const useProductsByCategory = (category: string) => {
// //     return useAppSelector((state) => {
// //         if (!category) return [];
// //         return state.allProducts.items.filter(product =>
// //             product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
// //         );
// //     });
// // };
// //
// // export const useFeaturedProducts = (limit: number = 8) => {
// //     return useAppSelector((state) => {
// //         return state.allProducts.items
// //             .filter(product => product.averageRating && product.averageRating >= 4)
// //             .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
// //             .slice(0, limit);
// //     });
// // };
// //
// // export const useLatestProducts = (limit: number = 8) => {
// //     return useAppSelector((state) => {
// //         return state.allProducts.items
// //             .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
// //             .slice(0, limit);
// //     });
// // };
// //
// // export const useProductsInPriceRange = (minPrice: number, maxPrice: number) => {
// //     return useAppSelector((state) => {
// //         return state.allProducts.items.filter(product =>
// //             product.price >= minPrice && product.price <= maxPrice
// //         );
// //     });
// // };
// //
// // export const useRelatedProducts = (currentProductId: string, limit: number = 4) => {
// //     return useAppSelector((state) => {
// //         if (!currentProductId) return [];
// //
// //         const currentProduct = state.allProducts.items.find(p => p._id === currentProductId);
// //         if (!currentProduct) return [];
// //
// //         return state.allProducts.items
// //             .filter(product =>
// //                 product._id !== currentProductId &&
// //                 product.category.some(cat => currentProduct.category.includes(cat))
// //             )
// //             .slice(0, limit);
// //     });
// // };
// //
// // // ==================== SEARCH AND FILTER HOOKS ====================
// //
// // export const useSearchResults = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             results: state.allProducts.searchResults,
// //             query: state.allProducts.lastSearchQuery,
// //             hasResults: state.allProducts.searchResults.length > 0,
// //         };
// //     });
// // };
// //
// // export const useProductFilters = () => {
// //     return useAppSelector((state) => {
// //         return {
// //             filters: state.allProducts.filters,
// //             hasActiveFilters: (
// //                 state.allProducts.filters.search.length > 0 ||
// //                 state.allProducts.filters.category.length > 0 ||
// //                 state.allProducts.filters.priceRange[0] > 0 ||
// //                 state.allProducts.filters.priceRange[1] < 10000 ||
// //                 state.allProducts.filters.inStock ||
// //                 state.allProducts.filters.minRating > 0
// //             ),
// //         };
// //     });
// // };
// //
// // // ==================== PAGINATION HOOKS ====================
// //
// // export const usePagination = () => {
// //     return useAppSelector((state) => {
// //         const { currentPage, totalPages, itemsPerPage, totalCount, filteredItems } = state.allProducts;
// //
// //         return {
// //             currentPage,
// //             totalPages,
// //             itemsPerPage,
// //             totalCount,
// //             totalItems: filteredItems.length,
// //             hasNextPage: currentPage < totalPages,
// //             hasPreviousPage: currentPage > 1,
// //             startIndex: (currentPage - 1) * itemsPerPage,
// //             endIndex: Math.min(currentPage * itemsPerPage, filteredItems.length),
// //         };
// //     });
// // };
// //
// // // ==================== CART OPERATIONS HOOKS ====================
// //
// // export const useCartOperations = () => {
// //     const { items, totalCost, totalItems } = useCart();
// //
// //     return useMemo(() => {
// //         const getItemQuantity = (productId: string) => {
// //             const item = items.find(item =>
// //                 item.productId?._id === productId || item.productId === productId
// //             );
// //             return item?.qty || 0;
// //         };
// //
// //         const isInCart = (productId: string) => {
// //             return items.some(item =>
// //                 item.productId?._id === productId || item.productId === productId
// //             );
// //         };
// //
// //         const getCartItem = (productId: string) => {
// //             return items.find(item =>
// //                 item.productId?._id === productId || item.productId === productId
// //             );
// //         };
// //
// //         return {
// //             items,
// //             totalCost,
// //             totalItems,
// //             getItemQuantity,
// //             isInCart,
// //             getCartItem,
// //             isEmpty: items.length === 0,
// //         };
// //     }, [items, totalCost, totalItems]);
// // };
// //
// // // ==================== WISHLIST OPERATIONS HOOKS ====================
// //
// // export const useWishlistOperations = () => {
// //     const { items, totalItems } = useWishlist();
// //
// //     return useMemo(() => {
// //         const isInWishlist = (productId: string) => {
// //             return items.some(item =>
// //                 item.productId?._id === productId || item.productId === productId
// //             );
// //         };
// //
// //         const getWishlistItem = (productId: string) => {
// //             return items.find(item =>
// //                 item.productId?._id === productId || item.productId === productId
// //             );
// //         };
// //
// //         return {
// //             items,
// //             totalItems,
// //             isInWishlist,
// //             getWishlistItem,
// //             isEmpty: items.length === 0,
// //         };
// //     }, [items, totalItems]);
// // };
// //
// // // ==================== USER PROFILE HOOKS ====================
// //
// // export const useUserProfile = () => {
// //     const { user, isAuthenticated } = useAuth();
// //
// //     return useMemo(() => {
// //         if (!isAuthenticated || !user) {
// //             return {
// //                 hasProfile: false,
// //                 isComplete: false,
// //                 user: null,
// //                 missingFields: [],
// //             };
// //         }
// //
// //         const requiredFields = ['name', 'email'];
// //         const optionalFields = ['lastName', 'phoneNumber', 'addressLine1', 'city'];
// //
// //         const missingRequired = requiredFields.filter(field => !user[field]);
// //         const missingOptional = optionalFields.filter(field => !user[field]);
// //
// //         return {
// //             hasProfile: true,
// //             isComplete: missingRequired.length === 0,
// //             user,
// //             missingFields: missingRequired,
// //             incompleteOptionalFields: missingOptional,
// //             completionPercentage: Math.round(
// //                 ((requiredFields.length + optionalFields.length - missingRequired.length - missingOptional.length) /
// //                     (requiredFields.length + optionalFields.length)) * 100
// //             ),
// //         };
// //     }, [user, isAuthenticated]);
// // };
// //
// // // ==================== PERFORMANCE MONITORING HOOKS ====================
// //
// // export const useAppPerformance = () => {
// //     return useAppSelector((state) => {
// //         const lastFetchTime = state.allProducts.lastFetchTime;
// //         const cacheTimeout = state.allProducts.cacheTimeout;
// //         const currentTime = Date.now();
// //
// //         return {
// //             isCacheValid: lastFetchTime && (currentTime - lastFetchTime) < cacheTimeout,
// //             lastFetchTime,
// //             cacheTimeout,
// //             timeUntilExpiry: lastFetchTime ? Math.max(0, cacheTimeout - (currentTime - lastFetchTime)) : 0,
// //         };
// //     });
// // };
// // hooks/redux.ts - Updated version with admin support
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import { useMemo } from 'react';
// import type { RootState, AppDispatch } from '../store';
//
// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // ==================== EXISTING HOOKS (kept as is) ====================
//
// export const useAuth = () => {
//     return useAppSelector((state) => {
//         return {
//             user: state.user.data,
//             token: state.user.token,
//             isAuthenticated: state.user.isAuthenticated,
//             isInitialized: state.user.isInitialized,
//             isLoading: state.user.isLoading,
//             error: state.user.error,
//             status: state.user.status,
//         };
//     });
// };
//
// export const useCart = () => {
//     return useAppSelector((state) => {
//         return {
//             items: state.cart.items,
//             totalCost: state.cart.totalCost,
//             totalItems: state.cart.totalItems,
//             cartId: state.cart._id,
//             loading: state.cart.loading,
//             error: state.cart.error,
//             status: state.cart.status,
//             changed: state.cart.changed,
//         };
//     });
// };
//
// export const useWishlist = () => {
//     return useAppSelector((state) => {
//         return {
//             items: state.wishlist.items,
//             totalItems: state.wishlist.totalItems,
//             wishlistId: state.wishlist._id,
//             loading: state.wishlist.loading,
//             error: state.wishlist.error,
//             status: state.wishlist.status,
//         };
//     });
// };
//
// export const useProducts = () => {
//     return useAppSelector((state) => {
//         return {
//             items: state.allProducts.items,
//             filteredItems: state.allProducts.filteredItems,
//             currentProduct: state.allProducts.currentProduct,
//             totalCount: state.allProducts.totalCount,
//             categories: state.allProducts.categories,
//             filters: state.allProducts.filters,
//             loading: state.allProducts.loading,
//             error: state.allProducts.error,
//             status: state.allProducts.status,
//         };
//     });
// };
//
// // ==================== NEW ADMIN HOOKS ====================
//
// export const useAdminState = () => {
//     return useAppSelector((state) => {
//         return {
//             // Users
//             users: state.admin.users,
//             filteredUsers: state.admin.filteredUsers,
//             userSearchTerm: state.admin.userSearchTerm,
//             usersLoading: state.admin.usersLoading,
//             usersError: state.admin.usersError,
//
//             // UI
//             activeTab: state.admin.activeTab,
//             sidebarOpen: state.admin.sidebarOpen,
//         };
//     });
// };
//
// // ==================== EXISTING HELPER HOOKS (kept as is) ====================
//
// export const useIsInWishlist = (productId: string) => {
//     return useAppSelector((state) => {
//         if (!productId) return false;
//         return state.wishlist.items.some(item =>
//             item.productId?._id === productId || item.productId === productId
//         );
//     });
// };
//
// export const useIsInCart = (productId: string) => {
//     return useAppSelector((state) => {
//         if (!productId) return false;
//         return state.cart.items.some(item =>
//             item.productId?._id === productId || item.productId === productId
//         );
//     });
// };
//
// export const useCartItemQuantity = (productId: string) => {
//     return useAppSelector((state) => {
//         if (!productId) return 0;
//         const item = state.cart.items.find(item =>
//             item.productId?._id === productId || item.productId === productId
//         );
//         return item?.qty || 0;
//     });
// };
//
// export const useProductById = (productId: string) => {
//     return useAppSelector((state) => {
//         if (!productId) return null;
//         return state.allProducts.items.find(product => product._id === productId) || null;
//     });
// };
//
// // Admin-specific hooks
// export const useIsAdmin = () => {
//     return useAppSelector((state) => state.user.data?.admin || false);
// };
//
// // Loading states helper with memoization
// export const useAppLoading = () => {
//     return useAppSelector((state) => {
//         const userLoading = state.user.isLoading;
//         const cartLoading = state.cart.loading;
//         const wishlistLoading = state.wishlist.loading;
//         const productsLoading = state.allProducts.loading;
//         const usersLoading = state.admin.usersLoading;
//
//         return {
//             userLoading,
//             cartLoading,
//             wishlistLoading,
//             productsLoading,
//             usersLoading,
//             anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading || usersLoading,
//         };
//     });
// };
//
// // Error states helper with memoization
// export const useAppErrors = () => {
//     return useAppSelector((state) => {
//         const userError = state.user.error;
//         const cartError = state.cart.error;
//         const wishlistError = state.wishlist.error;
//         const productsError = state.allProducts.error;
//         const usersError = state.admin.usersError;
//
//         return {
//             userError,
//             cartError,
//             wishlistError,
//             productsError,
//             usersError,
//             hasAnyError: !!(userError || cartError || wishlistError || productsError || usersError),
//         };
//     });
// };
//
// // ==================== EXISTING ADVANCED SELECTORS (kept as is) ====================
//
// export const usePaginatedProducts = () => {
//     return useAppSelector((state) => {
//         const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         return filteredItems.slice(startIndex, endIndex);
//     });
// };
//
// export const useProductsByCategory = (category: string) => {
//     return useAppSelector((state) => {
//         if (!category) return [];
//         return state.allProducts.items.filter(product =>
//             product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
//         );
//     });
// };
//
// export const useFeaturedProducts = (limit: number = 8) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items
//             .filter(product => product.averageRating && product.averageRating >= 4)
//             .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
//             .slice(0, limit);
//     });
// };
//
// export const useLatestProducts = (limit: number = 8) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items
//             .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//             .slice(0, limit);
//     });
// };
//
// export const useProductsInPriceRange = (minPrice: number, maxPrice: number) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items.filter(product =>
//             product.price >= minPrice && product.price <= maxPrice
//         );
//     });
// };
//
// export const useRelatedProducts = (currentProductId: string, limit: number = 4) => {
//     return useAppSelector((state) => {
//         if (!currentProductId) return [];
//
//         const currentProduct = state.allProducts.items.find(p => p._id === currentProductId);
//         if (!currentProduct) return [];
//
//         return state.allProducts.items
//             .filter(product =>
//                 product._id !== currentProductId &&
//                 product.category.some(cat => currentProduct.category.includes(cat))
//             )
//             .slice(0, limit);
//     });
// };
//
// // ==================== EXISTING OTHER HOOKS (kept as is) ====================
//
// export const useSearchResults = () => {
//     return useAppSelector((state) => {
//         return {
//             results: state.allProducts.searchResults,
//             query: state.allProducts.lastSearchQuery,
//             hasResults: state.allProducts.searchResults.length > 0,
//         };
//     });
// };
//
// export const useProductFilters = () => {
//     return useAppSelector((state) => {
//         return {
//             filters: state.allProducts.filters,
//             hasActiveFilters: (
//                 state.allProducts.filters.search.length > 0 ||
//                 state.allProducts.filters.category.length > 0 ||
//                 state.allProducts.filters.priceRange[0] > 0 ||
//                 state.allProducts.filters.priceRange[1] < 10000 ||
//                 state.allProducts.filters.inStock ||
//                 state.allProducts.filters.minRating > 0
//             ),
//         };
//     });
// };
//
// export const usePagination = () => {
//     return useAppSelector((state) => {
//         const { currentPage, totalPages, itemsPerPage, totalCount, filteredItems } = state.allProducts;
//
//         return {
//             currentPage,
//             totalPages,
//             itemsPerPage,
//             totalCount,
//             totalItems: filteredItems.length,
//             hasNextPage: currentPage < totalPages,
//             hasPreviousPage: currentPage > 1,
//             startIndex: (currentPage - 1) * itemsPerPage,
//             endIndex: Math.min(currentPage * itemsPerPage, filteredItems.length),
//         };
//     });
// };
//
// export const useCartOperations = () => {
//     const { items, totalCost, totalItems } = useCart();
//
//     return useMemo(() => {
//         const getItemQuantity = (productId: string) => {
//             const item = items.find(item =>
//                 item.productId?._id === productId || item.productId === productId
//             );
//             return item?.qty || 0;
//         };
//
//         const isInCart = (productId: string) => {
//             return items.some(item =>
//                 item.productId?._id === productId || item.productId === productId
//             );
//         };
//
//         const getCartItem = (productId: string) => {
//             return items.find(item =>
//                 item.productId?._id === productId || item.productId === productId
//             );
//         };
//
//         return {
//             items,
//             totalCost,
//             totalItems,
//             getItemQuantity,
//             isInCart,
//             getCartItem,
//             isEmpty: items.length === 0,
//         };
//     }, [items, totalCost, totalItems]);
// };
//
// export const useWishlistOperations = () => {
//     const { items, totalItems } = useWishlist();
//
//     return useMemo(() => {
//         const isInWishlist = (productId: string) => {
//             return items.some(item =>
//                 item.productId?._id === productId || item.productId === productId
//             );
//         };
//
//         const getWishlistItem = (productId: string) => {
//             return items.find(item =>
//                 item.productId?._id === productId || item.productId === productId
//             );
//         };
//
//         return {
//             items,
//             totalItems,
//             isInWishlist,
//             getWishlistItem,
//             isEmpty: items.length === 0,
//         };
//     }, [items, totalItems]);
// };
//
//
// export const useUserProfile = () => {
//     const { user, isAuthenticated } = useAuth();
//
//     return useMemo(() => {
//         if (!isAuthenticated || !user) {
//             return {
//                 hasProfile: false,
//                 isComplete: false,
//                 user: null,
//                 missingFields: [],
//             };
//         }
//
//         const requiredFields = ['name', 'email'];
//         const optionalFields = ['lastName', 'phoneNumber', 'addressLine1', 'city'];
//
//         const missingRequired = requiredFields.filter(field => !user[field]);
//         const missingOptional = optionalFields.filter(field => !user[field]);
//
//         return {
//             hasProfile: true,
//             isComplete: missingRequired.length === 0,
//             user,
//             missingFields: missingRequired,
//             incompleteOptionalFields: missingOptional,
//             completionPercentage: Math.round(
//                 ((requiredFields.length + optionalFields.length - missingRequired.length - missingOptional.length) /
//                     (requiredFields.length + optionalFields.length)) * 100
//             ),
//         };
//     }, [user, isAuthenticated]);
// };
//
// export const useAppPerformance = () => {
//     return useAppSelector((state) => {
//         const lastFetchTime = state.allProducts.lastFetchTime;
//         const cacheTimeout = state.allProducts.cacheTimeout;
//         const currentTime = Date.now();
//
//         return {
//             isCacheValid: lastFetchTime && (currentTime - lastFetchTime) < cacheTimeout,
//             lastFetchTime,
//             cacheTimeout,
//             timeUntilExpiry: lastFetchTime ? Math.max(0, cacheTimeout - (currentTime - lastFetchTime)) : 0,
//         };
//     });
// };
// hooks/redux.ts - Comprehensive Redux hooks for the e-commerce application
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';
import type { RootState, AppDispatch } from '@/store';

// ==================== BASE HOOKS ====================

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ==================== CORE STATE HOOKS ====================

// User/Authentication state
export const useAuth = () => {
    return useAppSelector((state) => {
        return {
            user: state.user.data,
            token: state.user.token,
            isAuthenticated: state.user.isAuthenticated,
            isInitialized: state.user.isInitialized,
            isLoading: state.user.isLoading,
            error: state.user.error,
            status: state.user.status,
        };
    });
};

// Cart state
export const useCart = () => {
    return useAppSelector((state) => {
        return {
            items: state.cart.items,
            totalCost: state.cart.totalCost,
            totalItems: state.cart.totalItems,
            cartId: state.cart._id,
            loading: state.cart.loading,
            error: state.cart.error,
            status: state.cart.status,
            changed: state.cart.changed,
        };
    });
};

// Wishlist state
export const useWishlist = () => {
    return useAppSelector((state) => {
        return {
            items: state.wishlist.items,
            totalItems: state.wishlist.totalItems,
            wishlistId: state.wishlist._id,
            loading: state.wishlist.loading,
            error: state.wishlist.error,
            status: state.wishlist.status,
        };
    });
};

// Products state
export const useProducts = () => {
    return useAppSelector((state) => {
        return {
            items: state.allProducts.items,
            filteredItems: state.allProducts.filteredItems,
            currentProduct: state.allProducts.currentProduct,
            totalCount: state.allProducts.totalCount,
            categories: state.allProducts.categories,
            filters: state.allProducts.filters,
            loading: state.allProducts.loading,
            error: state.allProducts.error,
            status: state.allProducts.status,
        };
    });
};

// Admin state
export const useAdminState = () => {
    return useAppSelector((state) => {
        return {
            // Users
            users: state.admin.users,
            filteredUsers: state.admin.filteredUsers,
            userSearchTerm: state.admin.userSearchTerm,
            usersLoading: state.admin.usersLoading,
            usersError: state.admin.usersError,

            // UI
            activeTab: state.admin.activeTab,
            sidebarOpen: state.admin.sidebarOpen,
        };
    });
};

// Reviews state
export const useReviewsState = () => {
    return useAppSelector((state) => {
        return {
            // Reviews data
            currentProductReviews: state.reviews.currentProductReviews,
            currentProductId: state.reviews.currentProductId,
            reviewStats: state.reviews.reviewStats,

            // Loading states
            loading: state.reviews.loading,
            addingReview: state.reviews.addingReview,
            updatingReview: state.reviews.updatingReview,
            deletingReview: state.reviews.deletingReview,

            // Error state
            error: state.reviews.error,

            // UI states
            showWriteReview: state.reviews.showWriteReview,
            editingReview: state.reviews.editingReview,
            showDeleteConfirm: state.reviews.showDeleteConfirm,
            reviewToDelete: state.reviews.reviewToDelete,

            // Form state
            reviewForm: state.reviews.reviewForm,
        };
    });
};

// ==================== UTILITY HOOKS ====================

// Helper hooks for specific functionality with proper memoization
export const useIsInWishlist = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return false;
        return state.wishlist.items.some(item =>
            item.productId?._id === productId || item.productId === productId
        );
    });
};

export const useIsInCart = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return false;
        return state.cart.items.some(item =>
            item.productId?._id === productId || item.productId === productId
        );
    });
};

export const useCartItemQuantity = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return 0;
        const item = state.cart.items.find(item =>
            item.productId?._id === productId || item.productId === productId
        );
        return item?.qty || 0;
    });
};

export const useProductById = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return null;
        return state.allProducts.items.find(product => product._id === productId) || null;
    });
};

// Admin permission check
export const useIsAdmin = () => {
    return useAppSelector((state) => state.user.data?.admin || false);
};

// Review permission checks
export const useReviewPermissions = (productId?: string) => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        const isAuthenticated = state.user.isAuthenticated;
        const userReviews = state.reviews.currentProductReviews.filter(
            review => review.user?._id === userId
        );

        return {
            isAuthenticated,
            canReview: isAuthenticated && userId && userReviews.length === 0,
            hasReviewed: userReviews.length > 0,
            userReview: userReviews[0] || null,
            canEditReview: (review: any) => userId === review.user?._id,
            canDeleteReview: (review: any) => userId === review.user?._id || state.user.data?.admin,
        };
    });
};

// ==================== LOADING & ERROR STATE HOOKS ====================

// Combined loading states
export const useAppLoading = () => {
    return useAppSelector((state) => {
        const userLoading = state.user.isLoading;
        const cartLoading = state.cart.loading;
        const wishlistLoading = state.wishlist.loading;
        const productsLoading = state.allProducts.loading;
        const usersLoading = state.admin.usersLoading;
        const reviewsLoading = state.reviews.loading;
        const addingReview = state.reviews.addingReview;
        const updatingReview = state.reviews.updatingReview;
        const deletingReview = state.reviews.deletingReview;

        return {
            userLoading,
            cartLoading,
            wishlistLoading,
            productsLoading,
            usersLoading,
            reviewsLoading,
            addingReview,
            updatingReview,
            deletingReview,
            anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading || usersLoading || reviewsLoading,
            anyReviewAction: addingReview || updatingReview || deletingReview,
        };
    });
};

// Combined error states
export const useAppErrors = () => {
    return useAppSelector((state) => {
        const userError = state.user.error;
        const cartError = state.cart.error;
        const wishlistError = state.wishlist.error;
        const productsError = state.allProducts.error;
        const usersError = state.admin.usersError;
        const reviewsError = state.reviews.error;

        return {
            userError,
            cartError,
            wishlistError,
            productsError,
            usersError,
            reviewsError,
            hasAnyError: !!(userError || cartError || wishlistError || productsError || usersError || reviewsError),
        };
    });
};

// ==================== PRODUCT-SPECIFIC HOOKS ====================

// Paginated products
export const usePaginatedProducts = () => {
    return useAppSelector((state) => {
        const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    });
};

// Products by category
export const useProductsByCategory = (category: string) => {
    return useAppSelector((state) => {
        if (!category) return [];
        return state.allProducts.items.filter(product =>
            product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
        );
    });
};

// Featured products (high-rated)
export const useFeaturedProducts = (limit: number = 8) => {
    return useAppSelector((state) => {
        return state.allProducts.items
            .filter(product => product.averageRating && product.averageRating >= 4)
            .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
            .slice(0, limit);
    });
};

// Latest products
export const useLatestProducts = (limit: number = 8) => {
    return useAppSelector((state) => {
        return state.allProducts.items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
    });
};

// Products in price range
export const useProductsInPriceRange = (minPrice: number, maxPrice: number) => {
    return useAppSelector((state) => {
        return state.allProducts.items.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
    });
};

// Related products
export const useRelatedProducts = (currentProductId: string, limit: number = 4) => {
    return useAppSelector((state) => {
        if (!currentProductId) return [];

        const currentProduct = state.allProducts.items.find(p => p._id === currentProductId);
        if (!currentProduct) return [];

        return state.allProducts.items
            .filter(product =>
                product._id !== currentProductId &&
                product.category.some(cat => currentProduct.category.includes(cat))
            )
            .slice(0, limit);
    });
};

// ==================== REVIEW-SPECIFIC HOOKS ====================

// Product reviews for specific product
export const useProductReviews = (productId: string) => {
    return useAppSelector((state) => {
        const currentProductId = state.reviews.currentProductId;
        if (currentProductId !== productId) return [];

        return state.reviews.currentProductReviews;
    });
};

// Review statistics
export const useReviewStats = (productId?: string) => {
    return useAppSelector((state) => {
        if (productId && state.reviews.currentProductId !== productId) {
            return {
                totalReviews: 0,
                averageRating: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }

        return state.reviews.reviewStats;
    });
};

// User review capability check
export const useUserCanReview = (productId?: string) => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        const isAuthenticated = state.user.isAuthenticated;

        if (!isAuthenticated || !userId) return false;

        // If productId is provided, check if user has reviewed this specific product
        if (productId && state.reviews.currentProductId === productId) {
            const userReviews = state.reviews.currentProductReviews.filter(
                review => review.user?._id === userId
            );
            return userReviews.length === 0;
        }

        return isAuthenticated;
    });
};

// Rating percentages for distribution graph
export const useRatingPercentages = () => {
    return useAppSelector((state) => {
        const stats = state.reviews.reviewStats;
        const total = stats.totalReviews;

        if (total === 0) {
            return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        }

        return Object.keys(stats.ratingDistribution).reduce((acc, rating) => {
            acc[rating] = Math.round((stats.ratingDistribution[rating] / total) * 100);
            return acc;
        }, {} as Record<string, number>);
    });
};

// User's reviews for current product
export const useUserReviews = () => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        if (!userId) return [];

        return state.reviews.currentProductReviews.filter(
            review => review.user?._id === userId
        );
    });
};

// ==================== SEARCH & FILTER HOOKS ====================

// Search results
export const useSearchResults = () => {
    return useAppSelector((state) => {
        return {
            results: state.allProducts.searchResults,
            query: state.allProducts.lastSearchQuery,
            hasResults: state.allProducts.searchResults.length > 0,
        };
    });
};

// Product filters
export const useProductFilters = () => {
    return useAppSelector((state) => {
        return {
            filters: state.allProducts.filters,
            hasActiveFilters: (
                state.allProducts.filters.search.length > 0 ||
                state.allProducts.filters.category.length > 0 ||
                state.allProducts.filters.priceRange[0] > 0 ||
                state.allProducts.filters.priceRange[1] < 10000 ||
                state.allProducts.filters.inStock ||
                state.allProducts.filters.minRating > 0
            ),
        };
    });
};

// ==================== PAGINATION HOOKS ====================

// Pagination state and helpers
export const usePagination = () => {
    return useAppSelector((state) => {
        const { currentPage, totalPages, itemsPerPage, totalCount, filteredItems } = state.allProducts;

        return {
            currentPage,
            totalPages,
            itemsPerPage,
            totalCount,
            totalItems: filteredItems.length,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
            startIndex: (currentPage - 1) * itemsPerPage,
            endIndex: Math.min(currentPage * itemsPerPage, filteredItems.length),
        };
    });
};

// ==================== COMPLEX OPERATION HOOKS ====================

// Cart operations with computed values
export const useCartOperations = () => {
    const { items, totalCost, totalItems } = useCart();

    return useMemo(() => {
        const getItemQuantity = (productId: string) => {
            const item = items.find(item =>
                item.productId?._id === productId || item.productId === productId
            );
            return item?.qty || 0;
        };

        const isInCart = (productId: string) => {
            return items.some(item =>
                item.productId?._id === productId || item.productId === productId
            );
        };

        const getCartItem = (productId: string) => {
            return items.find(item =>
                item.productId?._id === productId || item.productId === productId
            );
        };

        const getCartSubtotal = () => {
            return items.reduce((total, item) => {
                return total + (item.qty * (item.productId?.price || 0));
            }, 0);
        };

        const getCartItemCount = () => {
            return items.reduce((total, item) => total + item.qty, 0);
        };

        return {
            items,
            totalCost,
            totalItems,
            getItemQuantity,
            isInCart,
            getCartItem,
            getCartSubtotal,
            getCartItemCount,
            isEmpty: items.length === 0,
            hasItems: items.length > 0,
        };
    }, [items, totalCost, totalItems]);
};

// Wishlist operations with computed values
export const useWishlistOperations = () => {
    const { items, totalItems } = useWishlist();

    return useMemo(() => {
        const isInWishlist = (productId: string) => {
            return items.some(item =>
                item.productId?._id === productId || item.productId === productId
            );
        };

        const getWishlistItem = (productId: string) => {
            return items.find(item =>
                item.productId?._id === productId || item.productId === productId
            );
        };

        const getWishlistProducts = () => {
            return items.map(item => item.productId).filter(Boolean);
        };

        return {
            items,
            totalItems,
            isInWishlist,
            getWishlistItem,
            getWishlistProducts,
            isEmpty: items.length === 0,
            hasItems: items.length > 0,
        };
    }, [items, totalItems]);
};

// ==================== USER PROFILE HOOKS ====================

// User profile completion and validation
export const useUserProfile = () => {
    const { user, isAuthenticated } = useAuth();

    return useMemo(() => {
        if (!isAuthenticated || !user) {
            return {
                hasProfile: false,
                isComplete: false,
                user: null,
                missingFields: [],
                completionPercentage: 0,
            };
        }

        const requiredFields = ['name', 'email'];
        const optionalFields = ['lastName', 'phoneNumber', 'addressLine1', 'city'];
        const allFields = [...requiredFields, ...optionalFields];

        const missingRequired = requiredFields.filter(field => !user[field]);
        const missingOptional = optionalFields.filter(field => !user[field]);
        const completedFields = allFields.filter(field => user[field]);

        const completionPercentage = Math.round((completedFields.length / allFields.length) * 100);

        return {
            hasProfile: true,
            isComplete: missingRequired.length === 0,
            user,
            missingFields: missingRequired,
            incompleteOptionalFields: missingOptional,
            completionPercentage,
            canPlaceOrder: missingRequired.length === 0,
            profileStrength: completionPercentage >= 80 ? 'strong' : completionPercentage >= 50 ? 'medium' : 'weak',
        };
    }, [user, isAuthenticated]);
};

// ==================== PERFORMANCE & CACHING HOOKS ====================

// App performance monitoring
export const useAppPerformance = () => {
    return useAppSelector((state) => {
        const lastFetchTime = state.allProducts.lastFetchTime;
        const cacheTimeout = state.allProducts.cacheTimeout;
        const currentTime = Date.now();

        return {
            isCacheValid: lastFetchTime && (currentTime - lastFetchTime) < cacheTimeout,
            lastFetchTime,
            cacheTimeout,
            timeUntilExpiry: lastFetchTime ? Math.max(0, cacheTimeout - (currentTime - lastFetchTime)) : 0,
            cacheAge: lastFetchTime ? currentTime - lastFetchTime : 0,
            shouldRefresh: !lastFetchTime || (currentTime - lastFetchTime) >= cacheTimeout,
        };
    });
};

// ==================== COMPOSITE HOOKS ====================

// Complete app state summary
export const useAppState = () => {
    const auth = useAuth();
    const cart = useCart();
    const wishlist = useWishlist();
    const products = useProducts();
    const loading = useAppLoading();
    const errors = useAppErrors();

    return useMemo(() => ({
        // User state
        isLoggedIn: auth.isAuthenticated,
        user: auth.user,
        isAdmin: auth.user?.admin || false,

        // Cart summary
        cartItemCount: cart.totalItems,
        cartTotal: cart.totalCost,
        hasCartItems: cart.items.length > 0,

        // Wishlist summary
        wishlistItemCount: wishlist.totalItems,
        hasWishlistItems: wishlist.items.length > 0,

        // Products summary
        totalProducts: products.totalCount,
        hasProducts: products.items.length > 0,

        // App status
        isLoading: loading.anyLoading,
        hasErrors: errors.hasAnyError,

        // Quick checks
        canShop: auth.isAuthenticated && products.hasProducts,
        needsLogin: !auth.isAuthenticated,
        hasData: products.hasProducts || cart.hasCartItems || wishlist.hasWishlistItems,
    }), [auth, cart, wishlist, products, loading, errors]);
};

// Product page specific state
export const useProductPageState = (productId: string) => {
    const product = useProductById(productId);
    const reviews = useProductReviews(productId);
    const reviewStats = useReviewStats(productId);
    const isInCart = useIsInCart(productId);
    const isInWishlist = useIsInWishlist(productId);
    const cartQuantity = useCartItemQuantity(productId);
    const canReview = useUserCanReview(productId);
    const reviewPermissions = useReviewPermissions(productId);

    return useMemo(() => ({
        // Product data
        product,
        hasProduct: !!product,

        // Reviews data
        reviews,
        reviewStats,
        hasReviews: reviews.length > 0,

        // User interactions
        isInCart,
        isInWishlist,
        cartQuantity,
        canReview,
        ...reviewPermissions,

        // Quick actions available
        canAddToCart: !!product && product.stock > 0,
        canAddToWishlist: !!product && !isInWishlist,
        canWriteReview: canReview,

        // Product status
        isAvailable: !!product && product.stock > 0,
        isOutOfStock: !!product && product.stock === 0,
        hasDiscount: !!product && product.discountPrice && product.discountPrice < product.price,
    }), [
        product, reviews, reviewStats, isInCart, isInWishlist,
        cartQuantity, canReview, reviewPermissions
    ]);
};