// // // // hooks/redux.js
// // // import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// // // import type { RootState, AppDispatch } from '../store';
// // //
// // // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// // //
// // // // lib/utils/apiClient.js - Centralized API client
// // // import axios from 'axios';
// // //
// // // const apiClient = axios.create({
// // //     baseURL: process.env.NODE_ENV === 'production'
// // //         ? 'https://your-domain.com'
// // //         : 'http://localhost:3000',
// // //     timeout: 10000,
// // // });
// // //
// // // // Request interceptor to add auth token
// // // apiClient.interceptors.request.use(
// // //     (config) => {
// // //         if (typeof window !== 'undefined') {
// // //             const token = localStorage.getItem('token');
// // //             if (token) {
// // //                 config.headers.Authorization = `Bearer ${token}`;
// // //             }
// // //         }
// // //         return config;
// // //     },
// // //     (error) => {
// // //         return Promise.reject(error);
// // //     }
// // // );
// // //
// // // // Response interceptor for error handling
// // // apiClient.interceptors.response.use(
// // //     (response) => response,
// // //     (error) => {
// // //         if (error.response?.status === 401) {
// // //             // Handle unauthorized access
// // //             if (typeof window !== 'undefined') {
// // //                 localStorage.removeItem('token');
// // //                 localStorage.removeItem('user');
// // //                 window.location.href = '/login';
// // //             }
// // //         }
// // //         return Promise.reject(error);
// // //     }
// // // );
// // //
// // // export default apiClient;
// // // hooks/redux.ts
// // import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// // import type { RootState, AppDispatch } from '../store';
// //
// // // Use throughout your app instead of plain `useDispatch` and `useSelector`
// // export const useAppDispatch = () => useDispatch<AppDispatch>();
// // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// //
// // // Custom hooks for common state selections
// // export const useAuth = () => {
// //     return useAppSelector((state) => ({
// //         user: state.user.data,
// //         token: state.user.token,
// //         isAuthenticated: state.user.isAuthenticated,
// //         isInitialized: state.user.isInitialized,
// //         isLoading: state.user.isLoading,
// //         error: state.user.error,
// //         status: state.user.status,
// //     }));
// // };
// //
// // export const useCart = () => {
// //     return useAppSelector((state) => ({
// //         items: state.cart.items,
// //         totalCost: state.cart.totalCost,
// //         totalItems: state.cart.totalItems,
// //         cartId: state.cart._id,
// //         loading: state.cart.loading,
// //         error: state.cart.error,
// //         status: state.cart.status,
// //         changed: state.cart.changed,
// //     }));
// // };
// //
// // export const useWishlist = () => {
// //     return useAppSelector((state) => ({
// //         items: state.wishlist.items,
// //         totalItems: state.wishlist.totalItems,
// //         wishlistId: state.wishlist._id,
// //         loading: state.wishlist.loading,
// //         error: state.wishlist.error,
// //         status: state.wishlist.status,
// //     }));
// // };
// //
// // export const useProducts = () => {
// //     return useAppSelector((state) => ({
// //         items: state.allProducts.items,
// //         filteredItems: state.allProducts.filteredItems,
// //         currentProduct: state.allProducts.currentProduct,
// //         totalCount: state.allProducts.totalCount,
// //         categories: state.allProducts.categories,
// //         filters: state.allProducts.filters,
// //         loading: state.allProducts.loading,
// //         error: state.allProducts.error,
// //         status: state.allProducts.status,
// //     }));
// // };
// //
// // // Helper hooks for specific functionality
// // export const useIsInWishlist = (productId: string) => {
// //     return useAppSelector((state) =>
// //         state.wishlist.items.some(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         )
// //     );
// // };
// //
// // export const useIsInCart = (productId: string) => {
// //     return useAppSelector((state) =>
// //         state.cart.items.some(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         )
// //     );
// // };
// //
// // export const useCartItemQuantity = (productId: string) => {
// //     return useAppSelector((state) => {
// //         const item = state.cart.items.find(item =>
// //             item.productId?._id === productId || item.productId === productId
// //         );
// //         return item?.qty || 0;
// //     });
// // };
// //
// // export const useProductById = (productId: string) => {
// //     return useAppSelector((state) =>
// //         state.allProducts.items.find(product => product._id === productId)
// //     );
// // };
// //
// // // Admin-specific hooks
// // export const useIsAdmin = () => {
// //     return useAppSelector((state) => state.user.data?.admin || false);
// // };
// //
// // // Loading states helper
// // export const useAppLoading = () => {
// //     return useAppSelector((state) => ({
// //         userLoading: state.user.isLoading,
// //         cartLoading: state.cart.loading,
// //         wishlistLoading: state.wishlist.loading,
// //         productsLoading: state.allProducts.loading,
// //         anyLoading: state.user.isLoading || state.cart.loading || state.wishlist.loading || state.allProducts.loading,
// //     }));
// // };
// //
// // // Error states helper
// // export const useAppErrors = () => {
// //     return useAppSelector((state) => ({
// //         userError: state.user.error,
// //         cartError: state.cart.error,
// //         wishlistError: state.wishlist.error,
// //         productsError: state.allProducts.error,
// //         hasAnyError: !!(state.user.error || state.cart.error || state.wishlist.error || state.allProducts.error),
// //     }));
// // };
// // hooks/redux.ts
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import { useMemo } from 'react';
// import type { RootState, AppDispatch } from '../store';
//
// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // ==================== MEMOIZED CUSTOM HOOKS ====================
//
// // Custom hooks for common state selections with memoization
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
// // ==================== HELPER HOOKS WITH MEMOIZATION ====================
//
// // Helper hooks for specific functionality with proper memoization
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
//
//         return {
//             userLoading,
//             cartLoading,
//             wishlistLoading,
//             productsLoading,
//             anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading,
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
//
//         return {
//             userError,
//             cartError,
//             wishlistError,
//             productsError,
//             hasAnyError: !!(userError || cartError || wishlistError || productsError),
//         };
//     });
// };
//
// // ==================== ADVANCED SELECTORS ====================
//
// // Memoized selector hooks for complex data
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
// // ==================== SEARCH AND FILTER HOOKS ====================
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
// // ==================== PAGINATION HOOKS ====================
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
// // ==================== CART OPERATIONS HOOKS ====================
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
// // ==================== WISHLIST OPERATIONS HOOKS ====================
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
// // ==================== USER PROFILE HOOKS ====================
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
// // ==================== PERFORMANCE MONITORING HOOKS ====================
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
// hooks/redux.ts - Updated version with admin support
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ==================== EXISTING HOOKS (kept as is) ====================

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

// ==================== NEW ADMIN HOOKS ====================

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

// ==================== EXISTING HELPER HOOKS (kept as is) ====================

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

// Admin-specific hooks
export const useIsAdmin = () => {
    return useAppSelector((state) => state.user.data?.admin || false);
};

// Loading states helper with memoization
export const useAppLoading = () => {
    return useAppSelector((state) => {
        const userLoading = state.user.isLoading;
        const cartLoading = state.cart.loading;
        const wishlistLoading = state.wishlist.loading;
        const productsLoading = state.allProducts.loading;
        const usersLoading = state.admin.usersLoading;

        return {
            userLoading,
            cartLoading,
            wishlistLoading,
            productsLoading,
            usersLoading,
            anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading || usersLoading,
        };
    });
};

// Error states helper with memoization
export const useAppErrors = () => {
    return useAppSelector((state) => {
        const userError = state.user.error;
        const cartError = state.cart.error;
        const wishlistError = state.wishlist.error;
        const productsError = state.allProducts.error;
        const usersError = state.admin.usersError;

        return {
            userError,
            cartError,
            wishlistError,
            productsError,
            usersError,
            hasAnyError: !!(userError || cartError || wishlistError || productsError || usersError),
        };
    });
};

// ==================== EXISTING ADVANCED SELECTORS (kept as is) ====================

export const usePaginatedProducts = () => {
    return useAppSelector((state) => {
        const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    });
};

export const useProductsByCategory = (category: string) => {
    return useAppSelector((state) => {
        if (!category) return [];
        return state.allProducts.items.filter(product =>
            product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
        );
    });
};

export const useFeaturedProducts = (limit: number = 8) => {
    return useAppSelector((state) => {
        return state.allProducts.items
            .filter(product => product.averageRating && product.averageRating >= 4)
            .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
            .slice(0, limit);
    });
};

export const useLatestProducts = (limit: number = 8) => {
    return useAppSelector((state) => {
        return state.allProducts.items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
    });
};

export const useProductsInPriceRange = (minPrice: number, maxPrice: number) => {
    return useAppSelector((state) => {
        return state.allProducts.items.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
    });
};

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

// ==================== EXISTING OTHER HOOKS (kept as is) ====================

export const useSearchResults = () => {
    return useAppSelector((state) => {
        return {
            results: state.allProducts.searchResults,
            query: state.allProducts.lastSearchQuery,
            hasResults: state.allProducts.searchResults.length > 0,
        };
    });
};

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

        return {
            items,
            totalCost,
            totalItems,
            getItemQuantity,
            isInCart,
            getCartItem,
            isEmpty: items.length === 0,
        };
    }, [items, totalCost, totalItems]);
};

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

        return {
            items,
            totalItems,
            isInWishlist,
            getWishlistItem,
            isEmpty: items.length === 0,
        };
    }, [items, totalItems]);
};

export const useUserProfile = () => {
    const { user, isAuthenticated } = useAuth();

    return useMemo(() => {
        if (!isAuthenticated || !user) {
            return {
                hasProfile: false,
                isComplete: false,
                user: null,
                missingFields: [],
            };
        }

        const requiredFields = ['name', 'email'];
        const optionalFields = ['lastName', 'phoneNumber', 'addressLine1', 'city'];

        const missingRequired = requiredFields.filter(field => !user[field]);
        const missingOptional = optionalFields.filter(field => !user[field]);

        return {
            hasProfile: true,
            isComplete: missingRequired.length === 0,
            user,
            missingFields: missingRequired,
            incompleteOptionalFields: missingOptional,
            completionPercentage: Math.round(
                ((requiredFields.length + optionalFields.length - missingRequired.length - missingOptional.length) /
                    (requiredFields.length + optionalFields.length)) * 100
            ),
        };
    }, [user, isAuthenticated]);
};

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
        };
    });
};