
"use client"

//Card.jsx
import React from 'react'
import "../globals.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate, truncateText, slugify } from '../utils';
import { User } from 'lucide-react';
import Image from 'next/image';

const Card = ({ _id, slug, title, desc, img, views, user, catSlug, userEmail, createdAt }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full text-center sm:text-left sm:flex justify-between items-center p-2 mb-6 ">
      {/* Blog Image */}
{img && (
 <div className="relative w-full sm:w-1/2 h-64 overflow-hidden">
  <Image
    src={img}
    alt={title}
    fill
    className="object-cover scale-100 hover:scale-105 transition-transform duration-500 ease-in-out shadow-md"
  />
</div>


)}

      <div className={`${img ? "w-full sm:w-1/2": "w-full" } py-6 sm:p-6 `}>
        {/* Category + Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
            {catSlug}
          </span>
          {mounted && (

            <span>{formatDate(createdAt)}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <Link href={`/authors/${slugify(user.name)}`} className=" w-full text-sm  mb-3 flex items-center justify-center sm:justify-start opacity-70 hover:cursor-pointer">
          <User size={20} className="mr-2 p-1 rounded-full border " /> {user.name}
        </Link>
{/* Description */}
        <p
          dangerouslySetInnerHTML={{ __html: truncateText(desc, 150) }}
          className="prose prose-invert text-gray-600 dark:text-gray-300 leading-relaxed mb-3 text-justify"
        />

        {/* Read More Button */}
        <Link
          href={`/allBlogs/${slug}`}
          className="hover:cursor-pointer mt-3 btn-primary p-2 transition-all duration-300 text-sm  ">
          Read More →
        </Link>
      </div>
    </div>

  )
}

export default Card
