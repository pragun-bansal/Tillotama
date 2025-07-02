// "use client"
// import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '@/hooks/redux';
// import { useTestimonialsPageState } from '@/hooks/redux';
// import {
//     fetchPublicTestimonials,
//     fetchUserTestimonials,
//     createTestimonial,
//     updateTestimonial,
//     deleteTestimonial,
//     setShowForm,
//     setCurrentTestimonial,
//     updateForm,
//     setFormPhoto,
//     resetForm,
//     setCurrentPage
// } from '@/store/slices/testimonialSlice';
// import { Star, Upload, Edit, Trash2, User, Calendar, CheckCircle, Clock, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
//
// const TestimonialsPage = () => {
//     const dispatch = useAppDispatch();
//     const {
//         publicTestimonials,
//         featuredTestimonials,
//         userTestimonials,
//         userTestimonial,
//         publicLoading,
//         userLoading,
//         form,
//         showForm,
//         isEditing,
//         isFormValid,
//         isSubmitting,
//         isAuthenticated,
//         canCreateTestimonial,
//         canEditTestimonial,
//         canDeleteTestimonial,
//         hasExistingTestimonial,
//         pagination,
//         anyLoading,
//         hasPublicTestimonials,
//         hasFeaturedTestimonials,
//         canSubmitForm,
//         totalPublicTestimonials,
//         averageRating
//     } = useTestimonialsPageState();
//
//     // Local state
//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [testimonialToDelete, setTestimonialToDelete] = useState(null);
//
//     // Initialize data
//     useEffect(() => {
//         dispatch(fetchPublicTestimonials());
//         if (isAuthenticated) {
//             dispatch(fetchUserTestimonials());
//         }
//     }, [dispatch, isAuthenticated]);
//
//     // Helper functions
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };
//
//     const formatRelativeTime = (date) => {
//         const now = new Date();
//         const testimonialDate = new Date(date);
//         const diffInMs = now - testimonialDate;
//         const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//
//         if (diffInDays === 0) return 'Today';
//         if (diffInDays === 1) return 'Yesterday';
//         if (diffInDays < 7) return `${diffInDays} days ago`;
//         if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
//         if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
//         return `${Math.floor(diffInDays / 365)} years ago`;
//     };
//
//     const getRatingText = (rating) => {
//         const texts = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
//         return texts[rating] || 'Unknown';
//     };
//
//     const getApprovalStatusText = (testimonial) => {
//         if (testimonial.isApproved && testimonial.isPublished) return 'Published';
//         if (!testimonial.isApproved) return 'Pending Approval';
//         if (!testimonial.isPublished) return 'Unpublished';
//         return 'Unknown';
//     };
//
//     const getApprovalStatusColor = (testimonial) => {
//         if (testimonial.isApproved && testimonial.isPublished) return 'green';
//         if (!testimonial.isApproved) return 'yellow';
//         if (!testimonial.isPublished) return 'gray';
//         return 'gray';
//     };
//
//     // Event handlers
//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > 5 * 1024 * 1024) {
//                 alert('Photo size should be less than 5MB');
//                 return;
//             }
//
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setPhotoPreview(e.target.result);
//                 dispatch(setFormPhoto({ file, preview: e.target.result }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     const removePhoto = () => {
//         setPhotoPreview(null);
//         dispatch(setFormPhoto({ file: null, preview: null }));
//     };
//
//     const handleSubmit = async () => {
//         if (!canSubmitForm) return;
//
//         try {
//             if (isEditing) {
//                 await dispatch(updateTestimonial({
//                     testimonialId: userTestimonial._id,
//                     testimonialData: form
//                 })).unwrap();
//             } else {
//                 await dispatch(createTestimonial(form)).unwrap();
//             }
//
//             dispatch(setShowForm(false));
//             dispatch(resetForm());
//             setPhotoPreview(null);
//
//             // Refresh testimonials
//             dispatch(fetchUserTestimonials());
//             dispatch(fetchPublicTestimonials());
//         } catch (error) {
//             console.error('Failed to submit testimonial:', error);
//         }
//     };
//
//     const handleEdit = (testimonial) => {
//         dispatch(setCurrentTestimonial(testimonial));
//         if (testimonial.photo) {
//             setPhotoPreview(testimonial.photo);
//         }
//     };
//
//     const handleDeleteClick = (testimonial) => {
//         setTestimonialToDelete(testimonial);
//         setShowDeleteConfirm(true);
//     };
//
//     const confirmDelete = async () => {
//         if (testimonialToDelete) {
//             try {
//                 await dispatch(deleteTestimonial(testimonialToDelete._id)).unwrap();
//                 setShowDeleteConfirm(false);
//                 setTestimonialToDelete(null);
//
//                 // Refresh testimonials
//                 dispatch(fetchUserTestimonials());
//                 dispatch(fetchPublicTestimonials());
//             } catch (error) {
//                 console.error('Failed to delete testimonial:', error);
//             }
//         }
//     };
//
//     const handleStartWriting = () => {
//         if (!isAuthenticated) {
//             alert('Please log in to write a testimonial');
//             return;
//         }
//
//         if (hasExistingTestimonial) {
//             handleEdit(userTestimonial);
//         } else {
//             dispatch(setShowForm(true));
//         }
//     };
//
//     const handlePageChange = (newPage) => {
//         dispatch(setCurrentPage(newPage));
//         dispatch(fetchPublicTestimonials({ page: newPage }));
//     };
//
//     // Component renders
//     const renderStars = (rating, size = 'w-5 h-5') => {
//         return (
//             <div className="flex items-center space-x-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                         key={star}
//                         className={`${size} ${
//                             star <= rating
//                                 ? 'text-yellow-400 fill-current'
//                                 : 'text-gray-300'
//                         }`}
//                     />
//                 ))}
//             </div>
//         );
//     };
//
//     const renderTestimonialCard = (testimonial, showActions = false) => (
//         <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                     {testimonial.photo ? (
//                         <img
//                             src={testimonial.photo}
//                             alt={`${testimonial.name}'s photo`}
//                             className="w-16 h-16 rounded-full object-cover"
//                         />
//                     ) : (
//                         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                             <User className="w-8 h-8 text-gray-400" />
//                         </div>
//                     )}
//                 </div>
//
//                 <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between mb-2">
//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
//                             <div className="flex items-center space-x-2 mt-1">
//                                 {renderStars(testimonial.rating)}
//                                 <span className="text-sm text-gray-600">
//                                     {getRatingText(testimonial.rating)}
//                                 </span>
//                             </div>
//                         </div>
//
//                         {showActions && (
//                             <div className="flex items-center space-x-2">
//                                 {canEditTestimonial(testimonial) && (
//                                     <button
//                                         onClick={() => handleEdit(testimonial)}
//                                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                         title="Edit testimonial"
//                                     >
//                                         <Edit className="w-4 h-4" />
//                                     </button>
//                                 )}
//
//                                 {canDeleteTestimonial(testimonial) && (
//                                     <button
//                                         onClick={() => handleDeleteClick(testimonial)}
//                                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                         title="Delete testimonial"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//
//                     <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.content}</p>
//
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                         <div className="flex items-center space-x-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{formatRelativeTime(testimonial.createdAt)}</span>
//                         </div>
//
//                         {showActions && (
//                             <div className="flex items-center space-x-2">
//                                 <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
//                                     getApprovalStatusColor(testimonial) === 'green'
//                                         ? 'bg-green-100 text-green-800'
//                                         : getApprovalStatusColor(testimonial) === 'yellow'
//                                             ? 'bg-yellow-100 text-yellow-800'
//                                             : 'bg-gray-100 text-gray-800'
//                                 }`}>
//                                     {testimonial.isApproved ? (
//                                         <CheckCircle className="w-3 h-3" />
//                                     ) : (
//                                         <Clock className="w-3 h-3" />
//                                     )}
//                                     <span>{getApprovalStatusText(testimonial)}</span>
//                                 </div>
//
//                                 {testimonial.featured && (
//                                     <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
//                                         Featured
//                                     </span>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
//
//     const renderStatistics = () => (
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-6 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="text-center">
//                     <div className="text-3xl font-bold text-blue-600">{totalPublicTestimonials}</div>
//                     <div className="text-gray-600">Total Testimonials</div>
//                 </div>
//                 <div className="text-center">
//                     <div className="flex items-center justify-center space-x-2">
//                         <span className="text-3xl font-bold text-blue-600">
//                             {averageRating.toFixed(1)}
//                         </span>
//                         {renderStars(Math.round(averageRating), 'w-6 h-6')}
//                     </div>
//                     <div className="text-gray-600">Average Rating</div>
//                 </div>
//                 <div className="text-center">
//                     <div className="text-3xl font-bold text-blue-600">{featuredTestimonials.length}</div>
//                     <div className="text-gray-600">Featured Stories</div>
//                 </div>
//             </div>
//         </div>
//     );
//
//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Testimonials</h1>
//                     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                         Read what our customers have to say about their experience with us,
//                         and share your own story to help others.
//                     </p>
//                 </div>
//
//                 {/* Statistics */}
//                 {hasPublicTestimonials && renderStatistics()}
//
//                 {/* Featured Testimonials */}
//                 {hasFeaturedTestimonials && (
//                     <div className="mb-12">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Stories</h2>
//                         <div className="grid gap-6 md:grid-cols-2">
//                             {featuredTestimonials.slice(0, 2).map(testimonial => (
//                                 <div key={testimonial._id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-1 border border-blue-200">
//                                     {renderTestimonialCard(testimonial)}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//
//                 {/* User's Testimonial Section */}
//                 {isAuthenticated && (
//                     <div className="mb-8 bg-white rounded-lg shadow-md p-6">
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-xl font-semibold text-gray-900">Your Testimonial</h2>
//                             {!hasExistingTestimonial && canCreateTestimonial && (
//                                 <button
//                                     onClick={handleStartWriting}
//                                     className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     <Plus className="w-4 h-4" />
//                                     <span>Write Testimonial</span>
//                                 </button>
//                             )}
//                         </div>
//
//                         {userLoading ? (
//                             <div className="text-center py-4">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//                                 <p className="text-gray-600 mt-2">Loading your testimonials...</p>
//                             </div>
//                         ) : hasExistingTestimonial ? (
//                             <div>
//                                 <p className="text-gray-600 mb-4">Thank you for sharing your experience with us!</p>
//                                 {userTestimonials.map(testimonial => renderTestimonialCard(testimonial, true))}
//                             </div>
//                         ) : canCreateTestimonial ? (
//                             <div className="text-center py-6">
//                                 <p className="text-gray-600 mb-4">We'd love to hear about your experience!</p>
//                                 <button
//                                     onClick={handleStartWriting}
//                                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                                 >
//                                     Share Your Story
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
//                                 <p className="text-yellow-800">You already have a testimonial. You can edit it above.</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//
//                 {/* All Testimonials */}
//                 <div className="mb-8">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold text-gray-900">
//                             All Testimonials ({totalPublicTestimonials})
//                         </h2>
//
//                         {!isAuthenticated && (
//                             <button
//                                 onClick={() => alert('Please log in to write a testimonial')}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Write Testimonial
//                             </button>
//                         )}
//                     </div>
//
//                     {publicLoading ? (
//                         <div className="text-center py-8">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                             <p className="text-gray-600 mt-4">Loading testimonials...</p>
//                         </div>
//                     ) : hasPublicTestimonials ? (
//                         <div>
//                             <div className="grid gap-6 mb-8">
//                                 {publicTestimonials.map(testimonial => renderTestimonialCard(testimonial))}
//                             </div>
//
//                             {/* Pagination */}
//                             {pagination.totalPages > 1 && (
//                                 <div className="flex justify-center items-center space-x-4">
//                                     <button
//                                         onClick={() => handlePageChange(pagination.currentPage - 1)}
//                                         disabled={!pagination.hasPreviousPage}
//                                         className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                                     >
//                                         <ChevronLeft className="w-4 h-4" />
//                                         <span>Previous</span>
//                                     </button>
//
//                                     <div className="flex items-center space-x-2">
//                                         {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                                             const pageNum = i + Math.max(1, pagination.currentPage - 2);
//                                             if (pageNum > pagination.totalPages) return null;
//
//                                             return (
//                                                 <button
//                                                     key={pageNum}
//                                                     onClick={() => handlePageChange(pageNum)}
//                                                     className={`px-3 py-2 rounded-lg transition-colors ${
//                                                         pageNum === pagination.currentPage
//                                                             ? 'bg-blue-600 text-white'
//                                                             : 'bg-white border border-gray-300 hover:bg-gray-50'
//                                                     }`}
//                                                 >
//                                                     {pageNum}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//
//                                     <button
//                                         onClick={() => handlePageChange(pagination.currentPage + 1)}
//                                         disabled={!pagination.hasNextPage}
//                                         className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//                                     >
//                                         <span>Next</span>
//                                         <ChevronRight className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <div className="text-gray-400 mb-4">
//                                 <User className="w-16 h-16 mx-auto" />
//                             </div>
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
//                             <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
//                             {isAuthenticated && canCreateTestimonial && (
//                                 <button
//                                     onClick={handleStartWriting}
//                                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                                 >
//                                     Write First Testimonial
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Testimonial Form Modal */}
//                 {showForm && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                         <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//                             <div className="p-6">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h3 className="text-xl font-semibold text-gray-900">
//                                         {isEditing ? 'Edit Your Testimonial' : 'Write Your Testimonial'}
//                                     </h3>
//                                     <button
//                                         onClick={() => dispatch(setShowForm(false))}
//                                         className="text-gray-400 hover:text-gray-600"
//                                     >
//                                         <X className="w-6 h-6" />
//                                     </button>
//                                 </div>
//
//                                 <div className="space-y-4">
//                                     {/* Name Field */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Your Name *
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={form.name}
//                                             onChange={(e) => dispatch(updateForm({ name: e.target.value }))}
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                             placeholder="Enter your name"
//                                             required
//                                         />
//                                     </div>
//
//                                     {/* Rating Field */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Rating *
//                                         </label>
//                                         <div className="flex items-center space-x-1">
//                                             {[1, 2, 3, 4, 5].map((star) => (
//                                                 <button
//                                                     key={star}
//                                                     type="button"
//                                                     onClick={() => dispatch(updateForm({ rating: star }))}
//                                                     className="focus:outline-none"
//                                                 >
//                                                     <Star
//                                                         className={`w-8 h-8 ${
//                                                             star <= form.rating
//                                                                 ? 'text-yellow-400 fill-current'
//                                                                 : 'text-gray-300'
//                                                         } hover:text-yellow-400 transition-colors`}
//                                                     />
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <p className="text-sm text-gray-600 mt-1">
//                                             {getRatingText(form.rating)}
//                                         </p>
//                                     </div>
//
//                                     {/* Content Field */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Your Experience *
//                                         </label>
//                                         <textarea
//                                             value={form.content}
//                                             onChange={(e) => dispatch(updateForm({ content: e.target.value }))}
//                                             rows={4}
//                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                             placeholder="Share your experience with us... (minimum 10 characters)"
//                                             required
//                                             minLength={10}
//                                             maxLength={1000}
//                                         />
//                                         <div className="flex justify-between text-sm text-gray-500 mt-1">
//                                             <span>Minimum 10 characters</span>
//                                             <span>{form.content.length}/1000</span>
//                                         </div>
//                                     </div>
//
//                                     {/* Photo Upload */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Photo (Optional)
//                                         </label>
//
//                                         {photoPreview ? (
//                                             <div className="relative">
//                                                 <img
//                                                     src={photoPreview}
//                                                     alt="Preview"
//                                                     className="w-full h-32 object-cover rounded-lg"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={removePhoto}
//                                                     className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                                                 >
//                                                     <X className="w-4 h-4" />
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <label className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     onChange={handlePhotoChange}
//                                                     className="hidden"
//                                                 />
//                                                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                                                     <Upload className="w-8 h-8 mb-2" />
//                                                     <p className="text-sm">Click to upload photo</p>
//                                                     <p className="text-xs">Max size: 5MB</p>
//                                                 </div>
//                                             </label>
//                                         )}
//                                     </div>
//
//                                     {/* Submit Button */}
//                                     <div className="flex space-x-3 pt-4">
//                                         <button
//                                             type="button"
//                                             onClick={() => dispatch(setShowForm(false))}
//                                             className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                                         >
//                                             Cancel
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={handleSubmit}
//                                             disabled={!isFormValid || isSubmitting}
//                                             className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                         >
//                                             {isSubmitting ? 'Submitting...' : (isEditing ? 'Update' : 'Submit')}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Delete Confirmation Modal */}
//                 {showDeleteConfirm && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                         <div className="bg-white rounded-lg max-w-md w-full p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                                 Delete Testimonial
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 Are you sure you want to delete this testimonial? This action cannot be undone.
//                             </p>
//                             <div className="flex space-x-3">
//                                 <button
//                                     onClick={() => setShowDeleteConfirm(false)}
//                                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={confirmDelete}
//                                     disabled={anyLoading}
//                                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
//                                 >
//                                     {anyLoading ? 'Deleting...' : 'Delete'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default TestimonialsPage;
'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
    fetchPublicTestimonials,
    fetchUserTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    removeTestimonialPhoto,
    setShowForm,
    setCurrentTestimonial,
    updateForm,
    setFormPhoto,
    removeFormPhoto,
    resetForm,
    setCurrentPage,
    clearError,
    selectPublicTestimonials,
    selectFeaturedTestimonials,
    selectUserTestimonials,
    selectCurrentTestimonial,
    selectTestimonialForm,
    selectPublicLoading,
    selectUserLoading,
    selectCreating,
    selectUpdating,
    selectDeleting,
    selectRemovingPhoto,
    selectTestimonialError,
    selectShowForm,
    selectIsEditing,
    selectTestimonialPagination,
    selectCanUserTestify,
    selectUserHasTestimonial,
    selectTestimonialFormValid,
    selectTestimonialStats
} from '@/store/slices/testimonialSlice';
import { Star, Upload, Edit, Trash2, User, Calendar, CheckCircle, Clock, X, Plus, ChevronLeft, ChevronRight, Camera, AlertCircle } from 'lucide-react';

const TestimonialsPage = () => {
    const dispatch = useAppDispatch();

    // Redux state
    const publicTestimonials = useAppSelector(selectPublicTestimonials);
    const featuredTestimonials = useAppSelector(selectFeaturedTestimonials);
    const userTestimonials = useAppSelector(selectUserTestimonials);
    const currentTestimonial = useAppSelector(selectCurrentTestimonial);
    const form = useAppSelector(selectTestimonialForm);
    const publicLoading = useAppSelector(selectPublicLoading);
    const userLoading = useAppSelector(selectUserLoading);
    const creating = useAppSelector(selectCreating);
    const updating = useAppSelector(selectUpdating);
    const deleting = useAppSelector(selectDeleting);
    const removingPhoto = useAppSelector(selectRemovingPhoto);
    const error = useAppSelector(selectTestimonialError);
    const showForm = useAppSelector(selectShowForm);
    const isEditing = useAppSelector(selectIsEditing);
    const pagination = useAppSelector(selectTestimonialPagination);
    const canUserTestify = useAppSelector(selectCanUserTestify);
    const userHasTestimonial = useAppSelector(selectUserHasTestimonial);
    const isFormValid = useAppSelector(selectTestimonialFormValid);
    const testimonialStats = useAppSelector(selectTestimonialStats);

    // User authentication state
    const {user, isAuthenticated} = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }));

    // Local state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState(null);

    // Computed values
    const userTestimonial = userTestimonials.length > 0 ? userTestimonials[0] : null;
    const hasPublicTestimonials = publicTestimonials.length > 0;
    const hasFeaturedTestimonials = featuredTestimonials.length > 0;
    const canSubmitForm = isAuthenticated && isFormValid && !creating && !updating;
    const anyLoading = creating || updating || deleting || removingPhoto;

    // Initialize data
    useEffect(() => {
        dispatch(fetchPublicTestimonials());
        if (isAuthenticated) {
            dispatch(fetchUserTestimonials());
        }
    }, [dispatch, isAuthenticated]);

    // Helper functions
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatRelativeTime = (date) => {
        const now = new Date();
        const testimonialDate = new Date(date);
        const diffInMs = now - testimonialDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    };

    const getRatingText = (rating) => {
        const texts = {1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent'};
        return texts[rating] || 'Unknown';
    };

    const getApprovalStatusText = (testimonial) => {
        if (testimonial.isApproved && testimonial.isPublished) return 'Published';
        if (!testimonial.isApproved) return 'Pending Approval';
        if (!testimonial.isPublished) return 'Unpublished';
        return 'Unknown';
    };

    const getApprovalStatusColor = (testimonial) => {
        if (testimonial.isApproved && testimonial.isPublished) return 'green';
        if (!testimonial.isApproved) return 'yellow';
        if (!testimonial.isPublished) return 'gray';
        return 'gray';
    };

    const canEditTestimonial = (testimonial) => {
        return user?._id === testimonial.user?._id || user?.admin;
    };

    const canDeleteTestimonial = (testimonial) => {
        return user?._id === testimonial.user?._id || user?.admin;
    };

    // Event handlers
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('Photo size should be less than 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch(setFormPhoto({file, preview: e.target.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFormPhoto = () => {
        dispatch(removeFormPhoto());
    };

    const handleSubmit = async () => {
        if (!canSubmitForm) return;

        try {
            if (isEditing) {
                // Check if user wants to remove photo (had photo before but no photo now)
                const shouldRemovePhoto = userTestimonial?.photo && !form.photo && !form.photoPreview;

                await dispatch(updateTestimonial({
                    testimonialId: userTestimonial._id,
                    testimonialData: form,
                    removePhoto: shouldRemovePhoto
                })).unwrap();
            } else {
                await dispatch(createTestimonial(form)).unwrap();
            }

            // Refresh testimonials
            dispatch(fetchUserTestimonials());
            dispatch(fetchPublicTestimonials());
        } catch (error) {
            console.error('Failed to submit testimonial:', error);
        }
    };

    const handleEdit = (testimonial) => {
        dispatch(setCurrentTestimonial(testimonial));
    };

    const handleDeleteClick = (testimonial) => {
        setTestimonialToDelete(testimonial);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (testimonialToDelete) {
            try {
                await dispatch(deleteTestimonial(testimonialToDelete._id)).unwrap();
                setShowDeleteConfirm(false);
                setTestimonialToDelete(null);

                // Refresh testimonials
                dispatch(fetchUserTestimonials());
                dispatch(fetchPublicTestimonials());
            } catch (error) {
                console.error('Failed to delete testimonial:', error);
            }
        }
    };

    const handleStartWriting = () => {
        if (!isAuthenticated) {
            alert('Please log in to write a testimonial');
            return;
        }

        if (userHasTestimonial && userTestimonial) {
            handleEdit(userTestimonial);
        } else {
            dispatch(setShowForm(true));
        }
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
        dispatch(fetchPublicTestimonials({page: newPage}));
    };

    const handleRemoveExistingPhoto = async (testimonialId) => {
        try {
            await dispatch(removeTestimonialPhoto(testimonialId)).unwrap();

            // Refresh testimonials
            dispatch(fetchUserTestimonials());
            dispatch(fetchPublicTestimonials());
        } catch (error) {
            console.error('Failed to remove photo:', error);
        }
    };

    const handleCloseForm = () => {
        dispatch(setShowForm(false));
        dispatch(resetForm());
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    // Component renders
    const renderStars = (rating, size = 'w-5 h-5') => {
        return (
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${
                            star <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    const renderTestimonialCard = (testimonial, showActions = false) => (
        <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 relative">
                    {testimonial.photo ? (
                        <div className="relative group">
                            <img
                                src={testimonial.photo}
                                alt={`${testimonial.name}'s photo`}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            {showActions && canEditTestimonial(testimonial) && (
                                <button
                                    onClick={() => handleRemoveExistingPhoto(testimonial._id)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove photo"
                                    disabled={removingPhoto}
                                >
                                    {removingPhoto ? (
                                        <div
                                            className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <X className="w-3 h-3"/>
                                    )}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400"/>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                {renderStars(testimonial.rating)}
                                <span className="text-sm text-gray-600">
                                    {getRatingText(testimonial.rating)}
                                </span>
                            </div>
                        </div>

                        {showActions && (
                            <div className="flex items-center space-x-2">
                                {canEditTestimonial(testimonial) && (
                                    <button
                                        onClick={() => handleEdit(testimonial)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit testimonial"
                                        disabled={anyLoading}
                                    >
                                        <Edit className="w-4 h-4"/>
                                    </button>
                                )}

                                {canDeleteTestimonial(testimonial) && (
                                    <button
                                        onClick={() => handleDeleteClick(testimonial)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete testimonial"
                                        disabled={anyLoading}
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.content}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4"/>
                            <span>{formatRelativeTime(testimonial.createdAt)}</span>
                        </div>

                        {showActions && (
                            <div className="flex items-center space-x-2">
                                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                                    getApprovalStatusColor(testimonial) === 'green'
                                        ? 'bg-green-100 text-green-800'
                                        : getApprovalStatusColor(testimonial) === 'yellow'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {testimonial.isApproved ? (
                                        <CheckCircle className="w-3 h-3"/>
                                    ) : (
                                        <Clock className="w-3 h-3"/>
                                    )}
                                    <span>{getApprovalStatusText(testimonial)}</span>
                                </div>

                                {testimonial.featured && (
                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                        Featured
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStatistics = () => (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{testimonialStats.totalTestimonials}</div>
                    <div className="text-gray-600">Total Testimonials</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-3xl font-bold text-blue-600">
                            {testimonialStats.averageRating.toFixed(1)}
                        </span>
                        {renderStars(Math.round(testimonialStats.averageRating), 'w-6 h-6')}
                    </div>
                    <div className="text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{featuredTestimonials.length}</div>
                    <div className="text-gray-600">Featured Stories</div>
                </div>
            </div>
        </div>
    );

    const renderPhotoUploadSection = () => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo (Optional)
            </label>

            {form.photoPreview ? (
                <div className="relative">
                    <img
                        src={form.photoPreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveFormPhoto}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        title="Remove photo"
                    >
                        <X className="w-4 h-4"/>
                    </button>
                </div>
            ) : (
                <div>
                    {/* Show existing photo if editing and no new photo selected */}
                    {isEditing && userTestimonial?.photo && !form.photo && (
                        <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">Current photo:</p>
                            <div className="relative inline-block group">
                                <img
                                    src={userTestimonial.photo}
                                    alt="Current photo"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExistingPhoto(userTestimonial._id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Remove current photo"
                                    disabled={removingPhoto}
                                >
                                    {removingPhoto ? (
                                        <div
                                            className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <X className="w-3 h-3"/>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Upload a new photo below to replace, or click X to remove
                            </p>
                        </div>
                    )}

                    {/* Photo upload area */}
                    <label
                        className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <Upload className="w-8 h-8 mb-2"/>
                            <p className="text-sm">
                                {isEditing && userTestimonial?.photo && !form.photo
                                    ? 'Click to upload new photo'
                                    : 'Click to upload photo'
                                }
                            </p>
                            <p className="text-xs">Max size: 5MB • JPG, PNG, WebP</p>
                        </div>
                    </label>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Testimonials</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Read what our customers have to say about their experience with us,
                        and share your own story to help others.
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2"/>
                            <p className="text-red-800">{error}</p>
                            <button
                                onClick={handleClearError}
                                className="ml-auto text-red-600 hover:text-red-800"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                )}

                {/* Statistics */}
                {/*{hasPublicTestimonials && renderStatistics()}*/}

                {/* Featured Testimonials */}
                {hasFeaturedTestimonials && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Stories</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {featuredTestimonials.slice(0, 2).map(testimonial => (
                                <div key={testimonial._id}
                                     className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-1 border border-blue-200">
                                    {renderTestimonialCard(testimonial)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* User's Testimonial Section */}
                {isAuthenticated && (
                    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Your Testimonial</h2>
                            {!userHasTestimonial && canUserTestify && (
                                <button
                                    onClick={handleStartWriting}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={anyLoading}
                                >
                                    <Plus className="w-4 h-4"/>
                                    <span>Write Testimonial</span>
                                </button>
                            )}
                        </div>

                        {userLoading ? (
                            <div className="text-center py-4">
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-600 mt-2">Loading your testimonials...</p>
                            </div>
                        ) : userHasTestimonial ? (
                            <div>
                                <p className="text-gray-600 mb-4">Thank you for sharing your experience with us!</p>
                                {userTestimonials.map(testimonial => renderTestimonialCard(testimonial, true))}
                            </div>
                        ) : canUserTestify ? (
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">We'd love to hear about your experience!</p>
                                <button
                                    onClick={handleStartWriting}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                                    disabled={anyLoading}
                                >
                                    Share Your Story
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-yellow-800">You already have a testimonial. You can edit it
                                    above.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* All Testimonials */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            All Testimonials ({pagination.totalCount})
                        </h2>

                        {!isAuthenticated && (
                            <button
                                onClick={() => alert('Please log in to write a testimonial')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Write Testimonial
                            </button>
                        )}
                    </div>

                    {publicLoading ? (
                        <div className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading testimonials...</p>
                        </div>
                    ) : hasPublicTestimonials ? (
                        <div>
                            <div className="grid gap-6 mb-8">
                                {publicTestimonials.map(testimonial => renderTestimonialCard(testimonial))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-4">
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPreviousPage || publicLoading}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4"/>
                                        <span>Previous</span>
                                    </button>

                                    <div className="flex items-center space-x-2">
                                        {Array.from({length: Math.min(5, pagination.totalPages)}, (_, i) => {
                                            const pageNum = i + Math.max(1, pagination.currentPage - 2);
                                            if (pageNum > pagination.totalPages) return null;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    disabled={publicLoading}
                                                    className={`px-3 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                                                        pageNum === pagination.currentPage
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
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={!pagination.hasNextPage || publicLoading}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <span>Next</span>
                                        <ChevronRight className="w-4 h-4"/>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <User className="w-16 h-16 mx-auto"/>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
                            <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
                            {isAuthenticated && canUserTestify && (
                                <button
                                    onClick={handleStartWriting}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                                    disabled={anyLoading}
                                >
                                    Write First Testimonial
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Testimonial Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {isEditing ? 'Edit Your Testimonial' : 'Write Your Testimonial'}
                                    </h3>
                                    <button
                                        onClick={handleCloseForm}
                                        className="text-gray-400 hover:text-gray-600"
                                        disabled={anyLoading}
                                    >
                                        <X className="w-6 h-6"/>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => dispatch(updateForm({name: e.target.value}))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your name"
                                            required
                                            disabled={anyLoading}
                                        />
                                    </div>

                                    {/* Rating Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rating *
                                        </label>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => dispatch(updateForm({rating: star}))}
                                                    className="focus:outline-none disabled:opacity-50"
                                                    disabled={anyLoading}
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${
                                                            star <= form.rating
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        } hover:text-yellow-400 transition-colors`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {getRatingText(form.rating)}
                                        </p>
                                    </div>

                                    {/* Content Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Experience *
                                        </label>
                                        <textarea
                                            value={form.content}
                                            onChange={(e) => dispatch(updateForm({content: e.target.value}))}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Share your experience with us... (minimum 10 characters)"
                                            required
                                            minLength={10}
                                            maxLength={1000}
                                            disabled={anyLoading}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                                            <span>Minimum 10 characters</span>
                                            <span className={form.content.length > 900 ? 'text-orange-600' : ''}>
                                                {form.content.length}/1000
                                            </span>
                                        </div>
                                    </div>

                                    {/* Photo Upload */}
                                    {renderPhotoUploadSection()}

                                    {/* Error Display */}
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-red-800 text-sm">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseForm}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            disabled={anyLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={!isFormValid || anyLoading}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {anyLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    {creating ? 'Creating...' : updating ? 'Updating...' : 'Processing...'}
                                                </div>
                                            ) : (
                                                isEditing ? 'Update Testimonial' : 'Submit Testimonial'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Delete Testimonial
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this testimonial? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                                >
                                    {deleting ? (
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Deleting...
                                        </div>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
export default TestimonialsPage;