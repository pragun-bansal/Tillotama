// lib/utils/fileUpload.js
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

export const uploadMiddleware = upload.array('all_images');
export const uploadSingle = upload.single('profilePic');

export function runMulterMiddleware(req, res, middleware) {
    return new Promise((resolve, reject) => {
        middleware(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
