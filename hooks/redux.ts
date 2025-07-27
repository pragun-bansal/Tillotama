// // hooks/redux.ts - Updated version with testimonials support
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import { useMemo } from 'react';
// import type { RootState, AppDispatch } from '@/store';
//
// // ==================== BASE HOOKS ====================
//
// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// // ==================== CORE STATE HOOKS ====================
//
// // User/Authentication state
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
// // Cart state
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
// // Wishlist state
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
// // Products state
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
// // Admin state
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
// // Reviews state
// export const useReviewsState = () => {
//     return useAppSelector((state) => {
//         return {
//             // Reviews data
//             currentProductReviews: state.reviews.currentProductReviews,
//             currentProductId: state.reviews.currentProductId,
//             reviewStats: state.reviews.reviewStats,
//
//             // Loading states
//             loading: state.reviews.loading,
//             addingReview: state.reviews.addingReview,
//             updatingReview: state.reviews.updatingReview,
//             deletingReview: state.reviews.deletingReview,
//
//             // Error state
//             error: state.reviews.error,
//
//             // UI states
//             showWriteReview: state.reviews.showWriteReview,
//             editingReview: state.reviews.editingReview,
//             showDeleteConfirm: state.reviews.showDeleteConfirm,
//             reviewToDelete: state.reviews.reviewToDelete,
//
//             // Form state
//             reviewForm: state.reviews.reviewForm,
//         };
//     });
// };
//
// // Testimonials state
// export const useTestimonialsState = () => {
//     return useAppSelector((state) => {
//         return {
//             // Testimonials data
//             publicTestimonials: state.testimonials.publicTestimonials,
//             featuredTestimonials: state.testimonials.featuredTestimonials,
//             userTestimonials: state.testimonials.userTestimonials,
//             currentTestimonial: state.testimonials.currentTestimonial,
//
//             // Pagination
//             pagination: {
//                 currentPage: state.testimonials.currentPage,
//                 totalPages: state.testimonials.totalPages,
//                 totalCount: state.testimonials.totalCount,
//                 hasNextPage: state.testimonials.hasNextPage,
//                 hasPreviousPage: state.testimonials.hasPreviousPage,
//             },
//
//             // Loading states
//             loading: state.testimonials.loading,
//             publicLoading: state.testimonials.publicLoading,
//             userLoading: state.testimonials.userLoading,
//             creating: state.testimonials.creating,
//             updating: state.testimonials.updating,
//             deleting: state.testimonials.deleting,
//
//             // Error states
//             error: state.testimonials.error,
//             publicError: state.testimonials.publicError,
//             userError: state.testimonials.userError,
//
//             // UI states
//             showForm: state.testimonials.showForm,
//             isEditing: state.testimonials.isEditing,
//
//             // Form state
//             form: state.testimonials.form,
//         };
//     });
// };
//
// // ==================== UTILITY HOOKS ====================
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
// // Admin permission check
// export const useIsAdmin = () => {
//     return useAppSelector((state) => state.user.data?.admin || false);
// };
//
// // Review permission checks
// export const useReviewPermissions = (productId?: string) => {
//     return useAppSelector((state) => {
//         const userId = state.user.data?._id;
//         const isAuthenticated = state.user.isAuthenticated;
//         const userReviews = state.reviews.currentProductReviews.filter(
//             review => review.user?._id === userId
//         );
//
//         return {
//             isAuthenticated,
//             canReview: isAuthenticated && userId && userReviews.length === 0,
//             hasReviewed: userReviews.length > 0,
//             userReview: userReviews[0] || null,
//             canEditReview: (review: any) => userId === review.user?._id,
//             canDeleteReview: (review: any) => userId === review.user?._id || state.user.data?.admin,
//         };
//     });
// };
//
// // Testimonial permission checks
// export const useTestimonialPermissions = () => {
//     return useAppSelector((state) => {
//         const userId = state.user.data?._id;
//         const isAuthenticated = state.user.isAuthenticated;
//         const isAdmin = state.user.data?.admin;
//         const userTestimonials = state.testimonials.userTestimonials;
//
//         return {
//             isAuthenticated,
//             isAdmin,
//             canCreateTestimonial: isAuthenticated && userTestimonials.length === 0,
//             canEditTestimonial: (testimonial: any) => userId === testimonial.user?._id || isAdmin,
//             canDeleteTestimonial: (testimonial: any) => userId === testimonial.user?._id || isAdmin,
//             hasExistingTestimonial: userTestimonials.length > 0,
//             userTestimonial: userTestimonials[0] || null
//         };
//     });
// };
//
// // ==================== LOADING & ERROR STATE HOOKS ====================
//
// // Combined loading states
// export const useAppLoading = () => {
//     return useAppSelector((state) => {
//         const userLoading = state.user.isLoading;
//         const cartLoading = state.cart.loading;
//         const wishlistLoading = state.wishlist.loading;
//         const productsLoading = state.allProducts.loading;
//         const usersLoading = state.admin.usersLoading;
//         const reviewsLoading = state.reviews.loading;
//         const addingReview = state.reviews.addingReview;
//         const updatingReview = state.reviews.updatingReview;
//         const deletingReview = state.reviews.deletingReview;
//         const testimonialsLoading = state.testimonials.loading;
//         const publicTestimonialsLoading = state.testimonials.publicLoading;
//         const userTestimonialsLoading = state.testimonials.userLoading;
//         const creatingTestimonial = state.testimonials.creating;
//         const updatingTestimonial = state.testimonials.updating;
//         const deletingTestimonial = state.testimonials.deleting;
//
//         return {
//             userLoading,
//             cartLoading,
//             wishlistLoading,
//             productsLoading,
//             usersLoading,
//             reviewsLoading,
//             addingReview,
//             updatingReview,
//             deletingReview,
//             testimonialsLoading,
//             publicTestimonialsLoading,
//             userTestimonialsLoading,
//             creatingTestimonial,
//             updatingTestimonial,
//             deletingTestimonial,
//             anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading ||
//                 usersLoading || reviewsLoading || testimonialsLoading || publicTestimonialsLoading || userTestimonialsLoading,
//             anyReviewAction: addingReview || updatingReview || deletingReview,
//             anyTestimonialAction: creatingTestimonial || updatingTestimonial || deletingTestimonial,
//         };
//     });
// };
//
// // Combined error states
// export const useAppErrors = () => {
//     return useAppSelector((state) => {
//         const userError = state.user.error;
//         const cartError = state.cart.error;
//         const wishlistError = state.wishlist.error;
//         const productsError = state.allProducts.error;
//         const usersError = state.admin.usersError;
//         const reviewsError = state.reviews.error;
//         const testimonialError = state.testimonials.error;
//         const publicTestimonialError = state.testimonials.publicError;
//         const userTestimonialError = state.testimonials.userError;
//
//         return {
//             userError,
//             cartError,
//             wishlistError,
//             productsError,
//             usersError,
//             reviewsError,
//             testimonialError,
//             publicTestimonialError,
//             userTestimonialError,
//             hasAnyError: !!(userError || cartError || wishlistError || productsError ||
//                 usersError || reviewsError || testimonialError || publicTestimonialError || userTestimonialError),
//         };
//     });
// };
//
// // ==================== PRODUCT-SPECIFIC HOOKS ====================
//
// // Paginated products
// export const usePaginatedProducts = () => {
//     return useAppSelector((state) => {
//         const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         return filteredItems.slice(startIndex, endIndex);
//     });
// };
//
// // Products by category
// export const useProductsByCategory = (category: string) => {
//     return useAppSelector((state) => {
//         if (!category) return [];
//         return state.allProducts.items.filter(product =>
//             product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
//         );
//     });
// };
//
// // Featured products (high-rated)
// export const useFeaturedProducts = (limit: number = 8) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items
//             .filter(product => product.averageRating && product.averageRating >= 4)
//             .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
//             .slice(0, limit);
//     });
// };
//
// // Latest products
// export const useLatestProducts = (limit: number = 8) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items
//             .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//             .slice(0, limit);
//     });
// };
//
// // Products in price range
// export const useProductsInPriceRange = (minPrice: number, maxPrice: number) => {
//     return useAppSelector((state) => {
//         return state.allProducts.items.filter(product =>
//             product.price >= minPrice && product.price <= maxPrice
//         );
//     });
// };
//
// // Related products
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
// // ==================== REVIEW-SPECIFIC HOOKS ====================
//
// // Product reviews for specific product
// export const useProductReviews = (productId: string) => {
//     return useAppSelector((state) => {
//         const currentProductId = state.reviews.currentProductId;
//         if (currentProductId !== productId) return [];
//
//         return state.reviews.currentProductReviews;
//     });
// };
//
// // Review statistics
// export const useReviewStats = (productId?: string) => {
//     return useAppSelector((state) => {
//         if (productId && state.reviews.currentProductId !== productId) {
//             return {
//                 totalReviews: 0,
//                 averageRating: 0,
//                 ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//             };
//         }
//
//         return state.reviews.reviewStats;
//     });
// };
//
// // User review capability check
// export const useUserCanReview = (productId?: string) => {
//     return useAppSelector((state) => {
//         const userId = state.user.data?._id;
//         const isAuthenticated = state.user.isAuthenticated;
//
//         if (!isAuthenticated || !userId) return false;
//
//         // If productId is provided, check if user has reviewed this specific product
//         if (productId && state.reviews.currentProductId === productId) {
//             const userReviews = state.reviews.currentProductReviews.filter(
//                 review => review.user?._id === userId
//             );
//             return userReviews.length === 0;
//         }
//
//         return isAuthenticated;
//     });
// };
//
// // Rating percentages for distribution graph
// export const useRatingPercentages = () => {
//     return useAppSelector((state) => {
//         const stats = state.reviews.reviewStats;
//         const total = stats.totalReviews;
//
//         if (total === 0) {
//             return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//         }
//
//         return Object.keys(stats.ratingDistribution).reduce((acc, rating) => {
//             acc[rating] = Math.round((stats.ratingDistribution[rating] / total) * 100);
//             return acc;
//         }, {} as Record<string, number>);
//     });
// };
//
// // User's reviews for current product
// export const useUserReviews = () => {
//     return useAppSelector((state) => {
//         const userId = state.user.data?._id;
//         if (!userId) return [];
//
//         return state.reviews.currentProductReviews.filter(
//             review => review.user?._id === userId
//         );
//     });
// };
//
// // ==================== TESTIMONIAL-SPECIFIC HOOKS ====================
//
// // Public testimonials
// export const usePublicTestimonials = () => {
//     return useAppSelector((state) => ({
//         testimonials: state.testimonials.publicTestimonials,
//         featured: state.testimonials.featuredTestimonials,
//         loading: state.testimonials.publicLoading,
//         error: state.testimonials.publicError,
//         pagination: {
//             currentPage: state.testimonials.currentPage,
//             totalPages: state.testimonials.totalPages,
//             totalCount: state.testimonials.totalCount,
//             hasNextPage: state.testimonials.hasNextPage,
//             hasPreviousPage: state.testimonials.hasPreviousPage,
//         },
//         isEmpty: state.testimonials.publicTestimonials.length === 0,
//         hasFeatured: state.testimonials.featuredTestimonials.length > 0
//     }));
// };
//
// // User testimonials
// export const useUserTestimonials = () => {
//     return useAppSelector((state) => ({
//         testimonials: state.testimonials.userTestimonials,
//         loading: state.testimonials.userLoading,
//         error: state.testimonials.userError,
//         hasTestimonial: state.testimonials.userTestimonials.length > 0,
//         userTestimonial: state.testimonials.userTestimonials.length > 0 ? state.testimonials.userTestimonials[0] : null,
//         isEmpty: state.testimonials.userTestimonials.length === 0
//     }));
// };
//
// // Testimonial form state
// export const useTestimonialForm = () => {
//     return useAppSelector((state) => ({
//         form: state.testimonials.form,
//         showForm: state.testimonials.showForm,
//         isEditing: state.testimonials.isEditing,
//         currentTestimonial: state.testimonials.currentTestimonial,
//         creating: state.testimonials.creating,
//         updating: state.testimonials.updating,
//         isValid: state.testimonials.form.name.trim().length > 0 &&
//             state.testimonials.form.content.trim().length >= 10 &&
//             state.testimonials.form.rating >= 1 && state.testimonials.form.rating <= 5,
//         isSubmitting: state.testimonials.creating || state.testimonials.updating
//     }));
// };
//
// // ==================== SEARCH & FILTER HOOKS ====================
//
// // Search results
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
// // Product filters
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
// // Pagination state and helpers
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
// // ==================== COMPLEX OPERATION HOOKS ====================
//
// // Cart operations with computed values
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
//         const getCartSubtotal = () => {
//             return items.reduce((total, item) => {
//                 return total + (item.qty * (item.productId?.price || 0));
//             }, 0);
//         };
//
//         const getCartItemCount = () => {
//             return items.reduce((total, item) => total + item.qty, 0);
//         };
//
//         return {
//             items,
//             totalCost,
//             totalItems,
//             getItemQuantity,
//             isInCart,
//             getCartItem,
//             getCartSubtotal,
//             getCartItemCount,
//             isEmpty: items.length === 0,
//             hasItems: items.length > 0,
//         };
//     }, [items, totalCost, totalItems]);
// };
//
// // Wishlist operations with computed values
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
//         const getWishlistProducts = () => {
//             return items.map(item => item.productId).filter(Boolean);
//         };
//
//         return {
//             items,
//             totalItems,
//             isInWishlist,
//             getWishlistItem,
//             getWishlistProducts,
//             isEmpty: items.length === 0,
//             hasItems: items.length > 0,
//         };
//     }, [items, totalItems]);
// };
//
// // ==================== USER PROFILE HOOKS ====================
//
// // User profile completion and validation
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
//                 completionPercentage: 0,
//             };
//         }
//
//         const requiredFields = ['name', 'email'];
//         const optionalFields = ['lastName', 'phoneNumber', 'addressLine1', 'city'];
//         const allFields = [...requiredFields, ...optionalFields];
//
//         const missingRequired = requiredFields.filter(field => !user[field]);
//         const missingOptional = optionalFields.filter(field => !user[field]);
//         const completedFields = allFields.filter(field => user[field]);
//
//         const completionPercentage = Math.round((completedFields.length / allFields.length) * 100);
//
//         return {
//             hasProfile: true,
//             isComplete: missingRequired.length === 0,
//             user,
//             missingFields: missingRequired,
//             incompleteOptionalFields: missingOptional,
//             completionPercentage,
//             canPlaceOrder: missingRequired.length === 0,
//             profileStrength: completionPercentage >= 80 ? 'strong' : completionPercentage >= 50 ? 'medium' : 'weak',
//         };
//     }, [user, isAuthenticated]);
// };
//
// // ==================== PERFORMANCE & CACHING HOOKS ====================
//
// // App performance monitoring
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
//             cacheAge: lastFetchTime ? currentTime - lastFetchTime : 0,
//             shouldRefresh: !lastFetchTime || (currentTime - lastFetchTime) >= cacheTimeout,
//         };
//     });
// };
//
// // ==================== COMPOSITE HOOKS ====================
//
// // Complete app state summary
// export const useAppState = () => {
//     const auth = useAuth();
//     const cart = useCart();
//     const wishlist = useWishlist();
//     const products = useProducts();
//     const testimonials = useTestimonialsState();
//     const loading = useAppLoading();
//     const errors = useAppErrors();
//
//     return useMemo(() => ({
//         // User state
//         isLoggedIn: auth.isAuthenticated,
//         user: auth.user,
//         isAdmin: auth.user?.admin || false,
//
//         // Cart summary
//         cartItemCount: cart.totalItems,
//         cartTotal: cart.totalCost,
//         hasCartItems: cart.items.length > 0,
//
//         // Wishlist summary
//         wishlistItemCount: wishlist.totalItems,
//         hasWishlistItems: wishlist.items.length > 0,
//
//         // Products summary
//         totalProducts: products.totalCount,
//         hasProducts: products.items.length > 0,
//
//         // Testimonials summary
//         totalTestimonials: testimonials.pagination.totalCount,
//         hasTestimonials: testimonials.publicTestimonials.length > 0,
//         userHasTestimonial: testimonials.userTestimonials.length > 0,
//
//         // App status
//         isLoading: loading.anyLoading,
//         hasErrors: errors.hasAnyError,
//
//         // Quick checks
//         canShop: auth.isAuthenticated && products.hasProducts,
//         needsLogin: !auth.isAuthenticated,
//         hasData: products.hasProducts || cart.hasCartItems || wishlist.hasWishlistItems || testimonials.hasTestimonials,
//     }), [auth, cart, wishlist, products, testimonials, loading, errors]);
// };
//
// // Product page specific state
// export const useProductPageState = (productId: string) => {
//     const product = useProductById(productId);
//     const reviews = useProductReviews(productId);
//     const reviewStats = useReviewStats(productId);
//     const isInCart = useIsInCart(productId);
//     const isInWishlist = useIsInWishlist(productId);
//     const cartQuantity = useCartItemQuantity(productId);
//     const canReview = useUserCanReview(productId);
//     const reviewPermissions = useReviewPermissions(productId);
//
//     return useMemo(() => ({
//         // Product data
//         product,
//         hasProduct: !!product,
//
//         // Reviews data
//         reviews,
//         reviewStats,
//         hasReviews: reviews.length > 0,
//
//         // User interactions
//         isInCart,
//         isInWishlist,
//         cartQuantity,
//         canReview,
//         ...reviewPermissions,
//
//         // Quick actions available
//         canAddToCart: !!product && product.stock > 0,
//         canAddToWishlist: !!product && !isInWishlist,
//         canWriteReview: canReview,
//
//         // Product status
//         isAvailable: !!product && product.stock > 0,
//         isOutOfStock: !!product && product.stock === 0,
//         hasDiscount: !!product && product.discountPrice && product.discountPrice < product.price,
//     }), [
//         product, reviews, reviewStats, isInCart, isInWishlist,
//         cartQuantity, canReview, reviewPermissions
//     ]);
// };
//
// // Testimonials page specific state
// export const useTestimonialsPageState = () => {
//     const publicTestimonials = usePublicTestimonials();
//     const userTestimonials = useUserTestimonials();
//     const testimonialForm = useTestimonialForm();
//     const permissions = useTestimonialPermissions();
//     const loading = useAppLoading();
//
//     return useMemo(() => ({
//         // Public testimonials
//         publicTestimonials: publicTestimonials.testimonials,
//         featuredTestimonials: publicTestimonials.featured,
//         publicLoading: publicTestimonials.loading,
//         publicError: publicTestimonials.error,
//         pagination: publicTestimonials.pagination,
//
//         // User testimonials
//         userTestimonials: userTestimonials.testimonials,
//         userTestimonial: userTestimonials.userTestimonial,
//         userLoading: userTestimonials.loading,
//         userError: userTestimonials.error,
//
//         // Form state
//         form: testimonialForm.form,
//         showForm: testimonialForm.showForm,
//         isEditing: testimonialForm.isEditing,
//         isFormValid: testimonialForm.isValid,
//         isSubmitting: testimonialForm.isSubmitting,
//
//         // Permissions
//         ...permissions,
//
//         // Combined loading states
//         anyLoading: loading.anyTestimonialAction || publicTestimonials.loading || userTestimonials.loading,
//
//         // Quick checks
//         hasPublicTestimonials: publicTestimonials.testimonials.length > 0,
//         hasFeaturedTestimonials: publicTestimonials.featured.length > 0,
//         canSubmitForm: permissions.isAuthenticated && testimonialForm.isValid && !testimonialForm.isSubmitting,
//
//         // Statistics
//         totalPublicTestimonials: publicTestimonials.pagination.totalCount,
//         averageRating: publicTestimonials.testimonials.length > 0
//             ? publicTestimonials.testimonials.reduce((sum, t) => sum + t.rating, 0) / publicTestimonials.testimonials.length
//             : 0,
//     }), [
//         publicTestimonials, userTestimonials, testimonialForm, permissions, loading
//     ]);
// };


// hooks/redux.ts - Redux hooks and utilities
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';
import React from 'react';
import type { RootState, AppDispatch } from '@/store';
import type { Product } from '@/types';

// ==================== BASE HOOKS ====================

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ==================== AUTHENTICATION HOOKS ====================

export const useAuth = () => {
    const user = useAppSelector((state) => state.user.data);
    const token = useAppSelector((state) => state.user.token);
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const isInitialized = useAppSelector((state) => state.user.isInitialized);
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const error = useAppSelector((state) => state.user.error);
    const status = useAppSelector((state) => state.user.status);
    
    return useMemo(() => ({
        user,
        token,
        isAuthenticated,
        isInitialized,
        isLoading,
        error,
        status,
        isAdmin: user?.admin || false,
    }), [user, token, isAuthenticated, isInitialized, isLoading, error, status]);
};

export const useIsAuthenticated = () => {
    return useAppSelector((state) => state.user.isAuthenticated);
};

export const useIsAdmin = () => {
    return useAppSelector((state) => state.user.data?.admin || false);
};

export const useCurrentUser = () => {
    return useAppSelector((state) => state.user.data);
};

// ==================== CART HOOKS ====================

export const useCart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const totalCost = useAppSelector((state) => state.cart.totalCost);
    const totalItems = useAppSelector((state) => state.cart.totalItems);
    const cartId = useAppSelector((state) => state.cart._id);
    const loading = useAppSelector((state) => state.cart.loading);
    const error = useAppSelector((state) => state.cart.error);
    const status = useAppSelector((state) => state.cart.status);
    const changed = useAppSelector((state) => state.cart.changed);
    
    return useMemo(() => ({
        items,
        totalCost,
        totalItems,
        cartId,
        loading,
        error,
        status,
        changed,
        isEmpty: items.length === 0,
        hasItems: items.length > 0,
    }), [items, totalCost, totalItems, cartId, loading, error, status, changed]);
};

export const useIsInCart = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return false;
        return state.cart.items.some((item: any) =>
            item.productId?._id === productId || item.productId === productId
        );
    });
};

export const useCartItemQuantity = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return 0;
        const item = state.cart.items.find((item: any) =>
            item.productId?._id === productId || item.productId === productId
        );
        return (item as any)?.qty || 0;
    });
};

export const useCartItem = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return null;
        return state.cart.items.find((item: any) =>
            item.productId?._id === productId || item.productId === productId
        ) || null;
    });
};

// ==================== WISHLIST HOOKS ====================

export const useWishlist = () => {
    const items = useAppSelector((state) => state.wishlist.items);
    const totalItems = useAppSelector((state) => state.wishlist.totalItems);
    const wishlistId = useAppSelector((state) => state.wishlist._id);
    const loading = useAppSelector((state) => state.wishlist.loading);
    const error = useAppSelector((state) => state.wishlist.error);
    const status = useAppSelector((state) => state.wishlist.status);
    
    return useMemo(() => ({
        items,
        totalItems,
        wishlistId,
        loading,
        error,
        status,
        isEmpty: items.length === 0,
        hasItems: items.length > 0,
    }), [items, totalItems, wishlistId, loading, error, status]);
};

export const useIsInWishlist = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return false;
        return state.wishlist.items.some((item: any) =>
            item.productId?._id === productId || item.productId === productId
        );
    });
};

export const useWishlistItem = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return null;
        return state.wishlist.items.find((item: any) =>
            item.productId?._id === productId || item.productId === productId
        ) || null;
    });
};

// ==================== PRODUCT HOOKS ====================

export const useProducts = () => {
    return useAppSelector((state) => ({
        items: state.allProducts.items,
        filteredItems: state.allProducts.filteredItems,
        currentProduct: state.allProducts.currentProduct,
        totalCount: state.allProducts.totalCount,
        categories: state.allProducts.categories,
        brands: state.allProducts.brands,
        filters: state.allProducts.filters,
        loading: state.allProducts.loading,
        error: state.allProducts.error,
        status: state.allProducts.status,
        currentPage: state.allProducts.currentPage,
        totalPages: state.allProducts.totalPages,
        isEmpty: state.allProducts.items.length === 0,
        hasProducts: state.allProducts.items.length > 0,
    }));
};

export const useProductById = (productId: string) => {
    return useAppSelector((state) => {
        if (!productId) return null;
        return state.allProducts.items.find(product => product._id === productId) || null;
    });
};

export const useProductFilters = () => {
    const filters = useAppSelector((state) => state.allProducts.filters);
    
    return useMemo(() => ({
        filters,
        hasActiveFilters: !!(
            filters.search?.length > 0 ||
            filters.category?.length > 0 ||
            filters.priceRange[0] > 0 ||
            filters.priceRange[1] < 10000 ||
            filters.inStock ||
            filters.minRating > 0
        ),
    }), [filters]);
};

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
            product.category?.some(cat => cat.toLowerCase() === category.toLowerCase())
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

export const useRelatedProducts = (currentProductId: string, limit: number = 4) => {
    return useAppSelector((state) => {
        if (!currentProductId) return [];

        const currentProduct = state.allProducts.items.find(p => p._id === currentProductId);
        if (!currentProduct) return [];

        return state.allProducts.items
            .filter(product =>
                product._id !== currentProductId &&
                product.category?.some(cat => currentProduct.category?.includes(cat))
            )
            .slice(0, limit);
    });
};

// ==================== ORDER HOOKS ====================

export const useOrders = () => {
    return useAppSelector((state) => ({
        orders: state.orders.orders,
        filteredOrders: state.orders.filteredOrders,
        currentOrder: state.orders.currentOrder,
        orderStats: state.orders.orderStats,
        filters: state.orders.filters,
        expandedOrders: state.orders.expandedOrders,
        editingOrder: state.orders.editingOrder,
        showAddForm: state.orders.showAddForm,
        loading: state.orders.loading,
        ordersLoading: state.orders.ordersLoading,
        trackingLoading: state.orders.trackingLoading,
        statsLoading: state.orders.statsLoading,
        creating: state.orders.creating,
        updating: state.orders.updating,
        deleting: state.orders.deleting,
        error: state.orders.error,
        trackingError: state.orders.trackingError,
        currentPage: state.orders.currentPage,
        itemsPerPage: state.orders.itemsPerPage,
        totalPages: state.orders.totalPages,
        totalCount: state.orders.totalCount,
        isEmpty: state.orders.orders.length === 0,
        hasOrders: state.orders.orders.length > 0,
    }));
};

export const useOrderStats = () => {
    return useAppSelector((state) => ({
        stats: state.orders.orderStats,
        loading: state.orders.statsLoading,
        error: state.orders.error,
        isEmpty: state.orders.orderStats.totalOrders === 0,
    }));
};

export const useOrderById = (orderId: string) => {
    return useAppSelector((state) => {
        if (!orderId) return null;
        return state.orders.orders.find((order: any) => order._id === orderId) || null;
    });
};

export const useOrdersByStatus = (status: string) => {
    return useAppSelector((state) => {
        return state.orders.orders.filter((order: any) => order.status === status);
    });
};

export const useOrdersByCourier = (courierService: string) => {
    return useAppSelector((state) => {
        return state.orders.orders.filter((order: any) => order.courier_service === courierService);
    });
};

export const useTrackonOrders = () => {
    return useAppSelector((state) => {
        return state.orders.orders.filter((order: any) => order.courier_service === 'trackon');
    });
};

export const useShreeTirupatiOrders = () => {
    return useAppSelector((state) => {
        return state.orders.orders.filter((order: any) => order.courier_service === 'shree_tirupati');
    });
};

export const useOrdersRequiringTracking = () => {
    return useAppSelector((state) => {
        return state.orders.orders.filter((order: any) =>
            order.courier_service === 'trackon' &&
            ['pending', 'tracking'].includes(order.status)
        );
    });
};

export const usePaginatedOrders = () => {
    return useAppSelector((state) => {
        const { filteredOrders, currentPage, itemsPerPage } = state.orders;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredOrders.slice(startIndex, endIndex);
    });
};

export const useOrderFilters = () => {
    const filters = useAppSelector((state) => state.orders.filters);
    
    return useMemo(() => ({
        filters,
        hasActiveFilters: !!(
            filters.status ||
            filters.courier_service ||
            filters.search ||
            filters.priority ||
            filters.dateFrom ||
            filters.dateTo
        ),
    }), [filters]);
};

// ==================== REVIEW HOOKS ====================

export const useReviews = () => {
    return useAppSelector((state) => ({
        currentProductReviews: state.reviews.currentProductReviews,
        currentProductId: state.reviews.currentProductId,
        reviewStats: state.reviews.reviewStats,
        loading: state.reviews.loading,
        addingReview: state.reviews.addingReview,
        updatingReview: state.reviews.updatingReview,
        deletingReview: state.reviews.deletingReview,
        error: state.reviews.error,
        showWriteReview: state.reviews.showWriteReview,
        editingReview: state.reviews.editingReview,
        showDeleteConfirm: state.reviews.showDeleteConfirm,
        reviewToDelete: state.reviews.reviewToDelete,
        reviewForm: state.reviews.reviewForm,
    }));
};

export const useProductReviews = (productId: string) => {
    return useAppSelector((state) => {
        const currentProductId = state.reviews.currentProductId;
        if (currentProductId !== productId) return [];
        return state.reviews.currentProductReviews;
    });
};

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

export const useUserCanReview = (productId?: string) => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        const isAuthenticated = state.user.isAuthenticated;

        if (!isAuthenticated || !userId) return false;

        if (productId && state.reviews.currentProductId === productId) {
            const userReviews = state.reviews.currentProductReviews.filter(
                (review: any) => review.user?._id === userId
            );
            return userReviews.length === 0;
        }

        return isAuthenticated;
    });
};

export const useUserReviews = () => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        if (!userId) return [];

        return state.reviews.currentProductReviews.filter(
            (review: any) => review.user?._id === userId
        );
    });
};

export const useRatingPercentages = () => {
    return useAppSelector((state) => {
        const stats = state.reviews.reviewStats;
        const total = stats.totalReviews;

        if (total === 0) {
            return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        }

        return Object.keys(stats.ratingDistribution).reduce((acc, rating) => {
            acc[rating] = Math.round(((stats.ratingDistribution as any)[rating] / total) * 100);
            return acc;
        }, {} as Record<string, number>);
    });
};

// ==================== TESTIMONIAL HOOKS ====================

export const useTestimonials = () => {
    return useAppSelector((state) => ({
        publicTestimonials: state.testimonials.publicTestimonials,
        featuredTestimonials: state.testimonials.featuredTestimonials,
        userTestimonials: state.testimonials.userTestimonials,
        currentTestimonial: state.testimonials.currentTestimonial,
        currentPage: state.testimonials.currentPage,
        totalPages: state.testimonials.totalPages,
        totalCount: state.testimonials.totalCount,
        hasNextPage: state.testimonials.hasNextPage,
        hasPreviousPage: state.testimonials.hasPreviousPage,
        loading: state.testimonials.loading,
        publicLoading: state.testimonials.publicLoading,
        userLoading: state.testimonials.userLoading,
        creating: state.testimonials.creating,
        updating: state.testimonials.updating,
        deleting: state.testimonials.deleting,
        error: state.testimonials.error,
        publicError: state.testimonials.publicError,
        userError: state.testimonials.userError,
        showForm: state.testimonials.showForm,
        isEditing: state.testimonials.isEditing,
        form: state.testimonials.form,
    }));
};

export const usePublicTestimonials = () => {
    return useAppSelector((state) => ({
        testimonials: state.testimonials.publicTestimonials,
        featured: state.testimonials.featuredTestimonials,
        loading: state.testimonials.publicLoading,
        error: state.testimonials.publicError,
        pagination: {
            currentPage: state.testimonials.currentPage,
            totalPages: state.testimonials.totalPages,
            totalCount: state.testimonials.totalCount,
            hasNextPage: state.testimonials.hasNextPage,
            hasPreviousPage: state.testimonials.hasPreviousPage,
        },
        isEmpty: state.testimonials.publicTestimonials.length === 0,
        hasFeatured: state.testimonials.featuredTestimonials.length > 0
    }));
};

export const useUserTestimonials = () => {
    return useAppSelector((state) => ({
        testimonials: state.testimonials.userTestimonials,
        loading: state.testimonials.userLoading,
        error: state.testimonials.userError,
        hasTestimonial: state.testimonials.userTestimonials.length > 0,
        userTestimonial: state.testimonials.userTestimonials.length > 0 ? state.testimonials.userTestimonials[0] : null,
        isEmpty: state.testimonials.userTestimonials.length === 0
    }));
};

export const useTestimonialForm = () => {
    return useAppSelector((state) => ({
        form: state.testimonials.form,
        showForm: state.testimonials.showForm,
        isEditing: state.testimonials.isEditing,
        currentTestimonial: state.testimonials.currentTestimonial,
        creating: state.testimonials.creating,
        updating: state.testimonials.updating,
        isValid: state.testimonials.form.name.trim().length > 0 &&
            state.testimonials.form.content.trim().length >= 10 &&
            state.testimonials.form.rating >= 1 && state.testimonials.form.rating <= 5,
        isSubmitting: state.testimonials.creating || state.testimonials.updating
    }));
};

// ==================== ADMIN HOOKS ====================

export const useAdmin = () => {
    return useAppSelector((state) => ({
        users: state.admin.users,
        filteredUsers: state.admin.filteredUsers,
        userSearchTerm: state.admin.userSearchTerm,
        usersLoading: state.admin.usersLoading,
        usersError: state.admin.usersError,
        activeTab: state.admin.activeTab,
        sidebarOpen: state.admin.sidebarOpen,
    }));
};

// ==================== PERMISSION HOOKS ====================

export const usePermissions = () => {
    const user = useCurrentUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useIsAdmin();

    return useMemo(() => ({
        // User permissions
        isAuthenticated,
        isAdmin,
        canCreateContent: isAuthenticated,
        canEditOwnContent: isAuthenticated,
        canDeleteOwnContent: isAuthenticated,
        canModerateContent: isAdmin,

        // Order permissions
        canCreateOrder: isAuthenticated,
        canEditOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canDeleteOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canTrackOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canViewOrder: (order: any) => user?._id === order.user?._id || isAdmin,

        // Review permissions
        canReview: isAuthenticated,
        canEditReview: (review: any) => user?._id === review.user?._id || isAdmin,
        canDeleteReview: (review: any) => user?._id === review.user?._id || isAdmin,

        // Testimonial permissions
        canCreateTestimonial: isAuthenticated,
        canEditTestimonial: (testimonial: any) => user?._id === testimonial.user?._id || isAdmin,
        canDeleteTestimonial: (testimonial: any) => user?._id === testimonial.user?._id || isAdmin,

        // Admin permissions
        canManageUsers: isAdmin,
        canManageProducts: isAdmin,
        canViewAnalytics: isAdmin,
        canModerateReviews: isAdmin,
        canModerateTestimonials: isAdmin,
    }), [user, isAuthenticated, isAdmin]);
};

export const useOrderPermissions = () => {
    const user = useCurrentUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useIsAdmin();

    return useMemo(() => ({
        isAuthenticated,
        isAdmin,
        canCreateOrder: isAuthenticated,
        canEditOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canDeleteOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canTrackOrder: (order: any) => user?._id === order.user?._id || isAdmin,
        canViewOrder: (order: any) => user?._id === order.user?._id || isAdmin,
    }), [user, isAuthenticated, isAdmin]);
};

export const useReviewPermissions = (productId?: string) => {
    const user = useCurrentUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useIsAdmin();
    const userReviews = useUserReviews();

    return useMemo(() => ({
        isAuthenticated,
        isAdmin,
        canReview: isAuthenticated && userReviews.length === 0,
        hasReviewed: userReviews.length > 0,
        userReview: userReviews[0] || null,
        canEditReview: (review: any) => user?._id === review.user?._id || isAdmin,
        canDeleteReview: (review: any) => user?._id === review.user?._id || isAdmin,
    }), [user, isAuthenticated, isAdmin, userReviews]);
};

export const useTestimonialPermissions = () => {
    const user = useCurrentUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useIsAdmin();
    const userTestimonials = useUserTestimonials();

    return useMemo(() => ({
        isAuthenticated,
        isAdmin,
        canCreateTestimonial: isAuthenticated && !userTestimonials.hasTestimonial,
        canEditTestimonial: (testimonial: any) => user?._id === testimonial.user?._id || isAdmin,
        canDeleteTestimonial: (testimonial: any) => user?._id === testimonial.user?._id || isAdmin,
        hasExistingTestimonial: userTestimonials.hasTestimonial,
        userTestimonial: userTestimonials.userTestimonial,
    }), [user, isAuthenticated, isAdmin, userTestimonials]);
};

// ==================== LOADING STATE HOOKS ====================

export const useLoadingStates = () => {
    return useAppSelector((state) => {
        const userLoading = state.user.isLoading;
        const cartLoading = state.cart.loading;
        const wishlistLoading = state.wishlist.loading;
        const productsLoading = state.allProducts.loading;
        const ordersLoading = state.orders.ordersLoading;
        const trackingLoading = state.orders.trackingLoading;
        const reviewsLoading = state.reviews.loading;
        const testimonialsLoading = state.testimonials.loading;
        const adminLoading = state.admin.usersLoading;

        return {
            userLoading,
            cartLoading,
            wishlistLoading,
            productsLoading,
            ordersLoading,
            trackingLoading,
            reviewsLoading,
            testimonialsLoading,
            adminLoading,
            anyLoading: userLoading || cartLoading || wishlistLoading || productsLoading ||
                ordersLoading || trackingLoading || reviewsLoading || testimonialsLoading || adminLoading,
            anyOrderAction: state.orders.creating || state.orders.updating || state.orders.deleting || trackingLoading,
            anyReviewAction: state.reviews.addingReview || state.reviews.updatingReview || state.reviews.deletingReview,
            anyTestimonialAction: state.testimonials.creating || state.testimonials.updating || state.testimonials.deleting,
        };
    });
};

export const useErrorStates = () => {
    return useAppSelector((state) => {
        const userError = state.user.error;
        const cartError = state.cart.error;
        const wishlistError = state.wishlist.error;
        const productsError = state.allProducts.error;
        const ordersError = state.orders.error;
        const trackingError = state.orders.trackingError;
        const reviewsError = state.reviews.error;
        const testimonialError = state.testimonials.error;
        const adminError = state.admin.usersError;

        return {
            userError,
            cartError,
            wishlistError,
            productsError,
            ordersError,
            trackingError,
            reviewsError,
            testimonialError,
            adminError,
            hasAnyError: !!(userError || cartError || wishlistError || productsError ||
                ordersError || trackingError || reviewsError || testimonialError || adminError),
        };
    });
};

// ==================== UTILITY HOOKS ====================

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

        const missingRequired = requiredFields.filter(field => !(user as any)[field]);
        const missingOptional = optionalFields.filter(field => !(user as any)[field]);
        const completedFields = allFields.filter(field => (user as any)[field]);

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

export const useCartOperations = () => {
    const { items, totalCost, totalItems } = useCart();

    return useMemo(() => ({
        items,
        totalCost,
        totalItems,
        isEmpty: items.length === 0,
        hasItems: items.length > 0,
        getItemQuantity: (productId: string) => {
            const item = items.find((item: any) =>
                item.productId?._id === productId || item.productId === productId
            );
            return (item as any)?.qty || 0;
        },
        isInCart: (productId: string) => {
            return items.some((item: any) =>
                item.productId?._id === productId || item.productId === productId
            );
        },
        getCartItem: (productId: string) => {
            return items.find((item: any) =>
                item.productId?._id === productId || item.productId === productId
            ) || null;
        },
        getCartSubtotal: () => {
            return items.reduce((total, item: any) => {
                return total + (item.qty * (item.productId?.price || 0));
            }, 0);
        },
        getCartItemCount: () => {
            return items.reduce((total, item: any) => total + item.qty, 0);
        },
    }), [items, totalCost, totalItems]);
};

export const useWishlistOperations = () => {
    const { items, totalItems } = useWishlist();

    return useMemo(() => ({
        items,
        totalItems,
        isEmpty: items.length === 0,
        hasItems: items.length > 0,
        isInWishlist: (productId: string) => {
            return items.some((item: any) =>
                item.productId?._id === productId || item.productId === productId
            );
        },
        getWishlistItem: (productId: string) => {
            return items.find((item: any) =>
                item.productId?._id === productId || item.productId === productId
            ) || null;
        },
        getWishlistProducts: () => {
            return items.map((item: any) => item.productId).filter(Boolean);
        },
    }), [items, totalItems]);
};

// ==================== PAGINATION HOOKS ====================

export const usePagination = (namespace: 'products' | 'orders' | 'testimonials' = 'products') => {
    return useAppSelector((state) => {
        let paginationState;

        switch (namespace) {
            case 'orders':
                paginationState = {
                    currentPage: state.orders.currentPage,
                    totalPages: state.orders.totalPages,
                    itemsPerPage: state.orders.itemsPerPage,
                    totalCount: state.orders.totalCount,
                    totalItems: state.orders.filteredOrders.length,
                };
                break;
            case 'testimonials':
                paginationState = {
                    currentPage: state.testimonials.currentPage,
                    totalPages: state.testimonials.totalPages,
                    itemsPerPage: 10, // Default for testimonials
                    totalCount: state.testimonials.totalCount,
                    totalItems: state.testimonials.publicTestimonials.length,
                };
                break;
            default:
                paginationState = {
                    currentPage: state.allProducts.currentPage,
                    totalPages: state.allProducts.totalPages,
                    itemsPerPage: state.allProducts.itemsPerPage,
                    totalCount: state.allProducts.totalCount,
                    totalItems: state.allProducts.filteredItems.length,
                };
        }

        return {
            ...paginationState,
            hasNextPage: paginationState.currentPage < paginationState.totalPages,
            hasPreviousPage: paginationState.currentPage > 1,
            startIndex: (paginationState.currentPage - 1) * paginationState.itemsPerPage,
            endIndex: Math.min(paginationState.currentPage * paginationState.itemsPerPage, paginationState.totalItems),
        };
    });
};

// ==================== COMPOSITE HOOKS ====================

export const useAppState = () => {
    const auth = useAuth();
    const cart = useCart();
    const wishlist = useWishlist();
    const products = useProducts();
    const orders = useOrders();
    const testimonials = useTestimonials();
    const loading = useLoadingStates();
    const errors = useErrorStates();

    return useMemo(() => ({
        // User state
        isLoggedIn: auth.isAuthenticated,
        user: auth.user,
        isAdmin: auth.isAdmin,

        // Cart summary
        cartItemCount: cart.totalItems,
        cartTotal: cart.totalCost,
        hasCartItems: cart.hasItems,

        // Wishlist summary
        wishlistItemCount: wishlist.totalItems,
        hasWishlistItems: wishlist.hasItems,

        // Products summary
        totalProducts: products.totalCount,
        hasProducts: products.hasProducts,

        // Orders summary
        totalOrders: orders.orderStats.totalOrders,
        pendingOrders: orders.orderStats.pendingOrders,
        hasOrders: orders.hasOrders,

        // Testimonials summary
        totalTestimonials: testimonials.totalCount,
        hasTestimonials: testimonials.publicTestimonials.length > 0,
        userHasTestimonial: testimonials.userTestimonials.length > 0,

        // App status
        isLoading: loading.anyLoading,
        hasErrors: errors.hasAnyError,

        // Quick checks
        canShop: auth.isAuthenticated && products.hasProducts,
        needsLogin: !auth.isAuthenticated,
        hasData: products.hasProducts || cart.hasItems || wishlist.hasItems || orders.hasOrders,
    }), [auth, cart, wishlist, products, orders, testimonials, loading, errors]);
};

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
        ...reviewPermissions,

        // Quick actions available
        canAddToCart: !!product && product.stock > 0,
        canAddToWishlist: !!product && !isInWishlist,
        canWriteReview: canReview,

        // Product status
        isAvailable: !!product && product.stock > 0,
        isOutOfStock: !!product && product.stock === 0,
        hasDiscount: !!product && (product as any).discountPrice && (product as any).discountPrice < product.price,
    }), [
        product, reviews, reviewStats, isInCart, isInWishlist,
        cartQuantity, canReview, reviewPermissions
    ]);
};

export const useOrdersPageState = () => {
    const orders = useOrders();
    const permissions = useOrderPermissions();
    const loading = useLoadingStates();
    const errors = useErrorStates();

    return useMemo(() => ({
        // Orders data
        orders: orders.orders,
        filteredOrders: orders.filteredOrders,
        orderStats: orders.orderStats,
        filters: orders.filters,

        // UI state
        expandedOrders: orders.expandedOrders,
        editingOrder: orders.editingOrder,
        showAddForm: orders.showAddForm,

        // Loading states
        ordersLoading: orders.ordersLoading,
        trackingLoading: orders.trackingLoading,
        statsLoading: orders.statsLoading,
        creating: orders.creating,
        updating: orders.updating,
        deleting: orders.deleting,

        // Error states
        ordersError: orders.error,
        trackingError: orders.trackingError,

        // Pagination
        currentPage: orders.currentPage,
        totalPages: orders.totalPages,
        totalCount: orders.totalCount,

        // Permissions
        ...permissions,

        // Combined loading states
        anyLoading: loading.anyOrderAction || orders.ordersLoading || orders.statsLoading,

        // Quick checks
        hasOrders: orders.hasOrders,
        hasActiveFilters: !!(orders.filters.status || orders.filters.courier_service ||
            orders.filters.search || orders.filters.priority),
        canSubmitForm: permissions.isAuthenticated,
        hasErrors: !!(errors.ordersError || errors.trackingError),

        // Statistics
        totalOrders: orders.orderStats.totalOrders,
        pendingCount: orders.orderStats.pendingOrders,
        trackingCount: orders.orderStats.trackingOrders,
        deliveredCount: orders.orderStats.deliveredOrders,
        errorCount: orders.orderStats.errorOrders,
        trackonCount: orders.orderStats.trackonOrders,
        shreeTirupatiCount: orders.orderStats.shreeTirupatiOrders,
    }), [orders, permissions, loading, errors]);
};

export const useTestimonialsPageState = () => {
    const publicTestimonials = usePublicTestimonials();
    const userTestimonials = useUserTestimonials();
    const testimonialForm = useTestimonialForm();
    const permissions = useTestimonialPermissions();
    const loading = useLoadingStates();

    return useMemo(() => ({
        // Public testimonials
        publicTestimonials: publicTestimonials.testimonials,
        featuredTestimonials: publicTestimonials.featured,
        publicLoading: publicTestimonials.loading,
        publicError: publicTestimonials.error,
        pagination: publicTestimonials.pagination,

        // User testimonials
        userTestimonials: userTestimonials.testimonials,
        userLoading: userTestimonials.loading,
        userError: userTestimonials.error,

        // Form state
        form: testimonialForm.form,
        showForm: testimonialForm.showForm,
        isEditing: testimonialForm.isEditing,
        isFormValid: testimonialForm.isValid,
        isSubmitting: testimonialForm.isSubmitting,

        // Permissions
        ...permissions,

        // Combined loading states
        anyLoading: loading.anyTestimonialAction || publicTestimonials.loading || userTestimonials.loading,

        // Quick checks
        hasPublicTestimonials: publicTestimonials.testimonials.length > 0,
        hasFeaturedTestimonials: publicTestimonials.featured.length > 0,
        canSubmitForm: permissions.isAuthenticated && testimonialForm.isValid && !testimonialForm.isSubmitting,

        // Statistics
        totalPublicTestimonials: publicTestimonials.pagination.totalCount,
        averageRating: publicTestimonials.testimonials.length > 0
            ? publicTestimonials.testimonials.reduce((sum, t: any) => sum + t.rating, 0) / publicTestimonials.testimonials.length
            : 0,
    }), [
        publicTestimonials, userTestimonials, testimonialForm, permissions, loading
    ]);
};

export const useCartPageState = () => {
    const cart = useCart();
    const cartOps = useCartOperations();
    const auth = useAuth();
    const userProfile = useUserProfile();

    return useMemo(() => ({
        // Cart data
        loading: cart.loading,
        error: cart.error,

        // Cart operations
        ...cartOps,

        // User state
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        canCheckout: auth.isAuthenticated && userProfile.canPlaceOrder && cart.hasItems,

        // Profile completeness
        profileComplete: userProfile.isComplete,
        missingFields: userProfile.missingFields,

        // Quick checks
        isEmpty: cart.isEmpty,
        hasItems: cart.hasItems,
        needsLogin: !auth.isAuthenticated,
        needsProfileCompletion: auth.isAuthenticated && !userProfile.isComplete,
    }), [cart, cartOps, auth, userProfile]);
};

export const useWishlistPageState = () => {
    const wishlist = useWishlist();
    const wishlistOps = useWishlistOperations();
    const auth = useAuth();

    return useMemo(() => ({
        // Wishlist data
        loading: wishlist.loading,
        error: wishlist.error,

        // Wishlist operations
        ...wishlistOps,

        // User state
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,

        // Quick checks
        isEmpty: wishlist.isEmpty,
        hasItems: wishlist.hasItems,
        needsLogin: !auth.isAuthenticated,
    }), [wishlist, wishlistOps, auth]);
};

export const useProductsPageState = () => {
    const products = useProducts();
    const filters = useProductFilters();
    const pagination = usePagination('products');

    return useMemo(() => ({
        // Products data
        products: products.items,
        filteredProducts: products.filteredItems,
        currentProduct: products.currentProduct,
        categories: products.categories,
        brands: products.brands,
        loading: products.loading,
        error: products.error,

        // Filters
        filters: filters.filters,
        hasActiveFilters: filters.hasActiveFilters,

        // Pagination
        ...pagination,

        // Quick checks
        hasProducts: products.hasProducts,
        isEmpty: products.isEmpty,
        hasResults: products.filteredItems.length > 0,
    }), [products, filters, pagination]);
};

// ==================== SEARCH & FILTER HOOKS ====================

export const useSearchResults = () => {
    return useAppSelector((state) => ({
        results: state.allProducts.searchResults,
        query: state.allProducts.lastSearchQuery,
        hasResults: state.allProducts.searchResults.length > 0,
        isEmpty: state.allProducts.searchResults.length === 0,
    }));
};

export const useActiveFilters = (namespace: 'products' | 'orders' = 'products') => {
    return useAppSelector((state) => {
        switch (namespace) {
            case 'orders':
                const orderFilters = state.orders.filters;
                return {
                    hasActive: !!(orderFilters.status || orderFilters.courier_service ||
                        orderFilters.search || orderFilters.priority ||
                        orderFilters.dateFrom || orderFilters.dateTo),
                    count: [
                        orderFilters.status,
                        orderFilters.courier_service,
                        orderFilters.search,
                        orderFilters.priority,
                        orderFilters.dateFrom,
                        orderFilters.dateTo
                    ].filter(Boolean).length,
                    filters: orderFilters,
                };
            default:
                const productFilters = state.allProducts.filters;
                return {
                    hasActive: !!(productFilters.search || productFilters.category ||
                        productFilters.priceRange[0] > 0 ||
                        productFilters.priceRange[1] < 10000 ||
                        productFilters.inStock || productFilters.minRating > 0),
                    count: [
                        productFilters.search,
                        productFilters.category,
                        productFilters.priceRange[0] > 0 ? 'minPrice' : null,
                        productFilters.priceRange[1] < 10000 ? 'maxPrice' : null,
                        productFilters.inStock ? 'inStock' : null,
                        productFilters.minRating > 0 ? 'minRating' : null
                    ].filter(Boolean).length,
                    filters: productFilters,
                };
        }
    });
};

// ==================== PERFORMANCE & CACHE HOOKS ====================

export const useAppPerformance = () => {
    return useAppSelector((state) => {
        const productsCacheTime = state.allProducts.lastFetchTime;
        const productsCacheTimeout = state.allProducts.cacheTimeout;
        const ordersCacheTime = state.orders.lastFetchTime;
        const ordersCacheTimeout = state.orders.cacheTimeout;
        const currentTime = Date.now();

        return {
            products: {
                isCacheValid: productsCacheTime && (currentTime - productsCacheTime) < productsCacheTimeout,
                lastFetchTime: productsCacheTime,
                cacheTimeout: productsCacheTimeout,
                timeUntilExpiry: productsCacheTime ? Math.max(0, productsCacheTimeout - (currentTime - productsCacheTime)) : 0,
                cacheAge: productsCacheTime ? currentTime - productsCacheTime : 0,
                shouldRefresh: !productsCacheTime || (currentTime - productsCacheTime) >= productsCacheTimeout,
            },
            orders: {
                isCacheValid: ordersCacheTime && (currentTime - ordersCacheTime) < ordersCacheTimeout,
                lastFetchTime: ordersCacheTime,
                cacheTimeout: ordersCacheTimeout,
                timeUntilExpiry: ordersCacheTime ? Math.max(0, ordersCacheTimeout - (currentTime - ordersCacheTime)) : 0,
                cacheAge: ordersCacheTime ? currentTime - ordersCacheTime : 0,
                shouldRefresh: !ordersCacheTime || (currentTime - ordersCacheTime) >= ordersCacheTimeout,
            },
        };
    });
};

// ==================== QUICK ACCESS HOOKS ====================

export const useQuickStats = () => {
    return useAppSelector((state) => ({
        // User stats
        isLoggedIn: state.user.isAuthenticated,
        isAdmin: state.user.data?.admin || false,

        // Cart stats
        cartItems: state.cart.totalItems,
        cartValue: state.cart.totalCost,

        // Wishlist stats
        wishlistItems: state.wishlist.totalItems,

        // Product stats
        totalProducts: state.allProducts.totalCount,
        productCategories: state.allProducts.categories.length,

        // Order stats
        totalOrders: state.orders.orderStats.totalOrders,
        pendingOrders: state.orders.orderStats.pendingOrders,
        deliveredOrders: state.orders.orderStats.deliveredOrders,

        // Review stats
        currentProductReviews: state.reviews.reviewStats.totalReviews,
        currentProductRating: state.reviews.reviewStats.averageRating,

        // Testimonial stats
        publicTestimonials: state.testimonials.totalCount,
        userHasTestimonial: state.testimonials.userTestimonials.length > 0,

        // Loading states
        anyLoading: state.user.isLoading || state.cart.loading || state.wishlist.loading ||
            state.allProducts.loading || state.orders.ordersLoading ||
            state.reviews.loading || state.testimonials.loading,

        // Error states
        hasErrors: !!(state.user.error || state.cart.error || state.wishlist.error ||
            state.allProducts.error || state.orders.error ||
            state.reviews.error || state.testimonials.error),
    }));
};

export const useNotificationCounts = () => {
    return useAppSelector((state) => ({
        // Cart notifications
        cartItemCount: state.cart.totalItems,
        newCartItems: 0, // Could be implemented with timestamps

        // Wishlist notifications
        wishlistItemCount: state.wishlist.totalItems,

        // Order notifications
        pendingOrders: state.orders.orderStats.pendingOrders,
        trackingOrders: state.orders.orderStats.trackingOrders,
        deliveredOrders: state.orders.orderStats.deliveredOrders,
        errorOrders: state.orders.orderStats.errorOrders,

        // Admin notifications (only for admins)
        newReviews: 0, // Could be implemented
        newTestimonials: 0, // Could be implemented
        totalUsers: state.admin.users.length,

        // Error notifications
        hasUserErrors: !!state.user.error,
        hasCartErrors: !!state.cart.error,
        hasOrderErrors: !!(state.orders.error || state.orders.trackingError),
        hasGeneralErrors: !!(state.allProducts.error || state.reviews.error || state.testimonials.error),

        // Total notification count
        total: state.cart.totalItems + state.orders.orderStats.pendingOrders + state.orders.orderStats.errorOrders,
    }));
};

// ==================== SPECIALIZED UTILITY HOOKS ====================

export const useEntityPermissions = (entityType: 'order' | 'review' | 'testimonial', entity: any) => {
    const user = useCurrentUser();
    const isAuthenticated = useIsAuthenticated();
    const isAdmin = useIsAdmin();

    return useMemo(() => {
        if (!entity) {
            return {
                canView: false,
                canEdit: false,
                canDelete: false,
                canCreate: isAuthenticated,
                isOwner: false,
            };
        }

        const isOwner = user?._id === entity.user?._id || user?._id === entity.userId;

        return {
            canView: isOwner || isAdmin,
            canEdit: isOwner || isAdmin,
            canDelete: isOwner || isAdmin,
            canCreate: isAuthenticated,
            isOwner,
        };
    }, [entity, user, isAuthenticated, isAdmin]);
};

export const useFormValidation = (formType: 'order' | 'review' | 'testimonial', formData: any) => {
    return useMemo(() => {
        if (!formData) return { isValid: false, errors: [], warnings: [] };

        const errors: string[] = [];
        const warnings: string[] = [];

        switch (formType) {
            case 'order':
                if (!formData.tracking_id?.trim()) errors.push('Tracking ID is required');
                if (!formData.recipient_name?.trim()) errors.push('Recipient name is required');
                if (!formData.recipient_location?.trim()) errors.push('Recipient location is required');
                if (!formData.courier_service) errors.push('Courier service is required');

                if (formData.order_value < 0) warnings.push('Order value should not be negative');
                if (formData.tracking_id?.length > 50) warnings.push('Tracking ID is very long');
                break;

            case 'review':
                if (!formData.title?.trim()) errors.push('Review title is required');
                if (!formData.comment?.trim()) errors.push('Review comment is required');
                if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
                    errors.push('Rating must be between 1 and 5');
                }

                if (formData.comment?.length < 10) warnings.push('Review comment is quite short');
                if (formData.comment?.length > 1000) warnings.push('Review comment is very long');
                break;

            case 'testimonial':
                if (!formData.name?.trim()) errors.push('Name is required');
                if (!formData.content?.trim()) errors.push('Testimonial content is required');
                if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
                    errors.push('Rating must be between 1 and 5');
                }

                if (formData.content?.length < 10) warnings.push('Testimonial content is quite short');
                if (formData.content?.length > 500) warnings.push('Testimonial content is very long');
                break;
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            hasErrors: errors.length > 0,
            hasWarnings: warnings.length > 0,
        };
    }, [formType, formData]);
};

export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            if (typeof window === 'undefined') return initialValue;
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = React.useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
};

