// app/layout.js
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AuthProvider from "../providers/AuthProvider";
import { BlogsProvider } from "./context/BlogsContext";
import LoadingProvider from "./Components/LoadingProvider";
import { Poppins, Allura } from "next/font/google";

const poppins = Poppins({
  weight: ["300","400", "500","600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// For body/headings (readable, elegant)
const allura = Allura({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-allura",
});


export const metadata = {
  title: "EchoJournal",
  description: "Community reflections and opinions",
};


// Function to fetch blogs (once in layout)
const getBlogs = async (catSlug) => {
  const url = catSlug
    ? `http://localhost:3000/api/allBlogs?cat=${catSlug}`
    : `http://localhost:3000/api/allBlogs`;

  const res = await fetch(url , { cache: 'no-store' }); // Disable caching for dynamic content
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export default async function RootLayout({ children }) {
  const blogs = await getBlogs();

  return (
    <html lang="en" suppressHydrationWarning  className={`${poppins.variable} ${allura.variable}`}>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <BlogsProvider blogs={blogs}>
              <LoadingProvider>
                <Navbar />
                <main>{children}
                   {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-800/60 to-transparent dark:from-gray-900/80 z-0"></div> */}
                </main>
                <Footer />
              </LoadingProvider>
            </BlogsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
