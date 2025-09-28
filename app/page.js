// app/page.js
import "./globals.css";
import Featured from "./Components/Featured";
import Categories from "./Components/Categories";
import { LatestBlogs } from "./Components/LatestBlogs";
import MostPopular from "./Components/MostPopular";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gap-y-3 justify-around py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto z-10">
          {/* <Link
            href="#"
            className="inline-flex items-center gap-3 py-2 px-5 mb-8 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5">
              New
            </span>
            <span className="text-sm font-medium">
              EchoJournal has launched! See what's new
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link> */}
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your Voice, Our Echo
          </h1>
          <p className="mb-12 text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to EchoJournal, a space where reflections, opinions, and
            stories come together to shape a stronger community.
          </p>
        </div>
       
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-10 lg:px-20 xl:px-32 py-16 space-y-20">
        <Featured />
        <Categories />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Latest Blogs */}
          <div className="w-full lg:w-[68%]">
            <LatestBlogs />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[30%] md:sticky md:top-20 h-fit p-6 rounded-lg shadow-md border">
            <MostPopular />
          </aside>
        </div>
      </main>
    </>
  );
}

