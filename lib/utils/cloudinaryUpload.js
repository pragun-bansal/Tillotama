// // // lib/utils/cloudinaryUpload.js
// // import cloudinary from '../config/cloudinary';
// //
// // export const uploadImageToCloudinary = (fileBuffer, folder, publicId) => {
// //     return new Promise((resolve, reject) => {
// //         cloudinary.uploader.upload_stream(
// //             {
// //                 resource_type: 'image',
// //                 public_id: publicId,
// //                 folder,
// //                 overwrite: true,
// //                 use_filename: true
// //             },
// //             (error, result) => {
// //                 if (error) {
// //                     reject(error);
// //                 } else {
// //                     resolve(result);
// //                 }
// //             }
// //         ).end(fileBuffer);
// //     });
// // };
// // lib/utils/cloudinaryUpload.js
// import cloudinary from '../config/cloudinary';
//
// /**
//  * Upload an image buffer to Cloudinary
//  * @param {Buffer} buffer - Image buffer
//  * @param {string} folder - Cloudinary folder path
//  * @param {string} publicId - Public ID for the image
//  * @param {Object} options - Additional upload options
//  * @returns {Promise} Cloudinary upload result
//  */
// export const uploadImageToCloudinary = async (buffer, folder, publicId, options = {}) => {
//     try {
//         return new Promise((resolve, reject) => {
//             const uploadOptions = {
//                 folder: folder,
//                 public_id: publicId,
//                 resource_type: 'image',
//                 format: 'webp', // Convert to WebP for better compression
//                 quality: 'auto:good',
//                 fetch_format: 'auto',
//                 flags: 'progressive',
//                 overwrite: true,
//                 invalidate: true,
//                 ...options
//             };
//
//             cloudinary.uploader.upload_stream(
//                 uploadOptions,
//                 (error, result) => {
//                     if (error) {
//                         console.error('Cloudinary upload error:', error);
//                         reject(error);
//                     } else {
//                         console.log('Cloudinary upload successful:', result.public_id);
//                         resolve(result);
//                     }
//                 }
//             ).end(buffer);
//         });
//     } catch (error) {
//         console.error('Error in uploadImageToCloudinary:', error);
//         throw error;
//     }
// };
//
// /**
//  * Delete an image from Cloudinary
//  * @param {string} publicId - Public ID of the image to delete
//  * @returns {Promise} Cloudinary deletion result
//  */
// export const deleteImageFromCloudinary = async (publicId) => {
//     try {
//         const result = await cloudinary.uploader.destroy(publicId);
//         console.log('Cloudinary deletion result:', result);
//         return result;
//     } catch (error) {
//         console.error('Error deleting from Cloudinary:', error);
//         throw error;
//     }
// };
//
// /**
//  * Get optimized image URL from Cloudinary
//  * @param {string} publicId - Public ID of the image
//  * @param {Object} transformations - Image transformation options
//  * @returns {string} Optimized image URL
//  */
// export const getOptimizedImageUrl = (publicId, transformations = {}) => {
//     try {
//         const defaultTransformations = {
//             quality: 'auto:good',
//             fetch_format: 'auto',
//             crop: 'fill',
//             gravity: 'auto',
//             ...transformations
//         };
//
//         return cloudinary.url(publicId, defaultTransformations);
//     } catch (error) {
//         console.error('Error generating optimized URL:', error);
//         return null;
//     }
// };
//
// /**
//  * Upload multiple images to Cloudinary
//  * @param {Array} files - Array of file buffers
//  * @param {string} folder - Cloudinary folder path
//  * @param {string} basePublicId - Base public ID (will be appended with index)
//  * @returns {Promise<Array>} Array of upload results
//  */
// export const uploadMultipleImages = async (files, folder, basePublicId) => {
//     try {
//         const uploadPromises = files.map((file, index) => {
//             const publicId = `${basePublicId}_${index}`;
//             return uploadImageToCloudinary(file, folder, publicId);
//         });
//
//         const results = await Promise.all(uploadPromises);
//         console.log(`Successfully uploaded ${results.length} images to Cloudinary`);
//         return results;
//     } catch (error) {
//         console.error('Error uploading multiple images:', error);
//         throw error;
//     }
// };
//
// /**
//  * Extract public ID from Cloudinary URL
//  * @param {string} url - Cloudinary image URL
//  * @returns {string|null} Public ID or null if invalid URL
//  */
// export const extractPublicIdFromUrl = (url) => {
//     try {
//         if (!url || typeof url !== 'string') return null;
//
//         // Match Cloudinary URL pattern and extract public ID
//         const regex = /\/v\d+\/(.+)\.[^.]+$/;
//         const match = url.match(regex);
//
//         if (match && match[1]) {
//             return match[1];
//         }
//
//         return null;
//     } catch (error) {
//         console.error('Error extracting public ID from URL:', error);
//         return null;
//     }
// };
//
// /**
//  * Generate thumbnail URL from original image URL
//  * @param {string} originalUrl - Original Cloudinary image URL
//  * @param {number} width - Thumbnail width
//  * @param {number} height - Thumbnail height
//  * @returns {string|null} Thumbnail URL or null if invalid
//  */
// export const generateThumbnailUrl = (originalUrl, width = 150, height = 150) => {
//     try {
//         const publicId = extractPublicIdFromUrl(originalUrl);
//         if (!publicId) return null;
//
//         return getOptimizedImageUrl(publicId, {
//             width,
//             height,
//             crop: 'fill',
//             gravity: 'auto'
//         });
//     } catch (error) {
//         console.error('Error generating thumbnail URL:', error);
//         return null;
//     }
// };
// lib/utils/cloudinaryUpload.js
import cloudinary from '../config/cloudinary';

/**
 * Upload an image buffer to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} folder - Cloudinary folder path
 * @param {string} publicId - Public ID for the image
 * @param {Object} options - Additional upload options
 * @returns {Promise} Cloudinary upload result
 */
export const uploadImageToCloudinary = async (buffer, folder, publicId, options = {}) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: folder,
                public_id: publicId,
                resource_type: 'image',
                format: 'webp', // Convert to WebP for better compression
                quality: 'auto:good',
                fetch_format: 'auto',
                flags: 'progressive',
                overwrite: true,
                invalidate: true,
                ...options
            };

            cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error('❌ Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('✅ Cloudinary upload successful:', result.public_id);
                        resolve(result);
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        console.error('❌ Error in uploadImageToCloudinary:', error);
        throw error;
    }
};

/**
 * Upload image from file path to Cloudinary
 * @param {string} filePath - Path to the image file
 * @param {string} folder - Cloudinary folder path
 * @param {string} publicId - Public ID for the image
 * @param {Object} options - Additional upload options
 * @returns {Promise} Cloudinary upload result
 */
export const uploadImageFromPath = async (filePath, folder, publicId, options = {}) => {
    try {
        const uploadOptions = {
            folder: folder,
            public_id: publicId,
            resource_type: 'image',
            format: 'webp',
            quality: 'auto:good',
            fetch_format: 'auto',
            flags: 'progressive',
            overwrite: true,
            invalidate: true,
            ...options
        };

        const result = await cloudinary.uploader.upload(filePath, uploadOptions);
        console.log('✅ Cloudinary upload from path successful:', result.public_id);
        return result;
    } catch (error) {
        console.error('❌ Error uploading from path:', error);
        throw error;
    }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise} Cloudinary deletion result
 */
export const deleteImageFromCloudinary = async (publicId) => {
    try {
        console.log('🗑️ Attempting to delete from Cloudinary:', publicId);
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('🗑️ Cloudinary deletion result:', result);

        if (result.result === 'ok') {
            console.log('✅ Successfully deleted from Cloudinary:', publicId);
        } else if (result.result === 'not found') {
            console.log('⚠️ Image not found in Cloudinary:', publicId);
        } else {
            console.log('❌ Unexpected deletion result:', result);
        }

        return result;
    } catch (error) {
        console.error('❌ Error deleting from Cloudinary:', error);
        throw error;
    }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array<string>} publicIds - Array of public IDs to delete
 * @returns {Promise<Array>} Array of deletion results
 */
export const deleteMultipleImages = async (publicIds) => {
    try {
        console.log(`🗑️ Deleting ${publicIds.length} images from Cloudinary`);

        const deletePromises = publicIds.map(publicId =>
            deleteImageFromCloudinary(publicId)
        );

        const results = await Promise.all(deletePromises);

        const successful = results.filter(result => result.result === 'ok').length;
        console.log(`✅ Successfully deleted ${successful}/${publicIds.length} images`);

        return results;
    } catch (error) {
        console.error('❌ Error deleting multiple images:', error);
        throw error;
    }
};

/**
 * Get optimized image URL from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @param {Object} transformations - Image transformation options
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (publicId, transformations = {}) => {
    try {
        const defaultTransformations = {
            quality: 'auto:good',
            fetch_format: 'auto',
            crop: 'fill',
            gravity: 'auto',
            ...transformations
        };

        return cloudinary.url(publicId, defaultTransformations);
    } catch (error) {
        console.error('❌ Error generating optimized URL:', error);
        return null;
    }
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} files - Array of file buffers
 * @param {string} folder - Cloudinary folder path
 * @param {string} basePublicId - Base public ID (will be appended with index)
 * @returns {Promise<Array>} Array of upload results
 */
export const uploadMultipleImages = async (files, folder, basePublicId) => {
    try {
        console.log(`📤 Uploading ${files.length} images to Cloudinary`);

        const uploadPromises = files.map((file, index) => {
            const publicId = `${basePublicId}_${index}`;
            return uploadImageToCloudinary(file, folder, publicId);
        });

        const results = await Promise.all(uploadPromises);
        console.log(`✅ Successfully uploaded ${results.length} images to Cloudinary`);
        return results;
    } catch (error) {
        console.error('❌ Error uploading multiple images:', error);
        throw error;
    }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary image URL
 * @returns {string|null} Public ID or null if invalid URL
 */
export const extractPublicIdFromUrl = (url) => {
    try {
        if (!url || typeof url !== 'string') {
            console.log('⚠️ Invalid URL provided to extractPublicIdFromUrl:', url);
            return null;
        }

        console.log('🔍 Extracting public ID from URL:', url);

        // Handle different Cloudinary URL formats
        const patterns = [
            // Standard format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
            /\/v\d+\/(.+)\.[^.]+$/,
            // Format without version: https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}
            /\/upload\/(.+)\.[^.]+$/,
            // Format with transformations: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/v{version}/{public_id}.{format}
            /\/upload\/[^/]*\/v\d+\/(.+)\.[^.]+$/,
            // Format with transformations but no version: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
            /\/upload\/[^/]*\/([^/]+)\.[^.]+$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                const publicId = match[1];
                console.log('✅ Extracted public ID:', publicId);
                return publicId;
            }
        }

        console.log('❌ Could not extract public ID from URL:', url);
        return null;
    } catch (error) {
        console.error('❌ Error extracting public ID from URL:', error);
        return null;
    }
};

/**
 * Generate thumbnail URL from original image URL
 * @param {string} originalUrl - Original Cloudinary image URL
 * @param {number} width - Thumbnail width
 * @param {number} height - Thumbnail height
 * @returns {string|null} Thumbnail URL or null if invalid
 */
export const generateThumbnailUrl = (originalUrl, width = 150, height = 150) => {
    try {
        const publicId = extractPublicIdFromUrl(originalUrl);
        if (!publicId) return null;

        return getOptimizedImageUrl(publicId, {
            width,
            height,
            crop: 'fill',
            gravity: 'auto'
        });
    } catch (error) {
        console.error('❌ Error generating thumbnail URL:', error);
        return null;
    }
};

/**
 * Validate if URL is a Cloudinary URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if it's a Cloudinary URL
 */
export const isCloudinaryUrl = (url) => {
    try {
        if (!url || typeof url !== 'string') return false;
        return url.includes('cloudinary.com') && url.includes('/image/upload/');
    } catch (error) {
        console.error('❌ Error validating Cloudinary URL:', error);
        return false;
    }
};

/**
 * Get image info from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @returns {Promise} Image information
 */
export const getImageInfo = async (publicId) => {
    try {
        const result = await cloudinary.api.resource(publicId, {
            image_metadata: true,
            colors: true,
            faces: true,
            quality_analysis: true
        });

        console.log('📊 Retrieved image info for:', publicId);
        return result;
    } catch (error) {
        console.error('❌ Error getting image info:', error);
        throw error;
    }
};

/**
 * Search images in Cloudinary
 * @param {string} expression - Search expression
 * @param {Object} options - Search options
 * @returns {Promise} Search results
 */
export const searchImages = async (expression, options = {}) => {
    try {
        const searchOptions = {
            max_results: 100,
            ...options
        };

        const result = await cloudinary.search
            .expression(expression)
            .with_field('context')
            .with_field('tags')
            .max_results(searchOptions.max_results)
            .execute();

        console.log(`🔍 Found ${result.resources.length} images matching: ${expression}`);
        return result;
    } catch (error) {
        console.error('❌ Error searching images:', error);
        throw error;
    }
};

/**
 * Clean up old images from a specific folder
 * @param {string} userId - User ID to clean up images for
 * @param {Array} keepUrls - Array of URLs to keep (don't delete)
 * @param {string} folderPath - Custom folder path (optional)
 * @returns {Promise} Cleanup result
 */
export const cleanupUserImages = async (userId, keepUrls = [], folderPath = null) => {
    try {
        console.log('🧹 Starting cleanup for user images:', userId);

        const folder = folderPath || `users/${userId}`;
        const keepPublicIds = keepUrls
            .map(url => extractPublicIdFromUrl(url))
            .filter(Boolean);

        // Search for all images in the user's folder
        const searchResult = await searchImages(`folder:${folder}`);

        const imagesToDelete = searchResult.resources.filter(resource =>
            !keepPublicIds.includes(resource.public_id)
        );

        if (imagesToDelete.length === 0) {
            console.log('✅ No images to cleanup for user:', userId);
            return { deleted: 0, kept: keepPublicIds.length };
        }

        console.log(`🗑️ Deleting ${imagesToDelete.length} unused images for user:`, userId);

        const deletionResults = await deleteMultipleImages(
            imagesToDelete.map(img => img.public_id)
        );

        const successfulDeletions = deletionResults.filter(
            result => result.result === 'ok'
        ).length;

        console.log(`✅ Cleanup completed for user ${userId}: deleted ${successfulDeletions}/${imagesToDelete.length}, kept ${keepPublicIds.length}`);

        return {
            deleted: successfulDeletions,
            kept: keepPublicIds.length,
            failed: imagesToDelete.length - successfulDeletions,
            deletedIds: deletionResults
                .filter(result => result.result === 'ok')
                .map((result, index) => imagesToDelete[index].public_id)
        };

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
};

/**
 * Clean up old images from testimonials folder specifically
 * @param {string} userId - User ID to clean up images for
 * @param {Array} keepUrls - Array of URLs to keep (don't delete)
 * @returns {Promise} Cleanup result
 */
export const cleanupUserTestimonialImages = async (userId, keepUrls = []) => {
    return cleanupUserImages(userId, keepUrls, `testimonials/${userId}`);
};

/**
 * Generate responsive image URLs for different screen sizes
 * @param {string} publicId - Public ID of the image
 * @param {Object} options - Configuration options
 * @returns {Object} Object with URLs for different screen sizes
 */
export const generateResponsiveUrls = (publicId, options = {}) => {
    try {
        const { quality = 'auto:good', format = 'auto' } = options;

        const baseTransformations = {
            quality,
            fetch_format: format,
            crop: 'fill',
            gravity: 'auto'
        };

        return {
            thumbnail: getOptimizedImageUrl(publicId, { ...baseTransformations, width: 150, height: 150 }),
            small: getOptimizedImageUrl(publicId, { ...baseTransformations, width: 400, height: 300 }),
            medium: getOptimizedImageUrl(publicId, { ...baseTransformations, width: 800, height: 600 }),
            large: getOptimizedImageUrl(publicId, { ...baseTransformations, width: 1200, height: 900 }),
            original: getOptimizedImageUrl(publicId, baseTransformations)
        };
    } catch (error) {
        console.error('❌ Error generating responsive URLs:', error);
        return null;
    }
};

/**
 * Upload image with automatic optimization
 * @param {Buffer|string} source - Image buffer or file path
 * @param {string} folder - Cloudinary folder path
 * @param {string} publicId - Public ID for the image
 * @param {Object} options - Additional options
 * @returns {Promise} Upload result with optimized URLs
 */
export const uploadOptimizedImage = async (source, folder, publicId, options = {}) => {
    try {
        const uploadOptions = {
            transformation: [
                { quality: 'auto:good' },
                { fetch_format: 'auto' },
                { flags: 'progressive' }
            ],
            ...options
        };

        let result;
        if (Buffer.isBuffer(source)) {
            result = await uploadImageToCloudinary(source, folder, publicId, uploadOptions);
        } else {
            result = await uploadImageFromPath(source, folder, publicId, uploadOptions);
        }

        // Generate responsive URLs
        const responsiveUrls = generateResponsiveUrls(result.public_id);

        return {
            ...result,
            responsive_urls: responsiveUrls
        };
    } catch (error) {
        console.error('❌ Error uploading optimized image:', error);
        throw error;
    }
};