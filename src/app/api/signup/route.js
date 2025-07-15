import { NextResponse } from "next/server";
import AdminModel from "../../../models/Admin";
import { signupSchema } from "../../../schema/auth.schema";
import connectMongo from "../../../lib/db";

export async function POST(request) {
  await connectMongo();
  const body = await request.json();
  const parsedData = signupSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        message: "Incorrect Credentials",
        success: false,
      },
      { status: 403 },
    );
  }
  try {
    const existingUser = await AdminModel.findOne({
      username: parsedData.data.username,
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User Already Exist ",
          success: false,
        },
        { status: 405 },
      );
    }
    const { username, password } = parsedData.data;
    const createdUser = await AdminModel.create({
      username: username,
      password: password,
    });
    const SavedUser = await createdUser.save();

    return NextResponse.json(
      {
        message: `user created ${SavedUser}`,
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      { status: 501 },
    );
  }
}
