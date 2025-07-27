//
// "use client";
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Plus, RefreshCw, Package, MapPin, User, Calendar, CheckCircle, XCircle, Clock, Search, ExternalLink, Edit2, Trash2, Save, X, AlertCircle, TrendingUp, Filter } from 'lucide-react';
// import { useOrders, useOrderStats, useOrderPermissions } from '@/hooks/useOrders';
//
// // Types
// interface AddOrderForm {
//     tracking_id: string;
//     recipient_name: string;
//     recipient_location: string;
//     courier_service: 'trackon' | 'shree_tirupati';
//     priority: 'low' | 'medium' | 'high' | 'urgent';
//     order_value: number;
//     order_notes: string;
//     expected_delivery: string;
//     auto_track: boolean;
// }
//
// const OrderTracker = () => {
//     const {
//         // Data
//         orders,
//         paginatedOrders,
//         orderStats,
//         filters,
//         isAuthenticated,
//
//         // UI State
//         expandedOrders,
//         editingOrder,
//         showAddForm,
//
//         // Loading states
//         ordersLoading,
//         trackingLoading,
//         creating,
//         updating,
//         deleting,
//
//         // Error states
//         ordersError,
//         trackingError,
//
//         // Pagination
//         currentPage,
//         totalPages,
//         totalCount,
//
//         // Computed values
//         hasActiveFilters,
//         anyLoading,
//         isEmpty,
//         hasNextPage,
//         hasPreviousPage,
//
//         // Actions
//         fetchOrders,
//         createOrder,
//         updateOrder,
//         deleteOrder,
//         setFilters,
//         clearFilters,
//         setShowAddForm,
//         setEditingOrder,
//         toggleOrderExpanded,
//         setCurrentPage,
//
//         // Quick actions
//         startCreating,
//         startEditing,
//         cancelModal,
//         submitOrder,
//         submitUpdate,
//         confirmDelete,
//         trackSingleOrder,
//         trackAllTrackon,
//         openShreeTirupatiDetails,
//         refreshOrders,
//         applyQuickFilter,
//         searchOrders,
//
//         // Helpers
//         formatDate,
//         formatRelativeTime,
//         getStatusColor,
//         getCourierColor,
//         getPriorityColor,
//         getCourierDisplayName,
//         getStatusIcon,
//         canTrackOrder,
//         canEditOrder,
//         canDeleteOrder,
//
//         // Specialized selectors
//         getTrackonOrders,
//         getOrdersRequiringTracking
//     } = useOrders();
//
//     const { stats, loading: statsLoading } = useOrderStats();
//     const { canCreateOrder } = useOrderPermissions();
//
//     // Form state
//     const [formData, setFormData] = useState<AddOrderForm>({
//         tracking_id: '',
//         recipient_name: '',
//         recipient_location: '',
//         courier_service: 'trackon',
//         priority: 'medium',
//         order_value: 0,
//         order_notes: '',
//         expected_delivery: '',
//         auto_track: true
//     });
//
//     const [editFormData, setEditFormData] = useState<AddOrderForm>({
//         tracking_id: '',
//         recipient_name: '',
//         recipient_location: '',
//         courier_service: 'trackon',
//         priority: 'medium',
//         order_value: 0,
//         order_notes: '',
//         expected_delivery: '',
//         auto_track: true
//     });
//
//     // Search state
//     const [searchTerm, setSearchTerm] = useState(filters.search || '');
//     const [showFilters, setShowFilters] = useState(false);
//
//     // Initialize data
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchOrders();
//         }
//     }, [isAuthenticated, fetchOrders]);
//
//     // Handle form submissions
//     const handleAddOrder = async () => {
//         if (!formData.tracking_id || !formData.recipient_name || !formData.recipient_location) {
//             alert('Please fill in all required fields');
//             return;
//         }
//
//         const success = await submitOrder(formData);
//         if (success) {
//             setFormData({
//                 tracking_id: '',
//                 recipient_name: '',
//                 recipient_location: '',
//                 courier_service: 'trackon',
//                 priority: 'medium',
//                 order_value: 0,
//                 order_notes: '',
//                 expected_delivery: '',
//                 auto_track: true
//             });
//         }
//     };
//
//     const handleUpdateOrder = async () => {
//         if (!editingOrder || !editFormData.tracking_id || !editFormData.recipient_name || !editFormData.recipient_location) {
//             alert('Please fill in all required fields');
//             return;
//         }
//
//         const success = await submitUpdate(editingOrder, editFormData);
//         if (success) {
//             setEditFormData({
//                 tracking_id: '',
//                 recipient_name: '',
//                 recipient_location: '',
//                 courier_service: 'trackon',
//                 priority: 'medium',
//                 order_value: 0,
//                 order_notes: '',
//                 expected_delivery: '',
//                 auto_track: true
//             });
//         }
//     };
//
//     // Handle editing
//     const startEditingOrder = (order: any) => {
//         startEditing(order);
//         setEditFormData({
//             tracking_id: order.tracking_id,
//             recipient_name: order.recipient_name,
//             recipient_location: order.recipient_location,
//             courier_service: order.courier_service,
//             priority: order.priority || 'medium',
//             order_value: order.order_value || 0,
//             order_notes: order.order_notes || '',
//             expected_delivery: order.expected_delivery ? new Date(order.expected_delivery).toISOString().split('T')[0] : '',
//             auto_track: order.auto_track !== false
//         });
//     };
//
//     // Handle search
//     const handleSearch = (value: string) => {
//         setSearchTerm(value);
//         searchOrders(value);
//     };
//
//     // Handle bulk tracking
//     const handleBulkTracking = async () => {
//         const result = await trackAllTrackon();
//         if (!result.success) {
//             alert(result.message);
//         }
//     };
//
//     // Get status icon component
//     const StatusIcon = ({ status }: { status: string }) => {
//         const iconName = getStatusIcon(status);
//
//         switch (iconName) {
//             case 'CheckCircle':
//                 return <CheckCircle className="w-5 h-5 text-green-500" />;
//             case 'Clock':
//                 return <Clock className="w-5 h-5 text-blue-500" />;
//             case 'XCircle':
//                 return <XCircle className="w-5 h-5 text-red-500" />;
//             default:
//                 return <Package className="w-5 h-5 text-gray-500" />;
//         }
//     };
//
//     // Loading overlay
//     if (!isAuthenticated) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
//                     <p className="text-gray-500">Please log in to access your orders</p>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header with Stats */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="flex justify-between items-start mb-6">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracker</h1>
//                             <p className="text-gray-600">Track and manage your shipments</p>
//                         </div>
//                         <div className="flex gap-3">
//                             {canCreateOrder && (
//                                 <button
//                                     onClick={startCreating}
//                                     disabled={anyLoading}
//                                     className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//                                 >
//                                     <Plus className="w-4 h-4" />
//                                     Add Order
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleBulkTracking}
//                                 disabled={trackingLoading || getOrdersRequiringTracking().length === 0}
//                                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 <RefreshCw className={`w-4 h-4 ${trackingLoading ? 'animate-spin' : ''}`} />
//                                 Track All Trackon
//                             </button>
//                             <button
//                                 onClick={refreshOrders}
//                                 disabled={ordersLoading}
//                                 className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
//                             >
//                                 <RefreshCw className={`w-4 h-4 ${ordersLoading ? 'animate-spin' : ''}`} />
//                                 Refresh
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Stats Cards */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//                         <div className="bg-gray-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
//                             <div className="text-sm text-gray-600">Total Orders</div>
//                         </div>
//                         <div className="bg-yellow-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
//                             <div className="text-sm text-gray-600">Pending</div>
//                         </div>
//                         <div className="bg-blue-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-blue-600">{stats.trackingOrders}</div>
//                             <div className="text-sm text-gray-600">Tracking</div>
//                         </div>
//                         <div className="bg-green-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</div>
//                             <div className="text-sm text-gray-600">Delivered</div>
//                         </div>
//                         <div className="bg-red-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-red-600">{stats.errorOrders}</div>
//                             <div className="text-sm text-gray-600">Errors</div>
//                         </div>
//                         <div className="bg-purple-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-purple-600">{stats.trackonOrders}</div>
//                             <div className="text-sm text-gray-600">Trackon</div>
//                         </div>
//                         <div className="bg-orange-50 rounded-lg p-4">
//                             <div className="text-2xl font-bold text-orange-600">{stats.shreeTirupatiOrders}</div>
//                             <div className="text-sm text-gray-600">Shree Tirupati</div>
//                         </div>
//                     </div>
//
//                     {/* Add Order Form */}
//                     {showAddForm && (
//                         <div className="border-t pt-6 mt-6">
//                             <h3 className="text-lg font-semibold mb-4">Add New Order</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Courier Service *
//                                     </label>
//                                     <select
//                                         value={formData.courier_service}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, courier_service: e.target.value as 'trackon' | 'shree_tirupati' }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="trackon">Trackon</option>
//                                         <option value="shree_tirupati">Shree Tirupati</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Tracking ID *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.tracking_id}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, tracking_id: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter tracking ID"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Recipient Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.recipient_name}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, recipient_name: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter recipient name"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Recipient Location *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.recipient_location}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, recipient_location: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter location"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Priority
//                                     </label>
//                                     <select
//                                         value={formData.priority}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="low">Low</option>
//                                         <option value="medium">Medium</option>
//                                         <option value="high">High</option>
//                                         <option value="urgent">Urgent</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Order Value
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={formData.order_value}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, order_value: parseFloat(e.target.value) || 0 }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="0.00"
//                                         min="0"
//                                         step="0.01"
//                                     />
//                                 </div>
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Order Notes
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.order_notes}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, order_notes: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Optional notes"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Expected Delivery
//                                     </label>
//                                     <input
//                                         type="date"
//                                         value={formData.expected_delivery}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, expected_delivery: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-4 mt-4">
//                                 <label className="flex items-center gap-2">
//                                     <input
//                                         type="checkbox"
//                                         checked={formData.auto_track}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, auto_track: e.target.checked }))}
//                                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                     />
//                                     <span className="text-sm text-gray-700">Enable auto-tracking</span>
//                                 </label>
//                             </div>
//                             <div className="flex gap-3 mt-4">
//                                 <button
//                                     onClick={handleAddOrder}
//                                     disabled={creating}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//                                 >
//                                     {creating ? 'Creating...' : 'Add Order'}
//                                 </button>
//                                 <button
//                                     onClick={cancelModal}
//                                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Search and Filters */}
//                 <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//                     <div className="flex flex-col md:flex-row gap-4">
//                         <div className="flex-1">
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                                 <input
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => handleSearch(e.target.value)}
//                                     placeholder="Search orders by tracking ID, recipient, location..."
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() => setShowFilters(!showFilters)}
//                                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 <Filter className="w-4 h-4" />
//                                 Filters
//                                 {hasActiveFilters && (
//                                     <span className="bg-blue-500 text-white text-xs rounded-full w-2 h-2"></span>
//                                 )}
//                             </button>
//                             {hasActiveFilters && (
//                                 <button
//                                     onClick={clearFilters}
//                                     className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                                 >
//                                     Clear All
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//
//                     {/* Expanded Filters */}
//                     {showFilters && (
//                         <div className="border-t pt-4 mt-4">
//                             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                                     <select
//                                         value={filters.status}
//                                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="">All Statuses</option>
//                                         <option value="pending">Pending</option>
//                                         <option value="tracking">Tracking</option>
//                                         <option value="delivered">Delivered</option>
//                                         <option value="error">Error</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Courier</label>
//                                     <select
//                                         value={filters.courier_service}
//                                         onChange={(e) => setFilters({ ...filters, courier_service: e.target.value })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="">All Couriers</option>
//                                         <option value="trackon">Trackon</option>
//                                         <option value="shree_tirupati">Shree Tirupati</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                                     <select
//                                         value={filters.priority}
//                                         onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="">All Priorities</option>
//                                         <option value="low">Low</option>
//                                         <option value="medium">Medium</option>
//                                         <option value="high">High</option>
//                                         <option value="urgent">Urgent</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
//                                     <input
//                                         type="date"
//                                         value={filters.dateFrom}
//                                         onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
//                                     <input
//                                         type="date"
//                                         value={filters.dateTo}
//                                         onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Quick Filter Buttons */}
//                     <div className="flex flex-wrap gap-2 mt-4">
//                         <button
//                             onClick={() => applyQuickFilter('status', 'pending')}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 filters.status === 'pending'
//                                     ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             Pending ({stats.pendingOrders})
//                         </button>
//                         <button
//                             onClick={() => applyQuickFilter('status', 'tracking')}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 filters.status === 'tracking'
//                                     ? 'bg-blue-100 text-blue-800 border border-blue-300'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             Tracking ({stats.trackingOrders})
//                         </button>
//                         <button
//                             onClick={() => applyQuickFilter('status', 'delivered')}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 filters.status === 'delivered'
//                                     ? 'bg-green-100 text-green-800 border border-green-300'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             Delivered ({stats.deliveredOrders})
//                         </button>
//                         <button
//                             onClick={() => applyQuickFilter('courier', 'trackon')}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 filters.courier_service === 'trackon'
//                                     ? 'bg-purple-100 text-purple-800 border border-purple-300'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             Trackon ({stats.trackonOrders})
//                         </button>
//                         <button
//                             onClick={() => applyQuickFilter('courier', 'shree_tirupati')}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 filters.courier_service === 'shree_tirupati'
//                                     ? 'bg-orange-100 text-orange-800 border border-orange-300'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             Shree Tirupati ({stats.shreeTirupatiOrders})
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Error Messages */}
//                 {(ordersError || trackingError) && (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                         <div className="flex items-center gap-2">
//                             <AlertCircle className="w-5 h-5 text-red-500" />
//                             <div className="flex-1">
//                                 <h4 className="font-medium text-red-800">Error</h4>
//                                 <p className="text-sm text-red-600">
//                                     {ordersError || trackingError}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Orders List */}
//                 <div className="space-y-4">
//                     {isEmpty ? (
//                         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//                             <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
//                             <p className="text-gray-500 mb-4">Add your first order to start tracking packages</p>
//                             {canCreateOrder && (
//                                 <button
//                                     onClick={startCreating}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     Add Your First Order
//                                 </button>
//                             )}
//                         </div>
//                     ) : (
//                         paginatedOrders.map((order: Order) => (
//                             <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
//                                 {/* Order Header */}
//                                 <div className="p-4">
//                                     {editingOrder === order._id ? (
//                                         // Edit Mode
//                                         <div className="space-y-4">
//                                             <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
//                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Courier Service
//                                                     </label>
//                                                     <select
//                                                         value={editFormData.courier_service}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, courier_service: e.target.value as 'trackon' | 'shree_tirupati' }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                     >
//                                                         <option value="trackon">Trackon</option>
//                                                         <option value="shree_tirupati">Shree Tirupati</option>
//                                                     </select>
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Tracking ID
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={editFormData.tracking_id}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, tracking_id: e.target.value }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Recipient Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={editFormData.recipient_name}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, recipient_name: e.target.value }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Recipient Location
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={editFormData.recipient_location}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, recipient_location: e.target.value }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Priority
//                                                     </label>
//                                                     <select
//                                                         value={editFormData.priority}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, priority: e.target.value as any }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                     >
//                                                         <option value="low">Low</option>
//                                                         <option value="medium">Medium</option>
//                                                         <option value="high">High</option>
//                                                         <option value="urgent">Urgent</option>
//                                                     </select>
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                         Order Value
//                                                     </label>
//                                                     <input
//                                                         type="number"
//                                                         value={editFormData.order_value}
//                                                         onChange={(e) => setEditFormData(prev => ({ ...prev, order_value: parseFloat(e.target.value) || 0 }))}
//                                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                                         min="0"
//                                                         step="0.01"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={handleUpdateOrder}
//                                                     disabled={updating}
//                                                     className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:bg-gray-100 transition-colors"
//                                                 >
//                                                     <Save className="w-3 h-3" />
//                                                     {updating ? 'Saving...' : 'Save'}
//                                                 </button>
//                                                 <button
//                                                     onClick={cancelModal}
//                                                     className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//                                                 >
//                                                     <X className="w-3 h-3" />
//                                                     Cancel
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         // View Mode
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center gap-4 flex-1">
//                                                 <div className="flex items-center gap-2">
//                                                     <StatusIcon status={order.status} />
//                                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                                                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                                                     </span>
//                                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCourierColor(order.courier_service)}`}>
//                                                         {getCourierDisplayName(order.courier_service)}
//                                                     </span>
//                                                     {order.priority && order.priority !== 'medium' && (
//                                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
//                                                             {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
//                                                         </span>
//                                                     )}
//                                                 </div>
//
//                                                 <div className="flex-1 min-w-0">
//                                                     <div className="flex items-center gap-4 flex-wrap">
//                                                         <div className="flex items-center gap-1">
//                                                             <Package className="w-4 h-4 text-gray-400" />
//                                                             <span className="font-medium text-gray-900">{order.tracking_id}</span>
//                                                         </div>
//                                                         <div className="flex items-center gap-1">
//                                                             <User className="w-4 h-4 text-gray-400" />
//                                                             <span className="text-gray-600">{order.recipient_name}</span>
//                                                         </div>
//                                                         <div className="flex items-center gap-1">
//                                                             <MapPin className="w-4 h-4 text-gray-400" />
//                                                             <span className="text-gray-600 truncate">{order.recipient_location}</span>
//                                                         </div>
//                                                         <div className="flex items-center gap-1">
//                                                             <Calendar className="w-4 h-4 text-gray-400" />
//                                                             <span className="text-gray-500 text-sm">
//                                                                 {formatDate(order.createdAt)}
//                                                             </span>
//                                                         </div>
//                                                         {order.order_value > 0 && (
//                                                             <div className="flex items-center gap-1">
//                                                                 <TrendingUp className="w-4 h-4 text-gray-400" />
//                                                                 <span className="text-gray-500 text-sm">
//                                                                     ${order.order_value}
//                                                                 </span>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     {order.current_status && (
//                                                         <p className="text-sm text-gray-600 mt-1 truncate">
//                                                             {order.current_status}
//                                                         </p>
//                                                     )}
//                                                     {order.order_notes && (
//                                                         <p className="text-sm text-gray-500 mt-1 italic">
//                                                             {order.order_notes}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </div>
//
//                                             <div className="flex items-center gap-2">
//                                                 {canTrackOrder(order) ? (
//                                                     <button
//                                                         onClick={() => trackSingleOrder(order._id)}
//                                                         disabled={trackingLoading}
//                                                         className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
//                                                     >
//                                                         <RefreshCw className={`w-3 h-3 ${trackingLoading ? 'animate-spin' : ''}`} />
//                                                         Track
//                                                     </button>
//                                                 ) : order.courier_service === 'shree_tirupati' ? (
//                                                     <button
//                                                         onClick={() => openShreeTirupatiDetails(order)}
//                                                         className="flex items-center gap-1 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
//                                                     >
//                                                         <ExternalLink className="w-3 h-3" />
//                                                         Details
//                                                     </button>
//                                                 ) : null}
//
//                                                 {canEditOrder(order) && (
//                                                     <button
//                                                         onClick={() => startEditingOrder(order)}
//                                                         disabled={updating}
//                                                         className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
//                                                     >
//                                                         <Edit2 className="w-3 h-3" />
//                                                         Edit
//                                                     </button>
//                                                 )}
//
//                                                 {canDeleteOrder(order) && (
//                                                     <button
//                                                         onClick={() => {
//                                                             if (window.confirm('Are you sure you want to delete this order?')) {
//                                                                 confirmDelete(order._id);
//                                                             }
//                                                         }}
//                                                         disabled={deleting}
//                                                         className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:bg-gray-50 transition-colors"
//                                                     >
//                                                         <Trash2 className="w-3 h-3" />
//                                                         Delete
//                                                     </button>
//                                                 )}
//
//                                                 {order.courier_service === 'trackon' && order.tracking_data && (
//                                                     <button
//                                                         onClick={() => toggleOrderExpanded(order._id)}
//                                                         className="p-1 hover:bg-gray-100 rounded-md transition-colors"
//                                                     >
//                                                         {expandedOrders?.has(order._id) ?
//                                                             <ChevronUp className="w-4 h-4" /> :
//                                                             <ChevronDown className="w-4 h-4" />
//                                                         }
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//
//                                 {/* Expanded Details (only for Trackon with tracking data) */}
//                                 {expandedOrders.has(order._id) && order.tracking_data && order.courier_service === 'trackon' && (
//                                     <div className="border-t border-gray-200 p-4">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                             <div>
//                                                 <h4 className="font-medium text-gray-900 mb-2">Shipment Details</h4>
//                                                 <div className="space-y-1 text-sm">
//                                                     <div><span className="text-gray-600">Consignment No:</span> {order.tracking_data.consignment_no}</div>
//                                                     <div><span className="text-gray-600">Due Date:</span> {order.tracking_data.due_date}</div>
//                                                     <div><span className="text-gray-600">Current Status:</span> {order.tracking_data.current_status}</div>
//                                                     {order.last_tracked && (
//                                                         <div><span className="text-gray-600">Last Tracked:</span> {formatRelativeTime(order.last_tracked)}</div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
//                                                 <div className="space-y-1 text-sm">
//                                                     {order.expected_delivery && (
//                                                         <div><span className="text-gray-600">Expected Delivery:</span> {formatDate(order.expected_delivery)}</div>
//                                                     )}
//                                                     {order.actual_delivery && (
//                                                         <div><span className="text-gray-600">Delivered On:</span> {formatDate(order.actual_delivery)}</div>
//                                                     )}
//                                                     <div><span className="text-gray-600">Tracking Attempts:</span> {order.tracking_attempts || 0}</div>
//                                                     <div><span className="text-gray-600">Auto-track:</span> {order.auto_track ? 'Enabled' : 'Disabled'}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <h4 className="font-medium text-gray-900 mb-3">Tracking Events</h4>
//                                             <div className="space-y-2">
//                                                 {order.tracking_data.tracking_events?.map((event, index: number) => (
//                                                     <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
//                                                         <div className="flex-shrink-0">
//                                                             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                                                         </div>
//                                                         <div className="flex-1 min-w-0">
//                                                             <div className="flex justify-between items-start mb-1">
//                                                                 <div className="font-medium text-gray-900">{event.event_description}</div>
//                                                                 <div className="text-sm text-gray-500">{event.date}</div>
//                                                             </div>
//                                                             <div className="text-sm text-gray-600">{event.location}</div>
//                                                             {event.transaction_number && (
//                                                                 <div className="text-xs text-gray-500 mt-1">
//                                                                     Transaction: {event.transaction_number}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     )}
//                 </div>
//
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
//                         <div className="flex items-center justify-between">
//                             <div className="text-sm text-gray-700">
//                                 Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalCount)} of {totalCount} orders
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() => setCurrentPage(currentPage - 1)}
//                                     disabled={!hasPreviousPage}
//                                     className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
//                                 >
//                                     Previous
//                                 </button>
//                                 <span className="text-sm text-gray-600">
//                                     Page {currentPage} of {totalPages}
//                                 </span>
//                                 <button
//                                     onClick={() => setCurrentPage(currentPage + 1)}
//                                     disabled={!hasNextPage}
//                                     className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Loading Overlay */}
//                 {anyLoading && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-lg p-6 flex items-center gap-3">
//                             <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
//                             <span>
//                                 {creating && 'Creating order...'}
//                                 {updating && 'Updating order...'}
//                                 {deleting && 'Deleting order...'}
//                                 {trackingLoading && 'Tracking orders...'}
//                                 {ordersLoading && 'Loading orders...'}
//                             </span>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default OrderTracker;
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp, Plus, RefreshCw, Package, MapPin, User, Calendar, CheckCircle, XCircle, Clock, Search, ExternalLink, Edit2, Trash2, Save, X, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { useOrders, useOrderStats, useOrderPermissions } from '@/hooks/useOrders';

// Types
interface Order {
    _id: string;
    tracking_id: string;
    recipient_name: string;
    recipient_location: string;
    courier_service: 'trackon' | 'shree_tirupati';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    order_value: number;
    order_notes: string;
    expected_delivery: string;
    auto_track: boolean;
    date_added: string;
    status: 'pending' | 'tracking' | 'delivered' | 'error';
    current_status?: string;
    createdAt?: string;
    last_tracked?: string;
    actual_delivery?: string;
    tracking_attempts?: number;
    tracking_data?: {
        consignment_no: string;
        due_date: string;
        current_status: string;
        tracking_events: Array<{
            date: string;
            transaction_number: string;
            location: string;
            event_description: string;
        }>;
    };
}

interface AddOrderForm {
    tracking_id: string;
    recipient_name: string;
    recipient_location: string;
    courier_service: 'trackon' | 'shree_tirupati';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    order_value: number;
    order_notes: string;
    expected_delivery: string;
    auto_track: boolean;
}

const OrderTracker = () => {
    const {
        // Data
        orders,
        paginatedOrders,
        orderStats,
        filters,
        isAuthenticated,

        // UI State
        expandedOrders: expandedOrdersArray,
        editingOrder,
        showAddForm,

        // Loading states
        ordersLoading,
        trackingLoading,
        creating,
        updating,
        deleting,

        // Error states
        ordersError,
        trackingError,

        // Pagination
        currentPage,
        totalPages,
        totalCount,

        // Computed values
        hasActiveFilters,
        anyLoading,
        isEmpty,
        hasNextPage,
        hasPreviousPage,

        // Actions
        fetchOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        setFilters,
        clearFilters,
        setShowAddForm,
        setEditingOrder,
        toggleOrderExpanded,
        setCurrentPage,

        // Quick actions
        startCreating,
        startEditing,
        cancelModal,
        submitOrder,
        submitUpdate,
        confirmDelete,
        trackSingleOrder,
        trackAllTrackon,
        openShreeTirupatiDetails,
        refreshOrders,
        applyQuickFilter,
        searchOrders,

        // Helpers
        formatDate,
        formatRelativeTime,
        getStatusColor,
        getCourierColor,
        getPriorityColor,
        getCourierDisplayName,
        getStatusIcon,
        canTrackOrder,
        canEditOrder,
        canDeleteOrder,

        // Specialized selectors
        getTrackonOrders,
        getOrdersRequiringTracking
    } = useOrders();

    const { stats, loading: statsLoading } = useOrderStats();
    const { canCreateOrder } = useOrderPermissions();

    // Create a Set-like interface for expandedOrders
    const expandedOrders = useMemo(() => ({
        has: (orderId: string) => expandedOrdersArray.includes(orderId),
        add: (orderId: string) => toggleOrderExpanded(orderId),
        delete: (orderId: string) => toggleOrderExpanded(orderId),
        size: expandedOrdersArray.length
    }), [expandedOrdersArray, toggleOrderExpanded]);

    // Form state
    const [formData, setFormData] = useState<AddOrderForm>({
        tracking_id: '',
        recipient_name: '',
        recipient_location: '',
        courier_service: 'trackon',
        priority: 'medium',
        order_value: 0,
        order_notes: '',
        expected_delivery: '',
        auto_track: true
    });

    const [editFormData, setEditFormData] = useState<AddOrderForm>({
        tracking_id: '',
        recipient_name: '',
        recipient_location: '',
        courier_service: 'trackon',
        priority: 'medium',
        order_value: 0,
        order_notes: '',
        expected_delivery: '',
        auto_track: true
    });

    // Search state
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    // Initialize data
    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated, fetchOrders]);

    // Handle form submissions
    const handleAddOrder = async () => {
        if (!formData.tracking_id || !formData.recipient_name || !formData.recipient_location) {
            alert('Please fill in all required fields');
            return;
        }

        const success = await submitOrder(formData);
        if (success) {
            setFormData({
                tracking_id: '',
                recipient_name: '',
                recipient_location: '',
                courier_service: 'trackon',
                priority: 'medium',
                order_value: 0,
                order_notes: '',
                expected_delivery: '',
                auto_track: true
            });
        }
    };

    const handleUpdateOrder = async () => {
        if (!editingOrder || !editFormData.tracking_id || !editFormData.recipient_name || !editFormData.recipient_location) {
            alert('Please fill in all required fields');
            return;
        }

        const success = await submitUpdate(editingOrder, editFormData);
        if (success) {
            setEditFormData({
                tracking_id: '',
                recipient_name: '',
                recipient_location: '',
                courier_service: 'trackon',
                priority: 'medium',
                order_value: 0,
                order_notes: '',
                expected_delivery: '',
                auto_track: true
            });
        }
    };

    // Handle editing
    const startEditingOrder = (order: Order) => {
        startEditing(order);
        setEditFormData({
            tracking_id: order.tracking_id,
            recipient_name: order.recipient_name,
            recipient_location: order.recipient_location,
            courier_service: order.courier_service,
            priority: order.priority || 'medium',
            order_value: order.order_value || 0,
            order_notes: order.order_notes || '',
            expected_delivery: order.expected_delivery ? new Date(order.expected_delivery).toISOString().split('T')[0] : '',
            auto_track: order.auto_track !== false
        });
    };

    // Handle search
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        searchOrders(value);
    };

    // Handle bulk tracking
    const handleBulkTracking = async () => {
        const result = await trackAllTrackon();
        if (!result.success) {
            alert(result.message);
        }
    };

    // Get status icon component
    const StatusIcon = ({ status }: { status: string }) => {
        const iconName = getStatusIcon(status);

        switch (iconName) {
            case 'CheckCircle':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Clock':
                return <Clock className="w-5 h-5 text-blue-500" />;
            case 'XCircle':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    // Loading overlay
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
                    <p className="text-gray-500">Please log in to access your orders</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header with Stats */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracker</h1>
                            <p className="text-gray-600">Track and manage your shipments</p>
                        </div>
                        <div className="flex gap-3">
                            {canCreateOrder && (
                                <button
                                    onClick={startCreating}
                                    disabled={anyLoading}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Order
                                </button>
                            )}
                            <button
                                onClick={handleBulkTracking}
                                disabled={trackingLoading || getOrdersRequiringTracking().length === 0}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${trackingLoading ? 'animate-spin' : ''}`} />
                                Track All Trackon
                            </button>
                            <button
                                onClick={refreshOrders}
                                disabled={ordersLoading}
                                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${ordersLoading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
                            <div className="text-sm text-gray-600">Total Orders</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">{stats.trackingOrders}</div>
                            <div className="text-sm text-gray-600">Tracking</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</div>
                            <div className="text-sm text-gray-600">Delivered</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-600">{stats.errorOrders}</div>
                            <div className="text-sm text-gray-600">Errors</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-600">{stats.trackonOrders}</div>
                            <div className="text-sm text-gray-600">Trackon</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-orange-600">{stats.shreeTirupatiOrders}</div>
                            <div className="text-sm text-gray-600">Shree Tirupati</div>
                        </div>
                    </div>

                    {/* Add Order Form */}
                    {showAddForm && (
                        <div className="border-t pt-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Add New Order</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Courier Service *
                                    </label>
                                    <select
                                        value={formData.courier_service}
                                        onChange={(e) => setFormData(prev => ({ ...prev, courier_service: e.target.value as 'trackon' | 'shree_tirupati' }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="trackon">Trackon</option>
                                        <option value="shree_tirupati">Shree Tirupati</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tracking ID *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tracking_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, tracking_id: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter tracking ID"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Recipient Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.recipient_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, recipient_name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter recipient name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Recipient Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.recipient_location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, recipient_location: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Order Value
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order_value}
                                        onChange={(e) => setFormData(prev => ({ ...prev, order_value: parseFloat(e.target.value) || 0 }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Order Notes
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.order_notes}
                                        onChange={(e) => setFormData(prev => ({ ...prev, order_notes: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Optional notes"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expected Delivery
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.expected_delivery}
                                        onChange={(e) => setFormData(prev => ({ ...prev, expected_delivery: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.auto_track}
                                        onChange={(e) => setFormData(prev => ({ ...prev, auto_track: e.target.checked }))}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Enable auto-tracking</span>
                                </label>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleAddOrder}
                                    disabled={creating}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {creating ? 'Creating...' : 'Add Order'}
                                </button>
                                <button
                                    onClick={cancelModal}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search orders by tracking ID, recipient, location..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="bg-blue-500 text-white text-xs rounded-full w-2 h-2"></span>
                                )}
                            </button>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="border-t pt-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="tracking">Tracking</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="error">Error</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Courier</label>
                                    <select
                                        value={filters.courier_service}
                                        onChange={(e) => setFilters({ ...filters, courier_service: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Couriers</option>
                                        <option value="trackon">Trackon</option>
                                        <option value="shree_tirupati">Shree Tirupati</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        value={filters.priority}
                                        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                                    <input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                                    <input
                                        type="date"
                                        value={filters.dateTo}
                                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Filter Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => applyQuickFilter('status', 'pending')}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                filters.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Pending ({stats.pendingOrders})
                        </button>
                        <button
                            onClick={() => applyQuickFilter('status', 'tracking')}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                filters.status === 'tracking'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Tracking ({stats.trackingOrders})
                        </button>
                        <button
                            onClick={() => applyQuickFilter('status', 'delivered')}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                filters.status === 'delivered'
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Delivered ({stats.deliveredOrders})
                        </button>
                        <button
                            onClick={() => applyQuickFilter('courier', 'trackon')}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                filters.courier_service === 'trackon'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Trackon ({stats.trackonOrders})
                        </button>
                        <button
                            onClick={() => applyQuickFilter('courier', 'shree_tirupati')}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                filters.courier_service === 'shree_tirupati'
                                    ? 'bg-orange-100 text-orange-800 border border-orange-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Shree Tirupati ({stats.shreeTirupatiOrders})
                        </button>
                    </div>
                </div>

                {/* Error Messages */}
                {(ordersError || trackingError) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <div className="flex-1">
                                <h4 className="font-medium text-red-800">Error</h4>
                                <p className="text-sm text-red-600">
                                    {ordersError || trackingError}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders List */}
                <div className="space-y-4">
                    {isEmpty ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-4">Add your first order to start tracking packages</p>
                            {canCreateOrder && (
                                <button
                                    onClick={startCreating}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add Your First Order
                                </button>
                            )}
                        </div>
                    ) : (
                        paginatedOrders.map((order: Order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                {/* Order Header */}
                                <div className="p-4">
                                    {editingOrder === order._id ? (
                                        // Edit Mode
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Courier Service
                                                    </label>
                                                    <select
                                                        value={editFormData.courier_service}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, courier_service: e.target.value as 'trackon' | 'shree_tirupati' }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    >
                                                        <option value="trackon">Trackon</option>
                                                        <option value="shree_tirupati">Shree Tirupati</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Tracking ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.tracking_id}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, tracking_id: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Recipient Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.recipient_name}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, recipient_name: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Recipient Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.recipient_location}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, recipient_location: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Priority
                                                    </label>
                                                    <select
                                                        value={editFormData.priority}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    >
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                        <option value="urgent">Urgent</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Order Value
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={editFormData.order_value}
                                                        onChange={(e) => setEditFormData(prev => ({ ...prev, order_value: parseFloat(e.target.value) || 0 }))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleUpdateOrder}
                                                    disabled={updating}
                                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:bg-gray-100 transition-colors"
                                                >
                                                    <Save className="w-3 h-3" />
                                                    {updating ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={cancelModal}
                                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <StatusIcon status={order.status} />
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCourierColor(order.courier_service)}`}>
                                                        {getCourierDisplayName(order.courier_service)}
                                                    </span>
                                                    {order.priority && order.priority !== 'medium' && (
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                                                            {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <div className="flex items-center gap-1">
                                                            <Package className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium text-gray-900">{order.tracking_id}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <User className="w-4 h-4 text-gray-400" />
                                                            <span className="text-gray-600">{order.recipient_name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                            <span className="text-gray-600 truncate">{order.recipient_location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-gray-500 text-sm">
                                                                {formatDate(order.createdAt)}
                                                            </span>
                                                        </div>
                                                        {order.order_value > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                                                <span className="text-gray-500 text-sm">
                                                                    ${order.order_value}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {order.current_status && (
                                                        <p className="text-sm text-gray-600 mt-1 truncate">
                                                            {order.current_status}
                                                        </p>
                                                    )}
                                                    {order.order_notes && (
                                                        <p className="text-sm text-gray-500 mt-1 italic">
                                                            {order.order_notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {canTrackOrder(order) ? (
                                                    <button
                                                        onClick={() => trackSingleOrder(order._id)}
                                                        disabled={trackingLoading}
                                                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                                                    >
                                                        <RefreshCw className={`w-3 h-3 ${trackingLoading ? 'animate-spin' : ''}`} />
                                                        Track
                                                    </button>
                                                ) : order.courier_service === 'shree_tirupati' ? (
                                                    <button
                                                        onClick={() => openShreeTirupatiDetails(order)}
                                                        className="flex items-center gap-1 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        Details
                                                    </button>
                                                ) : null}

                                                {canEditOrder(order) && (
                                                    <button
                                                        onClick={() => startEditingOrder(order)}
                                                        disabled={updating}
                                                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
                                                    >
                                                        <Edit2 className="w-3 h-3" />
                                                        Edit
                                                    </button>
                                                )}

                                                {canDeleteOrder(order) && (
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this order?')) {
                                                                confirmDelete(order._id);
                                                            }
                                                        }}
                                                        disabled={deleting}
                                                        className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:bg-gray-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Delete
                                                    </button>
                                                )}

                                                {order.courier_service === 'trackon' && order.tracking_data && (
                                                    <button
                                                        onClick={() => toggleOrderExpanded(order._id)}
                                                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                                    >
                                                        {expandedOrders.has(order._id) ?
                                                            <ChevronUp className="w-4 h-4" /> :
                                                            <ChevronDown className="w-4 h-4" />
                                                        }
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Expanded Details (only for Trackon with tracking data) */}
                                {expandedOrders.has(order._id) && order.tracking_data && order.courier_service === 'trackon' && (
                                    <div className="border-t border-gray-200 p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Shipment Details</h4>
                                                <div className="space-y-1 text-sm">
                                                    <div><span className="text-gray-600">Consignment No:</span> {order.tracking_data.consignment_no}</div>
                                                    <div><span className="text-gray-600">Due Date:</span> {order.tracking_data.due_date}</div>
                                                    <div><span className="text-gray-600">Current Status:</span> {order.tracking_data.current_status}</div>
                                                    {order.last_tracked && (
                                                        <div><span className="text-gray-600">Last Tracked:</span> {formatRelativeTime(order.last_tracked)}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                                                <div className="space-y-1 text-sm">
                                                    {order.expected_delivery && (
                                                        <div><span className="text-gray-600">Expected Delivery:</span> {formatDate(order.expected_delivery)}</div>
                                                    )}
                                                    {order.actual_delivery && (
                                                        <div><span className="text-gray-600">Delivered On:</span> {formatDate(order.actual_delivery)}</div>
                                                    )}
                                                    <div><span className="text-gray-600">Tracking Attempts:</span> {order.tracking_attempts || 0}</div>
                                                    <div><span className="text-gray-600">Auto-track:</span> {order.auto_track ? 'Enabled' : 'Disabled'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3">Tracking Events</h4>
                                            <div className="space-y-2">
                                                {order.tracking_data.tracking_events?.map((event, index: number) => (
                                                    <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <div className="font-medium text-gray-900">{event.event_description}</div>
                                                                <div className="text-sm text-gray-500">{event.date}</div>
                                                            </div>
                                                            <div className="text-sm text-gray-600">{event.location}</div>
                                                            {event.transaction_number && (
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    Transaction: {event.transaction_number}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalCount)} of {totalCount} orders
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={!hasPreviousPage}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={!hasNextPage}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {anyLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                            <span>
                                {creating && 'Creating order...'}
                                {updating && 'Updating order...'}
                                {deleting && 'Deleting order...'}
                                {trackingLoading && 'Tracking orders...'}
                                {ordersLoading && 'Loading orders...'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracker;
export { OrderTracker };