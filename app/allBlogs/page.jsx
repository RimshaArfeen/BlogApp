
//allBlogs/page.js
"use client"

import React from 'react'
 
import SearchInput from "@/app/Components/SearchInput";
import { useSearchParams } from 'next/navigation';
import "../globals.css";
import Blogs from '../Components/Blogs';
import { useBlogs } from '../context/BlogsContext';
import MostPopular from '../Components/MostPopular';

const page = () => {
  const blogs = useBlogs(); // ✅ No extra fetch
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <section className=' min-h-screen px-4 sm:px-10  py-16 pb-24'>
      {/* <h1 className=' text-3xl font-bold text-center '>This is All Blogs Page (Under Construction)
     </h1> */}
      <SearchInput />
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 my-8">
        <div className=" w-full lg:w-[74%]" >

          <Blogs blogs={blogs} catSlug={cat} />

        </div>
          <aside className="sub w-full lg:w-[30%] py-12 md:sticky md:top-16 h-fit p-6  shadow-lg border-l mb-10">
          <MostPopular />  
        </aside>
      </div>
    </section>
  )
}

export default page


