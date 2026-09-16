"use client";

import { useState } from "react";
import { capabilities } from "@/content";
import { PauseIcon, PlayIcon } from "./icons";

/** A continuous rail rather than a grid of identical capability cards. */
export function Capabilities() {
  const [paused, setPaused] = useState(false);
  const run = [...capabilities, ...capabilities];

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="rail-wrap flex items-center gap-3 border-y border-line py-7 pr-3 sm:gap-5 sm:pr-5"
      data-paused={paused}
    >
      <h2 id="capabilities-heading" className="sr-only">
        Capabilities
      </h2>

      <div className="min-w-0 flex-1 overflow-hidden">
        <ul className="rail" role="list">
          {run.map((c, i) => (
            <li
              key={`${c}-${i}`}
              aria-hidden={i >= capabilities.length}
              className="flex shrink-0 items-center gap-10 pr-10 text-[0.72rem] tracking-[0.26em] uppercase text-mute sm:gap-14 sm:pr-14 sm:text-[0.8rem]"
            >
              {c}
              <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
            </li>
          ))}
        </ul>
      </div>

      {/* WCAG 2.2.2: motion that starts on its own and runs past 5s needs a
          control that does not depend on a pointer. */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-mute transition-colors hover:border-chalk hover:text-chalk"
      >
        {paused ? (
          <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
        ) : (
          <PauseIcon className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">
          {paused ? "Resume scrolling capabilities" : "Pause scrolling capabilities"}
        </span>
      </button>
    </section>
  );
}
