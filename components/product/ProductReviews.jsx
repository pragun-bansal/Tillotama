// // components/product/ProductReviews.jsx
// "use client";
// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import {
//     fetchProductReviews,
//     addReview,
//     updateReview,
//     deleteReview,
//     setShowWriteReview,
//     setEditingReview,
//     setShowDeleteConfirm,
//     setReviewToDelete,
//     updateReviewForm,
//     resetReviewForm,
//     setCurrentProductId,
//     clearError,
//     selectCurrentProductReviews,
//     selectReviewsLoading,
//     selectReviewsError,
//     selectShowWriteReview,
//     selectEditingReview,
//     selectReviewForm,
//     selectShowDeleteConfirm,
//     selectReviewToDelete,
//     selectAddingReview,
//     selectUpdatingReview,
//     selectDeletingReview,
//     selectCanUserReview
// } from '@/store/slices/reviewSlice';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import { AnimatePresence, motion } from 'framer-motion';
// import  Skeleton  from '@/components/product/Skeleton';
//
// const ProductReviews = ({ productId, className = "" }) => {
//     const dispatch = useAppDispatch();
//
//     // Redux state
//     const reviews = useAppSelector(selectCurrentProductReviews);
//     const loading = useAppSelector(selectReviewsLoading);
//     const error = useAppSelector(selectReviewsError);
//     const showWriteReview = useAppSelector(selectShowWriteReview);
//     const editingReview = useAppSelector(selectEditingReview);
//     const reviewForm = useAppSelector(selectReviewForm);
//     const showDeleteConfirm = useAppSelector(selectShowDeleteConfirm);
//     const reviewToDelete = useAppSelector(selectReviewToDelete);
//     const addingReview = useAppSelector(selectAddingReview);
//     const updatingReview = useAppSelector(selectUpdatingReview);
//     const deletingReview = useAppSelector(selectDeletingReview);
//     const canUserReview = useAppSelector(selectCanUserReview);
//
//     // User state
//     const { user, isAuthenticated } = useAppSelector((state) => ({
//         user: state.user.data,
//         isAuthenticated: state.user.isAuthenticated
//     }));
//
//     // Initialize and fetch reviews
//     useEffect(() => {
//         if (productId) {
//             dispatch(setCurrentProductId(productId));
//             dispatch(fetchProductReviews(productId));
//         }
//     }, [productId, dispatch]);
//
//     // Handle errors with toast notifications
//     useEffect(() => {
//         if (error) {
//             toast.error(error, {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 theme: "dark",
//             });
//             dispatch(clearError());
//         }
//     }, [error, dispatch]);
//
//     // ==================== EVENT HANDLERS ====================
//
//     const handleWriteReview = () => {
//         if (!isAuthenticated) {
//             toast.error("Please login to write a review", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//             return;
//         }
//
//         if (!canUserReview) {
//             toast.info("You have already reviewed this product", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//             return;
//         }
//
//         dispatch(setShowWriteReview(true));
//     };
//
//     const handleFormChange = (e) => {
//         const { id, value } = e.target;
//         dispatch(updateReviewForm({ [id]: value }));
//     };
//
//     const handleSubmitReview = async (e) => {
//         e.preventDefault();
//
//         if (!reviewForm.title.trim()) {
//             toast.error("Please add a title to your review", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//             return;
//         }
//
//         if (!reviewForm.comment.trim()) {
//             toast.error("Please add a comment to your review", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//             return;
//         }
//
//         try {
//             if (editingReview) {
//                 // Update existing review
//                 await dispatch(updateReview({
//                     reviewId: editingReview._id,
//                     productId,
//                     title: reviewForm.title.trim(),
//                     comment: reviewForm.comment.trim(),
//                     rating: parseInt(reviewForm.rating)
//                 })).unwrap();
//
//                 toast.success("Review updated successfully!", {
//                     position: "top-center",
//                     autoClose: 2000,
//                     theme: "dark",
//                 });
//             } else {
//                 // Add new review
//                 await dispatch(addReview({
//                     productId,
//                     title: reviewForm.title.trim(),
//                     comment: reviewForm.comment.trim(),
//                     rating: parseInt(reviewForm.rating)
//                 })).unwrap();
//
//                 toast.success("Review added successfully!", {
//                     position: "top-center",
//                     autoClose: 2000,
//                     theme: "dark",
//                 });
//             }
//         } catch (error) {
//             // Error is handled in the useEffect above
//             console.error('Review submission error:', error);
//         }
//     };
//
//     const handleEditReview = (review) => {
//         dispatch(setEditingReview(review));
//     };
//
//     const handleDeleteReview = (review) => {
//         dispatch(setReviewToDelete(review));
//     };
//
//     const handleConfirmDelete = async () => {
//         if (!reviewToDelete) return;
//
//         try {
//             await dispatch(deleteReview({
//                 reviewId: reviewToDelete._id,
//                 productId
//             })).unwrap();
//
//             toast.success("Review deleted successfully!", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//         } catch (error) {
//             // Error is handled in the useEffect above
//             console.error('Review deletion error:', error);
//         }
//     };
//
//     const handleCloseModal = () => {
//         dispatch(setShowDeleteConfirm(false));
//         dispatch(setShowWriteReview(false));
//         dispatch(resetReviewForm());
//     };
//
//     // ==================== ANIMATION VARIANTS ====================
//
//     const modalAnimation = {
//         hidden: { opacity: 0, scale: 0.8 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: { duration: 0.3, ease: "easeOut" }
//         },
//         exit: {
//             opacity: 0,
//             scale: 0.8,
//             transition: { duration: 0.2 }
//         },
//     };
//
//     const overlayAnimation = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1 },
//         exit: { opacity: 0 }
//     };
//
//     // ==================== RENDER FUNCTIONS ====================
//
//     const renderStarRating = (rating, interactive = false, onChange = null) => {
//         return (
//             <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                     <svg
//                         key={i}
//                         className={`h-[21px] mr-2 cursor-pointer ${
//                             i < rating
//                                 ? 'text-[#EE6983]'
//                                 : 'text-gray-200 stroke-2 stroke-[#EE6983] fill-transparent'
//                         }`}
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 22 20"
//                         onClick={interactive ? () => onChange(i + 1) : undefined}
//                     >
//                         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                     </svg>
//                 ))}
//             </div>
//         );
//     };
//
//     const renderReviewForm = () => (
//         <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={overlayAnimation}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//         >
//             <motion.form
//                 variants={modalAnimation}
//                 className="w-[95%] md:w-[85%] lg:w-[70vw] max-w-4xl mx-4 bg-white rounded-lg shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
//                 onSubmit={handleSubmitReview}
//             >
//                 <div className="flex justify-between items-start mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">
//                         {editingReview ? 'Edit Review' : 'Write a Review'}
//                     </h2>
//                     <button
//                         type="button"
//                         onClick={handleCloseModal}
//                         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                     >
//                         <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                     </button>
//                 </div>
//
//                 <div className="space-y-6">
//                     {/* Rating Selection */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Rating *
//                         </label>
//                         {renderStarRating(
//                             parseInt(reviewForm.rating),
//                             true,
//                             (rating) => dispatch(updateReviewForm({ rating }))
//                         )}
//                     </div>
//
//                     {/* Title */}
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                             Review Title *
//                         </label>
//                         <input
//                             id="title"
//                             type="text"
//                             value={reviewForm.title}
//                             onChange={handleFormChange}
//                             placeholder="Summarize your review in a few words"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE6983] focus:border-transparent"
//                             required
//                         />
//                     </div>
//
//                     {/* Comment */}
//                     <div>
//                         <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
//                             Your Review *
//                         </label>
//                         <textarea
//                             id="comment"
//                             value={reviewForm.comment}
//                             onChange={handleFormChange}
//                             placeholder="Share details about your experience with this product"
//                             rows={5}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE6983] focus:border-transparent resize-vertical"
//                             required
//                         />
//                     </div>
//
//                     {/* User Info Display */}
//                     <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                         <img
//                             src={user?.pfp || "https://i.ibb.co/LNchwvr/5794329.jpg"}
//                             alt="Your avatar"
//                             className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                             <p className="font-medium text-gray-800">{user?.name || 'Anonymous'}</p>
//                             <p className="text-sm text-gray-500">
//                                 {moment().format("MMMM DD, YYYY")}
//                             </p>
//                         </div>
//                     </div>
//
//                     {/* Submit Button */}
//                     <div className="flex justify-end space-x-3 pt-4 border-t">
//                         <button
//                             type="button"
//                             onClick={handleCloseModal}
//                             className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={addingReview || updatingReview}
//                             className="px-6 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#d55a78] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                         >
//                             {(addingReview || updatingReview) && (
//                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             )}
//                             <span>
//                                 {editingReview ? 'Update Review' : 'Submit Review'}
//                             </span>
//                         </button>
//                     </div>
//                 </div>
//             </motion.form>
//         </motion.div>
//     );
//
//     const renderDeleteConfirmation = () => (
//         <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={overlayAnimation}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//         >
//             <motion.div
//                 variants={modalAnimation}
//                 className="w-[95%] md:w-[500px] mx-4 bg-white rounded-lg shadow-2xl p-6"
//             >
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">
//                     Delete Review
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                     Are you sure you want to delete this review? This action cannot be undone.
//                 </p>
//
//                 {/* Preview of review to be deleted */}
//                 {reviewToDelete && (
//                     <div className="p-4 bg-gray-50 rounded-lg mb-6">
//                         <h4 className="font-medium text-gray-800 mb-2">
//                             {reviewToDelete.title}
//                         </h4>
//                         {renderStarRating(reviewToDelete.rating)}
//                         <p className="text-gray-600 mt-2 text-sm">
//                             {reviewToDelete.comment.length > 100
//                                 ? `${reviewToDelete.comment.substring(0, 100)}...`
//                                 : reviewToDelete.comment
//                             }
//                         </p>
//                     </div>
//                 )}
//
//                 <div className="flex justify-end space-x-3">
//                     <button
//                         onClick={() => dispatch(setShowDeleteConfirm(false))}
//                         className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                         disabled={deletingReview}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleConfirmDelete}
//                         disabled={deletingReview}
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                     >
//                         {deletingReview && (
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         )}
//                         <span>Delete</span>
//                     </button>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
//
//     const renderReviewItem = (review, index) => {
//         const isUserReview = user?._id === review.user?._id;
//
//         return (
//             <div key={review._id} className="bg-gray-50 p-6 md:p-8 rounded-lg">
//                 {index > 0 && <hr className="h-px w-full mx-auto mb-8 bg-gray-200 border-0" />}
//
//                 <div className="flex flex-col md:flex-row justify-between w-full mb-4">
//                     <div className="flex-1">
//                         <h4 className="text-xl md:text-2xl font-medium text-gray-800 mb-2">
//                             {review.title}
//                         </h4>
//                         {renderStarRating(review.rating)}
//                     </div>
//
//                     {isUserReview && (
//                         <div className="flex space-x-2 mt-4 md:mt-0">
//                             <button
//                                 onClick={() => handleEditReview(review)}
//                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                                 title="Edit review"
//                             >
//                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                                 </svg>
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteReview(review)}
//                                 className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                                 title="Delete review"
//                             >
//                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                     {review.comment}
//                 </p>
//
//                 <div className="flex items-center space-x-3">
//                     <img
//                         src={review.user?.pfp || "https://i.ibb.co/LNchwvr/5794329.jpg"}
//                         alt="User avatar"
//                         className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div>
//                         <p className="font-medium text-gray-800">
//                             {review.user?.name || 'Anonymous User'}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             {moment(review.createdAt).format("MMMM DD, YYYY")}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
//
//     // ==================== MAIN RENDER ====================
//
//     if (loading && reviews.length === 0) {
//         return <ProductReviewsSkeleton />;
//     }
//
//     return (
//         <div className={`px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center mt-16 lg:mt-0 ${className}`}>
//             <div className="flex flex-col justify-start items-start w-full space-y-8">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full space-y-4 sm:space-y-0">
//                     <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">
//                         Reviews
//                     </h2>
//                     <button
//                         onClick={handleWriteReview}
//                         disabled={!canUserReview && isAuthenticated}
//                         className="bg-[#EE6983] hover:bg-[#d55a78] text-white px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
//                     >
//                         {!isAuthenticated ? 'Login to Review' :
//                             !canUserReview ? 'Already Reviewed' : 'Write a Review'}
//                     </button>
//                 </div>
//
//                 {/* Reviews List */}
//                 <div className="w-full">
//                     {reviews.length > 0 ? (
//                         <div className="space-y-6 max-h-[70vh] overflow-y-auto">
//                             {reviews.map((review, index) => renderReviewItem(review, index))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <div className="text-gray-400 text-6xl mb-4">💬</div>
//                             <h3 className="text-xl font-medium text-gray-700 mb-2">
//                                 No reviews yet
//                             </h3>
//                             <p className="text-gray-500 mb-6">
//                                 Be the first to share your thoughts about this product.
//                             </p>
//                             {isAuthenticated && (
//                                 <button
//                                     onClick={handleWriteReview}
//                                     className="bg-[#EE6983] hover:bg-[#d55a78] text-white px-6 py-3 rounded-md transition-colors"
//                                 >
//                                     Write the First Review
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Modals */}
//                 <AnimatePresence>
//                     {showWriteReview && renderReviewForm()}
//                     {showDeleteConfirm && renderDeleteConfirmation()}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };
//
// // ==================== SKELETON COMPONENT ====================
//
// const ProductReviewsSkeleton = () => {
//     return (
//         <div className="px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center mt-16 lg:mt-0">
//             <div className="flex flex-col justify-start items-start w-full space-y-8">
//                 {/* Header skeleton */}
//                 <div className="flex justify-between items-center w-full">
//                     <Skeleton className="h-10 w-32" />
//                     <Skeleton className="h-10 w-32" />
//                 </div>
//
//                 {/* Reviews skeleton */}
//                 <div className="w-full space-y-6">
//                     {[...Array(3)].map((_, index) => (
//                         <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-lg">
//                             <div className="flex justify-between mb-4">
//                                 <div className="flex-1">
//                                     <Skeleton className="h-8 w-3/4 mb-2" />
//                                     <div className="flex space-x-1">
//                                         {[...Array(5)].map((_, i) => (
//                                             <Skeleton key={i} className="h-5 w-5" />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="space-y-2 mb-6">
//                                 <Skeleton className="h-4 w-full" />
//                                 <Skeleton className="h-4 w-full" />
//                                 <Skeleton className="h-4 w-3/4" />
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <Skeleton className="w-12 h-12 rounded-full" />
//                                 <div className="space-y-1">
//                                     <Skeleton className="h-4 w-24" />
//                                     <Skeleton className="h-3 w-20" />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductReviews;
// components/product/ProductReviews.jsx - Enhanced UI
"use client";
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
    fetchProductReviews,
    addReview,
    updateReview,
    deleteReview,
    setShowWriteReview,
    setEditingReview,
    setShowDeleteConfirm,
    setReviewToDelete,
    updateReviewForm,
    resetReviewForm,
    setCurrentProductId,
    clearError,
    selectCurrentProductReviews,
    selectReviewsLoading,
    selectReviewsError,
    selectShowWriteReview,
    selectEditingReview,
    selectReviewForm,
    selectShowDeleteConfirm,
    selectReviewToDelete,
    selectAddingReview,
    selectUpdatingReview,
    selectDeletingReview,
    selectCanUserReview
} from '@/store/slices/reviewSlice';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import Skeleton from '@/components/product/Skeleton';

const ProductReviews = ({ productId, className = "" }) => {
    const dispatch = useAppDispatch();

    // Redux state
    const reviews = useAppSelector(selectCurrentProductReviews);
    const loading = useAppSelector(selectReviewsLoading);
    const error = useAppSelector(selectReviewsError);
    const showWriteReview = useAppSelector(selectShowWriteReview);
    const editingReview = useAppSelector(selectEditingReview);
    const reviewForm = useAppSelector(selectReviewForm);
    const showDeleteConfirm = useAppSelector(selectShowDeleteConfirm);
    const reviewToDelete = useAppSelector(selectReviewToDelete);
    const addingReview = useAppSelector(selectAddingReview);
    const updatingReview = useAppSelector(selectUpdatingReview);
    const deletingReview = useAppSelector(selectDeletingReview);
    const canUserReview = useAppSelector(selectCanUserReview);

    // User state
    const { user, isAuthenticated } = useAppSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }));

    // Initialize and fetch reviews
    useEffect(() => {
        if (productId) {
            dispatch(setCurrentProductId(productId));
            dispatch(fetchProductReviews(productId));
        }
    }, [productId, dispatch]);

    // Handle errors with toast notifications
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // ==================== EVENT HANDLERS ====================

    const handleWriteReview = () => {
        if (!isAuthenticated) {
            toast.error("Please login to write a review", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (!canUserReview) {
            toast.info("You have already reviewed this product", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        dispatch(setShowWriteReview(true));
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        dispatch(updateReviewForm({ [id]: value }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!reviewForm.title.trim()) {
            toast.error("Please add a title to your review", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        if (!reviewForm.comment.trim()) {
            toast.error("Please add a comment to your review", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }

        try {
            if (editingReview) {
                await dispatch(updateReview({
                    reviewId: editingReview._id,
                    productId,
                    title: reviewForm.title.trim(),
                    comment: reviewForm.comment.trim(),
                    rating: parseInt(reviewForm.rating)
                })).unwrap();

                toast.success("Review updated successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            } else {
                await dispatch(addReview({
                    productId,
                    title: reviewForm.title.trim(),
                    comment: reviewForm.comment.trim(),
                    rating: parseInt(reviewForm.rating)
                })).unwrap();

                toast.success("Review added successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Review submission error:', error);
        }
    };

    const handleEditReview = (review) => {
        dispatch(setEditingReview(review));
    };

    const handleDeleteReview = (review) => {
        dispatch(setReviewToDelete(review));
    };

    const handleConfirmDelete = async () => {
        if (!reviewToDelete) return;

        try {
            await dispatch(deleteReview({
                reviewId: reviewToDelete._id,
                productId
            })).unwrap();

            toast.success("Review deleted successfully!", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        } catch (error) {
            console.error('Review deletion error:', error);
        }
    };

    const handleCloseModal = () => {
        dispatch(setShowDeleteConfirm(false));
        dispatch(setShowWriteReview(false));
        dispatch(resetReviewForm());
    };

    // ==================== ANIMATION VARIANTS ====================

    const modalAnimation = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: { duration: 0.2 }
        },
    };

    const overlayAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const reviewItemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    // ==================== RENDER FUNCTIONS ====================

    const renderStarRating = (rating, interactive = false, onChange = null, size = 'md') => {
        const sizeClasses = {
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6'
        };

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`${sizeClasses[size]} mr-1 transition-all duration-200 ${
                            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                        } ${
                            i < rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 fill-current'
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 20"
                        onClick={interactive ? () => onChange(i + 1) : undefined}
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                {interactive && (
                    <span className="ml-2 text-sm text-gray-600">
                        {rating}/5
                    </span>
                )}
            </div>
        );
    };

    const renderReviewForm = () => (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayAnimation}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
        >
            <motion.form
                variants={modalAnimation}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onSubmit={handleSubmitReview}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {editingReview ? 'Edit Your Review' : 'Write a Review'}
                            </h2>
                            <p className="text-pink-100 text-sm">
                                Share your experience with other customers
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Rating Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            How would you rate this product? *
                        </label>
                        <div className="flex items-center space-x-2">
                            {renderStarRating(
                                parseInt(reviewForm.rating),
                                true,
                                (rating) => dispatch(updateReviewForm({ rating })),
                                'lg'
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Review Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={reviewForm.title}
                            onChange={handleFormChange}
                            placeholder="Summarize your experience in a few words"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {reviewForm.title.length}/100 characters
                        </p>
                    </div>

                    {/* Comment */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            id="comment"
                            value={reviewForm.comment}
                            onChange={handleFormChange}
                            placeholder="Tell others about your experience with this product. What did you like or dislike about it?"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {reviewForm.comment.length}/500 characters
                        </p>
                    </div>

                    {/* User Info Display */}
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
                        <img
                            src={user?.pfp || "https://i.ibb.co/LNchwvr/5794329.jpg"}
                            alt="Your avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{user?.name || 'Anonymous'}</p>
                            <p className="text-sm text-gray-500">
                                {moment().format("MMMM DD, YYYY")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-6 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={addingReview || updatingReview}
                        className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
                    >
                        {(addingReview || updatingReview) && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        <span>
                            {editingReview ? 'Update Review' : 'Submit Review'}
                        </span>
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );

    const renderDeleteConfirmation = () => (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayAnimation}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
        >
            <motion.div
                variants={modalAnimation}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Review
                    </h3>
                    <p className="text-red-100 text-sm">
                        This action cannot be undone
                    </p>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to permanently delete this review?
                    </p>

                    {/* Preview of review to be deleted */}
                    {reviewToDelete && (
                        <div className="p-4 bg-gray-50 rounded-lg mb-6 border-l-4 border-red-400">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                "{reviewToDelete.title}"
                            </h4>
                            {renderStarRating(reviewToDelete.rating, false, null, 'sm')}
                            <p className="text-gray-600 mt-2 text-sm">
                                {reviewToDelete.comment.length > 100
                                    ? `${reviewToDelete.comment.substring(0, 100)}...`
                                    : reviewToDelete.comment
                                }
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => dispatch(setShowDeleteConfirm(false))}
                            className="px-4 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            disabled={deletingReview}
                        >
                            Keep Review
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            disabled={deletingReview}
                            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
                        >
                            {deletingReview && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            <span>Delete Forever</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    const renderReviewItem = (review, index) => {
        const isUserReview = user?._id === review.user?._id;

        return (
            <motion.div
                key={review._id}
                variants={reviewItemAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-semibold text-gray-800 leading-tight">
                                {review.title}
                            </h4>
                            {isUserReview && (
                                <div className="flex items-center ml-4">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                        Your Review
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                            {renderStarRating(review.rating, false, null, 'sm')}
                            <span className="text-sm text-gray-500">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>

                    {isUserReview && (
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => handleEditReview(review)}
                                className="group relative p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
                                title="Edit review"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Edit Review
                                </span>
                            </button>
                            <button
                                onClick={() => handleDeleteReview(review)}
                                className="group relative p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
                                title="Delete review"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Delete Review
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                    {review.comment}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                        <img
                            src={review.user?.pfp || "https://i.ibb.co/LNchwvr/5794329.jpg"}
                            alt="User avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                            <p className="font-medium text-gray-800">
                                {review.user?.name || 'Anonymous User'}
                            </p>
                            <p className="text-sm text-gray-500">
                                {moment(review.createdAt).format("MMM DD, YYYY")}
                            </p>
                        </div>
                    </div>

                    {review.updatedAt && review.updatedAt !== review.createdAt && (
                        <span className="text-xs text-gray-400 italic">
                            Edited {moment(review.updatedAt).format("MMM DD, YYYY")}
                        </span>
                    )}
                </div>
            </motion.div>
        );
    };

    // ==================== MAIN RENDER ====================

    if (loading && reviews.length === 0) {
        return <ProductReviewsSkeleton />;
    }

    return (
        <div className={`px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto mt-16 lg:mt-0 ${className}`}>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            Customer Reviews
                        </h2>
                        <p className="text-gray-600">
                            {reviews.length === 0
                                ? "No reviews yet"
                                : `${reviews.length} review${reviews.length !== 1 ? 's' : ''}`
                            }
                        </p>
                    </div>
                    <button
                        onClick={handleWriteReview}
                        disabled={!canUserReview && isAuthenticated}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>
                            {!isAuthenticated ? 'Login to Review' :
                                !canUserReview ? 'Already Reviewed' : 'Write a Review'}
                        </span>
                    </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        <motion.div
                            className="space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {reviews.map((review, index) => renderReviewItem(review, index))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
                        >
                            <div className="text-gray-400 text-6xl mb-4">💭</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                No reviews yet
                            </h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Be the first to share your experience and help other customers make informed decisions.
                            </p>
                            {isAuthenticated && canUserReview && (
                                <button
                                    onClick={handleWriteReview}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span>Write the First Review</span>
                                </button>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Modals */}
                <AnimatePresence>
                    {showWriteReview && renderReviewForm()}
                    {showDeleteConfirm && renderDeleteConfirmation()}
                </AnimatePresence>
            </div>
        </div>
    );
};

// ==================== SKELETON COMPONENT ====================

const ProductReviewsSkeleton = () => {
    return (
        <div className="px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto mt-16 lg:mt-0">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header skeleton */}
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-10 w-64 mb-2" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-12 w-36" />
                </div>

                {/* Reviews skeleton */}
                <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <Skeleton className="h-6 w-3/4 mb-3" />
                                    <div className="flex space-x-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Skeleton key={i} className="h-4 w-4 rounded" />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </div>
                            </div>
                            <div className="space-y-2 mb-6">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;