import { verticalVideos, horizontalVideos } from "@/content";
import { VideoGrid } from "./VideoGrid";

export function WorkVideos() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* The world's one light source, spent once: the hero's practical LEDs
          spill past the fold so the photograph and the dark page read as one
          room rather than two panels. The centre sits mid-box, not on its top
          edge — centred at 0% the gradient starts at full strength exactly
          where the element begins and draws a hard line across the photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-56 h-[28rem] bg-[radial-gradient(52%_50%_at_76%_50%,rgba(224,169,95,0.13),rgba(224,169,95,0.04)_45%,transparent_76%)]"
      />
      <div className="shell relative">
        <h2
          className="max-w-[18ch] font-light leading-tight tracking-[-0.02em]"
          style={{ fontSize: "var(--step-h2)" }}
        >
          Video editing, cut for where it plays
        </h2>
        <p className="mt-4 max-w-[68ch] text-[0.92rem] font-light leading-relaxed text-mute">
          Ten pieces across real estate, brand, food and coaching. Nothing loads
          until you press play.
        </p>

        <VideoGrid
          videos={verticalVideos}
          orientation="vertical"
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6 lg:gap-x-4"
        />

        <h3 className="tracked mt-24 text-[0.68rem] text-mute">Long form</h3>

        <VideoGrid
          videos={horizontalVideos}
          orientation="horizontal"
          className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-10"
        />
      </div>
    </section>
  );
}
