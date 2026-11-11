import { getContent } from "@/lib/content";
import HomeClient from "@/components/HomeClient";

// Always render with the latest saved content from the admin.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <HomeClient content={content} />;
}
