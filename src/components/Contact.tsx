"use client";

import { useEffect, useState } from "react";
import { contact, person } from "@/content";
import { ArrowIcon, CheckIcon, CopyIcon } from "./icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // address is a mailto link right beside this, so nothing is lost.
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-20">
        <div>
          <h2
            className="font-light leading-tight tracking-[-0.02em]"
            style={{ fontSize: "var(--step-h2)" }}
          >
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-[68ch] text-[0.95rem] font-light leading-[1.75] text-mute">
            {contact.body}
          </p>
        </div>

        <div className="space-y-10 border-t border-line pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-2">
          <div>
            <a
              href={`mailto:${person.email}`}
              className="block break-words text-[clamp(1.4rem,4vw,2.4rem)] font-light leading-tight tracking-[-0.02em] text-chalk underline decoration-line decoration-1 underline-offset-[0.18em] transition-colors duration-300 hover:decoration-amber"
            >
              {person.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-5 inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line px-5 py-2.5 text-[0.75rem] tracking-[0.16em] uppercase text-mute transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4 text-amber" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
              <span className={copied ? "text-amber" : undefined}>
                {copied ? "Copied" : "Copy address"}
              </span>
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <div>
            <a
              href={`https://wa.me/${person.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-wrap items-baseline gap-x-4 text-[clamp(1.4rem,4vw,2.4rem)] font-light leading-tight tracking-[-0.02em] text-chalk underline decoration-line decoration-1 underline-offset-[0.18em] transition-colors duration-300 hover:decoration-amber"
            >
              {person.phoneDisplay}
              <span className="text-[0.7rem] tracking-[0.16em] uppercase text-mute transition-colors group-hover:text-amber">
                on WhatsApp
                <ArrowIcon className="ml-2 inline h-3.5 w-3.5 -translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
