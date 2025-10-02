// app/layout.js
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AuthProvider from "../providers/AuthProvider";
import { BlogsProvider } from "./context/BlogsContext";
import LoadingProvider from "./Components/LoadingProvider";
import { Poppins, Allura } from "next/font/google";
import Logo from '../public/BlogLogo.png';
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
  title: "EchoJournal | Discover Ideas, Stories & Insights",
  description: "Welcome to Blog App — your hub for fresh ideas, inspiring stories, and expert insights. Explore trending topics, connect with authors, and start your reading journey today.",
  images: [
      {
        url: '../public/BlogLogo.png',
        width: 1200,
        height: 630,
        alt: 'EchoJournal',
      },
    ]
    
};


// Function to fetch blogs (once in layout)
const getBlogs = async (catSlug) => {
  const url = catSlug
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/allBlogs?cat=${catSlug}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/allBlogs`;

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
