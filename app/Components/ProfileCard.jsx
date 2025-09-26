"use client";
import React from "react";
import "../globals.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { BlogsProvider, useBlogs } from "../context/BlogsContext";
import { formatDate, truncateText } from "../utils";
import { Mail } from "lucide-react";

const ProfilePage = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      signOut({ callbackUrl: "/login" });
    }
  };

 const authorPosts = useBlogs().filter(
    (blog) => blog.user.email === session?.user?.email
  );


  return (
    <div className="min-h-screen   sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Profile Card */}
        <div className="dark:  shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            src={session?.user?.image || "/default-avatar.png"}
            alt={session?.user?.name}
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {session?.user?.name || "Anonymous User"}
            </h2>
            <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
              <Mail className="inline-block text-sm text-gray-500 dark:text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-lg">
              Passionate blogger and open-source contributor. Sharing knowledge on Next.js, React, and modern web development.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start mt-4 space-x-4 text-gray-600 dark:text-gray-300">
              <a href="https://twitter.com/" target="_blank" className="hover:text-blue-500">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com/" target="_blank" className="hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/" target="_blank" className="hover:text-gray-900 dark:hover:text-white">
                <FaGithub size={20} />
              </a>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-6 inline-block bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recent Posts Section */}
    <div>
  {authorPosts.length > 0 ? (
    <>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Your Posts
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {authorPosts.map((post) => (
          <div
            key={post.id}
            className="sub border rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {formatDate(post.createdAt)}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {truncateText(post.desc, 70)}
            </p>
            <a
              href={`/allBlogs/${post.slug}`}
              className="mt-3 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="text-center py-10">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        You haven’t authored any posts yet.
      </p>
      <a
        href="/writeBlog"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        ✍️ Start Writing
      </a>
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default ProfilePage;

