import Image from "next/image";
import { person } from "@/content";
import { ArrowIcon } from "./icons";

/** The page's only non-user-triggered motion: the name assembles once. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/media/hero-bg.jpg"
          alt={`${person.name} working at his desk`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[56%_42%] brightness-[1.12] contrast-[1.04] sm:object-[64%_46%] lg:object-[58%_48%]"
        />
        {/* Left scrim carries the type; bottom scrim seats the section. */}
        <div
          aria-hidden
          className="absolute inset-0 hidden sm:block sm:bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-ink)_94%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_52%,transparent)_26%,transparent_46%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(to_top,var(--color-ink)_0%,var(--color-ink)_30%,color-mix(in_srgb,var(--color-ink)_82%,transparent)_52%,transparent_100%)] sm:h-32 sm:bg-gradient-to-t sm:from-ink sm:via-ink/45 sm:to-transparent"
        />
      </div>

      <div className="shell">
        <p
          className="seq font-script text-[clamp(1.9rem,4.5vw,3rem)] leading-none text-chalk/85"
          style={{ animationDelay: "120ms" }}
        >
          {person.greeting}
        </p>

        <h1
          className="seq-name mt-1 font-medium leading-[0.92] tracking-[-0.04em] text-chalk"
          style={{ fontSize: "var(--step-display)", animationDelay: "260ms" }}
        >
          {person.displayName}
        </h1>

        <div
          aria-hidden
          className="seq-rule mt-5 h-px w-full max-w-[34rem] bg-chalk/45"
          style={{ animationDelay: "620ms" }}
        />

        <p
          className="tracked seq mt-4 text-[clamp(0.8rem,1.9vw,1.35rem)] text-chalk"
          style={{ animationDelay: "740ms" }}
        >
          {person.role}
        </p>

        <p
          className="seq mt-3 text-[0.7rem] font-light tracking-[0.2em] text-chalk/70 sm:text-[0.78rem]"
          style={{ animationDelay: "840ms" }}
        >
          {person.disciplines.join("  ·  ")}
        </p>

        <div
          className="seq mt-9 max-w-[32rem]"
          style={{ animationDelay: "940ms" }}
        >
          <p className="text-[0.92rem] font-light leading-relaxed text-chalk/90 sm:text-base">
            {person.intro}
          </p>
        </div>

        <div
          className="seq mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
          style={{ animationDelay: "1040ms" }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-chalk/45 px-7 py-3 text-[0.8rem] tracking-[0.18em] uppercase transition-colors duration-400 hover:border-amber hover:text-amber"
          >
            Contact me
            <ArrowIcon className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </a>

          <a
            href="#work"
            className="text-[0.68rem] tracking-[0.22em] uppercase text-mute transition-colors hover:text-chalk"
          >
            Scroll to the work
          </a>
        </div>
      </div>
    </section>
  );
}
