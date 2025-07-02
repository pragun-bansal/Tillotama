// hooks/useTestimonials.js
import { useAppDispatch, useAppSelector } from './redux';
import { useMemo, useCallback } from 'react';
import {
    fetchPublicTestimonials,
    fetchUserTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    setShowForm,
    setIsEditing,
    setCurrentTestimonial,
    updateForm,
    setFormPhoto,
    resetForm,
    setCurrentPage,
    clearError,
    clearPublicError,
    clearUserError,
    selectPublicTestimonials,
    selectFeaturedTestimonials,
    selectUserTestimonials,
    selectCurrentTestimonial,
    selectTestimonialForm,
    selectTestimonialLoading,
    selectPublicLoading,
    selectUserLoading,
    selectCreating,
    selectUpdating,
    selectDeleting,
    selectTestimonialError,
    selectPublicError,
    selectUserError,
    selectShowForm,
    selectIsEditing,
    selectTestimonialPagination,
    selectCanUserTestify,
    selectUserHasTestimonial,
    selectTestimonialFormValid
} from '@/store/slices/testimonialSlice';

export const useTestimonials = () => {
    const dispatch = useAppDispatch();

    // ==================== SELECTORS ====================
    const publicTestimonials = useAppSelector(selectPublicTestimonials);
    const featuredTestimonials = useAppSelector(selectFeaturedTestimonials);
    const userTestimonials = useAppSelector(selectUserTestimonials);
    const currentTestimonial = useAppSelector(selectCurrentTestimonial);
    const form = useAppSelector(selectTestimonialForm);
    const loading = useAppSelector(selectTestimonialLoading);
    const publicLoading = useAppSelector(selectPublicLoading);
    const userLoading = useAppSelector(selectUserLoading);
    const creating = useAppSelector(selectCreating);
    const updating = useAppSelector(selectUpdating);
    const deleting = useAppSelector(selectDeleting);
    const error = useAppSelector(selectTestimonialError);
    const publicError = useAppSelector(selectPublicError);
    const userError = useAppSelector(selectUserError);
    const showForm = useAppSelector(selectShowForm);
    const isEditing = useAppSelector(selectIsEditing);
    const pagination = useAppSelector(selectTestimonialPagination);
    const canUserTestify = useAppSelector(selectCanUserTestify);
    const userHasTestimonial = useAppSelector(selectUserHasTestimonial);
    const isFormValid = useAppSelector(selectTestimonialFormValid);

    // User data
    const { user, isAuthenticated } = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }));

    // ==================== ACTION CREATORS ====================
    const actions = useMemo(() => ({
        // Data fetching
        fetchPublicTestimonials: (options = {}) => dispatch(fetchPublicTestimonials(options)),
        fetchFeaturedTestimonials: () => dispatch(fetchPublicTestimonials({ featured: true })),
        fetchUserTestimonials: () => dispatch(fetchUserTestimonials()),

        // CRUD operations
        createTestimonial: (testimonialData) => dispatch(createTestimonial(testimonialData)),
        updateTestimonial: (testimonialId, testimonialData) =>
            dispatch(updateTestimonial({ testimonialId, testimonialData })),
        deleteTestimonial: (testimonialId) => dispatch(deleteTestimonial(testimonialId)),

        // UI state management
        setShowForm: (show) => dispatch(setShowForm(show)),
        setIsEditing: (editing) => dispatch(setIsEditing(editing)),
        setCurrentTestimonial: (testimonial) => dispatch(setCurrentTestimonial(testimonial)),

        // Form management
        updateForm: (data) => dispatch(updateForm(data)),
        setFormPhoto: (file, preview) => dispatch(setFormPhoto({ file, preview })),
        resetForm: () => dispatch(resetForm()),

        // Pagination
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),

        // Error handling
        clearError: () => dispatch(clearError()),
        clearPublicError: () => dispatch(clearPublicError()),
        clearUserError: () => dispatch(clearUserError())
    }), [dispatch]);

    // ==================== COMPUTED VALUES ====================
    const computed = useMemo(() => {
        const sortedPublicTestimonials = [...publicTestimonials].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        const sortedUserTestimonials = [...userTestimonials].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        const userTestimonial = userTestimonials.length > 0 ? userTestimonials[0] : null;

        const testimonialsByRating = publicTestimonials.reduce((acc, testimonial) => {
            const rating = testimonial.rating || 1;
            if (!acc[rating]) acc[rating] = [];
            acc[rating].push(testimonial);
            return acc;
        }, {});

        const averageRating = publicTestimonials.length > 0
            ? publicTestimonials.reduce((sum, t) => sum + t.rating, 0) / publicTestimonials.length
            : 0;

        const canSubmit = isAuthenticated && isFormValid && !creating && !updating;

        return {
            sortedPublicTestimonials,
            sortedUserTestimonials,
            userTestimonial,
            testimonialsByRating,
            averageRating: Math.round(averageRating * 100) / 100,
            canSubmit,
            hasPublicTestimonials: publicTestimonials.length > 0,
            hasFeaturedTestimonials: featuredTestimonials.length > 0,
            totalPublicTestimonials: pagination.totalCount,
            isLastPage: !pagination.hasNextPage,
            isFirstPage: !pagination.hasPreviousPage
        };
    }, [
        publicTestimonials,
        featuredTestimonials,
        userTestimonials,
        pagination,
        isAuthenticated,
        isFormValid,
        creating,
        updating
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
            const testimonialDate = new Date(date);
            const diffInMs = now - testimonialDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInDays === 0) return 'Today';
            if (diffInDays === 1) return 'Yesterday';
            if (diffInDays < 7) return `${diffInDays} days ago`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
            return `${Math.floor(diffInDays / 365)} years ago`;
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

        // Get approval status text
        getApprovalStatusText: (testimonial) => {
            if (testimonial.isApproved && testimonial.isPublished) {
                return 'Published';
            } else if (!testimonial.isApproved) {
                return 'Pending Approval';
            } else if (!testimonial.isPublished) {
                return 'Unpublished';
            }
            return 'Unknown';
        },

        // Get approval status color
        getApprovalStatusColor: (testimonial) => {
            if (testimonial.isApproved && testimonial.isPublished) {
                return 'green';
            } else if (!testimonial.isApproved) {
                return 'yellow';
            } else if (!testimonial.isPublished) {
                return 'gray';
            }
            return 'gray';
        },

        // Check if user can edit testimonial
        canEditTestimonial: (testimonial) => {
            return user?._id === testimonial.user?._id || user?.admin;
        },

        // Check if user can delete testimonial
        canDeleteTestimonial: (testimonial) => {
            return user?._id === testimonial.user?._id || user?.admin;
        },

        // Render stars
        renderStars: (rating, size = 'sm') => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push({
                    filled: i <= rating,
                    key: i
                });
            }
            return stars;
        }
    }), [user]);

    // ==================== QUICK ACTIONS ====================
    const quickActions = useMemo(() => ({
        // Open write testimonial modal
        startWriting: () => {
            if (!isAuthenticated) {
                return false;
            }
            if (userHasTestimonial) {
                // Edit existing testimonial
                actions.setCurrentTestimonial(computed.userTestimonial);
                return true;
            }
            actions.setShowForm(true);
            return true;
        },

        // Quick edit testimonial
        editTestimonial: (testimonial) => {
            actions.setCurrentTestimonial(testimonial);
        },

        // Cancel any modal
        cancelModal: () => {
            actions.setShowForm(false);
            actions.resetForm();
        },

        // Submit testimonial form
        submitTestimonial: async () => {
            if (!computed.canSubmit) return false;

            try {
                if (isEditing && currentTestimonial) {
                    await actions.updateTestimonial(currentTestimonial._id, form);
                } else {
                    await actions.createTestimonial(form);
                }
                return true;
            } catch (error) {
                console.error('Failed to submit testimonial:', error);
                return false;
            }
        },

        // Load more testimonials
        loadMoreTestimonials: () => {
            if (pagination.hasNextPage) {
                actions.setCurrentPage(pagination.currentPage + 1);
                actions.fetchPublicTestimonials({
                    page: pagination.currentPage + 1
                });
            }
        },

        // Load previous testimonials
        loadPreviousTestimonials: () => {
            if (pagination.hasPreviousPage) {
                actions.setCurrentPage(pagination.currentPage - 1);
                actions.fetchPublicTestimonials({
                    page: pagination.currentPage - 1
                });
            }
        },

        // Handle photo upload
        handlePhotoUpload: (file) => {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    actions.setFormPhoto(file, e.target.result);
                };
                reader.readAsDataURL(file);
                return true;
            }
            return false;
        },

        // Remove photo
        removePhoto: () => {
            actions.setFormPhoto(null, null);
        }
    }), [
        isAuthenticated,
        userHasTestimonial,
        computed.userTestimonial,
        computed.canSubmit,
        isEditing,
        currentTestimonial,
        form,
        pagination,
        actions
    ]);

    // ==================== INITIALIZATION ====================
    // Auto-fetch data when component mounts
    React.useEffect(() => {
        // Fetch public testimonials on mount
        actions.fetchPublicTestimonials();

        // Fetch user testimonials if authenticated
        if (isAuthenticated) {
            actions.fetchUserTestimonials();
        }
    }, [isAuthenticated, actions]);

    // ==================== RETURN ALL DATA AND FUNCTIONS ====================
    return {
        // Data
        publicTestimonials,
        featuredTestimonials,
        userTestimonials,
        currentTestimonial,
        form,
        pagination,
        user,
        isAuthenticated,

        // UI State
        loading,
        publicLoading,
        userLoading,
        creating,
        updating,
        deleting,
        error,
        publicError,
        userError,
        showForm,
        isEditing,

        // Permissions
        canUserTestify,
        userHasTestimonial,
        isFormValid,

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
export const usePublicTestimonials = () => {
    const publicTestimonials = useAppSelector(selectPublicTestimonials);
    const featuredTestimonials = useAppSelector(selectFeaturedTestimonials);
    const publicLoading = useAppSelector(selectPublicLoading);
    const publicError = useAppSelector(selectPublicError);
    const pagination = useAppSelector(selectTestimonialPagination);

    return {
        testimonials: publicTestimonials,
        featured: featuredTestimonials,
        loading: publicLoading,
        error: publicError,
        pagination,
        isEmpty: publicTestimonials.length === 0,
        hasFeatured: featuredTestimonials.length > 0
    };
};

export const useUserTestimonials = () => {
    const userTestimonials = useAppSelector(selectUserTestimonials);
    const userLoading = useAppSelector(selectUserLoading);
    const userError = useAppSelector(selectUserError);
    const canUserTestify = useAppSelector(selectCanUserTestify);
    const userHasTestimonial = useAppSelector(selectUserHasTestimonial);

    return {
        testimonials: userTestimonials,
        loading: userLoading,
        error: userError,
        canTestify: canUserTestify,
        hasTestimonial: userHasTestimonial,
        userTestimonial: userTestimonials.length > 0 ? userTestimonials[0] : null,
        isEmpty: userTestimonials.length === 0
    };
};

export const useTestimonialForm = () => {
    const dispatch = useAppDispatch();
    const form = useAppSelector(selectTestimonialForm);
    const showForm = useAppSelector(selectShowForm);
    const isEditing = useAppSelector(selectIsEditing);
    const creating = useAppSelector(selectCreating);
    const updating = useAppSelector(selectUpdating);
    const isFormValid = useAppSelector(selectTestimonialFormValid);

    const updateForm = useCallback((data) => {
        dispatch(updateForm(data));
    }, [dispatch]);

    const setFormPhoto = useCallback((file, preview) => {
        dispatch(setFormPhoto({ file, preview }));
    }, [dispatch]);

    const resetForm = useCallback(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const toggleModal = useCallback((show) => {
        dispatch(setShowForm(show));
    }, [dispatch]);

    return {
        form,
        showForm,
        isEditing,
        creating,
        updating,
        isFormValid,
        updateForm,
        setFormPhoto,
        resetForm,
        toggleModal,
        isSubmitting: creating || updating
    };
};

export const useTestimonialPermissions = () => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        const isAuthenticated = state.user.isAuthenticated;
        const isAdmin = state.user.data?.admin;
        const userTestimonials = state.testimonials.userTestimonials;

        return {
            isAuthenticated,
            isAdmin,
            canCreateTestimonial: isAuthenticated && userTestimonials.length === 0,
            canEditTestimonial: (testimonial) => userId === testimonial.user?._id || isAdmin,
            canDeleteTestimonial: (testimonial) => userId === testimonial.user?._id || isAdmin,
            hasExistingTestimonial: userTestimonials.length > 0,
            userTestimonial: userTestimonials[0] || null
        };
    });
};