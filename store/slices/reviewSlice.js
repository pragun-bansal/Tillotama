// store/slices/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ==================== ASYNC THUNKS ====================

export const fetchProductReviews = createAsyncThunk(
    'reviews/fetchProductReviews',
    async (productId, { rejectWithValue }) => {
        try {
            if (!productId) {
                return rejectWithValue('Product ID is required');
            }

            console.log('⭐ Fetching reviews for product:', productId);
            const response = await axios.get(`/api/reviews/${productId}`);
            console.log('⭐ Reviews fetch response:', response.data);

            return {
                productId,
                reviews: response.data.data || response.data.reviews || []
            };
        } catch (error) {
            console.error('⭐ Reviews fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
        }
    }
);

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({ productId, title, comment, rating }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required to post a review');
            }

            if (!title || !comment) {
                return rejectWithValue('Title and comment are required');
            }

            console.log('⭐ Adding review:', { productId, title, rating });
            const response = await axios.post('/api/reviews/add', {
                productId,
                title,
                comment,
                rating,
                token
            });

            console.log('⭐ Add review response:', response.data);
            return response.data.data || response.data.review;
        } catch (error) {
            console.error('⭐ Add review error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to add review');
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ reviewId, productId, title, comment, rating }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required to update review');
            }

            console.log('⭐ Updating review:', reviewId);
            const response = await axios.put(`/api/reviews/update/${reviewId}`, {
                productId,
                title,
                comment,
                rating,
                token
            });

            console.log('⭐ Update review response:', response.data);
            return response.data.data || response.data.review;
        } catch (error) {
            console.error('⭐ Update review error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to update review');
        }
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async ({ reviewId, productId }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required to delete review');
            }

            console.log('⭐ Deleting review:', reviewId);
            const response = await axios.post('/api/reviews/delete', {
                reviewId,
                productId,
                token
            });

            console.log('⭐ Delete review response:', response.data);
            return { reviewId, productId };
        } catch (error) {
            console.error('⭐ Delete review error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
        }
    }
);

// ==================== INITIAL STATE ====================

const initialState = {
    // Reviews data by product ID
    reviewsByProduct: {}, // { productId: { reviews: [], stats: {}, loading: false } }

    // Current product reviews
    currentProductReviews: [],
    currentProductId: null,

    // Review statistics
    reviewStats: {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    },

    // Loading states
    loading: false,
    addingReview: false,
    updatingReview: false,
    deletingReview: false,

    // Error states
    error: null,

    // UI states
    showWriteReview: false,
    editingReview: null,
    showDeleteConfirm: false,
    reviewToDelete: null,

    // Form state
    reviewForm: {
        title: '',
        comment: '',
        rating: 5
    }
};

// ==================== HELPER FUNCTIONS ====================

const calculateReviewStats = (reviews) => {
    if (!reviews || reviews.length === 0) {
        return {
            totalReviews: 0,
            averageRating: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = totalRating / totalReviews;

    const ratingDistribution = reviews.reduce((dist, review) => {
        const rating = review.rating || 1;
        dist[rating] = (dist[rating] || 0) + 1;
        return dist;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    return {
        totalReviews,
        averageRating: Math.round(averageRating * 100) / 100,
        ratingDistribution
    };
};

// ==================== SLICE ====================

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        // ===== UI STATE MANAGEMENT =====
        setShowWriteReview: (state, action) => {
            state.showWriteReview = action.payload;
            if (!action.payload) {
                // Reset form when closing
                state.reviewForm = { title: '', comment: '', rating: 5 };
                state.editingReview = null;
            }
        },

        setEditingReview: (state, action) => {
            state.editingReview = action.payload;
            if (action.payload) {
                state.reviewForm = {
                    title: action.payload.title || '',
                    comment: action.payload.comment || '',
                    rating: action.payload.rating || 5
                };
                state.showWriteReview = true;
            }
        },

        setShowDeleteConfirm: (state, action) => {
            state.showDeleteConfirm = action.payload;
            if (!action.payload) {
                state.reviewToDelete = null;
            }
        },

        setReviewToDelete: (state, action) => {
            state.reviewToDelete = action.payload;
            state.showDeleteConfirm = true;
        },

        // ===== FORM MANAGEMENT =====
        updateReviewForm: (state, action) => {
            state.reviewForm = { ...state.reviewForm, ...action.payload };
        },

        resetReviewForm: (state) => {
            state.reviewForm = { title: '', comment: '', rating: 5 };
            state.editingReview = null;
        },

        // ===== PRODUCT CONTEXT =====
        setCurrentProductId: (state, action) => {
            state.currentProductId = action.payload;

            // Load reviews for this product if available
            if (action.payload && state.reviewsByProduct[action.payload]) {
                state.currentProductReviews = state.reviewsByProduct[action.payload].reviews || [];
                state.reviewStats = state.reviewsByProduct[action.payload].stats || state.reviewStats;
            } else {
                state.currentProductReviews = [];
                state.reviewStats = initialState.reviewStats;
            }
        },

        // ===== ERROR MANAGEMENT =====
        clearError: (state) => {
            state.error = null;
        },

        // ===== CACHE MANAGEMENT =====
        clearReviewsCache: (state) => {
            state.reviewsByProduct = {};
            state.currentProductReviews = [];
            state.currentProductId = null;
        },

        removeProductReviews: (state, action) => {
            const productId = action.payload;
            delete state.reviewsByProduct[productId];

            if (state.currentProductId === productId) {
                state.currentProductReviews = [];
                state.reviewStats = initialState.reviewStats;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            // ===== FETCH PRODUCT REVIEWS =====
            .addCase(fetchProductReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                const { productId, reviews } = action.payload;
                const stats = calculateReviewStats(reviews);

                // Store in product-specific cache
                state.reviewsByProduct[productId] = {
                    reviews,
                    stats,
                    lastFetch: Date.now()
                };

                // Update current product data if it matches
                if (state.currentProductId === productId) {
                    state.currentProductReviews = reviews;
                    state.reviewStats = stats;
                }

                state.loading = false;
                state.error = null;
                console.log('⭐ Reviews loaded successfully for product:', productId, 'Count:', reviews.length);
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('⭐ Reviews fetch failed:', action.payload);
            })

            // ===== ADD REVIEW =====
            .addCase(addReview.pending, (state) => {
                state.addingReview = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                const newReview = action.payload;
                const productId = state.currentProductId;

                if (productId && newReview) {
                    // Add to current product reviews
                    state.currentProductReviews.unshift(newReview);

                    // Update cached data
                    if (state.reviewsByProduct[productId]) {
                        state.reviewsByProduct[productId].reviews.unshift(newReview);
                        state.reviewsByProduct[productId].stats = calculateReviewStats(
                            state.reviewsByProduct[productId].reviews
                        );
                    }

                    // Recalculate stats
                    state.reviewStats = calculateReviewStats(state.currentProductReviews);

                    // Reset form and UI
                    state.reviewForm = { title: '', comment: '', rating: 5 };
                    state.showWriteReview = false;
                }

                state.addingReview = false;
                state.error = null;
                console.log('⭐ Review added successfully:', newReview._id);
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addingReview = false;
                state.error = action.payload;
                console.error('⭐ Add review failed:', action.payload);
            })

            // ===== UPDATE REVIEW =====
            .addCase(updateReview.pending, (state) => {
                state.updatingReview = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const updatedReview = action.payload;
                const productId = state.currentProductId;

                if (productId && updatedReview) {
                    // Update in current product reviews
                    const index = state.currentProductReviews.findIndex(r => r._id === updatedReview._id);
                    if (index !== -1) {
                        state.currentProductReviews[index] = updatedReview;
                    }

                    // Update cached data
                    if (state.reviewsByProduct[productId]) {
                        const cacheIndex = state.reviewsByProduct[productId].reviews.findIndex(
                            r => r._id === updatedReview._id
                        );
                        if (cacheIndex !== -1) {
                            state.reviewsByProduct[productId].reviews[cacheIndex] = updatedReview;
                            state.reviewsByProduct[productId].stats = calculateReviewStats(
                                state.reviewsByProduct[productId].reviews
                            );
                        }
                    }

                    // Recalculate stats
                    state.reviewStats = calculateReviewStats(state.currentProductReviews);

                    // Reset form and UI
                    state.reviewForm = { title: '', comment: '', rating: 5 };
                    state.showWriteReview = false;
                    state.editingReview = null;
                }

                state.updatingReview = false;
                state.error = null;
                console.log('⭐ Review updated successfully:', updatedReview._id);
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.updatingReview = false;
                state.error = action.payload;
                console.error('⭐ Update review failed:', action.payload);
            })

            // ===== DELETE REVIEW =====
            .addCase(deleteReview.pending, (state) => {
                state.deletingReview = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                const { reviewId, productId } = action.payload;

                // Remove from current product reviews
                state.currentProductReviews = state.currentProductReviews.filter(r => r._id !== reviewId);

                // Update cached data
                if (state.reviewsByProduct[productId]) {
                    state.reviewsByProduct[productId].reviews = state.reviewsByProduct[productId].reviews.filter(
                        r => r._id !== reviewId
                    );
                    state.reviewsByProduct[productId].stats = calculateReviewStats(
                        state.reviewsByProduct[productId].reviews
                    );
                }

                // Recalculate stats
                state.reviewStats = calculateReviewStats(state.currentProductReviews);

                // Reset UI
                state.showDeleteConfirm = false;
                state.reviewToDelete = null;

                state.deletingReview = false;
                state.error = null;
                console.log('⭐ Review deleted successfully:', reviewId);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.deletingReview = false;
                state.error = action.payload;
                console.error('⭐ Delete review failed:', action.payload);
            });
    }
});

// ==================== EXPORTS ====================

// Action creators
export const {
    setShowWriteReview,
    setEditingReview,
    setShowDeleteConfirm,
    setReviewToDelete,
    updateReviewForm,
    resetReviewForm,
    setCurrentProductId,
    clearError,
    clearReviewsCache,
    removeProductReviews
} = reviewSlice.actions;

// Selectors
export const selectCurrentProductReviews = (state) => state.reviews.currentProductReviews;
export const selectReviewStats = (state) => state.reviews.reviewStats;
export const selectReviewsLoading = (state) => state.reviews.loading;
export const selectReviewsError = (state) => state.reviews.error;
export const selectShowWriteReview = (state) => state.reviews.showWriteReview;
export const selectEditingReview = (state) => state.reviews.editingReview;
export const selectReviewForm = (state) => state.reviews.reviewForm;
export const selectShowDeleteConfirm = (state) => state.reviews.showDeleteConfirm;
export const selectReviewToDelete = (state) => state.reviews.reviewToDelete;
export const selectAddingReview = (state) => state.reviews.addingReview;
export const selectUpdatingReview = (state) => state.reviews.updatingReview;
export const selectDeletingReview = (state) => state.reviews.deletingReview;

// Complex selectors
export const selectReviewsByRating = (state) => {
    const reviews = state.reviews.currentProductReviews;
    return reviews.reduce((acc, review) => {
        const rating = review.rating || 1;
        if (!acc[rating]) acc[rating] = [];
        acc[rating].push(review);
        return acc;
    }, {});
};

export const selectUserReviews = (state) => {
    const userId = state.user.data?._id;
    if (!userId) return [];

    return state.reviews.currentProductReviews.filter(
        review => review.user?._id === userId
    );
};

export const selectCanUserReview = (state) => {
    const isAuthenticated = state.user.isAuthenticated;
    const userId = state.user.data?._id;
    const userReviews = selectUserReviews(state);

    return isAuthenticated && userId && userReviews.length === 0;
};

export const selectRatingPercentages = (state) => {
    const stats = state.reviews.reviewStats;
    const total = stats.totalReviews;

    if (total === 0) {
        return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }

    return Object.keys(stats.ratingDistribution).reduce((acc, rating) => {
        acc[rating] = Math.round((stats.ratingDistribution[rating] / total) * 100);
        return acc;
    }, {});
};

export default reviewSlice.reducer;