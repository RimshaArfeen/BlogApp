
import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth';
import { formatDate, truncateText, slugify } from '@/app/utils';
import Image from 'next/image';


const getAuthors = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${slug}`,
    { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch authors");
  }
  try {
    const data = await res.json();
    console.log("Fetched author data:", data);
    
    const author = slugify(data.name || data.email) === slug ? data : null;

    if (!author) throw new Error("Author not found");
    return author;

  } catch (error) {
    console.log("Error parsing JSON:", error);
    throw error;

  }
}


const page = async ({ params }) => {
  const author = await params;
  const data = await getAuthors(author.slug);

  // if (!data.user) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen px-3 md:px-10 py-16">
  //       <h1 className="text-4xl font-bold">Author Not Found</h1>
  //     </div>
  //   );
  // }

  return (

    <section className="px-3 md:px-10 py-16 min-h-screen">
      <div className="w-full lg:w-[70%] mx-auto">
        {/* Author Profile Header */}
        <div className="flex flex-col items-center text-center mb-16">
          {data.image && (
            <>
              <Image
                src={data.image}
                alt={data.name || "User"}
                width={64}  // required
                height={64} // required
                className="w-16 h-16 rounded-full object-cover border border-primary"
              />
            </>
          )}




          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 capitalize">{data.name}</h1>
          {/* <a href={`mailto:${data.email}`} className="text-sm  dark: mb-6 hover:underline">{data.email}</a> */}
          <p className="max-w-prose  dark: italic px-4 md:px-0">Hi, I'm {data.name}! a passionate writer and want to share my thoughts with the world.</p>
        </div>

        {/* Horizontal divider */}
        <hr className="w-full border-gray-300 dark:border-gray-700 mb-12" />

        {/* Posts by Author Section */}
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">
          Posts by {data.name}
        </h2>
        <div className="flex justify-between items-start mb-8 w-full">
          {data.blogs.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full max-w-6xl">
              {data.blogs.map((blog, idx) => (
                <Link
                  href={`/allBlogs/${blog.slug}`}
                  key={idx}
                  className="sub break-inside-avoid block rounded-lg shadow-md overflow-hidden mb-6 "
                >
                  {blog.img && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        fill
                        style={{ objectFit: "cover" }}

                        alt={blog.title}
                        className="object-cover object-center w-full h-full transition-transform transform  hover:scale-110 duration-500"
                        src={blog.img}

                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-1">
                      {blog.catSlug}
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


