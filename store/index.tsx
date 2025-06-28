// // // // // store/index.js
// // // // import { configureStore } from '@reduxjs/toolkit';
// // // // import { createWrapper } from 'next-redux-wrapper';
// // // // import userSlice from './slices/userSlice';
// // // // import cartSlice from './slices/cartSlice';
// // // // import wishlistSlice from './slices/wishlistSlice';
// // // // import allProductSlice from './slices/allProductSlice';
// // // //
// // // // const makeStore = () =>
// // // //     configureStore({
// // // //         reducer: {
// // // //             user: userSlice,
// // // //             cart: cartSlice,
// // // //             wishlist: wishlistSlice,
// // // //             allproducts: allProductSlice,
// // // //         },
// // // //         middleware: (getDefaultMiddleware) =>
// // // //             getDefaultMiddleware({
// // // //                 serializableCheck: {
// // // //                     ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
// // // //                 },
// // // //             }),
// // // //         devTools: process.env.NODE_ENV !== 'production',
// // // //     });
// // // //
// // // // export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });
// // //
// // // import { configureStore } from '@reduxjs/toolkit';
// // // import userSlice from './slices/userSlice';
// // // import cartSlice from './slices/cartSlice';
// // // import wishlistSlice from './slices/wishlistSlice';
// // // import allProductSlice from './slices/allProductSlice';
// // //
// // // export const store = configureStore({
// // //     reducer: {
// // //         user: userSlice,
// // //         cart: cartSlice,
// // //         wishlist: wishlistSlice,
// // //         allProducts: allProductSlice,
// // //     },
// // //     middleware: (getDefaultMiddleware) =>
// // //         getDefaultMiddleware({
// // //             serializableCheck: {
// // //                 ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
// // //             },
// // //         }),
// // //     devTools: process.env.NODE_ENV !== 'production',
// // // });
// // //
// // // export type RootState = ReturnType<typeof store.getState>;
// // // export type AppDispatch = typeof store.dispatch;
// // // store/index.tsx
// // import { configureStore } from '@reduxjs/toolkit';
// // import userSlice from './slices/userSlice';
// // import cartSlice from './slices/cartSlice';
// // import wishlistSlice from './slices/wishlistSlice';
// // import allProductSlice from './slices/allProductSlice';
// //
// // export const store = configureStore({
// //     reducer: {
// //         user: userSlice,
// //         cart: cartSlice,
// //         wishlist: wishlistSlice,
// //         allProducts: allProductSlice,
// //     },
// //     middleware: (getDefaultMiddleware) =>
// //         getDefaultMiddleware({
// //             serializableCheck: {
// //                 ignoredActions: [
// //                     'persist/PERSIST',
// //                     'persist/REHYDRATE',
// //                     // Add any custom actions that might have non-serializable payloads
// //                 ],
// //                 ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
// //                 ignoredPaths: ['items.dates'],
// //             },
// //         }),
// //     devTools: process.env.NODE_ENV !== 'production',
// // });
// //
// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;
// //
// // // Export action creators for easy access
// // export {
// //     loginUser,
// //     registerUser,
// //     logoutUser,
// //     fetchUserData,
// //     updateUserProfile,
// //     uploadProfilePicture,
// //     loadFromStorage,
// //     clearError as clearUserError,
// // } from './slices/userSlice';
// //
// // export {
// //     fetchCartData,
// //     addToCart,
// //     removeFromCart,
// //     updateCartItemQuantity,
// //     clearCart,
// //     increaseItemQuantity,
// //     decreaseItemQuantity,
// //     removeItemCompletelyFromCart,
// //     clearError as clearCartError,
// // } from './slices/cartSlice';
// //
// // export {
// //     fetchWishlistData,
// //     addToWishlist,
// //     removeFromWishlist,
// //     toggleWishlistItem,
// //     clearWishlist,
// //     clearError as clearWishlistError,
// // } from './slices/wishlistSlice';
// //
// // export {
// //     fetchAllProducts,
// //     fetchProductById,
// //     createProduct,
// //     updateProduct,
// //     searchProducts,
// //     setFilters,
// //     clearFilters,
// //     setCurrentProduct,
// //     clearCurrentProduct,
// //     clearError as clearProductsError,
// // } from './slices/allProductSlice';
// //
// // // Export selectors
// // export {
// //     selectWishlistItems,
// //     selectWishlistItemById,
// //     selectIsInWishlist,
// //     selectWishlistLoading,
// //     selectWishlistError,
// //     selectWishlistTotalItems,
// // } from './slices/wishlistSlice';
// //
// // export {
// //     selectAllProducts,
// //     selectFilteredProducts,
// //     selectCurrentProduct,
// //     selectProductsLoading,
// //     selectProductsError,
// //     selectProductsStatus,
// //     selectProductFilters,
// //     selectProductCategories,
// //     selectProductById,
// // } from './slices/allProductSlice';
// // store/index.tsx - Updated version
// import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './slices/userSlice';
// import cartSlice from './slices/cartSlice';
// import wishlistSlice from './slices/wishlistSlice';
// import allProductSlice from './slices/allProductSlice';
// import adminSlice from './slices/adminSlice'; // Add this import
//
// export const store = configureStore({
//     reducer: {
//         user: userSlice,
//         cart: cartSlice,
//         wishlist: wishlistSlice,
//         allProducts: allProductSlice,
//         admin: adminSlice, // Add this line
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     'persist/PERSIST',
//                     'persist/REHYDRATE',
//                     // Add any custom actions that might have non-serializable payloads
//                 ],
//                 ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
//                 ignoredPaths: ['items.dates'],
//             },
//         }),
//     devTools: process.env.NODE_ENV !== 'production',
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// // Export action creators for easy access
// export {
//     loginUser,
//     registerUser,
//     logoutUser,
//     fetchUserData,
//     updateUserProfile,
//     uploadProfilePicture,
//     loadFromStorage,
//     clearError as clearUserError,
// } from './slices/userSlice';
//
// export {
//     fetchCartData,
//     addToCart,
//     removeFromCart,
//     updateCartItemQuantity,
//     clearCart,
//     increaseItemQuantity,
//     decreaseItemQuantity,
//     removeItemCompletelyFromCart,
//     clearError as clearCartError,
// } from './slices/cartSlice';
//
// export {
//     fetchWishlistData,
//     addToWishlist,
//     removeFromWishlist,
//     toggleWishlistItem,
//     clearWishlist,
//     clearError as clearWishlistError,
// } from './slices/wishlistSlice';
//
// export {
//     fetchAllProducts,
//     fetchProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     searchProducts,
//     setFilters,
//     clearFilters,
//     setCurrentProduct,
//     clearCurrentProduct,
//     clearError as clearProductsError,
// } from './slices/allProductSlice';
//
// // Export admin actions
// export {
//     fetchAllUsers,
//     deleteUser,
//     toggleUserAdmin,
//     setActiveTab,
//     setSidebarOpen,
//     setUserSearchTerm,
//     clearUsersError,
//     updateUserInList,
//     removeUserFromList,
// } from './slices/adminSlice';
//
// // Export selectors
// export {
//     selectWishlistItems,
//     selectWishlistItemById,
//     selectIsInWishlist,
//     selectWishlistLoading,
//     selectWishlistError,
//     selectWishlistTotalItems,
// } from './slices/wishlistSlice';
//
// export {
//     selectAllProducts,
//     selectFilteredProducts,
//     selectCurrentProduct,
//     selectProductsLoading,
//     selectProductsError,
//     selectProductsStatus,
//     selectProductFilters,
//     selectProductCategories,
//     selectProductById,
// } from './slices/allProductSlice';
//
// // Export admin selectors
// export {
//     selectUsers,
//     selectFilteredUsers,
//     selectUserSearchTerm,
//     selectUsersLoading,
//     selectUsersError,
//     selectActiveTab,
//     selectSidebarOpen,
// } from './slices/adminSlice';
// store/index.tsx - Updated version with review slice
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import allProductSlice from './slices/allProductSlice';
import adminSlice from './slices/adminSlice';
import reviewSlice from './slices/reviewSlice'; // Add this import

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        allProducts: allProductSlice,
        admin: adminSlice,
        reviews: reviewSlice, // Add this line
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    // Add any custom actions that might have non-serializable payloads
                ],
                ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: ['items.dates'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export action creators for easy access
export {
    loginUser,
    registerUser,
    logoutUser,
    fetchUserData,
    updateUserProfile,
    uploadProfilePicture,
    loadFromStorage,
    clearError as clearUserError,
} from './slices/userSlice';

export {
    fetchCartData,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemCompletelyFromCart,
    clearError as clearCartError,
} from './slices/cartSlice';

export {
    fetchWishlistData,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
    clearWishlist,
    clearError as clearWishlistError,
} from './slices/wishlistSlice';

export {
    fetchAllProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    setFilters,
    clearFilters,
    setCurrentProduct,
    clearCurrentProduct,
    clearError as clearProductsError,
} from './slices/allProductSlice';

// Export admin actions
export {
    fetchAllUsers,
    deleteUser,
    toggleUserAdmin,
    setActiveTab,
    setSidebarOpen,
    setUserSearchTerm,
    clearUsersError,
    updateUserInList,
    removeUserFromList,
} from './slices/adminSlice';

// Export review actions
export {
    fetchProductReviews,
    addReview,
    updateReview,
    deleteReview,
    setShowWriteReview,
    setEditingReview,
    setShowDeleteConfirm,
    setReviewToDelete,
    updateReviewForm,
    resetReviewForm,
    setCurrentProductId,
    clearError as clearReviewsError,
    clearReviewsCache,
    removeProductReviews,
} from './slices/reviewSlice';

// Export selectors
export {
    selectWishlistItems,
    selectWishlistItemById,
    selectIsInWishlist,
    selectWishlistLoading,
    selectWishlistError,
    selectWishlistTotalItems,
} from './slices/wishlistSlice';

export {
    selectAllProducts,
    selectFilteredProducts,
    selectCurrentProduct,
    selectProductsLoading,
    selectProductsError,
    selectProductsStatus,
    selectProductFilters,
    selectProductCategories,
    selectProductById,
} from './slices/allProductSlice';

// Export admin selectors
export {
    selectUsers,
    selectFilteredUsers,
    selectUserSearchTerm,
    selectUsersLoading,
    selectUsersError,
    selectActiveTab,
    selectSidebarOpen,
} from './slices/adminSlice';

// Export review selectors
export {
    selectCurrentProductReviews,
    selectReviewStats,
    selectReviewsLoading,
    selectReviewsError,
    selectShowWriteReview,
    selectEditingReview,
    selectReviewForm,
    selectShowDeleteConfirm,
    selectReviewToDelete,
    selectAddingReview,
    selectUpdatingReview,
    selectDeletingReview,
    selectCanUserReview,
    selectReviewsByRating,
    selectUserReviews,
    selectRatingPercentages,
} from './slices/reviewSlice';