
"use client";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
   const links = [
    { title: "Home", href: "/" },
    { title: "Blogs", href: "/allBlogs" },
    { title: "Write Blog", href: "/writeBlog" },
    { title: "Authors", href: "/authors" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <footer className=" border-t ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl  text-red-800 font-bold ">
            Echo Journal
          </h2>
          <p className="mt-3 text-sm ">
            Sharing ideas, stories & knowledge with the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold ">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2">
            {links.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  className="text-sm  hover:opacity-80 transition"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="font-semibold ">
            Follow Us
          </h3>
          <div className="flex space-x-4 mt-3">
            <a href="https://www.twitter.com" target="_blank" className="hover:text-[var(--color-btn-light)] dark:hover:text-[var(--color-btn-dark)] transition">
              <Twitter size={22} />
            </a>
            <a href="https://www.github.com" target="_blank" className="hover:text-[var(--color-btn-light)] dark:hover:text-[var(--color-btn-dark)] transition">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" className="hover:text-[var(--color-btn-light)] dark:hover:text-[var(--color-btn-dark)] transition">
              <Linkedin size={22} />
            </a>
          </div>
          <p className="mt-3 text-sm text-[var(--color-subheading-light)] dark:text-[var(--color-subheading-dark)]">
            EchoJournal@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
        <p className="text-center py-4 text-xs text-[var(--color-subheading-light)] dark:text-[var(--color-subheading-dark)]">
          ©2025 EchoJournal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
