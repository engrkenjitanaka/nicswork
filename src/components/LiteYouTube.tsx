"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./icons";
import type { Video } from "@/content";

/**
 * Facade embed: a poster and a button until someone actually wants to watch.
 * The incumbent site mounted all ten iframes on load; this mounts none.
 */
export function LiteYouTube({
  video,
  orientation,
  priority = false,
}: {
  video: Video;
  orientation: "vertical" | "horizontal";
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const vertical = orientation === "vertical";

  const wide = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  // Shorts carry a true 9:16 still; everything else only has the 16:9 frame.
  const [poster, setPoster] = useState(
    vertical && !video.wideposterOnly
      ? `https://i.ytimg.com/vi/${video.youtubeId}/oardefault.jpg`
      : wide,
  );

  const label = `Play ${video.category} — ${video.detail}`;

  return (
    <figure className="group/card">
      <div
        className="relative overflow-hidden rounded-sm bg-panel shadow-[0_22px_44px_-24px_rgba(0,0,0,0.95)]"
        style={{ aspectRatio: vertical ? "9 / 16" : "16 / 9" }}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={`${video.category} — ${video.detail}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes={vertical ? "(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px" : "(max-width: 900px) 92vw, 600px"}
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
              className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-chalk/35 bg-ink/45 backdrop-blur-[2px] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-110 group-hover/card:border-amber group-hover/card:bg-ink/65 group-hover/card:text-amber"
            >
              <PlayIcon className="h-6 w-6 translate-x-[1px]" />
            </span>
          </button>
        )}
      </div>

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
