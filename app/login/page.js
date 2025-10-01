
"use client"
import React from 'react'
import "../globals.css";
import { signIn } from "next-auth/react";
import Image from "next/image";
const page = () => {
  return (
   <section className="h-screen flex items-center justify-center">
  <div className="sub shadow-lg rounded-2xl p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
    <p className="text-center mb-8">Login to continue</p>

    {/* Buttons */}
    <div className="flex flex-col gap-4">
      {/* Google */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex h-12 w-full items-center justify-center gap-3 border rounded-lg  hover:cursor-pointer hover:opacity-90 transition-all duration-300"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="font-medium">Login with Google</span>
      </button>

      {/* GitHub */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="flex h-12 w-full items-center justify-center gap-3 border rounded-lg  hover:cursor-pointer hover:opacity-90 transition-all duration-300"
      >
        <Image
          src="https://www.svgrepo.com/show/475654/github-color.svg"
          alt="GitHub"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="font-medium">Login with GitHub</span>
      </button>

      {/* Facebook */}
      <button className="flex h-12 w-full items-center justify-center gap-3 border rounded-lg  hover:cursor-pointer hover:opacity-90 transition-all duration-300">
        <Image
          src="https://www.svgrepo.com/show/475647/facebook-color.svg"
          alt="Facebook"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="font-medium">Login with Facebook</span>
      </button>
    </div>
  </div>
</section>


  )
}

export default page
