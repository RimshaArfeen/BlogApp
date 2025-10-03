"use client";
import React, { useState } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/allBlogs?cat=${query}`);
  };

  return (
    <form
      className="max-w-lg mx-auto mb-16 rounded"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <select
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="category-search"
          className="block w-full p-4 ps-10 text-sm sub border focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Search by categories</option>
          <option value="Technology">Technology</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Career Growth">Career Growth</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Fashion">Fashion</option>
        </select>

        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 btn-primary"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
