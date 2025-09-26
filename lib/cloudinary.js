
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(`
     Cloud Name : ${cloud_name}
     API Key : ${api_key}
     API Secret : ${api_secret}`);

export default cloudinary;

