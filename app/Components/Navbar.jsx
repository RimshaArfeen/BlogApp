"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Github, Linkedin, Twitter, User, Phone } from "lucide-react";
import "../globals.css";
import { useSession } from "next-auth/react";
import logo from "../../public/BlogLogo.png";
import Darklogo from "../../public/DarkLogo.png";
import Image from "next/image";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scroll, setScroll] = useState(0);

  // Ensure mounted for hydration
  useEffect(() => setMounted(true), []);

  // Update login state when session changes
  useEffect(() => {
    setIsLogin(status === "authenticated");
  }, [status]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don’t render until mounted (avoids hydration mismatch)
  if (!mounted) return null;

  const links = [
    { title: "Home", href: "/" },
    { title: "Blogs", href: "/allBlogs" },
    { title: "Write Blog", href: "/writeBlog" },
    { title: "Authors", href: "/authors" },
    { title: "Contact", href: "/contact" },
  ];

  const topBarVisible = scroll <= 20;
  const navFixed = scroll > 20; // when true, nav2 becomes fixed at top

  return (
    <header className="w-full z-50">
      {/* Top bar - hides on scroll */}
      <nav
        className={`w-full transition-transform duration-300 ${topBarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        aria-hidden={!topBarVisible}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://www.linkedin.com"
            className="font-logo font-extralight text-xl flex items-center space-x-3"
          >
            {theme === "dark" ? (
              <Image
                src={Darklogo}
                alt="Logo"
                width={40}
                height={40}
                style={{ objectFit: "contain", width: "auto", height: "auto" }}
              />
            ) : (
              <Image
                src={logo}
                alt="Logo"
                width={40}
                height={40}
                style={{ objectFit: "contain", width: "auto", height: "auto" }}
              />
            )}
            <span className="self-center text-2xl font-semibold ">Echo Journal</span>
          </a>

          <div className="flex items-center space-x-6 my-3 sm:my-0">
            <a
              href="tel:+923312035368"
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Phone size={18} /> <span className="ml-1">(+92) 3312035368</span>
            </a>

            {!isLogin ? (
              <a href="/login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                Login
              </a>
            ) : (
              <a href="/profile" className="p-1 border rounded-full hover:text-blue-600 dark:hover:text-blue-400 transition">
                <User size={18} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Links bar: becomes fixed on scroll */}
      <div className="w-full">
        <nav
          className={`nav2 w-full transition-all duration-300 ${navFixed
            ? "fixed top-0 left-0 right-0 z-[60] shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b"
            : "relative border-b-[1px] border-gray-200 dark:border-gray-700"
            }`}
        >
          <div className="max-w-screen-xl px-4 py-2 md:mx-auto flex items-center justify-between">
            <ul className="hidden md:flex flex-row font-medium space-x-8 text-sm">
              {links.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                <Linkedin size={20} />
              </a>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-full border hover:cursor-pointer hover:text-blue-600 transition"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Spacer to prevent content jump when nav becomes fixed */}
        {navFixed && <div className="h-14 md:h-0" aria-hidden />}

        {/* Mobile dropdown - positioned under the nav.
            If nav is fixed we absolutely position this under it (top-full),
            otherwise it flows in the document. */}
        {/* Mobile dropdown */}
        {isOpen && (
          <nav
            className={`md:hidden px-6 pb-4 space-y-3 border-b border-gray-200 dark:border-gray-700 transition-all duration-300
      ${navFixed
                ? "fixed top-[56px] left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md"
                : "relative bg-white dark:bg-gray-900"}`
            }
          >
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-medium py-2 hover:opacity-90 transition"
              >
                {link.title}
              </a>
            ))}
          </nav>
        )}


      </div>
    </header>
  );
}
