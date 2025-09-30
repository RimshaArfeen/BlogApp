"use client";
// components/Featured.js
import React from 'react';
import "../globals.css";
import { useBlogs } from '../context/BlogsContext';
import { formatDate, truncateText } from '../utils';
import Link from 'next/link';
import Image from 'next/image';

const Featured = () => {
  const blogs = useBlogs(); // ✅ No extra fetch
  const featuredBlogs = blogs.slice(-1); // Get the last blog as featured

  return (
    <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {featuredBlogs.map((blog, idx) => (
        <div key={idx} className="space-y-10">
          {/* Page Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              Featured Reflection ✨
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium">
              Discover community stories and thoughtful articles
            </h2>
          </div>

          {/* Featured Blog Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Blog Image */}
            <div className="md:w-1/2 w-full">
              <Image
                width={600} height={400}
                style={{ height: "auto", width: "auto" }}
                className="rounded-xl object-cover w-full h-[320px] shadow-md"
                src={blog.img}
                alt={blog.title}
              />
            </div>

            {/* Blog Details */}
            <div className="md:w-1/2 w-full max-w-2xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                {blog.title}
              </h3>
              <p className="leading-relaxed mb-6 text-justify text-gray-700 dark:text-gray-300 px-1">
                {truncateText(blog.desc, 300)}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published on {formatDate(blog.createdAt)}
                </p>
                <Link
                  href={`/allBlogs/${blog.slug}`}
                  className="inline-block px-6 py-3  btn-primary text-white rounded-lg shadow-md   transition-colors duration-200 text-lg font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

    
    </section>
  );
};

export default Featured;
