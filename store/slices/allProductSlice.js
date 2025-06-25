// store/slices/allProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchAllProducts = createAsyncThunk(
    'allProducts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/products');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'allProducts/fetchById',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

export const createProduct = createAsyncThunk(
    'allProducts/create',
    async (productData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            // Append basic fields
            Object.keys(productData).forEach(key => {
                if (key !== 'images') {
                    if (typeof productData[key] === 'object') {
                        formData.append(key, JSON.stringify(productData[key]));
                    } else {
                        formData.append(key, productData[key]);
                    }
                }
            });

            // Append images
            if (productData.images) {
                productData.images.forEach(image => {
                    formData.append('all_images', image);
                });
            }

            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

const initialState = {
    items: [],
    currentProduct: null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    totalCount: 0,
    filters: {
        category: '',
        priceRange: [0, 1000],
        search: '',
    },
};

const allProductSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: '',
                priceRange: [0, 1000],
                search: '',
            };
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.totalCount = action.payload.length;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Create product
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.totalCount += 1;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {
    setFilters,
    clearFilters,
    setCurrentProduct,
    clearCurrentProduct,
    clearError,
} = allProductSlice.actions;

export default allProductSlice.reducer;