"use client";

import { useMemo, useState } from "react";

const palette = {
  cream: "#FFF3EB",
  blush: "#F7DFE6",
  blue: "#174B91",
  green: "#17483B",
  mint: "#E5EDDF",
  red: "#B94D43",
  cocoa: "#563B36",
  muted: "#766965",
};

const occasions = [
  {
    name: "Work",
    subtitle: "Polished and powerful",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85",
    color: "#E4EAF6",
  },
  {
    name: "Weddings",
    subtitle: "Celebrate in style",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85",
    color: "#F7DFE6",
  },
  {
    name: "Date night",
    subtitle: "Elegant and unforgettable",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85",
    color: "#E5EDDF",
  },
  {
    name: "Everyday",
    subtitle: "Effortless and refined",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85",
    color: "#F5E6D9",
  },
  {
    name: "Events",
    subtitle: "Make an impression",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=85",
    color: "#E4EAF6",
  },
];

const journeys = [
  {
    number: "01",
    title: "Browse looks",
    description: "Explore outfits for every occasion.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85",
    href: "#occasions",
    background: "#F8E9DF",
  },
  {
    number: "02",
    title: "Find your fit",
    description: "Explore body-shape guidance and size information.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85",
    href: "/calculator",
    background: "#E5EDDF",
  },
  {
    number: "03",
    title: "Meet your stylist",
    description: "Get personal support when you need guidance.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85",
    href: "#styling-help",
    background: "#F7DFE6",
  },
];

const products = [
  {
    name: "Tailored blazer",
    collection: "Workwear edit",
    price: 65000,
    colour: "Neutral",
    occasion: "Work",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
  },
  {
    name: "Statement dress",
    collection: "Occasion edit",
    price: 85000,
    colour: "Pink",
    occasion: "Weddings",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
  },
  {
    name: "Relaxed look",
    collection: "Everyday edit",
    price: 35000,
    colour: "Green",
    occasion: "Everyday",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
  },
  {
    name: "Evening look",
    collection: "After-hours edit",
    price: 70000,
    colour: "Blue",
    occasion: "Date night",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80",
  },
];

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

export default function DayaHome() {
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedColour, setSelectedColour] = useState("All");
  const [maxBudget, setMaxBudget] = useState("150000");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesOccasion =
        selectedOccasion === "All" ||
        product.occasion === selectedOccasion;

      const matchesColour =
        selectedColour === "All" ||
        product.colour === selectedColour;

      const matchesBudget = product.price <= Number(maxBudget);

      return matchesOccasion && matchesColour && matchesBudget;
    });
  }, [selectedOccasion, selectedColour, maxBudget]);

  function resetFilters() {
    setSelectedOccasion("All");
    setSelectedColour("All");
    setMaxBudget("150000");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF3EB] text-[#302C2B]">
      {/* HEADER */}
      <header className="border-b border-[#E8D8D0]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-5 md:px-10"
        >
          <a href="/" aria-label="Daya home" className="shrink-0">
            <span className="font-serif text-3xl tracking-tight">daya.</span>
            <span className="mt-1 block text-[9px] tracking-[0.22em]">
              YOUR STYLE. YOUR LIFE.
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm lg:flex">
            <a href="#occasions" className="hover:text-[#B94D43]">
              Discover
            </a>
            <a href="#journey" className="hover:text-[#B94D43]">
              Style me
            </a>
            <a href="/calculator" className="hover:text-[#B94D43]">
              Body type
            </a>
            <a href="/calculator" className="hover:text-[#B94D43]">
              Size guide
            </a>
          </div>

          <a
            href="#styling-help"
            className="rounded-full bg-[#174B91] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#103B76] sm:px-5"
          >
            Book a stylist ↗
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-8 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-12">
        <div className="max-w-xl py-5">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#174B91]">
            Personal style, on your terms
          </p>

          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Every body is
            <br />
            <span className="italic text-[#B94D43]">Daya body.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#625653]">
            Discover looks for your real life. Explore your personal
            style, find your fit, or get thoughtful guidance when
            you need it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#occasions"
              className="rounded-full bg-[#174B91] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#103B76]"
            >
              Find your look ↗
            </a>
            <a
              href="#styling-help"
              className="rounded-full border border-[#B94D43] px-6 py-4 text-sm font-medium text-[#873A33] transition hover:bg-[#F7DFE6]"
            >
              Meet your stylist
            </a>
          </div>

          <p className="mt-5 text-xs leading-5 text-[#766965]">
            No fashion expertise required. Start wherever you are.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-[#E4EAF6]" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[#E5EDDF]" />

          <div className="relative h-[390px] overflow-hidden rounded-[1.75rem] sm:h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=90"
              alt="Contemporary womenswear editorial"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-7 pt-24 text-white">
              <p className="font-serif text-2xl italic sm:text-3xl">
                Your style. Your story.
              </p>
              <p className="mt-2 text-sm text-white/90">
                Number one. Always.
              </p>
            </div>

            <span className="absolute right-4 top-4 rounded-full bg-[#FFF3EB] px-4 py-2 text-xs">
              Discover your Daya
            </span>
          </div>
        </div>
      </section>

      {/* BRAND PROMISES */}
      <section className="border-y border-[#E8D8D0] bg-white/50">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 px-5 py-6 text-sm md:grid-cols-4 md:px-10">
          {[
            ["01", "Curated looks", "For real occasions"],
            ["02", "Helpful guidance", "For every body"],
            ["03", "Product discovery", "Explore brands"],
            ["04", "Human support", "When you need it"],
          ].map(([number, title, subtitle]) => (
            <div key={number} className="flex items-start gap-3">
              <span className="font-serif text-xl text-[#B94D43]">
                {number}
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-xs text-[#766965]">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE JOURNEYS */}
      <section
        id="journey"
        className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20"
      >
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#174B91]">
              Your journey starts here
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              Different journeys.
              <br />
              The same Daya experience.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#766965]">
            Know what you want, still figuring it out, or looking
            for expert help? Choose what feels right.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {journeys.map((journey) => (
            <a
              key={journey.number}
              href={journey.href}
              className="group overflow-hidden rounded-2xl border border-[#E8D8D0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-60 overflow-hidden sm:h-72">
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5" style={{ backgroundColor: journey.background }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest text-[#766965]">
                    {journey.number} / DAYA
                  </span>
                  <span aria-hidden="true" className="text-xl">↗</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl">{journey.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#625653]">
                  {journey.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* OCCASION DISCOVERY */}
      <section id="occasions" className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#174B91]">
                Discover your next look
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl">
                What are we dressing for?
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#766965]">
              Start with your occasion. Refine your choices as you go.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {occasions.map((occasion) => (
              <button
                type="button"
                key={occasion.name}
                onClick={() => {
                  setSelectedOccasion(occasion.name);
                  document
                    .getElementById("outfit-discovery")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group overflow-hidden rounded-2xl border border-[#E8D8D0] bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={occasion.image}
                    alt={`${occasion.name} fashion inspiration`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4" style={{ backgroundColor: occasion.color }}>
                  <h3 className="font-serif text-xl">{occasion.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#625653]">
                    {occasion.subtitle}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium">
                    Explore ↗
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BODY TYPE AND SIZE GUIDE */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#D8E4D2] bg-[#E5EDDF] md:grid-cols-2">
          <div className="p-7 sm:p-10 md:p-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#17483B]">
              Get to know your fit
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              Understand your shape.
              <br />
              Find your size.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#526451]">
              Explore body-shape guidance and use your measurements
              to find an estimated size in US, UK or EU sizing.
              Your shape is a guide, never a limitation.
            </p>
            <a
              href="/calculator"
              className="mt-7 inline-flex rounded-full bg-[#17483B] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#103A30]"
            >
              Explore the size guide ↗
            </a>
            <p className="mt-4 text-xs leading-5 text-[#526451]">
              Sizes vary by brand. Always check the retailer's own chart.
            </p>
          </div>

          <div className="relative min-h-[300px] md:min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=85"
              alt="Contemporary fashion inspiration"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17483B]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-xs rounded-xl bg-[#FFF3EB]/95 p-4">
              <p className="font-serif text-xl text-[#17483B]">
                Your body. Your style.
              </p>
              <p className="mt-1 text-sm text-[#526451]">
                Dress for yourself, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTFIT DISCOVERY PREVIEW */}
      <section
        id="outfit-discovery"
        className="bg-white/70 py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#174B91]">
              The Daya edit
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Find pieces that feel like you.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#766965]">
              Explore this sample discovery interface. The sample
              products and prices are illustrative, not verified offers.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[220px_1fr]">
            <aside className="h-fit rounded-2xl border border-[#E8D8D0] bg-[#FFF9F5] p-5">
              <h3 className="font-serif text-xl">Refine your search</h3>

              <label className="mt-5 block text-sm font-medium" htmlFor="occasion-filter">
                Occasion
              </label>
              <select
                id="occasion-filter"
                value={selectedOccasion}
                onChange={(event) => setSelectedOccasion(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E8D8D0] bg-white px-3 py-3 text-sm"
              >
                <option value="All">All occasions</option>
                <option value="Work">Work</option>
                <option value="Weddings">Weddings</option>
                <option value="Date night">Date night</option>
                <option value="Everyday">Everyday</option>
                <option value="Events">Events</option>
              </select>

              <label className="mt-5 block text-sm font-medium" htmlFor="colour-filter">
                Colour
              </label>
              <select
                id="colour-filter"
                value={selectedColour}
                onChange={(event) => setSelectedColour(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E8D8D0] bg-white px-3 py-3 text-sm"
              >
                <option value="All">All colours</option>
                <option value="Neutral">Neutral</option>
                <option value="Pink">Pink</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
              </select>

              <label className="mt-5 block text-sm font-medium" htmlFor="budget-filter">
                Maximum budget
              </label>
              <select
                id="budget-filter"
                value={maxBudget}
                onChange={(event) => setMaxBudget(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E8D8D0] bg-white px-3 py-3 text-sm"
              >
                <option value="50000">₦50,000</option>
                <option value="75000">₦75,000</option>
                <option value="100000">₦100,000</option>
                <option value="150000">₦150,000</option>
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 text-sm font-medium text-[#B94D43] underline underline-offset-4"
              >
                Clear filters
              </button>
            </aside>

            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-sm text-[#766965]">
                  {filteredProducts.length} sample looks
                </p>
                <span className="text-xs text-[#766965]">
                  Sample catalogue
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <article
                      key={product.name}
                      className="overflow-hidden rounded-2xl border border-[#E8D8D0] bg-white"
                    >
                      <div className="h-48 overflow-hidden sm:h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[#766965]">
                          {product.collection}
                        </p>
                        <h3 className="mt-1 font-serif text-lg">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold">
                          {formatPrice(product.price)}
                        </p>
                        <p className="mt-1 text-xs text-[#766965]">
                          {product.colour} · {product.occasion}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D8C5BC] bg-[#FFF9F5] p-10 text-center">
                  <h3 className="font-serif text-xl">
                    We're still curating this edit.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#766965]">
                    Try adjusting your filters to discover other looks.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-full bg-[#174B91] px-5 py-3 text-sm font-medium text-white"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL STYLING */}
      <section id="styling-help" className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 rounded-[2rem] bg-[#17483B] p-7 text-white sm:p-10 md:grid-cols-2 md:items-center md:p-14">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DDE8D7]">
              A little help goes a long way
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              More than outfits.
              <br />
              A more personal experience.
            </h2>
          </div>

          <div>
            <p className="leading-7 text-white/85">
              Sometimes you need more than a list of recommendations.
              Daya brings together outfit discovery, practical guidance
              and the option of human styling support.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Want to know more about personal styling? Contact Daya
              to ask about available services.
            </p>
            <a
              href="#journey"
              className="mt-6 inline-flex rounded-full bg-[#FFF3EB] px-6 py-4 text-sm font-medium text-[#17483B] transition hover:bg-white"
            >
              Explore your options ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8D8D0] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-serif text-2xl">daya.</span>
            <p className="mt-1 text-xs text-[#766965]">
              Style for your real life.
            </p>
          </div>
          <div className="flex gap-5 text-xs text-[#766965]">
            <a href="#occasions" className="hover:text-[#174B91]">
              Discover
            </a>
            <a href="/calculator" className="hover:text-[#174B91]">
              Size guide
            </a>
            <a href="#styling-help" className="hover:text-[#174B91]">
              Styling help
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
