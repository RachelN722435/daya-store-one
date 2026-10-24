import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/content";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel request bodies cap out near 4.5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    /* ignore */
  }
  if (!file) return NextResponse.json({ error: "No file received." }, { status: 400 });
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Please choose a JPG, PNG, WebP, GIF or AVIF image." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large. Keep it under 4 MB." }, { status: 400 });
  }
  try {
    return NextResponse.json({ url: await uploadImage(file) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Upload failed." }, { status: 500 });
  }
}
