
"use client";
// components/Featured.js
import React from 'react';
import "../globals.css";
import { useBlogs } from '../context/BlogsContext';
import { formatDate, truncateText } from '../utils';
import Link from 'next/link';
const Featured = () => {
  const blogs = useBlogs(); // ✅ No extra fetch
  const featuredBlogs = blogs.slice(-1); // Get the last blog as featured
  
  return (
    <section className="  py-12 lg:py-24">
      {featuredBlogs.map((blog, idx) => (
        <div key={idx}
      className="relative z-10 max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Hey! Rimsha Arfeen Here
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-10">
            Discover Stories and Articles
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="md:w-1/2 w-full">
          <img className="rounded object-cover w-full h-[300px]" src={blog.img} alt={blog.title} />
          </div>
          <div className="md:w-1/2 w-full max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium mb-4">
               {blog.title}
            </h3>
            <p className="leading-relaxed mb-6 text-justify p-1">
                {truncateText(blog.desc, 300)}
            </p>
            <Link href={`/allBlogs/${blog.slug}`} 
            className="btn btn-primary text-lg">Read More</Link>

          </div>
        </div>
      </div>
      
    ))}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b z-0"></div>
    </section>
  );
}
export default Featured;
