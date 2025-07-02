// import React, { useState, useEffect } from 'react';
// import {
//     Star,
//     Check,
//     X,
//     Edit,
//     Trash2,
//     Eye,
//     Clock,
//     Award,
//     Filter,
//     Search,
//     ChevronLeft,
//     ChevronRight,
//     AlertCircle,
//     CheckCircle,
//     User,
//     Calendar,
//     Badge,
//     MoreVertical
// } from 'lucide-react';
// import { useAppSelector } from '@/hooks/redux';
//
// const AdminTestimonials = () => {
//     // State management
//     const [testimonials, setTestimonials] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [counts, setCounts] = useState({
//         all: 0,
//         pending: 0,
//         approved: 0,
//         featured: 0
//     });
//
//     // Filters
//     const [activeFilter, setActiveFilter] = useState('all'); // all, pending, approved
//     const [featuredFilter, setFeaturedFilter] = useState('all'); // all, featured, not-featured
//     const [searchTerm, setSearchTerm] = useState('');
//
//     // UI state
//     const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [testimonialToDelete, setTestimonialToDelete] = useState(null);
//
//     // Get user token
//     const { user, token } = useAppSelector((state) => ({
//         user: state.user.data,
//         token: state.user.token
//     }));
//
//     // Fetch testimonials
//     const fetchTestimonials = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//
//             const params = new URLSearchParams({
//                 page: currentPage.toString(),
//                 limit: '20'
//             });
//
//             if (activeFilter !== 'all') {
//                 params.append('status', activeFilter);
//             }
//
//             if (featuredFilter === 'featured') {
//                 params.append('featured', 'true');
//             } else if (featuredFilter === 'not-featured') {
//                 params.append('featured', 'false');
//             }
//
//             const response = await fetch(`/api/testimonials/admin?${params}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//
//             if (!response.ok) {
//                 throw new Error('Failed to fetch testimonials');
//             }
//
//             const data = await response.json();
//             setTestimonials(data.testimonials || []);
//             setTotalPages(data.pagination?.totalPages || 1);
//             setCounts(data.counts || { all: 0, pending: 0, approved: 0, featured: 0 });
//
//         } catch (err) {
//             setError(err.message);
//             console.error('Error fetching testimonials:', err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // Initial load and when filters change
//     useEffect(() => {
//         if (token) {
//             fetchTestimonials();
//         }
//     }, [token, currentPage, activeFilter, featuredFilter]);
//
//     // Handle testimonial actions (approve, feature, etc.)
//     const handleTestimonialAction = async (testimonialId, action, value) => {
//         try {
//             const response = await fetch(`/api/testimonials/admin/${testimonialId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     action,
//                     value
//                 })
//             });
//
//             if (!response.ok) {
//                 throw new Error(`Failed to ${action} testimonial`);
//             }
//
//             const data = await response.json();
//
//             // Update local state
//             setTestimonials(prev =>
//                 prev.map(t =>
//                     t._id === testimonialId ? data.testimonial : t
//                 )
//             );
//
//             // Refresh counts
//             await fetchTestimonials();
//
//         } catch (err) {
//             setError(err.message);
//             console.error(`Error ${action}ing testimonial:`, err);
//         }
//     };
//
//     // Handle delete testimonial
//     const handleDeleteTestimonial = async (testimonialId) => {
//         try {
//             const response = await fetch(`/api/testimonials/admin/${testimonialId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//
//             if (!response.ok) {
//                 throw new Error('Failed to delete testimonial');
//             }
//
//             // Remove from local state
//             setTestimonials(prev => prev.filter(t => t._id !== testimonialId));
//             setShowDeleteConfirm(false);
//             setTestimonialToDelete(null);
//
//             // Refresh counts
//             await fetchTestimonials();
//
//         } catch (err) {
//             setError(err.message);
//             console.error('Error deleting testimonial:', err);
//         }
//     };
//
//     // Filter testimonials by search term
//     const filteredTestimonials = testimonials.filter(testimonial => {
//         if (!searchTerm) return true;
//         const searchLower = searchTerm.toLowerCase();
//         return (
//             testimonial.name.toLowerCase().includes(searchLower) ||
//             testimonial.content.toLowerCase().includes(searchLower) ||
//             testimonial.user?.name?.toLowerCase().includes(searchLower) ||
//             testimonial.user?.email?.toLowerCase().includes(searchLower)
//         );
//     });
//
//     // Utility functions
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };
//
//     const getRatingText = (rating) => {
//         const texts = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
//         return texts[rating] || 'Unknown';
//     };
//
//     const getStatusColor = (testimonial) => {
//         if (testimonial.isApproved && testimonial.isPublished) return 'green';
//         if (!testimonial.isApproved) return 'yellow';
//         if (!testimonial.isPublished) return 'gray';
//         return 'gray';
//     };
//
//     const getStatusText = (testimonial) => {
//         if (testimonial.isApproved && testimonial.isPublished) return 'Published';
//         if (!testimonial.isApproved) return 'Pending';
//         if (!testimonial.isPublished) return 'Unpublished';
//         return 'Unknown';
//     };
//
//     // Render functions
//     const renderStars = (rating) => (
//         <div className="flex items-center space-x-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                     key={star}
//                     className={`w-4 h-4 ${
//                         star <= rating
//                             ? 'text-yellow-400 fill-current'
//                             : 'text-gray-300'
//                     }`}
//                 />
//             ))}
//         </div>
//     );
//
//     const renderFilterTabs = () => (
//         <div className="flex flex-wrap gap-2 mb-6">
//             {[
//                 { key: 'all', label: `All (${counts.all})`, count: counts.all },
//                 { key: 'pending', label: `Pending (${counts.pending})`, count: counts.pending },
//                 { key: 'approved', label: `Approved (${counts.approved})`, count: counts.approved }
//             ].map(({ key, label, count }) => (
//                 <button
//                     key={key}
//                     onClick={() => {
//                         setActiveFilter(key);
//                         setCurrentPage(1);
//                     }}
//                     className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                         activeFilter === key
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                 >
//                     {label}
//                 </button>
//             ))}
//             <button
//                 onClick={() => {
//                     setFeaturedFilter(featuredFilter === 'featured' ? 'all' : 'featured');
//                     setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                     featuredFilter === 'featured'
//                         ? 'bg-purple-600 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//             >
//                 Featured ({counts.featured})
//             </button>
//         </div>
//     );
//
//     const renderTestimonialCard = (testimonial) => (
//         <div
//             key={testimonial._id}
//             className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//         >
//             <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0">
//                         {testimonial.photo ? (
//                             <img
//                                 src={testimonial.photo}
//                                 alt={`${testimonial.name}'s photo`}
//                                 className="w-12 h-12 rounded-full object-cover"
//                             />
//                         ) : (
//                             <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                                 <User className="w-6 h-6 text-gray-400" />
//                             </div>
//                         )}
//                     </div>
//
//                     <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-2 mb-1">
//                             <h3 className="text-lg font-semibold text-gray-900 truncate">
//                                 {testimonial.name}
//                             </h3>
//                             {testimonial.featured && (
//                                 <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full flex items-center">
//                                     <Award className="w-3 h-3 mr-1" />
//                                     Featured
//                                 </span>
//                             )}
//                         </div>
//
//                         <div className="flex items-center space-x-2 mb-2">
//                             {renderStars(testimonial.rating)}
//                             <span className="text-sm text-gray-600">
//                                 {getRatingText(testimonial.rating)}
//                             </span>
//                         </div>
//
//                         <p className="text-sm text-gray-600 mb-2">
//                             by {testimonial.user?.name} ({testimonial.user?.email})
//                         </p>
//                     </div>
//                 </div>
//
//                 <div className="flex items-center space-x-2">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                         getStatusColor(testimonial) === 'green'
//                             ? 'bg-green-100 text-green-800'
//                             : getStatusColor(testimonial) === 'yellow'
//                                 ? 'bg-yellow-100 text-yellow-800'
//                                 : 'bg-gray-100 text-gray-800'
//                     }`}>
//                         {testimonial.isApproved ? (
//                             <CheckCircle className="w-3 h-3 mr-1" />
//                         ) : (
//                             <Clock className="w-3 h-3 mr-1" />
//                         )}
//                         {getStatusText(testimonial)}
//                     </span>
//                 </div>
//             </div>
//
//             <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.content}</p>
//
//             <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                 <div className="flex items-center space-x-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{formatDate(testimonial.createdAt)}</span>
//                 </div>
//             </div>
//
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                     <button
//                         onClick={() => {
//                             setSelectedTestimonial(testimonial);
//                             setShowViewModal(true);
//                         }}
//                         className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                     >
//                         <Eye className="w-4 h-4" />
//                         <span>View</span>
//                     </button>
//                 </div>
//
//                 <div className="flex items-center space-x-2">
//                     {!testimonial.isApproved && (
//                         <button
//                             onClick={() => handleTestimonialAction(testimonial._id, 'approve', true)}
//                             className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                         >
//                             <Check className="w-4 h-4" />
//                             <span>Approve</span>
//                         </button>
//                     )}
//
//                     {testimonial.isApproved && !testimonial.featured && (
//                         <button
//                             onClick={() => handleTestimonialAction(testimonial._id, 'feature', true)}
//                             className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//                         >
//                             <Award className="w-4 h-4" />
//                             <span>Feature</span>
//                         </button>
//                     )}
//
//                     {testimonial.featured && (
//                         <button
//                             onClick={() => handleTestimonialAction(testimonial._id, 'feature', false)}
//                             className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
//                         >
//                             <X className="w-4 h-4" />
//                             <span>Unfeature</span>
//                         </button>
//                     )}
//
//                     <button
//                         onClick={() => {
//                             setTestimonialToDelete(testimonial);
//                             setShowDeleteConfirm(true);
//                         }}
//                         className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                     >
//                         <Trash2 className="w-4 h-4" />
//                         <span>Delete</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
//
//     const renderPagination = () => {
//         if (totalPages <= 1) return null;
//
//         return (
//             <div className="flex justify-center items-center space-x-4 mt-8">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                 >
//                     <ChevronLeft className="w-4 h-4" />
//                     <span>Previous</span>
//                 </button>
//
//                 <div className="flex items-center space-x-2">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const pageNum = i + Math.max(1, currentPage - 2);
//                         if (pageNum > totalPages) return null;
//
//                         return (
//                             <button
//                                 key={pageNum}
//                                 onClick={() => setCurrentPage(pageNum)}
//                                 className={`px-3 py-2 rounded-lg transition-colors ${
//                                     pageNum === currentPage
//                                         ? 'bg-blue-600 text-white'
//                                         : 'bg-white border border-gray-300 hover:bg-gray-50'
//                                 }`}
//                             >
//                                 {pageNum}
//                             </button>
//                         );
//                     })}
//                 </div>
//
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                 >
//                     <span>Next</span>
//                     <ChevronRight className="w-4 h-4" />
//                 </button>
//             </div>
//         );
//     };
//
//     // Main render
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
//                     <p className="text-gray-600">Manage customer testimonials, approvals, and featured content</p>
//                 </div>
//             </div>
//
//             {/* Error Display */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex items-center">
//                         <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
//                         <p className="text-red-800">{error}</p>
//                         <button
//                             onClick={() => setError(null)}
//                             className="ml-auto text-red-600 hover:text-red-800"
//                         >
//                             <X className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             {/* Filters and Search */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//                 {renderFilterTabs()}
//
//                 <div className="flex items-center space-x-4">
//                     <div className="flex-1">
//                         <div className="relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                                 type="text"
//                                 placeholder="Search testimonials by name, content, or user..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>
//
//                     <button
//                         onClick={() => fetchTestimonials()}
//                         disabled={loading}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                     >
//                         {loading ? 'Refreshing...' : 'Refresh'}
//                     </button>
//                 </div>
//             </div>
//
//             {/* Testimonials Grid */}
//             {loading ? (
//                 <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="text-gray-600 mt-4">Loading testimonials...</p>
//                 </div>
//             ) : filteredTestimonials.length === 0 ? (
//                 <div className="text-center py-12">
//                     <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
//                     <p className="text-gray-600">
//                         {searchTerm
//                             ? 'Try adjusting your search terms or filters'
//                             : 'No testimonials match the current filters'
//                         }
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
//                     {filteredTestimonials.map(renderTestimonialCard)}
//                 </div>
//             )}
//
//             {/* Pagination */}
//             {renderPagination()}
//
//             {/* View Modal */}
//             {showViewModal && selectedTestimonial && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="p-6">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h3 className="text-xl font-semibold text-gray-900">Testimonial Details</h3>
//                                 <button
//                                     onClick={() => setShowViewModal(false)}
//                                     className="text-gray-400 hover:text-gray-600"
//                                 >
//                                     <X className="w-6 h-6" />
//                                 </button>
//                             </div>
//
//                             <div className="space-y-6">
//                                 {/* User Info */}
//                                 <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
//                                     {selectedTestimonial.photo ? (
//                                         <img
//                                             src={selectedTestimonial.photo}
//                                             alt={`${selectedTestimonial.name}'s photo`}
//                                             className="w-16 h-16 rounded-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                                             <User className="w-8 h-8 text-gray-400" />
//                                         </div>
//                                     )}
//                                     <div>
//                                         <h4 className="text-lg font-semibold text-gray-900">
//                                             {selectedTestimonial.name}
//                                         </h4>
//                                         <p className="text-gray-600">
//                                             {selectedTestimonial.user?.email}
//                                         </p>
//                                         <div className="flex items-center space-x-2 mt-1">
//                                             {renderStars(selectedTestimonial.rating)}
//                                             <span className="text-sm text-gray-600">
//                                                 {getRatingText(selectedTestimonial.rating)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Content */}
//                                 <div>
//                                     <h5 className="text-md font-semibold text-gray-900 mb-2">Testimonial Content</h5>
//                                     <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
//                                         {selectedTestimonial.content}
//                                     </p>
//                                 </div>
//
//                                 {/* Status and Dates */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="p-4 bg-gray-50 rounded-lg">
//                                         <h6 className="text-sm font-semibold text-gray-900 mb-2">Status</h6>
//                                         <div className="space-y-2">
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Approved:</span>
//                                                 <span className={`text-sm font-medium ${
//                                                     selectedTestimonial.isApproved ? 'text-green-600' : 'text-red-600'
//                                                 }`}>
//                                                     {selectedTestimonial.isApproved ? 'Yes' : 'No'}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Published:</span>
//                                                 <span className={`text-sm font-medium ${
//                                                     selectedTestimonial.isPublished ? 'text-green-600' : 'text-red-600'
//                                                 }`}>
//                                                     {selectedTestimonial.isPublished ? 'Yes' : 'No'}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Featured:</span>
//                                                 <span className={`text-sm font-medium ${
//                                                     selectedTestimonial.featured ? 'text-purple-600' : 'text-gray-600'
//                                                 }`}>
//                                                     {selectedTestimonial.featured ? 'Yes' : 'No'}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="p-4 bg-gray-50 rounded-lg">
//                                         <h6 className="text-sm font-semibold text-gray-900 mb-2">Dates</h6>
//                                         <div className="space-y-2">
//                                             <div>
//                                                 <span className="text-sm text-gray-600">Created:</span>
//                                                 <p className="text-sm font-medium text-gray-900">
//                                                     {formatDate(selectedTestimonial.createdAt)}
//                                                 </p>
//                                             </div>
//                                             {selectedTestimonial.updatedAt !== selectedTestimonial.createdAt && (
//                                                 <div>
//                                                     <span className="text-sm text-gray-600">Updated:</span>
//                                                     <p className="text-sm font-medium text-gray-900">
//                                                         {formatDate(selectedTestimonial.updatedAt)}
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Actions */}
//                                 <div className="flex space-x-3 pt-4 border-t">
//                                     {!selectedTestimonial.isApproved && (
//                                         <button
//                                             onClick={() => {
//                                                 handleTestimonialAction(selectedTestimonial._id, 'approve', true);
//                                                 setShowViewModal(false);
//                                             }}
//                                             className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                                         >
//                                             <Check className="w-4 h-4" />
//                                             <span>Approve</span>
//                                         </button>
//                                     )}
//
//                                     {selectedTestimonial.isApproved && !selectedTestimonial.featured && (
//                                         <button
//                                             onClick={() => {
//                                                 handleTestimonialAction(selectedTestimonial._id, 'feature', true);
//                                                 setShowViewModal(false);
//                                             }}
//                                             className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                                         >
//                                             <Award className="w-4 h-4" />
//                                             <span>Feature</span>
//                                         </button>
//                                     )}
//
//                                     {selectedTestimonial.featured && (
//                                         <button
//                                             onClick={() => {
//                                                 handleTestimonialAction(selectedTestimonial._id, 'feature', false);
//                                                 setShowViewModal(false);
//                                             }}
//                                             className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                                         >
//                                             <X className="w-4 h-4" />
//                                             <span>Remove Feature</span>
//                                         </button>
//                                     )}
//
//                                     <button
//                                         onClick={() => setShowViewModal(false)}
//                                         className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {/* Delete Confirmation Modal */}
//             {showDeleteConfirm && testimonialToDelete && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-md w-full p-6">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                             Delete Testimonial
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             Are you sure you want to delete this testimonial by{' '}
//                             <strong>{testimonialToDelete.name}</strong>? This action cannot be undone.
//                         </p>
//                         <div className="flex space-x-3">
//                             <button
//                                 onClick={() => {
//                                     setShowDeleteConfirm(false);
//                                     setTestimonialToDelete(null);
//                                 }}
//                                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteTestimonial(testimonialToDelete._id)}
//                                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default AdminTestimonials;
import React, { useState, useEffect } from 'react';
import {
    Star,
    Check,
    X,
    Edit,
    Trash2,
    Eye,
    Clock,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    User,
    Calendar,
    Badge,
    MoreVertical
} from 'lucide-react';
import { useAppSelector } from '@/hooks/redux';

const AdminTestimonials = () => {
    // State management
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [counts, setCounts] = useState({
        all: 0,
        pending: 0,
        approved: 0,
        published: 0
    });

    // Filters
    const [activeFilter, setActiveFilter] = useState('all'); // all, pending, approved
    const [publishedFilter, setPublishedFilter] = useState('all'); // all, published, unpublished
    const [searchTerm, setSearchTerm] = useState('');

    // UI state
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);

    // Get user token
    const { user, token } = useAppSelector((state) => ({
        user: state.user.data,
        token: state.user.token
    }));

    // Fetch testimonials
    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '20'
            });

            if (activeFilter !== 'all') {
                params.append('status', activeFilter);
            }

            if (publishedFilter === 'published') {
                params.append('published', 'true');
            } else if (publishedFilter === 'unpublished') {
                params.append('published', 'false');
            }

            const response = await fetch(`/api/testimonials/admin?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch testimonials');
            }

            const data = await response.json();
            setTestimonials(data.testimonials || []);
            setTotalPages(data.pagination?.totalPages || 1);
            setCounts(data.counts || { all: 0, pending: 0, approved: 0, published: 0 });

        } catch (err) {
            setError(err.message);
            console.error('Error fetching testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load and when filters change
    useEffect(() => {
        if (token) {
            fetchTestimonials();
        }
    }, [token, currentPage, activeFilter, publishedFilter]);

    // Handle testimonial actions (approve, feature, etc.)
    const handleTestimonialAction = async (testimonialId, action, value) => {
        try {
            const response = await fetch(`/api/testimonials/admin/${testimonialId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    action,
                    value
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to ${action} testimonial`);
            }

            const data = await response.json();

            // Update local state
            setTestimonials(prev =>
                prev.map(t =>
                    t._id === testimonialId ? data.testimonial : t
                )
            );

            // Refresh counts
            await fetchTestimonials();

        } catch (err) {
            setError(err.message);
            console.error(`Error ${action}ing testimonial:`, err);
        }
    };

    // Handle delete testimonial
    const handleDeleteTestimonial = async (testimonialId) => {
        try {
            const response = await fetch(`/api/testimonials/admin/${testimonialId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete testimonial');
            }

            // Remove from local state
            setTestimonials(prev => prev.filter(t => t._id !== testimonialId));
            setShowDeleteConfirm(false);
            setTestimonialToDelete(null);

            // Refresh counts
            await fetchTestimonials();

        } catch (err) {
            setError(err.message);
            console.error('Error deleting testimonial:', err);
        }
    };

    // Filter testimonials by search term
    const filteredTestimonials = testimonials.filter(testimonial => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            testimonial.name.toLowerCase().includes(searchLower) ||
            testimonial.content.toLowerCase().includes(searchLower) ||
            testimonial.user?.name?.toLowerCase().includes(searchLower) ||
            testimonial.user?.email?.toLowerCase().includes(searchLower)
        );
    });

    // Utility functions
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRatingText = (rating) => {
        const texts = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
        return texts[rating] || 'Unknown';
    };

    const getStatusColor = (testimonial) => {
        if (testimonial.isApproved && testimonial.isPublished) return 'green';
        if (!testimonial.isApproved) return 'yellow';
        if (!testimonial.isPublished) return 'gray';
        return 'gray';
    };

    const getStatusText = (testimonial) => {
        if (testimonial.isApproved && testimonial.isPublished) return 'Published';
        if (!testimonial.isApproved) return 'Pending';
        if (!testimonial.isPublished) return 'Unpublished';
        return 'Unknown';
    };

    // Render functions
    const renderStars = (rating) => (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${
                        star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );

    const renderFilterTabs = () => (
        <div className="flex flex-wrap gap-2 mb-6">
            {[
                { key: 'all', label: `All (${counts.all})`, count: counts.all },
                { key: 'pending', label: `Pending (${counts.pending})`, count: counts.pending },
                { key: 'approved', label: `Approved (${counts.approved})`, count: counts.approved }
            ].map(({ key, label, count }) => (
                <button
                    key={key}
                    onClick={() => {
                        setActiveFilter(key);
                        setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeFilter === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {label}
                </button>
            ))}
            <button
                onClick={() => {
                    setPublishedFilter(publishedFilter === 'published' ? 'all' : 'published');
                    setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    publishedFilter === 'published'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                Published ({counts.published})
            </button>
        </div>
    );

    const renderTestimonialCard = (testimonial) => (
        <div
            key={testimonial._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        {testimonial.photo ? (
                            <img
                                src={testimonial.photo}
                                alt={`${testimonial.name}'s photo`}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {testimonial.name}
                            </h3>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                            {renderStars(testimonial.rating)}
                            <span className="text-sm text-gray-600">
                                {getRatingText(testimonial.rating)}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                            by {testimonial.user?.name} ({testimonial.user?.email})
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getStatusColor(testimonial) === 'green'
                            ? 'bg-green-100 text-green-800'
                            : getStatusColor(testimonial) === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}>
                        {testimonial.isApproved ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                            <Clock className="w-3 h-3 mr-1" />
                        )}
                        {getStatusText(testimonial)}
                    </span>
                </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.content}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(testimonial.createdAt)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setShowViewModal(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    {!testimonial.isApproved && (
                        <button
                            onClick={() => handleTestimonialAction(testimonial._id, 'approve', true)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                        </button>
                    )}

                    {testimonial.isApproved && !testimonial.isPublished && (
                        <button
                            onClick={() => handleTestimonialAction(testimonial._id, 'publish', true)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <CheckCircle className="w-4 h-4" />
                            <span>Publish</span>
                        </button>
                    )}

                    {testimonial.isPublished && (
                        <button
                            onClick={() => handleTestimonialAction(testimonial._id, 'publish', false)}
                            className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            <span>Unpublish</span>
                        </button>
                    )}

                    <button
                        onClick={() => {
                            setTestimonialToDelete(testimonial);
                            setShowDeleteConfirm(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + Math.max(1, currentPage - 2);
                        if (pageNum > totalPages) return null;

                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-2 rounded-lg transition-colors ${
                                    pageNum === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        );
    };

    // Main render
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
                    <p className="text-gray-600">Manage customer testimonials, approvals, and published content</p>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-red-800">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-red-600 hover:text-red-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                {renderFilterTabs()}

                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search testimonials by name, content, or user..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => fetchTestimonials()}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* Testimonials Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading testimonials...</p>
                </div>
            ) : filteredTestimonials.length === 0 ? (
                <div className="text-center py-12">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
                    <p className="text-gray-600">
                        {searchTerm
                            ? 'Try adjusting your search terms or filters'
                            : 'No testimonials match the current filters'
                        }
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                    {filteredTestimonials.map(renderTestimonialCard)}
                </div>
            )}

            {/* Pagination */}
            {renderPagination()}

            {/* View Modal */}
            {showViewModal && selectedTestimonial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Testimonial Details</h3>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* User Info */}
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    {selectedTestimonial.photo ? (
                                        <img
                                            src={selectedTestimonial.photo}
                                            alt={`${selectedTestimonial.name}'s photo`}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {selectedTestimonial.name}
                                        </h4>
                                        <p className="text-gray-600">
                                            {selectedTestimonial.user?.email}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            {renderStars(selectedTestimonial.rating)}
                                            <span className="text-sm text-gray-600">
                                                {getRatingText(selectedTestimonial.rating)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h5 className="text-md font-semibold text-gray-900 mb-2">Testimonial Content</h5>
                                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                        {selectedTestimonial.content}
                                    </p>
                                </div>

                                {/* Status and Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h6 className="text-sm font-semibold text-gray-900 mb-2">Status</h6>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Approved:</span>
                                                <span className={`text-sm font-medium ${
                                                    selectedTestimonial.isApproved ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {selectedTestimonial.isApproved ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Published:</span>
                                                <span className={`text-sm font-medium ${
                                                    selectedTestimonial.isPublished ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {selectedTestimonial.isPublished ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h6 className="text-sm font-semibold text-gray-900 mb-2">Dates</h6>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-600">Created:</span>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {formatDate(selectedTestimonial.createdAt)}
                                                </p>
                                            </div>
                                            {selectedTestimonial.updatedAt !== selectedTestimonial.createdAt && (
                                                <div>
                                                    <span className="text-sm text-gray-600">Updated:</span>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatDate(selectedTestimonial.updatedAt)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-3 pt-4 border-t">
                                    {!selectedTestimonial.isApproved && (
                                        <button
                                            onClick={() => {
                                                handleTestimonialAction(selectedTestimonial._id, 'approve', true);
                                                setShowViewModal(false);
                                            }}
                                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>Approve</span>
                                        </button>
                                    )}

                                    {selectedTestimonial.isApproved && !selectedTestimonial.isPublished && (
                                        <button
                                            onClick={() => {
                                                handleTestimonialAction(selectedTestimonial._id, 'publish', true);
                                                setShowViewModal(false);
                                            }}
                                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Publish</span>
                                        </button>
                                    )}

                                    {selectedTestimonial.isPublished && (
                                        <button
                                            onClick={() => {
                                                handleTestimonialAction(selectedTestimonial._id, 'publish', false);
                                                setShowViewModal(false);
                                            }}
                                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Unpublish</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && testimonialToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Delete Testimonial
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this testimonial by{' '}
                            <strong>{testimonialToDelete.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setTestimonialToDelete(null);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteTestimonial(testimonialToDelete._id)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTestimonials;