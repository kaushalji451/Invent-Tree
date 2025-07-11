
import connectMongo from "../../../lib/db"
import Contact from "../../../models/contact"
import { NextResponse } from "next/server";
import sendEmailforContactus from "../../../utils/email";

export async function GET(req) {
  await connectMongo();
  try {
    let data = await Contact.find({});
    if (!data) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }
    return NextResponse.json(
      { message: data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Fetch contact details error:", err);
    return NextResponse.json(
      { error: "Failed to fetch contact details" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectMongo();
  const formData = await req.formData();
  const dataObj = Object.fromEntries(formData.entries());
  try {
    let data = await Contact.create(dataObj);
    if(data){
    await sendEmailforContactus(data);
    }
    return NextResponse.json(
      { message: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}






