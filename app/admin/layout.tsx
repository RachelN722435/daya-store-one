import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daya Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#FBEFE6] text-[#2B2A27]">{children}</div>;
}
