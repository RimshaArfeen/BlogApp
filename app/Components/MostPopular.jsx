
"use client"
// Menu.jsx (Client Component)
import React from 'react'
import "../globals.css";
import { useBlogs } from '../context/BlogsContext';
import Link from 'next/link';
import { truncateText, formatDate } from '../utils';

const MostPopular = ({ blogs }) => {
     const ctxBlogs = useBlogs(); // fallback
     const finalBlogs = blogs || ctxBlogs;
     const popularBlogs = finalBlogs.sort((a, b) => b.views - a.views).slice(0, 2);

     return (
   <section className="sub p-4 w-full transition-colors duration-300">
  <h6 className="text-xl w-fit md:text-lg font-bold mb-6 sm:mb-4 border-b-2 border-blue-600 pb-2">
    Most Popular
  </h6>

  {popularBlogs.map((item, idx) => (
    <div
      key={idx}
      className="flex flex-col py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
    >
      <div className="flex flex-col gap-2">
        {/* Category + Date */}
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="px-3 py-1  btn-primary text-white rounded-full text-xs font-medium">
            {item.catSlug}
          </span>
          <span className="text-xs md:text-sm  dark:">
            {formatDate(item.createdAt)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/allBlogs/${item.slug}`}>
          <h3 className="text-lg md:text-base font-semibold hover:cursor-pointer hover:underline hover:underline-offset-4 transition-colors duration-200 leading-snug">
            {item.title}
          </h3>
        </Link>

        {/* Author */}
        <h6 className="text-sm  dark:">
          Author: {item.user.name}
        </h6>

        {/* Description */}
        <p className="text-sm  dark: leading-relaxed mt-1">
          {truncateText(item.desc, 100)}
        </p>
      </div>
    </div>
  ))}
</section>



     )
}

export default MostPopular
