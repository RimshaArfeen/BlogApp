// app/page.js
import "./globals.css";
import Featured from "./Components/Featured";
import Categories from "./Components/Categories";
import { LatestBlogs } from "./Components/LatestBlogs";
import MostPopular from "./Components/MostPopular";
import Link from "next/link";

console.log(process.env.NEXTAUTH_URL)
export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
     <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between py-20 px-6">
  {/* Left Content */}
  <div className="w-full text-center space-y-8">
    <h1 className="gradient-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold">
      Your Voice, Our Echo
    </h1>
    <p className=" lg:px-20 text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
      Welcome to EchoJournal, a space where reflections, opinions, and stories come together to shape a stronger community.
    </p>
    <div className=" w-full flex justify-center gap-4 text-white">
      <Link href="/allBlogs" className="px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-600  rounded-full hover:opacity-90 hover:cursor-pointer transition  hover:text-sm">
        Explore Blogs
      </Link>
      <Link href="/writeBlog" className="px-6 py-3 rounded-full hover:opacity-80 border border-blue-500  transition-all duration-300  hover:text-sm">
        Write Your Story
      </Link>
    </div>
  </div>

  {/* Right Illustration / Image */}

<div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-30 blur-3xl  animate-pulse"></div>

</section>


      {/* Main Content */}
      <main className="px-4 sm:px-10 xl:px-32 py-16 space-y-20">
        <Featured />
        <Categories />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Latest Blogs */}
          <div className="w-full lg:w-[68%]">
            <LatestBlogs />
          </div>

          {/* Sidebar */}
          <aside className="sub w-full lg:w-[30%] py-12 md:sticky md:top-16 h-fit p-6  shadow-lg border-l mb-10">
            <MostPopular />
          </aside>
        </div>
      </main>
    </>
  );
}

