
"use client";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl  text-red-800 font-bold ">
            MyBlog
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
            {["Home", "Blog", "Categories", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm  hover:opacity-80 transition"
                >
                  {link}
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
            hello@myblog.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
        <p className="text-center py-4 text-xs text-[var(--color-subheading-light)] dark:text-[var(--color-subheading-dark)]">
          ©2025 MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
