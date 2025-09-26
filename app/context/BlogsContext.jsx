// app/context/BlogsContext.jsx
"use client";
import { createContext, useContext } from "react";

const BlogsContext = createContext();

export function BlogsProvider({ blogs, children }) {
  return (
    <BlogsContext.Provider value={blogs}>{children}</BlogsContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogsContext);
}
