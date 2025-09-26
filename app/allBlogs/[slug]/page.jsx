

// app/allBlogs/[slug]/page.js

import Comments from "../../Components/Comments";
import "../../globals.css";
import { formatDate } from "@/app/utils";
import MostPopular from "../../Components/MostPopular";


const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/allBlogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};


export default async function FullBlogPostPage({ params }) {
  const { slug } = await params
  const data = await getData(slug)


  return (
    <section className=" px-3 md:px-10 py-24">
      <div className=" w-full lg:w-[90%] mx-auto grid md:grid-cols-3 gap-12">
        <main className=" lg:pr-5 flex flex-col justify-center items-start gap-6 md:col-span-2">
          <article className="md:col-span-2">
            {data.img && (
              <div className="mb-8 overflow-hidden shadow-md">
                <img src={data.img} alt={data.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">{data.title}</h1>
            <div className="flex flex-col md:flex-row border-t items-start md:items-center gap-4 py-4 mb-10 ">
              {/* User Image */}
              <div className="flex-shrink-0">
                <img
                  src={data.user.image}
                  alt={data.user.name}
                  className="w-16 h-16 rounded-full object-cover border border-primary"
                />
              </div>

              {/* User and Blog Info */}
              <div className="flex-grow">
                {/* Author Name */}
                <p className="text-xl font-bold ">
                  {data.user.name}
                </p>
                {/* Publication Date */}

                <p className="text-sm text-gray-500 mt-1">
                  Published on {formatDate(data.createdAt)}
                </p>


              </div>

              {/* Category Tag */}
              <div className="flex-shrink-0 mt-2 md:mt-0">
                <div className="px-3 py-1 text-white  text-sm font-semibold rounded-full bg-blue-600 transition-colors duration-200 cursor-pointer">
                  {data.cat.title}
                </div>
              </div>
            </div>
            <div className="prose prose-lg text-lg dark:prose-invert max-w-none text-justify">
              <p>{data.desc}</p>

            </div>
           
          </article>
          <Comments blogSlug={data.slug} />
        </main>
        <aside className='sub lg:py-12 md:sticky md:top-16 h-fit lg:p-6 border-l mb-10'>
          <MostPopular />
        </aside>
      </div> </section>
  );
}