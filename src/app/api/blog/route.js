import connectMongo from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Blog from "../../../models/blog"
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { Types } from 'mongoose';
import deleteImage from "../../../utils/destroyImage"
import { NextResponse } from "next/server";
import { validateFormData } from "../../../lib/middleware/validateFormData"


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

    const validationResult = await validateFormData(req);

    if (validationResult.error) {
        return NextResponse.json(
            { error: validationResult.message },
            { status: 400 }
        );
    }

    const formData = validationResult.data;

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
    console.log("this is test ", blogData);
    try {
        const saved = await Blog.create(blogData);
        console.log("this is saved", saved);
        return NextResponse.json({ message: "Blog created", data: saved }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function DELETE(req) {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }
    try {
        let data = await Blog.findByIdAndDelete({ _id: id });
        console.log("this is deleted", data);
        if (data.image == undefined) {
            console.log("no blog found");
            return NextResponse.json({ message: "No Blog Found. " }, { status: 400 });
        }
        await deleteImage(data.image);
        return NextResponse.json({ message: "Blog Deleted Successfully." }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function PATCH(req) {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log("this is id", id);
    const validationResult = await validateFormData(req);

    if (validationResult.error) {
        return NextResponse.json(
            { error: validationResult.message },
            { status: 400 }
        );
    }

    const formData = validationResult.data;
    const imageFile = formData.get("image");

    console.log(formData);

    let uploadedImageUrl = "";

    // Upload image to Cloudinary if present
    if (imageFile && imageFile.name) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tmpDir = os.tmpdir();
        const tmpPath = path.join(tmpDir, uuidv4() + "-" + imageFile.name);
        await writeFile(tmpPath, buffer);

        const uploadRes = await cloudinary.uploader.upload(tmpPath, {
            folder: "blogs",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }
    console.log("this is upload image", uploadedImageUrl);

    // Construct updated blog data
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
        category: formData.get("category"),
        tags: formData.get("tags")?.split(",") || [],
        author: formData.get("author"),
        published: formData.get("published") === "true",
        publishedAt: new Date(),
        language: formData.get("language"),
    };

    if (uploadedImageUrl) {
        blogData.image = uploadedImageUrl;
    }
    console.log("this is blog data", blogData);
    try {
        // Get current blog before updating (to access old image)
        const oldBlog = await Blog.findById(id);
        console.log("this is old blog", oldBlog);
        if (!oldBlog) {
            return NextResponse.json({ message: "No Blog Found." }, { status: 404 });
        }

        // Delete old image if a new one was uploaded
        if (uploadedImageUrl && oldBlog.image) {
            await deleteImage(oldBlog.image);
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        console.log("this is updatedBlog", updatedBlog);
        return NextResponse.json({ message: "Blog Updated.", data: updatedBlog }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}