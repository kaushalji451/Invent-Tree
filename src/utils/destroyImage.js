import cloudinary from "../lib/cloudinary";


// Function to delete image from Cloudinary by its URL
const deleteImage = async (imageUrl) => {
    // Extract the public_id from the Cloudinary URL
    const getPublicId = (url) => {
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.(jpg|png|jpeg|webp|gif)/);
      return match ? match[1] : null;
    };
  
    const publicId = getPublicId(imageUrl);
  
    if (publicId) {
      try {
        // Deleting the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        console.error("Successfully  delete image from Cloudinary." );
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    } else {
      console.log("No public_id found in the URL, skipping delete.");
    }
  };

  export default deleteImage;