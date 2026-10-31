import { HeroSection } from "@/components/hero-section";
import { SectionCard } from "@/components/section-card";
import { siteSections } from "@/config/site";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      <section
        aria-labelledby="sections-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000"
      >
        <h2 id="sections-heading" className="font-heading text-xl font-semibold">
          Explore
        </h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {siteSections.map((section) => (
            <li key={section.href}>
              <SectionCard section={section} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
