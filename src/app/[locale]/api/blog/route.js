import connectMongo from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import Blog from "../../../../models/blog.js";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import deleteImage from "../../../../utils/destroyImage";
import { NextResponse } from "next/server";
import { validateFormData } from "../../../../lib/middleware/validateFormData";
import blog from "../../../../models/blog";
import { blogPostSchema } from "../../../../schema/blog.schema";
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req) {
  await connectMongo();
  try {
    let data = await Blog.find({});
    if (!data) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (err) {
    console.error("Fetch blog posts error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  console.debug(body);
  const parsedData = blogPostSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.errors.map((e) => e.message).join(", ") },
      { status: 400 },
    );
  }

  const slug = generateSlug(parsedData.data.title);
  try {
    const blogcreated = await Blog.create({
      title: parsedData.data.title,
      slug: slug,
      content: parsedData.data.content,
      category: parsedData.data.category,
      tags: parsedData.data.tag,
      author: parsedData.data.author,
      image: parsedData.data.featureImage,
      published: true,
    });

    return NextResponse.json(
      {
        message: "blog is created",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error white publishing blog",
    });
  }
}

export async function DELETE(req) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
  }
  try {
    let data = await Blog.findByIdAndDelete({ _id: id });
    if (data.image == undefined) {
      return NextResponse.json({ message: "No Blog Found. " }, { status: 400 });
    }
    await deleteImage(data.image);
    return NextResponse.json(
      { message: "Blog Deleted Successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await connectMongo();
  const body = await req.json();
  console.log(body);

  try {
    const exitingBlog = await Blog.findOne({
      slug: body.slug,
    });
    console.log("existing Blog", exitingBlog);

    if (!exitingBlog) {
      return NextResponse.json(
        {
          message: "blog Does not exist",
        },
        { status: 501 },
      );
    }

    const updatedBlog = await blog.updateOne(
      {
        slug: body.slug,
      },
      {
        $set: {
          title: body.title,
          tags: body.tags,
          image: body.featureImage,
          category: body.category,
          content: body.content,
        },
      },
    );
    if (!updatedBlog) {
      return NextResponse.json(
        {
          message: "Failed to update blog",
        },
        { status: 501 },
      );
    }
    console.log(updatedBlog)
    return NextResponse.json(
      {
        message: "blog updated",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while updating blog",
      },
      { status: 502 },
    );
  }
}
