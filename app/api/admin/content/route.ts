import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, isStorageConfigured, saveContent, withDefaults } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    content: await getContent(),
    storageConfigured: isStorageConfigured(),
  });
}

export async function PUT(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }
  const content = withDefaults(body?.content);
  try {
    await saveContent(content);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Could not save." }, { status: 500 });
  }
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
