// app/Components/Blogs.jsx
import React from "react";
import Card from "./Card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Blogs = ({ blogs = [], catSlug }) => {
// ✅ filter if category slug exists

  const filteredBlogs = catSlug
    ? blogs.filter((blog) => blog.catSlug === catSlug)
    : blogs;

  return (
    <div>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => <Card key={blog.id} {...blog} />)
      ) : (
        <p>No blogs available in this category</p>
      )}
      
    </div>
  );
};

export default Blogs;
