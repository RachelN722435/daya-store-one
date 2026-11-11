// Site content model, defaults, and Supabase-backed storage.
//
// The homepage reads its content from Supabase (table `site_content`, row id "main").
// If Supabase is not configured, or the row is empty, the defaults below are used,
// so the public site never breaks.

export type BodyType = { name: string; tip: string };
export type OccasionCard = { name: string; note: string; image: string };
export type Look = {
  id: string;
  name: string;
  occasion: string;
  price: string;
  bodyTypes: string[];
  image: string;
  link: string;
  visible: boolean;
};
export type Journey = {
  title: string;
  text: string;
  image: string;
  // "finder" and "book" scroll to a section, "calculator" opens the size guide
  action: "finder" | "book" | "calculator";
};

export type SiteContent = {
  // Header and footer
  brandName: string;
  brandTagline: string;
  navButton: string;
  footer: string;
  // Hero
  heroEyebrow: string;
  heroTitleStart: string;
  heroTitleHighlight: string;
  heroText: string;
  heroButtonPrimary: string;
  heroButtonSecondary: string;
  heroImage: string;
  // Feature strip: bold part + rest
  strip: { bold: string; rest: string }[];
  // Occasions
  occasionsTitle: string;
  occasionsSubtitle: string;
  occasionCards: OccasionCard[];
  // Finder
  finderTitle: string;
  finderNote: string;
  bodyTypes: BodyType[];
  occasions: string[];
  looks: Look[];
  // Journeys
  journeysTitle: string;
  journeys: Journey[];
  // Banner
  bannerTitle: string;
  bannerItems: string[];
  // Booking
  bookTitle: string;
  bookText: string;
  bookThanks: string;
};

export const DEFAULT_CONTENT: SiteContent = {
  brandName: "daya.",
  brandTagline: "YOUR STYLE. YOUR LIFE.",
  navButton: "BOOK A STYLIST",
  footer: "daya. Style for your real life.",

  heroEyebrow: "CONFIDENT STYLE FOR EVERY CHAPTER",
  heroTitleStart: "Every body is",
  heroTitleHighlight: "Daya body.",
  heroText:
    "Discover looks for your real life. Get expert guidance. Shop from trusted brands. Because style is for every woman.",
  heroButtonPrimary: "FIND YOUR LOOK",
  heroButtonSecondary: "BOOK A STYLIST",
  heroImage:
    "https://images.unsplash.com/photo-1609216690633-61604ac68559?auto=format&fit=crop&w=1000&q=85",

  strip: [
    { bold: "Curated looks", rest: "for every occasion" },
    { bold: "Guidance for", rest: "every body" },
    { bold: "Shop from", rest: "trusted brands" },
    { bold: "Personal", rest: "styling support" },
  ],

  occasionsTitle: "Looks for every occasion",
  occasionsSubtitle: "Tap an occasion to see matching looks.",
  occasionCards: [
    { name: "Workwear", note: "Polished and powerful", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" },
    { name: "Weddings", note: "Celebrate in style", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85" },
    { name: "Date night", note: "Elegant and unforgettable", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=85" },
    { name: "Everyday", note: "Effortless and refined", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=85" },
    { name: "Events", note: "Make an impression", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=85" },
  ],

  finderTitle: "Find your look",
  finderNote:
    "Sample looks and prices. Sizes vary by brand, so check the retailer's own size chart or use our",
  bodyTypes: [
    { name: "Hourglass", tip: "Define the waist. Fitted and wrap shapes work well." },
    { name: "Pear", tip: "Add structure on top with strong shoulders or bolder necklines." },
    { name: "Apple", tip: "Choose A-line and empire cuts that skim the waist." },
    { name: "Rectangle", tip: "Create shape with belts, peplums and layers." },
    { name: "Inverted triangle", tip: "Balance the shoulders with wide-leg trousers or fuller skirts." },
    { name: "Athletic", tip: "Add softness with draping and flowing fabrics, or define the waist." },
    { name: "Petite", tip: "Keep lines streamlined: high waists, cropped jackets, one-colour outfits." },
    { name: "Tall", tip: "Lean into length with maxi hemlines, wide-leg trousers and bold belts." },
    { name: "Plus size", tip: "Choose fabrics that hold their shape, and tailor where needed." },
    { name: "Full bust", tip: "Look for V-necks, wrap styles and structured support." },
  ],
  occasions: [
    "Workwear", "Suits", "Modest", "Evening gowns", "Beachwear", "Weddings",
    "Date night", "Everyday", "Events", "Party", "Church", "Brunch",
  ],
  looks: [
    { id: "look-1", name: "Tailored blazer set", occasion: "Suits", price: "₦65,000", bodyTypes: ["Rectangle", "Pear", "Hourglass", "Tall"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-2", name: "Wide-leg trousers and shirt", occasion: "Workwear", price: "₦55,000", bodyTypes: ["Pear", "Apple", "Inverted triangle", "Plus size"], image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-3", name: "Statement dress", occasion: "Weddings", price: "₦85,000", bodyTypes: ["Hourglass", "Pear", "Rectangle", "Full bust"], image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-4", name: "Evening look", occasion: "Date night", price: "₦70,000", bodyTypes: ["Hourglass", "Apple", "Pear", "Petite"], image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-5", name: "Relaxed everyday set", occasion: "Everyday", price: "₦35,000", bodyTypes: ["Apple", "Rectangle", "Inverted triangle", "Athletic"], image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-6", name: "Layered casual look", occasion: "Brunch", price: "₦45,000", bodyTypes: ["Rectangle", "Pear", "Inverted triangle", "Apple", "Petite"], image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
    { id: "look-7", name: "Structured event dress", occasion: "Events", price: "₦90,000", bodyTypes: ["Hourglass", "Inverted triangle", "Rectangle", "Tall"], image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=700&q=85", link: "#", visible: true },
  ],

  journeysTitle: "Different journeys. The same Daya experience.",
  journeys: [
    { title: "Browse looks", text: "Explore curated outfits for every occasion.", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85", action: "finder" },
    { title: "Find your body type", text: "Get a personalised guide and size in US, UK or EU.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85", action: "calculator" },
    { title: "Get a personal stylist", text: "Personal support when you need guidance.", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85", action: "book" },
  ],

  bannerTitle: "More than outfits. A more confident you.",
  bannerItems: [
    "Understand your style",
    "Discover what suits you",
    "Learn and grow your wardrobe",
    "Get expert guidance",
  ],

  bookTitle: "Want a stylist to help?",
  bookText:
    "Tell us what you are dressing for and we will get back to you with options that fit.",
  bookThanks: "Thank you. We will be in touch soon.",
};

/* ------------------------------------------------------------------ */
/* Storage (Supabase REST, no extra packages needed)                   */
/* ------------------------------------------------------------------ */

const TABLE = "site_content";
const ROW_ID = "main";
export const IMAGE_BUCKET = "site-images";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function isStorageConfigured() {
  return supabaseConfig() !== null;
}

function authHeaders(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

/** Merge saved data over the defaults so missing fields never break the page. */
export function withDefaults(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved || typeof saved !== "object") return DEFAULT_CONTENT;
  const merged: SiteContent = { ...DEFAULT_CONTENT, ...saved };
  // Guard list fields against wrong types
  for (const k of ["strip", "occasionCards", "bodyTypes", "occasions", "looks", "journeys", "bannerItems"] as const) {
    if (!Array.isArray(merged[k])) (merged as any)[k] = DEFAULT_CONTENT[k];
  }
  return merged;
}

export async function getContent(): Promise<SiteContent> {
  const cfg = supabaseConfig();
  if (!cfg) return DEFAULT_CONTENT;
  try {
    const res = await fetch(
      `${cfg.url}/rest/v1/${TABLE}?id=eq.${ROW_ID}&select=data`,
      { headers: authHeaders(cfg.key), cache: "no-store" }
    );
    if (!res.ok) return DEFAULT_CONTENT;
    const rows = (await res.json()) as { data: Partial<SiteContent> }[];
    return withDefaults(rows[0]?.data);
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const cfg = supabaseConfig();
  if (!cfg) {
    throw new Error(
      "Storage is not set up. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your Vercel environment variables."
    );
  }
  const res = await fetch(`${cfg.url}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      ...authHeaders(cfg.key),
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: ROW_ID, data: content, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Could not save (${res.status}). ${text.slice(0, 200)}`);
  }
}

export async function uploadImage(file: File): Promise<string> {
  const cfg = supabaseConfig();
  if (!cfg) {
    throw new Error("Storage is not set up. Add the Supabase environment variables first.");
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext || "jpg"}`;
  const res = await fetch(`${cfg.url}/storage/v1/object/${IMAGE_BUCKET}/${path}`, {
    method: "POST",
    headers: {
      ...authHeaders(cfg.key),
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}). ${text.slice(0, 200)}`);
  }
  return `${cfg.url}/storage/v1/object/public/${IMAGE_BUCKET}/${path}`;
}
