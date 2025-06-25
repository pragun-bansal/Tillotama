// store/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchWishlistData = createAsyncThunk(
    'wishlist/fetchWishlistData',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/wishlist', { token });
            return response.data.data.wishlist;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
        }
    }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async ({ productId, qty = 1 }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/wishlist/add', { productId, qty, token });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/wishlist/delete', { productId, token });
            return response.data.newWishlist;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
        }
    }
);

const initialState = {
    items: [],
    _id: null,
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
            }
        },
        removeItemFromWishlist: (state, action) => {
            const { productId } = action.payload;

            if (state.items.length === 1) {
                state.items = [];
            } else {
                state.items = state.items.filter(
                    (item) => item.productId?._id !== productId
                );
            }
        },
        clearWishlist: (state) => {
            state.items = [];
            state._id = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlistData.fulfilled, (state, action) => {
                const wishlist = action.payload;
                if (wishlist && wishlist.items) {
                    state.items = wishlist.items;
                    state._id = wishlist._id;
                }
                state.loading = false;
            })
            .addCase(fetchWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                // Optionally refresh wishlist data
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                // Optionally refresh wishlist data
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    addItemToWishlist,
    removeItemFromWishlist,
    clearWishlist,
    clearError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
