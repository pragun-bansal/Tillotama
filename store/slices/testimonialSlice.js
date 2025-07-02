// // store/slices/testimonialSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// // ==================== ASYNC THUNKS ====================
//
// // Fetch all approved testimonials (public)
// export const fetchPublicTestimonials = createAsyncThunk(
//     'testimonials/fetchPublic',
//     async ({ page = 1, limit = 10, featured = false } = {}, { rejectWithValue }) => {
//         try {
//             console.log('📝 Fetching public testimonials...');
//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 limit: limit.toString(),
//                 ...(featured && { featured: 'true' })
//             });
//
//             const response = await axios.get(`/api/testimonials/public?${params}`);
//             console.log('📝 Public testimonials fetch response:', response.data);
//
//             return response.data;
//         } catch (error) {
//             console.error('📝 Public testimonials fetch error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
//         }
//     }
// );
//
// // Fetch user's own testimonials
// export const fetchUserTestimonials = createAsyncThunk(
//     'testimonials/fetchUser',
//     async (_, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📝 Fetching user testimonials...');
//             const response = await axios.get('/api/testimonials/user', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             console.log('📝 User testimonials fetch response:', response.data);
//
//             return response.data;
//         } catch (error) {
//             console.error('📝 User testimonials fetch error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch user testimonials');
//         }
//     }
// );
//
// // Create new testimonial
// export const createTestimonial = createAsyncThunk(
//     'testimonials/create',
//     async (testimonialData, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📝 Creating testimonial:', testimonialData);
//
//             const formData = new FormData();
//             formData.append('name', testimonialData.name);
//             formData.append('rating', testimonialData.rating.toString());
//             formData.append('content', testimonialData.content);
//
//             if (testimonialData.photo) {
//                 formData.append('photo', testimonialData.photo);
//             }
//
//             const response = await axios.post('/api/testimonials', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//
//             console.log('📝 Create testimonial response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📝 Create testimonial error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to create testimonial');
//         }
//     }
// );
//
// // Update existing testimonial
// export const updateTestimonial = createAsyncThunk(
//     'testimonials/update',
//     async ({ testimonialId, testimonialData }, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📝 Updating testimonial:', testimonialId, testimonialData);
//
//             const formData = new FormData();
//             formData.append('name', testimonialData.name);
//             formData.append('rating', testimonialData.rating.toString());
//             formData.append('content', testimonialData.content);
//
//             if (testimonialData.photo && typeof testimonialData.photo !== 'string') {
//                 formData.append('photo', testimonialData.photo);
//             }
//
//             const response = await axios.put(`/api/testimonials/${testimonialId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//
//             console.log('📝 Update testimonial response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📝 Update testimonial error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
//         }
//     }
// );
//
// // Delete testimonial
// export const deleteTestimonial = createAsyncThunk(
//     'testimonials/delete',
//     async (testimonialId, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📝 Deleting testimonial:', testimonialId);
//
//             await axios.delete(`/api/testimonials/${testimonialId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📝 Testimonial deleted successfully');
//             return testimonialId;
//         } catch (error) {
//             console.error('📝 Delete testimonial error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
//         }
//     }
// );
//
// // ==================== INITIAL STATE ====================
//
// const initialState = {
//     // Public testimonials (for display)
//     publicTestimonials: [],
//     featuredTestimonials: [],
//
//     // User's testimonials
//     userTestimonials: [],
//
//     // Current testimonial being edited
//     currentTestimonial: null,
//
//     // Pagination
//     currentPage: 1,
//     totalPages: 1,
//     totalCount: 0,
//     hasNextPage: false,
//     hasPreviousPage: false,
//
//     // Loading states
//     loading: false,
//     publicLoading: false,
//     userLoading: false,
//     creating: false,
//     updating: false,
//     deleting: false,
//
//     // Error states
//     error: null,
//     publicError: null,
//     userError: null,
//
//     // UI states
//     showForm: false,
//     isEditing: false,
//
//     // Form state
//     form: {
//         name: '',
//         rating: 5,
//         content: '',
//         photo: null,
//         photoPreview: null
//     }
// };
//
// // ==================== SLICE ====================
//
// const testimonialSlice = createSlice({
//     name: 'testimonials',
//     initialState,
//     reducers: {
//         // ===== UI STATE MANAGEMENT =====
//         setShowForm: (state, action) => {
//             state.showForm = action.payload;
//             if (!action.payload) {
//                 // Reset form when closing
//                 state.form = {
//                     name: '',
//                     rating: 5,
//                     content: '',
//                     photo: null,
//                     photoPreview: null
//                 };
//                 state.isEditing = false;
//                 state.currentTestimonial = null;
//             }
//         },
//
//         setIsEditing: (state, action) => {
//             state.isEditing = action.payload;
//             if (!action.payload) {
//                 state.currentTestimonial = null;
//             }
//         },
//
//         setCurrentTestimonial: (state, action) => {
//             state.currentTestimonial = action.payload;
//             if (action.payload) {
//                 state.form = {
//                     name: action.payload.name || '',
//                     rating: action.payload.rating || 5,
//                     content: action.payload.content || '',
//                     photo: null,
//                     photoPreview: action.payload.photo || null
//                 };
//                 state.isEditing = true;
//                 state.showForm = true;
//             }
//         },
//
//         // ===== FORM MANAGEMENT =====
//         updateForm: (state, action) => {
//             state.form = { ...state.form, ...action.payload };
//         },
//
//         setFormPhoto: (state, action) => {
//             state.form.photo = action.payload.file;
//             state.form.photoPreview = action.payload.preview;
//         },
//
//         resetForm: (state) => {
//             state.form = {
//                 name: '',
//                 rating: 5,
//                 content: '',
//                 photo: null,
//                 photoPreview: null
//             };
//             state.isEditing = false;
//             state.currentTestimonial = null;
//         },
//
//         // ===== PAGINATION =====
//         setCurrentPage: (state, action) => {
//             state.currentPage = action.payload;
//         },
//
//         // ===== ERROR MANAGEMENT =====
//         clearError: (state) => {
//             state.error = null;
//             state.publicError = null;
//             state.userError = null;
//         },
//
//         clearPublicError: (state) => {
//             state.publicError = null;
//         },
//
//         clearUserError: (state) => {
//             state.userError = null;
//         }
//     },
//
//     extraReducers: (builder) => {
//         builder
//             // ===== FETCH PUBLIC TESTIMONIALS =====
//             .addCase(fetchPublicTestimonials.pending, (state) => {
//                 state.publicLoading = true;
//                 state.publicError = null;
//             })
//             .addCase(fetchPublicTestimonials.fulfilled, (state, action) => {
//                 const { testimonials, pagination, featured } = action.payload;
//
//                 if (featured) {
//                     state.featuredTestimonials = testimonials;
//                 } else {
//                     state.publicTestimonials = testimonials;
//                     state.currentPage = pagination.currentPage;
//                     state.totalPages = pagination.totalPages;
//                     state.totalCount = pagination.totalCount;
//                     state.hasNextPage = pagination.hasNextPage;
//                     state.hasPreviousPage = pagination.hasPreviousPage;
//                 }
//
//                 state.publicLoading = false;
//                 state.publicError = null;
//                 console.log('📝 Public testimonials loaded successfully:', testimonials.length);
//             })
//             .addCase(fetchPublicTestimonials.rejected, (state, action) => {
//                 state.publicLoading = false;
//                 state.publicError = action.payload;
//                 console.error('📝 Public testimonials fetch failed:', action.payload);
//             })
//
//             // ===== FETCH USER TESTIMONIALS =====
//             .addCase(fetchUserTestimonials.pending, (state) => {
//                 state.userLoading = true;
//                 state.userError = null;
//             })
//             .addCase(fetchUserTestimonials.fulfilled, (state, action) => {
//                 state.userTestimonials = action.payload.testimonials || [];
//                 state.userLoading = false;
//                 state.userError = null;
//                 console.log('📝 User testimonials loaded successfully:', state.userTestimonials.length);
//             })
//             .addCase(fetchUserTestimonials.rejected, (state, action) => {
//                 state.userLoading = false;
//                 state.userError = action.payload;
//                 console.error('📝 User testimonials fetch failed:', action.payload);
//             })
//
//             // ===== CREATE TESTIMONIAL =====
//             .addCase(createTestimonial.pending, (state) => {
//                 state.creating = true;
//                 state.error = null;
//             })
//             .addCase(createTestimonial.fulfilled, (state, action) => {
//                 const newTestimonial = action.payload.testimonial;
//                 state.userTestimonials.unshift(newTestimonial);
//
//                 // Reset form and UI
//                 state.form = {
//                     name: '',
//                     rating: 5,
//                     content: '',
//                     photo: null,
//                     photoPreview: null
//                 };
//                 state.showForm = false;
//                 state.creating = false;
//                 state.error = null;
//
//                 console.log('📝 Testimonial created successfully:', newTestimonial._id);
//             })
//             .addCase(createTestimonial.rejected, (state, action) => {
//                 state.creating = false;
//                 state.error = action.payload;
//                 console.error('📝 Create testimonial failed:', action.payload);
//             })
//
//             // ===== UPDATE TESTIMONIAL =====
//             .addCase(updateTestimonial.pending, (state) => {
//                 state.updating = true;
//                 state.error = null;
//             })
//             .addCase(updateTestimonial.fulfilled, (state, action) => {
//                 const updatedTestimonial = action.payload.testimonial;
//                 const index = state.userTestimonials.findIndex(t => t._id === updatedTestimonial._id);
//
//                 if (index !== -1) {
//                     state.userTestimonials[index] = updatedTestimonial;
//                 }
//
//                 // Reset form and UI
//                 state.form = {
//                     name: '',
//                     rating: 5,
//                     content: '',
//                     photo: null,
//                     photoPreview: null
//                 };
//                 state.showForm = false;
//                 state.isEditing = false;
//                 state.currentTestimonial = null;
//                 state.updating = false;
//                 state.error = null;
//
//                 console.log('📝 Testimonial updated successfully:', updatedTestimonial._id);
//             })
//             .addCase(updateTestimonial.rejected, (state, action) => {
//                 state.updating = false;
//                 state.error = action.payload;
//                 console.error('📝 Update testimonial failed:', action.payload);
//             })
//
//             // ===== DELETE TESTIMONIAL =====
//             .addCase(deleteTestimonial.pending, (state) => {
//                 state.deleting = true;
//                 state.error = null;
//             })
//             .addCase(deleteTestimonial.fulfilled, (state, action) => {
//                 const testimonialId = action.payload;
//                 state.userTestimonials = state.userTestimonials.filter(t => t._id !== testimonialId);
//
//                 state.deleting = false;
//                 state.error = null;
//
//                 console.log('📝 Testimonial deleted successfully:', testimonialId);
//             })
//             .addCase(deleteTestimonial.rejected, (state, action) => {
//                 state.deleting = false;
//                 state.error = action.payload;
//                 console.error('📝 Delete testimonial failed:', action.payload);
//             });
//     }
// });
//
// // ==================== EXPORTS ====================
//
// // Action creators
// export const {
//     setShowForm,
//     setIsEditing,
//     setCurrentTestimonial,
//     updateForm,
//     setFormPhoto,
//     resetForm,
//     setCurrentPage,
//     clearError,
//     clearPublicError,
//     clearUserError
// } = testimonialSlice.actions;
//
// // Selectors
// export const selectPublicTestimonials = (state) => state.testimonials.publicTestimonials;
// export const selectFeaturedTestimonials = (state) => state.testimonials.featuredTestimonials;
// export const selectUserTestimonials = (state) => state.testimonials.userTestimonials;
// export const selectCurrentTestimonial = (state) => state.testimonials.currentTestimonial;
// export const selectTestimonialForm = (state) => state.testimonials.form;
// export const selectTestimonialLoading = (state) => state.testimonials.loading;
// export const selectPublicLoading = (state) => state.testimonials.publicLoading;
// export const selectUserLoading = (state) => state.testimonials.userLoading;
// export const selectCreating = (state) => state.testimonials.creating;
// export const selectUpdating = (state) => state.testimonials.updating;
// export const selectDeleting = (state) => state.testimonials.deleting;
// export const selectTestimonialError = (state) => state.testimonials.error;
// export const selectPublicError = (state) => state.testimonials.publicError;
// export const selectUserError = (state) => state.testimonials.userError;
// export const selectShowForm = (state) => state.testimonials.showForm;
// export const selectIsEditing = (state) => state.testimonials.isEditing;
// export const selectTestimonialPagination = (state) => ({
//     currentPage: state.testimonials.currentPage,
//     totalPages: state.testimonials.totalPages,
//     totalCount: state.testimonials.totalCount,
//     hasNextPage: state.testimonials.hasNextPage,
//     hasPreviousPage: state.testimonials.hasPreviousPage
// });
//
// // Complex selectors
// export const selectCanUserTestify = (state) => {
//     const isAuthenticated = state.user.isAuthenticated;
//     const userId = state.user.data?._id;
//     return isAuthenticated && userId;
// };
//
// export const selectUserHasTestimonial = (state) => {
//     return state.testimonials.userTestimonials.length > 0;
// };
//
// export const selectTestimonialFormValid = (state) => {
//     const { name, content, rating } = state.testimonials.form;
//     return name.trim().length > 0 &&
//         content.trim().length >= 10 &&
//         rating >= 1 && rating <= 5;
// };
//
// export default testimonialSlice.reducer;
// store/slices/testimonialSlice.js - Complete updated version with photo removal
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ==================== ASYNC THUNKS ====================

// Fetch all approved testimonials (public)
export const fetchPublicTestimonials = createAsyncThunk(
    'testimonials/fetchPublic',
    async ({ page = 1, limit = 10, featured = false } = {}, { rejectWithValue }) => {
        try {
            console.log('📝 Fetching public testimonials...');
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(featured && { featured: 'true' })
            });

            const response = await axios.get(`/api/testimonials/public?${params}`);
            console.log('📝 Public testimonials fetch response:', response.data);

            return response.data;
        } catch (error) {
            console.error('📝 Public testimonials fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
        }
    }
);

// Fetch user's own testimonials
export const fetchUserTestimonials = createAsyncThunk(
    'testimonials/fetchUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📝 Fetching user testimonials...');
            const response = await axios.get('/api/testimonials/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('📝 User testimonials fetch response:', response.data);

            return response.data;
        } catch (error) {
            console.error('📝 User testimonials fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user testimonials');
        }
    }
);

// Create new testimonial
export const createTestimonial = createAsyncThunk(
    'testimonials/create',
    async (testimonialData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📝 Creating testimonial:', testimonialData);

            const formData = new FormData();
            formData.append('name', testimonialData.name);
            formData.append('rating', testimonialData.rating.toString());
            formData.append('content', testimonialData.content);

            if (testimonialData.photo) {
                formData.append('photo', testimonialData.photo);
            }

            const response = await axios.post('/api/testimonials', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('📝 Create testimonial response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📝 Create testimonial error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to create testimonial');
        }
    }
);

// Update existing testimonial
export const updateTestimonial = createAsyncThunk(
    'testimonials/update',
    async ({ testimonialId, testimonialData, removePhoto = false }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required to update testimonial');
            }

            console.log('📝 Updating testimonial:', testimonialId, { ...testimonialData, removePhoto });

            const formData = new FormData();
            formData.append('name', testimonialData.name);
            formData.append('rating', testimonialData.rating.toString());
            formData.append('content', testimonialData.content);

            // Handle photo removal
            if (removePhoto) {
                formData.append('removePhoto', 'true');
                console.log('🗑️ Photo removal requested');
            }
            // Handle new photo upload
            else if (testimonialData.photo && typeof testimonialData.photo !== 'string') {
                formData.append('photo', testimonialData.photo);
                console.log('📸 New photo provided for upload');
            }

            const response = await axios.put(`/api/testimonials/${testimonialId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('📝 Update testimonial response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📝 Update testimonial error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
        }
    }
);

// Delete testimonial
export const deleteTestimonial = createAsyncThunk(
    'testimonials/delete',
    async (testimonialId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required to delete testimonial');
            }

            console.log('📝 Deleting testimonial:', testimonialId);

            await axios.delete(`/api/testimonials/${testimonialId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📝 Testimonial deleted successfully');
            return testimonialId;
        } catch (error) {
            console.error('📝 Delete testimonial error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
        }
    }
);

// Remove photo from existing testimonial
export const removeTestimonialPhoto = createAsyncThunk(
    'testimonials/removePhoto',
    async (testimonialId, { getState, dispatch, rejectWithValue }) => {
        try {
            const state = getState();
            const currentTestimonial = state.testimonials.currentTestimonial ||
                state.testimonials.userTestimonials.find(t => t._id === testimonialId);

            if (!currentTestimonial) {
                return rejectWithValue('Testimonial not found');
            }

            console.log('🗑️ Removing photo from testimonial:', testimonialId);

            // Use the updateTestimonial thunk with removePhoto flag
            const testimonialData = {
                name: currentTestimonial.name,
                rating: currentTestimonial.rating,
                content: currentTestimonial.content
            };

            const result = await dispatch(updateTestimonial({
                testimonialId,
                testimonialData,
                removePhoto: true
            })).unwrap();

            return result;

        } catch (error) {
            console.error('🗑️ Remove photo error:', error);
            return rejectWithValue(error.message || 'Failed to remove photo');
        }
    }
);

// ==================== INITIAL STATE ====================

const initialState = {
    // Public testimonials (for display)
    publicTestimonials: [],
    featuredTestimonials: [],

    // User's testimonials
    userTestimonials: [],

    // Current testimonial being edited
    currentTestimonial: null,

    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,

    // Loading states
    loading: false,
    publicLoading: false,
    userLoading: false,
    creating: false,
    updating: false,
    deleting: false,
    removingPhoto: false,

    // Error states
    error: null,
    publicError: null,
    userError: null,

    // UI states
    showForm: false,
    isEditing: false,

    // Form state
    form: {
        name: '',
        rating: 5,
        content: '',
        photo: null,
        photoPreview: null
    }
};

// ==================== HELPER FUNCTIONS ====================

const calculateReviewStats = (testimonials) => {
    if (!testimonials || testimonials.length === 0) {
        return {
            totalTestimonials: 0,
            averageRating: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
    }

    const totalTestimonials = testimonials.length;
    const totalRating = testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 0), 0);
    const averageRating = totalRating / totalTestimonials;

    const ratingDistribution = testimonials.reduce((dist, testimonial) => {
        const rating = testimonial.rating || 1;
        dist[rating] = (dist[rating] || 0) + 1;
        return dist;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    return {
        totalTestimonials,
        averageRating: Math.round(averageRating * 100) / 100,
        ratingDistribution
    };
};

// ==================== SLICE ====================

const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {
        // ===== UI STATE MANAGEMENT =====
        setShowForm: (state, action) => {
            state.showForm = action.payload;
            if (!action.payload) {
                // Reset form when closing
                state.form = {
                    name: '',
                    rating: 5,
                    content: '',
                    photo: null,
                    photoPreview: null
                };
                state.isEditing = false;
                state.currentTestimonial = null;
            }
        },

        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
            if (!action.payload) {
                state.currentTestimonial = null;
            }
        },

        setCurrentTestimonial: (state, action) => {
            state.currentTestimonial = action.payload;
            if (action.payload) {
                state.form = {
                    name: action.payload.name || '',
                    rating: action.payload.rating || 5,
                    content: action.payload.content || '',
                    photo: null,
                    photoPreview: action.payload.photo || null
                };
                state.isEditing = true;
                state.showForm = true;
            }
        },

        // ===== FORM MANAGEMENT =====
        updateForm: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },

        setFormPhoto: (state, action) => {
            const { file, preview } = action.payload;
            state.form.photo = file;
            state.form.photoPreview = preview;
        },

        removeFormPhoto: (state) => {
            state.form.photo = null;
            state.form.photoPreview = null;
        },

        resetForm: (state) => {
            state.form = {
                name: '',
                rating: 5,
                content: '',
                photo: null,
                photoPreview: null
            };
            state.isEditing = false;
            state.currentTestimonial = null;
        },

        // ===== PAGINATION =====
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        // ===== ERROR MANAGEMENT =====
        clearError: (state) => {
            state.error = null;
            state.publicError = null;
            state.userError = null;
        },

        clearPublicError: (state) => {
            state.publicError = null;
        },

        clearUserError: (state) => {
            state.userError = null;
        }
    },

    extraReducers: (builder) => {
        builder
            // ===== FETCH PUBLIC TESTIMONIALS =====
            .addCase(fetchPublicTestimonials.pending, (state) => {
                state.publicLoading = true;
                state.publicError = null;
            })
            .addCase(fetchPublicTestimonials.fulfilled, (state, action) => {
                const { testimonials, pagination, featured } = action.payload;

                if (featured) {
                    state.featuredTestimonials = testimonials || [];
                } else {
                    state.publicTestimonials = testimonials || [];
                    if (pagination) {
                        state.currentPage = pagination.currentPage;
                        state.totalPages = pagination.totalPages;
                        state.totalCount = pagination.totalCount;
                        state.hasNextPage = pagination.hasNextPage;
                        state.hasPreviousPage = pagination.hasPreviousPage;
                    }
                }

                state.publicLoading = false;
                state.publicError = null;
                console.log('📝 Public testimonials loaded successfully:', testimonials?.length || 0);
            })
            .addCase(fetchPublicTestimonials.rejected, (state, action) => {
                state.publicLoading = false;
                state.publicError = action.payload;
                console.error('📝 Public testimonials fetch failed:', action.payload);
            })

            // ===== FETCH USER TESTIMONIALS =====
            .addCase(fetchUserTestimonials.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            .addCase(fetchUserTestimonials.fulfilled, (state, action) => {
                state.userTestimonials = action.payload.testimonials || [];
                state.userLoading = false;
                state.userError = null;
                console.log('📝 User testimonials loaded successfully:', state.userTestimonials.length);
            })
            .addCase(fetchUserTestimonials.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
                console.error('📝 User testimonials fetch failed:', action.payload);
            })

            // ===== CREATE TESTIMONIAL =====
            .addCase(createTestimonial.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createTestimonial.fulfilled, (state, action) => {
                const newTestimonial = action.payload.testimonial;
                if (newTestimonial) {
                    state.userTestimonials.unshift(newTestimonial);
                }

                // Reset form and UI
                state.form = {
                    name: '',
                    rating: 5,
                    content: '',
                    photo: null,
                    photoPreview: null
                };
                state.showForm = false;
                state.creating = false;
                state.error = null;

                console.log('📝 Testimonial created successfully:', newTestimonial?._id);
            })
            .addCase(createTestimonial.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
                console.error('📝 Create testimonial failed:', action.payload);
            })

            // ===== UPDATE TESTIMONIAL =====
            .addCase(updateTestimonial.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                const updatedTestimonial = action.payload.testimonial;

                if (updatedTestimonial) {
                    // Update in user testimonials
                    const userIndex = state.userTestimonials.findIndex(t => t._id === updatedTestimonial._id);
                    if (userIndex !== -1) {
                        state.userTestimonials[userIndex] = updatedTestimonial;
                    }

                    // Update current testimonial if it matches
                    if (state.currentTestimonial?._id === updatedTestimonial._id) {
                        state.currentTestimonial = updatedTestimonial;
                    }

                    // Update in public testimonials if it exists there
                    const publicIndex = state.publicTestimonials.findIndex(t => t._id === updatedTestimonial._id);
                    if (publicIndex !== -1) {
                        state.publicTestimonials[publicIndex] = updatedTestimonial;
                    }
                }

                // Reset form and UI
                state.form = {
                    name: '',
                    rating: 5,
                    content: '',
                    photo: null,
                    photoPreview: null
                };
                state.showForm = false;
                state.isEditing = false;
                state.currentTestimonial = null;
                state.updating = false;
                state.error = null;

                console.log('📝 Testimonial updated successfully:', updatedTestimonial?._id);
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
                console.error('📝 Update testimonial failed:', action.payload);
            })

            // ===== DELETE TESTIMONIAL =====
            .addCase(deleteTestimonial.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                const testimonialId = action.payload;

                // Remove from user testimonials
                state.userTestimonials = state.userTestimonials.filter(t => t._id !== testimonialId);

                // Remove from public testimonials
                state.publicTestimonials = state.publicTestimonials.filter(t => t._id !== testimonialId);

                // Clear current testimonial if it was the deleted one
                if (state.currentTestimonial?._id === testimonialId) {
                    state.currentTestimonial = null;
                }

                state.deleting = false;
                state.error = null;

                console.log('📝 Testimonial deleted successfully:', testimonialId);
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
                console.error('📝 Delete testimonial failed:', action.payload);
            })

            // ===== REMOVE PHOTO =====
            .addCase(removeTestimonialPhoto.pending, (state) => {
                state.removingPhoto = true;
                state.error = null;
            })
            .addCase(removeTestimonialPhoto.fulfilled, (state, action) => {
                const updatedTestimonial = action.payload.testimonial;

                if (updatedTestimonial) {
                    // Update in user testimonials
                    const userIndex = state.userTestimonials.findIndex(t => t._id === updatedTestimonial._id);
                    if (userIndex !== -1) {
                        state.userTestimonials[userIndex] = updatedTestimonial;
                    }

                    // Update current testimonial if it matches
                    if (state.currentTestimonial?._id === updatedTestimonial._id) {
                        state.currentTestimonial = updatedTestimonial;
                    }

                    // Update form photo preview if editing this testimonial
                    if (state.isEditing && state.currentTestimonial?._id === updatedTestimonial._id) {
                        state.form.photoPreview = null;
                    }
                }

                state.removingPhoto = false;
                state.error = null;

                console.log('🗑️ Photo removed successfully from testimonial:', updatedTestimonial?._id);
            })
            .addCase(removeTestimonialPhoto.rejected, (state, action) => {
                state.removingPhoto = false;
                state.error = action.payload;
                console.error('🗑️ Remove photo failed:', action.payload);
            });
    }
});

// ==================== EXPORTS ====================

// Action creators
export const {
    setShowForm,
    setIsEditing,
    setCurrentTestimonial,
    updateForm,
    setFormPhoto,
    removeFormPhoto,
    resetForm,
    setCurrentPage,
    clearError,
    clearPublicError,
    clearUserError
} = testimonialSlice.actions;

// Selectors
export const selectPublicTestimonials = (state) => state.testimonials.publicTestimonials;
export const selectFeaturedTestimonials = (state) => state.testimonials.featuredTestimonials;
export const selectUserTestimonials = (state) => state.testimonials.userTestimonials;
export const selectCurrentTestimonial = (state) => state.testimonials.currentTestimonial;
export const selectTestimonialForm = (state) => state.testimonials.form;
export const selectTestimonialLoading = (state) => state.testimonials.loading;
export const selectPublicLoading = (state) => state.testimonials.publicLoading;
export const selectUserLoading = (state) => state.testimonials.userLoading;
export const selectCreating = (state) => state.testimonials.creating;
export const selectUpdating = (state) => state.testimonials.updating;
export const selectDeleting = (state) => state.testimonials.deleting;
export const selectRemovingPhoto = (state) => state.testimonials.removingPhoto;
export const selectTestimonialError = (state) => state.testimonials.error;
export const selectPublicError = (state) => state.testimonials.publicError;
export const selectUserError = (state) => state.testimonials.userError;
export const selectShowForm = (state) => state.testimonials.showForm;
export const selectIsEditing = (state) => state.testimonials.isEditing;
export const selectTestimonialPagination = (state) => ({
    currentPage: state.testimonials.currentPage,
    totalPages: state.testimonials.totalPages,
    totalCount: state.testimonials.totalCount,
    hasNextPage: state.testimonials.hasNextPage,
    hasPreviousPage: state.testimonials.hasPreviousPage
});

// Complex selectors
export const selectCanUserTestify = (state) => {
    const isAuthenticated = state.user.isAuthenticated;
    const userId = state.user.data?._id;
    return isAuthenticated && userId;
};

export const selectUserHasTestimonial = (state) => {
    return state.testimonials.userTestimonials.length > 0;
};

export const selectTestimonialFormValid = (state) => {
    const { name, content, rating } = state.testimonials.form;
    return name.trim().length > 0 &&
        content.trim().length >= 10 &&
        rating >= 1 && rating <= 5;
};

export const selectTestimonialStats = (state) => {
    return calculateReviewStats(state.testimonials.publicTestimonials);
};

export default testimonialSlice.reducer;