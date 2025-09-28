

// api/allBlogs/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { slugify } from "@/app/utils";

// GET all blogs or filter by category
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");

    const blogs = await prisma.blog.findMany({
      where: cat ? { catSlug: cat } : undefined,
      include: { user: true, comments: true }, // remove cat to test
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetching blogs for cat:", cat);

    return NextResponse.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// Create a blog
export async function POST(req) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Blog Body:", body);

    const { title, desc, catSlug, slug, img } = body;

    const post = await prisma.blog.create({
      data: {
        title,
        desc,
        catSlug,
        slug: slugify(slug),
        img: img || null,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("❌ Creating POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

