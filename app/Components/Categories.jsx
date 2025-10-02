
import React from 'react'
import "../globals.css";


const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  } else {
    return res.json();
  }
}

const Categories = async () => {
  const data = await getCategories();
  return (
    <section className=" py-12 md:py-24 flex flex-col md:flex-row justify-center items-center gap-6 mx-auto">

      <h4 className="gradient-heading  text-3xl font-semibold w-full md:w-[24%]">Popular Categories</h4>

      <div className=" w-full md:w-3/4 flex flex-wrap justify-center gap-2 ">
        <div className="w-full flex flex-wrap justify-center lg:justify-end items-center gap-2">
          {data.map((cat, idx) => (
            <a
              href={`/allBlogs?cat=${cat.slug}`}
              key={idx}
              className={`${["bg-blue-100", "bg-green-100", "bg-yellow-100"][idx % 3]
                } ${["text-blue-700", "text-green-700", "text-yellow-700"][idx % 3]
                } text-sm font-medium me-2 px-3.5 py-2 rounded-sm hover:cursor-pointer transition-all hover:underline duration-300`}
            >
              {cat.title}
            </a>
          ))}
        </div>


      </div>
    </section>
  )
}

export default Categories
