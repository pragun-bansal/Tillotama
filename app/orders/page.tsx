"use client";

import { OrderTracker } from '@/components/Orderpage';

export default function OrdersPage() {
    return <OrderTracker />;
}

// "use client";
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Plus, RefreshCw, Package, MapPin, User, Calendar, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
//
// // Types
// interface Order {
//     id: string;
//     tracking_id: string;
//     recipient_name: string;
//     recipient_location: string;
//     date_added: string;
//     status: 'pending' | 'tracking' | 'delivered' | 'error';
//     current_status?: string;
//     tracking_data?: {
//         consignment_no: string;
//         due_date: string;
//         current_status: string;
//         tracking_events: Array<{
//             date: string;
//             transaction_number: string;
//             location: string;
//             event_description: string;
//         }>;
//     };
// }
//
// interface AddOrderForm {
//     tracking_id: string;
//     recipient_name: string;
//     recipient_location: string;
// }
//
// const OrderTracker = () => {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date');
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//     const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
//
//     const [formData, setFormData] = useState<AddOrderForm>({
//         tracking_id: '',
//         recipient_name: '',
//         recipient_location: ''
//     });
//
//     // API Base URL - adjust this to your API server
//     const API_BASE_URL = 'http://localhost:8000';
//
//     // Add new order
//     const handleAddOrder = () => {
//         if (!formData.tracking_id || !formData.recipient_name || !formData.recipient_location) {
//             alert('Please fill in all fields');
//             return;
//         }
//
//         const newOrder: Order = {
//             id: Date.now().toString(),
//             tracking_id: formData.tracking_id,
//             recipient_name: formData.recipient_name,
//             recipient_location: formData.recipient_location,
//             date_added: new Date().toISOString(),
//             status: 'pending'
//         };
//
//         setOrders(prev => [newOrder, ...prev]);
//         setFormData({ tracking_id: '', recipient_name: '', recipient_location: '' });
//         setShowAddForm(false);
//     };
//
//     // Fetch all orders status
//     const fetchAllOrders = async () => {
//         if (orders.length === 0) {
//             alert('No orders to fetch. Please add some orders first.');
//             return;
//         }
//
//         setLoading(true);
//         try {
//             const trackingRequests = orders.map(order => ({
//                 tracking_id: order.tracking_id,
//                 recipient_name: order.recipient_name,
//                 recipient_location: order.recipient_location
//             }));
//
//             const response = await fetch(`${API_BASE_URL}/track/batch`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ tracking_requests: trackingRequests })
//             });
//
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             const data = await response.json();
//
//             // Update orders with fetched data
//             setOrders(prev => prev.map((order, index) => {
//                 const result = data.results[index];
//                 return {
//                     ...order,
//                     status: result.success ? (result.data.current_status.includes('DELIVERED') ? 'delivered' : 'tracking') : 'error',
//                     current_status: result.success ? result.data.current_status : result.error,
//                     tracking_data: result.success ? result.data : undefined
//                 };
//             }));
//
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//             alert(`Error fetching orders: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // Fetch individual order
//     const fetchIndividualOrder = async (order: Order) => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${API_BASE_URL}/track`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     tracking_id: order.tracking_id,
//                     recipient_name: order.recipient_name,
//                     recipient_location: order.recipient_location
//                 })
//             });
//
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             const data = await response.json();
//
//             // Update specific order
//             setOrders(prev => prev.map(o =>
//                 o.id === order.id ? {
//                     ...o,
//                     status: data.success ? (data.data.current_status.includes('DELIVERED') ? 'delivered' : 'tracking') : 'error',
//                     current_status: data.success ? data.data.current_status : data.error,
//                     tracking_data: data.success ? data.data : undefined
//                 } : o
//             ));
//
//         } catch (error) {
//             console.error('Error fetching order:', error);
//             alert(`Error fetching order: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // Sort orders
//     const sortedOrders = [...orders].sort((a, b) => {
//         let aValue, bValue;
//
//         switch (sortBy) {
//             case 'name':
//                 aValue = a.recipient_name.toLowerCase();
//                 bValue = b.recipient_name.toLowerCase();
//                 break;
//             case 'date':
//                 aValue = new Date(a.date_added);
//                 bValue = new Date(b.date_added);
//                 break;
//             case 'status':
//                 aValue = a.status;
//                 bValue = b.status;
//                 break;
//             default:
//                 return 0;
//         }
//
//         if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
//         return 0;
//     });
//
//     // Toggle expanded order
//     const toggleExpanded = (orderId: string) => {
//         setExpandedOrders(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(orderId)) {
//                 newSet.delete(orderId);
//             } else {
//                 newSet.add(orderId);
//             }
//             return newSet;
//         });
//     };
//
//     // Get status icon
//     const getStatusIcon = (status: string) => {
//         switch (status) {
//             case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
//             case 'tracking': return <Clock className="w-5 h-5 text-blue-500" />;
//             case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
//             default: return <Package className="w-5 h-5 text-gray-500" />;
//         }
//     };
//
//     // Get status color
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'delivered': return 'bg-green-100 text-green-800';
//             case 'tracking': return 'bg-blue-100 text-blue-800';
//             case 'error': return 'bg-red-100 text-red-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-4">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h1 className="text-3xl font-bold text-gray-900">Order Tracker</h1>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => setShowAddForm(!showAddForm)}
//                                 className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 <Plus className="w-4 h-4" />
//                                 Add Order
//                             </button>
//                             <button
//                                 onClick={fetchAllOrders}
//                                 disabled={loading || orders.length === 0}
//                                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                             >
//                                 <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                                 Fetch All
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Add Order Form */}
//                     {showAddForm && (
//                         <div className="border-t pt-4 mt-4">
//                             <h3 className="text-lg font-semibold mb-4">Add New Order</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Tracking ID
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
//                                         Recipient Name
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
//                                         Recipient Location
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.recipient_location}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, recipient_location: e.target.value }))}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter location"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex gap-3 mt-4">
//                                 <button
//                                     onClick={handleAddOrder}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     Add Order
//                                 </button>
//                                 <button
//                                     onClick={() => setShowAddForm(false)}
//                                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Sorting Controls */}
//                 {orders.length > 0 && (
//                     <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//                         <div className="flex items-center gap-4">
//                             <span className="text-sm font-medium text-gray-700">Sort by:</span>
//                             <select
//                                 value={sortBy}
//                                 onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'status')}
//                                 className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="date">Date Added</option>
//                                 <option value="name">Recipient Name</option>
//                                 <option value="status">Status</option>
//                             </select>
//                             <button
//                                 onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
//                                 className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
//                             >
//                                 {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
//                                 {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                             </button>
//                             <span className="text-sm text-gray-500 ml-auto">
//                 {orders.length} order{orders.length !== 1 ? 's' : ''}
//               </span>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Orders List */}
//                 <div className="space-y-4">
//                     {sortedOrders.length === 0 ? (
//                         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
//                             <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
//                             <p className="text-gray-500">Add your first order to start tracking packages</p>
//                         </div>
//                     ) : (
//                         sortedOrders.map((order) => (
//                             <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
//                                 {/* Order Header */}
//                                 <div className="p-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-4 flex-1">
//                                             <div className="flex items-center gap-2">
//                                                 {getStatusIcon(order.status)}
//                                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                         </span>
//                                             </div>
//
//                                             <div className="flex-1 min-w-0">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="flex items-center gap-1">
//                                                         <Package className="w-4 h-4 text-gray-400" />
//                                                         <span className="font-medium text-gray-900">{order.tracking_id}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-1">
//                                                         <User className="w-4 h-4 text-gray-400" />
//                                                         <span className="text-gray-600">{order.recipient_name}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-1">
//                                                         <MapPin className="w-4 h-4 text-gray-400" />
//                                                         <span className="text-gray-600 truncate">{order.recipient_location}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-1">
//                                                         <Calendar className="w-4 h-4 text-gray-400" />
//                                                         <span className="text-gray-500 text-sm">
//                               {new Date(order.date_added).toLocaleDateString()}
//                             </span>
//                                                     </div>
//                                                 </div>
//                                                 {order.current_status && (
//                                                     <p className="text-sm text-gray-600 mt-1 truncate">
//                                                         {order.current_status}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         </div>
//
//                                         <div className="flex items-center gap-2">
//                                             <button
//                                                 onClick={() => fetchIndividualOrder(order)}
//                                                 disabled={loading}
//                                                 className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
//                                             >
//                                                 <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
//                                                 Fetch
//                                             </button>
//                                             <button
//                                                 onClick={() => toggleExpanded(order.id)}
//                                                 className="p-1 hover:bg-gray-100 rounded-md transition-colors"
//                                             >
//                                                 {expandedOrders.has(order.id) ?
//                                                     <ChevronUp className="w-4 h-4" /> :
//                                                     <ChevronDown className="w-4 h-4" />
//                                                 }
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Expanded Details */}
//                                 {expandedOrders.has(order.id) && order.tracking_data && (
//                                     <div className="border-t border-gray-200 p-4">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                             <div>
//                                                 <h4 className="font-medium text-gray-900 mb-2">Shipment Details</h4>
//                                                 <div className="space-y-1 text-sm">
//                                                     <div><span className="text-gray-600">Consignment No:</span> {order.tracking_data.consignment_no}</div>
//                                                     <div><span className="text-gray-600">Due Date:</span> {order.tracking_data.due_date}</div>
//                                                     <div><span className="text-gray-600">Current Status:</span> {order.tracking_data.current_status}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <h4 className="font-medium text-gray-900 mb-3">Tracking Events</h4>
//                                             <div className="space-y-2">
//                                                 {order.tracking_data.tracking_events.map((event, index) => (
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
//                 {loading && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-lg p-6 flex items-center gap-3">
//                             <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
//                             <span>Fetching tracking information...</span>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default OrderTracker;
