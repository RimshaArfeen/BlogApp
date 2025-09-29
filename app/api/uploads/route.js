
//api/uploads/route.js
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function POST(req) {

     try {
          const data = await req.formData();
          const file = data.get("file"); // expects file input

          // Convert Blob → Buffer
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          // Upload to Cloudinary
          const uploadResponse = await new Promise((resolve, reject) => {
               cloudinary.uploader
                    .upload_stream({ folder: "blogs" }, (error, result) => {
                         if (error) reject(error);
                         else resolve(result);
                    })
                    .end(buffer);
          });

          return NextResponse.json({ url: uploadResponse.secure_url });


     } catch (error) {
          console.error("❌ Uploading Image error:", error); // 👈 add this
          return NextResponse.json({ error: error.message }, { status: 500 });
     }

}
