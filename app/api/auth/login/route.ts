import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@parisdecoration.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminParisDeco2026!#";

    const isMatch =
      email.toLowerCase().trim() === adminEmail.toLowerCase().trim() &&
      password === adminPassword;

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Email atau password admin tidak valid" },
        { status: 401 }
      );
    }

    const sessionToken = await createSessionToken({
      userId: "admin-master",
      email: adminEmail,
      name: process.env.ADMIN_NAME || "Admin Paris Decoration",
      role: "ADMIN",
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: {
        email: adminEmail,
        name: process.env.ADMIN_NAME || "Admin Paris Decoration",
        role: "ADMIN",
      },
    });
  } catch (err: unknown) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada sistem saat login" },
      { status: 500 }
    );
  }
}
