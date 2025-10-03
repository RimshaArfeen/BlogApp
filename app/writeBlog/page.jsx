

// app/writeBlog/page.jsx
"use client";

import React, { useState } from "react";
import "../globals.css";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import TextEditor from "../Components/TextEditor";
import { FaFileAlt, FaMapMarkerAlt, FaRegImage } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // if (!session) {
  //   return ;
  // }

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = data.img || null; // 👈 use the input URL if provided

      // If file exists, override with Cloudinary upload
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const cloudinaryData = await cloudinaryRes.json();
        imageUrl = cloudinaryData.secure_url;
      }

      const response = await fetch("/api/allBlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          desc: content, // Tiptap HTML
          img: imageUrl, // 👈 matches API
          slug: data.title, // 👈 sent as slug
          catSlug: data.category,
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
      icon: <FaFileAlt className="w-4 h-4" />,
    },
    {
      label: "Embed map",
      type: "map",
      icon: <FaMapMarkerAlt className="w-4 h-4" />
    },
    {
      label: "Upload image",
      type: "image",
      accept: "image/*",
      icon: <FaRegImage className="w-4 h-4" />,
    },
  ];

  return (
    (!session || !session.user) ?
      (
        <div className="flex h-screen w-full items-center justify-center ">
          <div className="sub  border text-center p-8  shadow rounded-2xl max-w-sm w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Not Authenticated
            </h1>
            <p className="text-gray-600 mb-6">
              You must be logged in to access this page.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="btn-primary px-6 py-3 font-semibold rounded-lg shadow-md   transition hover:cursor-pointer"
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-12 py-16 md:py-24 min-h-screen space-y-12">
          {/* Tagline & Subtext */}
          <header className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">✨ Share Your Thoughts</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your reflections matter! Write freely, express your ideas, and let your voice be heard in the EchoJournal community.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Blog Card */}
            <div className="w-full rounded-xl shadow-lg border overflow-hidden">
              <div className="p-6 sm:p-10 flex flex-col gap-6">

                {/* Title */}
                <input
                  {...register("title", { required: true })}
                  placeholder="Enter your blog post title"
                  className="block w-full text-3xl font-semibold placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
                />
                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                {/* Image URL + Toolbar */}
                <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
                  <input
                    {...register("img")}
                    placeholder="Image URL (optional)"
                    className="block w-full sm:flex-1 text-sm placeholder-gray-400 dark:placeholder-gray-500 border-b sm:border-0 pb-2 sm:pb-0 bg-transparent focus:outline-none"
                  />

                  <div className="flex items-center gap-3 text-xl rounded-md px-3 py-2">
                    {toolbarButtons.map((button, index) =>
                      button.type === "map" ? (
                        <button
                          key={index}
                          type="button"
                          onClick={() => alert("Open map embed modal here!")}
                          className="p-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                        >
                          {button.icon}
                        </button>
                      ) : (
                        <div key={index} className="p-2 hover:bg-blue-600 transition-all duration-200 rounded-md">
                          <input
                            type="file"
                            id={`input-${index}`}
                            accept={button.accept}
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <label htmlFor={`input-${index}`} className="cursor-pointer flex items-center gap-2 hover:bg-blue-600 transition-all duration-200 rounded-md">
                            {button.icon}
                            {file && <span className="text-xs truncate max-w-[100px]">{file.name}</span>}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Category Selector */}
                <select
                  {...register("category", { required: true })}
                  className="block w-full text-sm py-2 px-3 rounded-md border bg-transparent focus:outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Travel">Travel</option>
                  <option value="Health">Health</option>
                  <option value="Career Growth">Career Growth</option>
                </select>

                {/* Blog Content */}
                <TextEditor value={content} onChange={setContent} />
                {errors.desc && <p className="text-red-500 text-sm">Description is required</p>}
              </div>
            </div>

            {/* Publish Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-64 px-6 py-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>

      )





  );
}


