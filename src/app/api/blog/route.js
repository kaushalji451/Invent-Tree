import connectMongo from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Blog from "../../../models/blog"
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

import { NextResponse } from "next/server";


export async function GET(req) {
    await connectMongo();
    try {
        let data = await Blog.find({});
        if (!data) {
            return NextResponse.json({ message: "Not found." }, { status: 404 });
        }
        return NextResponse.json(
            { message: data },
            { status: 200 }
        );
    } catch (err) {
        console.error("Fetch blog posts error:", err);
        return NextResponse.json(
            { error: "Failed to fetch blog posts." },
            { status: 500 }
        );
    }
}



export async function POST(req) {
    await connectMongo();

    const formData = await req.formData();

    const imageFile = formData.get("image");

    let uploadedImageUrl = "";

    if (imageFile && imageFile.name) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

    const tmpDir = os.tmpdir(); // Cross-platform safe
        const tmpPath = path.join(tmpDir, uuidv4() + "-" + imageFile.name);
        await writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
            folder: "blogs",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }

    const blogData = {
        title: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        slug: formData.get("slug"),
        content: {
            en: formData.get("contentEn"),
            hi: formData.get("contentHi"),
        },
        excerpt: {
            en: formData.get("excerptEn"),
            hi: formData.get("excerptHi"),
        },
        image: uploadedImageUrl,
        category: formData.get("category"),
        tags: formData.get("tags")?.split(",") || [],
        author: formData.get("author"),
        published: formData.get("published") === "true",
        publishedAt: new Date(),
        language: formData.get("language"),
    };
    console.log("this is test ",blogData);
    try {
        const saved = await Blog.create(blogData);
        console.log("this is saved",saved);
        return NextResponse.json({ message: "Blog created", data: saved }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
