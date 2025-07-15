
import connectMongo from "../../../../lib/db"
import Contact from "../../../../models/contact"
import { NextResponse } from "next/server";
import sendEmailforContactus from "../../../../utils/email";
import { validateFormData } from "../../../../lib/middleware/validateFormData"


export async function GET(req) {
  await connectMongo();
  try {
    let data = await Contact.find({});
    if (!data) {
      return NextResponse.json({ message: "Contacts Not found." }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Data Fetched Successfully.", data: data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Fetch Contact Details Error:", err);
    return NextResponse.json(
      { error: "Failed to Fetch Contact Details" },
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

  const dataObj = validationResult.data;
  try {
    let data = await Contact.create(dataObj);
    if (data) {
      await sendEmailforContactus(data);
    }
    return NextResponse.json(
      { message: "Data Added Successfully.", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}






