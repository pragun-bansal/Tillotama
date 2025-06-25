// store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchCartData = createAsyncThunk(
    'cart/fetchCartData',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/cart', { token });
            return response.data.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, qty }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/cart/add', { productId, qty, token });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.post('/api/cart/delete', { productId, token });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
        }
    }
);

const initialState = {
    items: [],
    totalCost: 0,
    _id: null,
    loading: false,
    changed: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart: (state, action) => {
            const cart_res = action.payload;
            if (cart_res && cart_res.items) {
                const cartTotal = cart_res.items.reduce((total, item) =>
                    total + (item.qty * (item.productId?.price || 0)), 0);
                state.totalCost = cartTotal;
                state._id = cart_res._id;
                state.items = cart_res.items;
                state.loading = false;
                state.changed = true;
            }
        },
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            if (!state.items) state.items = [];

            const existingItemIndex = state.items.findIndex(
                (item) => item.productId?._id === newItem.productId?._id
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].qty = newItem.qty;
            } else {
                state.items.push(newItem);
            }

            state.totalCost = state.items.reduce((total, item) =>
                total + (item.qty * (item.productId?.price || 0)), 0);
        },
        increaseItemQuantity: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId?._id === productId
            );

            if (existingItem) {
                existingItem.qty += 1;
                state.totalCost = state.items.reduce((total, item) =>
                    total + (item.qty * (item.productId?.price || 0)), 0);
            }
        },
        decreaseItemQuantity: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId?._id === productId
            );

            if (existingItem && existingItem.qty > 1) {
                existingItem.qty -= 1;
                state.totalCost = state.items.reduce((total, item) =>
                    total + (item.qty * (item.productId?.price || 0)), 0);
            }
        },
        removeItemCompletelyFromCart: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(
                (item) => item.productId?._id !== productId
            );

            if (state.items.length === 0) {
                state.totalCost = 0;
            } else {
                state.totalCost = state.items.reduce((total, item) =>
                    total + (item.qty * (item.productId?.price || 0)), 0);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalCost = 0;
            state._id = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                const cart = action.payload;
                if (cart && cart.items) {
                    state.items = cart.items;
                    state._id = cart._id;
                    state.totalCost = cart.items.reduce((total, item) =>
                        total + (item.qty * (item.productId?.price || 0)), 0);
                }
                state.loading = false;
                state.changed = true;
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                // Refresh cart data after successful add
                state.changed = true;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                // Refresh cart data after successful remove
                state.changed = true;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    replaceCart,
    addItemToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemCompletelyFromCart,
    clearCart,
    clearError,
} = cartSlice.actions;

export default cartSlice.reducer;