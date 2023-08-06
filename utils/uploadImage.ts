const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

export const uploadImageToCloudinary = async (image: any) => {
  const uploaded = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: 'unsigned_uploads',
      allowed_formats: ['png', 'svg', 'jpg', 'webp', 'jpeg', 'ico', 'jfif']
    },
    function (error: any, result: any) {
      if (error) {
        console.log(error)
      }
      return result
    }
  )
  return uploaded
}
