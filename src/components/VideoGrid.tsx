"use client";

import { useCallback, useEffect, useState } from "react";
import { VideoPoster } from "./LiteYouTube";
import { LightboxArrow, LightboxFrame } from "./Lightbox";
import { Reveal } from "./Reveal";
import type { Video } from "@/content";

export function VideoGrid({
  videos,
  orientation,
  className,
}: {
  videos: Video[];
  orientation: "vertical" | "horizontal";
  className: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const vertical = orientation === "vertical";

  const go = useCallback(
    (step: number) =>
      setOpen((n) => (n === null ? null : (n + step + videos.length) % videos.length)),
    [videos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go]);

  const video = open === null ? null : videos[open];

  return (
    <>
      <Reveal className={className}>
        {videos.map((v, i) => (
          <div key={v.youtubeId} style={{ "--i": i } as React.CSSProperties}>
            <VideoPoster video={v} orientation={orientation} onOpen={() => setOpen(i)} />
          </div>
        ))}
      </Reveal>

      {video && (
        <LightboxFrame
          label={`${video.category} — ${video.detail}`}
          title={video.category}
          subtitle={`${video.detail}   ·   ${(open ?? 0) + 1} / ${videos.length}`}
          onClose={() => setOpen(null)}
        >
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-8"
            style={{ containerType: "size" }}
          >
            {/* The player is sized from the piece's own shape and centred, so a
                9:16 cut is tall and a 16:9 cut is wide — never a thumbnail. */}
            {/* Sized off whichever axis runs out first — cqh is the centring
                box's own height — so the frame is always the piece's true
                shape and YouTube never letterboxes inside black bars. */}
            <div
              style={{
                aspectRatio: vertical ? "9 / 16" : "16 / 9",
                width: vertical
                  ? "min(100%, calc(100cqh * 9 / 16))"
                  : "min(100%, 1120px, calc(100cqh * 16 / 9))",
              }}
            >
              <iframe
                key={video.youtubeId}
                className="h-full w-full rounded-sm bg-panel"
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={`${video.category} — ${video.detail}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {videos.length > 1 && (
              <>
                <LightboxArrow side="left" label="Previous video" onClick={() => go(-1)} />
                <LightboxArrow side="right" label="Next video" onClick={() => go(1)} />
              </>
            )}
          </div>
        </LightboxFrame>
      )}
    </>
  );
}
