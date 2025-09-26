

// app/page.js
import "./globals.css";
import Featured from "./Components/Featured";
import Categories from "./Components/Categories";
import {LatestBlogs} from "./Components/LatestBlogs";
import MostPopular from "./Components/MostPopular";



// app/page.js
export default async function HomePage() {
  return (
   <main className=" px-1 sm:px-10 lg:px-24 xl:px-32 ">
     <Featured />
     <Categories />
     <div className="flex flex-col lg:flex-row justify-center items-start  md:py-24 gap-6">
      <div className=" w-full lg:w-[68%]" >

     <LatestBlogs />

        </div>
          <aside className="sub w-full lg:w-[30%] py-12 md:sticky md:top-16 h-fit p-6  shadow-lg border-l mb-20 lg:mb-10">
        <MostPopular />
        </aside>
     </div>
   </main>
  );
}

