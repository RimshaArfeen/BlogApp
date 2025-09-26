// app/api/authors/[slug]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { slug } = params; // no need for await here

  try {
    const author = await prisma.user.findUnique({
      where: { slug,  blogs: {
          some: {}, // only users with at least one blog
        }, }, // must exist in schema
      include: {
        blogs: true,
        comments: true,
        categories: true,
      },
    });

    if (!author || author.blogs.length === 0) {
      return NextResponse.json({ error: "Author not found or has no blogs" }, { status: 404 });
    }

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
