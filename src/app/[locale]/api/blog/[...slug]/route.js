import { NextResponse } from "next/server";
import connectMongo from "../../../../../lib/db"; // Adjust path if needed
import Blog from "../../../../../models/blog"; // Capitalized for Mongoose model

export async function GET(req) {
  try {
    await connectMongo();

    const url = new URL(req.url);
    console.log(url)
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ message: "Missing slug" }, { status: 400 });
    }

    const post = await Blog.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { message: "Post does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
