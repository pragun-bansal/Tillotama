// hooks/useOrders.js
import { useAppDispatch, useAppSelector } from './redux';
import React from 'react';
import { useMemo, useCallback } from 'react';
import {
    fetchUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    trackOrder,
    trackMultipleOrders,
    fetchOrderStats,
    markOrderAsDelivered,
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
    invalidateCache,
    selectOrders,
    selectFilteredOrders,
    selectCurrentOrder,
    selectOrderStats,
    selectOrderFilters,
    selectExpandedOrders,
    selectEditingOrder,
    selectShowAddForm,
    selectOrdersLoading,
    selectTrackingLoading,
    selectStatsLoading,
    selectCreating,
    selectUpdating,
    selectDeleting,
    selectOrdersError,
    selectTrackingError,
    selectCurrentPage,
    selectItemsPerPage,
    selectTotalPages,
    selectTotalCount,
    selectPaginatedOrders,
    selectOrderById,
    selectOrdersByStatus,
    selectOrdersByCourier,
    selectTrackonOrders,
    selectShreeTirupatiOrders,
    selectPendingOrders,
    selectTrackingOrders,
    selectDeliveredOrders,
    selectErrorOrders,
    selectRecentOrders,
    selectOrdersRequiringTracking
} from '@/store/slices/orderSlice';

export const useOrders = () => {
    const dispatch = useAppDispatch();

    // ==================== SELECTORS ====================
    const orders = useAppSelector(selectOrders);
    const filteredOrders = useAppSelector(selectFilteredOrders);
    const currentOrder = useAppSelector(selectCurrentOrder);
    const orderStats = useAppSelector(selectOrderStats);
    const filters = useAppSelector(selectOrderFilters);
    const expandedOrders = useAppSelector(selectExpandedOrders);
    const editingOrder = useAppSelector(selectEditingOrder);
    const showAddForm = useAppSelector(selectShowAddForm);

    // Loading states
    const ordersLoading = useAppSelector(selectOrdersLoading);
    const trackingLoading = useAppSelector(selectTrackingLoading);
    const statsLoading = useAppSelector(selectStatsLoading);
    const creating = useAppSelector(selectCreating);
    const updating = useAppSelector(selectUpdating);
    const deleting = useAppSelector(selectDeleting);

    // Error states
    const ordersError = useAppSelector(selectOrdersError);
    const trackingError = useAppSelector(selectTrackingError);

    // Pagination
    const currentPage = useAppSelector(selectCurrentPage);
    const itemsPerPage = useAppSelector(selectItemsPerPage);
    const totalPages = useAppSelector(selectTotalPages);
    const totalCount = useAppSelector(selectTotalCount);
    const paginatedOrders = useAppSelector(selectPaginatedOrders);

    // User data
    const { user, isAuthenticated } = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }));

    // ==================== ACTION CREATORS ====================
    const actions = useMemo(() => ({
        // Data fetching
        fetchOrders: (filters = {}) => dispatch(fetchUserOrders(filters)),
        fetchStats: () => dispatch(fetchOrderStats()),

        // CRUD operations
        createOrder: (orderData) => dispatch(createOrder(orderData)),
        updateOrder: (orderId, orderData) => dispatch(updateOrder({ orderId, orderData })),
        deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),

        // Tracking operations
        trackOrder: (orderId) => dispatch(trackOrder(orderId)),
        trackMultipleOrders: (orderIds, courierService) =>
            dispatch(trackMultipleOrders({ orderIds, courierService })),
        markAsDelivered: (orderId, deliveryNotes = '') =>
            dispatch(markOrderAsDelivered({ orderId, deliveryNotes })),

        // Filter management
        setFilters: (newFilters) => dispatch(setFilters(newFilters)),
        clearFilters: () => dispatch(clearFilters()),

        // UI state management
        setExpandedOrders: (orderIds) => dispatch(setExpandedOrders(orderIds)),
        toggleOrderExpanded: (orderId) => dispatch(toggleOrderExpanded(orderId)),
        setEditingOrder: (orderId) => dispatch(setEditingOrder(orderId)),
        setShowAddForm: (show) => dispatch(setShowAddForm(show)),
        setCurrentOrder: (order) => dispatch(setCurrentOrder(order)),

        // List management
        updateOrderInList: (order) => dispatch(updateOrderInList(order)),
        removeOrderFromList: (orderId) => dispatch(removeOrderFromList(orderId)),

        // Pagination
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
        setItemsPerPage: (count) => dispatch(setItemsPerPage(count)),

        // Error management
        clearError: () => dispatch(clearError()),
        clearTrackingError: () => dispatch(clearTrackingError()),

        // Cache management
        invalidateCache: () => dispatch(invalidateCache())
    }), [dispatch]);

    // ==================== COMPUTED VALUES ====================
    const computed = useMemo(() => {
        const sortedOrders = [...orders].sort((a, b) => {
            const sortBy = filters.sortBy || 'createdAt';
            const sortOrder = filters.sortOrder || 'desc';

            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Handle date sorting
            if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            // Handle string sorting
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });

        const ordersByStatus = orders.reduce((acc, order) => {
            if (!acc[order.status]) acc[order.status] = [];
            acc[order.status].push(order);
            return acc;
        }, {});

        const ordersByCourier = orders.reduce((acc, order) => {
            if (!acc[order.courier_service]) acc[order.courier_service] = [];
            acc[order.courier_service].push(order);
            return acc;
        }, {});

        const hasActiveFilters = (
            filters.status ||
            filters.courier_service ||
            filters.search ||
            filters.priority ||
            filters.dateFrom ||
            filters.dateTo
        );

        const anyLoading = ordersLoading || trackingLoading || creating || updating || deleting;

        return {
            sortedOrders,
            ordersByStatus,
            ordersByCourier,
            hasActiveFilters,
            anyLoading,
            isEmpty: orders.length === 0,
            hasOrders: orders.length > 0,
            hasFilteredResults: filteredOrders.length > 0,
            filteredCount: filteredOrders.length,
            totalOrders: orders.length,
            isLastPage: currentPage >= totalPages,
            isFirstPage: currentPage <= 1,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
        };
    }, [
        orders,
        filteredOrders,
        filters,
        currentPage,
        totalPages,
        ordersLoading,
        trackingLoading,
        creating,
        updating,
        deleting
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
            const orderDate = new Date(date);
            const diffInMs = now - orderDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInDays === 0) return 'Today';
            if (diffInDays === 1) return 'Yesterday';
            if (diffInDays < 7) return `${diffInDays} days ago`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
            return `${Math.floor(diffInDays / 365)} years ago`;
        },

        // Get status color
        getStatusColor: (status) => {
            const colors = {
                pending: 'bg-gray-100 text-gray-800',
                tracking: 'bg-blue-100 text-blue-800',
                delivered: 'bg-green-100 text-green-800',
                error: 'bg-red-100 text-red-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        },

        // Get courier color
        getCourierColor: (courier) => {
            const colors = {
                trackon: 'bg-purple-100 text-purple-800',
                shree_tirupati: 'bg-orange-100 text-orange-800'
            };
            return colors[courier] || 'bg-gray-100 text-gray-800';
        },

        // Get priority color
        getPriorityColor: (priority) => {
            const colors = {
                low: 'bg-gray-100 text-gray-800',
                medium: 'bg-yellow-100 text-yellow-800',
                high: 'bg-orange-100 text-orange-800',
                urgent: 'bg-red-100 text-red-800'
            };
            return colors[priority] || 'bg-gray-100 text-gray-800';
        },

        // Get courier display name
        getCourierDisplayName: (courier) => {
            const names = {
                trackon: 'Trackon',
                shree_tirupati: 'Shree Tirupati'
            };
            return names[courier] || courier;
        },

        // Get status icon component
        getStatusIcon: (status) => {
            // Return icon name for use with Lucide React
            const icons = {
                pending: 'Package',
                tracking: 'Clock',
                delivered: 'CheckCircle',
                error: 'XCircle'
            };
            return icons[status] || 'Package';
        },

        // Check if order can be tracked
        canTrackOrder: (order) => {
            return order.courier_service === 'trackon' &&
                ['pending', 'tracking','error','delivered'].includes(order.status);
        },

        // Check if order can be edited
        canEditOrder: (order) => {
            return user?._id === order.user?._id || user?.admin;
        },

        // Check if order can be deleted
        canDeleteOrder: (order) => {
            return user?._id === order.user?._id || user?.admin;
        },

        // Get order summary for display
        getOrderSummary: (order) => {
            return {
                id: order._id,
                trackingId: order.tracking_id,
                recipient: order.recipient_name,
                location: order.recipient_location,
                status: order.status,
                courier: helpers.getCourierDisplayName(order.courier_service),
                createdAt: helpers.formatDate(order.createdAt),
                relativeTime: helpers.formatRelativeTime(order.createdAt),
                canTrack: helpers.canTrackOrder(order),
                canEdit: helpers.canEditOrder(order),
                canDelete: helpers.canDeleteOrder(order)
            };
        },

        // Generate tracking URL for Shree Tirupati
        getShreeTirupatiUrl: (trackingId) => {
            return `http://www.shreetirupaticourier.net/Frm_DocTrack.aspx?docno=${encodeURIComponent(trackingId)}`;
        }
    }), [user]);

    // ==================== QUICK ACTIONS ====================
    const quickActions = useMemo(() => ({
        // Start creating new order
        startCreating: () => {
            if (!isAuthenticated) {
                return false;
            }
            actions.setShowAddForm(true);
            return true;
        },

        // Start editing order
        startEditing: (order) => {
            actions.setEditingOrder(order._id);
            actions.setCurrentOrder(order);
            return true;
        },

        // Cancel any modal
        cancelModal: () => {
            actions.setShowAddForm(false);
            actions.setEditingOrder(null);
            actions.setCurrentOrder(null);
        },

        // Submit new order
        submitOrder: async (orderData) => {
            if (!isAuthenticated) return false;

            try {
                await actions.createOrder(orderData);
                return true;
            } catch (error) {
                console.error('Failed to create order:', error);
                return false;
            }
        },

        // Update existing order
        submitUpdate: async (orderId, orderData) => {
            if (!isAuthenticated) return false;

            try {
                await actions.updateOrder(orderId, orderData);
                return true;
            } catch (error) {
                console.error('Failed to update order:', error);
                return false;
            }
        },

        // Delete order with confirmation
        confirmDelete: async (orderId) => {
            if (!isAuthenticated) return false;

            try {
                await actions.deleteOrder(orderId);
                return true;
            } catch (error) {
                console.error('Failed to delete order:', error);
                return false;
            }
        },

        // Track single order
        trackSingleOrder: async (orderId) => {
            try {
                await actions.trackOrder(orderId);
                return true;
            } catch (error) {
                console.error('Failed to track order:', error);
                return false;
            }
        },

        // Track all Trackon orders
        trackAllTrackon: async () => {
            const trackonOrders = orders.filter(order =>
                order.courier_service === 'trackon' &&
                ['pending', 'tracking','error'].includes(order.status)
            );

            if (trackonOrders.length === 0) {
                return { success: false, message: 'No Trackon orders to track' };
            }

            try {
                const orderIds = trackonOrders.map(order => order._id);
                await actions.trackMultipleOrders(orderIds, 'trackon');
                return { success: true, count: orderIds.length };
            } catch (error) {
                console.error('Failed to track orders:', error);
                return { success: false, message: 'Failed to track orders' };
            }
        },

        // Open Shree Tirupati details
        openShreeTirupatiDetails: (order) => {
            if (order.courier_service === 'shree_tirupati') {
                const url = helpers.getShreeTirupatiUrl(order.tracking_id);
                window.open(url, '_blank');
                return true;
            }
            return false;
        },

        // Load more orders (pagination)
        loadMoreOrders: () => {
            if (computed.hasNextPage) {
                actions.setCurrentPage(currentPage + 1);
            }
        },

        // Load previous orders
        loadPreviousOrders: () => {
            if (computed.hasPreviousPage) {
                actions.setCurrentPage(currentPage - 1);
            }
        },

        // Refresh orders data
        refreshOrders: async () => {
            actions.invalidateCache();
            try {
                await actions.fetchOrders(filters);
                await actions.fetchStats();
                return true;
            } catch (error) {
                console.error('Failed to refresh orders:', error);
                return false;
            }
        },

        // Apply quick filters
        applyQuickFilter: (filterType, value) => {
            const newFilters = { ...filters };

            switch (filterType) {
                case 'status':
                    newFilters.status = newFilters.status === value ? '' : value;
                    break;
                case 'courier':
                    newFilters.courier_service = newFilters.courier_service === value ? '' : value;
                    break;
                case 'priority':
                    newFilters.priority = newFilters.priority === value ? '' : value;
                    break;
                default:
                    break;
            }

            actions.setFilters(newFilters);
        },

        // Search orders
        searchOrders: (searchTerm) => {
            actions.setFilters({ ...filters, search: searchTerm });
        },

        // Clear search
        clearSearch: () => {
            actions.setFilters({ ...filters, search: '' });
        }
    }), [
        isAuthenticated,
        orders,
        filters,
        currentPage,
        computed.hasNextPage,
        computed.hasPreviousPage,
        actions,
        helpers
    ]);

    // ==================== SPECIALIZED SELECTORS ====================
    const specialSelectors = useMemo(() => ({
        getOrderById: (orderId) => orders.find(order => order._id === orderId),
        getOrdersByStatus: (status) => orders.filter(order => order.status === status),
        getOrdersByCourier: (courier) => orders.filter(order => order.courier_service === courier),
        getTrackonOrders: () => orders.filter(order => order.courier_service === 'trackon'),
        getShreeTirupatiOrders: () => orders.filter(order => order.courier_service === 'shree_tirupati'),
        getPendingOrders: () => orders.filter(order => order.status === 'pending'),
        getTrackingOrders: () => orders.filter(order => order.status === 'tracking'),
        getDeliveredOrders: () => orders.filter(order => order.status === 'delivered'),
        getErrorOrders: () => orders.filter(order => order.status === 'error'),
        getRecentOrders: (limit = 5) =>
            [...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, limit),
        getOrdersRequiringTracking: () =>
            orders.filter(order =>
                order.courier_service === 'trackon' &&
                ['pending', 'tracking'].includes(order.status)
            )
    }), [orders]);

    // ==================== INITIALIZATION ====================
    // Auto-fetch orders when component mounts or auth changes
    React.useEffect(() => {
        if (isAuthenticated) {
            actions.fetchOrders(filters);
            actions.fetchStats();
        }
    }, [isAuthenticated, actions]);

    // ==================== RETURN ALL DATA AND FUNCTIONS ====================
    return {
        // Data
        orders,
        filteredOrders,
        paginatedOrders,
        currentOrder,
        orderStats,
        filters,
        user,
        isAuthenticated,

        // UI State
        expandedOrders,
        editingOrder,
        showAddForm,

        // Loading states
        ordersLoading,
        trackingLoading,
        statsLoading,
        creating,
        updating,
        deleting,

        // Error states
        ordersError,
        trackingError,

        // Pagination
        currentPage,
        itemsPerPage,
        totalPages,
        totalCount,

        // Computed values
        ...computed,

        // Actions
        ...actions,

        // Helpers
        ...helpers,

        // Quick actions
        ...quickActions,

        // Specialized selectors
        ...specialSelectors
    };
};

// Export individual hooks for specific use cases
export const useOrderStats = () => {
    const orderStats = useAppSelector(selectOrderStats);
    const statsLoading = useAppSelector(selectStatsLoading);
    const ordersError = useAppSelector(selectOrdersError);

    return {
        stats: orderStats,
        loading: statsLoading,
        error: ordersError,
        isEmpty: orderStats.totalOrders === 0
    };
};

export const useOrdersState = () => {
    return useAppSelector((state) => ({
        orders: state.orders.orders,
        filteredOrders: state.orders.filteredOrders,
        currentOrder: state.orders.currentOrder,
        orderStats: state.orders.orderStats,
        filters: state.orders.filters,
        loading: state.orders.ordersLoading,
        error: state.orders.error,
        expandedOrders: state.orders.expandedOrders,
        editingOrder: state.orders.editingOrder,
        showAddForm: state.orders.showAddForm
    }));
};

export const useOrderPermissions = () => {
    return useAppSelector((state) => {
        const userId = state.user.data?._id;
        const isAuthenticated = state.user.isAuthenticated;
        const isAdmin = state.user.data?.admin;

        return {
            isAuthenticated,
            isAdmin,
            canCreateOrder: isAuthenticated,
            canEditOrder: (order) => userId === order.user?._id || isAdmin,
            canDeleteOrder: (order) => userId === order.user?._id || isAdmin,
            canTrackOrder: (order) => userId === order.user?._id || isAdmin,
            canViewOrder: (order) => userId === order.user?._id || isAdmin
        };
    });
};

export const useOrderFilters = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectOrderFilters);
    const filteredOrders = useAppSelector(selectFilteredOrders);

    const updateFilters = useCallback((newFilters) => {
        dispatch(setFilters(newFilters));
    }, [dispatch]);

    const clearAllFilters = useCallback(() => {
        dispatch(clearFilters());
    }, [dispatch]);

    return {
        filters,
        filteredOrders,
        updateFilters,
        clearAllFilters,
        hasActiveFilters: !!(
            filters.status ||
            filters.courier_service ||
            filters.search ||
            filters.priority ||
            filters.dateFrom ||
            filters.dateTo
        )
    };
};

export const useOrderPagination = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector(selectCurrentPage);
    const itemsPerPage = useAppSelector(selectItemsPerPage);
    const totalPages = useAppSelector(selectTotalPages);
    const totalCount = useAppSelector(selectTotalCount);
    const paginatedOrders = useAppSelector(selectPaginatedOrders);

    const goToPage = useCallback((page) => {
        dispatch(setCurrentPage(page));
    }, [dispatch]);

    const changeItemsPerPage = useCallback((count) => {
        dispatch(setItemsPerPage(count));
    }, [dispatch]);

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        totalCount,
        paginatedOrders,
        goToPage,
        changeItemsPerPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages
    };
};