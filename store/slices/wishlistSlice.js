// // store/slices/wishlistSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// // Async thunks
// export const fetchWishlistData = createAsyncThunk(
//     'wishlist/fetchWishlistData',
//     async (_, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//             const response = await axios.post('/api/wishlist', { token });
//             return response.data.data.wishlist;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
//         }
//     }
// );
//
// export const addToWishlist = createAsyncThunk(
//     'wishlist/addToWishlist',
//     async ({ productId, qty = 1 }, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//             const response = await axios.post('/api/wishlist/add', { productId, qty, token });
//             return response.data.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
//         }
//     }
// );
//
// export const removeFromWishlist = createAsyncThunk(
//     'wishlist/removeFromWishlist',
//     async (productId, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//             const response = await axios.post('/api/wishlist/delete', { productId, token });
//             return response.data.newWishlist;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
//         }
//     }
// );
//
// const initialState = {
//     items: [],
//     _id: null,
//     loading: false,
//     error: null,
// };
//
// const wishlistSlice = createSlice({
//     name: 'wishlist',
//     initialState,
//     reducers: {
//         addItemToWishlist: (state, action) => {
//             const newItem = action.payload;
//             if (!state.items) state.items = [];
//
//             const existingItem = state.items.find(
//                 (item) => item.productId?._id === newItem.productId?._id
//             );
//
//             if (!existingItem) {
//                 state.items.push(newItem);
//             }
//         },
//         removeItemFromWishlist: (state, action) => {
//             const { productId } = action.payload;
//
//             if (state.items.length === 1) {
//                 state.items = [];
//             } else {
//                 state.items = state.items.filter(
//                     (item) => item.productId?._id !== productId
//                 );
//             }
//         },
//         clearWishlist: (state) => {
//             state.items = [];
//             state._id = null;
//         },
//         clearError: (state) => {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchWishlistData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchWishlistData.fulfilled, (state, action) => {
//                 const wishlist = action.payload;
//                 if (wishlist && wishlist.items) {
//                     state.items = wishlist.items;
//                     state._id = wishlist._id;
//                 }
//                 state.loading = false;
//             })
//             .addCase(fetchWishlistData.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(addToWishlist.fulfilled, (state, action) => {
//                 // Optionally refresh wishlist data
//             })
//             .addCase(addToWishlist.rejected, (state, action) => {
//                 state.error = action.payload;
//             })
//             .addCase(removeFromWishlist.fulfilled, (state, action) => {
//                 // Optionally refresh wishlist data
//             })
//             .addCase(removeFromWishlist.rejected, (state, action) => {
//                 state.error = action.payload;
//             });
//     },
// });
//
// export const {
//     addItemToWishlist,
//     removeItemFromWishlist,
//     clearWishlist,
//     clearError,
// } = wishlistSlice.actions;
//
// export default wishlistSlice.reducer;

// store/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchWishlistData = createAsyncThunk(
    'wishlist/fetchWishlistData',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            console.log('❤️ Fetching wishlist data with token:', !!token);
            const response = await axios.post('/api/wishlist', { token });
            console.log('❤️ wishlist fetch response:', response.data);

            return response.data.data.wishlist;
        } catch (error) {
            console.error('❤️ wishlist fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
        }
    }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async ({ productId, qty = 1 }, { getState, dispatch, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            console.log('❤️ Adding to wishlist:', { productId, qty });
            const response = await axios.post('/api/wishlist/add', { productId, qty, token });
            console.log('❤️ Add to wishlist response:', response.data);

            // Refetch wishlist data to get updated wishlist with populated product data
            dispatch(fetchWishlistData());

            return response.data.data;
        } catch (error) {
            console.error('❤️ Add to wishlist error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId, { getState, dispatch, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            console.log('❤️ Removing from wishlist:', productId);
            const response = await axios.post('/api/wishlist/delete', { productId, token });
            console.log('❤️ Remove from wishlist response:', response.data);

            // Refetch wishlist data to get updated wishlist
            dispatch(fetchWishlistData());

            return response.data.newWishlist;
        } catch (error) {
            console.error('❤️ Remove from wishlist error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
        }
    }
);

export const toggleWishlistItem = createAsyncThunk(
    'wishlist/toggleWishlistItem',
    async ({ productId, qty = 1 }, { getState, dispatch, rejectWithValue }) => {
        try {
            const wishlistItems = getState().wishlist.items;
            const existingItem = wishlistItems.find(item =>
                item.productId?._id === productId || item.productId === productId
            );

            if (existingItem) {
                // Remove from wishlist
                return await dispatch(removeFromWishlist(productId)).unwrap();
            } else {
                // Add to wishlist
                return await dispatch(addToWishlist({ productId, qty })).unwrap();
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to toggle wishlist item');
        }
    }
);

const initialState = {
    items: [],
    totalItems: 0,
    _id: null,
    status: 'idle', // idle, loading, succeeded, failed
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist: (state, action) => {
            const newItem = action.payload;
            if (!state.items) state.items = [];

            const existingItem = state.items.find(
                (item) => item.productId?._id === newItem.productId?._id
            );

            if (!existingItem) {
                state.items.push(newItem);
                state.totalItems = state.items.length;
            }
        },
        removeItemFromWishlist: (state, action) => {
            const { productId } = action.payload;

            if (state.items.length === 1) {
                state.items = [];
                state.totalItems = 0;
            } else {
                state.items = state.items.filter(
                    (item) => item.productId?._id !== productId
                );
                state.totalItems = state.items.length;
            }
        },
        clearWishlist: (state) => {
            state.items = [];
            state.totalItems = 0;
            state._id = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateWishlistItemQuantity: (state, action) => {
            const { productId, qty } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId?._id === productId
            );

            if (existingItem) {
                existingItem.qty = qty;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch wishlist data
            .addCase(fetchWishlistData.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchWishlistData.fulfilled, (state, action) => {
                const wishlist = action.payload;
                console.log('❤️ wishlist data fetched successfully:', wishlist);

                if (wishlist && wishlist.items) {
                    state.items = wishlist.items;
                    state._id = wishlist._id;
                    state.totalItems = wishlist.items.length;
                } else {
                    // Empty wishlist
                    state.items = [];
                    state.totalItems = 0;
                    state._id = wishlist?._id || null;
                }

                state.loading = false;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload;
                console.error('❤️ wishlist fetch failed:', action.payload);
            })
            // Add to wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Note: fetchWishlistData will be called automatically to refresh data
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Note: fetchWishlistData will be called automatically to refresh data
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Toggle wishlist item
            .addCase(toggleWishlistItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleWishlistItem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(toggleWishlistItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    addItemToWishlist,
    removeItemFromWishlist,
    clearWishlist,
    clearError,
    updateWishlistItemQuantity,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistItemById = (state, productId) =>
    state.wishlist.items.find(item =>
        item.productId?._id === productId || item.productId === productId
    );
export const selectIsInWishlist = (state, productId) =>
    state.wishlist.items.some(item =>
        item.productId?._id === productId || item.productId === productId
    );
export const selectWishlistLoading = (state) => state.wishlist.loading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectWishlistTotalItems = (state) => state.wishlist.totalItems;

export default wishlistSlice.reducer;