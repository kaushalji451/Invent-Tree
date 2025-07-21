import cloudinary from "../../../../lib/cloudinary"

(async function () {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
        folder: 'demo',
      }
    );

    console.log('✅ Upload successful:', uploadResult.secure_url);

    const optimizedUrl = cloudinary.url('demo/shoes', {
      fetch_format: 'auto',
      quality: 'auto',
    });

    console.log('🌐 Optimized URL:', optimizedUrl);

    const croppedUrl = cloudinary.url('demo/shoes', {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    console.log('🖼 Cropped URL:', croppedUrl);
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
})();
