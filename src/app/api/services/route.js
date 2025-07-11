import connectMongo from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import Service from "../../../models/service";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { Types } from 'mongoose';
import deleteImage from "../../../utils/destroyImage"
import { NextResponse } from "next/server";


export async function GET(req) {
    await connectMongo();
    try {
        let data = await Service.find({});
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
            folder: "services",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }


    const serviceData = {
        title: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        description: {
            en: formData.get("descriptionEn"),
            hi: formData.get("descriptionHi"),
        },
        category: formData.get("category"),
        image: uploadedImageUrl,
        isActive: formData.get("isActive"),
    }
    console.log("this is test ", serviceData);
    try {
        const saved = await Service.create(serviceData);
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
        let data = await Service.findByIdAndDelete({ _id: id });
        console.log("this is deleted", data);
        if (data.image == undefined) {
            console.log("no Service found");
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

    const formData = await req.formData();
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
            folder: "services",
        });

        uploadedImageUrl = uploadRes.secure_url;
    }
    console.log("this is upload image", uploadedImageUrl);

    // Construct updated blog data
    const serviceData = {
        title: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        description: {
            en: formData.get("titleEn"),
            hi: formData.get("titleHi"),
        },
        category: formData.get("category"),
        isActive: formData.get("isActive"),
    }

    if (uploadedImageUrl) {
        serviceData.image = uploadedImageUrl;
    }
    console.log("this is serviceData data", serviceData);
    try {
        // Get current serviceData before updating (to access old image)
        const oldservice = await Service.findById(id);
        console.log("this is old service", oldservice);
        if (!oldservice) {
            return NextResponse.json({ message: "No serviceData Found." }, { status: 404 });
        }

        // Delete old image if a new one was uploaded
        if (uploadedImageUrl && oldservice.image) {
            await deleteImage(oldservice.image);
        }

        const updatedserive = await Service.findByIdAndUpdate(id, serviceData, { new: true });
        console.log("this is updatedserive", updatedserive);
        return NextResponse.json({ message: "Serive Updated.", data: updatedserive }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}