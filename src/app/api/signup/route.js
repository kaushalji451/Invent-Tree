import AdminModel from "../../../models/Admin";
import { signupSchema } from "@/schema/auth.schema";

export async function POST(request) {
  const body = await request.json();
  const parsedData = signupSchema.safeParse(body);
  if (!parsedData.success) {
    return new Response.json({
      error: parsedData.error.message,
    });
  }
}
