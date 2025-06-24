import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Configure Cloudinary (do this once at the top-level of your app)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const Upload = async (req, res) => {
    try {
        // Ensure file URLs are provided in the request body
        const { fileUrl1, fileUrl2 } = req.body;

        if (!fileUrl1 || !fileUrl2) {
            return res.status(400).json({ message: 'Both file URLs are required' });
        }

        // Upload the first image to Cloudinary
        const uploadResult1 = await cloudinary.uploader.upload(fileUrl1, {
            folder: 'websiteUploads',
            resource_type: 'auto',
        });

        // Upload the second image to Cloudinary
        const uploadResult2 = await cloudinary.uploader.upload(fileUrl2, {
            folder: 'websiteUploads',
            resource_type: 'auto',
        });

        // Return the results of both uploads
        res.status(200).json({
            message: 'Files uploaded successfully',
            result1: uploadResult1,
            result2: uploadResult2,
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error in upload controller', error: error.message });
    }
};
