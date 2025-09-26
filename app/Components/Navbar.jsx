"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon, Github, Linkedin, Twitter, User, Phone } from "lucide-react"
import "../globals.css"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  const [isLogin, setIsLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [scroll, setScroll] = useState(0)

  // Ensure mounted for hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update login state when session changes
  useEffect(() => {
    if (status === "authenticated") {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [status])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 20 ? setScroll(window.scrollY) : setScroll(0)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don’t render until mounted (avoids hydration mismatch)
  if (!mounted) return null

  const links = [
    { title: "Home", href: "/" },
    { title: "Blogs", href: "/allBlogs" },
    { title: "Write Blog", href: "/writeBlog" },
    { title: "Authors", href: "/authors" },
  ]

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top bar */}
      <nav className={`${scroll > 20 ? "transition-all duration-500 transform -translate-y-full" : "block"}`}>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://www.linkedin.com" className="flex items-center space-x-3">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold dark:text-white">Flowbite</span>
          </a>
          <div className="flex items-center space-x-6 my-3 sm:my-0">
            <a href="tel:+923312035368" className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
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

      {/* Links bar */}
      <nav
        className={` ${isOpen ? "border-0" : "border-b-[1px] border-gray-400"} nav2 w-full transition-all duration-500
        ${scroll > 20 ? "absolute z-50 top-0" : ""}`}
      >
        <div className="max-w-screen-xl px-4 py-3 md:mx-auto flex items-center justify-end md:justify-between">
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
            <a href="https://www.twitter.com" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <Twitter size={20} />
            </a>
            <a href="https://www.github.com" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <Linkedin size={20} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full border hover:cursor-pointer hover:text-blue-600 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="nav2 md:hidden px-6 pb-4 space-y-3 border-b-[1px] border-gray-400 transition-all duration-500">
          {links.map((link) => (
            <a key={link.title} href={link.href} className="block font-medium hover:opacity-80 transition">
              {link.title}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
