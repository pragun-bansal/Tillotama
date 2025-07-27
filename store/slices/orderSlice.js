// // // store/slices/orderSlice.js
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// //
// // // ==================== ASYNC THUNKS ====================
// //
// // export const fetchUserOrders = createAsyncThunk(
// //     'orders/fetchUserOrders',
// //     async (filters = {}, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Fetching user orders with filters:', filters);
// //
// //             const params = new URLSearchParams();
// //             if (filters.status) params.append('status', filters.status);
// //             if (filters.courier_service) params.append('courier_service', filters.courier_service);
// //             if (filters.search) params.append('search', filters.search);
// //             if (filters.priority) params.append('priority', filters.priority);
// //             if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
// //             if (filters.dateTo) params.append('dateTo', filters.dateTo);
// //             if (filters.sortBy) params.append('sortBy', filters.sortBy);
// //             if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
// //
// //             const queryString = params.toString();
// //             const url = `/api/orders${queryString ? `?${queryString}` : ''}`;
// //
// //             const response = await axios.get(url, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Orders fetch response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Orders fetch error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
// //         }
// //     }
// // );
// //
// // export const createOrder = createAsyncThunk(
// //     'orders/createOrder',
// //     async (orderData, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Creating order:', orderData);
// //             const response = await axios.post('/api/orders', orderData, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Create order response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Create order error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to create order');
// //         }
// //     }
// // );
// //
// // export const updateOrder = createAsyncThunk(
// //     'orders/updateOrder',
// //     async ({ orderId, orderData }, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Updating order:', orderId, orderData);
// //             const response = await axios.put(`/api/orders/${orderId}`, orderData, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Update order response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Update order error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to update order');
// //         }
// //     }
// // );
// //
// // export const deleteOrder = createAsyncThunk(
// //     'orders/deleteOrder',
// //     async (orderId, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Deleting order:', orderId);
// //             await axios.delete(`/api/orders/${orderId}`, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Order deleted successfully');
// //             return orderId;
// //         } catch (error) {
// //             console.error('📦 Delete order error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
// //         }
// //     }
// // );
// //
// // export const trackOrder = createAsyncThunk(
// //     'orders/trackOrder',
// //     async (orderId, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Tracking order:', orderId);
// //             const response = await axios.post(`/api/orders/${orderId}/track`, {}, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Track order response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Track order error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to track order');
// //         }
// //     }
// // );
// //
// // export const trackMultipleOrders = createAsyncThunk(
// //     'orders/trackMultipleOrders',
// //     async ({ orderIds, courierService }, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Batch tracking orders:', { orderIds, courierService });
// //             const response = await axios.post('/api/orders/track/batch', {
// //                 orderIds,
// //                 courierService
// //             }, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Batch track response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Batch track error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to track orders');
// //         }
// //     }
// // );
// //
// // export const fetchOrderStats = createAsyncThunk(
// //     'orders/fetchOrderStats',
// //     async (_, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Fetching order statistics');
// //             const response = await axios.get('/api/orders/stats', {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Order stats response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Order stats error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to fetch order statistics');
// //         }
// //     }
// // );
// //
// // export const markOrderAsDelivered = createAsyncThunk(
// //     'orders/markAsDelivered',
// //     async ({ orderId, deliveryNotes }, { getState, rejectWithValue }) => {
// //         try {
// //             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
// //
// //             if (!token) {
// //                 return rejectWithValue('Authentication required');
// //             }
// //
// //             console.log('📦 Marking order as delivered:', orderId);
// //             const response = await axios.post(`/api/orders/${orderId}/delivered`, {
// //                 deliveryNotes
// //             }, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //
// //             console.log('📦 Mark delivered response:', response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error('📦 Mark delivered error:', error.response?.data || error.message);
// //             return rejectWithValue(error.response?.data?.message || 'Failed to mark order as delivered');
// //         }
// //     }
// // );
// //
// // // ==================== INITIAL STATE ====================
// //
// // const initialState = {
// //     // Orders data
// //     orders: [],
// //     filteredOrders: [],
// //     currentOrder: null,
// //
// //     // Statistics
// //     orderStats: {
// //         totalOrders: 0,
// //         pendingOrders: 0,
// //         trackingOrders: 0,
// //         deliveredOrders: 0,
// //         errorOrders: 0,
// //         trackonOrders: 0,
// //         shreeTirupatiOrders: 0,
// //         averageDeliveryTime: 0
// //     },
// //
// //     // Filters and search
// //     filters: {
// //         status: '',
// //         courier_service: '',
// //         search: '',
// //         priority: '',
// //         dateFrom: '',
// //         dateTo: '',
// //         sortBy: 'createdAt',
// //         sortOrder: 'desc'
// //     },
// //
// //     // UI state
// //     expandedOrders: [],
// //     editingOrder: null,
// //     showAddForm: false,
// //
// //     // Loading states
// //     loading: false,
// //     ordersLoading: false,
// //     trackingLoading: false,
// //     statsLoading: false,
// //     creating: false,
// //     updating: false,
// //     deleting: false,
// //
// //     // Error states
// //     error: null,
// //     trackingError: null,
// //
// //     // Pagination
// //     currentPage: 1,
// //     itemsPerPage: 10,
// //     totalPages: 1,
// //     totalCount: 0,
// //
// //     // Cache management
// //     lastFetchTime: null,
// //     cacheTimeout: 5 * 60 * 1000, // 5 minutes
// // };
// //
// // // ==================== HELPER FUNCTIONS ====================
// //
// // const applyFilters = (orders, filters) => {
// //     let filtered = [...orders];
// //
// //     // Apply search filter
// //     if (filters.search?.trim()) {
// //         const searchTerm = filters.search.toLowerCase().trim();
// //         filtered = filtered.filter(order =>
// //             order.tracking_id.toLowerCase().includes(searchTerm) ||
// //             order.recipient_name.toLowerCase().includes(searchTerm) ||
// //             order.recipient_location.toLowerCase().includes(searchTerm) ||
// //             order.current_status?.toLowerCase().includes(searchTerm)
// //         );
// //     }
// //
// //     // Apply status filter
// //     if (filters.status) {
// //         filtered = filtered.filter(order => order.status === filters.status);
// //     }
// //
// //     // Apply courier service filter
// //     if (filters.courier_service) {
// //         filtered = filtered.filter(order => order.courier_service === filters.courier_service);
// //     }
// //
// //     // Apply priority filter
// //     if (filters.priority) {
// //         filtered = filtered.filter(order => order.priority === filters.priority);
// //     }
// //
// //     // Apply date filters
// //     if (filters.dateFrom) {
// //         const fromDate = new Date(filters.dateFrom);
// //         filtered = filtered.filter(order => new Date(order.createdAt) >= fromDate);
// //     }
// //
// //     if (filters.dateTo) {
// //         const toDate = new Date(filters.dateTo);
// //         toDate.setHours(23, 59, 59, 999); // End of day
// //         filtered = filtered.filter(order => new Date(order.createdAt) <= toDate);
// //     }
// //
// //     // Apply sorting
// //     filtered.sort((a, b) => {
// //         let aValue = a[filters.sortBy];
// //         let bValue = b[filters.sortBy];
// //
// //         // Handle date sorting
// //         if (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt') {
// //             aValue = new Date(aValue);
// //             bValue = new Date(bValue);
// //         }
// //
// //         // Handle string sorting
// //         if (typeof aValue === 'string') {
// //             aValue = aValue.toLowerCase();
// //             bValue = bValue.toLowerCase();
// //         }
// //
// //         if (filters.sortOrder === 'asc') {
// //             return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
// //         } else {
// //             return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
// //         }
// //     });
// //
// //     return filtered;
// // };
// //
// // // ==================== SLICE ====================
// //
// // const orderSlice = createSlice({
// //     name: 'orders',
// //     initialState,
// //     reducers: {
// //         // ===== FILTER MANAGEMENT =====
// //         setFilters: (state, action) => {
// //             state.filters = { ...state.filters, ...action.payload };
// //             state.filteredOrders = applyFilters(state.orders, state.filters);
// //             state.totalCount = state.filteredOrders.length;
// //             state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);
// //
// //             // Reset to first page if current page is out of bounds
// //             if (state.currentPage > state.totalPages && state.totalPages > 0) {
// //                 state.currentPage = 1;
// //             }
// //         },
// //
// //         clearFilters: (state) => {
// //             state.filters = {
// //                 status: '',
// //                 courier_service: '',
// //                 search: '',
// //                 priority: '',
// //                 dateFrom: '',
// //                 dateTo: '',
// //                 sortBy: 'createdAt',
// //                 sortOrder: 'desc'
// //             };
// //             state.filteredOrders = [...state.orders];
// //             state.currentPage = 1;
// //         },
// //
// //         // ===== UI STATE MANAGEMENT =====
// //         setExpandedOrders: (state, action) => {
// //             state.expandedOrders = action.payload;
// //         },
// //
// //         toggleOrderExpanded: (state, action) => {
// //             const orderId = action.payload;
// //             const isExpanded = state.expandedOrders.includes(orderId);
// //
// //             if (isExpanded) {
// //                 state.expandedOrders = state.expandedOrders.filter(id => id !== orderId);
// //             } else {
// //                 state.expandedOrders.push(orderId);
// //             }
// //         },
// //
// //         setEditingOrder: (state, action) => {
// //             state.editingOrder = action.payload;
// //         },
// //
// //         setShowAddForm: (state, action) => {
// //             state.showAddForm = action.payload;
// //         },
// //
// //         setCurrentOrder: (state, action) => {
// //             state.currentOrder = action.payload;
// //         },
// //
// //         // ===== ORDER MANAGEMENT =====
// //         updateOrderInList: (state, action) => {
// //             const updatedOrder = action.payload;
// //             const index = state.orders.findIndex(order => order._id === updatedOrder._id);
// //
// //             if (index !== -1) {
// //                 state.orders[index] = updatedOrder;
// //                 state.filteredOrders = applyFilters(state.orders, state.filters);
// //
// //                 // Update current order if it matches
// //                 if (state.currentOrder?._id === updatedOrder._id) {
// //                     state.currentOrder = updatedOrder;
// //                 }
// //             }
// //         },
// //
// //         removeOrderFromList: (state, action) => {
// //             const orderId = action.payload;
// //             state.orders = state.orders.filter(order => order._id !== orderId);
// //             state.filteredOrders = applyFilters(state.orders, state.filters);
// //
// //             // Clear current order if it was deleted
// //             if (state.currentOrder?._id === orderId) {
// //                 state.currentOrder = null;
// //             }
// //
// //             // Remove from expanded orders
// //             state.expandedOrders = state.expandedOrders.filter(id => id !== orderId);
// //         },
// //
// //         // ===== PAGINATION =====
// //         setCurrentPage: (state, action) => {
// //             const page = action.payload;
// //             if (page >= 1 && page <= state.totalPages) {
// //                 state.currentPage = page;
// //             }
// //         },
// //
// //         setItemsPerPage: (state, action) => {
// //             state.itemsPerPage = action.payload;
// //             state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);
// //             state.currentPage = 1;
// //         },
// //
// //         // ===== ERROR MANAGEMENT =====
// //         clearError: (state) => {
// //             state.error = null;
// //             state.trackingError = null;
// //         },
// //
// //         clearTrackingError: (state) => {
// //             state.trackingError = null;
// //         },
// //
// //         // ===== CACHE MANAGEMENT =====
// //         invalidateCache: (state) => {
// //             state.lastFetchTime = null;
// //         }
// //     },
// //
// //     extraReducers: (builder) => {
// //         builder
// //             // ===== FETCH USER ORDERS =====
// //             .addCase(fetchUserOrders.pending, (state) => {
// //                 state.ordersLoading = true;
// //                 state.error = null;
// //             })
// //             .addCase(fetchUserOrders.fulfilled, (state, action) => {
// //                 const { orders, pagination } = action.payload;
// //
// //                 state.orders = orders || [];
// //                 state.filteredOrders = applyFilters(state.orders, state.filters);
// //
// //                 // Update pagination if provided
// //                 if (pagination) {
// //                     state.currentPage = pagination.currentPage || 1;
// //                     state.totalPages = pagination.totalPages || 1;
// //                     state.totalCount = pagination.totalCount || state.orders.length;
// //                 } else {
// //                     state.totalCount = state.orders.length;
// //                     state.totalPages = Math.ceil(state.orders.length / state.itemsPerPage);
// //                 }
// //
// //                 state.ordersLoading = false;
// //                 state.error = null;
// //                 state.lastFetchTime = Date.now();
// //
// //                 console.log('📦 Orders loaded successfully:', state.orders.length);
// //             })
// //             .addCase(fetchUserOrders.rejected, (state, action) => {
// //                 state.ordersLoading = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Orders fetch failed:', action.payload);
// //             })
// //
// //             // ===== CREATE ORDER =====
// //             .addCase(createOrder.pending, (state) => {
// //                 state.creating = true;
// //                 state.error = null;
// //             })
// //             .addCase(createOrder.fulfilled, (state, action) => {
// //                 const newOrder = action.payload.order || action.payload;
// //                 state.orders.unshift(newOrder);
// //                 state.filteredOrders = applyFilters(state.orders, state.filters);
// //
// //                 state.creating = false;
// //                 state.error = null;
// //                 state.showAddForm = false;
// //
// //                 console.log('📦 Order created successfully:', newOrder._id);
// //             })
// //             .addCase(createOrder.rejected, (state, action) => {
// //                 state.creating = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Order creation failed:', action.payload);
// //             })
// //
// //             // ===== UPDATE ORDER =====
// //             .addCase(updateOrder.pending, (state) => {
// //                 state.updating = true;
// //                 state.error = null;
// //             })
// //             .addCase(updateOrder.fulfilled, (state, action) => {
// //                 const updatedOrder = action.payload.order || action.payload;
// //                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
// //
// //                 if (index !== -1) {
// //                     state.orders[index] = updatedOrder;
// //                     state.filteredOrders = applyFilters(state.orders, state.filters);
// //                 }
// //
// //                 if (state.currentOrder?._id === updatedOrder._id) {
// //                     state.currentOrder = updatedOrder;
// //                 }
// //
// //                 state.updating = false;
// //                 state.error = null;
// //                 state.editingOrder = null;
// //
// //                 console.log('📦 Order updated successfully:', updatedOrder._id);
// //             })
// //             .addCase(updateOrder.rejected, (state, action) => {
// //                 state.updating = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Order update failed:', action.payload);
// //             })
// //
// //             // ===== DELETE ORDER =====
// //             .addCase(deleteOrder.pending, (state) => {
// //                 state.deleting = true;
// //                 state.error = null;
// //             })
// //             .addCase(deleteOrder.fulfilled, (state, action) => {
// //                 const orderId = action.payload;
// //                 state.orders = state.orders.filter(order => order._id !== orderId);
// //                 state.filteredOrders = applyFilters(state.orders, state.filters);
// //
// //                 if (state.currentOrder?._id === orderId) {
// //                     state.currentOrder = null;
// //                 }
// //
// //                 // Remove from expanded orders
// //                 state.expandedOrders = state.expandedOrders.filter(id => id !== orderId);
// //
// //                 state.deleting = false;
// //                 state.error = null;
// //
// //                 console.log('📦 Order deleted successfully:', orderId);
// //             })
// //             .addCase(deleteOrder.rejected, (state, action) => {
// //                 state.deleting = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Order deletion failed:', action.payload);
// //             })
// //
// //             // ===== TRACK ORDER =====
// //             .addCase(trackOrder.pending, (state) => {
// //                 state.trackingLoading = true;
// //                 state.trackingError = null;
// //             })
// //             .addCase(trackOrder.fulfilled, (state, action) => {
// //                 const updatedOrder = action.payload.order || action.payload;
// //                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
// //
// //                 if (index !== -1) {
// //                     state.orders[index] = updatedOrder;
// //                     state.filteredOrders = applyFilters(state.orders, state.filters);
// //                 }
// //
// //                 if (state.currentOrder?._id === updatedOrder._id) {
// //                     state.currentOrder = updatedOrder;
// //                 }
// //
// //                 state.trackingLoading = false;
// //                 state.trackingError = null;
// //
// //                 console.log('📦 Order tracked successfully:', updatedOrder._id);
// //             })
// //             .addCase(trackOrder.rejected, (state, action) => {
// //                 state.trackingLoading = false;
// //                 state.trackingError = action.payload;
// //                 console.error('📦 Order tracking failed:', action.payload);
// //             })
// //
// //             // ===== TRACK MULTIPLE ORDERS =====
// //             .addCase(trackMultipleOrders.pending, (state) => {
// //                 state.trackingLoading = true;
// //                 state.trackingError = null;
// //             })
// //             .addCase(trackMultipleOrders.fulfilled, (state, action) => {
// //                 const { results } = action.payload;
// //
// //                 if (results && Array.isArray(results)) {
// //                     results.forEach(result => {
// //                         if (result.success && result.order) {
// //                             const index = state.orders.findIndex(order => order._id === result.order._id);
// //                             if (index !== -1) {
// //                                 state.orders[index] = result.order;
// //                             }
// //                         }
// //                     });
// //
// //                     state.filteredOrders = applyFilters(state.orders, state.filters);
// //                 }
// //
// //                 state.trackingLoading = false;
// //                 state.trackingError = null;
// //
// //                 console.log('📦 Batch tracking completed:', results?.length || 0);
// //             })
// //             .addCase(trackMultipleOrders.rejected, (state, action) => {
// //                 state.trackingLoading = false;
// //                 state.trackingError = action.payload;
// //                 console.error('📦 Batch tracking failed:', action.payload);
// //             })
// //
// //             // ===== FETCH ORDER STATS =====
// //             .addCase(fetchOrderStats.pending, (state) => {
// //                 state.statsLoading = true;
// //                 state.error = null;
// //             })
// //             .addCase(fetchOrderStats.fulfilled, (state, action) => {
// //                 state.orderStats = action.payload.stats || action.payload;
// //                 state.statsLoading = false;
// //                 state.error = null;
// //
// //                 console.log('📦 Order stats loaded successfully');
// //             })
// //             .addCase(fetchOrderStats.rejected, (state, action) => {
// //                 state.statsLoading = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Order stats fetch failed:', action.payload);
// //             })
// //
// //             // ===== MARK AS DELIVERED =====
// //             .addCase(markOrderAsDelivered.pending, (state) => {
// //                 state.updating = true;
// //                 state.error = null;
// //             })
// //             .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
// //                 const updatedOrder = action.payload.order || action.payload;
// //                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
// //
// //                 if (index !== -1) {
// //                     state.orders[index] = updatedOrder;
// //                     state.filteredOrders = applyFilters(state.orders, state.filters);
// //                 }
// //
// //                 if (state.currentOrder?._id === updatedOrder._id) {
// //                     state.currentOrder = updatedOrder;
// //                 }
// //
// //                 state.updating = false;
// //                 state.error = null;
// //
// //                 console.log('📦 Order marked as delivered:', updatedOrder._id);
// //             })
// //             .addCase(markOrderAsDelivered.rejected, (state, action) => {
// //                 state.updating = false;
// //                 state.error = action.payload;
// //                 console.error('📦 Mark as delivered failed:', action.payload);
// //             });
// //     }
// // });
// //
// // // ==================== EXPORTS ====================
// //
// // // Action creators
// // export const {
// //     setFilters,
// //     clearFilters,
// //     setExpandedOrders,
// //     toggleOrderExpanded,
// //     setEditingOrder,
// //     setShowAddForm,
// //     setCurrentOrder,
// //     updateOrderInList,
// //     removeOrderFromList,
// //     setCurrentPage,
// //     setItemsPerPage,
// //     clearError,
// //     clearTrackingError,
// //     invalidateCache
// // } = orderSlice.actions;
// //
// // // Selectors
// // export const selectOrders = (state) => state.orders.orders;
// // export const selectFilteredOrders = (state) => state.orders.filteredOrders;
// // export const selectCurrentOrder = (state) => state.orders.currentOrder;
// // export const selectOrderStats = (state) => state.orders.orderStats;
// // export const selectOrderFilters = (state) => state.orders.filters;
// // export const selectExpandedOrders = (state) => state.orders.expandedOrders;
// // export const selectEditingOrder = (state) => state.orders.editingOrder;
// // export const selectShowAddForm = (state) => state.orders.showAddForm;
// //
// // // Loading selectors
// // export const selectOrdersLoading = (state) => state.orders.ordersLoading;
// // export const selectTrackingLoading = (state) => state.orders.trackingLoading;
// // export const selectStatsLoading = (state) => state.orders.statsLoading;
// // export const selectCreating = (state) => state.orders.creating;
// // export const selectUpdating = (state) => state.orders.updating;
// // export const selectDeleting = (state) => state.orders.deleting;
// //
// // // Error selectors
// // export const selectOrdersError = (state) => state.orders.error;
// // export const selectTrackingError = (state) => state.orders.trackingError;
// //
// // // Pagination selectors
// // export const selectCurrentPage = (state) => state.orders.currentPage;
// // export const selectItemsPerPage = (state) => state.orders.itemsPerPage;
// // export const selectTotalPages = (state) => state.orders.totalPages;
// // export const selectTotalCount = (state) => state.orders.totalCount;
// //
// // // Complex selectors
// // export const selectPaginatedOrders = (state) => {
// //     const { filteredOrders, currentPage, itemsPerPage } = state.orders;
// //     const startIndex = (currentPage - 1) * itemsPerPage;
// //     const endIndex = startIndex + itemsPerPage;
// //     return filteredOrders.slice(startIndex, endIndex);
// // };
// //
// // export const selectOrderById = (state, orderId) =>
// //     state.orders.orders.find(order => order._id === orderId);
// //
// // export const selectOrdersByStatus = (state, status) =>
// //     state.orders.orders.filter(order => order.status === status);
// //
// // export const selectOrdersByCourier = (state, courierService) =>
// //     state.orders.orders.filter(order => order.courier_service === courierService);
// //
// // export const selectTrackonOrders = (state) =>
// //     state.orders.orders.filter(order => order.courier_service === 'trackon');
// //
// // export const selectShreeTirupatiOrders = (state) =>
// //     state.orders.orders.filter(order => order.courier_service === 'shree_tirupati');
// //
// // export const selectPendingOrders = (state) =>
// //     state.orders.orders.filter(order => order.status === 'pending');
// //
// // export const selectTrackingOrders = (state) =>
// //     state.orders.orders.filter(order => order.status === 'tracking');
// //
// // export const selectDeliveredOrders = (state) =>
// //     state.orders.orders.filter(order => order.status === 'delivered');
// //
// // export const selectErrorOrders = (state) =>
// //     state.orders.orders.filter(order => order.status === 'error');
// //
// // export const selectRecentOrders = (state, limit = 5) =>
// //     state.orders.orders
// //         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //         .slice(0, limit);
// //
// // export const selectOrdersRequiringTracking = (state) =>
// //     state.orders.orders.filter(order =>
// //         order.courier_service === 'trackon' &&
// //         ['pending', 'tracking'].includes(order.status)
// //     );
// //
// // export default orderSlice.reducer;
// // store/slices/orderSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// // ==================== ASYNC THUNKS ====================
//
// export const fetchUserOrders = createAsyncThunk(
//     'orders/fetchUserOrders',
//     async (filters = {}, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Fetching user orders with filters:', filters);
//
//             const params = new URLSearchParams();
//             if (filters.status) params.append('status', filters.status);
//             if (filters.courier_service) params.append('courier_service', filters.courier_service);
//             if (filters.search) params.append('search', filters.search);
//             if (filters.priority) params.append('priority', filters.priority);
//             if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
//             if (filters.dateTo) params.append('dateTo', filters.dateTo);
//             if (filters.sortBy) params.append('sortBy', filters.sortBy);
//             if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
//
//             const queryString = params.toString();
//             const url = `/api/orders${queryString ? `?${queryString}` : ''}`;
//
//             const response = await axios.get(url, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Orders fetch response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Orders fetch error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
//         }
//     }
// );
//
// export const createOrder = createAsyncThunk(
//     'orders/createOrder',
//     async (orderData, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Creating order:', orderData);
//             const response = await axios.post('/api/orders', orderData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Create order response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Create order error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to create order');
//         }
//     }
// );
//
// export const updateOrder = createAsyncThunk(
//     'orders/updateOrder',
//     async ({ orderId, orderData }, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Updating order:', orderId, orderData);
//             const response = await axios.put(`/api/orders/${orderId}`, orderData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Update order response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Update order error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to update order');
//         }
//     }
// );
//
// export const deleteOrder = createAsyncThunk(
//     'orders/deleteOrder',
//     async (orderId, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Deleting order:', orderId);
//             await axios.delete(`/api/orders/${orderId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Order deleted successfully');
//             return orderId;
//         } catch (error) {
//             console.error('📦 Delete order error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
//         }
//     }
// );
//
// export const trackOrder = createAsyncThunk(
//     'orders/trackOrder',
//     async (orderId, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Tracking order:', orderId);
//             const response = await axios.post(`/api/orders/${orderId}/track`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Track order response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Track order error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to track order');
//         }
//     }
// );
//
// export const trackMultipleOrders = createAsyncThunk(
//     'orders/trackMultipleOrders',
//     async ({ orderIds, courierService }, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Batch tracking orders:', { orderIds, courierService });
//             const response = await axios.post('/api/orders/track/batch', {
//                 orderIds,
//                 courierService
//             }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Batch track response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Batch track error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to track orders');
//         }
//     }
// );
//
// export const fetchOrderStats = createAsyncThunk(
//     'orders/fetchOrderStats',
//     async (_, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Fetching order statistics');
//             const response = await axios.get('/api/orders/stats', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Order stats response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Order stats error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch order statistics');
//         }
//     }
// );
//
// export const markOrderAsDelivered = createAsyncThunk(
//     'orders/markAsDelivered',
//     async ({ orderId, deliveryNotes }, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             if (!token) {
//                 return rejectWithValue('Authentication required');
//             }
//
//             console.log('📦 Marking order as delivered:', orderId);
//             const response = await axios.post(`/api/orders/${orderId}/delivered`, {
//                 deliveryNotes
//             }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//
//             console.log('📦 Mark delivered response:', response.data);
//             return response.data;
//         } catch (error) {
//             console.error('📦 Mark delivered error:', error.response?.data || error.message);
//             return rejectWithValue(error.response?.data?.message || 'Failed to mark order as delivered');
//         }
//     }
// );
//
// // ==================== INITIAL STATE ====================
//
// const initialState = {
//     // Orders data
//     orders: [],
//     filteredOrders: [],
//     currentOrder: null,
//
//     // Statistics
//     orderStats: {
//         totalOrders: 0,
//         pendingOrders: 0,
//         trackingOrders: 0,
//         deliveredOrders: 0,
//         errorOrders: 0,
//         trackonOrders: 0,
//         shreeTirupatiOrders: 0,
//         averageDeliveryTime: 0
//     },
//
//     // Filters and search
//     filters: {
//         status: '',
//         courier_service: '',
//         search: '',
//         priority: '',
//         dateFrom: '',
//         dateTo: '',
//         sortBy: 'createdAt',
//         sortOrder: 'desc'
//     },
//
//     // UI state - FIXED: Changed to Set for proper has() method
//     expandedOrders: new Set(),
//     editingOrder: null,
//     showAddForm: false,
//
//     // Loading states
//     loading: false,
//     ordersLoading: false,
//     trackingLoading: false,
//     statsLoading: false,
//     creating: false,
//     updating: false,
//     deleting: false,
//
//     // Error states
//     error: null,
//     trackingError: null,
//
//     // Pagination
//     currentPage: 1,
//     itemsPerPage: 10,
//     totalPages: 1,
//     totalCount: 0,
//
//     // Cache management
//     lastFetchTime: null,
//     cacheTimeout: 5 * 60 * 1000, // 5 minutes
// };
//
// // ==================== HELPER FUNCTIONS ====================
//
// const applyFilters = (orders, filters) => {
//     let filtered = [...orders];
//
//     // Apply search filter
//     if (filters.search?.trim()) {
//         const searchTerm = filters.search.toLowerCase().trim();
//         filtered = filtered.filter(order =>
//             order.tracking_id.toLowerCase().includes(searchTerm) ||
//             order.recipient_name.toLowerCase().includes(searchTerm) ||
//             order.recipient_location.toLowerCase().includes(searchTerm) ||
//             order.current_status?.toLowerCase().includes(searchTerm)
//         );
//     }
//
//     // Apply status filter
//     if (filters.status) {
//         filtered = filtered.filter(order => order.status === filters.status);
//     }
//
//     // Apply courier service filter
//     if (filters.courier_service) {
//         filtered = filtered.filter(order => order.courier_service === filters.courier_service);
//     }
//
//     // Apply priority filter
//     if (filters.priority) {
//         filtered = filtered.filter(order => order.priority === filters.priority);
//     }
//
//     // Apply date filters
//     if (filters.dateFrom) {
//         const fromDate = new Date(filters.dateFrom);
//         filtered = filtered.filter(order => new Date(order.createdAt) >= fromDate);
//     }
//
//     if (filters.dateTo) {
//         const toDate = new Date(filters.dateTo);
//         toDate.setHours(23, 59, 59, 999); // End of day
//         filtered = filtered.filter(order => new Date(order.createdAt) <= toDate);
//     }
//
//     // Apply sorting
//     filtered.sort((a, b) => {
//         let aValue = a[filters.sortBy];
//         let bValue = b[filters.sortBy];
//
//         // Handle date sorting
//         if (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt') {
//             aValue = new Date(aValue);
//             bValue = new Date(bValue);
//         }
//
//         // Handle string sorting
//         if (typeof aValue === 'string') {
//             aValue = aValue.toLowerCase();
//             bValue = bValue.toLowerCase();
//         }
//
//         if (filters.sortOrder === 'asc') {
//             return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
//         } else {
//             return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
//         }
//     });
//
//     return filtered;
// };
//
// // ==================== SLICE ====================
//
// const orderSlice = createSlice({
//     name: 'orders',
//     initialState,
//     reducers: {
//         // ===== FILTER MANAGEMENT =====
//         setFilters: (state, action) => {
//             state.filters = { ...state.filters, ...action.payload };
//             state.filteredOrders = applyFilters(state.orders, state.filters);
//             state.totalCount = state.filteredOrders.length;
//             state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);
//
//             // Reset to first page if current page is out of bounds
//             if (state.currentPage > state.totalPages && state.totalPages > 0) {
//                 state.currentPage = 1;
//             }
//         },
//
//         clearFilters: (state) => {
//             state.filters = {
//                 status: '',
//                 courier_service: '',
//                 search: '',
//                 priority: '',
//                 dateFrom: '',
//                 dateTo: '',
//                 sortBy: 'createdAt',
//                 sortOrder: 'desc'
//             };
//             state.filteredOrders = [...state.orders];
//             state.currentPage = 1;
//         },
//
//         // ===== UI STATE MANAGEMENT =====
//         setExpandedOrders: (state, action) => {
//             state.expandedOrders = new Set(action.payload);
//         },
//
//         toggleOrderExpanded: (state, action) => {
//             const orderId = action.payload;
//             const newExpandedOrders = new Set(state.expandedOrders);
//
//             if (newExpandedOrders.has(orderId)) {
//                 newExpandedOrders.delete(orderId);
//             } else {
//                 newExpandedOrders.add(orderId);
//             }
//
//             state.expandedOrders = newExpandedOrders;
//         },
//
//         setEditingOrder: (state, action) => {
//             state.editingOrder = action.payload;
//         },
//
//         setShowAddForm: (state, action) => {
//             state.showAddForm = action.payload;
//         },
//
//         setCurrentOrder: (state, action) => {
//             state.currentOrder = action.payload;
//         },
//
//         // ===== ORDER MANAGEMENT =====
//         updateOrderInList: (state, action) => {
//             const updatedOrder = action.payload;
//             const index = state.orders.findIndex(order => order._id === updatedOrder._id);
//
//             if (index !== -1) {
//                 state.orders[index] = updatedOrder;
//                 state.filteredOrders = applyFilters(state.orders, state.filters);
//
//                 // Update current order if it matches
//                 if (state.currentOrder?._id === updatedOrder._id) {
//                     state.currentOrder = updatedOrder;
//                 }
//             }
//         },
//
//         removeOrderFromList: (state, action) => {
//             const orderId = action.payload;
//             state.orders = state.orders.filter(order => order._id !== orderId);
//             state.filteredOrders = applyFilters(state.orders, state.filters);
//
//             // Clear current order if it was deleted
//             if (state.currentOrder?._id === orderId) {
//                 state.currentOrder = null;
//             }
//
//             // Remove from expanded orders
//             const newExpandedOrders = new Set(state.expandedOrders);
//             newExpandedOrders.delete(orderId);
//             state.expandedOrders = newExpandedOrders;
//         },
//
//         // ===== PAGINATION =====
//         setCurrentPage: (state, action) => {
//             const page = action.payload;
//             if (page >= 1 && page <= state.totalPages) {
//                 state.currentPage = page;
//             }
//         },
//
//         setItemsPerPage: (state, action) => {
//             state.itemsPerPage = action.payload;
//             state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);
//             state.currentPage = 1;
//         },
//
//         // ===== ERROR MANAGEMENT =====
//         clearError: (state) => {
//             state.error = null;
//             state.trackingError = null;
//         },
//
//         clearTrackingError: (state) => {
//             state.trackingError = null;
//         },
//
//         // ===== CACHE MANAGEMENT =====
//         invalidateCache: (state) => {
//             state.lastFetchTime = null;
//         }
//     },
//
//     extraReducers: (builder) => {
//         builder
//             // ===== FETCH USER ORDERS =====
//             .addCase(fetchUserOrders.pending, (state) => {
//                 state.ordersLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserOrders.fulfilled, (state, action) => {
//                 const { orders, pagination } = action.payload;
//
//                 state.orders = orders || [];
//                 state.filteredOrders = applyFilters(state.orders, state.filters);
//
//                 // Update pagination if provided
//                 if (pagination) {
//                     state.currentPage = pagination.currentPage || 1;
//                     state.totalPages = pagination.totalPages || 1;
//                     state.totalCount = pagination.totalCount || state.orders.length;
//                 } else {
//                     state.totalCount = state.orders.length;
//                     state.totalPages = Math.ceil(state.orders.length / state.itemsPerPage);
//                 }
//
//                 state.ordersLoading = false;
//                 state.error = null;
//                 state.lastFetchTime = Date.now();
//
//                 console.log('📦 Orders loaded successfully:', state.orders.length);
//             })
//             .addCase(fetchUserOrders.rejected, (state, action) => {
//                 state.ordersLoading = false;
//                 state.error = action.payload;
//                 console.error('📦 Orders fetch failed:', action.payload);
//             })
//
//             // ===== CREATE ORDER =====
//             .addCase(createOrder.pending, (state) => {
//                 state.creating = true;
//                 state.error = null;
//             })
//             .addCase(createOrder.fulfilled, (state, action) => {
//                 const newOrder = action.payload.order || action.payload;
//                 state.orders.unshift(newOrder);
//                 state.filteredOrders = applyFilters(state.orders, state.filters);
//
//                 state.creating = false;
//                 state.error = null;
//                 state.showAddForm = false;
//
//                 console.log('📦 Order created successfully:', newOrder._id);
//             })
//             .addCase(createOrder.rejected, (state, action) => {
//                 state.creating = false;
//                 state.error = action.payload;
//                 console.error('📦 Order creation failed:', action.payload);
//             })
//
//             // ===== UPDATE ORDER =====
//             .addCase(updateOrder.pending, (state) => {
//                 state.updating = true;
//                 state.error = null;
//             })
//             .addCase(updateOrder.fulfilled, (state, action) => {
//                 const updatedOrder = action.payload.order || action.payload;
//                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
//
//                 if (index !== -1) {
//                     state.orders[index] = updatedOrder;
//                     state.filteredOrders = applyFilters(state.orders, state.filters);
//                 }
//
//                 if (state.currentOrder?._id === updatedOrder._id) {
//                     state.currentOrder = updatedOrder;
//                 }
//
//                 state.updating = false;
//                 state.error = null;
//                 state.editingOrder = null;
//
//                 console.log('📦 Order updated successfully:', updatedOrder._id);
//             })
//             .addCase(updateOrder.rejected, (state, action) => {
//                 state.updating = false;
//                 state.error = action.payload;
//                 console.error('📦 Order update failed:', action.payload);
//             })
//
//             // ===== DELETE ORDER =====
//             .addCase(deleteOrder.pending, (state) => {
//                 state.deleting = true;
//                 state.error = null;
//             })
//             .addCase(deleteOrder.fulfilled, (state, action) => {
//                 const orderId = action.payload?.orderId || action.payload;
//                 state.orders = state.orders.filter(order => order._id !== orderId && order.id !== orderId);
//                 state.filteredOrders = applyFilters(state.orders, state.filters);
//
//                 if (state.currentOrder?._id === orderId) {
//                     state.currentOrder = null;
//                 }
//
//                 // Remove from expanded orders
//                 const newExpandedOrders = new Set(state.expandedOrders);
//                 newExpandedOrders.delete(orderId);
//                 state.expandedOrders = newExpandedOrders;
//
//                 state.deleting = false;
//                 state.error = null;
//
//                 console.log('📦 Order deleted successfully:', orderId);
//             })
//             .addCase(deleteOrder.rejected, (state, action) => {
//                 state.deleting = false;
//                 state.error = action.payload;
//                 console.error('📦 Order deletion failed:', action.payload);
//             })
//
//             // ===== TRACK ORDER =====
//             .addCase(trackOrder.pending, (state) => {
//                 state.trackingLoading = true;
//                 state.trackingError = null;
//             })
//             .addCase(trackOrder.fulfilled, (state, action) => {
//                 const updatedOrder = action.payload.order || action.payload;
//                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
//
//                 if (index !== -1) {
//                     state.orders[index] = updatedOrder;
//                     state.filteredOrders = applyFilters(state.orders, state.filters);
//                 }
//
//                 if (state.currentOrder?._id === updatedOrder._id) {
//                     state.currentOrder = updatedOrder;
//                 }
//
//                 state.trackingLoading = false;
//                 state.trackingError = null;
//
//                 console.log('📦 Order tracked successfully:', updatedOrder._id);
//             })
//             .addCase(trackOrder.rejected, (state, action) => {
//                 state.trackingLoading = false;
//                 state.trackingError = action.payload;
//                 console.error('📦 Order tracking failed:', action.payload);
//             })
//
//             // ===== TRACK MULTIPLE ORDERS =====
//             .addCase(trackMultipleOrders.pending, (state) => {
//                 state.trackingLoading = true;
//                 state.trackingError = null;
//             })
//             .addCase(trackMultipleOrders.fulfilled, (state, action) => {
//                 const { results } = action.payload;
//
//                 if (results && Array.isArray(results)) {
//                     results.forEach(result => {
//                         if (result.success && result.order) {
//                             const index = state.orders.findIndex(order => order._id === result.order._id);
//                             if (index !== -1) {
//                                 state.orders[index] = result.order;
//                             }
//                         }
//                     });
//
//                     state.filteredOrders = applyFilters(state.orders, state.filters);
//                 }
//
//                 state.trackingLoading = false;
//                 state.trackingError = null;
//
//                 console.log('📦 Batch tracking completed:', results?.length || 0);
//             })
//             .addCase(trackMultipleOrders.rejected, (state, action) => {
//                 state.trackingLoading = false;
//                 state.trackingError = action.payload;
//                 console.error('📦 Batch tracking failed:', action.payload);
//             })
//
//             // ===== FETCH ORDER STATS =====
//             .addCase(fetchOrderStats.pending, (state) => {
//                 state.statsLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchOrderStats.fulfilled, (state, action) => {
//                 // FIXED: Better error handling for stats
//                 const stats = action.payload?.stats || action.payload;
//
//                 if (stats && typeof stats === 'object') {
//                     state.orderStats = {
//                         totalOrders: stats.totalOrders || 0,
//                         pendingOrders: stats.pendingOrders || 0,
//                         trackingOrders: stats.trackingOrders || 0,
//                         deliveredOrders: stats.deliveredOrders || 0,
//                         errorOrders: stats.errorOrders || 0,
//                         trackonOrders: stats.trackonOrders || 0,
//                         shreeTirupatiOrders: stats.shreeTirupatiOrders || 0,
//                         averageDeliveryTime: stats.averageDeliveryTime || 0
//                     };
//                 }
//
//                 state.statsLoading = false;
//                 state.error = null;
//
//                 console.log('📦 Order stats loaded successfully:', state.orderStats);
//             })
//             .addCase(fetchOrderStats.rejected, (state, action) => {
//                 state.statsLoading = false;
//                 state.error = action.payload;
//
//                 // Set default stats on error
//                 state.orderStats = {
//                     totalOrders: 0,
//                     pendingOrders: 0,
//                     trackingOrders: 0,
//                     deliveredOrders: 0,
//                     errorOrders: 0,
//                     trackonOrders: 0,
//                     shreeTirupatiOrders: 0,
//                     averageDeliveryTime: 0
//                 };
//
//                 console.error('📦 Order stats fetch failed:', action.payload);
//             })
//
//             // ===== MARK AS DELIVERED =====
//             .addCase(markOrderAsDelivered.pending, (state) => {
//                 state.updating = true;
//                 state.error = null;
//             })
//             .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
//                 const updatedOrder = action.payload.order || action.payload;
//                 const index = state.orders.findIndex(order => order._id === updatedOrder._id);
//
//                 if (index !== -1) {
//                     state.orders[index] = updatedOrder;
//                     state.filteredOrders = applyFilters(state.orders, state.filters);
//                 }
//
//                 if (state.currentOrder?._id === updatedOrder._id) {
//                     state.currentOrder = updatedOrder;
//                 }
//
//                 state.updating = false;
//                 state.error = null;
//
//                 console.log('📦 Order marked as delivered:', updatedOrder._id);
//             })
//             .addCase(markOrderAsDelivered.rejected, (state, action) => {
//                 state.updating = false;
//                 state.error = action.payload;
//                 console.error('📦 Mark as delivered failed:', action.payload);
//             });
//     }
// });
//
// // ==================== EXPORTS ====================
//
// // Action creators
// export const {
//     setFilters,
//     clearFilters,
//     setExpandedOrders,
//     toggleOrderExpanded,
//     setEditingOrder,
//     setShowAddForm,
//     setCurrentOrder,
//     updateOrderInList,
//     removeOrderFromList,
//     setCurrentPage,
//     setItemsPerPage,
//     clearError,
//     clearTrackingError,
//     invalidateCache
// } = orderSlice.actions;
//
// // Selectors
// export const selectOrders = (state) => state.orders.orders;
// export const selectFilteredOrders = (state) => state.orders.filteredOrders;
// export const selectCurrentOrder = (state) => state.orders.currentOrder;
// export const selectOrderStats = (state) => state.orders.orderStats;
// export const selectOrderFilters = (state) => state.orders.filters;
// export const selectExpandedOrders = (state) => state.orders.expandedOrders;
// export const selectEditingOrder = (state) => state.orders.editingOrder;
// export const selectShowAddForm = (state) => state.orders.showAddForm;
//
// // Loading selectors
// export const selectOrdersLoading = (state) => state.orders.ordersLoading;
// export const selectTrackingLoading = (state) => state.orders.trackingLoading;
// export const selectStatsLoading = (state) => state.orders.statsLoading;
// export const selectCreating = (state) => state.orders.creating;
// export const selectUpdating = (state) => state.orders.updating;
// export const selectDeleting = (state) => state.orders.deleting;
//
// // Error selectors
// export const selectOrdersError = (state) => state.orders.error;
// export const selectTrackingError = (state) => state.orders.trackingError;
//
// // Pagination selectors
// export const selectCurrentPage = (state) => state.orders.currentPage;
// export const selectItemsPerPage = (state) => state.orders.itemsPerPage;
// export const selectTotalPages = (state) => state.orders.totalPages;
// export const selectTotalCount = (state) => state.orders.totalCount;
//
// // Complex selectors
// export const selectPaginatedOrders = (state) => {
//     const { filteredOrders, currentPage, itemsPerPage } = state.orders;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredOrders.slice(startIndex, endIndex);
// };
//
// export const selectOrderById = (state, orderId) =>
//     state.orders.orders.find(order => order._id === orderId);
//
// export const selectOrdersByStatus = (state, status) =>
//     state.orders.orders.filter(order => order.status === status);
//
// export const selectOrdersByCourier = (state, courierService) =>
//     state.orders.orders.filter(order => order.courier_service === courierService);
//
// export const selectTrackonOrders = (state) =>
//     state.orders.orders.filter(order => order.courier_service === 'trackon');
//
// export const selectShreeTirupatiOrders = (state) =>
//     state.orders.orders.filter(order => order.courier_service === 'shree_tirupati');
//
// export const selectPendingOrders = (state) =>
//     state.orders.orders.filter(order => order.status === 'pending');
//
// export const selectTrackingOrders = (state) =>
//     state.orders.orders.filter(order => order.status === 'tracking');
//
// export const selectDeliveredOrders = (state) =>
//     state.orders.orders.filter(order => order.status === 'delivered');
//
// export const selectErrorOrders = (state) =>
//     state.orders.orders.filter(order => order.status === 'error');
//
// export const selectRecentOrders = (state, limit = 5) =>
//     state.orders.orders
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, limit);
//
// export const selectOrdersRequiringTracking = (state) =>
//     state.orders.orders.filter(order =>
//         order.courier_service === 'trackon' &&
//         ['pending', 'tracking'].includes(order.status)
//     );
//
// export default orderSlice.reducer;
// store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ==================== ASYNC THUNKS ====================

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (filters = {}, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Fetching user orders with filters:', filters);

            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.courier_service) params.append('courier_service', filters.courier_service);
            if (filters.search) params.append('search', filters.search);
            if (filters.priority) params.append('priority', filters.priority);
            if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
            if (filters.dateTo) params.append('dateTo', filters.dateTo);
            if (filters.sortBy) params.append('sortBy', filters.sortBy);
            if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

            const queryString = params.toString();
            const url = `/api/orders${queryString ? `?${queryString}` : ''}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Orders fetch response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Orders fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Creating order:', orderData);
            const response = await axios.post('/api/orders', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Create order response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Create order error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async ({ orderId, orderData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Updating order:', orderId, orderData);
            const response = await axios.put(`/api/orders/${orderId}`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Update order response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Update order error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to update order');
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Deleting order:', orderId);
            await axios.delete(`/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Order deleted successfully');
            return orderId;
        } catch (error) {
            console.error('📦 Delete order error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
        }
    }
);

export const trackOrder = createAsyncThunk(
    'orders/trackOrder',
    async (orderId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Tracking order:', orderId);
            const response = await axios.post(`/api/orders/${orderId}/track`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Track order response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Track order error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to track order');
        }
    }
);

export const trackMultipleOrders = createAsyncThunk(
    'orders/trackMultipleOrders',
    async ({ orderIds, courierService }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Batch tracking orders:', { orderIds, courierService });
            const response = await axios.post('/api/orders/track/batch', {
                orderIds,
                courierService
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Batch track response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Batch track error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to track orders');
        }
    }
);

export const fetchOrderStats = createAsyncThunk(
    'orders/fetchOrderStats',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Fetching order statistics');
            const response = await axios.get('/api/orders/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Order stats response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Order stats error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order statistics');
        }
    }
);

export const markOrderAsDelivered = createAsyncThunk(
    'orders/markAsDelivered',
    async ({ orderId, deliveryNotes }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('Authentication required');
            }

            console.log('📦 Marking order as delivered:', orderId);
            const response = await axios.post(`/api/orders/${orderId}/delivered`, {
                deliveryNotes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('📦 Mark delivered response:', response.data);
            return response.data;
        } catch (error) {
            console.error('📦 Mark delivered error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to mark order as delivered');
        }
    }
);

// ==================== INITIAL STATE ====================

const initialState = {
    // Orders data
    orders: [],
    filteredOrders: [],
    currentOrder: null,

    // Statistics
    orderStats: {
        totalOrders: 0,
        pendingOrders: 0,
        trackingOrders: 0,
        deliveredOrders: 0,
        errorOrders: 0,
        trackonOrders: 0,
        shreeTirupatiOrders: 0,
        averageDeliveryTime: 0
    },

    // Filters and search
    filters: {
        status: '',
        courier_service: '',
        search: '',
        priority: '',
        dateFrom: '',
        dateTo: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    },

    // UI state - Using array instead of Set for Immer compatibility
    expandedOrders: [],
    editingOrder: null,
    showAddForm: false,

    // Loading states
    loading: false,
    ordersLoading: false,
    trackingLoading: false,
    statsLoading: false,
    creating: false,
    updating: false,
    deleting: false,

    // Error states
    error: null,
    trackingError: null,

    // Pagination
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalCount: 0,

    // Cache management
    lastFetchTime: null,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
};

// ==================== HELPER FUNCTIONS ====================

const applyFilters = (orders, filters) => {
    let filtered = [...orders];

    // Apply search filter
    if (filters.search?.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filtered = filtered.filter(order =>
            order.tracking_id.toLowerCase().includes(searchTerm) ||
            order.recipient_name.toLowerCase().includes(searchTerm) ||
            order.recipient_location.toLowerCase().includes(searchTerm) ||
            order.current_status?.toLowerCase().includes(searchTerm)
        );
    }

    // Apply status filter
    if (filters.status) {
        filtered = filtered.filter(order => order.status === filters.status);
    }

    // Apply courier service filter
    if (filters.courier_service) {
        filtered = filtered.filter(order => order.courier_service === filters.courier_service);
    }

    // Apply priority filter
    if (filters.priority) {
        filtered = filtered.filter(order => order.priority === filters.priority);
    }

    // Apply date filters
    if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        filtered = filtered.filter(order => new Date(order.createdAt) >= fromDate);
    }

    if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // End of day
        filtered = filtered.filter(order => new Date(order.createdAt) <= toDate);
    }

    // Apply sorting
    filtered.sort((a, b) => {
        let aValue = a[filters.sortBy];
        let bValue = b[filters.sortBy];

        // Handle date sorting
        if (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        // Handle string sorting
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (filters.sortOrder === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    return filtered;
};

// ==================== SLICE ====================

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // ===== FILTER MANAGEMENT =====
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredOrders = applyFilters(state.orders, state.filters);
            state.totalCount = state.filteredOrders.length;
            state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);

            // Reset to first page if current page is out of bounds
            if (state.currentPage > state.totalPages && state.totalPages > 0) {
                state.currentPage = 1;
            }
        },

        clearFilters: (state) => {
            state.filters = {
                status: '',
                courier_service: '',
                search: '',
                priority: '',
                dateFrom: '',
                dateTo: '',
                sortBy: 'createdAt',
                sortOrder: 'desc'
            };
            state.filteredOrders = [...state.orders];
            state.currentPage = 1;
        },

        // ===== UI STATE MANAGEMENT =====
        setExpandedOrders: (state, action) => {
            state.expandedOrders = action.payload;
        },

        toggleOrderExpanded: (state, action) => {
            const orderId = action.payload;
            const index = state.expandedOrders.indexOf(orderId);

            if (index > -1) {
                state.expandedOrders.splice(index, 1);
            } else {
                state.expandedOrders.push(orderId);
            }
        },

        setEditingOrder: (state, action) => {
            state.editingOrder = action.payload;
        },

        setShowAddForm: (state, action) => {
            state.showAddForm = action.payload;
        },

        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        },

        // ===== ORDER MANAGEMENT =====
        updateOrderInList: (state, action) => {
            const updatedOrder = action.payload;
            const index = state.orders.findIndex(order => order._id === updatedOrder._id);

            if (index !== -1) {
                state.orders[index] = updatedOrder;
                state.filteredOrders = applyFilters(state.orders, state.filters);

                // Update current order if it matches
                if (state.currentOrder?._id === updatedOrder._id) {
                    state.currentOrder = updatedOrder;
                }
            }
        },

        removeOrderFromList: (state, action) => {
            const orderId = action.payload;
            state.orders = state.orders.filter(order => order._id !== orderId);
            state.filteredOrders = applyFilters(state.orders, state.filters);

            // Clear current order if it was deleted
            if (state.currentOrder?._id === orderId) {
                state.currentOrder = null;
            }

            // Remove from expanded orders
            state.expandedOrders = state.expandedOrders.filter(id => id !== orderId);
        },

        // ===== PAGINATION =====
        setCurrentPage: (state, action) => {
            const page = action.payload;
            if (page >= 1 && page <= state.totalPages) {
                state.currentPage = page;
            }
        },

        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
            state.totalPages = Math.ceil(state.filteredOrders.length / state.itemsPerPage);
            state.currentPage = 1;
        },

        // ===== ERROR MANAGEMENT =====
        clearError: (state) => {
            state.error = null;
            state.trackingError = null;
        },

        clearTrackingError: (state) => {
            state.trackingError = null;
        },

        // ===== CACHE MANAGEMENT =====
        invalidateCache: (state) => {
            state.lastFetchTime = null;
        }
    },

    extraReducers: (builder) => {
        builder
            // ===== FETCH USER ORDERS =====
            .addCase(fetchUserOrders.pending, (state) => {
                state.ordersLoading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                const { orders, pagination } = action.payload;

                state.orders = orders || [];
                state.filteredOrders = applyFilters(state.orders, state.filters);

                // Update pagination if provided
                if (pagination) {
                    state.currentPage = pagination.currentPage || 1;
                    state.totalPages = pagination.totalPages || 1;
                    state.totalCount = pagination.totalCount || state.orders.length;
                } else {
                    state.totalCount = state.orders.length;
                    state.totalPages = Math.ceil(state.orders.length / state.itemsPerPage);
                }

                state.ordersLoading = false;
                state.error = null;
                state.lastFetchTime = Date.now();

                console.log('📦 Orders loaded successfully:', state.orders.length);
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.ordersLoading = false;
                state.error = action.payload;
                console.error('📦 Orders fetch failed:', action.payload);
            })

            // ===== CREATE ORDER =====
            .addCase(createOrder.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                const newOrder = action.payload.order || action.payload;
                state.orders.unshift(newOrder);
                state.filteredOrders = applyFilters(state.orders, state.filters);

                state.creating = false;
                state.error = null;
                state.showAddForm = false;

                console.log('📦 Order created successfully:', newOrder._id);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
                console.error('📦 Order creation failed:', action.payload);
            })

            // ===== UPDATE ORDER =====
            .addCase(updateOrder.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const updatedOrder = action.payload.order || action.payload;
                const index = state.orders.findIndex(order => order._id === updatedOrder._id);

                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                    state.filteredOrders = applyFilters(state.orders, state.filters);
                }

                if (state.currentOrder?._id === updatedOrder._id) {
                    state.currentOrder = updatedOrder;
                }

                state.updating = false;
                state.error = null;
                state.editingOrder = null;

                console.log('📦 Order updated successfully:', updatedOrder._id);
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
                console.error('📦 Order update failed:', action.payload);
            })

            // ===== DELETE ORDER =====
            .addCase(deleteOrder.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                const orderId = action.payload;
                state.orders = state.orders.filter(order => order._id !== orderId);
                state.filteredOrders = applyFilters(state.orders, state.filters);

                if (state.currentOrder?._id === orderId) {
                    state.currentOrder = null;
                }

                // Remove from expanded orders
                state.expandedOrders = state.expandedOrders.filter(id => id !== orderId);

                state.deleting = false;
                state.error = null;

                console.log('📦 Order deleted successfully:', orderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
                console.error('📦 Order deletion failed:', action.payload);
            })

            // ===== TRACK ORDER =====
            .addCase(trackOrder.pending, (state) => {
                state.trackingLoading = true;
                state.trackingError = null;
            })
            .addCase(trackOrder.fulfilled, (state, action) => {
                const updatedOrder = action.payload.order || action.payload;
                const index = state.orders.findIndex(order => order._id === updatedOrder._id);

                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                    state.filteredOrders = applyFilters(state.orders, state.filters);
                }

                if (state.currentOrder?._id === updatedOrder._id) {
                    state.currentOrder = updatedOrder;
                }

                state.trackingLoading = false;
                state.trackingError = null;

                console.log('📦 Order tracked successfully:', updatedOrder._id);
            })
            .addCase(trackOrder.rejected, (state, action) => {
                state.trackingLoading = false;
                state.trackingError = action.payload;
                console.error('📦 Order tracking failed:', action.payload);
            })

            // ===== TRACK MULTIPLE ORDERS =====
            .addCase(trackMultipleOrders.pending, (state) => {
                state.trackingLoading = true;
                state.trackingError = null;
            })
            .addCase(trackMultipleOrders.fulfilled, (state, action) => {
                const { results } = action.payload;

                if (results && Array.isArray(results)) {
                    results.forEach(result => {
                        if (result.success && result.order) {
                            const index = state.orders.findIndex(order => order._id === result.order._id);
                            if (index !== -1) {
                                state.orders[index] = result.order;
                            }
                        }
                    });

                    state.filteredOrders = applyFilters(state.orders, state.filters);
                }

                state.trackingLoading = false;
                state.trackingError = null;

                console.log('📦 Batch tracking completed:', results?.length || 0);
            })
            .addCase(trackMultipleOrders.rejected, (state, action) => {
                state.trackingLoading = false;
                state.trackingError = action.payload;
                console.error('📦 Batch tracking failed:', action.payload);
            })

            // ===== FETCH ORDER STATS =====
            .addCase(fetchOrderStats.pending, (state) => {
                state.statsLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderStats.fulfilled, (state, action) => {
                // FIXED: Better error handling for stats
                const stats = action.payload?.stats || action.payload;

                if (stats && typeof stats === 'object') {
                    state.orderStats = {
                        totalOrders: stats.totalOrders || 0,
                        pendingOrders: stats.pendingOrders || 0,
                        trackingOrders: stats.trackingOrders || 0,
                        deliveredOrders: stats.deliveredOrders || 0,
                        errorOrders: stats.errorOrders || 0,
                        trackonOrders: stats.trackonOrders || 0,
                        shreeTirupatiOrders: stats.shreeTirupatiOrders || 0,
                        averageDeliveryTime: stats.averageDeliveryTime || 0
                    };
                }

                state.statsLoading = false;
                state.error = null;

                console.log('📦 Order stats loaded successfully:', state.orderStats);
            })
            .addCase(fetchOrderStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.payload;

                // Set default stats on error
                state.orderStats = {
                    totalOrders: 0,
                    pendingOrders: 0,
                    trackingOrders: 0,
                    deliveredOrders: 0,
                    errorOrders: 0,
                    trackonOrders: 0,
                    shreeTirupatiOrders: 0,
                    averageDeliveryTime: 0
                };

                console.error('📦 Order stats fetch failed:', action.payload);
            })

            // ===== MARK AS DELIVERED =====
            .addCase(markOrderAsDelivered.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
                const updatedOrder = action.payload.order || action.payload;
                const index = state.orders.findIndex(order => order._id === updatedOrder._id);

                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                    state.filteredOrders = applyFilters(state.orders, state.filters);
                }

                if (state.currentOrder?._id === updatedOrder._id) {
                    state.currentOrder = updatedOrder;
                }

                state.updating = false;
                state.error = null;

                console.log('📦 Order marked as delivered:', updatedOrder._id);
            })
            .addCase(markOrderAsDelivered.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
                console.error('📦 Mark as delivered failed:', action.payload);
            });
    }
});

// ==================== EXPORTS ====================

// Action creators
export const {
    setFilters,
    clearFilters,
    setExpandedOrders,
    toggleOrderExpanded,
    setEditingOrder,
    setShowAddForm,
    setCurrentOrder,
    updateOrderInList,
    removeOrderFromList,
    setCurrentPage,
    setItemsPerPage,
    clearError,
    clearTrackingError,
    invalidateCache
} = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectFilteredOrders = (state) => state.orders.filteredOrders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderStats = (state) => state.orders.orderStats;
export const selectOrderFilters = (state) => state.orders.filters;
export const selectExpandedOrders = (state) => state.orders.expandedOrders;
export const selectEditingOrder = (state) => state.orders.editingOrder;
export const selectShowAddForm = (state) => state.orders.showAddForm;

// Loading selectors
export const selectOrdersLoading = (state) => state.orders.ordersLoading;
export const selectTrackingLoading = (state) => state.orders.trackingLoading;
export const selectStatsLoading = (state) => state.orders.statsLoading;
export const selectCreating = (state) => state.orders.creating;
export const selectUpdating = (state) => state.orders.updating;
export const selectDeleting = (state) => state.orders.deleting;

// Error selectors
export const selectOrdersError = (state) => state.orders.error;
export const selectTrackingError = (state) => state.orders.trackingError;

// Pagination selectors
export const selectCurrentPage = (state) => state.orders.currentPage;
export const selectItemsPerPage = (state) => state.orders.itemsPerPage;
export const selectTotalPages = (state) => state.orders.totalPages;
export const selectTotalCount = (state) => state.orders.totalCount;

// Complex selectors
export const selectPaginatedOrders = (state) => {
    const { filteredOrders, currentPage, itemsPerPage } = state.orders;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
};

export const selectOrderById = (state, orderId) =>
    state.orders.orders.find(order => order._id === orderId);

export const selectOrdersByStatus = (state, status) =>
    state.orders.orders.filter(order => order.status === status);

export const selectOrdersByCourier = (state, courierService) =>
    state.orders.orders.filter(order => order.courier_service === courierService);

export const selectTrackonOrders = (state) =>
    state.orders.orders.filter(order => order.courier_service === 'trackon');

export const selectShreeTirupatiOrders = (state) =>
    state.orders.orders.filter(order => order.courier_service === 'shree_tirupati');

export const selectPendingOrders = (state) =>
    state.orders.orders.filter(order => order.status === 'pending');

export const selectTrackingOrders = (state) =>
    state.orders.orders.filter(order => order.status === 'tracking');

export const selectDeliveredOrders = (state) =>
    state.orders.orders.filter(order => order.status === 'delivered');

export const selectErrorOrders = (state) =>
    state.orders.orders.filter(order => order.status === 'error');

export const selectRecentOrders = (state, limit = 5) =>
    state.orders.orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

export const selectOrdersRequiringTracking = (state) =>
    state.orders.orders.filter(order =>
        order.courier_service === 'trackon' &&
        ['pending', 'tracking'].includes(order.status)
    );

export default orderSlice.reducer;