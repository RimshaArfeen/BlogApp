
// app/writeBlog/page.jsx
"use client";

import React, { useState } from "react";
import "../globals.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!session) {
    return <p>Not Authenticated</p>;
  }

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = null;

      // 1️⃣ Upload to Cloudinary if file exists
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // 🔑 set in Cloudinary
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryRes.json();
        imageUrl = cloudinaryData.secure_url;
      }

      // 2️⃣ Send blog data with imageUrl to your API
      const response = await fetch("/api/allBlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          desc: data.desc,
          blogSlug: data.title.toLowerCase().replace(/:\s+/g, "-"),
          catSlug: data.category,
          imgUrl: imageUrl, // saved from Cloudinary
        }),
      });

      if (response.ok) {
        alert("✅ Blog submitted successfully!");
      } else {
        const err = await response.json();
        alert("❌ Error: " + err.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed! Check console.");
    } finally {
      setLoading(false);
    }
  };

 const toolbarButtons = [
  {
    label: "Attach file",
    type: "file",
    accept: "*/*",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Paperclip (attach) */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828a4 4 0 10-5.656-5.656L6.343 10.172a6 6 0 108.485 8.485L20 13"
        />
      </svg>
    ),
  },
  {
    label: "Embed map",
    type: "map",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Map pin */}
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
  },
  {
    label: "Upload image",
    type: "image",
    accept: "image/*",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Image/photo */}
        <path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11 7H4l4-5 3 4 5-6 3.5 4.5V18z" />
      </svg>
    ),
  },
];

  return (
    <div className="container mx-auto px-4 space-y-5 py-16 md:py-24 min-h-screen">
      <h1 className="text-3xl font-bold">Write a Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full rounded-lg shadow-md overflow-hidden">
          {/* Toolbar */}
          <div className="w-full flex items-center px-3 py-2 border-b hover:cursor-pointer transition-all duration-200">
            {toolbarButtons.map((button, index) => (
              button.type === "map" ? (
                <button
                  key={index}
                  type="button"
                  onClick={() => alert("Open map embed modal here!")}
                  className="p-2 text-gray-500 rounded-sm hover:bg-gray-200"
                >
                  {button.icon}
                </button>
              ) : (
                <div key={index} className="p-2 text-gray-500 hover:bg-gray-200 rounded-sm">
                  <input
                    type="file"
                    id={`input-${index}`}
                    accept={button.accept}
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor={`input-${index}`}>
                    {button.icon}
                    {file && <span className="ml-2 text-sm">{file.name}</span>}
                  </label>
                </div>
              )
            ))}
          </div>

          <div className="p-5 sm:p-10 flex flex-col gap-y-4">
            {/* Title */}
            <input
              {...register("title", { required: true })}
              className="block w-full text-2xl font-bold focus:outline-none bg-transparent mb-1"
              placeholder="Enter your blog post title"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

            {/* Category */}
            <select
              {...register("category", { required: true })}
              className="mt-1 block  border rounded-md py-2 px-3 sub text-sm w-fit"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
            </select>

            {/* Content */}
            <textarea
              {...register("desc", { required: true })}
              className="block w-full h-60 focus:outline-none bg-transparent resize-none"
              placeholder="Write your blog content here..."
            ></textarea>
            {errors.desc && <p className="text-red-500 text-sm">Description is required</p>}
          </div>
        </div>

        {/* Submit */}
        <div className=" w-full flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary hover:cursor-pointer w-full sm:w-64 px-6 py-3 rounded-lg shadow-lg "
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>

        </div>
      </form>
    </div>
  );
}
