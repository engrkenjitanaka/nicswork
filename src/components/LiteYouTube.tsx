"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./icons";
import type { Video } from "@/content";

/**
 * Poster only — it never mounts an iframe. Pressing it opens the centred
 * player, so nothing loads from YouTube until someone asks to watch.
 */
export function VideoPoster({
  video,
  orientation,
  onOpen,
  priority = false,
}: {
  video: Video;
  orientation: "vertical" | "horizontal";
  onOpen: () => void;
  priority?: boolean;
}) {
  const vertical = orientation === "vertical";
  const wide = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  // Shorts carry a true 9:16 still; everything else only has the 16:9 frame.
  const [poster, setPoster] = useState(
    vertical && !video.wideposterOnly
      ? `https://i.ytimg.com/vi/${video.youtubeId}/oardefault.jpg`
      : wide,
  );

  return (
    <figure className="group/card">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Play ${video.category} — ${video.detail}`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-sm bg-panel shadow-[0_22px_44px_-24px_rgba(0,0,0,0.95)]"
        style={{ aspectRatio: vertical ? "9 / 16" : "16 / 9" }}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes={
            vertical
              ? "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 200px"
              : "(max-width: 640px) 92vw, 600px"
          }
          priority={priority}
          onError={() => setPoster(wide)}
          className="object-cover brightness-[0.82] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04] group-hover/card:brightness-100"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-chalk/35 bg-ink/45 backdrop-blur-[2px] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-110 group-hover/card:border-amber group-hover/card:bg-ink/65 group-hover/card:text-amber sm:h-14 sm:w-14"
        >
          <PlayIcon className="h-5 w-5 translate-x-[1px] sm:h-6 sm:w-6" />
        </span>
      </button>

      <figcaption className="mt-4">
        <span className="block text-[0.64rem] uppercase leading-snug tracking-[0.14em] text-chalk">
          {video.category}
        </span>
        <span className="mt-1 block text-[0.7rem] font-light leading-snug text-mute">
          {video.detail}
        </span>
      </figcaption>
    </figure>
  );
}
