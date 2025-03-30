import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import User from "@/app/models/User";
import { verifyJWT } from "@/app/lib/auth";

export async function GET() {
  try {
    await dbConnect();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const payload = await verifyJWT(token);

    if (!payload || !payload.email) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ email: payload.email }).lean() as unknown as { name: string; email: string };


    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
