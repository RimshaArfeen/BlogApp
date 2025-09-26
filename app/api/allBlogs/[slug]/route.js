

// app/api/allBlogs/[slug]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const blog = await prisma.blog.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true, comments: true, cat : true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

