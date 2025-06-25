// lib/utils/cloudinaryUpload.js
import cloudinary from '../config/cloudinary';

export const uploadImageToCloudinary = (fileBuffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                public_id: publicId,
                folder,
                overwrite: true,
                use_filename: true
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};