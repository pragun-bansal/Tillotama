// hooks/useReviews.js
import { useAppDispatch, useAppSelector } from './redux';
import { useMemo, useCallback } from 'react';
import {
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
    clearError,
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
    selectUserReviews,
    selectRatingPercentages
} from '@/store/slices/reviewSlice';

export const useReviews = (productId) => {
    const dispatch = useAppDispatch();

    // ==================== SELECTORS ====================
    const reviews = useAppSelector(selectCurrentProductReviews);
    const reviewStats = useAppSelector(selectReviewStats);
    const loading = useAppSelector(selectReviewsLoading);
    const error = useAppSelector(selectReviewsError);
    const showWriteReview = useAppSelector(selectShowWriteReview);
    const editingReview = useAppSelector(selectEditingReview);
    const reviewForm = useAppSelector(selectReviewForm);
    const showDeleteConfirm = useAppSelector(selectShowDeleteConfirm);
    const reviewToDelete = useAppSelector(selectReviewToDelete);
    const addingReview = useAppSelector(selectAddingReview);
    const updatingReview = useAppSelector(selectUpdatingReview);
    const deletingReview = useAppSelector(selectDeletingReview);
    const canUserReview = useAppSelector(selectCanUserReview);
    const userReviews = useAppSelector(selectUserReviews);
    const ratingPercentages = useAppSelector(selectRatingPercentages);

    // User data
    const { user, isAuthenticated } = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }));

    // ==================== ACTION CREATORS ====================
    const actions = useMemo(() => ({
        // Data fetching
        fetchReviews: () => {
            if (productId) {
                dispatch(setCurrentProductId(productId));
                return dispatch(fetchProductReviews(productId));
            }
        },

        // Review CRUD operations
        addReview: (reviewData) => dispatch(addReview({
            productId,
            ...reviewData
        })),

        updateReview: (reviewId, reviewData) => dispatch(updateReview({
            reviewId,
            productId,
            ...reviewData
        })),

        deleteReview: (reviewId) => dispatch(deleteReview({
            reviewId,
            productId
        })),

        // UI state management
        setShowWriteReview: (show) => dispatch(setShowWriteReview(show)),
        setEditingReview: (review) => dispatch(setEditingReview(review)),
        setShowDeleteConfirm: (show) => dispatch(setShowDeleteConfirm(show)),
        setReviewToDelete: (review) => dispatch(setReviewToDelete(review)),

        // Form management
        updateReviewForm: (data) => dispatch(updateReviewForm(data)),
        resetReviewForm: () => dispatch(resetReviewForm()),

        // Error handling
        clearError: () => dispatch(clearError()),

        // Set current product
        setCurrentProduct: (id) => dispatch(setCurrentProductId(id))
    }), [dispatch, productId]);

    // ==================== COMPUTED VALUES ====================
    const computed = useMemo(() => {
        const sortedReviews = [...reviews].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        const reviewsByRating = reviews.reduce((acc, review) => {
            const rating = review.rating || 1;
            if (!acc[rating]) acc[rating] = [];
            acc[rating].push(review);
            return acc;
        }, {});

        const hasUserReviewed = userReviews.length > 0;
        const userReview = userReviews[0] || null;

        const isFormValid = reviewForm.title.trim().length > 0 &&
            reviewForm.comment.trim().length > 0;

        const canSubmitReview = isAuthenticated &&
            isFormValid &&
            !addingReview &&
            !updatingReview;

        return {
            sortedReviews,
            reviewsByRating,
            hasUserReviewed,
            userReview,
            isFormValid,
            canSubmitReview,
            isEmpty: reviews.length === 0,
            totalReviews: reviewStats.totalReviews,
            averageRating: reviewStats.averageRating,
            ratingDistribution: reviewStats.ratingDistribution
        };
    }, [
        reviews,
        userReviews,
        reviewForm,
        isAuthenticated,
        addingReview,
        updatingReview,
        reviewStats
    ]);

    // ==================== HELPER FUNCTIONS ====================
    const helpers = useMemo(() => ({
        // Format date for display
        formatDate: (date) => {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Format relative time
        formatRelativeTime: (date) => {
            const now = new Date();
            const reviewDate = new Date(date);
            const diffInMs = now - reviewDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInDays === 0) return 'Today';
            if (diffInDays === 1) return 'Yesterday';
            if (diffInDays < 7) return `${diffInDays} days ago`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
            return `${Math.floor(diffInDays / 365)} years ago`;
        },

        // Check if user can edit/delete a review
        canEditReview: (review) => {
            return user?._id === review.user?._id;
        },

        // Get rating text
        getRatingText: (rating) => {
            const texts = {
                1: 'Poor',
                2: 'Fair',
                3: 'Good',
                4: 'Very Good',
                5: 'Excellent'
            };
            return texts[rating] || 'Unknown';
        },

        // Get review summary
        getReviewSummary: () => {
            if (computed.isEmpty) {
                return 'No reviews yet';
            }

            const { totalReviews, averageRating } = reviewStats;
            return `${totalReviews} review${totalReviews !== 1 ? 's' : ''} • ${averageRating.toFixed(1)} average`;
        }
    }), [user, reviewStats, computed.isEmpty]);

    // ==================== QUICK ACTIONS ====================
    const quickActions = useMemo(() => ({
        // Open write review modal
        startWriting: () => {
            if (!isAuthenticated) {
                // Could trigger login modal here
                return false;
            }
            if (computed.hasUserReviewed) {
                // Could show edit existing review
                actions.setEditingReview(computed.userReview);
                return true;
            }
            actions.setShowWriteReview(true);
            return true;
        },

        // Quick edit review
        editReview: (review) => {
            actions.setEditingReview(review);
        },

        // Quick delete review
        deleteReview: (review) => {
            actions.setReviewToDelete(review);
        },

        // Cancel any modal
        cancelModal: () => {
            actions.setShowWriteReview(false);
            actions.setShowDeleteConfirm(false);
            actions.resetReviewForm();
        },

        // Submit review form
        submitReview: async () => {
            if (!computed.canSubmitReview) return false;

            try {
                if (editingReview) {
                    await actions.updateReview(editingReview._id, reviewForm);
                } else {
                    await actions.addReview(reviewForm);
                }
                return true;
            } catch (error) {
                console.error('Failed to submit review:', error);
                return false;
            }
        },

        // Confirm delete
        confirmDelete: async () => {
            if (!reviewToDelete) return false;

            try {
                await actions.deleteReview(reviewToDelete._id);
                return true;
            } catch (error) {
                console.error('Failed to delete review:', error);
                return false;
            }
        }
    }), [
        isAuthenticated,
        computed.hasUserReviewed,
        computed.userReview,
        computed.canSubmitReview,
        editingReview,
        reviewToDelete,
        reviewForm,
        actions
    ]);

    // ==================== INITIALIZATION ====================
    // Auto-initialize when productId changes
    React.useEffect(() => {
        if (productId) {
            actions.setCurrentProduct(productId);
            actions.fetchReviews();
        }
    }, [productId, actions]);

    // ==================== RETURN ALL DATA AND FUNCTIONS ====================
    return {
        // Data
        reviews,
        reviewStats,
        ratingPercentages,
        user,
        isAuthenticated,

        // UI State
        loading,
        error,
        showWriteReview,
        editingReview,
        reviewForm,
        showDeleteConfirm,
        reviewToDelete,

        // Loading states
        addingReview,
        updatingReview,
        deletingReview,

        // Permissions
        canUserReview,

        // Computed values
        ...computed,

        // Actions
        ...actions,

        // Helpers
        ...helpers,

        // Quick actions
        ...quickActions
    };
};

// Export individual hooks for specific use cases
export const useReviewStats = (productId) => {
    const reviews = useAppSelector(selectCurrentProductReviews);
    const reviewStats = useAppSelector(selectReviewStats);
    const ratingPercentages = useAppSelector(selectRatingPercentages);

    return {
        reviews,
        stats: reviewStats,
        percentages: ratingPercentages,
        isEmpty: reviews.length === 0
    };
};

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

export const useReviewPermissions = (productId) => {
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
            canEditReview: (review) => userId === review.user?._id,
            canDeleteReview: (review) => userId === review.user?._id || state.user.data?.admin,
        };
    });
};

export const useReviewForm = () => {
    const dispatch = useAppDispatch();
    const form = useAppSelector(selectReviewForm);
    const showWriteReview = useAppSelector(selectShowWriteReview);
    const editingReview = useAppSelector(selectEditingReview);
    const addingReview = useAppSelector(selectAddingReview);
    const updatingReview = useAppSelector(selectUpdatingReview);

    const updateForm = useCallback((data) => {
        dispatch(updateReviewForm(data));
    }, [dispatch]);

    const resetForm = useCallback(() => {
        dispatch(resetReviewForm());
    }, [dispatch]);

    const toggleModal = useCallback((show) => {
        dispatch(setShowWriteReview(show));
    }, [dispatch]);

    return {
        form,
        showWriteReview,
        editingReview,
        addingReview,
        updatingReview,
        updateForm,
        resetForm,
        toggleModal,
        isValid: form.title.trim().length > 0 && form.comment.trim().length > 0
    };
};

export const useUserReviewStatus = (productId) => {
    const canUserReview = useAppSelector(selectCanUserReview);
    const userReviews = useAppSelector(selectUserReviews);
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

    return {
        canReview: canUserReview,
        hasReviewed: userReviews.length > 0,
        userReview: userReviews[0] || null,
        isAuthenticated,
        reviewCount: userReviews.length
    };
};