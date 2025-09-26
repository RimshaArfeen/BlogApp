// app/layout.js
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AuthProvider from "../providers/AuthProvider";
import { BlogsProvider } from "./context/BlogsContext";
import LoadingProvider from "./Components/LoadingProvider";

export const metadata = {
  title: "Next.js Tailwind Theme Example",
  description: "Demo using custom globals.css with light/dark theme support",
};

// Function to fetch blogs (once in layout)
const getBlogs = async (catSlug) => {
  const url = catSlug
    ? `http://localhost:3000/api/allBlogs?cat=${catSlug}`
    : `http://localhost:3000/api/allBlogs`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export default async function RootLayout({ children }) {
  const blogs = await getBlogs();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <BlogsProvider blogs={blogs}>
              <LoadingProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </LoadingProvider>
            </BlogsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
