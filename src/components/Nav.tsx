"use client";

import { useEffect, useState } from "react";
import { sections, person } from "@/content";

export function Nav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
    );

    els.forEach((el) => io.observe(el));

    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="shell flex justify-center sm:justify-end">
        <nav
          aria-label="Sections"
          className={`pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border px-1.5 py-1.5 transition-colors duration-500 [scrollbar-width:none] ${
            lifted
              ? "border-line/90 bg-ink/80 backdrop-blur-xl"
              : "border-transparent bg-ink/25 backdrop-blur-sm"
          }`}
        >
          <span className="sr-only">{person.name}</span>
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.76rem] font-light transition-colors duration-300 sm:px-4 ${
                  isActive ? "text-ink" : "text-mute hover:text-chalk"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-amber"
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
