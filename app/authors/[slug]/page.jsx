import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth';
import { formatDate, truncateText } from '@/app/utils';
import Image from 'next/image';

const getAuthors = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error parsing JSON:", error);
    throw error;

  }
}

const page = async ({ params }) => {
  const author = await getAuthors(params.slug);
  if (!author) {
    return (
      <div className="flex justify-center items-center min-h-screen px-3 md:px-10 py-16">
        <h1 className="text-4xl font-bold">Author Not Found</h1>
      </div>
    );
  }

  return (
    <section className="px-3 md:px-10 py-16 min-h-screen">
      <div className="w-full lg:w-[70%] mx-auto">
        {/* Author Profile Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src={author.image}
            alt={author.name}
            width={128} height={128}
            style={{ width: 'auto', height: 'auto' }}
            className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-indigo-500 shadow-md"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">{author.name}</h1>
          <a href={`mailto:${author.email}`} className="text-sm  dark: mb-6 hover:underline">{author.email}</a>
          <p className="max-w-prose  dark: italic px-4 md:px-0">Hi, I'm {author.name}! a passionate writer and want to share my thoughts with the world.</p>
        </div>

        {/* Horizontal divider */}
        <hr className="w-full border-gray-300 dark:border-gray-700 mb-12" />

        {/* Posts by Author Section */}
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">
          Posts by Rimsha Arfeen
        </h2>
     <div className="flex justify-center items-start mb-8 w-full">
  {author.blogs.length > 0 ? (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full max-w-6xl px-4">
      {author.blogs.map((blog, idx) => (
        <Link
          href={`/allBlogs/${blog.slug}`}
          key={idx}
          className="sub break-inside-avoid block rounded-lg shadow-md overflow-hidden mb-6 "
        >
          {blog.img && (
            <div className="relative h-56 w-full overflow-hidden">
              <Image
              
                alt={blog.title}
                className="object-cover object-center w-full h-full transition-transform transform hover:rotate-2 hover:scale-105 duration-500"
                src={blog.img}
                width={600}
                height={400}
                style={{ height: "auto", width: "auto" }}
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-1">
              {blog.cat}
            </h3>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {blog.title}
            </h2>
            {/* <p className="text-sm text-gray-600 dark:text-gray-300">
              {truncateText(blog.desc, 100)}
            </p> */}
            <p className="mt-3 text-xs text-gray-400">
              Published: {formatDate(blog.createdAt)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-center dark:text-gray-400">
      <p>This author has not published any posts yet.</p>
    </div>
  )}
</div>


      </div>
    </section>
  )
}

export default page


