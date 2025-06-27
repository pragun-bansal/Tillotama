// // // // store/slices/allProductSlice.js
// // // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // // import axios from 'axios';
// // //
// // // // Async thunks
// // // export const fetchAllProducts = createAsyncThunk(
// // //     'allproducts/fetchAll',
// // //     async (_, { rejectWithValue }) => {
// // //         try {
// // //             const response = await axios.get('/api/products');
// // //             return response.data.data;
// // //         } catch (error) {
// // //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
// // //         }
// // //     }
// // // );
// // //
// // // export const fetchProductById = createAsyncThunk(
// // //     'allproducts/fetchById',
// // //     async (productId, { rejectWithValue }) => {
// // //         try {
// // //             const response = await axios.get(`/api/products/${productId}`);
// // //             return response.data.data;
// // //         } catch (error) {
// // //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
// // //         }
// // //     }
// // // );
// // //
// // // export const createProduct = createAsyncThunk(
// // //     'allproducts/create',
// // //     async (productData, { rejectWithValue }) => {
// // //         try {
// // //             const formData = new FormData();
// // //
// // //             // Append basic fields
// // //             Object.keys(productData).forEach(key => {
// // //                 if (key !== 'images') {
// // //                     if (typeof productData[key] === 'object') {
// // //                         formData.append(key, JSON.stringify(productData[key]));
// // //                     } else {
// // //                         formData.append(key, productData[key]);
// // //                     }
// // //                 }
// // //             });
// // //
// // //             // Append images
// // //             if (productData.images) {
// // //                 productData.images.forEach(image => {
// // //                     formData.append('all_images', image);
// // //                 });
// // //             }
// // //
// // //             const response = await axios.post('/api/products', formData, {
// // //                 headers: {
// // //                     'Content-Type': 'multipart/form-data',
// // //                 },
// // //             });
// // //
// // //             return response.data;
// // //         } catch (error) {
// // //             return rejectWithValue(error.response?.data?.message || 'Failed to create product');
// // //         }
// // //     }
// // // );
// // //
// // // const initialState = {
// // //     items: [],
// // //     currentProduct: null,
// // //     status: 'idle', // idle, loading, succeeded, failed
// // //     error: null,
// // //     totalCount: 0,
// // //     filters: {
// // //         category: '',
// // //         priceRange: [0, 1000],
// // //         search: '',
// // //     },
// // // };
// // //
// // // const allProductSlice = createSlice({
// // //     name: 'allProducts',
// // //     initialState,
// // //     reducers: {
// // //         setFilters: (state, action) => {
// // //             state.filters = { ...state.filters, ...action.payload };
// // //         },
// // //         clearFilters: (state) => {
// // //             state.filters = {
// // //                 category: '',
// // //                 priceRange: [0, 1000],
// // //                 search: '',
// // //             };
// // //         },
// // //         setCurrentProduct: (state, action) => {
// // //             state.currentProduct = action.payload;
// // //         },
// // //         clearCurrentProduct: (state) => {
// // //             state.currentProduct = null;
// // //         },
// // //         clearError: (state) => {
// // //             state.error = null;
// // //         },
// // //     },
// // //     extraReducers: (builder) => {
// // //         builder
// // //             // Fetch all products
// // //             .addCase(fetchAllProducts.pending, (state) => {
// // //                 state.status = 'loading';
// // //                 state.error = null;
// // //             })
// // //             .addCase(fetchAllProducts.fulfilled, (state, action) => {
// // //                 state.items = action.payload;
// // //                 state.totalCount = action.payload.length;
// // //                 state.status = 'succeeded';
// // //                 state.error = null;
// // //             })
// // //             .addCase(fetchAllProducts.rejected, (state, action) => {
// // //                 state.status = 'failed';
// // //                 state.error = action.payload;
// // //             })
// // //             // Fetch product by ID
// // //             .addCase(fetchProductById.pending, (state) => {
// // //                 state.status = 'loading';
// // //                 state.error = null;
// // //             })
// // //             .addCase(fetchProductById.fulfilled, (state, action) => {
// // //                 state.currentProduct = action.payload;
// // //                 state.status = 'succeeded';
// // //                 state.error = null;
// // //             })
// // //             .addCase(fetchProductById.rejected, (state, action) => {
// // //                 state.status = 'failed';
// // //                 state.error = action.payload;
// // //             })
// // //             // Create product
// // //             .addCase(createProduct.pending, (state) => {
// // //                 state.status = 'loading';
// // //                 state.error = null;
// // //             })
// // //             .addCase(createProduct.fulfilled, (state, action) => {
// // //                 state.items.push(action.payload);
// // //                 state.totalCount += 1;
// // //                 state.status = 'succeeded';
// // //                 state.error = null;
// // //             })
// // //             .addCase(createProduct.rejected, (state, action) => {
// // //                 state.status = 'failed';
// // //                 state.error = action.payload;
// // //             });
// // //     },
// // // });
// // //
// // // export const {
// // //     setFilters,
// // //     clearFilters,
// // //     setCurrentProduct,
// // //     clearCurrentProduct,
// // //     clearError,
// // // } = allProductSlice.actions;
// // //
// // // export default allProductSlice.reducer;
// // // store/slices/allProductSlice.ts
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// //
// // // Async thunks
// // export const fetchAllProducts = createAsyncThunk(
// //     'allproducts/fetchAll',
// //     async (_, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.get('/api/products');
// //             console.log('Products fetch response:', response.data);
// //             return response.data.data;
// //         } catch (error: any) {
// //             console.error('Products fetch error:', error);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
// //         }
// //     }
// // );
// //
// // export const fetchProductById = createAsyncThunk(
// //     'allproducts/fetchById',
// //     async (productId: string, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.get(`/api/products/${productId}`);
// //             console.log('Product by ID fetch response:', response.data);
// //             return response.data.data;
// //         } catch (error: any) {
// //             console.error('Product by ID fetch error:', error);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
// //         }
// //     }
// // );
// //
// // export const createProduct = createAsyncThunk(
// //     'allproducts/create',
// //     async (productData: any, { rejectWithValue }) => {
// //         try {
// //             const formData = new FormData();
// //
// //             // Append basic fields
// //             Object.keys(productData).forEach(key => {
// //                 if (key !== 'images') {
// //                     if (typeof productData[key] === 'object') {
// //                         formData.append(key, JSON.stringify(productData[key]));
// //                     } else {
// //                         formData.append(key, productData[key]);
// //                     }
// //                 }
// //             });
// //
// //             // Append images
// //             if (productData.images) {
// //                 productData.images.forEach((image: File) => {
// //                     formData.append('all_images', image);
// //                 });
// //             }
// //
// //             const response = await axios.post('/api/products', formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                 },
// //             });
// //
// //             console.log('Create product response:', response.data);
// //             return response.data;
// //         } catch (error: any) {
// //             console.error('Create product error:', error);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to create product');
// //         }
// //     }
// // );
// //
// // interface Product {
// //     _id: string;
// //     name: string;
// //     price: number;
// //     // Add other product properties as needed
// // }
// //
// // interface ProductState {
// //     items: Product[];
// //     currentProduct: Product | null;
// //     status: string;
// //     error: string | null;
// //     totalCount: number;
// //     filters: {
// //         category: string;
// //         priceRange: [number, number];
// //         search: string;
// //     };
// // }
// //
// // const initialState: ProductState = {
// //     items: [],
// //     currentProduct: null,
// //     status: 'idle', // idle, loading, succeeded, failed
// //     error: null,
// //     totalCount: 0,
// //     filters: {
// //         category: '',
// //         priceRange: [0, 1000],
// //         search: '',
// //     },
// // };
// //
// // const allProductSlice = createSlice({
// //     name: 'allProducts',
// //     initialState,
// //     reducers: {
// //         setFilters: (state, action) => {
// //             state.filters = { ...state.filters, ...action.payload };
// //         },
// //         clearFilters: (state) => {
// //             state.filters = {
// //                 category: '',
// //                 priceRange: [0, 1000],
// //                 search: '',
// //             };
// //         },
// //         setCurrentProduct: (state, action) => {
// //             state.currentProduct = action.payload;
// //         },
// //         clearCurrentProduct: (state) => {
// //             state.currentProduct = null;
// //         },
// //         clearError: (state) => {
// //             state.error = null;
// //         },
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             // Fetch all products
// //             .addCase(fetchAllProducts.pending, (state) => {
// //                 state.status = 'loading';
// //                 state.error = null;
// //             })
// //             .addCase(fetchAllProducts.fulfilled, (state, action) => {
// //                 state.items = action.payload || [];
// //                 state.totalCount = action.payload?.length || 0;
// //                 state.status = 'succeeded';
// //                 state.error = null;
// //                 console.log('Products loaded:', state.items.length);
// //             })
// //             .addCase(fetchAllProducts.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.payload as string;
// //                 console.error('Products load failed:', action.payload);
// //             })
// //             // Fetch product by ID
// //             .addCase(fetchProductById.pending, (state) => {
// //                 state.status = 'loading';
// //                 state.error = null;
// //             })
// //             .addCase(fetchProductById.fulfilled, (state, action) => {
// //                 state.currentProduct = action.payload;
// //                 state.status = 'succeeded';
// //                 state.error = null;
// //                 console.log('Current product loaded:', action.payload?._id);
// //             })
// //             .addCase(fetchProductById.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.payload as string;
// //                 console.error('Product by ID load failed:', action.payload);
// //             })
// //             // Create product
// //             .addCase(createProduct.pending, (state) => {
// //                 state.status = 'loading';
// //                 state.error = null;
// //             })
// //             .addCase(createProduct.fulfilled, (state, action) => {
// //                 state.items.push(action.payload);
// //                 state.totalCount += 1;
// //                 state.status = 'succeeded';
// //                 state.error = null;
// //                 console.log('Product created:', action.payload._id);
// //             })
// //             .addCase(createProduct.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.payload as string;
// //                 console.error('Product creation failed:', action.payload);
// //             });
// //     },
// // });
// //
// // export const {
// //     setFilters,
// //     clearFilters,
// //     setCurrentProduct,
// //     clearCurrentProduct,
// //     clearError,
// // } = allProductSlice.actions;
// //
// // export default allProductSlice.reducer;
//
// // store/slices/allProductSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// // ==================== INTERFACES ====================
//
// interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     description: string;
//     category: string[];
//     tagline: string;
//     stock: number;
//     sizes: string[];
//     colors: string[];
//     all_images: string[];
//     reviews: string[];
//     createdAt: string;
//     updatedAt: string;
//     averageRating?: number;
//     totalReviews?: number;
// }
//
// interface ProductFilters {
//     category: string;
//     priceRange: [number, number];
//     search: string;
//     sortBy: 'name' | 'price' | 'createdAt' | 'stock' | 'averageRating';
//     sortOrder: 'asc' | 'desc';
//     inStock: boolean;
//     minRating: number;
// }
//
// interface ProductState {
//     // Product data
//     items: Product[];
//     filteredItems: Product[];
//     currentProduct: Product | null;
//
//     // Categories and metadata
//     categories: string[];
//     brands: string[];
//     totalCount: number;
//
//     // State management
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     loading: boolean;
//     error: string | null;
//
//     // Filters and search
//     filters: ProductFilters;
//     searchResults: Product[];
//     lastSearchQuery: string;
//
//     // Pagination
//     currentPage: number;
//     itemsPerPage: number;
//     totalPages: number;
//
//     // Cache management
//     lastFetchTime: number | null;
//     cacheTimeout: number; // 5 minutes in milliseconds
// }
//
// // ==================== ASYNC THUNKS ====================
//
// export const fetchAllProducts = createAsyncThunk(
//     'allProducts/fetchAll',
//     async (options?: { forceRefresh?: boolean }, { getState, rejectWithValue }) => {
//         try {
//             const state = getState() as any;
//             const currentTime = Date.now();
//             const lastFetch = state.allProducts.lastFetchTime;
//             const cacheTimeout = state.allProducts.cacheTimeout;
//
//             // Check if we need to fetch (cache is expired or force refresh)
//             if (!options?.forceRefresh && lastFetch && (currentTime - lastFetch) < cacheTimeout) {
//                 console.log('📦 Using cached products data');
//                 return state.allProducts.items;
//             }
//
//             console.log('📦 Fetching all products from API...');
//             const response = await axios.get('/api/products');
//             console.log('📦 Products fetch response:', response.data);
//
//             if (response.data.success || response.data.data) {
//                 return response.data.data || response.data.products || [];
//             }
//
//             return [];
//         } catch (error: any) {
//             console.error('📦 Products fetch error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
//         }
//     }
// );
//
// export const fetchProductById = createAsyncThunk(
//     'allProducts/fetchById',
//     async (productId: string, { rejectWithValue }) => {
//         try {
//             if (!productId) {
//                 return rejectWithValue('Product ID is required');
//             }
//
//             console.log('📦 Fetching product by ID:', productId);
//             const response = await axios.get(`/api/products/${productId}`);
//             console.log('📦 Product by ID fetch response:', response.data);
//
//             if (response.data.success || response.data.data) {
//                 return response.data.data || response.data.product;
//             }
//
//             return rejectWithValue('Product not found');
//         } catch (error: any) {
//             console.error('📦 Product by ID fetch error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
//         }
//     }
// );
//
// export const createProduct = createAsyncThunk(
//     'allProducts/create',
//     async (productData: any, { rejectWithValue }) => {
//         try {
//             console.log('📦 Creating product:', productData);
//             const formData = new FormData();
//
//             // Append basic fields
//             Object.keys(productData).forEach(key => {
//                 if (key !== 'images' && key !== 'all_images') {
//                     if (Array.isArray(productData[key])) {
//                         formData.append(key, JSON.stringify(productData[key]));
//                     } else if (typeof productData[key] === 'object' && productData[key] !== null) {
//                         formData.append(key, JSON.stringify(productData[key]));
//                     } else {
//                         formData.append(key, productData[key]);
//                     }
//                 }
//             });
//
//             // Append images
//             const images = productData.images || productData.all_images;
//             if (images && images.length > 0) {
//                 images.forEach((image: File) => {
//                     formData.append('all_images', image);
//                 });
//             }
//
//             const response = await axios.post('/api/products', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             console.log('📦 Create product response:', response.data);
//
//             if (response.data.success || response.data._id) {
//                 return response.data.data || response.data;
//             }
//
//             return rejectWithValue('Failed to create product');
//         } catch (error: any) {
//             console.error('📦 Create product error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to create product');
//         }
//     }
// );
//
// export const updateProduct = createAsyncThunk(
//     'allProducts/update',
//     async ({ productId, productData }: { productId: string, productData: any }, { rejectWithValue }) => {
//         try {
//             if (!productId) {
//                 return rejectWithValue('Product ID is required');
//             }
//
//             console.log('📦 Updating product:', productId, productData);
//             const formData = new FormData();
//
//             // Append basic fields
//             Object.keys(productData).forEach(key => {
//                 if (key !== 'images' && key !== 'all_images') {
//                     if (Array.isArray(productData[key])) {
//                         formData.append(key, JSON.stringify(productData[key]));
//                     } else if (typeof productData[key] === 'object' && productData[key] !== null) {
//                         formData.append(key, JSON.stringify(productData[key]));
//                     } else {
//                         formData.append(key, productData[key]);
//                     }
//                 }
//             });
//
//             // Append images if provided
//             const images = productData.images || productData.all_images;
//             if (images && images.length > 0) {
//                 images.forEach((image: File) => {
//                     formData.append('all_images', image);
//                 });
//             }
//
//             const response = await axios.put(`/api/products/${productId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             console.log('📦 Update product response:', response.data);
//
//             if (response.data.success || response.data._id) {
//                 return response.data.data || response.data;
//             }
//
//             return rejectWithValue('Failed to update product');
//         } catch (error: any) {
//             console.error('📦 Update product error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to update product');
//         }
//     }
// );
//
// export const deleteProduct = createAsyncThunk(
//     'allProducts/delete',
//     async (productId: string, { rejectWithValue }) => {
//         try {
//             if (!productId) {
//                 return rejectWithValue('Product ID is required');
//             }
//
//             console.log('📦 Deleting product:', productId);
//             const response = await axios.delete(`/api/products/${productId}`);
//             console.log('📦 Delete product response:', response.data);
//
//             if (response.data.success) {
//                 return productId;
//             }
//
//             return rejectWithValue('Failed to delete product');
//         } catch (error: any) {
//             console.error('📦 Delete product error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
//         }
//     }
// );
//
// export const searchProducts = createAsyncThunk(
//     'allProducts/search',
//     async ({ query, filters }: { query?: string, filters?: Partial<ProductFilters> }, { rejectWithValue }) => {
//         try {
//             console.log('📦 Searching products:', { query, filters });
//
//             let url = '/api/products';
//             const params = new URLSearchParams();
//
//             if (query) params.append('search', query);
//             if (filters?.category) params.append('category', filters.category);
//             if (filters?.priceRange) {
//                 params.append('minPrice', filters.priceRange[0].toString());
//                 params.append('maxPrice', filters.priceRange[1].toString());
//             }
//             if (filters?.inStock !== undefined) params.append('inStock', filters.inStock.toString());
//             if (filters?.minRating) params.append('minRating', filters.minRating.toString());
//
//             if (params.toString()) {
//                 url += `?${params.toString()}`;
//             }
//
//             const response = await axios.get(url);
//             console.log('📦 Search products response:', response.data);
//
//             if (response.data.success || response.data.data) {
//                 return {
//                     products: response.data.data || response.data.products || [],
//                     query: query || '',
//                 };
//             }
//
//             return { products: [], query: query || '' };
//         } catch (error: any) {
//             console.error('📦 Search products error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to search products');
//         }
//     }
// );
//
// export const fetchProductsByCategory = createAsyncThunk(
//     'allProducts/fetchByCategory',
//     async (category: string, { rejectWithValue }) => {
//         try {
//             console.log('📦 Fetching products by category:', category);
//             const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`);
//             console.log('📦 Products by category response:', response.data);
//
//             if (response.data.success || response.data.data) {
//                 return response.data.data || response.data.products || [];
//             }
//
//             return [];
//         } catch (error: any) {
//             console.error('📦 Fetch products by category error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch products by category');
//         }
//     }
// );
//
// // ==================== INITIAL STATE ====================
//
// const initialState: ProductState = {
//     // Product data
//     items: [],
//     filteredItems: [],
//     currentProduct: null,
//
//     // Categories and metadata
//     categories: [],
//     brands: [],
//     totalCount: 0,
//
//     // State management
//     status: 'idle',
//     loading: false,
//     error: null,
//
//     // Filters and search
//     filters: {
//         category: '',
//         priceRange: [0, 10000],
//         search: '',
//         sortBy: 'createdAt',
//         sortOrder: 'desc',
//         inStock: false,
//         minRating: 0,
//     },
//     searchResults: [],
//     lastSearchQuery: '',
//
//     // Pagination
//     currentPage: 1,
//     itemsPerPage: 12,
//     totalPages: 1,
//
//     // Cache management
//     lastFetchTime: null,
//     cacheTimeout: 5 * 60 * 1000, // 5 minutes
// };
//
// // ==================== SLICE ====================
//
// const allProductSlice = createSlice({
//     name: 'allProducts',
//     initialState,
//     reducers: {
//         // ===== FILTER MANAGEMENT =====
//         setFilters: (state, action) => {
//             state.filters = { ...state.filters, ...action.payload };
//             console.log('📦 Filters updated:', state.filters);
//             // Apply filters immediately
//             allProductSlice.caseReducers.applyFilters(state);
//         },
//
//         clearFilters: (state) => {
//             state.filters = {
//                 category: '',
//                 priceRange: [0, 10000],
//                 search: '',
//                 sortBy: 'createdAt',
//                 sortOrder: 'desc',
//                 inStock: false,
//                 minRating: 0,
//             };
//             state.filteredItems = [...state.items];
//             state.currentPage = 1;
//             console.log('📦 Filters cleared');
//         },
//
//         applyFilters: (state) => {
//             let filtered = [...state.items];
//
//             // Apply search filter
//             if (state.filters.search.trim()) {
//                 const searchTerm = state.filters.search.toLowerCase().trim();
//                 filtered = filtered.filter(product =>
//                     product.name.toLowerCase().includes(searchTerm) ||
//                     product.description.toLowerCase().includes(searchTerm) ||
//                     product.tagline.toLowerCase().includes(searchTerm) ||
//                     product.category.some(cat => cat.toLowerCase().includes(searchTerm))
//                 );
//             }
//
//             // Apply category filter
//             if (state.filters.category) {
//                 filtered = filtered.filter(product =>
//                     product.category.some(cat =>
//                         cat.toLowerCase() === state.filters.category.toLowerCase()
//                     )
//                 );
//             }
//
//             // Apply price range filter
//             filtered = filtered.filter(product =>
//                 product.price >= state.filters.priceRange[0] &&
//                 product.price <= state.filters.priceRange[1]
//             );
//
//             // Apply stock filter
//             if (state.filters.inStock) {
//                 filtered = filtered.filter(product => product.stock > 0);
//             }
//
//             // Apply rating filter
//             if (state.filters.minRating > 0) {
//                 filtered = filtered.filter(product =>
//                     (product.averageRating || 0) >= state.filters.minRating
//                 );
//             }
//
//             // Apply sorting
//             filtered.sort((a, b) => {
//                 let aValue: any = a[state.filters.sortBy];
//                 let bValue: any = b[state.filters.sortBy];
//
//                 // Handle different data types
//                 if (typeof aValue === 'string') {
//                     aValue = aValue.toLowerCase();
//                     bValue = bValue.toLowerCase();
//                 }
//
//                 if (state.filters.sortOrder === 'asc') {
//                     return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
//                 } else {
//                     return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
//                 }
//             });
//
//             state.filteredItems = filtered;
//             state.totalCount = filtered.length;
//             state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);
//
//             // Reset to first page if current page is out of bounds
//             if (state.currentPage > state.totalPages) {
//                 state.currentPage = 1;
//             }
//
//             console.log('📦 Filters applied:', {
//                 total: state.items.length,
//                 filtered: filtered.length,
//                 filters: state.filters
//             });
//         },
//
//         // ===== PRODUCT MANAGEMENT =====
//         setCurrentProduct: (state, action) => {
//             state.currentProduct = action.payload;
//             console.log('📦 Current product set:', action.payload?._id);
//         },
//
//         clearCurrentProduct: (state) => {
//             state.currentProduct = null;
//             console.log('📦 Current product cleared');
//         },
//
//         updateProductInList: (state, action) => {
//             const updatedProduct = action.payload;
//             const index = state.items.findIndex(item => item._id === updatedProduct._id);
//
//             if (index !== -1) {
//                 state.items[index] = updatedProduct;
//                 console.log('📦 Product updated in list:', updatedProduct._id);
//
//                 // Update current product if it's the same
//                 if (state.currentProduct?._id === updatedProduct._id) {
//                     state.currentProduct = updatedProduct;
//                 }
//
//                 // Reapply filters to update filtered list
//                 allProductSlice.caseReducers.applyFilters(state);
//                 allProductSlice.caseReducers.extractMetadata(state);
//             }
//         },
//
//         removeProductFromList: (state, action) => {
//             const productId = action.payload;
//             state.items = state.items.filter(item => item._id !== productId);
//
//             // Clear current product if it was the deleted one
//             if (state.currentProduct?._id === productId) {
//                 state.currentProduct = null;
//             }
//
//             // Reapply filters and extract metadata
//             allProductSlice.caseReducers.applyFilters(state);
//             allProductSlice.caseReducers.extractMetadata(state);
//
//             console.log('📦 Product removed from list:', productId);
//         },
//
//         // ===== METADATA EXTRACTION =====
//         extractMetadata: (state) => {
//             // Extract unique categories
//             const categorySet = new Set<string>();
//             const brandSet = new Set<string>();
//
//             state.items.forEach(product => {
//                 // Categories
//                 product.category.forEach(cat => {
//                     if (cat.trim()) {
//                         categorySet.add(cat.trim().toLowerCase());
//                     }
//                 });
//
//                 // Extract brands (assuming first category or brand field)
//                 if (product.category.length > 0) {
//                     brandSet.add(product.category[0].trim());
//                 }
//             });
//
//             state.categories = Array.from(categorySet).sort();
//             state.brands = Array.from(brandSet).sort();
//
//             console.log('📦 Metadata extracted:', {
//                 categories: state.categories.length,
//                 brands: state.brands.length
//             });
//         },
//
//         // ===== PAGINATION =====
//         setCurrentPage: (state, action) => {
//             const page = action.payload;
//             if (page >= 1 && page <= state.totalPages) {
//                 state.currentPage = page;
//                 console.log('📦 Page changed to:', page);
//             }
//         },
//
//         setItemsPerPage: (state, action) => {
//             state.itemsPerPage = action.payload;
//             state.totalPages = Math.ceil(state.filteredItems.length / state.itemsPerPage);
//             state.currentPage = 1; // Reset to first page
//             console.log('📦 Items per page changed to:', action.payload);
//         },
//
//         // ===== SEARCH MANAGEMENT =====
//         setSearchResults: (state, action) => {
//             state.searchResults = action.payload.products || [];
//             state.lastSearchQuery = action.payload.query || '';
//             console.log('📦 Search results set:', state.searchResults.length);
//         },
//
//         clearSearchResults: (state) => {
//             state.searchResults = [];
//             state.lastSearchQuery = '';
//             console.log('📦 Search results cleared');
//         },
//
//         // ===== ERROR MANAGEMENT =====
//         clearError: (state) => {
//             state.error = null;
//         },
//
//         // ===== CACHE MANAGEMENT =====
//         invalidateCache: (state) => {
//             state.lastFetchTime = null;
//             console.log('📦 Cache invalidated');
//         },
//
//         setCacheTimeout: (state, action) => {
//             state.cacheTimeout = action.payload;
//             console.log('📦 Cache timeout set to:', action.payload);
//         },
//     },
//
//     // ===== ASYNC REDUCERS =====
//     extraReducers: (builder) => {
//         builder
//             // Fetch all products
//             .addCase(fetchAllProducts.pending, (state) => {
//                 state.status = 'loading';
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllProducts.fulfilled, (state, action) => {
//                 state.items = action.payload || [];
//                 state.filteredItems = action.payload || [];
//                 state.totalCount = action.payload?.length || 0;
//                 state.status = 'succeeded';
//                 state.loading = false;
//                 state.error = null;
//                 state.lastFetchTime = Date.now();
//
//                 // Extract metadata and apply current filters
//                 allProductSlice.caseReducers.extractMetadata(state);
//                 allProductSlice.caseReducers.applyFilters(state);
//
//                 console.log('📦 Products loaded successfully:', state.items.length);
//             })
//             .addCase(fetchAllProducts.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Products load failed:', action.payload);
//             })
//
//             // Fetch product by ID
//             .addCase(fetchProductById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchProductById.fulfilled, (state, action) => {
//                 state.currentProduct = action.payload;
//                 state.loading = false;
//                 state.error = null;
//
//                 // Add to items if not already present
//                 const existingIndex = state.items.findIndex(item => item._id === action.payload._id);
//                 if (existingIndex === -1) {
//                     state.items.push(action.payload);
//                     allProductSlice.caseReducers.applyFilters(state);
//                     allProductSlice.caseReducers.extractMetadata(state);
//                 }
//
//                 console.log('📦 Product loaded by ID:', action.payload._id);
//             })
//             .addCase(fetchProductById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Product by ID load failed:', action.payload);
//             })
//
//             // Create product
//             .addCase(createProduct.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createProduct.fulfilled, (state, action) => {
//                 state.items.push(action.payload);
//                 state.totalCount += 1;
//                 state.loading = false;
//                 state.error = null;
//
//                 // Reapply filters and extract metadata
//                 allProductSlice.caseReducers.applyFilters(state);
//                 allProductSlice.caseReducers.extractMetadata(state);
//
//                 console.log('📦 Product created successfully:', action.payload._id);
//             })
//             .addCase(createProduct.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Product creation failed:', action.payload);
//             })
//
//             // Update product
//             .addCase(updateProduct.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateProduct.fulfilled, (state, action) => {
//                 const updatedProduct = action.payload;
//                 const index = state.items.findIndex(item => item._id === updatedProduct._id);
//
//                 if (index !== -1) {
//                     state.items[index] = updatedProduct;
//                 }
//
//                 if (state.currentProduct?._id === updatedProduct._id) {
//                     state.currentProduct = updatedProduct;
//                 }
//
//                 state.loading = false;
//                 state.error = null;
//
//                 // Reapply filters and extract metadata
//                 allProductSlice.caseReducers.applyFilters(state);
//                 allProductSlice.caseReducers.extractMetadata(state);
//
//                 console.log('📦 Product updated successfully:', updatedProduct._id);
//             })
//             .addCase(updateProduct.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Product update failed:', action.payload);
//             })
//
//             // Delete product
//             .addCase(deleteProduct.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteProduct.fulfilled, (state, action) => {
//                 const productId = action.payload;
//                 state.items = state.items.filter(item => item._id !== productId);
//
//                 if (state.currentProduct?._id === productId) {
//                     state.currentProduct = null;
//                 }
//
//                 state.loading = false;
//                 state.error = null;
//
//                 // Reapply filters and extract metadata
//                 allProductSlice.caseReducers.applyFilters(state);
//                 allProductSlice.caseReducers.extractMetadata(state);
//
//                 console.log('📦 Product deleted successfully:', productId);
//             })
//             .addCase(deleteProduct.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Product deletion failed:', action.payload);
//             })
//
//             // Search products
//             .addCase(searchProducts.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(searchProducts.fulfilled, (state, action) => {
//                 state.searchResults = action.payload.products || [];
//                 state.lastSearchQuery = action.payload.query || '';
//                 state.loading = false;
//                 state.error = null;
//
//                 console.log('📦 Search completed:', {
//                     query: action.payload.query,
//                     results: state.searchResults.length
//                 });
//             })
//             .addCase(searchProducts.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Search failed:', action.payload);
//             })
//
//             // Fetch products by category
//             .addCase(fetchProductsByCategory.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
//                 // Update filtered items with category results
//                 state.filteredItems = action.payload || [];
//                 state.loading = false;
//                 state.error = null;
//
//                 console.log('📦 Products by category loaded:', state.filteredItems.length);
//             })
//             .addCase(fetchProductsByCategory.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 console.error('📦 Fetch by category failed:', action.payload);
//             });
//     },
// });
//
// // ==================== EXPORTS ====================
//
// // Action creators
// export const {
//     setFilters,
//     clearFilters,
//     applyFilters,
//     setCurrentProduct,
//     clearCurrentProduct,
//     updateProductInList,
//     removeProductFromList,
//     extractMetadata,
//     setCurrentPage,
//     setItemsPerPage,
//     setSearchResults,
//     clearSearchResults,
//     clearError,
//     invalidateCache,
//     setCacheTimeout,
// } = allProductSlice.actions;
//
// // Selectors
// export const selectAllProducts = (state: any) => state.allProducts.items;
// export const selectFilteredProducts = (state: any) => state.allProducts.filteredItems;
// export const selectCurrentProduct = (state: any) => state.allProducts.currentProduct;
// export const selectProductsLoading = (state: any) => state.allProducts.loading;
// export const selectProductsError = (state: any) => state.allProducts.error;
// export const selectProductsStatus = (state: any) => state.allProducts.status;
// export const selectProductFilters = (state: any) => state.allProducts.filters;
// export const selectProductCategories = (state: any) => state.allProducts.categories;
// export const selectProductBrands = (state: any) => state.allProducts.brands;
// export const selectSearchResults = (state: any) => state.allProducts.searchResults;
// export const selectLastSearchQuery = (state: any) => state.allProducts.lastSearchQuery;
// export const selectCurrentPage = (state: any) => state.allProducts.currentPage;
// export const selectItemsPerPage = (state: any) => state.allProducts.itemsPerPage;
// export const selectTotalPages = (state: any) => state.allProducts.totalPages;
// export const selectTotalCount = (state: any) => state.allProducts.totalCount;
//
// // Paginated products selector
// export const selectPaginatedProducts = (state: any) => {
//     const { filteredItems, currentPage, itemsPerPage } = state.allProducts;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredItems.slice(startIndex, endIndex);
// };
//
// // Product by ID selector
// export const selectProductById = (state: any, productId: string) =>
//     state.allProducts.items.find((product: Product) => product._id === productId);
//
// // Products by category selector
// export const selectProductsByCategory = (state: any, category: string) =>
//     state.allProducts.items.filter((product: Product) =>
//         product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
//     );
//
// // Featured products selector (you can customize this logic)
// export const selectFeaturedProducts = (state: any, limit: number = 8) =>
//     state.allProducts.items
//         .filter((product: Product) => product.averageRating && product.averageRating >= 4)
//         .sort((a: Product, b: Product) => (b.averageRating || 0) - (a.averageRating || 0))
//         .slice(0, limit);
//
// // Latest products selector
// export const selectLatestProducts = (state: any, limit: number = 8) =>
//     state.allProducts.items
//         .sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//         .slice(0, limit);
//
// // Products in price range selector
// export const selectProductsInPriceRange = (state: any, minPrice: number, maxPrice: number) =>
//     state.allProducts.items.filter((product: Product) =>
//         product.price >= minPrice && product.price <= maxPrice
//     );
//
// // Related products selector
// export const selectRelatedProducts = (state: any, currentProduct: Product, limit: number = 4) => {
//     if (!currentProduct) return [];
//
//     return state.allProducts.items
//         .filter((product: Product) =>
//             product._id !== currentProduct._id &&
//             product.category.some(cat => currentProduct.category.includes(cat))
//         )
//         .slice(0, limit);
// };
//
// export default allProductSlice.reducer;
// store/slices/allProductSlice.ts
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// ==================== INTERFACES ====================

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string[];
    tagline: string;
    stock: number;
    sizes: string[];
    colors: string[];
    all_images: string[];
    reviews: string[];
    createdAt: string;
    updatedAt: string;
    averageRating?: number;
    totalReviews?: number;
}

interface ProductFilters {
    category: string;
    priceRange: [number, number];
    search: string;
    sortBy: 'name' | 'price' | 'createdAt' | 'stock' | 'averageRating';
    sortOrder: 'asc' | 'desc';
    inStock: boolean;
    minRating: number;
}

interface ProductState {
    items: Product[];
    filteredItems: Product[];
    currentProduct: Product | null;
    categories: string[];
    brands: string[];
    totalCount: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    searchResults: Product[];
    lastSearchQuery: string;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    lastFetchTime: number | null;
    cacheTimeout: number;
}

// ==================== ASYNC THUNKS ====================

export const fetchAllProducts = createAsyncThunk(
    'allProducts/fetchAll',
    async (options?: { forceRefresh?: boolean }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const currentTime = Date.now();
            const lastFetch = state.allProducts.lastFetchTime;
            const cacheTimeout = state.allProducts.cacheTimeout;

            if (!options?.forceRefresh && lastFetch && (currentTime - lastFetch) < cacheTimeout) {
                console.log('📦 Using cached products data');
                return state.allProducts.items;
            }

            console.log('📦 Fetching all products from API...');
            const response = await axios.get('/api/products');
            console.log('📦 Products fetch response:', response.data);

            if (response.data.success || response.data.data) {
                return response.data.data || response.data.products || [];
            }

            return [];
        } catch (error: any) {
            console.error('📦 Products fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'allProducts/fetchById',
    async (productId: string, { rejectWithValue }) => {
        try {
            if (!productId) {
                return rejectWithValue('Product ID is required');
            }

            console.log('📦 Fetching product by ID:', productId);
            const response = await axios.get(`/api/products/${productId}`);
            console.log('📦 Product by ID fetch response:', response.data);

            if (response.data.success || response.data.data) {
                return response.data.data || response.data.product;
            }

            return rejectWithValue('Product not found');
        } catch (error: any) {
            console.error('📦 Product by ID fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

export const createProduct = createAsyncThunk(
    'allProducts/create',
    async (productData: any, { rejectWithValue }) => {
        try {
            console.log('📦 Creating product:', productData);
            const formData = new FormData();

            Object.keys(productData).forEach(key => {
                if (key !== 'images' && key !== 'all_images') {
                    if (Array.isArray(productData[key])) {
                        formData.append(key, JSON.stringify(productData[key]));
                    } else if (typeof productData[key] === 'object' && productData[key] !== null) {
                        formData.append(key, JSON.stringify(productData[key]));
                    } else {
                        formData.append(key, productData[key]);
                    }
                }
            });

            const images = productData.images || productData.all_images;
            if (images && images.length > 0) {
                images.forEach((image: File) => {
                    formData.append('all_images', image);
                });
            }

            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('📦 Create product response:', response.data);

            if (response.data.success || response.data._id) {
                return response.data.data || response.data;
            }

            return rejectWithValue('Failed to create product');
        } catch (error: any) {
            console.error('📦 Create product error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'allProducts/update',
    async ({ productId, productData }: { productId: string, productData: any }, { rejectWithValue }) => {
        try {
            if (!productId) {
                return rejectWithValue('Product ID is required');
            }

            console.log('📦 Updating product:', productId, productData);
            const formData = new FormData();

            Object.keys(productData).forEach(key => {
                if (key !== 'images' && key !== 'all_images') {
                    if (Array.isArray(productData[key])) {
                        formData.append(key, JSON.stringify(productData[key]));
                    } else if (typeof productData[key] === 'object' && productData[key] !== null) {
                        formData.append(key, JSON.stringify(productData[key]));
                    } else {
                        formData.append(key, productData[key]);
                    }
                }
            });

            const images = productData.images || productData.all_images;
            if (images && images.length > 0) {
                images.forEach((image: File) => {
                    formData.append('all_images', image);
                });
            }

            const response = await axios.put(`/api/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('📦 Update product response:', response.data);

            if (response.data.success || response.data._id) {
                return response.data.data || response.data;
            }

            return rejectWithValue('Failed to update product');
        } catch (error: any) {
            console.error('📦 Update product error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'allProducts/delete',
    async (productId: string, { rejectWithValue }) => {
        try {
            if (!productId) {
                return rejectWithValue('Product ID is required');
            }

            console.log('📦 Deleting product:', productId);
            const response = await axios.delete(`/api/products/${productId}`);
            console.log('📦 Delete product response:', response.data);

            if (response.data.success) {
                return productId;
            }

            return rejectWithValue('Failed to delete product');
        } catch (error: any) {
            console.error('📦 Delete product error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

export const searchProducts = createAsyncThunk(
    'allProducts/search',
    async ({ query, filters }: { query?: string, filters?: Partial<ProductFilters> }, { rejectWithValue }) => {
        try {
            console.log('📦 Searching products:', { query, filters });

            let url = '/api/products';
            const params = new URLSearchParams();

            if (query) params.append('search', query);
            if (filters?.category) params.append('category', filters.category);
            if (filters?.priceRange) {
                params.append('minPrice', filters.priceRange[0].toString());
                params.append('maxPrice', filters.priceRange[1].toString());
            }
            if (filters?.inStock !== undefined) params.append('inStock', filters.inStock.toString());
            if (filters?.minRating) params.append('minRating', filters.minRating.toString());

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await axios.get(url);
            console.log('📦 Search products response:', response.data);

            if (response.data.success || response.data.data) {
                return {
                    products: response.data.data || response.data.products || [],
                    query: query || '',
                };
            }

            return { products: [], query: query || '' };
        } catch (error: any) {
            console.error('📦 Search products error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to search products');
        }
    }
);

// ==================== INITIAL STATE ====================

const initialState: ProductState = {
    items: [],
    filteredItems: [],
    currentProduct: null,
    categories: [],
    brands: [],
    totalCount: 0,
    status: 'idle',
    loading: false,
    error: null,
    filters: {
        category: '',
        priceRange: [0, 10000],
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        inStock: false,
        minRating: 0,
    },
    searchResults: [],
    lastSearchQuery: '',
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
    lastFetchTime: null,
    cacheTimeout: 5 * 60 * 1000,
};

// ==================== SLICE ====================

const allProductSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            console.log('📦 Filters updated:', state.filters);
            allProductSlice.caseReducers.applyFilters(state);
        },

        clearFilters: (state) => {
            state.filters = {
                category: '',
                priceRange: [0, 10000],
                search: '',
                sortBy: 'createdAt',
                sortOrder: 'desc',
                inStock: false,
                minRating: 0,
            };
            state.filteredItems = [...state.items];
            state.currentPage = 1;
            console.log('📦 Filters cleared');
        },

        applyFilters: (state) => {
            let filtered = [...state.items];

            if (state.filters.search.trim()) {
                const searchTerm = state.filters.search.toLowerCase().trim();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.tagline.toLowerCase().includes(searchTerm) ||
                    product.category.some(cat => cat.toLowerCase().includes(searchTerm))
                );
            }

            if (state.filters.category) {
                filtered = filtered.filter(product =>
                    product.category.some(cat =>
                        cat.toLowerCase() === state.filters.category.toLowerCase()
                    )
                );
            }

            filtered = filtered.filter(product =>
                product.price >= state.filters.priceRange[0] &&
                product.price <= state.filters.priceRange[1]
            );

            if (state.filters.inStock) {
                filtered = filtered.filter(product => product.stock > 0);
            }

            if (state.filters.minRating > 0) {
                filtered = filtered.filter(product =>
                    (product.averageRating || 0) >= state.filters.minRating
                );
            }

            filtered.sort((a, b) => {
                let aValue: any = a[state.filters.sortBy];
                let bValue: any = b[state.filters.sortBy];

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (state.filters.sortOrder === 'asc') {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                } else {
                    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                }
            });

            state.filteredItems = filtered;
            state.totalCount = filtered.length;
            state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);

            if (state.currentPage > state.totalPages && state.totalPages > 0) {
                state.currentPage = 1;
            }

            console.log('📦 Filters applied:', {
                total: state.items.length,
                filtered: filtered.length,
                filters: state.filters
            });
        },

        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
            console.log('📦 Current product set:', action.payload?._id);
        },

        clearCurrentProduct: (state) => {
            state.currentProduct = null;
            console.log('📦 Current product cleared');
        },

        updateProductInList: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.items.findIndex(item => item._id === updatedProduct._id);

            if (index !== -1) {
                state.items[index] = updatedProduct;
                console.log('📦 Product updated in list:', updatedProduct._id);

                if (state.currentProduct?._id === updatedProduct._id) {
                    state.currentProduct = updatedProduct;
                }

                allProductSlice.caseReducers.applyFilters(state);
                allProductSlice.caseReducers.extractMetadata(state);
            }
        },

        removeProductFromList: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item._id !== productId);

            if (state.currentProduct?._id === productId) {
                state.currentProduct = null;
            }

            allProductSlice.caseReducers.applyFilters(state);
            allProductSlice.caseReducers.extractMetadata(state);

            console.log('📦 Product removed from list:', productId);
        },

        extractMetadata: (state) => {
            const categorySet = new Set<string>();
            const brandSet = new Set<string>();

            state.items.forEach(product => {
                product.category.forEach(cat => {
                    if (cat.trim()) {
                        categorySet.add(cat.trim().toLowerCase());
                    }
                });

                if (product.category.length > 0) {
                    brandSet.add(product.category[0].trim());
                }
            });

            state.categories = Array.from(categorySet).sort();
            state.brands = Array.from(brandSet).sort();

            console.log('📦 Metadata extracted:', {
                categories: state.categories.length,
                brands: state.brands.length
            });
        },

        setCurrentPage: (state, action) => {
            const page = action.payload;
            if (page >= 1 && page <= state.totalPages) {
                state.currentPage = page;
                console.log('📦 Page changed to:', page);
            }
        },

        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
            state.totalPages = Math.ceil(state.filteredItems.length / state.itemsPerPage);
            state.currentPage = 1;
            console.log('📦 Items per page changed to:', action.payload);
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload.products || [];
            state.lastSearchQuery = action.payload.query || '';
            console.log('📦 Search results set:', state.searchResults.length);
        },

        clearSearchResults: (state) => {
            state.searchResults = [];
            state.lastSearchQuery = '';
            console.log('📦 Search results cleared');
        },

        clearError: (state) => {
            state.error = null;
        },

        invalidateCache: (state) => {
            state.lastFetchTime = null;
            console.log('📦 Cache invalidated');
        },

        setCacheTimeout: (state, action) => {
            state.cacheTimeout = action.payload;
            console.log('📦 Cache timeout set to:', action.payload);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.filteredItems = action.payload || [];
                state.totalCount = action.payload?.length || 0;
                state.status = 'succeeded';
                state.loading = false;
                state.error = null;
                state.lastFetchTime = Date.now();

                allProductSlice.caseReducers.extractMetadata(state);
                allProductSlice.caseReducers.applyFilters(state);

                console.log('📦 Products loaded successfully:', state.items.length);
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Products load failed:', action.payload);
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.loading = false;
                state.error = null;

                const existingIndex = state.items.findIndex(item => item._id === action.payload._id);
                if (existingIndex === -1) {
                    state.items.push(action.payload);
                    allProductSlice.caseReducers.applyFilters(state);
                    allProductSlice.caseReducers.extractMetadata(state);
                }

                console.log('📦 Product loaded by ID:', action.payload._id);
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Product by ID load failed:', action.payload);
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.totalCount += 1;
                state.loading = false;
                state.error = null;

                allProductSlice.caseReducers.applyFilters(state);
                allProductSlice.caseReducers.extractMetadata(state);

                console.log('📦 Product created successfully:', action.payload._id);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Product creation failed:', action.payload);
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.items.findIndex(item => item._id === updatedProduct._id);

                if (index !== -1) {
                    state.items[index] = updatedProduct;
                }

                if (state.currentProduct?._id === updatedProduct._id) {
                    state.currentProduct = updatedProduct;
                }

                state.loading = false;
                state.error = null;

                allProductSlice.caseReducers.applyFilters(state);
                allProductSlice.caseReducers.extractMetadata(state);

                console.log('📦 Product updated successfully:', updatedProduct._id);
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Product update failed:', action.payload);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const productId = action.payload;
                state.items = state.items.filter(item => item._id !== productId);

                if (state.currentProduct?._id === productId) {
                    state.currentProduct = null;
                }

                state.loading = false;
                state.error = null;

                allProductSlice.caseReducers.applyFilters(state);
                allProductSlice.caseReducers.extractMetadata(state);

                console.log('📦 Product deleted successfully:', productId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Product deletion failed:', action.payload);
            })
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchResults = action.payload.products || [];
                state.lastSearchQuery = action.payload.query || '';
                state.loading = false;
                state.error = null;

                console.log('📦 Search completed:', {
                    query: action.payload.query,
                    results: state.searchResults.length
                });
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('📦 Search failed:', action.payload);
            });
    },
});

// ==================== EXPORTS ====================

export const {
    setFilters,
    clearFilters,
    applyFilters,
    setCurrentProduct,
    clearCurrentProduct,
    updateProductInList,
    removeProductFromList,
    extractMetadata,
    setCurrentPage,
    setItemsPerPage,
    setSearchResults,
    clearSearchResults,
    clearError,
    invalidateCache,
    setCacheTimeout,
} = allProductSlice.actions;

// ==================== MEMOIZED SELECTORS ====================

// Base selectors
const selectProductsState = (state: any) => state.allProducts;

// Memoized selectors using createSelector
export const selectAllProducts = createSelector(
    [selectProductsState],
    (productsState) => productsState.items
);

export const selectFilteredProducts = createSelector(
    [selectProductsState],
    (productsState) => productsState.filteredItems
);

export const selectCurrentProduct = createSelector(
    [selectProductsState],
    (productsState) => productsState.currentProduct
);

export const selectProductsLoading = createSelector(
    [selectProductsState],
    (productsState) => productsState.loading
);

export const selectProductsError = createSelector(
    [selectProductsState],
    (productsState) => productsState.error
);

export const selectProductsStatus = createSelector(
    [selectProductsState],
    (productsState) => productsState.status
);

export const selectProductFilters = createSelector(
    [selectProductsState],
    (productsState) => productsState.filters
);

export const selectProductCategories = createSelector(
    [selectProductsState],
    (productsState) => productsState.categories
);

export const selectProductBrands = createSelector(
    [selectProductsState],
    (productsState) => productsState.brands
);

export const selectSearchResults = createSelector(
    [selectProductsState],
    (productsState) => productsState.searchResults
);

export const selectLastSearchQuery = createSelector(
    [selectProductsState],
    (productsState) => productsState.lastSearchQuery
);

export const selectCurrentPage = createSelector(
    [selectProductsState],
    (productsState) => productsState.currentPage
);

export const selectItemsPerPage = createSelector(
    [selectProductsState],
    (productsState) => productsState.itemsPerPage
);

export const selectTotalPages = createSelector(
    [selectProductsState],
    (productsState) => productsState.totalPages
);

export const selectTotalCount = createSelector(
    [selectProductsState],
    (productsState) => productsState.totalCount
);

// Complex memoized selectors
export const selectPaginatedProducts = createSelector(
    [selectFilteredProducts, selectCurrentPage, selectItemsPerPage],
    (filteredItems, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    }
);

export const selectProductById = createSelector(
    [selectAllProducts, (state: any, productId: string) => productId],
    (items, productId) => items.find((product: Product) => product._id === productId)
);

export const selectProductsByCategory = createSelector(
    [selectAllProducts, (state: any, category: string) => category],
    (items, category) => items.filter((product: Product) =>
        product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
    )
);

export const selectFeaturedProducts = createSelector(
    [selectAllProducts, (state: any, limit: number = 8) => limit],
    (items, limit) => items
        .filter((product: Product) => product.averageRating && product.averageRating >= 4)
        .sort((a: Product, b: Product) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, limit)
);

export const selectLatestProducts = createSelector(
    [selectAllProducts, (state: any, limit: number = 8) => limit],
    (items, limit) => items
        .sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit)
);

export const selectProductsInPriceRange = createSelector(
    [selectAllProducts, (state: any, minPrice: number, maxPrice: number) => ({ minPrice, maxPrice })],
    (items, { minPrice, maxPrice }) => items.filter((product: Product) =>
        product.price >= minPrice && product.price <= maxPrice
    )
);

export const selectRelatedProducts = createSelector(
    [selectAllProducts, (state: any, currentProduct: Product, limit: number = 4) => ({ currentProduct, limit })],
    (items, { currentProduct, limit }) => {
        if (!currentProduct) return [];

        return items
            .filter((product: Product) =>
                product._id !== currentProduct._id &&
                product.category.some(cat => currentProduct.category.includes(cat))
            )
            .slice(0, limit);
    }
);

export default allProductSlice.reducer;