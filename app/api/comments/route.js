import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { slugify } from "@/app/utils";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const blogSlug = searchParams.get("blogSlug");
    // Trim the slug to ensure no whitespace issues
    const trimmedSlug = blogSlug?.trim().replace(/:/g, "-");
    console.log("GET API route - Querying with trimmed slug:", trimmedSlug);

    if (!trimmedSlug) {
      return NextResponse.json({ message: "blogSlug is required" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { blogSlug: trimmedSlug }, // Use the trimmed slug here
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });

    console.log("Fetched comments:", comments);
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Prisma GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await auth();
  console.log("API session:", session);

  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("POST API route - Received body:", body);
    
    // Define trimmedSlug (was missing)
    const trimmedSlug = body.blogSlug?.trim().replace(/:/g, "-");

    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        desc: body.desc,
        userEmail: session.user.email,
        blogSlug: trimmedSlug, // Now defined correctly
      },
      include: { user: true },
    });

    console.log("✅ Comment created:", comment);
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error("❌ Comment POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
