import Image from "next/image";
import { about, person } from "@/content";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell grid items-end gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-20">
        {/* A cut-out, so it stands on the page's own ground. No frame: the
            transparent half of the file is just background, and boxing it
            drew a rectangle around empty space. */}
        {/* The cut-out carries ~250px of empty canvas above his head. The box
            is taller than the file so `cover` crops that off the top; the
            empty left half stays transparent against the page's own ground. */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-[19rem] sm:max-w-[22rem] lg:mx-0 lg:max-w-none">
          <Image
            src="/media/portrait.png"
            alt={`${person.name}, multimedia designer`}
            fill
            sizes="(max-width: 1024px) 60vw, 400px"
            className="object-cover object-bottom"
          />
        </div>

        <div className="lg:pb-10">
          <h2
            className="font-light leading-tight tracking-[-0.02em]"
            style={{ fontSize: "var(--step-h2)" }}
          >
            {about.heading}
          </h2>
          <div className="mt-7 space-y-5">
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="max-w-[68ch] text-[0.95rem] font-light leading-[1.75] text-mute"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
