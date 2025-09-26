
"use client"
// CardList.jsx (Server Component)
import React from "react";
import Card from "./Card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBlogs } from '../context/BlogsContext';



export function LatestBlogs() {
    const blogs = useBlogs(); // ✅ No extra fetch

  blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3);

  
  return (
    <div className="pb-24">
      <h1 className="text-3xl font-bold">Our Latest Blogs</h1>
      <hr className="my-4 border-gray-300 w-1/2" />
      {blogs.length > 0 ? (
        blogs.slice(0, 3).map((blog) => <Card key={blog.id} {...blog} />)
      ) : (
        <p>No blogs available</p>
      )}
      <Link
        className="flex items-center justify-end gap-1 text-blue-600 hover:underline text-xl"
        href="/allBlogs"
      >
        See all blogs <ArrowRight size={16} />
      </Link>
    </div>
  );
}


