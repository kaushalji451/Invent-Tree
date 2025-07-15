import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  console.log("file", file);
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tmpDir = os.tmpdir(); // Cross-platform safe
    const tmpPath = path.join(tmpDir, uuidv4() + "-" + file.name);
    await writeFile(tmpPath, buffer);
    const uploadRes = await cloudinary.uploader.upload(tmpPath, {
      folder: "blogImages",
    });
    console.log("uploadRes",uploadRes)
    if (!uploadRes) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 },
      );
    }
    

    const uploadedImageUrl = uploadRes.secure_url;
    console.log(uploadedImageUrl)

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        imageUrl: uploadedImageUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 500 },
    );
  }
}
