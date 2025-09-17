import { NextRequest } from "next/server";
import { connectMongo } from "@/lib/mongo";
import { UserModel } from "@/db/models";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    await connectMongo();

    const existing = await (UserModel as any).findOne({ email }).lean();
    if (existing) return new Response(JSON.stringify({ error: "Email already registered" }), { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await (UserModel as any).create({ email, passwordHash, name });

    return new Response(JSON.stringify({ ok: true, userId: String(user._id) }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Register error" }), { status: 500 });
  }
}
