import connectMongo from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Blog from "../../../models/blog.js";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import deleteImage from "../../../utils/destroyImage";
import { NextResponse } from "next/server";
import { validateFormData } from "../../../lib/middleware/validateFormData";
import blog from "../../../models/blog";
import { blogPostSchema } from "../../../schema/blog.schema";
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

  // Validate the input using zod
  const parsedData = blogPostSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.errors.map((e) => e.message).join(", ") },
      { status: 400 }
    );
  }

  const data = parsedData.data;

  // Generate slug from English title
  const slug = generateSlug(data.title?.en || "untitled");

  try {
    const blogCreated = await Blog.create({
      title: {
        en: data.title.en,
        hi: data.title.hi,
      },
      slug: slug,
      content: {
        en: data.content.en,
        hi: data.content.hi,
      },
      category: {
        en: data.category.en,
        hi: data.category.hi,
      },
      tags: data.tags,
      author: data.author || "admin",
      image: data.image,
      published: true,
    });

    return NextResponse.json(
      {
        message: "Blog is created successfully.",
        blog: blogCreated,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        message: "Error while publishing blog",
        error: error.message,
      },
      { status: 500 }
    );
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

  const formData = await req.formData();
  const slug = formData.get('slug');

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ message: 'Blog does not exist' }, { status: 404 });
    }

    const title = {
      en: formData.get('titleEn'),
      hi: formData.get('titleHi'),
    };

    const content = {
      en: formData.get('contentEn'),
      hi: formData.get('contentHi'),
    };

    const category = {
      en: formData.get('categoryEn'),
      hi: formData.get('categoryHi'),
    };

    const tags = formData.get('tags')?.split(',').map((tag) => tag.trim()) || [];
    const published = formData.get('published') === 'true';

    let imagePath = blog.image;
    const imageFile = formData.get('image');
    if (imageFile && typeof imageFile.name === 'string') {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    await Blog.updateOne({ slug }, {
      $set: {
        title,
        content,
        category,
        tags,
        image: imagePath,
        published,
      },
    });

    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });

  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}