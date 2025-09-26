// api/allBlogs/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

// GET all blogs or filter by category
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        blogs: {
          some: {}, // only users with at least one blog
        },
      },
      include: { blogs: true },
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetching Users:", users);
    return NextResponse.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
